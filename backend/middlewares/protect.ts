// src/middleware/authMiddleware.ts
import { Response, NextFunction } from 'express';
import User from '../models/User';
import { verifyAccessToken } from '../utils/generateToken';
import { TokenPayload, UserRequest } from '../interfaces';


const protect = async (req: UserRequest, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1]; 

  if (!token) {
    res.status(401).json({ message: 'No token, authorization denied' });
    return;
  }

  try {
    const decoded = verifyAccessToken(token) as TokenPayload;
    const user = await User.findById(decoded.userId);

    if (!user) {
      res.status(401).json({ message: 'User no longer exists' });
      return;
    }

    const FIVE_DAYS_IN_MS = 5 * 24 * 60 * 60 * 1000;
    const now = new Date().getTime();
    const lastSeen = user.lastSeen ? new Date(user.lastSeen).getTime() : 0;

    if (now - lastSeen > FIVE_DAYS_IN_MS) {
      user.refreshToken = undefined;
      await user.save();

      res.status(403).json({ 
        message: 'Session expired due to 5 days of inactivity. Please login.',
        code: 'INACTIVITY_TIMEOUT' 
      });
      return;
    }

    const userId = user._id.toString();

    if (!userId) {
      res.status(401).json({ message: "User not authenticated", success: false });
      return;
    }
    
    req.user = { userId };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid or has expired' });
    return;
  }
};

export default protect;