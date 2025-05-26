import dotenv from "dotenv";

dotenv.config();

export const {
  PORT = 8888,
  DB_URI ="mongodb+srv://DUANCF:caovanhung@cluster0.nwe8ceg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  HOST = "http://localhost",
  DB_USER,
  DB_PASS,
  JWT_SECRET,
  JWT_REFRESH_SECRET,
  RESET_PASSWORD_SECRET,
  RESET_PASSWORD_EXPIRES = "15m",
  NODE_ENV = "development",
  SUB_CATEGORY_DEFAULT,
  CATEGORY_DEFAULT, // Sửa lỗi chính tả
  EMAIL_USERNAME ,
  EMAIL_PASSWORD,
  FRONTEND_URL = "http://localhost:5173"
} = process.env;