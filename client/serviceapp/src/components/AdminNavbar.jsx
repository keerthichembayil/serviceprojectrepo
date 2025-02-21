import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import '../css/Navbar.css'


const AdminNavbar = () => {
  
  return (
    <Navbar  variant="dark" expand="lg" className="px-3 navdesignadmin">
      <Container>
        <Navbar.Brand as={Link} to="/">Service Hub</Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
       
          <Nav className="ms-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
         

    
    <Nav.Link as={Link} to="/adminlogin">Login</Nav.Link>
    <Nav.Link as={Link} to="/register">Register</Nav.Link>
        </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AdminNavbar;