const User= require("../models/User");
const uploadtoCloudinary = require("../utilities/imageupload");
const Serviceprovider=require("../models/ServiceProvider");


const addProvider=async(req,res)=>{
    try{
     
      
   
      const{userId,service,experience}=req.body;
      console.log("reqbody",req.body);
      
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
  
  module.exports={addProvider};