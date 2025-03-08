const express=require('express');
const router=express.Router();
const {protect,authorize}=require("../middleware/adminmiddleware");

const {registerAdmin,adminLogin,listProviders,listUsers,getProviderById,approveProvider} = require("../controllers/adminController");



router.get("/listproviders",protect,authorize("admin"),listProviders);
router.get("/getUsers",protect,authorize("admin"),listUsers);
router.get("/viewprovider/:id", protect,authorize("admin") ,getProviderById);
router.put("/approveprovider/:id", protect,authorize("admin") ,approveProvider);
//here we call admin but it is checking if it is admin by decoding token in authmiddlware
router.post("/registerAdmin",registerAdmin);
router.post("/adminlogin", adminLogin);




module.exports = router;