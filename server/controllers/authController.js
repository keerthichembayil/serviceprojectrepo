// controllers/authController.js
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  try {
    
    const { name, email, password, phone, role,gender, address } = req.body;
    
     // Check if role is valid (only client or provider can be registered via frontend)
     if (role !== 'client' && role !== 'provider') {
        return res.status(400).json({ message: 'Invalid role selection.' });
      }
      // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    let addressToSave = {};  // Initialize an empty object
    
      // Check if address exists and has properties
      if (address && typeof address === 'object' && Object.keys(address).length > 0) {
        addressToSave = {
          street: address.street || "",
          city: address.city || "",
          state: address.state || ""
         
        };
      }
      
    const newUser = new User({
        name,
        email,
        password: hashedPassword,
        phone,
        role,
        gender,
        address:addressToSave
      });

    await newUser.save();
     // Attach registered user to response (excluding password)
     const { password: _, ...userWithoutPassword } = newUser._doc;
    res.status(201).json({ message: "User registered successfully" , user: userWithoutPassword});
  } catch (error) {
    
    res.status(500).json({ message: "Server error",error:error.message });
  }
};


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
   

    if (!user) {
        return res.status(400).json({ message: 'Invalid email or password.' });
      }

       // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
    // userId: Stores the unique identifier of the user (_id from the user object).
    // role: Stores the user's role (e.g., admin, customer). This is useful for authorization.
    // This payload is encoded into the token and can be decoded later to identify the user and their permissions.ie in
    // authmiddleware
    res.status(200).json({
        message: 'Login successful.',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          gender: user.gender,
        }
      });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};





  module.exports={loginUser,registerUser};