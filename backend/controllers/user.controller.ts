import  User  from '../models/User';
import { Request, Response } from 'express';
import {upload} from "../config/multer";

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
        const user = new User({ firstName, lastName, email, password });
        //saving user to database
        await user.save();
        //returning success response
        res.status(201).json({ success: true})
    }
    //handling errors
    catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Failed to create user" , success: false});
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
};
