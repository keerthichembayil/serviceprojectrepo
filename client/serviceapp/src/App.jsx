import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import axios from "./axios";
import Login from './components/Login';
import Navbar2 from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Admindashboard from "./pages/Admindashboard"
import Providerdashboard from "./pages/Providerdashboard";
import AdminLogin from "./components/Adminlogin";


function App() {
 

  return (
    <>
<Router>
<Navbar2/>
  <Routes>
  <Route path="/" element={<Home/>} />
  <Route path="/login" element={<Login/>} />
  <Route path="/register" element={<Register/>} />
  <Route path="/admin/login" element={<AdminLogin/>} />


  {/* protected route is that if we just type /admindashboard it should not come for that */}
  <Route path="/admindashboard" element={<ProtectedRoute requiredRole="admin"><Admindashboard /></ProtectedRoute>} />
  {/* <Route path="/clientdashboard" element={<ProtectedRoute requiredRole="client"><Clientdashboard /></ProtectedRoute>} /> */}
  <Route path="/providerdashboard" element={<ProtectedRoute requiredRole="provider"><Providerdashboard /></ProtectedRoute>} />





  </Routes>
</Router>
    </>
  )
}

export default App
