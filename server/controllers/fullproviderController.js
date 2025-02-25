 
 const Serviceprovider=require("../models/ServiceProvider");
 const listfullProviders = async (req, res) => {
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

  
  module.exports={listfullProviders};