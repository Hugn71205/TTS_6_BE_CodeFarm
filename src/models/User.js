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
    verified: {
    type: Boolean,
    default: false,
  },
  verificationCode: {          // thêm trường mã xác minh
    type: String,
    default: null,
  },
  codeExpire: {                // thêm trường thời hạn mã
    type: Date,
    default: null,
  },
    
  },
  {
    timestamps: true,
  }
);


const UserModel = mongoose.model("User", userSchema);

export default UserModel;
