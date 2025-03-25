import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProviderDetails } from "../redux/slices/setfreshproviderSlice";
import AddProvider from './Addprovider';
import Providerafterverify from './Providerafterverify';
import { Container, Row, Col, Button, Alert,Card} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { FaUserEdit, FaMoneyCheckAlt, FaEnvelope } from 'react-icons/fa'; // Import icons
import '../css/Providerdash.css'

const ProviderDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate
    

  // Fetch provider details from Redux state
  const { details: providerDetails, isVerified, isPending, isRejected,error } = useSelector(state => state.providerfresh);

  useEffect(() => {
    if (!providerDetails) {
      dispatch(fetchProviderDetails());
    }
  }, [dispatch, providerDetails]);

  return (
    <Container fluid>
      <Row>
        {/* Sidebar */}
        <Col md={3} className="sidebarprovider p-4 min-vh-100 d-flex flex-column align-items-center">
        <Card className="w-100 p-3 bg-secondary">
          {!isVerified ? (
            <>
              {!providerDetails ? (
                <Alert variant="warning" className="text-center w-100">
                  Please add your service details for verification.
                </Alert>
              ) : isRejected ? (
                <Alert variant="danger" className="text-center w-100">
                   Your verification was rejected. Please contact support for further action.
                </Alert>
              ) : isPending ? (
                <Alert variant="info" className="text-center w-100">
                  Your details are submitted and under review. Please check your email for updates.
                </Alert>
              ) : (
                <Alert variant="danger" className="text-center w-100">
                  Your details are submitted. Now, check your email for verification.
                </Alert>
              )}

              {providerDetails && !isVerified && !isRejected && (
                <Button 
                  variant="primary" 
                  className="mt-3 w-100"
                  onClick={() => alert("Check your email for verification")}
                >
                   <FaEnvelope className="me-2" />  Visit Email to Verify
                </Button>
              )}
            </>
          ) : (
            <div className="text-center">
              <h4>Provider Dashboard</h4>
              <Button variant="success" className="w-100 mb-3" onClick={() => navigate(`/providerdet`)}>
              <FaUserEdit className="me-2" /> View & Update Profile
              </Button>
              <Button variant="success" className="w-100" onClick={()=>navigate('/providerpayment')}>
              <FaMoneyCheckAlt className="me-2" /> View Payment Details
              </Button>
            </div>
          )}
          </Card>
        </Col>

        {/* Main Content */}
        <Col md={9} className="p-4 mainsectionprovider">
        {error && <Alert variant="danger" className="text-center">{error}</Alert>}
        
       
        {!providerDetails ? (
            <AddProvider /> // Show form to add provider details
          ) : isRejected ? (
            <Alert variant="danger" className="text-center">
              Your verification was rejected. Please contact support for further action.
            </Alert>
          )  : !isVerified ? (
            <Alert variant="info" className="text-center">
              Your details are added. Please check your email for verification.
            </Alert>
          ) : (
            <Providerafterverify />
          )}
             
        </Col>
      </Row>
    </Container>
  );
};

export default ProviderDashboard;
