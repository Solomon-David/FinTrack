import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {connectDB} from './config/db';

//routes
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';

// Database connection
connectDB().catch((err: Error) => {
  console.error('Failed to connect to MongoDB:', err);
  process.exit(1);
});

// Load environment variables
dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: 'http://localhost:5173' })); // Adjust as needed for frontend URL
app.use(express.json());

app.use("/api/auth/", authRoutes);
app.use("/api/user/", userRoutes);


// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: `${process.uptime()} seconds`,
    version: '1.0.0'
  });
});

// Placeholder for other routes
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to FinTrack API' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} at ${new Date().toISOString()}`);
});
