import { Schema, model } from 'mongoose';

const BrandSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  origin: {
    type: String,
    required: true,
    trim: true
  },
  logo: {
    type: String,
    required: true
  }
}, {
  timestamps: true // optional: adds createdAt and updatedAt fields
});

export default model('Brand', BrandSchema);
