import Coupon from '../models/Coupon.js';

export const getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find();

    // chuyển số từ Decimal128 sang Number hoặc String nếu bạn muốn
    const parsed = coupons.map((item) => ({
      ...item.toObject(), // chuyển sang object plain
      discount_value: parseFloat(item.discount_value.toString()),
      min_order_amount: parseFloat(item.min_order_amount.toString()),
    }));

    res.json(parsed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCouponById = async (req, res) => {
  try {
    const item = await Coupon.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });

    res.json({ 
      ...item.toObject(), 
      discount_value: parseFloat(item.discount_value.toString()), 
      min_order_amount: parseFloat(item.min_order_amount.toString()) 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const createCoupon = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);
    const coupon = new Coupon(req.body);
    await coupon.save();
    res.status(201).json(coupon);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateCoupon = async (req, res) => {
  try {
    const updated = await Coupon.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) return res.status(404).json({ message: 'Coupon not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteCoupon = async (req, res) => {
  try {
    const deleted = await Coupon.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Coupon not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
