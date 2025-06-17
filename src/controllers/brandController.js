import Brand from "../models/Brand.js";
import { BrandValidate } from "../validate/brandValidate.js";

export const createBrand = async (req, res) => {
  try {
    const { error } = BrandValidate.validate(req.body);
    if (error) {
      return res.error(error.details.map(err => err.message), 400);
    }

    const existing = await Brand.findOne({ name: req.body.name });
    if (existing) return res.error("Thương hiệu đã tồn tại", 400);

    const brand = await Brand.create(req.body);
    return res.success({ data: brand }, "Tạo thương hiệu thành công", 201);
  } catch (err) {
    return res.error("Lỗi server khi tạo thương hiệu", 500);
  }
};

export const getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find().sort({ createdAt: -1 });
    return res.success({ data: brands }, "Lấy danh sách thương hiệu thành công");
  } catch (err) {
    return res.error("Lỗi server khi lấy danh sách thương hiệu", 500);
  }
};

export const getBrandById = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) return res.error("Không tìm thấy thương hiệu", 404);
    return res.success({ data: brand }, "Lấy thông tin thương hiệu thành công");
  } catch (err) {
    return res.error("Lỗi server khi lấy thông tin thương hiệu", 500);
  }
};

export const updateBrand = async (req, res) => {
  try {
    const { error } = BrandValidate.validate(req.body);
    if (error) {
      return res.error(error.details.map(err => err.message), 400);
    }

    const updated = await Brand.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.error("Không tìm thấy thương hiệu", 404);
    return res.success({ data: updated }, "Cập nhật thương hiệu thành công");
  } catch (err) {
    return res.error("Lỗi server khi cập nhật thương hiệu", 500);
  }
};

export const deleteBrand = async (req, res) => {
  try {
    const deleted = await Brand.findByIdAndDelete(req.params.id);
    if (!deleted) return res.error("Không tìm thấy thương hiệu", 404);
    return res.success({ data: deleted }, "Xóa thương hiệu thành công");
  } catch (err) {
    return res.error("Lỗi server khi xóa thương hiệu", 500);
  }
};
