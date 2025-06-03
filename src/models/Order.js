// models/Order.ts
import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  customer_info: {
    username: String,
    phone_number: String,
    email: String,
  },
  receiver_info: {
    username: String,
    phone_number: String,
    email: String,
  },
  total_amount: Number,
  shipping_address: {
    detail_address: String,
    province: String,
    district: String,
    ward: String,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'out for delivery', 'delivered', 'canceled', 'done'],
    default: 'pending',
  },
  is_paid: { type: Boolean, default: false },
  payment_status: {
    type: String,
    enum: ['pending', 'successfully', 'failed'],
    default: 'pending',
  },
  payment_method: String,
  transaction_id: String,
  shipping_fee: Number,
  description: String,
  tracking_number: String,
  user_note: String,
  cancel_by: { type: String, enum: ['user', 'admin'] },
}, { timestamps: true });

export default mongoose.model('Order', OrderSchema);
