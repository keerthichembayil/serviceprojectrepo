const User = require("../models/User");
 const Serviceprovider=require("../models/ServiceProvider");
 
 //this is to list full providers for client
 const listfullProviders = async (req, res,next) => {
    try {
       const user = await User.findById(req.user.id);
      
          if (!user) {
            res.status(404);
            throw new Error("User not found");
          }

          
   // Fetch only service providers where isVerified is true
  //  const providers = await Serviceprovider.find({ isVerified: true })
  //     // Mongoose replaces userId in the serviceprovidertable
  //     //  with the actual User document, but only includes the email field:
  //       .populate('userId', 'email phone address') // Populate email from User model
  //       .select('name services image userId'); // Select required fields where this userid is replaced by email
    
  
  //     if (!providers.length) {
  //       return res.status(404).json({ message: 'No service providers found' });
  //     }
  
  //     res.status(200).json(providers);
  //  
  // 
  //Aggregation pipeline
    const providers = await Serviceprovider.aggregate([
      { $match: { isVerified: true } }, // Filter verified providers
      {
        $lookup: {
          from: 'reviews', // Name of the reviews collection
          localField: '_id',
          foreignField: 'providerId', // Field in reviews that references the provider
          as: 'reviews'
        }
      },
      {
        $addFields: {
          highestRating: { $max: '$reviews.rating' } // Compute the highest rating
        }
      },
      {
        $lookup: {
          from: 'users', // Name of the users collection
          localField: 'userId',
          foreignField: '_id',
          as: 'userDetails'
        }
      },
      { $unwind: '$userDetails' }, // Deconstruct userDetails array
      {
        $project: {
          name: 1,
          services: 1,
          image: 1,
          highestRating: 1,
          'userDetails.email': 1,
          'userDetails.phone': 1,
          'userDetails.address': 1
        }
      }
    ]);

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