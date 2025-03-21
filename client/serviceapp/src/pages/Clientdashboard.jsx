import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClientProviders } from "../redux/slices/clientProviderSlice"; // New slice

import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Container, Row, Col, Button, Card, Spinner, Alert ,Badge,Image} from "react-bootstrap";
import { FaUser, FaClipboardList, FaDollarSign,FaStar } from "react-icons/fa"; // Import icons
import ReactStars from "react-stars";
import '../css/clientdash.css'


const Clientdashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigation
  const { providers, loading, error } = useSelector((state) => state.clientProviderList);
 
  console.log("providers",providers);
  //this is holding the providers fethced from backend
  

  useEffect(() => {
    dispatch(fetchClientProviders());
  }, [dispatch]);
  //ie fisrt  time rendering itself will fetch clientproviders


   


  // Navigate to Client Dashboard
  const handleViewProfile = () => {
    navigate("/clientprofile"); 
  };
  const handleRequestService = (id) => {
    navigate(`/provider/${id}`); // Redirect to provider details page
  };

  return (
    <div>
     <Container fluid className="client-dashboard">
      <Row>
        {/* Sidebar */}
        <Col md={3} className="sidebar bg-secondary text-white p-4 d-flex flex-column align-items-center shadow-lg rounded">
          <Button onClick={handleViewProfile} variant="outline-light" className="rounded-pill py-2 mt-2">
          <FaUser className="me-2" />  View Profile
          </Button>
          <Button  onClick={() => navigate("/viewclientreqdet")} variant="outline-light" className="rounded-pill py-2 mt-2">
 <FaClipboardList className="me-2" /> View Requested Services
</Button>
<Button variant="outline-light" className="rounded-pill py-2 mt-2"  onClick={() => navigate("/viewclientpayment")}>
  <FaDollarSign className="me-2" />View Paymentdetails
</Button>


<Button
  variant="outline-light" className="rounded-pill py-2 mt-2"
  onClick={() => navigate("/clientreview")}
>
  ⭐ Add Review
</Button>
        </Col>
    
       {/* Main Content */}
       <Col md={9} className="p-4">
          <h2 className="mb-4 text-center bg-primary p-2 text-white rounded">Our Services</h2>
          {loading && <Spinner animation="border" role="status" />}
          {error && <Alert variant="danger">{error}</Alert>}
          <Row>
            {providers.length > 0 ? (
              providers.map((provider) => (
                <Col key={provider._id} md={4} className="mb-4">
                  <Card className="shadow-lg border-0 rounded-lg clientdashcard">
                    <Card.Img variant="top" src={provider.image} style={{ height: "200px", objectFit: "cover",objectPosition:"top"}} />
                    <Card.Body style={{ backgroundColor: "#99CCFF" }}>
                      <Card.Title className="fw-bold text-primary">{provider.name}</Card.Title>
                      <Card.Text>
  {provider.services && provider.services.length > 0 ? (
    provider.services.map((service, index) => (
      <span key={index} className="badge bg-primary me-1">
        {service}
      </span>
    ))
  ) : (
    <span className="text-muted">No services listed</span>
  )}
</Card.Text>

<Card.Text>
                     <strong>  Highest Rating:{" "}</strong>
                        <ReactStars
                          count={5}
                          value={provider.highestRating || 0}
                          size={24}
                          edit={false}
                          activeColor="#ffd700"
                        />
                      </Card.Text>
                      <Button onClick={() => handleRequestService(provider._id)} variant="primary" className="w-100">
                        Request Service
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p>No service providers available.</p>
            )}
          </Row>
        </Col>
      </Row>
      </Container>
    </div>
  );
};

export default Clientdashboard;
