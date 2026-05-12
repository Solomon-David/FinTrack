// src/middleware/authMiddleware.ts
import { Response, NextFunction } from 'express';
import User from '../models/User';
import { verifyAccessToken } from '../utils/generateToken';
import { TokenPayload, UserRequest } from '../interfaces';

const FIVE_DAYS_IN_MS = 5 * 24 * 60 * 60 * 1000;

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

    const now = new Date().getTime();
    const lastSeen = user.lastSeen ? new Date(user.lastSeen).getTime() : 0;

    if (now - lastSeen > FIVE_DAYS_IN_MS) {
      await User.findByIdAndUpdate(user._id, {
        $unset: { 'tokens.refreshToken': 1 },
      });
      res.status(403).json({
        message: 'Session expired due to 5 days of inactivity. Please login.',
        code: 'INACTIVITY_TIMEOUT'
      });
      return;
    }

    // Update lastSeen on every authenticated request
    await User.findByIdAndUpdate(user._id, { $set: { lastSeen: new Date() } });

    req.user = { userId: user._id.toString() };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid or has expired' });
    return;
  }
};

export default protect;