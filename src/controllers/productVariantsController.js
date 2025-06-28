import ProductVariant from "../models/ProductVariant.js";

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
    const { genders, volumes, types } = req.query;

    const matchStage = {};

    if (genders) {
      matchStage["product.gender"] = { $in: genders.split(",") };
    }

    if (volumes) {
      matchStage["volume.label"] = { $in: volumes.split(",") };
    }

    if (types) {
      matchStage["product.type"] = { $in: types.split(",") };
    }

    const variants = await ProductVariant.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "product_id",
          foreignField: "_id",
          as: "product"
        }
      },
      { $unwind: "$product" },
      {
        $lookup: {
          from: "volumes",
          localField: "volume_id",
          foreignField: "_id",
          as: "volume"
        }
      },
      { $unwind: "$volume" },
      {
        $match: matchStage
      },
      {
        $project: {
          _id: 1,
          price: 1,
          "product.name": 1,
          "product.image": 1,
          "product.status": 1,
          "product.gender": 1,
          "volume.label": 1
        }
      }
    ]);

    res.json(variants);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy danh sách product variants",
      error
    });
  }
};



// Lấy chi tiết product variant theo id
export const getProductVariantById = async (req, res) => {
  try {
    const { id } = req.params;

    const currentVariant = await ProductVariant.findById(id)
      .populate("product_id")
      .populate("volume_id");

    if (!currentVariant) {
      return res.status(404).json({ message: "Không tìm thấy product variant" });
    }

    const siblingVariants = await ProductVariant.find({
      product_id: currentVariant.product_id._id,
    }).populate("volume_id");

    res.json({
      current: currentVariant,
      variants: siblingVariants,
    });
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