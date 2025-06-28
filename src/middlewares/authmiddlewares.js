import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Không có token." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_secret_key");
    const user = await UserModel.findById(decoded.id).select("-password");

    if (!user) return res.status(404).json({ message: "Người dùng không tồn tại." });

    req.user = user;
    req.userId = user._id;
    next();
  } catch (error) {
    console.error("Xác thực thất bại:", error);
    return res.status(403).json({ message: "Token không hợp lệ hoặc hết hạn." });
  }
};

export default authMiddleware;
