const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    requestId: { type: mongoose.Schema.Types.ObjectId, ref: "ServiceRequest", required: true }, 
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to Client
  providerId: { type: mongoose.Schema.Types.ObjectId, ref: "ServiceProvider", required: true }, // Reference to Service Provider// Reference to Request table
  clientEmail: { type: String, required: true },
  amount: { type: Number, required: true },
  paymentStatus: { type: String, enum: ["pending","paid", "failed"], default: "pending"},
  transactionId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Payment", paymentSchema);
