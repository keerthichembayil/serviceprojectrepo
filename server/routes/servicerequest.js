const express=require('express');
const router=express.Router();
const { requestService, getClientRequests, getProviderRequests, updateRequestStatus } = require("../controllers/serviceRequestController");
const {protect,authorize}=require("../middleware/authmiddleware");
//client

router.post("/request",protect, authorize("client"), requestService);
router.get("/clientrequests",protect, authorize("client"), getClientRequests);
//provider
router.get("/providerrequests", protect,authorize("provider"), getProviderRequests);
router.put("/updatestatus", protect,authorize("provider"), updateRequestStatus);

 


module.exports=router;
