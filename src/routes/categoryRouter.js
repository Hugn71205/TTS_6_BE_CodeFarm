import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

const categoryRouter = express.Router();

// Route tạo danh mục
categoryRouter.post("/", createCategory);
// Route lấy danh sách danh mục
categoryRouter.get("/", getAllCategories);
// Route lấy danh mục theo ID
categoryRouter.get("/:id", getCategoryById);
// Route cập nhật danh mục
categoryRouter.put("/:id", updateCategory);
// Route xóa danh mục
categoryRouter.delete("/:id", deleteCategory);

export default categoryRouter;
