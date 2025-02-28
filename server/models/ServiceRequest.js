const mongoose = require('mongoose');
const serviceRequestSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  providerId: { type: mongoose.Schema.Types.ObjectId, ref: "ServiceProvider", required: true },
  service: { type: String, required: true }, // e.g., plumbing, cleaning
  additionalNotes: { type: String,required:true },
  requestDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'completed', 'cancelled'],
    default: 'pending'
  }
  // completedAt: { type: Date }
});
serviceRequestSchema.index({ clientId: 1, providerId: 1 }, { unique: true });//to prevent duplicate entry

module.exports = mongoose.model('ServiceRequest', serviceRequestSchema);
