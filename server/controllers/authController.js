// controllers/authController.js
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, role, address } = req.body;
     // Check if role is valid (only client or provider can be registered via frontend)
     if (role !== 'client' && role !== 'provider') {
        return res.status(400).json({ message: 'Invalid role selection.' });
      }
      // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
        name,
        email,
        password: hashedPassword,
        phone,
        role,
        address
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
          role: user.role
        }
      });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


const getProfile = async (req, res) => {
  try {
    
    
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


  module.exports={loginUser,registerUser,getProfile};