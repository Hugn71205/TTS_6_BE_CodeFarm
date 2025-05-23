import express from "express";
import { deleteUser, getAllUsers, login, register,verifyEmailHandler } from "../controllers/authController.js";
import { forgotPassword } from "../controllers/forgot-pasword.js";

const authRouter = express.Router();

// Route đăng ký
authRouter.post("/register", register);
// Route đăng nhập
authRouter.post("/login", login);
// Route lấy danh sách người dùng
authRouter.get("/list", getAllUsers);
////////////
authRouter.delete("/:id", deleteUser)
// ROute xử lí xác minh
authRouter.post("/verify-email", verifyEmailHandler);
/////
authRouter.post("/forgot-password", forgotPassword);


export default authRouter;
