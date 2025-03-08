import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProviderDetails, approveProvider } from "../redux/slices/providerdetailadmSlice";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Spinner, Alert, Image, Container, Row, Col, Card, Stack } from "react-bootstrap";
const Viewprovider = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { provider, loading, error } = useSelector((state) => state.providerDetailsad);

  useEffect(() => {
    console.log("Provider ID:", id);
    dispatch(fetchProviderDetails(id));
  }, [dispatch, id]);

  const handleApprove = async () => {
    try {
      const response=await dispatch(approveProvider(id)).unwrap();
      alert(response.message);
      // navigate("/admin/dashboard"); // Redirect after approval
    } catch (error) {
      console.error("Approval Error:", error);
      alert(error.message || "Approval failed");
    }
  };
  const handleDownload = () => {
    const downloadUrl = `${provider.document}?fl_attachment=true`; // Forces download
    window.open(downloadUrl, "_blank"); // Opens in a new tab to bypass CORS issues
  };
  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div>
        
        <Container className="mt-4">
      <h2 className="text-center mb-4">Provider Details</h2>

      {provider && (
        <Card className="shadow-lg p-4">
          <Row className="align-items-center">
            <Col md={3} className="text-center">
              <Image src={provider.image} alt={provider.name} roundedCircle width="150" height="150" />
            </Col>
            <Col md={9}>
              <Stack gap={2}>
                <h4 className="fw-bold">{provider.name}</h4>
                <p><strong>Services:</strong> {provider.services?.join(", ")}</p>
                <p><strong>Experience:</strong> {provider.experience} years</p>
                <p><strong>Email:</strong> {provider.userId?.email}</p>
                <p><strong>Phone:</strong> {provider.userId?.phone}</p>
                <p><strong>Address:</strong> {provider.userId?.address?.street}, {provider.userId?.address?.city}, {provider.userId?.address?.state}</p>
              </Stack>
            </Col>
          </Row>

          <hr />

          <h4 className="text-center">Provider Document</h4>
          {provider.document ? (
            <div className="text-center mt-3">
              <a href={`${provider.document}?fl_attachment=true`} download>
                <Button variant="success" className="me-2">Download Document</Button>
              </a>
              <Button variant="secondary" onClick={handleDownload}>
                Open in New Tab
              </Button>
            </div>
          ) : (
            <Alert variant="warning" className="text-center mt-3">No document uploaded</Alert>
          )}

          {!provider.isVerified && (
            <div className="text-center mt-4">
              <Button onClick={handleApprove} variant="success">
                Approve Provider
              </Button>
            </div>
          )}
        </Card>
      )}
    </Container>
      
    </div>
  )
}

export default Viewprovider
