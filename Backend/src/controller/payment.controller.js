// controllers/razorpayController.js

import Razorpay from "razorpay";
import crypto from "crypto";
import { AppError } from "../utils/errorHandler.utils.js";
import { RAZORPAY_KEY, RAZORPAY_SECRET } from "../config/payment.config.js";

console.log(RAZORPAY_SECRET, RAZORPAY_KEY);
const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY, // Replace with your Razorpay Key ID
  key_secret: RAZORPAY_SECRET, // Replace with your Razorpay Key Secret
});

// Controller to create an order
const createOrder = async (req, res) => {
  const { amount } = req.body;

  try {
    const price = amount * 100;
    const order = await razorpay.orders.create({
      amount: price,
      currency: "INR",
      receipt: "receipt#1",
    });

    res.json({
      orderId: order.id,
      amount: order.amount,
    });
  } catch (error) {
    if (error instanceof AppError) {
      return next(error);
    }
    console.error("Unexpected error from allride controller:", error.message);
    return next(new AppError("error creating order", 500));
  }
};

// Controller to handle payment callback and verify the signature
const paymentCallback = (req, res) => {
  const { payment_id, order_id, signature } = req.body;

  const body = order_id + "|" + payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET) // Replace with your Razorpay Key Secret
    .update(body.toString())
    .digest("hex");

  if (signature === expectedSignature) {
    // Payment is verified
    res.status(200).send("Payment successful");
  } else {
    // Payment signature mismatch
    res.status(400).send("Payment verification failed");
  }
};

export { createOrder, paymentCallback };
