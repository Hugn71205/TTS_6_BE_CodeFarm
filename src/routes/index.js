import { Router } from "express";
import brandRouter from "./brand.router.js"
import couponRoutes from './coupon.routes.js';
import orderCouponRoutes from './orderCoupon.routes.js';

const routes = Router();

routes.use("/brands", brandRouter);
routes.use('/coupons', couponRoutes);
routes.use('/order-coupons', orderCouponRoutes);

routes.get("/", (req, res) => {
    res.json({ message: "API is working!" });
});

export default routes;
