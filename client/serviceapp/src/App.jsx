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
import Adminprotectedroute from "./components/AdminProtectedRoute"
import Admindashboard from "./pages/Admindashboard"
import Providerdashboard from "./pages/Providerdashboard";
import Clientdashboard  from "./pages/Clientdashboard";
import ProviderDetails from "./pages/Providerdetails";
import ClientProfile from "./pages/ClientProfile";
import AdminLogin from "./components/Adminlogin";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate } from "react-router-dom";
import Viewclientrequests from "./pages/Viewclientrequests";
import Viewprovider from "./pages/Viewprovider";


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
  <Route path="/login" element={<><Navbar2/><Login/></>} />
  <Route path="/register" element={<><Navbar2/><Register/></>} />
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




  <Route path="/clientdashboard" element={<ProtectedRoute requiredRole="client">{<><Navbar2/><Clientdashboard /></>}</ProtectedRoute>} />
  <Route path="/providerdashboard" element={<ProtectedRoute requiredRole="provider">{<><Navbar2/><Providerdashboard/></>}</ProtectedRoute>} />
  <Route path="/clientprofile" element={<ProtectedRoute requiredRole="client">{<><Navbar2/><ClientProfile/></>}</ProtectedRoute>} />
  <Route path="/provider/:id" element={<ProtectedRoute requiredRole="client">{<><Navbar2/><ProviderDetails/></>}</ProtectedRoute>} />
  <Route path="/viewclientreqdet" element={<ProtectedRoute requiredRole="client">{<><Navbar2/><Viewclientrequests/></>}</ProtectedRoute>} />
  <Route path="/viewprovider/:id" element={<Adminprotectedroute requiredRole="admin">{<><AdminNavbar/><Viewprovider/></>}</Adminprotectedroute>} />






  </Routes>
</Router>
    </>
  )
}

export default App
