const User = require("../models/User");
const Payment=require("../models/Payment");
const Request=require("../models/ServiceRequest");


const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

 const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
  

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    console.log("user from backend",user);
    res.json(user);
   
  } catch (error) {
    next(error); // Passes the error to Express's error handler
  }
};


const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.address = req.body.address || user.address;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

 const deleteUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
     // Check if all requests related to the user are completed and paid
     const pendingRequests = await Request.find({
      clientId: req.user.id,
      $or: [{ status: { $ne: "completed" } }, { paymentStatus: { $ne: "paid" } }]
    });
    console.log("Pending Requests:", pendingRequests.length); // Log the results
    if (pendingRequests.length > 0) {
      return res.status(400).json({ message: "Cannot delete user. Ensure all service requests are completed and paid." });
    }

    await user.deleteOne();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};


const createCheckoutSession=async(req,res,next)=>{
  try{

    const { requestId, amount, clientEmail } = req.body;
    const clientId = req.user.id; // Assuming req.userId contains the logged-in client's ID

    if (!requestId || !amount || !clientEmail||!clientId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

     // Fetch the providerId from the ServiceRequest
     const serviceRequest = await Request.findById(requestId);
     if (!serviceRequest) {
       return res.status(404).json({ message: "Service request not found" });
     }
 
     const providerId = serviceRequest.providerId;
     console.log("providerid inrequetstable",providerId);


    // Create a pending payment entry before redirecting to Stripe
    const pendingPayment = await Payment.create({
      requestId,
      clientId,
      providerId,
      clientEmail,
      amount,
      transactionId: "Pending",
      paymentStatus: "pending",
    });


    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: clientEmail,
      metadata: { requestId },
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Service Request #${requestId}`,
            },
            unit_amount: amount * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/payment-failed`,
    });

    res.status(200).json({ sessionId: session.id });

  }
  catch(error){
    console.error("Error creating Stripe session:", error);
    res.status(500).json({ message: "Payment session creation failed" });
  }
}



const verifyPayment = async (req, res) => {
  const { sessionId } = req.body;
  if (!sessionId) {
    return res.status(400).json({ message: "Missing session ID" });
  }

  
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    if (session.payment_status === "paid") {
      const updatedPayment = await Payment.findOneAndUpdate(
        { requestId: session.metadata.requestId, paymentStatus: "pending" },
  { paymentStatus: "paid", transactionId: sessionId },
  { new: true }
      );
      if (!updatedPayment) {
        return res.status(404).json({ message: "No pending payment found" });
      }

      return res.json({ message: "Payment successful", status: "paid" });
    } else {
      return res.status(400).json({ message: "Payment not completed", status: session.payment_status });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    return res.status(500).json({ message: "Payment verification error" });
  }
};

const getPaymentdetails=async(req,res)=>{
  try {
    const clientId = req.user.id; // Assuming req.userId contains the logged-in client's ID

    const payments = await Payment.find({ clientId })
    .populate({
      path: "requestId", 
      select: "services serviceDate additionalNotes", // Assuming "servicesRequested" exists in ServiceRequest model
  })
  .populate({
    path: "providerId",
    select: "name", // Assuming "name" exists in ServiceProvider model
})
.select("amount createdAt paymentStatus") // Selecting required fields from Payment schema
.sort({ createdAt: -1 }); // Sorting by latest payments

    res.status(200).json({ payments });
  } catch (error) {
    console.error("Error fetching client payments:", error);
    res.status(500).json({ message: "Failed to retrieve payment history" });
  }
}





module.exports = { getUserProfile, updateUserProfile, deleteUserProfile ,createCheckoutSession,verifyPayment,getPaymentdetails};