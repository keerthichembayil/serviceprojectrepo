const cloudinary=require("cloudinary").v2;
require('dotenv').config();
cloudinary.config({ // Call the config function, don't assign to .config
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    // secure: true,  // Good practice, uncomment for production if needed
    // debug: true,   // Remove in production
});
module.exports=cloudinary;