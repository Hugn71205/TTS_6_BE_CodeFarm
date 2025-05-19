import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";
import { registerSchema } from "../validate/auth.js";

async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    // Kiểm tra dữ liệu hợp lệ
    const { error } = registerSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errorsMessage = error.details.map((err) => err.message);
      return res.status(400).json({ message: errorsMessage });
    }

    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email existed" });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Thêm user (bổ sung name)
    const newUser = {
      name,
      email,
      password: hashedPassword,
    };
    const userCreated = await UserModel.create(newUser);

    // Remove password trong response
    res.json({ ...userCreated.toObject(), password: undefined });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Kiểm tra dữ liệu hợp lệ
    if (!email || !password) {
      return res.status(400).json({ message: "Hãy điền email và password!" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password tối thiểu 6 kí tự!" });
    }

    // Tìm user theo email (chỉnh thành UserModel)
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Người dùng không tồn tại, hãy kiểm tra lại email và mật khẩu!" });
    }

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Sai mật khẩu, hãy kiểm tra và thử lại!" });
    }

    // Tạo token JWT
    const token = jwt.sign({ id: user._id }, "diablo", { expiresIn: "1w" });

    // Remove password trong response
    res.json({ ...user.toObject(), password: undefined, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getAllUsers(req, res) {
  try {
    // Lấy tất cả người dùng, loại bỏ password khỏi kết quả
    const users = await UserModel.find({}, { password: 0 });

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export { register, login, getAllUsers};
