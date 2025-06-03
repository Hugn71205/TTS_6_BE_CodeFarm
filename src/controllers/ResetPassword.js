import bcrypt from 'bcryptjs';
import UserModel from '../models/User.js';

export const resetPassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email không tồn tại' });
    }

    // Hash mật khẩu mới
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    // Xóa OTP và expiry sau khi đặt lại mật khẩu thành công
    user.resetOTP = null;
    user.resetOTPExpires = null;

    await user.save();

    res.json({ message: 'Đổi mật khẩu thành công' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
