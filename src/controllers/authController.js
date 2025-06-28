import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";
import { registerSchema } from "../validate/auth.js";

async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    const { error } = registerSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errorsMessage = error.details.map((err) => err.message);
      return res.status(400).json({ message: errorsMessage });
    }

    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email existed" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      email,
      password: hashedPassword,
    };
    const userCreated = await UserModel.create(newUser);

    res.json({ ...userCreated.toObject(), password: undefined });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
      return res.status(401).json({ message: "Người dùng không tồn tại, hãy kiểm tra lại email và mật khẩu!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Sai mật khẩu, hãy kiểm tra và thử lại!" });
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

    // Ép kiểu Date để chắc chắn so sánh chính xác
    const expireDate = new Date(user.codeExpire);
    const now = new Date();

    if (
      user.verificationCode !== code ||
      !expireDate ||
      expireDate < now
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
export { verifyEmailHandler };



export const getMe = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Không có thông tin người dùng." });
    }

    const user = await UserModel.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng." });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Lỗi trong getMe:", error);
    res.status(500).json({ message: "Lỗi server." });
  }
};

export const updateMe = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, email, phone, address } = req.body;

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { name, email, phone, address },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error("Lỗi khi cập nhật tài khoản:", error);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
};
