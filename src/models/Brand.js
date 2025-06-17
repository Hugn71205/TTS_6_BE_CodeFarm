import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    origin: {
      type: String,
      trim: true,
    },
    logo: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Brand = mongoose.model("Brand", brandSchema);
export default Brand;