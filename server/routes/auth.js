const express = require("express");
const router = express.Router();
const { loginUser,registerUser,registerAdmin,getProfile} = require("../controllers/authController");
const {protect,authorize}=require("../middleware/authmiddleware");


router.post("/registerUser", registerUser);
router.post("/registerAdmin",registerAdmin);
router.post("/login", loginUser);
router.get("/getProfile", protect,authorize("admin"),getProfile);




module.exports = router;