import mongoose from "mongoose";

const productVariantSchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    volume_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Volume",
      required: true,
    },
    price: {
      type: mongoose.Decimal128,
      required: true,
    },
  },
  { versionKey: false }
);

const ProductVariant = mongoose.model("ProductVariant", productVariantSchema);
export default ProductVariant;
