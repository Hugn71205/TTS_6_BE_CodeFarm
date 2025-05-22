import express from "express";
import cors from "cors";
import connectDB from "./src/configs/db.js"; // Đảm bảo import đúng connectDB
import router from "./src/routes/index.js";
import dotenv from "dotenv";
import authRouter from "./src/routes/authRouter.js";
import categoryRouter from "./src/routes/categoryRouter.js";
import brandRouter from "./src/routes/brandRouter.js";
import productRouter from "./src/routes/productRouter.js";
import responseHandler from "./src/middlewares/responseHandle.js";

// Load biến môi trường
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(responseHandler)

// Kết nối MongoDB
connectDB();
// API routes
app.use("/api", router);
app.use("/auth", authRouter);
app.use("/categories", categoryRouter);
app.use("/brands", brandRouter);
app.use("/products", productRouter);


// Khởi động server
const PORT = process.env.PORT || 8888;
app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}/api`);
});
