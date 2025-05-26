import UserModel from '../models/User.js';

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: 'Vui lòng cung cấp email và mã OTP' });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Người dùng không tồn tại' });
    }

    // So sánh chuỗi OTP để tránh kiểu dữ liệu khác
    if (String(user.resetOTP) !== String(otp)) {
      return res.status(400).json({ message: 'OTP không hợp lệ' });
    }

    if (Date.now() > user.resetOTPExpires) {
      return res.status(400).json({ message: 'OTP đã hết hạn' });
    }

    res.json({ message: 'Xác thực OTP thành công', allowReset: true });
  } catch (error) {
    console.error('Lỗi verifyOTP:', error);
    res.status(500).json({ message: 'Lỗi server, vui lòng thử lại sau' });
  }
};
