import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import { useSelector} from "react-redux";
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
import { Navigate } from "react-router-dom";


function App() {
  // Get user role for client & provider
  const userRole = useSelector((state) => state.auth.role); 

  // Get admin authentication state separately
  const isAdmin = useSelector((state) => state.adminAuth.role === "admin"); // Check admin role
  console.log(isAdmin);


 

  return (
    <>
<Router>
  

  <Routes>
  <Route path="/" element={<><Navbar2/><Home/></>} />
  <Route path="/login" element={<Login/>} />
  <Route path="/register" element={<Register/>} />
  <Route path="/adminlogin" element={<AdminLogin/>} />
 
        {/* Admin Dashboard Route */}
        <Route
          path="/admindashboard"
          element={
            isAdmin ? (
              <>
                <AdminNavbar />
                <Admindashboard />
              </>
            ) : (
              <Navigate to="/adminlogin" />
            )
          }
        />




  <Route path="/clientdashboard" element={<ProtectedRoute requiredRole="client"><Clientdashboard /></ProtectedRoute>} />
  <Route path="/providerdashboard" element={<ProtectedRoute requiredRole="provider">{<><Navbar2/><Providerdashboard/></>}</ProtectedRoute>} />





  </Routes>
</Router>
    </>
  )
}

export default App
