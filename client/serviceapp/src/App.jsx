import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import axios from "./axios";
import Login from './components/Login';


function App() {
 

  return (
    <>
<Router>
<Navbar/>
  <Routes>
  <Route path="/" element={<Home/>} />
  <Route path="/login" element={<Login/>} />
  <Route path="/register" element={<Register/>} />
  {/* protected route is that if we just type /admindashboard it should not come for that */}
  <Route path="/admindashboard" element={<ProtectedRoute requiredRole="admin"><Admindashboard /></ProtectedRoute>} />
  <Route path="/clientdashboard" element={<ProtectedRoute requiredRole="client"><Clientdashboard /></ProtectedRoute>} />
  <Route path="/providerdashboard" element={<ProtectedRoute requiredRole="provider"><Providerdashboard /></ProtectedRoute>} />





  </Routes>
</Router>
    </>
  )
}

export default App
