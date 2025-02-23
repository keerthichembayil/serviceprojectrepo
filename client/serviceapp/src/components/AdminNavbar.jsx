import React from "react";
import { Link ,useNavigate} from "react-router-dom";
import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import '../css/Navbar.css'
import { useDispatch, useSelector } from "react-redux";
import { adminLogout } from "../redux/slices/adminauthSlice"; // Import logout action


const AdminNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {admin} = useSelector((state) => state.adminAuth); // Get user state from Redux
  

  const handleLogout = () => {
    dispatch(adminLogout());
    navigate("/adminlogin"); // Redirect to login after logout
  };
  
  return (
    <Navbar  variant="dark" expand="lg" className="px-3 navdesignadmin">
      <Container>
        <Navbar.Brand as={Link} to="/">Service Hub</Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
       
          <Nav className="ms-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
         

    
       {admin ? (
                  <>
                    <span className="nav-text">Welcome, {admin.name}!</span>
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

export default AdminNavbar;