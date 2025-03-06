const mongoose = require("mongoose");

const ServiceProvider = require("../models/ServiceProvider");

//this is for the client to see the peculiar provider and send request

const getProviderById = async (req, res) => {
  try {
    const { id } = req.params; // Get provider ID from request params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid Provider ID" });
      }

    // Find provider by ID and populate user details (email, phone, address)
    const provider = await ServiceProvider.findById(id)
      .populate("userId", "email phone address")//Mongoose handles the relationship internally without requiring you to explicitly import the User model.
      .select("name services image experience userId");
      

    if (!provider) {
      return res.status(404).json({ message: "Service Provider not found" });
    }

    res.status(200).json(provider);
  } catch (error) {
    console.error("Error fetching provider:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getProviderById };
