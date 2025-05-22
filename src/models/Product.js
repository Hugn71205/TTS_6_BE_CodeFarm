import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String },
    gender: {
      type: String,
      enum: ["Nam", "Nữ", "Unisex"],
      required: true,
    },
    description: { type: String },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    brand_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    created_at: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

const Product = mongoose.model("Product", productSchema);
export default Product;