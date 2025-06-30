import Order from '../models/Order.js';
import OrderItem from '../models/OrderItem.js';
import ProductVariant from '../models/ProductVariant.js';
import mongoose from 'mongoose';

// [GET] /orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    return res.status(200).json({
      message: 'Lấy danh sách đơn hàng thành công',
      data: { orders },
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Lỗi khi lấy danh sách đơn hàng',
      error: err.message,
    });
  }
};

// [GET] /orders/:id
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
    }

    return res.status(200).json({
      message: 'Lấy thông tin đơn hàng thành công',
      data: { order },
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Lỗi khi lấy đơn hàng',
      error: err.message,
    });
  }
};

export const createOrder = async (req, res) => {
  try {
    const {
      user_id,
      customer_info,
      receiver_info,
      shipping_address,
      total_amount,
      shipping_fee,
      payment_method,
      user_note,
      products,
    } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: 'Không có sản phẩm trong đơn hàng' });
    }

    // 👉 Lấy danh sách product_id
    const product_ids = products.map(p => p.product_id);

    // 👉 Tạo đơn hàng mới với product_ids
    const newOrder = new Order({
      user_id,
      customer_info,
      receiver_info,
      shipping_address,
      total_amount,
      shipping_fee,
      payment_method,
      user_note,
      payment_status: 'unpaid',
      is_paid: false,
      status: 'pending',
      product_ids, // ✅ Thêm vào đây
    });

    const savedOrder = await newOrder.save();

    for (const item of products) {
      const { product_id, size, name, image, price, quantity } = item;

      const variants = await ProductVariant.find({ product_id }).populate('volume_id');

      const matchedVariant = variants.find(v => {
        const label = v?.volume_id?.label?.toLowerCase().trim();
        return label === size.toLowerCase().trim();
      });

      console.log("🧪 Kiểm tra biến thể:", {
        inputSize: size,
        product_id,
        matchedVariant: matchedVariant?._id,
        available: variants.map(v => ({
          _id: v._id,
          label: v.volume_id?.label,
          price: v.price?.toString(),
        })),
      });

      if (!matchedVariant) {
        await Order.findByIdAndDelete(savedOrder._id);
        return res.status(400).json({
          message: 'Không tìm thấy biến thể sản phẩm',
          product: { name, product_id, size },
        });
      }

      const orderItem = new OrderItem({
        order_id: savedOrder._id,
        product_variant_id: matchedVariant._id,
        product_name: name,
        image,
        price,
        quantity,
        total: price * quantity,
      });

      await orderItem.save();
    }

    return res.status(201).json({
      message: 'Đặt hàng thành công',
      order_id: savedOrder._id,
    });

  } catch (error) {
    console.error('🔥 Lỗi khi tạo đơn hàng:', error);
    return res.status(500).json({
      message: 'Lỗi khi tạo đơn hàng',
      error: error.message,
    });
  }
};



// [PUT] /orders/:id
export const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
    }

    return res.status(200).json({
      message: 'Cập nhật đơn hàng thành công',
      data: { order: updatedOrder },
    });
  } catch (err) {
    return res.status(400).json({
      message: 'Cập nhật đơn hàng thất bại',
      error: err.message,
    });
  }
};

// [DELETE] /orders/:id
export const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
    }

    await OrderItem.deleteMany({ order_id: deletedOrder._id });

    return res.status(200).json({
      message: 'Xóa đơn hàng thành công',
      data: { order: deletedOrder },
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Xóa đơn hàng thất bại',
      error: err.message,
    });
  }
};