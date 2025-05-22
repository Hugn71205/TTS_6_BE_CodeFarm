import Category from "../models/Category.js";
import { CategoryValidate } from "../validate/categoryValidate.js";

export const createCategory = async (req, res) => {
  try {
    const { error } = CategoryValidate.validate(req.body);
    if (error) {
      return res.error(error.details.map(err => err.message), 400);
    }

    const existing = await Category.findOne({ name: req.body.name });
    if (existing) return res.error("Danh mục đã tồn tại", 400);

    const category = await Category.create(req.body);
    return res.success({ data: category }, "Tạo danh mục thành công", 201);
  } catch (err) {
    return res.error("Lỗi server khi tạo danh mục", 500);
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    return res.success({ data: categories }, "Lấy danh sách danh mục thành công");
  } catch (err) {
    return res.error("Lỗi server khi lấy danh sách danh mục", 500);
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.error("Không tìm thấy danh mục", 404);
    return res.success({ data: category }, "Lấy thông tin danh mục thành công");
  } catch (err) {
    return res.error("Lỗi server khi lấy thông tin danh mục", 500);
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { error } = CategoryValidate.validate(req.body);
    if (error) {
      return res.error(error.details.map(err => err.message), 400);
    }

    const updated = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.error("Không tìm thấy danh mục", 404);
    return res.success({ data: updated }, "Cập nhật danh mục thành công");
  } catch (err) {
    return res.error("Lỗi server khi cập nhật danh mục", 500);
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) return res.error("Không tìm thấy danh mục", 404);
    return res.success({ data: deleted }, "Xóa danh mục thành công");
  } catch (err) {
    return res.error("Lỗi server khi xóa danh mục", 500);
  }
};
