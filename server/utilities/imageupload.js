
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
      use_filename: true, // Keeps original filename
      unique_filename: false, // Prevents renaming
      access_mode: "public",
      flags: fileType === "pdf" ? "attachment" : "", // Forces download for PDFs
      timestamp: timestamp,
     
    });

  

     // Delete local file after successful upload
     fs.unlinkSync(filepath);
    // Append `?fl_attachment=true` for direct download if it's a PDF
    return fileType === "pdf" ? result.secure_url + "?fl_attachment=true" : result.secure_url;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error); // Log the full error for debugging
    throw new Error(`Cloudinary upload failed: ${error.message}`); // Re-throw with a more user-friendly message
  }
};



const deleteFromCloudinary = async (fileUrl) => {
  try {
    if (!fileUrl) throw new Error("File URL is required");

    // Extract public_id correctly
    const urlParts = fileUrl.split("/");
    const filenameWithExt = urlParts.pop(); // Extract filename.ext
    const folderName = urlParts.length > 5 ? urlParts.pop() : ""; // Extract folder name if exists
    const publicId = folderName ? `${folderName}/${filenameWithExt.split(".")[0]}` : filenameWithExt.split(".")[0];

    console.log("Extracted publicId for deletion:", publicId); // Debugging log

    // Delete file from Cloudinary
    const result = await cloudinary.uploader.destroy(publicId);
    console.log(`Deleted ${publicId} from Cloudinary`, result);
    return result.result === "ok";
  } catch (error) {
    console.error("Error deleting file from Cloudinary:", error);
    return false;
  }
};

module.exports = {
  uploadToCloudinary,
  deleteFromCloudinary
};