import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProviderRequests } from "../redux/slices/viewrequestbyproviderSlice";
import { Table, Spinner, Alert, Container, Card } from "react-bootstrap";
const Providerafterverify = () => {
  const dispatch = useDispatch();
  const { requests, loading, error } = useSelector((state) => state.requests);

  useEffect(() => {
    dispatch(fetchProviderRequests());
  }, [dispatch]);
  return (
    <div>
      <Container className="mt-4">
      <Card className="shadow p-3">
        <h3 className="text-center mb-3">Service Requests</h3>
        {loading && <Spinner animation="border" />}
        {error && <Alert variant="danger">{error}</Alert>}
        {requests.length === 0 && !loading && <Alert variant="info">No service requests found.</Alert>}
        {requests.length > 0 && (
          <Table striped bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Client Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Service Requested</th>
                <th>Additional Notes</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request, index) => (
                <tr key={request._id}>
                  <td>{index + 1}</td>
                  <td>{request.clientId.name}</td>
                  <td>{request.clientId.email}</td>
                  <td>{request.clientId.phone}</td>
                  <td>{request.services}</td>
                  <td>{request.additionalNotes || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>
    </Container>
    </div>
  )
}

export default Providerafterverify
