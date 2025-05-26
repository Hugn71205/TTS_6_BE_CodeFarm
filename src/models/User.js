import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false, // Người dùng mặc định là chưa bị khóa
    },
    resetOTP: {
      type: String,
      default: null,
    },
    resetOTPExpires: {
      type: Number,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);


const UserModel = mongoose.model("User", userSchema);

export default UserModel;
