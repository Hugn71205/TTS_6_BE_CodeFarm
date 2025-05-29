import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";
import { sendMail } from "../utils/sendMail.js"; // Giả sử bạn có một hàm gửi mail

const tempUsers = {};

async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    // Kiểm tra email đã tồn tại trong DB thật chưa
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }

    // Tạo mã code xác minh và thời gian hết hạn
    const verificationCode = ("" + Math.floor(100000 + Math.random() * 900000));
    const codeExpire = new Date(Date.now() + 15 * 60 * 1000);

    // Lưu tạm user và mã (password chưa hash)
    tempUsers[email] = { name, email, password, verificationCode, codeExpire };

    // Gửi mail chứa mã
    await sendMail(email, "Mã xác minh", `Mã của bạn: ${verificationCode}`);

    return res.status(200).json({ message: "Mã xác minh đã được gửi." });
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
      return res.status(401).json({
        message: "Người dùng không tồn tại, hãy kiểm tra lại email và mật khẩu!",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Sai mật khẩu, hãy kiểm tra và thử lại!" });
    }

    // ✅ Kiểm tra tài khoản có bị khóa không
    if (user.isBlocked) {
      return res.status(403).json({ message: "Tài khoản của bạn đã bị khóa. Vui lòng liên hệ quản trị viên." });
    }

    const token = jwt.sign({ id: user._id }, "diablo", { expiresIn: "1w" });

    res.json({ ...user.toObject(), password: undefined, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


async function getAllUsers(req, res) {
  try {
    const users = await UserModel.find({}, { password: 0 });

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export { register, login, getAllUsers};

export const deleteUser = async (req,res)=>{
    try {
        // Lấy id
        const id = req.params.id
        // Tìm sản phẩm theo id
        const user = await UserModel.findOne({_id:id})
        if (user){
            await UserModel.findOneAndDelete({_id:id})
            res.status(200).send({message:"Xóa người dùng thành công",status:true})
        }
        else throw {mes:"Không tìm thấy người dùng",code:404}
    } catch (error) {
        // console.log(error);        
        res.status(error.code??500).send({message:error.mes??"Xóa không thành công",status:false})
    }
}

// controllers/user.controller.ts
export const blockUser = async (req, res) => {
  try {
    const { id } = req.params
    const { isBlocked } = req.body

    const updatedUser = await UserModel.findByIdAndUpdate(id, { isBlocked }, { new: true })

    if (!updatedUser) {
      return res.status(404).json({ message: "Người dùng không tồn tại" })
    }

    res.json({ message: isBlocked ? "Đã khóa người dùng" : "Đã mở khóa người dùng", user: updatedUser })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

 // tùy vị trí file của bạn

async function verifyEmailHandler(req, res) {
  try {
    console.log("📨 Body nhận được:", req.body);

    const { email, code } = req.body;

    if (!email?.trim() || !code?.trim()) {
      console.warn("⚠️ Thiếu email hoặc mã xác minh:", { email, code });
      return res.status(400).json({ message: "Email và mã xác minh là bắt buộc." });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Người dùng không tồn tại." });
    }

    if (user.verified) {
      return res.status(400).json({ message: "Email đã được xác minh." });
    }

    const expireDate = new Date(user.codeExpire);
    const now = new Date();

    if (!expireDate || expireDate < now) {
      return res.status(400).json({ message: "Mã xác minh đã hết hạn. Vui lòng yêu cầu mã mới." });
    }

    if (user.verificationCode !== code) {
      return res.status(400).json({ message: "Mã xác minh không đúng. Vui lòng kiểm tra lại." });
    }

    user.verified = true;
    user.verificationCode = null;
    user.codeExpire = null;
    await user.save();

    return res.status(200).json({ message: "✅ Xác minh email thành công!" });
  } catch (error) {
    console.error("❌ Lỗi verifyEmailHandler:", error);
    return res.status(500).json({ message: "Lỗi server. Vui lòng thử lại sau." });
  }
}

export { verifyEmailHandler };





