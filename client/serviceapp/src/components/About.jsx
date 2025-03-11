import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const AboutUs = () => {
  return (
    <Container className="my-5">
      {/* Hero Section */}
      <Row className="text-center mb-5">
        <Col>
          <h1 className="display-4 fw-bold">About Us</h1>
          <p className="lead text-muted">
            Connecting clients with trusted service providers seamlessly.
          </p>
        </Col>
      </Row>

      {/* History and Services Section */}
      <Row className="mb-5">
        <Col md={6} className="d-flex align-items-center">
          <div>
            <h2 className="fw-bold">Our History</h2>
            <p>
              Established with a vision to bridge the gap between clients and service providers,
              our platform has grown to become a trusted name in the industry, ensuring quality
              and professionalism in every service rendered.
            </p>
          </div>
        </Col>
        <Col md={6}>
          <h2 className="fw-bold">Services We Offer</h2>
          <ul className="list-group">
            <li className="list-group-item">Cleaning Services</li>
            <li className="list-group-item">Plumbing Services</li>
            <li className="list-group-item">Electrical Repairs</li>
            <li className="list-group-item">Home Maintenance</li>
            <li className="list-group-item">Pest Control</li>
          </ul>
        </Col>
      </Row>

      {/* Team Section */}
      <Row className="text-center mb-5">
        <Col>
          <h2 className="fw-bold">Meet Our Team</h2>
          <p className="text-muted">Passionate professionals dedicated to making services accessible.</p>
        </Col>
      </Row>
      <Row>
        {[1, 2, 3].map((member) => (
          <Col md={4} key={member} className="mb-4">
            <Card className="shadow border-0">
              <Card.Img variant="top" src="https://via.placeholder.com/300" alt="Team Member" />
              <Card.Body className="text-center">
                <Card.Title>Team Member {member}</Card.Title>
                <Card.Text>Role - Expertise</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Call to Action */}
      <Row className="text-center mt-5">
        <Col>
          <h2 className="fw-bold">Join Us Today</h2>
          <p className="text-muted">
            Whether you're a service provider or a client, our platform is built for you.
          </p>
          <Button variant="primary" size="lg">
            Get Started
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUs;
