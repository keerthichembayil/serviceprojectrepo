import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProviderRequests } from "../redux/slices/viewrequestbyproviderSlice";
import { updateRequestStatus } from "../redux/slices/updaterequestSlice";
import { Table, Spinner, Alert, Container, Card,Button} from "react-bootstrap";
const Providerafterverify = () => {
  const dispatch = useDispatch();
  const { requests, loading, error } = useSelector((state) => state.requests);
  const [alertMessage, setAlertMessage] = useState(null);

  useEffect(() => {
    dispatch(fetchProviderRequests());
  }, [dispatch]);
 

  const handleStatusChange = async(requestId, status) => {
    try{
      await dispatch(updateRequestStatus({ requestId, status })).unwrap();
      setAlertMessage(`Request successfully marked as ${status}`);
      console.log("Updating status:", requestId, status); // Debugging log
      setTimeout(() => setAlertMessage(null), 3000);
      
      dispatch(fetchProviderRequests());  // Refresh requests after status change
      
    }
    catch(err){
      setAlertMessage(`Error updating request: ${err}`);
    }
   
  };
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
                <th>Service Date</th>
                <th>Additional Notes</th>
                <th>Status</th>
                <th>Mark</th>
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
                  <td>
                  {request.serviceDate ? new Date(request.serviceDate).toDateString() : "N/A"}
                </td>

                  
                  <td>{request.additionalNotes || "N/A"}</td>



                  <td>
                  <span className={`badge bg-${
  request.status === 'accepted' ? 'success' :
  request.status === 'rejected' ? 'danger' :
  request.status === 'completed' ? 'primary' :
  request.status === 'pending' ? 'warning' : 'secondary'
}`}>
  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
</span>
                    </td>
                    <td>
                      {request.status === "pending" && (
                        <>
                          <Button variant="success" size="sm" onClick={() => handleStatusChange(request._id, "accepted")}>
                            Accept
                          </Button>{" "}
                          <Button variant="danger" size="sm" onClick={() => handleStatusChange(request._id, "rejected")}>
                            Reject
                          </Button>
                        </>
                      )}
                      {request.status === "accepted" && (
                        <Button variant="primary" size="sm" onClick={() => handleStatusChange(request._id, "completed")}>
                          Mark as Completed
                        </Button>
                      )}
                    </td>
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
