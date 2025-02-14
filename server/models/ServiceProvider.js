const mongoose = require('mongoose');
const serviceProviderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  servicesOffered: [{ type: String, required: true }], // e.g., plumbing, cleaning
  availability: {
    days: [{ type: String }], // e.g., Monday, Tuesday
    timeSlots: [{ type: String }] // e.g., 9am-12pm, 1pm-5pm
  },
  experience: { type: Number, required: true }, // Years of experience
  ratings: [{ type: Number }],
  averageRating: { type: Number, default: 0 }
});

module.exports = mongoose.model('ServiceProvider', serviceProviderSchema);
