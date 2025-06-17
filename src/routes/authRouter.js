import express from "express";
import { deleteUser, getUsers, login, register } from "../controllers/authController.js";

const authRouter = express.Router();

// Route đăng ký
authRouter.post("/register", register);
// Route đăng nhập
authRouter.post("/login", login);
// Route lấy danh sách người dùng
authRouter.get("/", getUsers);
// Route xóa người dùng
authRouter.delete("/:id", deleteUser);

export default authRouter;
