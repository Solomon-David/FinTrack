import { Router } from 'express';
import protect from '../middlewares/protect';
import * as expenseController from '../controllers/expense.controller';

const expenseRouter = Router();

expenseRouter.post("/", protect, expenseController.addExpense);
expenseRouter.get("/", protect, expenseController.getExpenses);
expenseRouter.patch("/:id", protect, expenseController.updateExpense);
expenseRouter.delete("/:id", protect, expenseController.deleteExpense);

export default expenseRouter;