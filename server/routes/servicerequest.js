const express=require('express');
const router=express.Router();
const { requestService, getClientRequests, getProviderRequests, updateRequestStatus } = require("../controllers/serviceRequestController");
const {protect,authorize}=require("../middleware/authmiddleware");
//client
router.post("/request",protect, authorize("client"), requestService);
router.get("/client-requests",protect, authorize("client"), getClientRequests);
//provider
router.get("/provider-requests", protect,authorize("provider"), getProviderRequests);
router.put("/update-status", protect,authorize("provider"), updateRequestStatus);

 
// router.get("/:id",protect,getServiceDetails);//both can view details

//provider
// router.put('/accept/:id',protect,authorize("provider"),acceptRequest);
// router.put('/complete/:id',protect,authorize("provider"),markRequestComplete);

module.exports=router;
