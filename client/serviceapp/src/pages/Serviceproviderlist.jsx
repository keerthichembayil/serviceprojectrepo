import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProviders} from "../redux/slices/providerListSlice";
import { fetchUsers } from "../redux/slices/userListSlice"; // Assume a user slice exists
import { Container, Row, Col, Table, Button, Spinner, Alert, Image,Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa"; // Import View Icon
import '../css/Serviceproviderlist.css'
const ProviderList = () => {
  const dispatch = useDispatch();
  const { providers, loading: providerLoading, error: providerError } = useSelector((state) => state.providerList);
  const { users, loading: userLoading, error: userError } = useSelector((state) => state.userList);
  console.log("users",users);


  useEffect(() => {
    dispatch(fetchProviders()).then(() => dispatch(fetchUsers()));
  }, [dispatch]);
  

  return (
    <div className="serviceproviderlist">
      <h2 className="text-center pt-4 pb-3 fw-bold">Admin Dashboard</h2>
      
      <Row className="g-4">
        {/* Service Providers Section */}
        <Col md={6}>
        <Card className="shadow-lg border-0 rounded text-white bg-secondary">
        <Card.Body>
              <Card.Title className="text-center fw-bold mb-3">Service Providers</Card.Title>
          
          {providerLoading ? <Spinner animation="border" /> : providerError ? <Alert variant="danger">{providerError}</Alert> : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th className="bg-primary">Image</th>
                  <th className="bg-primary">Name</th>
                  <th className="bg-primary">Service</th>
                  <th className="bg-primary">Email</th>
                  <th className="bg-primary">Action</th>
                </tr>
              </thead>
              <tbody>
                {providers.map((provider) => (
                  <tr key={provider._id} className="text-center">
                    <td className="admli">
                      <Image src={provider.image} alt={provider.name} roundedCircle width="50" height="50" />
                    </td>
                    <td className="admli">{provider.name}</td>
                    <td className="admli">{provider.services.join(",")}</td>
                    <td className="admli">{provider.userId?.email}</td>
                    <td className="admli">
                      <Link to={`/viewprovider/${provider._id}`}>
                        <Button variant="danger" size="sm">View</Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
           </Card.Body>
           </Card>
        </Col>

        {/* Users Section */}
        <Col md={6}>
        <Card className="shadow-lg border-0 rounded text-white" style={{ background: "linear-gradient(to right, #006666,rgb(58, 70, 60))" }}>
            <Card.Body>
              <Card.Title className="text-center fw-bold mb-3">Clients</Card.Title>
          {userLoading ? <Spinner animation="border" /> : userError ? <Alert variant="danger">{userError}</Alert> : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th className="bg-primary">Name</th>
                  <th className="bg-primary">Email</th>
                  <th className="bg-primary">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="text-center">
                    <td className="admli">{user.name}</td>
                    <td className="admli">{user.email}</td>
                    <td className="admli">
                      <Link to={`/user/${user._id}`}>
                        <Button variant="danger" size="sm">View</Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
            </Card.Body>
            </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProviderList;
