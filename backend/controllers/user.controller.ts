import  User  from '../models/User';
import { Request, Response } from 'express';
import {upload} from "../config/multer";
import {sendEmail } from '../config/emailer';
import {SendEmailDTO, UserRequest} from '../interfaces';
import { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken}  from "../utils/generateToken";


//for creating new user
export const createUser = async (req: Request, res: Response) => {
    try {
        //getting user info form body
        const { firstName, lastName, email, password} = req.body;
        console.log(firstName, lastName, email, password)
        //checking for existing user by email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already in use"});
        }
        //creating new user
        const verificationCode: string = Math.floor(100000 + Math.random() * 900000).toString();

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
        //if code has expired or code is wrong
        if(user.verificationCode !== code  || <number>user.verificationCodeExpires < Date.now()){
            return res.status(400).json({ message: "Invalid or expired verification code." })
        }

        //setting values
        user.verified = true;
        user.verificationCode = null;
        user.verificationCodeExpires = null;
        
        const accessToken = generateAccessToken({ userId: user._id });
        const refreshToken = generateRefreshToken({ userId: user._id });
        user.refreshToken = refreshToken;
        
        await user.save();
        return res.status(200).json({
            message: "Account verified successfully",
            tokens: {access: accessToken, refresh: refreshToken}
        })

    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({
            error: 'Failed to send email',
            success: false
        });
    }
    }
export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    // if email or password is null
    if (!email || !password ) return res.status(400).json({message: "Incomplete credentials"});

    try{
        // get user by email
        const user: any = await User.findOne({email});
        if(user){
            return res.status(404).json({message: "User does not exist"});
        }
        //compare passwords
        const passwordMatch: boolean|undefined = await user.comparePassword(password);

        if(passwordMatch){
            const accessToken = generateAccessToken({ userId: user._id });
            const refreshToken = generateRefreshToken({ userId: user._id });
            user.refreshToken = refreshToken;
            await user.save();
            return res.status(200).json({message: `Welcome, ${user.nickname}`, success: true, tokens: {access: accessToken, refresh:refreshToken}});
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
        //getting user by email from body
        const { email } = req.body;
        const userByEmail = await User.findOne({ email });
        if (!userByEmail) {
            return res.status(404).json({ error: 'User not found' });
        }

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

        // Update user's photoData
        const user = await User.findByIdAndUpdate(
            { _id: userByEmail._id },
            { photoData: req.file.path },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Profile picture updated successfully',
            user
        });
    } catch (error) {
        console.error('Error uploading profile picture:', error);
        res.status(500).json({
            error: 'Failed to upload profile picture',
            success: false
        });
    }
}