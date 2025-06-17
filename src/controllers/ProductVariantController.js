import ProductVariant from "../models/productVariant.js";

// Tạo mới product variant
export const createProductVariant = async (req, res) => {
  try {
    const { product_id, volume_id, price } = req.body;

    const newVariant = new ProductVariant({
      product_id,
      volume_id,
      price,
    });

    const savedVariant = await newVariant.save();
    res.status(201).json(savedVariant);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi tạo product variant", error });
  }
};

// Lấy danh sách tất cả product variants
export const getAllProductVariants = async (req, res) => {
  try {
    const variants = await ProductVariant.find()
      .populate("product_id")
      .populate("volume_id");
    res.json(variants);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách product variants", error });
  }
};

// Lấy chi tiết product variant theo id
export const getProductVariantById = async (req, res) => {
  try {
    const { id } = req.params;
    const variant = await ProductVariant.findById(id)
      .populate("product_id")
      .populate("volume_id");
    if (!variant) {
      return res.status(404).json({ message: "Không tìm thấy product variant" });
    }
    res.json(variant);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy chi tiết product variant", error });
  }
};

// Cập nhật product variant theo id
export const updateProductVariant = async (req, res) => {
  try {
    const { id } = req.params;
    const { product_id, volume_id, price } = req.body;

    const updatedVariant = await ProductVariant.findByIdAndUpdate(
      id,
      { product_id, volume_id, price },
      { new: true }
    );

    if (!updatedVariant) {
      return res.status(404).json({ message: "Không tìm thấy product variant để cập nhật" });
    }

    res.json(updatedVariant);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật product variant", error });
  }
};

// Xóa product variant theo id
export const deleteProductVariant = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedVariant = await ProductVariant.findByIdAndDelete(id);

    if (!deletedVariant) {
      return res.status(404).json({ message: "Không tìm thấy product variant để xóa" });
    }

    res.json({ message: "Xóa product variant thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa product variant", error });
  }
};
