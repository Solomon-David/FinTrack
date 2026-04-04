import { Router } from 'express';
import * as userController from '../controllers/user.controller';

const authRouter = Router();

//implementing routes
authRouter.post("/signup", userController.createUser);
authRouter.post("/login", userController.loginUser);
authRouter.post("/verify-account", userController.verifyAccount);
authRouter.post("/resend-code", userController.resendVerificationEmail);

export default authRouter;