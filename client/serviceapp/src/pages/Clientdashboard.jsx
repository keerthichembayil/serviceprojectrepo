import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ClientDashboard = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  const role = useSelector((state) => state.auth.role);

  // // Ensure only clients can access this page  this use effct not needed as already in protected route
  // useEffect(() => {
  //   if (!token || role !== "client") {
  //     navigate("/login");
  //   }
  // }, [token, role, navigate]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Client Dashboard</h2>
      {user ? (
        <div className="border p-4 rounded shadow-lg">
          <h3 className="text-lg font-semibold">{user.name}</h3>
          <p className="text-gray-700">{user.email}</p>
          <div className="mt-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
              Update Profile
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded">
              Delete Profile
            </button>
          </div>
        </div>
      ) : (
        <p>Loading client details...</p>
      )}
    </div>
  );
};

export default ClientDashboard;
