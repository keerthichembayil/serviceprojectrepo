const Admin = require("../models/Admin");
const User = require("../models/User");
const mongoose = require("mongoose");

const Serviceprovider=require("../models/ServiceProvider");
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
        .select('name service image userId'); // Select required fields
        
  
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
      .select("name service image document experience userId");
      

    if (!provider) {
      return res.status(404).json({ message: "Service Provider not found" });
    }

    res.status(200).json(provider);
  } catch (error) {
    console.error("Error fetching provider:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};














  module.exports={registerAdmin,adminLogin,listProviders,listUsers,getProviderById};