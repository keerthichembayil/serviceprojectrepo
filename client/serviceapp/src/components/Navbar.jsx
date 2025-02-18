import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Badge } from "react-bootstrap";


const Navbar2 = () => {
  
  return (
    <Navbar  variant="dark" expand="lg" className="px-3 navdesign">
      <Container>
        <Navbar.Brand as={Link} to="/">ShopEase</Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
       
          <Nav className="ms-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
         

    
    <Nav.Link as={Link} to="/login">Login</Nav.Link>
    <Nav.Link as={Link} to="/register">Register</Nav.Link>
        </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbar2;