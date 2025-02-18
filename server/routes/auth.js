const express = require("express");
const router = express.Router();
const { loginUser,registerUser,getProfile} = require("../controllers/authController");
const {protect,authorize}=require("../middleware/authmiddleware");


router.post("/registerUser", registerUser);

router.post("/login", loginUser);


router.get("/getProfileadmin", protect,authorize("admin"),getProfile);
router.get("/getProfileclient", protect,authorize("client"),getProfile);
router.get("/getProfileprovider", protect,authorize("provider"),getProfile);





module.exports = router;