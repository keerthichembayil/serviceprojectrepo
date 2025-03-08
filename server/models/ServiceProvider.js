const mongoose = require('mongoose');
const serviceProviderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true,unique:true },
  name: {
    type: String,
    required: true
},
services: [{
  type: String,
  required: true
}],
image: {
    type: String,
    required: true
},
document: { 
  type: String, // Stores only one document URL
  required: true 
},
availability: {
    type: Boolean,
    default: true
},
  experience: { type: Number, required: true }, // Years of experience
  isVerified: { type: Boolean, default: false }, // Admin must approve manually

   // New fields for email verification
   isRejected: {
    type: Boolean,
    default: false, // Default to not rejected
  },
   
   verificationToken: { type: String }, // Stores verification token
   tokenExpiry: { type: Date }, // Stores token expiry time
 
},{versionKey:false});

module.exports = mongoose.model('ServiceProvider', serviceProviderSchema);
