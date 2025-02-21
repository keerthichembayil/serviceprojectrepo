import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import axios from "./axios";
import Login from './components/Login';
import Navbar2 from "./components/Navbar";
import AdminNavbar from "./components/AdminNavbar";
import Home from "./pages/Home";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Admindashboard from "./pages/Admindashboard"
import Providerdashboard from "./pages/Providerdashboard";
import Clientdashboard  from "./pages/Clientdashboard";
import AdminLogin from "./components/Adminlogin";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Fetch the user role from localStorage or API
    const role = localStorage.getItem("userRole"); // Assuming role is stored as "admin", "client", "provider"
    setUserRole(role);
  }, []);

 

  return (
    <>
<Router>
  

  <Routes>
  <Route path="/" element={<><Navbar2/><Home/></>} />
  <Route path="/login" element={<Login/>} />
  <Route path="/register" element={<Register/>} />
  <Route path="/adminlogin" element={<AdminLogin/>} />
  <Route path="/admindashboard" element={<><AdminNavbar/><Admindashboard/></>} />
{/* //give ProtectedRoute to admindashboard seperately */}

  
  <Route path="/clientdashboard" element={<ProtectedRoute requiredRole="client"><Clientdashboard /></ProtectedRoute>} />
  <Route path="/providerdashboard" element={<ProtectedRoute requiredRole="provider"><Providerdashboard /></ProtectedRoute>} />





  </Routes>
</Router>
    </>
  )
}

export default App
