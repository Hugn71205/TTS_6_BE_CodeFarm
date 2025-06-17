import express from 'express';
import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} from '../controllers/orderController.js';

const router = express.Router();

router.get('/', getAllOrders);
router.get('/:id', getOrderById);
router.post('/', createOrder);
router.patch('/:id', updateOrder);
router.delete('/:id', deleteOrder);

export default router;