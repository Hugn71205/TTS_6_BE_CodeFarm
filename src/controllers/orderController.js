import Order from '../models/Order.js';

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    return res.success({ orders }, 'Lấy danh sách đơn hàng thành công');
  } catch (err) {
    return res.error(err.message || 'Lỗi khi lấy danh sách đơn hàng', 500);
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.error('Không tìm thấy đơn hàng', 404);
    return res.success({ order }, 'Lấy thông tin đơn hàng thành công');
  } catch (err) {
    return res.error(err.message || 'Lỗi khi lấy đơn hàng', 500);
  }
};

export const createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    return res.success({ order }, 'Tạo đơn hàng thành công', 201);
  } catch (err) {
    return res.error(err.message || 'Tạo đơn hàng thất bại', 400);
  }
};

export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!order) return res.error('Không tìm thấy đơn hàng', 404);
    return res.success({ order }, 'Cập nhật đơn hàng thành công');
  } catch (err) {
    return res.error(err.message || 'Cập nhật đơn hàng thất bại', 400);
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.error('Không tìm thấy đơn hàng', 404);
    return res.success({ order }, 'Xóa đơn hàng thành công');
  } catch (err) {
    return res.error(err.message || 'Xóa đơn hàng thất bại', 500);
  }
};