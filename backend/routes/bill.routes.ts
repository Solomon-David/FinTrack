import { Router } from 'express';
import protect from '../middlewares/protect';
import * as billController from '../controllers/bill.controller';

const billRouter = Router();

billRouter.post("/", protect, billController.addBill);
billRouter.get("/", protect, billController.getBills);
billRouter.patch("/:id", protect, billController.updateBill);
billRouter.delete("/:id", protect, billController.deleteBill);

export default billRouter;