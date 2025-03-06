import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClientProviders } from "../redux/slices/clientProviderSlice"; // New slice
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Container, Row, Col, Button, Card, Spinner, Alert ,Badge} from "react-bootstrap";
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
        <Col md={3} className="p-4 sidebar userprofilesection">
          <Button onClick={handleViewProfile} variant="success" className="w-100 mb-3">
            View Profile
          </Button>
          <Button
  className="w-100 mb-3 text-white px-4 py-2 rounded mt-4" variant="success" onClick={() => navigate("/viewclientreqdet")}>
  View Requested Services
</Button>
        </Col>
    
       {/* Main Content */}
       <Col md={9} className="p-4">
          <h2 className="mb-4">Service Providers</h2>
          {loading && <Spinner animation="border" role="status" />}
          {error && <Alert variant="danger">{error}</Alert>}
          <Row>
            {providers.length > 0 ? (
              providers.map((provider) => (
                <Col key={provider._id} md={4} className="mb-4">
                  <Card className="shadow-lg">
                    <Card.Img variant="top" src={provider.image} style={{ height: "200px", objectFit: "cover",objectPosition:"top"}} />
                    <Card.Body>
                      <Card.Title>{provider.name}</Card.Title>
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
