import User from '../models/User';
import { Request, Response } from 'express';
import { upload } from "../config/multer";
import cloudinary from "../config/cloudinary";
import { sendEmail } from '../config/emailer';
import { SendEmailDTO, UserRequest, IUserModel } from '../interfaces';
import { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken } from "../utils/generateToken";
import { generateVerificationCode } from "../utils/generateVerificationCode";
import { hashPassword } from '../config/bcryptjs';
import Bill from "../models/Bill";
import Plan from "../models/Plan";


export const createUser = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already in use" });
        }
        const verificationCode: string = generateVerificationCode();
        const user = new User({
            firstName, lastName, email, password, isVerified: false,
            verificationCode,
            verificationCodeExpires: Date.now() + (10 * 60 * 1000),
        });
        await user.save();
        await sendEmail(<SendEmailDTO>{
            to: email,
            subject: "Verify your FinTrack Account",
            html: `<h2>Welcome to FinTrack</h2>
            <p>Your verification code is <b>${verificationCode}</b> and expires in 10 minutes.</p><br><br>
            <p>If you didn't make this request, ignore the code.</p>`
        });
        res.status(201).json({ success: true });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Failed to create user", success: false });
    }
};


export const verifyAccount = async (req: Request, res: Response) => {
    try {
        const { email, code } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: `User not found` });
        if (user.verified)
            return res.status(400).json({ message: "Account already verified." });

        const accessToken = generateAccessToken({ userId: user._id });
        const refreshToken = generateRefreshToken({ userId: user._id });

        const updatedUser = await User.findOneAndUpdate(
            {
                email,
                verified: false,
                verificationCode: code,
                verificationCodeExpires: { $gt: Date.now() }
            },
            {
                $set: {
                    verified: true,
                    verificationCode: null,
                    verificationCodeExpires: null,
                    'tokens.refreshToken': refreshToken
                }
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(400).json({ message: "Invalid or expired verification code." });
        }

        return res.status(200).json({
            message: "Account verified successfully",
            tokens: { access: accessToken, refresh: refreshToken }
        });
    } catch (error) {
        console.error('Error verifying account:', error);
        res.status(500).json({ error: 'Failed to verify account', success: false });
    }
};


export const resendVerificationEmail = async (req: Request, res: Response) => {
    try {
        const newVerificationCode: string = generateVerificationCode();
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.verified) {
            return res.status(400).json({ message: "Account already verified." });
        }
        const updatedUser = await User.findOneAndUpdate(
            { email, verified: false },
            {
                $set: {
                    verificationCode: newVerificationCode,
                    verificationCodeExpires: Date.now() + (10 * 60 * 1000)
                }
            },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(400).json({ message: "Failed to resend verification email" });
        }
        await sendEmail(<SendEmailDTO>{
            to: email,
            subject: "Your new FinTrack verification code",
            html: `<h2>FinTrack Account Verification</h2>
                  <p>Your new verification code is <b>${newVerificationCode}</b> and expires in 10 minutes.</p><br><br>
                  <p>If you didn't make this request, ignore the code.</p>`
        });
        res.status(200).json({ message: "Verification email resent successfully" });
    } catch (error) {
        console.error('Error resending verification email:', error);
        res.status(500).json({ error: 'Failed to resend verification email', success: false });
    }
};


const computeUserDetails = async (userId: string) => {
    const [bills, plans] = await Promise.all([
        Bill.find({ user: userId }),
        Plan.find({ user: userId })
    ]);

    const billsSummary = {
        total: bills.length,
        paid: bills.filter(b => b.status === "Paid").length,
        unpaid: bills.filter(b => b.status === "Unpaid").length,
        overdue: bills.filter(b => b.status === "Overdue").length,
        part: bills.filter(b => b.status === "Part").length,
    };

    const plansSummary = {
        total: plans.length,
        completed: plans.filter(p => p.status === "Completed").length,
        inProgress: plans.filter(p => p.status === "In Progress").length,
        overdue: plans.filter(p => p.status === "Overdue").length,
    };

    return { billsSummary, plansSummary };
};


export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Incomplete credentials", success: false });

    try {
        const user: IUserModel | null = <IUserModel>await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(404).json({ message: "User does not exist", success: false });
        }

        const passwordMatch: boolean | undefined = await user?.comparePassword(password);

        if (passwordMatch) {
            const accessToken = generateAccessToken({ userId: user._id });
            const refreshToken = generateRefreshToken({ userId: user._id });

            await User.findOneAndUpdate(
                { _id: user._id },
                { $set: { 'tokens.refreshToken': refreshToken, lastSeen: new Date() } },
                { new: true }
            );

            const { billsSummary, plansSummary } = await computeUserDetails(user._id.toString());

            return res.status(200).json({
                message: `Welcome, ${user.nickname}`, success: true, user: {
                    id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    nickname: user.nickname,
                    photoData: user.photoData,
                    tokens: { accessToken, refreshToken },
                    dob: user.dob,
                    billsSummary,
                    plansSummary,
                }
            });
        } else {
            return res.status(404).json({ message: "Wrong password", success: false });
        }
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ error: "Error logging in user", success: false });
    }
};


export const getUserDetails = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user!.userId;
        const { billsSummary, plansSummary } = await computeUserDetails(userId);
        res.status(200).json({
            success: true,
            message: "User details fetched successfully",
            data: { billsSummary, plansSummary }
        });
    } catch (error: any) {
        console.error("Error fetching user details:", error);
        res.status(500).json({ success: false, message: error.message || "Internal server error" });
    }
};


export const refreshToken = async (req: Request, res: Response) => {
    const { token } = req.body;
    if (!token) return res.status(401).json({ message: "Refresh token required." });

    try {
        const decoded = verifyRefreshToken(token);
        await User.findByIdAndUpdate(decoded.userId, { $set: { lastSeen: new Date() } });
        const newAccessToken = generateAccessToken({ userId: decoded.userId });
        res.json({ accessToken: newAccessToken });
    } catch (error) {
        console.error('Error refreshing token:', error);
        res.status(500).json({ error: 'Failed to refresh token', success: false });
    }
};


export const logout = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user!.userId;
        const user = await User.findByIdAndUpdate(
            userId,
            { $unset: { refreshToken: 1 }, $set: { lastSeen: new Date(0) } },
            { new: true }
        );
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({ success: true, message: "Logged out successfully. Session invalidated." });
    } catch (error) {
        console.error('Logout Error:', error);
        res.status(500).json({ success: false, message: "Internal server error during logout" });
    }
};


export const uploadProfilePicture = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user!.userId;

        if (!req.file) {
            res.status(400).json({ error: 'No file uploaded' });
            return;
        }

        const photoData = req.file.path;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: { photoData } },
            { new: true }
        );

        if (!updatedUser) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        // Build the Cloudinary URL from the saved path
        const photoUrl = updatedUser.photoData!.startsWith('http')
            ? updatedUser.photoData!
            : cloudinary.url(updatedUser.photoData!, { secure: true });

        res.status(200).json({
            success: true,
            message: 'Profile picture updated successfully',
            photoData: updatedUser.photoData,
            photoUrl,
        });
    } catch (error: any) {
        console.error('Error uploading profile picture:', error);
        res.status(500).json({ error: 'Failed to upload profile picture', success: false });
    }
};

export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const resetCode = generateVerificationCode();
        const updatedUser = await User.findOneAndUpdate(
            { email },
            { $set: { passwordResetCode: resetCode, passwordResetCodeExpires: Date.now() + (10 * 60 * 1000) } },
            { new: true }
        );
        if (!updatedUser) throw new Error('User not found');
        res.status(201).json({ message: "Code sent", success: true });
        await sendEmail(<SendEmailDTO>{
            to: email,
            subject: "FinTrack Password Reset",
            html: `<h2>FinTrack Password Reset</h2>
                      <p>Your password reset code is <b>${resetCode}</b> and expires in 10 minutes.</p><br><br>
                      <p>If you didn't make this request, ignore the code.</p>`
        });
    } catch (error: any) {
        console.error('Error resetting password:', error);
        res.status(500).json({ message: error.message || "Internal server error", success: false });
    }
};


export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { email, code, newPassword } = req.body;
        const newEncryptedPassword = await hashPassword(newPassword);
        const updatedUser = await User.findOneAndUpdate(
            { email, passwordResetCode: code, passwordResetCodeExpires: { $gt: Date.now() } },
            { $set: { password: newEncryptedPassword }, $unset: { passwordResetCode: 1, passwordResetCodeExpires: 1 } },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(400).json({ message: "Invalid or expired reset code.", success: false });
        }
        res.status(200).json({ message: "Password reset successfully", success: true });
    } catch (error: any) {
        console.error('Error resetting password:', error);
        res.status(500).json({ message: error.message || "Internal server error", success: false });
    }
};


export const getUserPhoto = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }
        if (!user.photoData) {
            return res.status(200).json({ message: "User photo not found", success: false });
        }
        const photoUrl = user.photoData.startsWith('http')
            ? user.photoData
            : cloudinary.url(user.photoData, { secure: true });
        res.status(200).json({ message: "Photo fetched successfully", success: true, photoUrl });
    } catch (error: any) {
        console.error('Error fetching user photo:', error);
        res.status(500).json({ message: error.message || "Internal server error", success: false });
    }
};


export const updateProfile = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user!.userId;
        const { firstName, lastName, nickname, email } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: { firstName, lastName, nickname, email } },
            { new: true }
        );

        if (!updatedUser) {
            res.status(404).json({ message: "User not found", success: false });
            return;
        }

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: {
                id: updatedUser._id,
                email: updatedUser.email,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                nickname: updatedUser.nickname,
                photoData: updatedUser.photoData,
                dob: updatedUser.dob,
            }
        });
    } catch (error: any) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: error.message || "Internal server error", success: false });
    }
};


export const changePassword = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user!.userId;
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            res.status(400).json({ message: "Both current and new password are required", success: false });
            return;
        }

        const user = await User.findById(userId).select('+password') as IUserModel | null;
        if (!user) {
            res.status(404).json({ message: "User not found", success: false });
            return;
        }

        const passwordMatch = await user.comparePassword(currentPassword);
        if (!passwordMatch) {
            res.status(400).json({ message: "Current password is incorrect", success: false });
            return;
        }

        const newEncryptedPassword = await hashPassword(newPassword);
        await User.findByIdAndUpdate(userId, { $set: { password: newEncryptedPassword } });

        res.status(200).json({ success: true, message: "Password changed successfully" });
    } catch (error: any) {
        console.error("Error changing password:", error);
        res.status(500).json({ message: error.message || "Internal server error", success: false });
    }
};