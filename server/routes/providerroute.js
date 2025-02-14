const express=require('express');
const router=express.Router();
const {protect,authorize}=require("../middleware/authmiddleware");
//provider
router.post("/uploaddocument",protect, authorize("provider"), uploaddocument);
router.post("/setavailability",protect,authorize("provider"),updateavailability);
router.post("/setserviceaea",protect,authorize("provider"),setservicearea);
router.get('/service-history', protect, authorize("provider"), getServiceHistory);
router.get('/earnings', protect, authorize("provider"), getEarnings);
