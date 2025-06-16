import express from 'express';
import { applyCouponToOrder } from '../controllers/orderCouponController.js';

const router = express.Router();

// POST /order-coupons/apply
router.post('/apply', applyCouponToOrder);

export default router;
