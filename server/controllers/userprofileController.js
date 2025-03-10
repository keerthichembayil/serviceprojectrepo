const User = require("../models/User");
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

    await user.deleteOne();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};


const createCheckoutSession=async(req,res,next)=>{
  try{

    const { requestId, amount, clientEmail } = req.body;

    if (!requestId || !amount || !clientEmail) {
      return res.status(400).json({ message: "Missing required fields" });
    }


    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: clientEmail,
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
  
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    if (session.payment_status === "paid") {
      return res.status(200).json({ message: "Payment verified" });
    } else {
      return res.status(400).json({ message: "Payment not completed" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Payment verification error" });
  }
};






module.exports = { getUserProfile, updateUserProfile, deleteUserProfile ,createCheckoutSession,verifyPayment};