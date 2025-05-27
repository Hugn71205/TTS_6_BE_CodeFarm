import bcrypt from "bcryptjs"
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
