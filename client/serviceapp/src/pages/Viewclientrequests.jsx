import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClientRequests } from "../redux/slices/clientRequestDetailsSlice";
import { Container, Table, Spinner, Alert, Image,Badge } from "react-bootstrap";

const ClientRequests = () => {
  const dispatch = useDispatch();
  const { requests, loading, error } = useSelector((state) => state.clientRequestDetails);

  useEffect(() => {
    dispatch(fetchClientRequests());
  }, [dispatch]);

  return (
    <Container className="mt-4">
      <h2 className="mb-3">Your Service Requests</h2>
      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {!loading && !error && requests.length === 0 && (
        <Alert variant="info">No service requests found.</Alert>
      )}
      {!loading && !error && requests.length > 0 && (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Provider Name</th>
              <th>Service</th>
              <th>Image</th>
              <th>Additional Notes</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => (
              <tr key={request._id}>
                <td>{index + 1}</td>
                <td>{request.providerId?.name || "N/A"}</td>
                <td>
  {request.services?.length > 0
    ? request.services.map((service, i) => (
        <Badge key={i} bg="info" className="me-1">
          {service}
        </Badge>
      ))
    : "N/A"}
</td>
                <td>
                  {request.providerId?.image ? (
                    <Image src={request.providerId.image} alt="Service Provider" width={50} height={50} rounded />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td>{request.additionalNotes || "No notes"}</td>
                <td>
                  <Badge 
                    bg={
                      request.status === "Pending"
                        ? "warning"
                        : request.status === "Approved"
                        ? "success"
                        : "danger"
                    }
                  >
                    {request.status}
                  </Badge>
                </td>
                
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default ClientRequests;
