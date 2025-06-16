import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
  code: { type: String, unique: true, required: true },
  description: String,
  discount_type: { type: String, enum: ['percent', 'amount'], required: true },
  discount_value: { type: mongoose.Types.Decimal128, required: true },
  min_order_amount: { type: mongoose.Schema.Types.Decimal128, default: 0 },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  usage_limit: { type: Number, default: 0 },
  used_count: { type: Number, default: 0 },
  is_active: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
});

export default mongoose.model('Coupon', couponSchema);
