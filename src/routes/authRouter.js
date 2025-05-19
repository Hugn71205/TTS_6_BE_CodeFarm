import express from "express";
import { getAllUsers, login, register } from "../controllers/authController.js";

const authRouter = express.Router();

// Route đăng ký
authRouter.post("/register", register);
// Route đăng nhập
authRouter.post("/login", login);
// Route lấy danh sách người dùng
authRouter.get("/list", getAllUsers);

export default authRouter;
