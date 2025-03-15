//client
const express=require('express');
const router=express.Router();
const {protect,authorize}=require("../middleware/authmiddleware");
const  { listfullProviders} = require("../controllers/fullproviderController");
const  { getProviderById} = require("../controllers/providerdetailsController");
const {getUserProfile,updateUserProfile,deleteUserProfile,createCheckoutSession,verifyPayment,getPaymentdetails}=require("../controllers/userprofileController");

router.get("/listproviders", protect,authorize("client") ,listfullProviders);
router.get("/listproviderdetails/:id", protect,authorize("client") ,getProviderById);
router.get("/getmyprofile", protect,authorize("client") ,getUserProfile);
router.put("/updatemyprofile", protect, authorize("client"),updateUserProfile);
router.delete("/deletemyprofile", protect,authorize("client"), deleteUserProfile);
router.post("/create-checkout-session",protect,authorize("client"),createCheckoutSession);
router.post("/verify-payment",protect,authorize("client"),verifyPayment);
router.get("/paymentdetails",protect,authorize("client"),getPaymentdetails);

module.exports = router;    