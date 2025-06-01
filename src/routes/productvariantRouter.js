import express from "express";
import {
  createProductVariant,
  getAllProductVariants,
  getProductVariantById,
  getProductVariantsByProductId,
  updateProductVariant,
  deleteProductVariant
} from "../controllers/productVariantsController.js";

const productVariantRouter = express.Router();

// Route tạo biến thể sản phẩm
productVariantRouter.post("/", createProductVariant);
// Route lấy danh sách biến thể
productVariantRouter.get("/", getAllProductVariants);
// Route lấy biến thể theo product ID
productVariantRouter.get("/product/:productId", getProductVariantsByProductId);
// Route lấy biến thể theo ID
productVariantRouter.get("/:id", getProductVariantById);
// Route cập nhật biến thể
productVariantRouter.put("/:id", updateProductVariant);
// Route xóa biến thể
productVariantRouter.delete("/:id", deleteProductVariant);

export default productVariantRouter;