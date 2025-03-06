const User= require("../models/User");
const uploadToCloudinary = require("../utilities/imageupload");
const Serviceprovider=require("../models/ServiceProvider");


const addProvider=async(req,res)=>{
    try{
     
      
   
      const{userId,services,experience}=req.body;
      console.log("idinsidecontroller",userId);
      
      
      const userExists = await User.findById(userId);
     
      
      if (!userExists) {
        return res.status(400).json({ message: "User not found" });
      }
      const name = userExists.name; // Populate name from User
      if(!services||!experience){
        return res.status(400).json({error:"all fields are required"})
      }
      const existingProvider = await Serviceprovider.findOne({userId});
      if (existingProvider) {
        console.log("entred if");
        return res.status(400).json({ error: 'provider already added.' });
      }
      
    if (!req.files || !req.files.image || !req.files.document) {
      return res.status(400).json({ error: "Image and document are required" });
    }
    let imageUrl, documentUrl;
    
      //i used inner try here bcoz image was geting uploaded to cloudinary but it was not waiting so used anothertry
    try{
      // Upload image
      console.log("Uploading image to Cloudinary...");
      imageUrl = await uploadToCloudinary(req.files.image[0].path, "provider", "image");
      
      console.log("Uploading document to Cloudinary...");
      documentUrl = await uploadToCloudinary(req.files.document[0].path, "documents", "pdf") ;
      
      if (!imageUrl || !documentUrl) {
        return res.status(500).json({ error: "File upload failed" });
      }
     
     
    
      
      const newserviceprovider=new Serviceprovider({
        userId,
       name,services,experience, image: imageUrl,
       document: documentUrl, // Store document URL
      })
      let savedprovider=await newserviceprovider.save();
      if(savedprovider){
        return res.status(200).json({message:"provider added",savedprovider});
      }
     }
      catch(cloudinaryError){
        console.error("Cloudinary error:", cloudinaryError);
            return res.status(500).json({ error: "Image upload to Cloudinary failed" });
      }

    }
 
    catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ error: "Provider already added." });
      }
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }

  }
  
  module.exports={addProvider};