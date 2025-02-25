import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClientProviders } from "../redux/slices/clientProviderSlice"; // New slice
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigation
  const { providers, loading, error } = useSelector((state) => state.clientProviderList);
  console.log(providers);
  //this is holding the providers fethced from backend
  // const token = useSelector((state) => state.auth.token); // Check if user is logged in
  const { token, user } = useSelector((state) => state.auth); 

  useEffect(() => {
    dispatch(fetchClientProviders());
  }, [dispatch]);
  //ie fisrt  time rendering itself will fetch clientproviders


   // Handle "Request Service" button click
   const handleRequestService = (providerId) => {
    if (!token) {
      alert("Please login to request a service!"); // Show alert
      navigate("/login"); // Redirect to login page
      return;
    }
    if (user?.role === "provider") {
      alert("Service providers cannot request services!");
      return;
    }
    console.log("Service Requested for Provider ID:", providerId);
    // Make API request to request service (if needed)
  };


  // Navigate to Client Dashboard
  const handleViewProfile = () => {
    navigate("/clientdashboard"); // Redirect to Client Dashboard
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Available Service Providers</h2>
      {/* Show View Profile Button only for Clients */}
      {token && user?.role === "client" && (
        <button
          onClick={handleViewProfile}
          className="mb-4 bg-green-500 text-white px-4 py-2 rounded"
        >
          View Profile
        </button>
      )}
      {loading && <p>Loading providers...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {providers.length > 0 ? (
          providers.map((provider) => (
            <div key={provider._id} className="border p-4 rounded shadow-lg">
              <img src={provider.image} alt={provider.name} style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover" }}  />
              <h3 className="text-lg font-semibold mt-2">{provider.name}</h3>
              <p className="text-gray-700">{provider.service}</p>
              <button
                onClick={() => handleRequestService(provider._id)}
                className="mt-2 bg-blue-500 text-danger px-4 py-2 rounded"
              >
                Request Service
              </button>
            </div>
          ))
        ) : (
          <p>No service providers available.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
