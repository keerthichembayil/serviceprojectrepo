import React from "react";
import { Link,useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice"; // Import logout action
import '../css/Navbar.css'


const Navbar2 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user} = useSelector((state) => state.auth); // Get user state from Redux

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login"); // Redirect to login after logout
  };
  
  return (
    <Navbar  variant="dark" expand="lg" className="px-3 navdesign">
      <Container>
        <Navbar.Brand as={Link} to="/">Service Hub</Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
       
          <Nav className="ms-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
         

    
          {user ? (
              <>
                <span className="nav-text">Welcome, {user.name}!</span>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}
        </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbar2;