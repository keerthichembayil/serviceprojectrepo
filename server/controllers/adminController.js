const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const  registerAdmin=async (req, res) => {
    try {
      const { name, email, password, phone } = req.body;
  
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
        phone,
        role: 'admin',
        isVerified: true
      });
  
      await newAdmin.save();

      const registeredAdmin = {
        id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
        phone: newAdmin.phone,
        role: newAdmin.role,
        isVerified: newAdmin.isVerified
      };
      res.status(201).json({ message: 'Admin registered successfully.',admin: registeredAdmin });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };



  
  const loginAdmin = async (req, res) => {
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

  module.exports={registerAdmin,loginAdmin};