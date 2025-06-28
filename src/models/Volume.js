import mongoose from "mongoose";

const volumeSchema = new mongoose.Schema(
  {
    size: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

const Volume = mongoose.model("Volume", volumeSchema);
export default Volume;