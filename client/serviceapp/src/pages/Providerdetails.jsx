import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProviderDetails } from "../redux/slices/providerdetailsSlice"; // New slice
import { requestService, clearMessage } from "../redux/slices/serviceRequestSlice";
import { useParams } from "react-router-dom"; // Get provider ID from URL
import { Container, Row, Col, Card, Button, Form, Alert, Spinner } from "react-bootstrap";
import '../css/Providerdetails.css'

const ProviderDetails = () => {
  const { id } = useParams(); // Extract provider ID from URL
 
  const dispatch = useDispatch();
  const { provider, loading, error } = useSelector((state) => state.providerDetails);
  console.log("Provider State:", provider);

  const { loading: requestLoading, successMessage, error: requestError } = useSelector((state) => state.clientRequest);
  //renamed to requestloading ,requesterror
  const [notes, setNotes] = useState(""); // State to store additional notes


  useEffect(() => {
    dispatch(fetchProviderDetails(id)); // Fetch provider details when component loads
  }, [dispatch, id]);

 // Handle Service Request
 const handleServiceRequest = () => {
  dispatch(requestService({ providerId: id, additionalNotes: notes }));
};

  
   // Clear messages after 3 seconds
   useEffect(() => {
    if (successMessage || requestError) {
      const timer = setTimeout(() => dispatch(clearMessage()), 3000);
      return () => clearTimeout(timer); // Cleanup on unmount
    }
  }, [successMessage, requestError, dispatch]);



  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <div>Loading provider details...</div>
      </Container>
    );
  }
  if (error) {
    return <Alert variant="danger" className="text-center mt-3">{error}</Alert>;
  }

  if (!provider) {
    return <Alert variant="warning" className="text-center mt-3">No provider found.</Alert>;
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-lg">
            <Card.Body>
              <Row>
                <Col md={4} className="text-center providerdetails">
                  <Card.Img
                    src={provider.image}
                    alt={provider.name}
                    className="rounded-circle img-fluid"
                    style={{ width: "150px", height: "150px", objectFit: "cover" }}
                  />
                </Col>
                <Col md={8} className="providerdetails">
                  <Card.Title className="text-danger">{provider.name}</Card.Title>
                  <div className="text-start">
                    <div className="d-flex">
                      <strong className="text-danger w-25">Service:</strong>
                      <span className="w-75">{provider.service}</span>
                    </div>
                    <div className="d-flex">
                      <strong className="text-danger w-25">Experience:</strong>
                      <span className="w-75">{provider.experience} years</span>
                    </div>
                    <div className="d-flex">
                      <strong className="text-danger w-25">Email:</strong>
                      <span className="w-75">{provider.userId?.email}</span>
                    </div>
                    <div className="d-flex">
                      <strong className="text-danger w-25">Phone:</strong>
                      <span className="w-75">{provider.userId?.phone}</span>
                    </div>
                    <div className="d-flex">
                      <strong className="text-danger w-25">Address:</strong>
                      <span className="w-75">
                        {provider.userId?.address
                          ? Object.values(provider.userId.address).filter(Boolean).join(", ")
                          : "Not provided"}
                      </span>
                    </div>
                  </div>
                </Col>
              </Row>

              <Form.Group className="mt-3 providerdetails">
                <Form.Label className="text-danger">Additional Notes</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Enter any additional instructions..."

                />
              </Form.Group>

              {/* Success & Error Messages */}
              {successMessage && <Alert variant="success" className="mt-3">{successMessage}</Alert>}
              {requestError && <Alert variant="danger" className="mt-3">{requestError}</Alert>}

              <Button
                variant="success"
                className="mt-3 w-100"
                onClick={handleServiceRequest}
                disabled={requestLoading}
              >
                {requestLoading ? <Spinner as="span" animation="border" size="sm" /> : "Confirm Service Request"}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProviderDetails;
