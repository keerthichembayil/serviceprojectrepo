import React, { useState, useEffect } from "react";
import { Table, Container, Button,Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "../axios";
import '../css/viewUserforactive.css'



const Viewuserforactive = () => {


    const token = useSelector((state) => state.adminAuth.admintoken);
    const [users, setUsers] = useState([]);
    
    const [alertMsg, setAlertMsg] = useState(""); // State for alert message
    const [alertVariant, setAlertVariant] = useState("danger"); // Variant (success, danger, etc.)

  
    useEffect(() => {
        const fetchUsers = async () => {
        try {
          const config = {
            headers: { Authorization: `Bearer ${token}` },
          };
          const response = await axios.get("/admin/userforactive", config);
          setUsers(response.data);
        } catch (error) {
          console.error("Error fetching review users:", error);
        }
      };
  
      fetchUsers();
    }, []);




     // Function to toggle user activation status
  const toggleUserStatus = async (userId, currentStatus) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await axios.put(`/admin/toggle-user/${userId}`, { isActive: !currentStatus }, config);

      if (response.data.success) {
        setUsers(users.map(user => user._id === userId ? { ...user, isActive: !currentStatus } : user));



        // Set Alert Message
        setAlertMsg(`User has been ${!currentStatus ? "activated" : "deactivated"} successfully.`);
        setAlertVariant(!currentStatus ? "success" : "danger");

        // Auto-hide alert after 3 seconds
        setTimeout(() => setAlertMsg(""), 3000);

      }
    } catch (error) {
      console.error("Error updating user status:", error);
      if (error.response && error.response.data.message) {
        setAlertMsg(error.response.data.message);
        setAlertVariant("danger");  // Use warning if action is blocked
        alert(error.response.data.message); // Show popup alert
    } else {
        setAlertMsg("An error occurred. Please try again.");
        setAlertVariant("danger");
    }
    }
     // Auto-hide alert after 4 seconds
     setTimeout(() => setAlertMsg(""), 4000);
  };

  return (
    <div className="userdt">
    <Container className="pt-4">
      <h2 className="text-white pt-4 mb-4">User Details</h2>
      {alertMsg && (
  <Alert variant={alertVariant} onClose={() => setAlertMsg("")} dismissible>
    {alertMsg}
  </Alert>
)}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="bg-primary">Name</th>
            <th className="bg-primary">Email</th>
            <th className="bg-primary">Phone</th>
            <th className="bg-primary">Address</th>
            <th className="bg-primary">Active</th>
            <th className="bg-primary">Click</th>
            
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="bg-secondary text-white text-center">{user.name}</td>
              <td className="bg-secondary text-white text-center">{user.email}</td>
              <td className="bg-secondary text-white text-center">{user.phone}</td>
              <td className="bg-secondary text-white text-center">
                {user.address ? (
                  <>
                    {user.address.street}, {user.address.city}, {user.address.state}
                  </>
                ) : (
                  "No Address"
                )}
              </td>
              
              <td className="bg-secondary text-white text-center">{user.isActive ? "Active" : "Inactive"}</td>
              <td className="bg-secondary text-center">
                <Button
                  variant={user.isActive ? "danger" : "success"}
                  onClick={() => toggleUserStatus(user._id, user.isActive)}
                >
                  {user.isActive ? "Deactivate" : "Activate"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
    </div>
  )
}

export default Viewuserforactive

