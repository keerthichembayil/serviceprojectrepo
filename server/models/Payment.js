const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    requestId: { type: mongoose.Schema.Types.ObjectId, ref: "ServiceRequest", required: true }, // Reference to Request table
  clientEmail: { type: String, required: true },
  amount: { type: Number, required: true },
  paymentStatus: { type: String, enum: ["paid", "failed"], required: true },
  sessionId: { type: String, required: true },
  paymentDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Payment", paymentSchema);
