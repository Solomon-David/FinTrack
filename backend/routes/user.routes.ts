// user.routes.ts
import { Router, Request, Response, NextFunction } from "express";
import protect from "../middlewares/protect";
import * as userController from "../controllers/user.controller";
import { upload } from "../config/multer";

const userRouter = Router();

// Multer error handler wrapper
const uploadSingle = (req: Request, res: Response, next: NextFunction) => {
  upload.single("profilePicture")(req, res, (err) => {
    if (err) {
      console.error("Multer error:", JSON.stringify(err, null, 2));
      return res.status(400).json({
        error: "File upload failed",
        detail: err.message || String(err),
      });
    }
    next();
  });
};

userRouter.post("/logout", protect, userController.logout);
userRouter.get("/user-details", protect, userController.getUserDetails);
userRouter.get("/:userId/photo", protect, userController.getUserPhoto);
userRouter.patch("/update-profile", protect, userController.updateProfile);
userRouter.post(
  "/upload-photo",
  protect,
  uploadSingle,
  userController.uploadProfilePicture
);
userRouter.patch("/change-password", protect, userController.changePassword);

export default userRouter;
