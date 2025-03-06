const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, enum: ['client', 'provider'], required: true }, // client or provider
  gender: { type: String, enum: ['male', 'female'], required: true }, 
  address: {
    street: { type: String, required: false, default: "" },
    city: { type: String, required: false, default: "" },
    state: { type: String, required: false, default: "" }
  },
  isVerified: { type: Boolean, default: false }, // For service providers
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
