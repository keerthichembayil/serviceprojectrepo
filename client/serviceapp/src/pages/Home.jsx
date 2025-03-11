import React from 'react'
import { Container, Row, Col, Navbar, Nav, Button, Card ,Carousel} from "react-bootstrap";

import '../css/Home.css'

const testimonials = [
  {
    name: "John Doe",
    text: "Excellent service, highly recommended!",
    image: "images/testimonial1.jpg", // Replace with real image
    designation: "Business Owner",
  },
  {
    name: "Jane Smith",
    text: "Very professional and timely service. Will use again!",
    image: "images/testimonial2.avif",
    designation: "Project Manager",
  },
  {
    name: "David Wilson",
    text: "Reliable and efficient. Great customer support!",
    image: "images/testimonial3.jpg",
    designation: "Entrepreneur",
  },
];

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
                 
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Testimonials */}
      <Container fluid className="py-5 testimoni text-center" id="testimonials">
      <h2 className="mb-4">What Our Clients Say</h2>
      
      <Carousel indicators={false} controls={true} className="mx-auto" style={{ maxWidth: "600px" }}  nextIcon={<span className="carousel-control-next-icon bg-dark p-3 rounded-circle" />}
        prevIcon={<span className="carousel-control-prev-icon bg-dark p-3 rounded-circle" />}>
        {testimonials.map((testimonial, index) => (
          <Carousel.Item key={index} style={{ backgroundColor: "#e3f2fd", borderRadius: "10px", padding: "20px" }}>
              <div className="p-4" style={{ backgroundColor: "#f8f9fa", borderRadius: "10px" }}> 
            <Card className="p-4 border-0 shadow-sm">
              <Card.Img
                variant="top"
                src={testimonial.image}
                className="rounded-circle mx-auto d-block"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Text className="fst-italic">"{testimonial.text}"</Card.Text>
                <h5 className="mt-3">{testimonial.name}</h5>
                <p className="text-muted">{testimonial.designation}</p>
              </Card.Body>
            </Card>
            </div>
          </Carousel.Item>

        ))}
      </Carousel>
    
    </Container>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3" id="contact">
      <Container>
        <p>Contact us at servicehub@gmail.com | Follow us on social media</p>
        <div>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
            <i className="bi bi-facebook fs-4"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
            <i className="bi bi-twitter fs-4"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
            <i className="bi bi-instagram fs-4"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
            <i className="bi bi-linkedin fs-4"></i>
          </a>
        </div>
      </Container>
    </footer>
    
    </div>
  )
}

export default Home
