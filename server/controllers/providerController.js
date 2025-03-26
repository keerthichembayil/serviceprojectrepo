const User= require("../models/User");
const Payment= require("../models/Payment");
const { uploadToCloudinary, deleteFromCloudinary } = require("../utilities/imageupload");
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



  const verifyProvider=async (req, res) => {
    try {
        const { token } = req.params;
        const provider = await Serviceprovider.findOne({ verificationToken: token });
        console.log('provicer with token',provider);

        if (!provider || Date.now() > provider.tokenExpiry) {
            return res.status(400).json({ message: "Invalid or Expired Token" });
        }

        provider.isVerified = true;
        provider.verificationToken = undefined;
        provider.tokenExpiry = undefined;
        await provider.save();

        res.status(200).json({ message: "Provider Verified Successfully!" });

    } catch (error) {
        console.error("Error verifying provider:", error);
        res.status(500).json({ message: "Verification failed", error });
    }
};





const fetchfreshprovider=async(req,res)=>{
  try{

    // Fetch provider details using user ID from authentication middleware
    const provider = await Serviceprovider.findOne({ userId: req.user.id });
    if (!provider) {
      return res.status(404).json({ message: "complete your profile" });
    }

    // Check if all required details are present
    const hasDetails = provider.name && provider.services.length > 0 && provider.image && provider.document && provider.experience !== undefined;

    res.json({
      details: hasDetails, // Check if mandatory details exist
      isVerified: provider.isVerified, // Check verification status
      isPending: !provider.isVerified && !provider.isRejected, // If not verified & not rejected, it's pending
      isRejected: provider.isRejected, // Check rejection status
   

    });



  }
  catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}


const getprovider = async (req, res) => {
  try {
   const userId = req.user.id;  // Get userId from request parameters
    console.log("Fetching provider details for userId:", userId);

    const provider = await Serviceprovider.findOne({ userId });
    console.log(provider);

    if (!provider) {
      return res.status(404).json({ error: "Provider details not found" });
    }

    return res.status(200).json({ provider });
  } catch (error) {
    console.error("Error fetching provider details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



const updateProvider = async (req, res) => {
  try {
    const userId = req.user.id;
    const { experience ,services} = req.body;
    console.log("Received File:", req.file); // Debugging Image Upload
    console.log("Received Body:", req.body); // Debugging Form Data

    console.log("Updating provider details for userId:", userId);

    const existingProvider = await Serviceprovider.findOne({ userId });
    if (!existingProvider) {
      return res.status(404).json({ error: "Provider not found" });
    }

    if (experience) existingProvider.experience = experience;


    if (services) {
      try {
        existingProvider.services = JSON.parse(services); // Convert JSON string to an array
      } catch (error) {
        return res.status(400).json({ error: "Invalid services format" });
      }
    }

    // Handle image update correctly
    if (req.file) {
      console.log("Uploading new image to Cloudinary...");
      const imageUrl = await uploadToCloudinary(req.file.path, "provider", "image");
      if (!imageUrl) return res.status(500).json({ error: "Image upload failed" });

      // Delete old image if it exists
      if (existingProvider.image) {
        await deleteFromCloudinary(existingProvider.image);
      }
      existingProvider.image = imageUrl;
    }

    const updatedProvider = await existingProvider.save();
    return res.status(200).json({ message: "Provider details updated successfully", updatedProvider });

  } catch (error) {
    console.error("Error updating provider details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const getpaymentdetprovider=async(req,res)=>{
  try {
    const userId = req.user.id; // Get logged-in provider's ID
     // Find provider details using user ID
     const provider = await Serviceprovider.findOne({ userId }); // Assuming Provider model links userId to providerId

     if (!provider) {
       return res.status(404).json({ message: "Provider not found" });
     }
     const providerId = provider._id;

    const payments = await Payment.find({ providerId })
      .populate({
        path: "requestId",
        select: "services serviceDate additionalNotes",
      })
      .populate({
        path: "clientId",
        select: "name", // Get client details
      })
      .select("amount createdAt paymentStatus") // Selecting required fields from Payment schema
.sort({ createdAt: -1 }); // Sorting by latest payments
console.log("paymentsinsideprovidercontroller",payments);

    res.status(200).json({ payments });
  } catch (error) {
    res.status(500).json({ message: "Error fetching payments", error });
  }

}







  
  module.exports={addProvider,verifyProvider,fetchfreshprovider,getprovider,updateProvider,getpaymentdetprovider};