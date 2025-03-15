const express=require('express');
const router=express.Router();
const {protect,authorize}=require("../middleware/adminmiddleware");

const {registerAdmin,adminLogin,listProviders,listUsers,getProviderById,approveProvider,listspecificuser,gettotalusers,gettotalproviders,getTotalRequestsPending,getTotalRequestsCompleted} = require("../controllers/adminController");



router.get("/listproviders",protect,authorize("admin"),listProviders);
router.get("/getUsers",protect,authorize("admin"),listUsers);
router.get("/viewprovider/:id", protect,authorize("admin") ,getProviderById);
router.put("/approveprovider/:id", protect,authorize("admin") ,approveProvider);
router.get("/user/:id",protect,authorize("admin"),listspecificuser);
//here we call admin but it is checking if it is admin by decoding token in authmiddlware
router.post("/registerAdmin",registerAdmin);
router.post("/adminlogin", adminLogin);
router.get("/totalusers",protect,authorize("admin"),gettotalusers);
router.get("/totalproviders",protect,authorize("admin"),gettotalproviders);
router.get("/totalreqpending",protect,authorize("admin"),getTotalRequestsPending);
router.get("/totalreqcompleted",protect,authorize("admin"),getTotalRequestsCompleted);




module.exports = router;