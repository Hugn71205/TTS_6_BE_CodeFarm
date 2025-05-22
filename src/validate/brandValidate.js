import Joi from "joi";

export const BrandValidate = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Tên thương hiệu là bắt buộc",
    "any.required": "Tên thương hiệu là bắt buộc",
  }),
  origin: Joi.string().trim().allow(""),
  logo: Joi.string().trim().allow(""),
});