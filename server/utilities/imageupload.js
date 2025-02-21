
const cloudinary = require("../config/cloudinaryconfig");


const uploadToCloudinary = async (filepath) => {
  const normalizedPath = filepath.replace(/\\/g, "/"); 
 
  
  if (!filepath || typeof filepath !== 'string') {
    throw new Error("Filepath is required and must be a string.");
  }
//i etc provided timestamp because of this signature problem came in console 
  try {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const result = await cloudinary.uploader.upload(normalizedPath, {
      folder: 'provider',
      timestamp: timestamp,
     
    });
    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error); // Log the full error for debugging
    throw new Error(`Cloudinary upload failed: ${error.message}`); // Re-throw with a more user-friendly message
  }
};

module.exports = uploadToCloudinary;