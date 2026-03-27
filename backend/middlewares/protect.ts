// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import { verifyAccessToken } from '../utils/generateToken';
import { TokenPayload, UserRequest } from '../interfaces';


const protect = async (req: UserRequest, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;
  // Use optional chaining and split safely
  const token = authHeader?.split(' ')[1]; 

  if (!token) {
    res.status(401).json({ message: 'No token, authorization denied' });
    return; // Stop execution
  }

  try {
    // 1. Verify Access Token and cast to your payload type
    const decoded = verifyAccessToken(token) as TokenPayload;
    
    // 2. Find User in Model
    const user = await User.findById(decoded.userId);

    if (!user) {
      res.status(401).json({ message: 'User no longer exists' });
      return; // Stop execution
    }

    // 3. The 5-Day Inactivity Algorithm
    const FIVE_DAYS_IN_MS = 5 * 24 * 60 * 60 * 1000;
    const now = new Date().getTime();
    
    // Assuming lastSeen is a Date object in your Mongoose schema
    const lastSeen = user.lastSeen ? new Date(user.lastSeen).getTime() : 0;

    if (now - lastSeen > FIVE_DAYS_IN_MS) {
      // Invalidate the session in DB
      user.refreshToken = undefined;
      await user.save();

      res.status(403).json({ 
        message: 'Session expired due to 5 days of inactivity. Please login.',
        code: 'INACTIVITY_TIMEOUT' 
      });
      return; // CRITICAL: Stop execution here
    }
    
    // 4. Attach user to request and proceed
    req.user = { userId: user._id.toString() };
    next();
  } catch (error) {
    // Handle expired or malformed tokens
    res.status(401).json({ message: 'Token is not valid or has expired' });
    return;
  }
};

export default protect;
