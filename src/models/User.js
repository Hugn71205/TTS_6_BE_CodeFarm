// models/user.model.ts
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true
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
  isAdmin: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});


const UserModel = mongoose.model('User', userSchema);

export default UserModel;
