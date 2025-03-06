import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProviders} from "../redux/slices/providerListSlice";
import { fetchUsers } from "../redux/slices/userListSlice"; // Assume a user slice exists
import { Container, Row, Col, Table, Button, Spinner, Alert, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProviderList = () => {
  const dispatch = useDispatch();
  const { providers, loading: providerLoading, error: providerError } = useSelector((state) => state.providerList);
  const { users, loading: userLoading, error: userError } = useSelector((state) => state.userList);


  useEffect(() => {
    dispatch(fetchProviders()).then(() => dispatch(fetchUsers()));
  }, [dispatch]);
  

  return (
    <div className="mt-4">
      <h2 className="text-center mb-4">Dashboard</h2>
      
      <Row>
        {/* Service Providers Section */}
        <Col md={6}>
          <h3 className="mb-3">Service Providers</h3>
          {providerLoading ? <Spinner animation="border" /> : providerError ? <Alert variant="danger">{providerError}</Alert> : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Service</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {providers.map((provider) => (
                  <tr key={provider._id}>
                    <td>
                      <Image src={provider.image} alt={provider.name} roundedCircle width="50" height="50" />
                    </td>
                    <td>{provider.name}</td>
                    <td>{provider.services.join(",")}</td>
                    <td>{provider.userId?.email}</td>
                    <td>
                      <Link to={`/viewprovider/${provider._id}`}>
                        <Button variant="danger" size="sm">View</Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>

        {/* Users Section */}
        <Col md={6}>
          <h3 className="mb-3">Clients</h3>
          {userLoading ? <Spinner animation="border" /> : userError ? <Alert variant="danger">{userError}</Alert> : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <Link to={`/admin/user/${user._id}`}>
                        <Button variant="danger" size="sm">View</Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ProviderList;
