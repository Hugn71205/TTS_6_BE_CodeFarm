import {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUserById,
  updateUserById,
} from "../services/user.service.js";

import { registerSchema, loginSchema } from "../validate/auth.js";

export const register = async (req, res) => {
  try {
    const { error } = registerSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({ message: error.details.map((e) => e.message) });
    }

    const user = await registerUser(req.body);
    res.json(user);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || "Đăng ký thất bại" });
  }
};

export const login = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details.map((e) => e.message) });
    }

    const user = await loginUser(req.body);
    res.json(user);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || "Đăng nhập thất bại" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Không thể lấy danh sách người dùng" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await deleteUserById(req.params.id);
    res.json({ message: "Xóa người dùng thành công" });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || "Xóa thất bại" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await updateUserById(req.user.id, req.body);
    res.json(user);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message || "Cập nhật thất bại" });
  }
};