import { Router } from 'express';
import protect from '../middlewares/protect';
import * as incomeController from '../controllers/income.controller';

const incomeRouter = Router();

incomeRouter.post("/", protect, incomeController.addIncome);
incomeRouter.get("/", protect, incomeController.getIncomes);
incomeRouter.patch("/:id", protect, incomeController.updateIncome);
incomeRouter.delete("/:id", protect, incomeController.deleteIncome);

export default incomeRouter;