import { Router } from 'express';
import protect from '../middlewares/protect';
import * as userController from '../controllers/user.controller';

const userRouter = Router();

userRouter.post("/logout", protect, userController.logout);
userRouter.get("/user-details", protect, userController.getUserDetails);
userRouter.get("/:userId/photo", protect, userController.getUserPhoto);

export default userRouter;