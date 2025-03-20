import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompletedServices } from "../redux/slices/completedServicesSlice"; // Fetch completed & paid services
import { submitReview} from "../redux/slices/reviewSlice"; // Submit and Fetch Reviews
import { Container, Row, Col, Card, Button, Alert, Spinner, Form } from "react-bootstrap";
import ReactStars from "react-stars";
import '../css/Clientreview.css'

const ClientReviews = () => {
  const dispatch = useDispatch();
  const { completedServices, loading, error } = useSelector((state) => state.completedServices);
  console.log("completedservicerequest",completedServices);

  const [selectedProvider, setSelectedProvider] = useState(null);
  const [selectedRequestId, setSelectedRequestId] = useState(null); // Store request ID
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
    dispatch(fetchCompletedServices()); // Fetch past completed services
  }, [dispatch]);

  const handleSelectService = (providerId, requestId) => {
    setSelectedProvider(providerId);
    setSelectedRequestId(requestId);
  };
  const handleSubmitReview = () => {
    if (!selectedProvider || !selectedRequestId) {
      alert("Please select a service provider to review.");
      return;
    }
  
    if (rating === 0) {
      alert("Please provide a rating.");
      return;
    }
  
    const reviewData = {
      providerId: selectedProvider,
      requestId: selectedRequestId, // Include request ID for reference
      rating,
      reviewText,
    };
    console.log("Submitting review:", reviewData); // Debugging log
    dispatch(submitReview(reviewData))
    .unwrap() // Unwrap the Redux action to handle errors properly
      .then(() => {
        alert("Review submitted successfully!");
        setRating(0);
        setReviewText("");
        setSelectedProvider(null);
        setSelectedRequestId(null);
      })
      .catch((error) => {
        console.error("Error submitting review:", error);
      
        // Display backend error messages to the user
        if (error) {
          alert(error);
        } else {
          alert("Failed to submit review. Please try again.");
        }
      });
  };
  

  return (
    <div className="reviewpage">
    <Container fluid className="reviewpage">
    <h2 className="text-center pt-3">Add a Review</h2>
    {loading && <Spinner animation="border" />}
    {error && <Alert variant="danger">{error}</Alert>}

    <Row>
      {completedServices.length > 0 ? (
        completedServices.map((service) => (
          <Col key={service._id} md={3} className="mb-4">
             <Card
                onClick={() => handleSelectService(service.providerId._id, service._id)}
                className={`service-card ${selectedRequestId === service._id ? "border-primary shadow-lg" : "shadow-sm"}`}
              >
                 <Card.Img variant="top" src={service.providerId.image} alt={service.providerId.name} style={{ height: "200px", objectFit: "cover",objectPosition:"top"}}/>
              <Card.Body> 
              <Card.Title className="text-primary">{service.providerId.name}</Card.Title>
              {/* <Card.Text><strong>Request ID:</strong> {service._id}</Card.Text> */}
             
              <Card.Text><strong>Services:</strong> {service.services.join(", ")}</Card.Text> {/* Join array values */}
                  <Card.Text><strong>Request Date:</strong> {new Date(service.requestDate).toLocaleDateString()}</Card.Text>
                  <Card.Text><strong>Service Date:</strong> {new Date(service.serviceDate).toLocaleDateString()}</Card.Text>
                  <Card.Text><strong>Additional Notes:</strong> {service.additionalNotes || "N/A"}</Card.Text>
                  <Card.Text><strong>Status:</strong><span className="badge bg-success"> ✅ Completed & Paid</span></Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))
      ) : (
        <p>No completed services to review.</p>
      )}
    </Row>
   
    {selectedProvider && (
      <div className="mt-4 ratesection text-center p-4">
        <h4 className="text-primary mb-3">Rate Your Experience</h4>
        <ReactStars
           count={5}
           size={40}
           value={rating}
           onChange={setRating}
           color1={"#ccc"}
           color2={"#ffcc00"}
           half={true}
           className="star-rating"
          />
        <Form.Control
          as="textarea"
          rows={3}
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review..."
          className="mt-3 review-textarea"
        />
        <Button className="mt-3" onClick={handleSubmitReview} variant="success">
          Submit Review
        </Button>
      </div>
    )}
  </Container>
  </div>
  );
};

export default ClientReviews;
