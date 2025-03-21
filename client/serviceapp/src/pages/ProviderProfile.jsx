import React, { useEffect, useState } from "react";
import { Container, Form, Button, Alert, Spinner, Card, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchProviderDetails, updateProviderDetails, resetUpdateState } from "../redux/slices/providerProfileSlice";
const predefinedServices = ["Electrician", "Plumbing", "Carpentry", "Painting", "Cleaning"];
import '../css/Providerprofile.css'


const ProviderProfile = () => {
  const dispatch = useDispatch();
  const { details, loading, error, success } = useSelector((state) => state.providerdt);

  // Local state for the form
  const [formData, setFormData] = useState({
    name: "",
  
    experience: "",
    image: null,
    imagePreview: "",
    services: [], 
  });

  
  const [selectedService, setSelectedService] = useState("");
  // Fetch provider details when component mounts
  useEffect(() => {
    dispatch(fetchProviderDetails());
  }, [dispatch]);

  // Update local state when details are fetched
  useEffect(() => {
    if (details) {
      setFormData({
        name: details.name || "",
       
        experience: details.experience || "",
        image: null,
        imagePreview: details.image || "",
        services: details.services || [],   
      });
    }
  }, [details]);


  // **Reset success message after 3 seconds**
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        dispatch(resetUpdateState());
      }, 3000);
      return () => clearTimeout(timer); // Cleanup function
    }
  }, [success, dispatch]);


    // Handle form change
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  const handleAddService = () => {
    if (selectedService && !formData.services.includes(selectedService)) {
      setFormData({
        ...formData,
        services: [...formData.services, selectedService],
      });
    }
    setSelectedService("");
  };

  const handleRemoveService = (service) => {
    setFormData({
      ...formData,
      services: formData.services.filter((s) => s !== service),
    });
  };



 // Handle form submit
 const handleSubmit = (e) => {
  e.preventDefault();
  const updatedData = new FormData();

  updatedData.append("experience", formData.experience);
  updatedData.append("services", JSON.stringify(formData.services)); 
  if (formData.image) {
    updatedData.append("image", formData.image);
  }
  dispatch(updateProviderDetails(updatedData));
};
  return (
<div className="providerprofile pt-3">
    <Container className="d-flex justify-content-center">
      <Card className="shadow-lg p-4" style={{ maxWidth: "600px", width: "100%",backgroundColor: "#FF66B2" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Provider Profile</h2>

          {loading && <Spinner animation="border" className="d-block mx-auto" />}
          {error && <Alert variant="danger">{error}</Alert>}
          {success && (
            <Alert variant="success" onClose={() => dispatch(resetUpdateState())} dismissible>
              Details updated successfully!
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            {/* Name - ReadOnly */}
            <Form.Group controlId="name" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} className="formst" readOnly />
            </Form.Group>

            {/* Experience - Editable */}
            <Form.Group controlId="experience" className="mb-3">
              <Form.Label>Experience (Years)</Form.Label>
              <Form.Control
                type="number"
                name="experience"
                value={formData.experience}
                className="formst"
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Image Upload */}
            <Form.Group controlId="image" className="mb-3">
              <Form.Label>Change Profile Image</Form.Label>
              <Form.Control type="file" accept="image/*"  className="formst" onChange={handleImageChange} />
            </Form.Group>

            {/* Image Preview */}
            {formData.imagePreview && (
              <div className="text-center mb-3">
                <img
                  src={formData.imagePreview}
                  alt="Profile"
                  width="120"
                  height="120"
                  className="rounded-circle border border-2"
                />
              </div>
            )}



<Form.Group controlId="services" className="mb-3">
                <Form.Label>Services Offered</Form.Label>
                <div className="d-flex">
                  <Form.Select value={selectedService} className="formst" onChange={(e) => setSelectedService(e.target.value)}>
                    <option value="">Select a Service</option>
                    {predefinedServices.map((service, index) => (
                      <option key={index} value={service}>
                        {service}
                      </option>
                    ))}
                  </Form.Select>
                  <Button variant="success" className="ms-2" onClick={handleAddService} disabled={!selectedService}>
                    +
                  </Button>
                </div>
                <ul className="list-group mt-2">
                  {formData.services.map((service, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center formst">
                      {service}
                      <Button variant="danger" size="sm" onClick={() => handleRemoveService(service)}>
                        -
                      </Button>
                    </li>
                  ))}
                </ul>
              </Form.Group>


            <Button variant="primary" type="submit" className="w-100" disabled={loading}>
              {loading ? "Updating..." : "Update Details"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
    </div>
  )
}

export default ProviderProfile
