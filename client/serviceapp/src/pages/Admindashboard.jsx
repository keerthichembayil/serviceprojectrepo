import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import for navigation
import { useSelector } from "react-redux";
import '../css/Admindash.css'
import { PieChart, Pie, Cell, Tooltip, Legend,BarChart, Bar, XAxis, YAxis, CartesianGrid} from "recharts";
import axios from "../axios";

import { BsPeople} from "react-icons/bs"; // Import the icon
import { BsBarChart } from "react-icons/bs"; // Import Bar Chart icon




const Admindashboard = () => {
  const navigate = useNavigate(); // Hook for navigation
  const token = useSelector((state) => state.adminAuth.admintoken);


  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProviders, setTotalProviders] = useState(0);
  const [totalRequestsPending, setTotalRequestsPending] = useState(0);
  const [totalRequestsCompleted, setTotalRequestsCompleted] = useState(0);


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Assuming you store the token in localStorage
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const usersResponse = await axios.get("/admin/totalusers",config);
        const providersResponse = await axios.get("/admin/totalproviders",config);
        const requestsPendingResponse = await axios.get("/admin/totalreqpending", config);
        const requestsCompletedResponse = await axios.get("/admin/totalreqcompleted", config);

        setTotalUsers(usersResponse.data.totalUsers);
        setTotalProviders(providersResponse.data.totalProviders);
        setTotalRequestsPending(requestsPendingResponse.data.totalRequestsPending);
        setTotalRequestsCompleted(requestsCompletedResponse.data.totalRequestsCompleted);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const data = [
    { name: "Clients", value: totalUsers },
    { name: "Service Providers", value: totalProviders },
  ];
  const barData = [
    { name: "Requests Pending", value: totalRequestsPending },
    { name: "Requests Completed", value: totalRequestsCompleted },
  ];


  // const COLORS = ["#FF0000", "#000099"];
  const COLORS = ["#FF5733", "#2980b9"];
  return (


<div className="admindashboard">
<Container fluid className="vh-100">
      <Row className="h-100">
        {/* Left Grid with Navigation */}
        <Col md={3} className="admin-sidebar d-flex flex-column align-items-center p-4">
        <h4 className="text-white mb-4">Admin Panel</h4>
          <Button 
            variant="success" 
            className="w-100 mt-0 mb-4" 
            onClick={() => navigate("/serviceprovidersadm")}
          >
               <BsPeople className="me-2" size={18} />
            View Details
          </Button>



          <Button 
            variant="success" 
            className="w-100 mt-0 mb-4" 
            onClick={() => navigate("/reviewreport")}
          >
               <BsBarChart className="me-2" size={18} />
            View ReviewReport
          </Button>



          <Button 
            variant="success" 
            className="w-100 mt-0" 
            onClick={() => navigate("/statechangeuser")}
          >
               <BsPeople className="me-2" size={18} />
            View Userdetails
          </Button>
        </Col>

        

      {/* Right Grid with Content */}
      <Col md={9} className="d-flex flex-column align-items-center justify-content-center">
            <h2>Admin Dashboard</h2>

            <Row className="w-100 d-flex justify-content-center">
              {/* Pie Chart */}
              <Col md={6} className="d-flex flex-column align-items-center">
                <h5>Users Distribution</h5>
                <div className="chart-container" style={{ width: "450px", height: "350px" }}>
                  <PieChart width={450} height={350}>
                    <Pie data={data} cx={225} cy={175} outerRadius={120} fill="#8884d8" dataKey="value" label>
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </div>
              </Col>

              {/* Bar Chart */}
              <Col md={6} className="d-flex flex-column align-items-center">
                <h5>Service Requests</h5>
                <div className="chart-container" style={{ width: "450px", height: "350px" }}>
                  <BarChart width={450} height={350} data={barData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#82ca9d" />
                  </BarChart>
                </div>
              </Col>
            </Row>
          </Col>


        
      </Row>
    </Container>


      </div>


    
    
  )
}

export default Admindashboard
