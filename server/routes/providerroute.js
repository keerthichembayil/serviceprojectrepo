const express=require('express');
const router=express.Router();
const {protect,authorize}=require("../middleware/authmiddleware");
const upload=require("../middleware/multer");
const  { addProvider,verifyProvider,fetchfreshprovider} = require("../controllers/providerController");
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


// router.post("/setavailability",protect,authorize("provider"),updateavailability);
// router.post("/setserviceaea",protect,authorize("provider"),setservicearea);
// router.get('/service-history', protect, authorize("provider"), getServiceHistory);
// router.get('/earnings', protect, authorize("provider"), getEarnings);

module.exports = router;