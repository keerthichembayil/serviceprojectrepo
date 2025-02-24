//client
const express=require('express');
const router=express.Router();
const {protect,authorize}=require("../middleware/authmiddleware");
const  { listfullProviders} = require("../controllers/fullproviderController");
router.get("/listproviders",listfullProviders);
// router.put("/update/:id",protect,authorize("client"),updateclientprofile);
// router.post("/feedback/:id",protect,authorize("client"),addfeedback);
// router.get("/feedback/:id",protect,authorize("client"),getfeedback);
module.exports = router;    