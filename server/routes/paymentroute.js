const express=require('express');
const router=express.Router();
const {protect,authorize}=require("../middleware/authmiddleware");
router.post('/checkout', protect, authorize("client"),createCheckoutSession); 
router.get('/success',paymentSuccess);                         
router.get('/cancel',paymentCancel);                          

module.exports = router;