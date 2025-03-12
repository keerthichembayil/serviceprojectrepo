import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/About.css"

const AboutUs = () => {
  return (
    <div className="aboutpage">
    <Container>
      {/* Hero Section */}
      <Row className="text-center mb-5">
        <Col>
          <h1 className="display-4 fw-bold text-success">About<span className="text-white"> Us</span></h1>
          <p className="lead text-success">
            Connecting clients with trusted service providers seamlessly.
          </p>
        </Col>
      </Row>

      {/* History and Services Section */}
      <Row className="mb-5">
        <Col md={6} className="d-flex align-items-center">
          <div>
            <h2 className="fw-bold text-success">Our <span className="text-white">History</span></h2>
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
            <li className="list-group-item text-danger">Cleaning Services</li>
            <li className="list-group-item text-primary">Plumbing Services</li>
            <li className="list-group-item text-danger">Electrical Repairs</li>
            <li className="list-group-item text-primary">Home Maintenance</li>
            <li className="list-group-item text-danger">Carpentry Services</li>
          </ul>
        </Col>
      </Row>

      

      {/* Call to Action */}
      <Row className="text-center mt-5">
        <Col>
          <h2 className="fw-bold">Join Us Today</h2>
          <p>
            Whether you're a service provider or a client, our platform is built for you.
          </p>
          <Button variant="success" size="lg">
            Get Started
          </Button>
        </Col>
      </Row>




    </Container>
    </div>
  );
};

export default AboutUs;
