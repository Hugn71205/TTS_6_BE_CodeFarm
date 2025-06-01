import mongoose from "mongoose";

const productVariantSchema = new mongoose.Schema({
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
    type: mongoose.Schema.Types.Decimal128,
    required: true,
    min: 0,
  },
});
export default mongoose.model("ProductVariant", productVariantSchema);
