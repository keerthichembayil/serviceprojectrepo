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
      <h2 className="text-center pt-4 pb-3 text-white">Service Request Details</h2>

      {loading ? (
        <Spinner animation="border" />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : requests && requests.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="bg-primary">Client Name</th>
              <th className="bg-primary">Client Email</th>
              <th className="bg-primary">Service Provider</th>
              <th className="bg-primary">Requested Services</th>
              <th className="bg-primary">Service Date</th>
              <th className="bg-primary">Notes Given</th>
              <th className="bg-primary">Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => (
              <tr key={index}>
                <td className="bg-secondary text-white">{request.clientId?.name}</td>
                <td className="bg-secondary text-white">{request.clientId?.email}</td>
                <td className="bg-secondary text-white">{request.providerId?.name || "N/A"}</td>
                <td className="bg-secondary text-white">{request.services || "N/A"}</td>
                <td className="bg-secondary text-white">{request.serviceDate ? new Date(request.serviceDate).toLocaleDateString() : "N/A"}</td>
                <td className="bg-secondary text-white">{request.additionalNotes || "No notes provided"}</td>
                <td className="bg-secondary text-white">
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
