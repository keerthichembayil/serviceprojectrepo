import { useState } from "react";
import Joi from "joi";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Alert, Card ,Row,Col} from "react-bootstrap";
import '../css/Register.css'


const Register = () => {
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    password: "", 
    confirmPassword: "",  // New state field
    phone: "", 
    role: "client", // Default role is client
    gender: "male", 
    address: {
      street: "",
      city: "",
      state: ""
    }
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();
  
   // Joi Validation Schema
   const schema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
      "string.empty": "Name is required",
      "string.min": "Name must be at least 3 characters",
    }),
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
      "string.email": "Invalid email format",
      "string.empty": "Email is required",
    }),
    password: Joi.string().min(6).required().messages({
      "string.min": "Password must be at least 6 characters",
      "string.empty": "Password is required",
    }),
    confirmPassword: Joi.any().valid(Joi.ref("password")).required().messages({
      "any.only": "Passwords do not match",
      "string.empty": "Confirm Password is required",
    }),
    phone: Joi.string().pattern(/^\d{10}$/).required().messages({
      "string.pattern.base": "Phone must be 10 digits",
      "string.empty": "Phone is required",
    }),
    role: Joi.string().valid("client", "provider").required(),
    gender: Joi.string().valid("male", "female").required(),
    address: Joi.object({
      street: Joi.string().required().messages({ "string.empty": "Street is required" }),
      city: Joi.string().required().messages({ "string.empty": "City is required" }),
      state: Joi.string().required().messages({ "string.empty": "State is required" }),
    }),
  });


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




  const validateForm = () => {
    const { error } = schema.validate(formData, { abortEarly: false });
    if (!error) {
      setErrors({});
      return true;
    }
    
    // Convert Joi error array to object
    const newErrors = {};
    error.details.forEach((err) => {
      newErrors[err.path.join(".")] = err.message;
    });

    setErrors(newErrors);
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    try {
      console.log("formdata client",formData);
      const res = await axios.post("auth/registerUser", formData);
      console.log("res",res);
      alert(res.data.message);
      navigate("/login"); // Redirect to login after registration
    } catch (err) {
      console.log("entered error");
      setServerError(err.response?.data?.message || "Registration failed");
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
          {serverError && <Alert variant="danger">{serverError}</Alert>}
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
               {errors.name && <small className="text-danger">{errors.name}</small>}
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
              {errors.email && <small className="text-danger">{errors.email}</small>}
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
               {errors.password && <small className="text-danger">{errors.password}</small>}
            </Form.Group>
            <Form.Group className="mb-3">
  <Form.Label>Confirm Password</Form.Label>
  <Form.Control
    type="password"
    name="confirmPassword"
    placeholder="Confirm password"
    value={formData.confirmPassword}
    onChange={handleChange}
    required
  />
  {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}
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
              {errors.phone && <small className="text-danger">{errors.phone}</small>}
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Control as="select" name="role" value={formData.role} onChange={handleChange}>
                  <option value="client">Client</option>
                  <option value="provider">ServiceProvider</option>
                </Form.Control>
                {errors.role && <small className="text-danger">{errors.role}</small>}
              </Form.Group>

              <Form.Group className="mb-3">
                  <Form.Label>Gender</Form.Label>
                  <Form.Control as="select" name="gender" value={formData.gender} onChange={handleChange}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Form.Control>
                  {errors.gender && <small className="text-danger">{errors.gender}</small>}
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
                  {errors["address.street"] && <small className="text-danger">{errors["address.street"]}</small>}
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
                 {errors["address.city"] && <small className="text-danger">{errors["address.city"]}</small>}
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
                 {errors["address.state"] && <small className="text-danger">{errors["address.state"]}</small>}
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
