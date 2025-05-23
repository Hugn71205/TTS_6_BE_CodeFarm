import express from "express";
import { getAllUsers, login, register } from "../controllers/authController.js";
import { forgotPassword } from "../controllers/forgot-password.js";

const authRouter = express.Router();

// Route đăng ký
authRouter.post("/register", register);
// Route đăng nhập
authRouter.post("/login", login);
// Route lấy danh sách người dùng
authRouter.get("/list", getAllUsers);
authRouter.post("/forgot-password", forgotPassword);

export default authRouter;
