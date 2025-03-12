const express=require('express');
const { updatePaymentStatus } = require("../controllers/paymentController");
const router=express.Router();
router.put("/update-payment-status", updatePaymentStatus);
module.exports = router;   