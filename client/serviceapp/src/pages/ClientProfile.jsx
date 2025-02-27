import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProfile,
  updateUserProfile,
  deleteUserProfile,
} from "../redux/slices/userProfileSlice";

const ClientProfile = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.userProfile);
  
  const [editMode, setEditMode] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    name: "",
    email: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
     
    },
  });

  // Fetch user profile on mount
  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  // Populate form fields when entering edit mode
  useEffect(() => {
    if (user) {
      setUpdatedData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: {
          street: user.address?.street || "",
          city: user.address?.city || "",
          state: user.address?.state || ""
        },
      });
    }
  }, [user]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  // Handle address input changes separately
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({
      ...updatedData,
      address: { ...updatedData.address, [name]: value },
    });
  };

  // Handle profile update
  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(updatedData)).then(() => {
      setEditMode(false);
    });
  };

  // Handle profile deletion
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your profile?")) {
      dispatch(deleteUserProfile());
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Client Dashboard</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {user ? (
        <>
          {!editMode ? (
            <div>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone}</p>

              {user.address && (
                <div className="mt-2">
                  <p><strong>Address:</strong></p>
                  <p><strong>Street:</strong> {user.address.street}</p>
                  <p><strong>City:</strong> {user.address.city}</p>
                  <p><strong>State:</strong> {user.address.state}</p>
                  
                </div>
              )}

              <button
                className="bg-blue-500 text-danger px-4 py-2 rounded mt-4"
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </button>
              <button
                className="bg-red-500 text-danger px-4 py-2 rounded mt-4 ml-2"
                onClick={handleDelete}
              >
                Delete Profile
              </button>
            </div>
          ) : (
            <form onSubmit={handleUpdate} className="mt-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={updatedData.name}
                onChange={handleChange}
                className="border p-2 w-full mb-2"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={updatedData.email}
                onChange={handleChange}
                className="border p-2 w-full mb-2"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={updatedData.phone}
                onChange={handleChange}
                className="border p-2 w-full mb-2"
              />

              <h3 className="font-bold mt-4">Edit Address:</h3>
              <input
                type="text"
                name="street"
                placeholder="Street"
                value={updatedData.address.street}
                onChange={handleAddressChange}
                className="border p-2 w-full mb-2"
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={updatedData.address.city}
                onChange={handleAddressChange}
                className="border p-2 w-full mb-2"
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={updatedData.address.state}
                onChange={handleAddressChange}
                className="border p-2 w-full mb-2"
              />
             

              <button
                type="submit"
                className="bg-green-500 text-danger px-4 py-2 rounded"
              >
                Save Changes
              </button>
              <button
                type="button"
                className="bg-gray-500 text-danger px-4 py-2 rounded ml-2"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </form>
          )}
        </>
      ) : (
        <p>No profile found.</p>
      )}
    </div>
  );
};

export default ClientProfile;
