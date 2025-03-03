const mongoose = require('mongoose');
const serviceProviderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true,unique:true },
  name: {
    type: String,
    required: true
},
service: {
    type: String,
    required: true
},
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
  // ratings: [{ type: Number }],
  // averageRating: { type: Number, default: 0 }
});

module.exports = mongoose.model('ServiceProvider', serviceProviderSchema);
