import  User  from '../models/User';
import { Request, Response } from 'express';
import {upload} from "../config/multer";
import cloudinary from "../config/cloudinary";
import {sendEmail } from '../config/emailer';
import {SendEmailDTO, UserRequest, IUserModel} from '../interfaces';
import { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken}  from "../utils/generateToken";
import { generateVerificationCode } from "../utils/generateVerificationCode";


//for creating new user
export const createUser = async (req: Request, res: Response) => {
    try {
        //getting user info form body
        const { firstName, lastName, email, password} = req.body;
        //checking for existing user by email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already in use"});
        }
        //creating new user
        const verificationCode: string = generateVerificationCode();

        const user = new User({ firstName, lastName, email, password, isVerified: false,
            verificationCode,
            verificationCodeExpires: Date.now() + (10 * 60 * 1000),
         });
        //saving user to database
        await user.save();
        //returning success response

        // sending verification code
         // Send verification email
    await sendEmail(<SendEmailDTO>{
      to: email,
      subject: "Verify your FinTrack Account",
      html: `<h2>Welcome to FinTrack</h2>
            <p>Your verification code is <b>${verificationCode}</b> and expires in 10 minutes.</p><br><br>
            <p>If you didn't make this request, ignore the code.</p>`
    });

        res.status(201).json({ success: true})
    }
    //handling errors
    catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Failed to create user" , success: false});
    }

}


export const verifyAccount = async (req: Request, res: Response) => {
    try {
      const { email, code }  = req.body;
       //getting user
       const user = await User.findOne({email});
       if(!user) return res.status(404).json({message: `User not found`});
       //if user is verified
       if(user.verified)
            return res.status(400).json({ message: "Account already verified." });

        // Generate tokens
        const accessToken = generateAccessToken({ userId: user._id });
        const refreshToken = generateRefreshToken({ userId: user._id });

        // Atomic update with conditions
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
            tokens: {access: accessToken, refresh: refreshToken}
        })

    } catch (error) {
        console.error('Error verifying account:', error);
        res.status(500).json({
            error: 'Failed to verify account',
            success: false
        });
    }
    }

    // resend verification code. requres email

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
        // Atomic update
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
        // Send verification email
        await sendEmail(<SendEmailDTO>{
            to: email,
            subject: "Your new FinTrack verification code",
            html: `<h2>FinTrack Account Verification</h2>
                  <p>Your new verification code is <b>${newVerificationCode}</b> and expires in 10 minutes.</p><br><br>
                  <p>If you didn't make this request, ignore the code.</p>`
        });
        res.status(200).json({ message: "Verification email resent successfully" });
    }catch (error) {
        console.error('Error resending verification email:', error);
        res.status(500).json({
            error: 'Failed to resend verification email',
            success: false
        });
    }
}

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    // if email or password is null
    if (!email || !password ) return res.status(400).json({message: "Incomplete credentials", success: false});

    try{
        // get user by email
        const user: IUserModel | null = <IUserModel> await User.findOne({email}).select('+password');
        if(!user){
            return res.status(404).json({message: "User does not exist", success: false});
        }
        //compare passwords
        const passwordMatch: boolean|undefined = await user?.comparePassword(password);

        if(passwordMatch){
            const accessToken = generateAccessToken({ userId: user._id });
            const refreshToken = generateRefreshToken({ userId: user._id });
            // Atomic update
            const updatedUser = await User.findOneAndUpdate(
                { _id: user._id },
                { $set: { 'tokens.refreshToken': refreshToken } },
                { new: true }
            );
            return res.status(200).json({message: `Welcome, ${user.nickname}`, success: true, user: {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                nickname: user.nickname,
                photoData: user.photoData,
                    tokens: {
                        accessToken,
                        refreshToken
                    },
                dob: user.dob
            }});
        }
        else{
            return res.status(404).json({message: "Wrong password", success: false})
        }
    }
     catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ error: "Error logging in user" , success: false});
    }
}

export const refreshToken = async (req: Request, res: Response) => {
    const { token } = req.body;
    //if token is missing
    if (!token) return res.status(401).json({message: "Refresh token required."});

    try{
        const decoded = verifyRefreshToken(token);
        const newAccessToken = generateAccessToken({userId: decoded.userId});
        res.json({ accessToken: newAccessToken});
    }
    catch(error){
        console.error('Error uploading profile picture:', error);
        res.status(500).json({
            error: 'Failed to upload profile picture',
            success: false,
    })
}
}

export const logout = async (req: UserRequest, res: Response): Promise<void> => {
    try {
        // 1. Get userId from the 'protect' middleware
        const userId = req.user?.userId;

        if (!userId) {
            res.status(401).json({ message: "User not authenticated" });
            return;
        }

        // 2. Invalidate the session in the Database
        // We set refreshToken to undefined and clear lastSeen 
        // to force a fresh login state.
        const user = await User.findByIdAndUpdate(
            userId,
            { 
                $unset: { refreshToken: 1 }, // Removes the field from the document
                $set: { lastSeen: new Date(0) } // Optional: Reset inactivity clock to "epoch"
            },
            { new: true }
        );

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        // 3. Response
        res.status(200).json({ 
            success: true, 
            message: "Logged out successfully. Session invalidated." 
        });

    } catch (error) {
        console.error('Logout Error:', error);
        res.status(500).json({ 
            success: false, 
            message: "Internal server error during logout" 
        });
    }
}


export const uploadProfilePicture = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        // Handle file upload
        await new Promise<void>((resolve, reject) => {
            upload.single('profilePicture')(req, res, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Atomic update
        const updatedUser = await User.findOneAndUpdate(
            { email },
            { $set: { photoData: req.file.path } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Profile picture updated successfully',
            user: updatedUser
        });
    } catch (error) {
        console.error('Error uploading profile picture:', error);
        res.status(500).json({
            error: 'Failed to upload profile picture',
            success: false
        });
    }

}

    export const forgotPassword = async (req: Request, res: Response) => {
        try {
            const { email } = req.body;
            const resetCode = generateVerificationCode();
            const updatedUser = await User.findOneAndUpdate(
                { email },
                {
                    $set: {
                        passwordResetCode: resetCode,
                        passwordResetCodeExpires: Date.now() + (10 * 60 * 1000)
                    }
                },
                { new: true }
            );
            if (!updatedUser) {
                throw new Error('User not found');
            }
            res.status(201).json({message: "Code sent", success: true});

            // Send password reset email
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
    }

    export const resetPassword = async (req: Request, res: Response) => {
        try {
            const { email, code, newPassword } = req.body;
            const updatedUser = await User.findOneAndUpdate(
                {
                    email,
                    passwordResetCode: code,
                    passwordResetCodeExpires: { $gt: Date.now() }
                },
                {
                    $set: { password: newPassword },
                    $unset: { passwordResetCode: 1, passwordResetCodeExpires: 1 }
                },
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
    }

    export const getUserPhoto = async (req: Request, res: Response) => {
        try {
            const { userId } = req.params;
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found", success: false });
            }
            if (!user.photoData) {
                return res.status(404).json({ message: "User photo not found", success: false });
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