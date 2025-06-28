import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET || "diablo";

export const registerUser = async (data) => {
  const { name, email, password, phone, address, role } = data;

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) throw { status: 400, message: "Email đã tồn tại" };

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await UserModel.create({
    name,
    email,
    password: hashedPassword,
    phone,
    address,
    role: role || "user",
  });

  const userObj = newUser.toObject();
  delete userObj.password;
  return userObj;
};

export const loginUser = async ({ email, password }) => {
  const user = await UserModel.findOne({ email });
  if (!user) throw { status: 401, message: "Email không tồn tại" };

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw { status: 401, message: "Sai mật khẩu" };

  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: "7d",
  });

  const userObj = user.toObject();
  delete userObj.password;
  return { ...userObj, token };
};

export const getAllUsers = async () => {
  return await UserModel.find({}, { password: 0 });
};

export const deleteUserById = async (id) => {
  const user = await UserModel.findById(id);
  if (!user) throw { status: 404, message: "Không tìm thấy người dùng" };

  await UserModel.deleteOne({ _id: id });
  return true;
};

export const updateUserById = async (id, data) => {
  const { name, phone, address } = data;

  const user = await UserModel.findByIdAndUpdate(
    id,
    { name, phone, address },
    { new: true, runValidators: true }
  );

  if (!user) throw { status: 404, message: "Không tìm thấy người dùng" };

  const userObj = user.toObject();
  delete userObj.password;
  return userObj;
};