import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaGlobe } from "react-icons/fa";
import '../css/Contact.css'

const ContactPage = () => {
  return (
    <div className="contactpage">
      <Container fluid className="vh-100 d-flex align-items-center">
        <Row className="w-100">
          {/* Left Column - Stylish Gradient Background */}
          <Col md={3} className="left-column"></Col>

          {/* Right Column - Contact Card */}
          <Col md={9} className="d-flex justify-content-center align-items-center vh-100">
            <Card className="contact-card p-4 text-center">
              <h2 className="mb-4">Contact Us</h2>
              <div className="contact-details">
                <p>
                  <FaMapMarkerAlt className="icon" />
                  <span>123, Haridar Street, Mumbai City</span>
                </p>
                <p>
                  <FaEnvelope className="icon" />
                  <span>servicehub@gmail.com</span>
                </p>
                <p>
                  <FaPhone className="icon" />
                  <span>+123 456 7890</span>
                </p>
                <p>
                  <FaGlobe className="icon" />
                  <span>
                    <a href="https://serviceprojectappfrontend.vercel.app" target="_blank" rel="noopener noreferrer">
                      serviceprojectappfrontend.vercel.app
                    </a>
                  </span>
                </p>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactPage;
