import { useState } from "react";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Alert, Card } from "react-bootstrap";
const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post("auth/login", formData);
        localStorage.setItem("token", res.data.token);
  
        
        localStorage.setItem("user", JSON.stringify(res.data.user));
        
        
  
        // Redirect based on role
       
         if(res.data.user.role=="client") {
          navigate("/");
          
        }
        else if(res.data.user.role=="provider") {
          navigate("/providerdashboard");
          
        }
        else {
          setErrorMessage("Unauthorized access: Invalid user role.");
        }

      } catch (err) {
        setError(err.response?.data?.message || "Login failed");
      }
    };
  
    return (
      <div className="loginpage">
       <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Card style={{ width: "25rem", padding: "20px" }}>
          <h2 className="text-center">Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>
        </Card>
      </Container>
      </div>
    );
  };
  
  export default Login;
  