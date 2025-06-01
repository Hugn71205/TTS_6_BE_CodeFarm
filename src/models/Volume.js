import mongoose from "mongoose";

const volumeSchema = new mongoose.Schema({
  size: {
    type: Number,
    required: true,
    min: 1,
  },
  label: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
});

export default mongoose.model("Volume", volumeSchema);