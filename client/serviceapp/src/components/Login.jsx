import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../redux/slices/authSlice";
import { Container, Card, Form, Button, Alert, Spinner } from "react-bootstrap";
import '../css/Login.css'
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const result = await dispatch(userLogin({ email, password })).unwrap();
              console.log(result);
             
    
        // Redirect based on role
       
         if(result.user.role==="client") {
          navigate("/clientdashboard");
          
        }
        else if(result.user.role==="provider") {
          navigate("/providerdashboard");
          
        }
        else {
          setErrorMessage("Unauthorized access: Invalid user role.");
        }

      } catch (error) {
        console.error("Login error:", error);
        alert(error.message || "Login failed");
      }
    };
  
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 logindesign">
      <Card style={{ width: "25rem" }} className="p-4 shadow-lg">
        <Card.Body style={{ backgroundColor: "#CCCCFF" }}>
          <h2 className="text-center mb-4 text-success">Login</h2>
          {error && <Alert variant="danger">{error.message || "Login failed"}</Alert>}
          {error && <p className="error">{error.message || "Login failed"}</p>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="emailbox"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="passbox"
              
                required
              />
            </Form.Group>

            <Button type="submit" className="w-100 loginbtn" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : "Login"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
    );
  };
  
  export default Login;
  