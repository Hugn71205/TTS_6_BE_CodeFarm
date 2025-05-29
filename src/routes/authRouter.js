import express from "express";
import { blockUser, deleteUser, getAllUsers, login, register, verifyEmailHandler } from "../controllers/authController.js";
import { forgotPassword } from "../controllers/forgot-password.js";
import { verifyOTP } from "../controllers/VerifyOtp.js";
import { resetPassword } from "../controllers/ResetPassword.js";

const authRouter = express.Router();

// Route đăng ký
authRouter.post("/register", register);
// Route đăng nhập
authRouter.post("/login", login);
// Route lấy danh sách người dùng
authRouter.get("/list", getAllUsers);
// Route xóa người dùng
authRouter.delete("/:id", deleteUser);

// routes/user.route.ts (hoặc auth.route.ts)
authRouter.patch("/block/:id", blockUser);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/verify-otp", verifyOTP);
authRouter.post("/verify-email", verifyEmailHandler);
// Route reset mật khẩu
authRouter.post("/reset-password", resetPassword);



export default authRouter;
