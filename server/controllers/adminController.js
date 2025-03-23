const Admin = require("../models/Admin");
const User = require("../models/User");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const Review = require("../models/Review");

const Serviceprovider=require("../models/ServiceProvider");
const ServiceRequest=require("../models/ServiceRequest");


const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const  registerAdmin=async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Check if email already exists
      const existingAdmin = await Admin.findOne({ email });
      if (existingAdmin) {
        return res.status(400).json({ message: 'Email already registered.' });
      }
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create new admin user
      const newAdmin = new Admin({
        name,
        email,
        password: hashedPassword,
        
        role: 'admin',
      
      });
  
      await newAdmin.save();

      const registeredAdmin = {
        id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
        
        role: newAdmin.role,
        
      };
      res.status(201).json({ message: 'Admin registered successfully.',admin: registeredAdmin });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };



  
  const adminLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      const admin = await Admin.findOne({ email });
     
  
      if (!admin) {
          return res.status(400).json({ message: 'Invalid email or password.' });
        }
  
         // Check if password is correct
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password.' });
      }
  
      const token = jwt.sign({ adminId: admin._id, role:admin.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
     
      res.status(200).json({
          message: 'Login successful.',
          token,
          admin: {
            id: admin._id,
            name: admin.name,
            email: admin.email,
            role: admin.role
          }
        });
    } catch (error) {
      console.error(error); // Log the actual error
      res.status(500).json({ message: "Server error" });
    }
  };


//this to list providers for admin

  const listProviders = async (req, res) => {
    try {
      const providers = await Serviceprovider.find()
      // Mongoose replaces userId in the serviceprovidertable
      //  with the actual User document, but only includes the email field:
        .populate('userId', 'email') // Populate email from User model
        .select('name services image userId'); // Select required fields
        
  
      if (!providers.length) {
        return res.status(404).json({ message: 'No service providers found' });
      }
  
      res.status(200).json(providers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  


  // Fetch all users for admin
const listUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "client" }).select("name email role createdAt");
    if (!users.length) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const getProviderById = async (req, res) => {
  try {
    const { id } = req.params; // Get provider ID from request params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid Provider ID" });
      }

    // Find provider by ID and populate user details (email, phone, address)
    const provider = await Serviceprovider.findById(id)
      .populate("userId", "email phone address")//Mongoose handles the relationship internally without requiring you to explicitly import the User model.
      .select("name services image document experience userId isVerified");
      

    if (!provider) {
      return res.status(404).json({ message: "Service Provider not found" });
    }

    res.status(200).json(provider);
  } catch (error) {
    console.error("Error fetching provider:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const approveProvider = async (req, res) => {
  try {
    const { id } = req.params;

    const provider = await Serviceprovider.findById(id).populate("userId");
    if (!provider) return res.status(404).json({ message: "Provider not found" });

    if (provider.isVerified) {
      return res.status(400).json({ message: "Provider is already approved" });
    }
     // Prevent sending another email if the token already exists and hasn't expired
     if (provider.verificationToken && provider.tokenExpiry > Date.now()) {
      return res.status(400).json({ message: "Verification email already sent. Please wait for it to expire." });
    }

     // Generate verification token
     const token = crypto.randomBytes(32).toString("hex");
     provider.verificationToken = token;
     provider.tokenExpiry = Date.now() + 24 * 60 * 60 * 1000; // Valid for 24 hours
     await provider.save();

       // Send verification email
       const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL, // Your email
            pass: process.env.EMAIL_PASSWORD, // Your email password or app password
        },
    });
    const verificationLink = `${process.env.FRONTEND_URL}/verify/${token}`;
  
  const mailOptions = {
    from: `"Service Management Team" <${process.env.EMAIL}>`,
    to: provider.userId.email,
    subject: "Provider Account Verification",
    html: `
      <p>Hello <strong>${provider.name}</strong>,</p>
      <p>Click the link below to verify your account:</p>
      <p><a href="${verificationLink}" style="background: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Account</a></p>
      <p>This link will expire in <strong>24 hours</strong>.</p>
      <p>Best Regards,<br>Service Management Team</p>
    `,
  };

  await transporter.sendMail(mailOptions);


  console.log("Verification email sent successfully to:", provider.userId.email);
res.status(200).json({ message: "Verification email sent to provider" });
  } catch (error) {
    console.error("Error approving provider:", error);
    res.status(500).json({ message: "Approval failed", error });
  }
};




const listspecificuser=async(req,res)=>{
  try{
    console.log("Requested ID:", req.params.id);

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid clientid" });
    }

    const requests = await ServiceRequest.find({ clientId: req.params.id })

      .populate({
        path: "clientId",
        select: "name email", // Fetch client name and email
      })
      .populate({
        path: "providerId",
        select: "name", // Fetch provider name
      })
      .select("additionalNotes services serviceDate status"); // Fetch additional fields

      if (!requests.length) {
        return res.status(404).json({ message: "No service requests found for this client" });
      }
  
    res.status(200).json(requests);

  }
  catch(error){
    console.error("Error fetching service request:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
    
  }
}

const gettotalusers=async(req,res)=>{
  try {
    const totalUsers = await User.countDocuments({ role: "client" }); // Count only clients
    res.json({ totalUsers });
  } catch (error) {
    console.error("Error fetching total users:", error);
    res.status(500).json({ error: "Server error" });
  }
}
const gettotalproviders=async(req,res)=>{
  try{
    const totalProviders=await Serviceprovider.countDocuments();
    res.json({totalProviders});

  }
  catch(error){
    console.error("Error fetching total providers:", error);
    res.status(500).json({ error: "Server error" });
  }

}

const getTotalRequestsPending=async(req,res)=>{
  try{
    const totalRequestsPending = await ServiceRequest.countDocuments({ status: "pending" });
        res.status(200).json({ totalRequestsPending });

  }
  catch(error){
    res.status(500).json({ message: "Error fetching pending requests", error });

  }
}


// Get Total Requests Completed
const getTotalRequestsCompleted = async (req, res) => {
  try {
      const totalRequestsCompleted = await ServiceRequest.countDocuments({ status: "completed" });
      res.status(200).json({ totalRequestsCompleted });
  } catch (error) {
    res.status(500).json({ message: "Error fetching max ratings", error: error.message });
  }
};




const maxRating=async(req,res)=>{
  try {
    const maxRatings = await Review.aggregate([
      {
        $group: {
          _id: "$providerId",
          maxRating: { $max: "$rating" }, // Find the max rating per provider
        },
      },
      {
        $lookup: {
          from: "serviceproviders",
          localField: "_id",
          foreignField:"_id",
          as: "providerDetails",
        },
      },
      { $unwind: "$providerDetails" }, // Unwind provider details for easy access
      {
        $project: {
          _id: 0,
          providerId: "$_id",
          providerName: "$providerDetails.name",
          maxRating: 1,
        },
      },
    ]);

    res.status(200).json(maxRatings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching max ratings", error });
  }
}


const userforActive=async(req,res)=>{
  try {
    const users = await User.find({}, "name email phone address isActive");
    res.json(users);
} catch (error) {
    res.status(500).json({ message: "Error fetching users." });
}

}





const toggleUserStatus = async (req, res) => {
  try {
      const { userId } = req.params; // Get userId from request parameters
      const { isActive } = req.body; // Get updated status from request body
      // If deactivating, check if the user has any pending or accepted service requests
    if (!isActive) {
      
      const activeRequest = await ServiceRequest.findOne({
        clientId: userId,
        status: { $in: ["pending", "accepted"] }, // Prevent deactivation if status is "pending" or "accepted"
      });

      if (activeRequest) {
        return res.status(400).json({
          success: false,
          message: "User cannot be deactivated as they have active service requests.",
        });
      }
    }

      // Find the user and update their isActive status
      const user = await User.findByIdAndUpdate(userId, { isActive }, { new: true });

      if (!user) {
          return res.status(404).json({ success: false, message: "User not found" });
      }

      res.json({ success: true, message: `User ${isActive ? 'activated' : 'deactivated'} successfully`, user });
  } catch (error) {
      console.error("Error toggling user status:", error);
      res.status(500).json({ success: false, message: "Server error" });
  }
};











  module.exports={registerAdmin,adminLogin,listProviders,listUsers,getProviderById,approveProvider,listspecificuser,gettotalusers,gettotalproviders,getTotalRequestsPending,getTotalRequestsCompleted,maxRating,userforActive,toggleUserStatus};