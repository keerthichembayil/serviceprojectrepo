import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProvider,clearMessage} from "../redux/slices/providerSlice";
import { fetchProviderDetails } from "../redux/slices/setfreshproviderSlice";
import { Alert } from "react-bootstrap";
import { Container, Row, Col, Button, Form,Badge} from "react-bootstrap";
const predefinedServices = ["Electrician", "Plumbing", "Carpentry", "Painting", "Cleaning"];

const AddProvider = () => {

  const [services, setServices] = useState([]);

  const [experience, setExperience] = useState("");
  const [image, setImage] = useState(null);
  const [document, setDocument] = useState(null); // New state for document upload

  
  const dispatch = useDispatch();
  
  const userId = useSelector((state) => state.auth.user?.id);
  useEffect(() => {
    console.log("UserId updated:", userId);
  }, [userId]);
  console.log("UserId before submitting:", userId);
  const { loading, success, error, message } = useSelector((state) => state.provider);

  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        dispatch(clearMessage());
      }, 3000); // Clear message after 3 seconds
  
      return () => clearTimeout(timer);
    }
  }, [message, error, dispatch]);
  

  const handleFileChange = (e, setFile) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };
  
  const addService = (service) => {
    if (!services.includes(service)) {
      setServices([...services, service]);
    }
  };

  const removeService = (service) => {
    setServices(services.filter((s) => s !== service));
  };


  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!services.length || !experience || !image || !document) {
      alert("All fields are required!");
      return;
    }

     // Create FormData
  const formData = new FormData();
  formData.append("userId", userId);
 
  services.forEach((service, index) => {
    formData.append(`services[${index}]`, service);
  });
  formData.append("experience", experience);
  console.log("Selected image:", image);
  formData.append("image", image); // Append image file
  formData.append("document", document); // Append document file


  console.log("FormData before dispatch:", Object.fromEntries(formData.entries()));
  // The image won't appear in this log because it's a file.
    
  // dispatch(addProvider(formData));


  try {
    await dispatch(addProvider(formData)).unwrap(); // Wait for the API call to complete
    console.log("Provider added successfully!");
    //this was used after completing profile also we need to anually refresh to fecth the update state
    //so called the fetchproviderdetails from here to solve that issue
    // Introduce a slight delay before fetching provider details to ensure backend updates
    setTimeout(() => {
      dispatch(fetchProviderDetails());
    }, 500);  // Delay by 500ms to ensure backend processes the new data

  } catch (error) {
    console.error("Error adding provider:", error);
  }
  };

  return (
    <div>
      <Container fluid>
      <Row>
      {/* <Col md={3} className="bg-dark text-white p-4">
          
        </Col> */}
        <Col md={9} className="p-4">
          <h2 className="mb-4 text-white">Add Service Details</h2>
          {message && <Alert variant="primary">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
              <Form.Label className="text-white">Services</Form.Label>
              <div className="d-flex flex-wrap">
                {predefinedServices.map((service) => (
                  <Button
                    key={service}
                    variant={services.includes(service) ? "danger" : "primary"}
                    className="me-2 mb-2"
                    onClick={() =>
                      services.includes(service)
                        ? removeService(service)
                        : addService(service)
                    }
                  >
                    {services.includes(service) ? "- " : "+ "}{service}
                  </Button>
                ))}
              </div>
              <div className="mt-2">
                {services.map((service, index) => (
                  <Badge key={index} bg="secondary" className="me-2">
                    {service}
                  </Badge>
                ))}
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-white">Experience (years)</Form.Label>
              <Form.Control
                type="number"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-white">Profile Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => handleFileChange(e, setImage)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-white">Upload Document (PDF/DOC)</Form.Label>
              <Form.Control
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileChange(e, setDocument)}
                required
              />
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100" disabled={loading}>
              {loading ? "Adding..." : "Add"}
            </Button>
          </Form>
        </Col>
      
      </Row>
      </Container>
    </div>
  );
};

export default AddProvider;
