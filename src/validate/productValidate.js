import Joi from "joi";

export const ProductValidate = Joi.object({
  name: Joi.string().required().trim().messages({
    "string.empty": "Tên sản phẩm là bắt buộc",
    "any.required": "Tên sản phẩm là bắt buộc",
  }),
  image: Joi.string().trim().allow("").optional(),
  gender: Joi.string()
    .valid("Nam", "Nữ", "Unisex")
    .required()
    .messages({
      "any.only": "Giới tính phải là Nam, Nữ hoặc Unisex",
      "any.required": "Giới tính là bắt buộc",
    }),
  description: Joi.string().trim().allow("").optional(),
  category_id: Joi.string().required().messages({
    "string.empty": "Danh mục là bắt buộc",
    "any.required": "Danh mục là bắt buộc",
  }),
  brand_id: Joi.string().required().messages({
    "string.empty": "Thương hiệu là bắt buộc",
    "any.required": "Thương hiệu là bắt buộc",
  }),
});