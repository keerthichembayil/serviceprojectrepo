const User = require("../models/User");
 const Serviceprovider=require("../models/ServiceProvider");
 const listfullProviders = async (req, res,next) => {
    try {
       const user = await User.findById(req.user.id);
      
          if (!user) {
            res.status(404);
            throw new Error("User not found");
          }

          
      const providers = await Serviceprovider.find()
      // Mongoose replaces userId in the serviceprovidertable
      //  with the actual User document, but only includes the email field:
        .populate('userId', 'email phone address') // Populate email from User model
        .select('name service image userId'); // Select required fields where this userid is replaced by email
    
  
      if (!providers.length) {
        return res.status(404).json({ message: 'No service providers found' });
      }
  
      res.status(200).json(providers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  
  module.exports={listfullProviders};