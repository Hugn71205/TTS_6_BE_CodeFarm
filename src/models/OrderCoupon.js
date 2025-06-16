import mongoose from 'mongoose';

const orderCouponSchema = new mongoose.Schema({
  order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  coupon_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Coupon', required: true },
  discount_amount: { type: mongoose.Types.Decimal128, required: true },
  applied_at: { type: Date, default: Date.now }
});

export default mongoose.model('OrderCoupon', orderCouponSchema);
