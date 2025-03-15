const express=require('express');
const router=express.Router();
const {protect,authorize}=require("../middleware/authmiddleware");
const upload=require("../middleware/multer");
const  { addProvider,verifyProvider,fetchfreshprovider,getprovider,updateProvider,getpaymentdetprovider} = require("../controllers/providerController");

//provider 


router.post(
  "/addProvider",
  protect, 
  authorize("provider"), 
  upload.fields([
    { name: "image", maxCount: 1 }, // Accept 1 image file
    { name: "document", maxCount: 1 }, // Accept 1 document file
  ]), 
  addProvider
);

router.get("/verify/:token",verifyProvider);


 router.get("/meprovider",protect,authorize("provider"),fetchfreshprovider);
 
 router.get("/providerdte",protect,authorize("provider"),getprovider);
 router.put(
  "/updateprovider",
  protect,
  authorize("provider"),
  upload.single("image"), // Accepts only 1 image file
  updateProvider
);

router.get("/paymentdetprovider",protect,authorize("provider"),getpaymentdetprovider);



module.exports = router;