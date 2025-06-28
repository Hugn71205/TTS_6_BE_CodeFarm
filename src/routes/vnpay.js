// routes/vnpay.js
import express from 'express';
import moment from 'moment';
import querystring from 'qs';
import crypto from 'crypto';

const router = express.Router();

router.post('/create-payment', (req, res) => {
  const ipAddr = req.ip;
  const tmnCode = process.env.VNP_TMNCODE;
  const secretKey = process.env.VNP_HASH_SECRET;
  const vnpUrl = process.env.VNP_URL || 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
  const returnUrl = process.env.VNP_RETURN_URL;

  const date = moment();
  const createDate = date.format('YYYYMMDDHHmmss');
  const orderId = date.format('HHmmss');
  const amount = req.body.amount * 100; // nhân 100 vì VNPAY tính theo đồng
  const bankCode = req.body.bankCode || '';

  const orderInfo = 'Thanh toan don hang';
  const orderType = 'other';
  const locale = 'vn';
  const currCode = 'VND';

  let vnp_Params = {
    vnp_Version: '2.1.0',
    vnp_Command: 'pay',
    vnp_TmnCode: tmnCode,
    vnp_Locale: locale,
    vnp_CurrCode: currCode,
    vnp_TxnRef: orderId,
    vnp_OrderInfo: orderInfo,
    vnp_OrderType: orderType,
    vnp_Amount: amount,
    vnp_ReturnUrl: returnUrl,
    vnp_IpAddr: ipAddr,
    vnp_CreateDate: createDate,
  };

  if (bankCode !== '') {
    vnp_Params['vnp_BankCode'] = bankCode;
  }

  // Bước 2: Tạo chuỗi query & hash
  vnp_Params = sortObject(vnp_Params);
  const signData = querystring.stringify(vnp_Params, { encode: false });
  const hmac = crypto.createHmac('sha512', secretKey);
  const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

  vnp_Params['vnp_SecureHash'] = signed;
  const paymentUrl = `${vnpUrl}?${querystring.stringify(vnp_Params, { encode: false })}`;

  res.json({ paymentUrl });
});

// Helper để sắp xếp object
function sortObject(obj) {
  const sorted = {};
  Object.keys(obj)
    .sort()
    .forEach((key) => {
      sorted[key] = obj[key];
    });
  return sorted;
}

export default router;
