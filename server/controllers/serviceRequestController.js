const ServiceRequest = require("../models/ServiceRequest");
const User = require("../models/User");
const Serviceprovider = require("../models/ServiceProvider");



// Request a service
const requestService = async (req, res) => {
    try {
        console.log("inside request service");
        const { providerId, additionalNotes } = req.body;//only need this details from front end remaining
        //will be fetched from backend
        const clientId = req.user.id; // authentication middleware adds user to req
        console.log("clientid",clientId);
         // Check if the same request already exists to prevent duplicate request sending
    const existingRequest = await ServiceRequest.findOne({ providerId, clientId });
    console.log("reqexist",existingRequest);

    if (existingRequest) {
      return res.status(400).json({ error: "You have already requested this service." });
    }

       
        // extracting the clientId from the authenticated user (req.user.id), you do not need to pass it explicitly from the frontend.
        // Check if provider exists
        const providerExists = await Serviceprovider.findById(providerId);
        if (!providerExists) {
            return res.status(400).json({ error: "Service provider not found" });
        }

        // Validate required fields
        if (!additionalNotes ) {
            return res.status(400).json({ error: "additional note are needed" });
        }
        const { service } = providerExists;

        // Create a new service request
        const newRequest = new ServiceRequest({
            clientId,
            providerId,
            service,
            
            additionalNotes
        });

        const savedRequest = await newRequest.save();
        console.log("Service Request Saved:", savedRequest);
        return res.status(201).json({ message: "Service request submitted", savedRequest });

    }  catch (error) {
        if (error.code === 11000) {
          return res.status(400).json({ error: "You have already requested this service." });
          //here return error not message slice is expecting error field ie stored to error 
        }
        res.status(500).json({ error: "Server error, please try again later." });
      }
    
};

// Get all requests for a client
const getClientRequests = async (req, res) => {
    try {
        const clientId = req.user.id;
        // The code fetches the name, service, and image from the Provider collection, as give ref in model
        //we could populate only because we gave refernce in model
        const requests = await ServiceRequest.find({ clientId }).populate("providerId", "name service image") .select("additionalNotes status"); // Include additionalNotes and status;
        //will fetch full details from  servicerequest model and in that insteead of providerid will replace
        // with name,service,image from Serviceprovider model
        return res.status(200).json(requests);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

// Get all requests for a provider
const getProviderRequests = async (req, res) => {
    try {
        const useridofprovider = req.user.id;
        const provider=await Serviceprovider.findOne({userId:useridofprovider});
       
        if (!provider) {
            return res.status(404).json({ error: "Service provider not found" });
        }
        const  providerId=provider._id;//get providerid from that provider object

       
        //here clientid refer to user collection in schema so pouplate go to  user collection take data and dispaly
        //means provider when enter we get providerid using that provider id fetch client id from
        // ServiceRequest collection then go to user collection to fetch the client details and display it
        // means finding the client of that specific provider then find that client details using that client id
        const requests = await ServiceRequest.find({ providerId }).populate("clientId", "name email phone");
        return res.status(200).json(requests);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

// Update request status (Accept, Complete, Cancel)
const updateRequestStatus = async (req, res) => {
    try {
        const { requestId, status } = req.body;
        if (!["pending", "accepted", "completed", "cancelled"].includes(status)) {
            return res.status(400).json({ error: "Invalid status" });
        }

        const request = await ServiceRequest.findById(requestId);
        if (!request) {
            return res.status(404).json({ error: "Service request not found" });
        }

        request.status = status;
        await request.save();

        return res.status(200).json({ message: "Request status updated", request });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { requestService, getClientRequests, getProviderRequests, updateRequestStatus };
