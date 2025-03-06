import { useState } from "react";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Alert, Card ,Row,Col} from "react-bootstrap";
import '../css/Register.css'


const Register = () => {
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    password: "", 
    phone: "", 
    role: "client", // Default role is client
    gender: "male", 
    address: {
      street: "",
      city: "",
      state: ""
    }
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      // Updating nested address fields
      const field = name.split(".")[1]; // Get the field name (street, city, etc.)
      setFormData((prevData) => ({
        ...prevData,
        address: { ...prevData.address, [field]: value },
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("formdata client",formData);
      const res = await axios.post("auth/registerUser", formData);
      console.log("res",res);
      alert(res.data.message);
      navigate("/login"); // Redirect to login after registration
    } catch (err) {
      console.log("entered error");
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (

    <div fluid className="min-vh-100 d-flex align-items-center">
      <Row className="w-100">
        {/* Left Side */}
        <Col md={4} className="d-flex flex-column justify-content-center align-items-center text-white" style={{ backgroundColor: "#FFB6C1", padding: "30px" }}>
          {/* <img src={logo} alt="Logo" style={{ width: "150px", marginBottom: "20px" }} /> */}
          <h2>Welcome to Our Service</h2>
          <p>Your one-stop solution for professional services</p>
        </Col>



    {/* Right Side - Registration Form */}
    <Col md={8} className="d-flex justify-content-start align-items-center regform">
          <Card style={{ width: "400px", padding: "20px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Register</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit} autoComplete="off">
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
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
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>phone</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                placeholder="Enter Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Control as="select" name="role" value={formData.role} onChange={handleChange}>
                  <option value="client">Client</option>
                  <option value="provider">ServiceProvider</option>
                </Form.Control>
              </Form.Group>

              <Form.Group className="mb-3">
                  <Form.Label>Gender</Form.Label>
                  <Form.Control as="select" name="gender" value={formData.gender} onChange={handleChange}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Form.Control>
                </Form.Group>
              {/* Address Fields */}
              <h5 className="mt-3">Address</h5>
              <Form.Group className="mb-3">
                <Form.Label>Street</Form.Label>
                <Form.Control
                  type="text"
                  name="address.street"
                  placeholder="Enter Street"
                  value={formData.address.street}
                  onChange={handleChange}
                   
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="address.city"
                  placeholder="Enter City"
                  value={formData.address.city}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  name="address.state"
                  placeholder="Enter State"
                  value={formData.address.state}
                  onChange={handleChange}
                />
              </Form.Group>
            

            <Button type="submit" className="w-100 btnregister">
              Register
            </Button>
          </Form>
        </Card.Body>
      </Card>
    
    </Col>
  </Row>

</div>  );
};

export default Register;
