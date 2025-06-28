import express from 'express';
import {
  createOrderItem,
  getAllOrderItems,
  getOrderItemById,
  getOrderItemsByOrderId,
  updateOrderItem,
  deleteOrderItem,
} from '../controllers/orderItemController.js';

const orderItemRouter = express.Router();

// [POST] Tạo mới một order item
orderItemRouter.post('/', createOrderItem);

// [GET] Lấy tất cả order items
orderItemRouter.get('/', getAllOrderItems);

// [GET] Lấy một order item theo ID
orderItemRouter.get('/:id', getOrderItemById);  

// [GET] Lấy tất cả order items của 1 đơn hàng theo orderId
orderItemRouter.get('/order/:orderId', getOrderItemsByOrderId);

// [PUT] Cập nhật order item
orderItemRouter.put('/:id', updateOrderItem);

// [DELETE] Xóa order item
orderItemRouter.delete('/:id', deleteOrderItem);

export default orderItemRouter;
