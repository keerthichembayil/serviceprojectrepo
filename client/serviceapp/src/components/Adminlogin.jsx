import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin } from "../redux/slices/adminauthSlice";
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";
import '../css/Adminlogin.css'


const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.adminAuth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(adminLogin({ email, password })).unwrap();
      console.log(result);
     
      navigate("/admindashboard");
    } catch (error) {
      console.error("Login error:", error);
      alert(error.message || "Login failed");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center adminlogindesign vh-100">
    <div className="shadow-lg p-4 bg-white rounded" style={{ width: "400px" }}>
      <h2 className="text-center mb-4">Admin Login</h2>
    <div className="login-container">
    
      <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="emailboxad"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="passboxad"
              required
            />
          </Form.Group>

          <Button type="submit"
            className="w-100 adminloginbtn"
            disabled={loading}
          >
            {loading ? <Spinner animation="border" size="sm" /> : "Login"}
          </Button>
        </Form>
      {error && <p className="error">{error.message || "Login failed"}</p>}
      </div>
      </div>
      </div>
  );
};


// The extra reducer in Redux is responsible for managing state (loading, error, and user).
// The loading state is updated when the login request starts (pending).
// The error state is updated if the request fails (rejected).
// The UI component accesses these states via useSelector. that state is in the button and p error


export default AdminLogin;
