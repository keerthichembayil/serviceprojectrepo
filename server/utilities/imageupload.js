
const cloudinary = require("../config/cloudinaryconfig");
const fs = require("fs");


const uploadToCloudinary = async (filepath,folderName = "provider",fileType = "image") => {
  const normalizedPath = filepath.replace(/\\/g, "/"); 
 
  
  if (!filepath || typeof filepath !== 'string') {
    throw new Error("Filepath is required and must be a string.");
  }
//i etc provided timestamp because of this signature problem came in console 
//filepath is the local path of the uploaded file from Multer.
  try {
    const timestamp = Math.round(new Date().getTime() / 1000);

    // Determine resource type (images vs documents)
    const resourceType = fileType === "pdf" ? "raw" : "image";
    const result = await cloudinary.uploader.upload(normalizedPath, {
      // folder: 'provider',
      folder:folderName,
      resource_type: resourceType, // Ensures proper handling of PDFs
      timestamp: timestamp,
     
    });

    // // **Delete the local file after successful upload**
    // fs.unlink(filepath, (err) => {
    //   if (err) console.error("Error deleting file:", err);
    // });

     // Delete local file after successful upload
     fs.unlinkSync(filepath);
    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error); // Log the full error for debugging
    throw new Error(`Cloudinary upload failed: ${error.message}`); // Re-throw with a more user-friendly message
  }
};

module.exports = uploadToCloudinary;