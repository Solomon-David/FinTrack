import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';

//routes
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import incomeRoutes from './routes/income.routes';
import expenseRoutes from './routes/expense.routes';
import rcdataRoutes from './routes/rcdata.routes';
import summaryRoutes from './routes/summary.routes';
import billRoutes from './routes/bill.routes';
import billTypeRoutes from "./routes/billtypes.routes";

import { startSummaryJob } from './utils/summaryCronJob';

// Load environment variables
dotenv.config();

// Database connection
connectDB().catch((err: Error) => {
  console.error('Failed to connect to MongoDB:', err);
  process.exit(1);
});

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: 'http://localhost:5173' }));

// Skip body parsers for multipart/form-data — multer handles those
app.use((req, res, next) => {
  const contentType = req.headers['content-type'] || '';
  if (contentType.includes('multipart/form-data')) {
    return next();
  }
  express.json()(req, res, () => {
    express.urlencoded({ extended: true })(req, res, next);
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/income", incomeRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/rcdata", rcdataRoutes);
app.use("/api/summaries", summaryRoutes);
app.use("/api/bills", billRoutes);
app.use("/api/bill-types", billTypeRoutes);
// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: `${process.uptime()} seconds`,
    version: '1.0.0'
  });
});

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to FinTrack API' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} at ${new Date().toISOString()}`);
});

// Start cron job
startSummaryJob();