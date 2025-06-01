import Product from "../models/Product.js";
import Category from "../models/Category.js";
import Brand from "../models/Brand.js";
import { ProductValidate } from "../validate/productValidate.js";

// Tạo sản phẩm
export const createProduct = async (req, res) => {
  const { name, image, gender, description, category_id, brand_id } = req.body;

  try {
    const { error } = ProductValidate.validate(req.body);
    if (error) {
      return res.error(
        error.details.map((err) => err.message),
        400
      );
    }

    const category = await Category.findById(category_id);
    if (!category) {
      return res.error("Danh mục không tồn tại", 400);
    }

    const brand = await Brand.findById(brand_id);
    if (!brand) {
      return res.error("Thương hiệu không tồn tại", 400);
    }

    const existing = await Product.findOne({ name, brand_id });
    if (existing) {
      return res.error("Sản phẩm đã tồn tại", 400);
    }

    const newProduct = new Product({
      name,
      image,
      gender,
      description,
      category_id,
      brand_id,
      created_at: new Date(),
    });

    await newProduct.save();

    return res.success({ data: newProduct }, "Tạo sản phẩm thành công", 201);
  } catch (error) {
    return res.error(`Lỗi server khi tạo sản phẩm: ${error.message}`, 500);
  }
};

// Lấy danh sách sản phẩm
export const getAllProducts = async (req, res) => {
  const {
    offset = 0,
    limit = 15,
    name,
    category_id,
    brand_id,
    sortBy = "created_at",
    order = "desc",
  } = req.query;

  const query = {};
  if (name) {
    query.name = { $regex: name, $options: "i" };
  }
  if (category_id) {
    query.category_id = category_id;
  }
  if (brand_id) {
    query.brand_id = brand_id;
  }

  const sortOrder = order === "asc" ? 1 : -1;
  const sortOptions = { [sortBy]: sortOrder };

  try {
    const products = await Product.find(query)
      .populate("category_id", "name")
      .populate("brand_id", "name")
      .sort(sortOptions)
      .skip(parseInt(offset))
      .limit(parseInt(limit));

    const total = await Product.countDocuments(query);

    return res.success(
      {
        data: products,
        offset: parseInt(offset),
        limit: parseInt(limit),
        totalItems: total,
        hasMore: parseInt(offset) + parseInt(limit) < total,
      },
      "Lấy danh sách sản phẩm thành công"
    );
  } catch (error) {
    return res.error("Lỗi server khi lấy danh sách sản phẩm", 500);
  }
};

// Lấy sản phẩm theo ID
export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id)
      .populate("category_id", "name")
      .populate("brand_id", "name");

    if (!product) {
      return res.error("Không tìm thấy sản phẩm", 404);
    }

    return res.success({ data: product }, "Lấy thông tin sản phẩm thành công");
  } catch (error) {
    return res.error("Lỗi server khi lấy thông tin sản phẩm", 500);
  }
};

// Cập nhật sản phẩm
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, image, gender, description, category_id, brand_id } = req.body;

  try {
    const { error } = ProductValidate.validate(req.body);
    if (error) {
      return res.error(
        error.details.map((err) => err.message),
        400
      );
    }

    const category = await Category.findById(category_id);
    if (!category) {
      return res.error("Danh mục không tồn tại", 404);
    }

    const brand = await Brand.findById(brand_id);
    if (!brand) {
      return res.error("Thương hiệu không tồn tại", 404);
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        $set: {
          name,
          image,
          gender,
          description,
          category_id,
          brand_id,
        },
      },
      { new: true }
    )
      .populate("category_id", "name")
      .populate("brand_id", "name");

    if (!updatedProduct) {
      return res.error("Không tìm thấy sản phẩm", 404);
    }

    return res.success({ data: updatedProduct }, "Cập nhật sản phẩm thành công");
  } catch (error) {
    return res.error("Lỗi server khi cập nhật sản phẩm", 500);
  }
};

// Xoá sản phẩm
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) {
      return res.error("Không tìm thấy sản phẩm", 404);
    }

    return res.success({ data: deleted }, "Xoá sản phẩm thành công");
  } catch (error) {
    return res.error("Lỗi server khi xoá sản phẩm", 500);
  }
};