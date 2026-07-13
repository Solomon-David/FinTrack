import { Router } from 'express';
import protect from '../middlewares/protect';
import * as planController from '../controllers/plan.controller';

const planRouter = Router();

planRouter.post("/", protect, planController.addPlan);
planRouter.get("/", protect, planController.getPlans);
planRouter.patch("/:id", protect, planController.updatePlan);
planRouter.delete("/:id", protect, planController.deletePlan);

export default planRouter;