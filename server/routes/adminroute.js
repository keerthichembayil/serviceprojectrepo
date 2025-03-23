const express=require('express');
const router=express.Router();
const {protect,authorize}=require("../middleware/adminmiddleware");

const {registerAdmin,adminLogin,listProviders,listUsers,getProviderById,approveProvider,listspecificuser,gettotalusers,gettotalproviders,getTotalRequestsPending,getTotalRequestsCompleted,maxRating,userforActive,toggleUserStatus} = require("../controllers/adminController");



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
router.get("/max-ratings",protect,authorize("admin"),maxRating);
router.get("/userforactive",protect,authorize("admin"),userforActive);
router.put("/toggle-user/:userId",protect,authorize("admin"),toggleUserStatus);




module.exports = router;