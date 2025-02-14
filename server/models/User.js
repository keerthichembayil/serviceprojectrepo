const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, enum: ['client', 'provider','admin'], required: true }, // client or provider
  address: {
    street: String,
    city: String,
    state: String,
    zip: String
  },
  isVerified: { type: Boolean, default: false }, // For service providers
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
