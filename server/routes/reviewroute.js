const express=require('express');
const {protect,authorize}=require("../middleware/authmiddleware");

const { completedRequests,submitReview, getHighestRatingForProvider} = require("../controllers/reviewController");
const router=express.Router();
router.get("/completedrequests",protect,authorize("client"),completedRequests);
router.post("/submitreview",protect,authorize("client"),submitReview);


module.exports = router;   