const express = require("express");
const router = express.Router();
const { loginUser,registerUser} = require("../controllers/authController");



router.post("/registerUser", registerUser);

router.post("/login", loginUser);









module.exports = router;