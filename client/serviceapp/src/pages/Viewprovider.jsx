import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProviderDetails, approveProvider } from "../redux/slices/providerdetailadmSlice";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Spinner, Alert, Image, Container } from "react-bootstrap";

const Viewprovider = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { provider, loading, error } = useSelector((state) => state.providerDetails);

  useEffect(() => {
    dispatch(fetchProviderDetails(id));
  }, [dispatch, id]);

  const handleApprove = async () => {
    try {
      await dispatch(approveProvider(id));
      alert("Provider Approved Successfully!");
      navigate("/admin/dashboard"); // Redirect after approval
    } catch (error) {
      console.error("Approval Error:", error);
    }
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  return (
    <div>
        
      <h2>Provider Details</h2>
      {provider && (
        <div>
          <Image src={provider.image} alt={provider.name} rounded width="150" height="150" />
          <p><strong>Name:</strong> {provider.name}</p>
          <p><strong>Service:</strong> {provider.service}</p>
          <p><strong>Experience:</strong> {provider.experience} years</p>
          <p><strong>Email:</strong> {provider.userId?.email}</p>
          <p><strong>Phone:</strong> {provider.userId?.phone}</p>
          <p><strong>Address:</strong> {provider.userId?.address}</p>

          <h3>Provider Document</h3>
          {provider.document ? (
            <a href={provider.document} download target="_blank" rel="noopener noreferrer">
              <Button variant="primary">Download Document</Button>
            </a>
          ) : (
            <Alert variant="warning">No document uploaded</Alert>
          )}

          {!provider.isVerified && (
            <Button onClick={handleApprove} className="mt-3" variant="success">
              Approve Provider
            </Button>
          )}
        </div>
      )}
  
      
    </div>
  )
}

export default Viewprovider
