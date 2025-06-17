import Joi from "joi";

export const CategoryValidate = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Tên danh mục là bắt buộc",
    "any.required": "Tên danh mục là bắt buộc",
  }),
  description: Joi.string().trim().allow(""),
});