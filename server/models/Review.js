const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    requestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceRequest", // Reference to the Service Request model
      required: true,
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceProvider",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5, // Rating must be between 1-5 stars
    },
    reviewText: {
      type: String,
      default: "",
      required: true,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
