import express from "express";
import {
  createBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
  deleteBrand
} from "../controllers/brandController.js";

const brandRouter = express.Router();

// Route tạo thương hiệu
brandRouter.post("/", createBrand);
// Route lấy danh sách thương hiệu
brandRouter.get("/", getAllBrands);
// Route lấy thương hiệu theo ID
brandRouter.get("/:id", getBrandById);
// Route cập nhật thương hiệu
brandRouter.put("/:id", updateBrand);
// Route xóa thương hiệu
brandRouter.delete("/:id", deleteBrand);

export default brandRouter;