const express = require("express");
const router = express.Router();
const ServiceRequest = require("../models/ServiceRequest");
const Review=require("../models/Review");


const completedRequests=async(req,res)=>{
    try {
        const clientId = req.user.id; // Extract client ID from authenticated user

        const completedRequests = await ServiceRequest.find({ 
            clientId: clientId,  // Filter by the logged-in client
            status: "completed", 
            paymentStatus: "paid" 
        })
        .populate("providerId", "name image") // Populate provider details
        .select("services serviceDate requestDate additionalNotes providerId"); // Select required fields

        res.status(200).json(completedRequests);
    } catch (error) {
        console.error("Error fetching completed requests:", error);
        res.status(500).json({ message: "Server error", error });
    }
};
const submitReview=async(req,res)=>{
    try {
     const  clientId=req.user.id;
  
     
        const { providerId, requestId, rating, reviewText } = req.body;

        console.log("Received review data:", req.body); // Debugging log
        console.log("Authenticated User ID:", clientId);
        if (!clientId) {
          return res.status(401).json({ message: "Unauthorized: No user ID found" });
      }
      if (!providerId || !requestId || !rating || !reviewText) {
        return res.status(400).json({ message: "All fields are required, including review text." });
    }

    
    if (reviewText.trim().length === 0) {
      return res.status(400).json({ message: "Review text cannot be empty." });
  }

  const existingReview = await Review.findOne({ clientId, requestId });

  if (existingReview) {
      return res.status(400).json({ message: "You have already submitted a review for this service request." });
  }

    
        const newReview = new Review({
          clientId:clientId,
          providerId,
          requestId,
          rating,
          reviewText,
        });
    
        await newReview.save();
        res.status(201).json({ message: "Review submitted successfully!" });
      } catch (error) {
        res.status(500).json({ message: "Server error", error });
      }
}





module.exports = {completedRequests,submitReview}
