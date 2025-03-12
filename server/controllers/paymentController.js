const ServiceRequest = require("../models/ServiceRequest");

const updatePaymentStatus = async (req, res) => {
  const { requestId } = req.body;
  console.log("updatepayment reqid",requestId);

  try {
    const request = await ServiceRequest.findByIdAndUpdate(
      requestId,
      { paymentStatus: "paid" },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({ message: "Service request not found" });
    }

    res.json({ message: "Payment status updated", request });
  } catch (error) {
    res.status(500).json({ message: "Error updating payment status", error });
  }
};

module.exports = { updatePaymentStatus };
