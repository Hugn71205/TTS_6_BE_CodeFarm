import Coupon from '../models/Coupon.js';
import OrderCoupon from '../models/OrderCoupon.js';

export const applyCouponToOrder = async (req, res) => {
  try {
    const { order_id, coupon_code, order_total } = req.body;

    const coupon = await Coupon.findOne({ code: coupon_code });

    if (!coupon || !coupon.is_active || coupon.used_count >= coupon.usage_limit) {
      return res.status(400).json({ message: 'Invalid or expired coupon' });
    }

    const now = new Date();
    if (now < coupon.start_date || now > coupon.end_date) {
      return res.status(400).json({ message: 'Coupon not valid at this time' });
    }

    const minOrder = parseFloat(coupon.min_order_amount.toString());
    if (order_total < minOrder) {
      return res.status(400).json({ message: `Minimum order amount is ${minOrder}` });
    }

    let discount = 0;
    const value = parseFloat(coupon.discount_value.toString());
    if (coupon.discount_type === 'percent') {
      discount = order_total * (value / 100);
    } else {
      discount = value;
    }

    // Save usage
    const orderCoupon = new OrderCoupon({
      order_id,
      coupon_id: coupon._id,
      discount_amount: discount
    });
    await orderCoupon.save();

    coupon.used_count += 1;
    await coupon.save();

    res.status(201).json({ message: 'Coupon applied', discount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
