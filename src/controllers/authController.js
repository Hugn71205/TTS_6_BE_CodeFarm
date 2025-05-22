import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";
import { registerSchema } from "../validate/auth.js";
import { sendMail } from "../utils/emailService.js";


async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    // Validate dữ liệu (bạn dùng validate riêng)

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo mã code ngẫu nhiên 6 số
    const verificationCode = ("" + Math.floor(100000 + Math.random() * 900000)); 
    const codeExpire = new Date(Date.now() + 15 * 60 * 1000); // 15 phút

    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      verified: false,
      verificationCode,
      codeExpire,
    });

    // // Gửi mail kèm mã code
    // await sendMail(
    //   email,
    //   "Mã xác minh email của bạn",
    //   `<p>Chào ${name},</p><p>Mã xác minh email của bạn là: <b>${verificationCode}</b></p><p>Mã có hiệu lực 15 phút.</p>`
    // );

    return res.status(201).json({
      message: "Đăng ký thành công. Vui lòng kiểm tra email để lấy mã xác minh.",
    });
  } catch (error) {
    console.error("Lỗi register:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Hãy điền email và password!" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password tối thiểu 6 kí tự!" });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Người dùng không tồn tại" });
    }

    if (!user.verified) {
      return res.status(401).json({ message: "Vui lòng xác minh email trước khi đăng nhập" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Sai mật khẩu" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    const userData = user.toObject();
    delete userData.password;

    return res.json({ ...userData, token });
  } catch (error) {
    console.error("Lỗi tại login:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await UserModel.find({}, { password: 0 });
    return res.json(users);
  } catch (error) {
    console.error("Lỗi tại getAllUsers:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
}

async function verifyEmailHandler(req, res) {
  try {
    const { email, code } = req.body;
    if (!email || !code) {
      return res.status(400).json({ message: "Email và mã xác minh là bắt buộc" });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Người dùng không tồn tại" });
    }

    if (user.verified) {
      return res.status(400).json({ message: "Email đã được xác minh" });
    }

    if (
      user.verificationCode !== code ||
      !user.codeExpire ||
      user.codeExpire < new Date()
    ) {
      return res.status(400).json({ message: "Mã xác minh không hợp lệ hoặc đã hết hạn" });
    }

    user.verified = true;
    user.verificationCode = null;
    user.codeExpire = null;
    await user.save();

    return res.status(200).json({ message: "Xác minh email thành công!" });
  } catch (error) {
    console.error("Lỗi verifyEmailHandler:", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
}

export { register, login, getAllUsers, verifyEmailHandler };
