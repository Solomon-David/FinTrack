import { Router } from 'express';
import protect from '../middlewares/protect';
import * as billTypeController from '../controllers/billtype.controller';

const billTypeRouter = Router();

billTypeRouter.post("/", protect, billTypeController.addBillType);
billTypeRouter.get("/", protect, billTypeController.getBillTypes);
billTypeRouter.patch("/:id", protect, billTypeController.updateBillType);
billTypeRouter.delete("/:id", protect, billTypeController.deleteBillType);

export default billTypeRouter;