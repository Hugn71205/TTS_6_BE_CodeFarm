import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";

const productRouter = express.Router();

// Route tạo sản phẩm
productRouter.post("/", createProduct);
// Route lấy danh sách sản phẩm
productRouter.get("/", getAllProducts);
// Route lấy sản phẩm theo ID
productRouter.get("/:id", getProductById);
// Route cập nhật sản phẩm
productRouter.put("/:id", updateProduct);
// Route xóa sản phẩm
productRouter.delete("/:id", deleteProduct);

export default productRouter;