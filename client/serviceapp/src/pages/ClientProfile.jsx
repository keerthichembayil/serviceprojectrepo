import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/authSlice"; // Import logout action
import { resetState } from "../redux/slices/setfreshproviderSlice"; // Import resetState action
import '../css/Clientprofile.css'
import {
  fetchUserProfile,
  updateUserProfile,
  deleteUserProfile,
} from "../redux/slices/userProfileSlice";
import { Container, Card, Button, Form, Spinner, Alert } from "react-bootstrap";

const ClientProfile = () => {
  const navigate = useNavigate();
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
      dispatch(deleteUserProfile()).then(() => {
        dispatch(resetState()); // Clear provider state or any other necessary state
        dispatch(logout()); // Logout the user
        navigate("/login"); // Redirect to login page
      });
    }
  };

  return (
    <div className="clientpage">
      <Container>
      <Card className="p-4 shadow" style={{ backgroundColor: '#CCCCFF' }}>
        <h2 className="text-center mb-4">Client Profile</h2>

        {loading && <Spinner animation="border" className="d-block mx-auto" />}
        {error && <Alert variant="danger">{error}</Alert>}

      {user ? (
        <>
          {!editMode ? (
            <div>
         {/* Determine the avatar image based on gender */}
<img 
  src={`/images/${user.gender === "male" ? "maleprofile.png" : "femaleprofile.png"}`} 
  alt="Client Avatar" 
  style={{ width: "100px", height: "100px", borderRadius: "50%" }} 

/>

              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone}</p>

              {user.address && (
                <div className="mt-3">
                  
                  <p><strong>Street:</strong> {user.address.street}</p>
                  <p><strong>City:</strong> {user.address.city}</p>
                  <p><strong>State:</strong> {user.address.state}</p>
                  
                </div>
              )}

<Button variant="danger" onClick={() => setEditMode(true)} className="me-2">
                  Edit Profile
                </Button>
                {/* <Button variant="danger" onClick={handleDelete}>
                  Delete Profile
                </Button>
              */}



            </div>
          ) : (
            <form onSubmit={handleUpdate} className="mt-4">
              <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" name="name" value={updatedData.name} onChange={handleChange} />
                </Form.Group>

            <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" value={updatedData.email} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control type="text" name="phone" value={updatedData.phone} onChange={handleChange} />
                </Form.Group>

                <h5 className="mt-3">Edit Address</h5>
                <Form.Group className="mb-3">
                  <Form.Label>Street</Form.Label>
                  <Form.Control type="text" name="street" value={updatedData.address.street} onChange={handleAddressChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>City</Form.Label>
                  <Form.Control type="text" name="city" value={updatedData.address.city} onChange={handleAddressChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>State</Form.Label>
                  <Form.Control type="text" name="state" value={updatedData.address.state} onChange={handleAddressChange} />
                </Form.Group>


             
                <Button type="submit" variant="success" className="me-2">
                  Save Changes
                </Button>
                <Button variant="secondary" onClick={() => setEditMode(false)}>
                  Cancel
                </Button>
            </form>
          )}
        </>
      ) : (
        <p>No profile found.</p>
      )}
      </Card>
      </Container>
    </div>
  );
};

export default ClientProfile;
