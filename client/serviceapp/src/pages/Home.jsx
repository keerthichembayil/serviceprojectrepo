import React from 'react'
import { Container, Row, Col, Navbar, Nav, Button, Card } from "react-bootstrap";

import '../css/Home.css'

const Home = () => {
  return (
    <div className='homecontainer'>
       {/* Hero Section */}
       <Container fluid className="py-5 text-white herosection">
      <Row className="align-items-center">
        {/* Left Side - Text */}
        <Col md={6} className="text-center text-md-start px-5">
          <h2>Find Trusted Service Providers Easily</h2>
          <p className="lead">
            Connect with professionals like plumbers, electricians, cleaners, and more.
          </p>
          <Button variant="light">Explore Services</Button>
        </Col>

        {/* Right Side - Image */}
        <Col md={6} className="text-end">
        <div className="image-container">
          <img
            src="/images/home4.jpg" // Replace with actual image URL
            alt="Service Providers"
            className="img-fluid rounded-circle"
          />
          </div>
        </Col>
      </Row>
    </Container>

      {/* Services Section */}
      <Container className="py-5" id="services">
        <h2 className="text-center mb-4">Our Services</h2>
        <Row>
          {[
            { title: "Cleaning", image: "/images/cleaning.jpg" },
            { title: "Plumbing", image: "/images/plumbing.avif" },
            { title: "Electrical", image: "/images/electrician.jpg" },
            { title: "Painting", image: "/images/painting.avif" },

          ].map((service, index) => (
            <Col md={3} key={index} className="mb-4">
              <Card className='homecardcomp'>
                <Card.Img variant="top" src={service.image} className='homecard' />
                <Card.Body className='homecardbody'>
                  <Card.Title>{service.title}</Card.Title>
                  <Button variant="primary">Book Now</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Testimonials */}
      <Container fluid className="py-5 bg-light text-center" id="testimonials">
        <h2>What Our Clients Say</h2>
        <p>"Excellent service, highly recommended!" - John Doe</p>
      </Container>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3" id="contact">
        <p>Contact us at servicehub@example.com | Follow us on social media</p>
      </footer>
    
    </div>
  )
}

export default Home
