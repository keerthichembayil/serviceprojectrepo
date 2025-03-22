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
import AdminProtectedRoute from "./components/AdminProtectedRoute"
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
import VerifyProvider from "./pages/VerifyProvider";
import Providerafterverify from "./pages/Providerafterverify";
import PaymentSucess from "./pages/PaymentSucess";
import Paymentfailed from "./pages/Paymentfailed";
import ProviderProfile from "./pages/ProviderProfile";

import Viewuser from "./pages/Viewuser";
import About from "./components/About";
import Contact from "./components/Contact"
import Clientpaymentdetails from "./pages/Clientpaymentdetails"
import Providerpaymentdetails from "./pages/Providerpaymentdetails"
import Serviceproviderlist from "./pages/Serviceproviderlist"
import ClientReviews from "./pages/ClientReviews";
import Viewreviewreport from "./pages/Viewreviewreport";

function App() {
  // Get user role for client & provider
  const userRole = useSelector((state) => state.auth.role); 

  // Get admin authentication state separately
  const isAdmin = useSelector((state) => state.adminAuth.role === "admin"); // Check admin role
  


 

  return (
    <>
<Router>
  

  <Routes>
  <Route path="/" element={<><Navbar2/><Home/></>} />
  <Route path="/login" element={<><Navbar2/><Login/></>} />
  <Route path="/about" element={<><Navbar2/><About/></>} />
  <Route path="/contact" element={<><Navbar2/><Contact/></>} />
  <Route path="/register" element={<><Navbar2/><Register/></>} />
  <Route path="/adminlogin" element={<AdminLogin/>} />
  <Route path="/verify/:token" element={<VerifyProvider/>} />
  <Route path="/afterverifyprovider" element={<Providerafterverify/>} />
  
 
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
  <Route path="/viewprovider/:id" element={<AdminProtectedRoute requiredRole="admin">{<><AdminNavbar/><Viewprovider/></>}</AdminProtectedRoute>} />
  <Route path="/user/:id" element={<AdminProtectedRoute requiredRole="admin">{<><AdminNavbar/><Viewuser/></>}</AdminProtectedRoute>} />
  <Route path="/payment-success" element={<><Navbar2/><PaymentSucess /></>} />
        <Route path="/payment-failed" element={<><Navbar2/><Paymentfailed /></>} />
        <Route path="/providerdet" element={<ProtectedRoute requiredRole="provider">{<><Navbar2/><ProviderProfile/></>}</ProtectedRoute>} />
        {/* no need to pass id as already get form authstate */}
        <Route path="/viewclientpayment" element={<ProtectedRoute requiredRole="client">{<><Navbar2/><Clientpaymentdetails/></>}</ProtectedRoute>} />
        {/* no need to pass id as already get form authstate */}
        <Route path="/providerpayment" element={<ProtectedRoute requiredRole="provider">{<><Navbar2/><Providerpaymentdetails/></>}</ProtectedRoute>} />
        <Route path="/serviceprovidersadm" element={<AdminProtectedRoute requiredRole="admin">{<><AdminNavbar/><Serviceproviderlist/></>}</AdminProtectedRoute>} />
        <Route path="/clientreview" element={<ProtectedRoute requiredRole="client">{<><Navbar2/><ClientReviews/></>}</ProtectedRoute>} />
        <Route path="/reviewreport" element={<AdminProtectedRoute requiredRole="admin">{<><AdminNavbar/><Viewreviewreport/></>}</AdminProtectedRoute>} />






  </Routes>
</Router>
    </>
  )
}

export default App
