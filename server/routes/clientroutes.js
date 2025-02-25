//client
const express=require('express');
const router=express.Router();
const {protect,authorize}=require("../middleware/authmiddleware");
const  { listfullProviders} = require("../controllers/fullproviderController");
const {getUserProfile,updateUserProfile,deleteUserProfile}=require("../controllers/userprofileController");
router.get("/listproviders",listfullProviders);

router.get("/getmyprofile", protect,authorize("client") ,getUserProfile);
router.put("/updatemyprofile", protect, authorize("client"),updateUserProfile);
router.delete("/deletemyprofile", protect,authorize("client"), deleteUserProfile);

// router.post("/feedback/:id",protect,authorize("client"),addfeedback);
// router.get("/feedback/:id",protect,authorize("client"),getfeedback);
module.exports = router;    