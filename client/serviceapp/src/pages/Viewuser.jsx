import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchuserspecific} from "../redux/slices/userspecificdetailsSlice";
import { Container, Table, Spinner, Alert } from "react-bootstrap";
import '../css/Viewuser.css';

const ServiceRequestDetails = () => {
  const { id } = useParams(); // Get the service request ID from the URL
  const dispatch = useDispatch();

  const { requests, loading, error } = useSelector((state) => state.serviceRequest);
  console.log("request",requests);

  useEffect(() => {
    dispatch(fetchuserspecific(id));
  }, [dispatch, id]);

  return (
    <div className="viewuser">
    <Container>
      <h2 className="text-center pt-4 pb-3">Service Request Details</h2>

      {loading ? (
        <Spinner animation="border" />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : requests && requests.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Client Name</th>
              <th>Client Email</th>
              <th>Service Provider</th>
              <th>Requested Services</th>
              <th>Service Date</th>
              <th>Notes Given</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => (
              <tr key={index}>
                <td>{request.clientId?.name}</td>
                <td>{request.clientId?.email}</td>
                <td>{request.providerId?.name || "N/A"}</td>
                <td>{request.services || "N/A"}</td>
                <td>{request.serviceDate ? new Date(request.serviceDate).toLocaleDateString() : "N/A"}</td>
                <td>{request.additionalNotes || "No notes provided"}</td>
                <td>
                  <span
                    className={`badge ${
                      request.status === "Completed"
                        ? "bg-success"
                        : request.status === "Pending"
                        ? "bg-warning text-dark"
                        : "bg-danger"
                    }`}
                  >
                    {request.status}
                  </span>
                </td>

                

              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No service requests found for this client</p>
      )}
    </Container>
    </div>
  );
};

export default ServiceRequestDetails;
