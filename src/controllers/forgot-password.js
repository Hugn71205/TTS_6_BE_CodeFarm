import User from "../models/User.js";
import { sendEmail } from "../utils/email.js";

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    // Tạo OTP 6 số
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Thiết lập thời gian hết hạn OTP (ví dụ 5 phút)
    const otpExpiry = Date.now() + 5 * 60 * 1000;

    // Lưu OTP và thời gian hết hạn vào user
    user.resetOTP = otp;
    user.resetOTPExpires = otpExpiry;

    await user.save();

    // Gửi mail OTP
    const emailSubject = "Mã OTP đặt lại mật khẩu của bạn";
    const emailText = `Mã OTP của bạn là: ${otp}. Mã này có hiệu lực trong 5 phút.`;

    await sendEmail(email, emailSubject, emailText);

    return res.status(200).json({ message: "Đã gửi mã OTP về email của bạn" });
  } catch (error) {
    next(error);
  }
};
