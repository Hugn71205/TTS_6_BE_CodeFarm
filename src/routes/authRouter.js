import express from "express";
import { updateMe } from "../controllers/authController.js";

import authMiddleware from "../middlewares/authmiddlewares.js";
import { getAllUsers, getMe, login, register, verifyEmailHandler } from "../controllers/authController.js";
import { forgotPassword } from "../controllers/forgot-password.js";
import { verifyOTP } from "../controllers/VerifyOtp.js";

const authRouter = express.Router();

// Route đăng ký
authRouter.post("/register", register);
// Route đăng nhập
authRouter.post("/login", login);
// Route lấy danh sách người dùng
authRouter.get("/list", getAllUsers);
authRouter.get("/me", authMiddleware, getMe);
authRouter.put("/update", authMiddleware, updateMe);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/verify-otp", verifyOTP);
authRouter.post("/verify_Email", verifyEmailHandler);

export default authRouter;