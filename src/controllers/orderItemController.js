import mongoose from 'mongoose';
import OrderItem from '../models/OrderItem.js';

// [POST] /api/order-items
export const createOrderItem = async (req, res) => {
  try {
    const orderItem = new OrderItem(req.body);
    const saved = await orderItem.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: 'Tạo order item thất bại', error });
  }
};

// [GET] /api/order-items
export const getAllOrderItems = async (req, res) => {
  try {
    const items = await OrderItem.find()
      .populate('product_variant_id')
      .populate('order_id'); // Optional: nếu muốn lấy cả thông tin đơn hàng
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách order items', error });
  }
};

// [GET] /api/order-items/:id
export const getOrderItemById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID không hợp lệ' });
    }

    const item = await OrderItem.findById(id)
      .populate('product_variant_id')
      .populate('order_id');
      
    if (!item) return res.status(404).json({ message: 'Không tìm thấy order item' });

    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy order item', error });
  }
};

// [GET] /api/order-items/order/:orderId
export const getOrderItemsByOrderId = async (req, res) => {
  try {
    const { orderId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ message: 'order_id không hợp lệ' });
    }

    const items = await OrderItem.find({ order_id: orderId })
      .populate('product_variant_id')
      .populate('order_id');

    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy order items theo order_id', error });
  }
};

// [PUT] /api/order-items/:id
export const updateOrderItem = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID không hợp lệ' });
    }

    const updated = await OrderItem.findByIdAndUpdate(id, req.body, { new: true })
      .populate('product_variant_id')
      .populate('order_id');

    if (!updated) return res.status(404).json({ message: 'Không tìm thấy order item để cập nhật' });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật order item', error });
  }
};

// [DELETE] /api/order-items/:id
export const deleteOrderItem = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID không hợp lệ' });
    }

    const deleted = await OrderItem.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ message: 'Không tìm thấy order item để xóa' });

    res.json({ message: 'Xóa order item thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa order item', error });
  }
};
