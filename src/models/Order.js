import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
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
  shipping_address: {
    detail_address: String,
    province: String,
    district: String,
    ward: String,
  },
  total_amount: Number,
  shipping_fee: Number,
  payment_method: {
    type: String,
    enum: ["cash", "vnpay"],
    required: true,
  },
  payment_status: {
    type: String,
    enum: ["unpaid", "paid", "pending"],
    default: "unpaid",
  },
  is_paid: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
  user_note: String,

  // 👇 Danh sách các product_id (tùy chọn)
  product_ids: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    }
  ],
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);
export default Order;
