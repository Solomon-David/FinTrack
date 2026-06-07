import { Router } from 'express';
import protect from '../middlewares/protect';
import * as summaryController from '../controllers/summary.controller';

const summaryRouter = Router();

summaryRouter.get("/", protect, summaryController.getSummaries);
summaryRouter.post("/generate", protect, summaryController.generateSummaryNow);

export default summaryRouter;