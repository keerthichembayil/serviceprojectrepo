import { useState } from "react";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Container, Alert, Card } from "react-bootstrap";
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
       
         if(result.data.user.role=="client") {
          navigate("/");
          
        }
        else if(result.data.user.role=="provider") {
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
      <div className="loginpage">
       {/* <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Card style={{ width: "25rem", padding: "20px" }}> */}
          <h2 className="text-center">Login</h2>
          <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
       <button type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
      </form>
          {error && <p className="error">{error.message || "Login failed"}</p>}
        {/* </Card>
      </Container> */}
      </div>
    );
  };
  
  export default Login;
  