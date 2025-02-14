const express=require('express');
const router=express.Router();
const {protect,authorize}=require("../middleware/authmiddleware");
//client
router.post("/request",protect, authorize("client"), requestService);

router.get("/",protect,getServiceDetails);//both can view details  Client: List own requests; Provider: List assigned requests
router.get("/:id",protect,getServiceDetails);//both can view details

//provider
router.put('/accept/:id',protect,authorize("provider"),acceptRequest);
router.put('/complete/:id',protect,authorize("provider"),markRequestComplete);

module.exports=router;
