require('dotenv').config();
const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay'); 


const razorpayApiKey = process.env.RAZORPAY_API_KEY;
const razorpayApiSecret = process.env.RAZORPAY_API_SECRET;

// Define a route to create an order
router.post('/', async (req, res) => {
  try {
    const { amount, currency } = req.body; // Extract order details from the request body
    const razorpay = new Razorpay({
        key_id:razorpayApiKey,
      key_secret:razorpayApiSecret,
      });
    // Create an order on Razorpay
    const order = await razorpay.orders.create({
      amount: amount, // Amount in paise (1 INR = 100 paise)
      currency: currency || 'INR', // Currency code (default to INR if not provided)
    //   receipt: 'order_receipt', 
    //   payment_capture: 1, 
    });

    // Send the order ID and other details to the client
    res.json({ order });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ error: 'Unable to create Razorpay order' });
  }
}

)


const paymentVerification = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
  
    const body = razorpay_order_id + "|" + razorpay_payment_id;
  
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
      .update(body.toString())
      .digest("hex");
  
    const isAuthentic = expectedSignature === razorpay_signature;
  
    if (isAuthentic) {
      // Database logic here
  
      await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });
  
      res.redirect(
        `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
      );
    } else {
      res.status(400).json({
        success: false,
      });
    }
  };

module.exports = router,{paymentVerification};

