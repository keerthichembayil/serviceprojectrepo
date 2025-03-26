const mongoose = require('mongoose');
const serviceRequestSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  providerId: { type: mongoose.Schema.Types.ObjectId, ref: "ServiceProvider", required: true },
  services: [{
    type: String,
    required: true
  }],
  additionalNotes: { type: String,required:true },
  requestDate: { type: Date, default: Date.now },
  serviceDate: { type: Date, required: true }, // User-selected date
  status: {
    type: String,
    enum: ['pending', 'accepted', 'completed', 'rejected'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid","failed","notneeded"],
    default: "pending",
  },
  // paymentId: { type: mongoose.Schema.Types.ObjectId, ref: "Payment" },
  
});
// serviceRequestSchema.index({ clientId: 1, providerId: 1 }, { unique: true });//to prevent duplicate entry

module.exports = mongoose.model('ServiceRequest', serviceRequestSchema);
