import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaGlobe } from "react-icons/fa";
import '../css/Contact.css'

const ContactPage = () => {
  return (
    <div className="contactpage">
    <Container fluid className="vh-100 d-flex align-items-center">
      <Row className="w-100">
        {/* Left Column - Yellow Background */}
        <Col md={3} className="bg-warning vh-100"></Col>

        {/* Right Column - Contact Details */}
        <Col md={9} className="d-flex justify-content-center align-items-center vh-100">
          <Card style={{ width: "80%", backgroundColor: "black", color: "white" }} className="p-4 text-center">
            <h2>Contact Us</h2>
            <p>
            <FaMapMarkerAlt className="me-2" />
              Address: 123, Haridar Street, Mumbai City</p>
            <p>
            <FaEnvelope className="me-2" />
              Email: servicehub@gmail.com</p>
            <p>
            <FaPhone className="me-2" />
              Phone: +123 456 7890</p>
            <p>
            <FaGlobe className="me-2" />
              Website: www.dummysite.com</p>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default ContactPage;
