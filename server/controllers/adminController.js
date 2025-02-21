const Admin = require("../models/Admin");
const User= require("../models/User");
const Serviceprovider=require("../models/ServiceProvider");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const uploadtoCloudinary = require("../utilities/imageupload");

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


  const addProvider=async(req,res)=>{
    try{
     
      
   
      const{userId,service,experience}=req.body;
      
      const userExists = await User.findById(userId);
      console.log("userExists",userExists);
      
      if (!userExists) {
        return res.status(400).json({ message: "User not found" });
      }
      const name = userExists.name; // Populate name from User
      if(!service||!experience){
        return res.status(400).json({error:"all fields are required"})
      }
      const existingProvider = await Serviceprovider.findOne({userId});
      if (existingProvider) {
        return res.status(400).json({ message: 'provider already added.' });
      }
      //multer attach image to req.file
      if(!req.file){
        return res.status(400).json({error:'image not found'})

      }
      //i used inner try here bcoz image was geting uploaded to cloudinary but it was not waiting so used anothertry
    try{
     const result=await uploadtoCloudinary(req.file.path);
     console.log(result);
     
     
      if (!result) {
        return res.status(500).json({ error: "Image upload failed" });
      }
      
      const newserviceprovider=new Serviceprovider({
        userId,
       name,service,experience,image:result
      })
      let savedprovider=await newserviceprovider.save();
      if(savedprovider){
        return res.status(200).json({message:"provider added",savedprovider});
      }}
      catch(cloudinaryError){
        console.error("Cloudinary error:", cloudinaryError);
            return res.status(500).json({ error: "Image upload to Cloudinary failed" });
      }

    }
 
   catch(error)
    {
      console.log(error);
      res.status(error.status||500).json({error:error.message||"internal server error"});
    }



    

  }

  module.exports={registerAdmin,adminLogin,addProvider};