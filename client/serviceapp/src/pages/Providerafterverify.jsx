import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProviderRequests } from "../redux/slices/viewrequestbyproviderSlice";
import { fetchClientRequests } from "../redux/slices/clientRequestDetailsSlice";
import { updateRequestStatus } from "../redux/slices/updaterequestSlice";
import { Table, Spinner, Alert, Container, Card,Button} from "react-bootstrap";
import '../css/providerafterverify.css'



const Providerafterverify = () => {
  const dispatch = useDispatch();
  const { requests, loading, error } = useSelector((state) => state.requests);
  console.log("requests",requests);
  const [alertMessage, setAlertMessage] = useState(null);
  // const [refresh, setRefresh] = useState(false); // 🔹 State to trigger refresh
  //Fetch requests on component load & whenever requests update
  useEffect(() => {
    dispatch(fetchProviderRequests());
  }, [dispatch,requests.length]);
 

  const handleStatusChange = async(requestId, status) => {
    try{
      await dispatch(updateRequestStatus({ requestId, status })).unwrap();
      setAlertMessage(`Request successfully marked as ${status}`);
      console.log("Updating status:", requestId, status); // Debugging log
      setTimeout(() => setAlertMessage(null), 3000);
      // setRefresh(prev => !prev); 
      
       dispatch(fetchProviderRequests());  // Refresh requests after status change
       dispatch(fetchClientRequests());    //to make clientdashbaord autorefresh
      
    }
    catch(err){
      setAlertMessage(`Error updating request: ${err}`);
    }
   
  };
  return (
    <div>
      <Container className="mt-4">
      <Card className="shadow p-3 bg-secondary">
        <h3 className="text-center p-3 bg-primary rounded">Service Requests Received</h3>
         {/* Alert Message Here */}
         {alertMessage && (
          <Alert
            variant={alertMessage.includes("Error") ? "danger" : "success"}
            className="mt-3"
            onClose={() => setAlertMessage(null)}
            dismissible
          >
            {alertMessage}
          </Alert>
        )}
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
                <th>Address</th>
                <th>Status</th>
                <th>Mark</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request, index) => (
                <tr key={request._id}>
                  <td className="listreq">{index + 1}</td>
                  <td className="listreq">{request.clientId.name}</td>
                  <td className="listreq">{request.clientId.email}</td>
                  <td className="listreq">{request.clientId.phone}</td>
                  <td className="listreq">{request.services}</td>
                  <td className="listreq">
                  {request.serviceDate ? new Date(request.serviceDate).toDateString() : "N/A"}
                </td>

                  
                  <td className="listreq">{request.additionalNotes || "N/A"}</td>
                   {/*Address Section */}
                   <td className="listreq">
  {request.clientId.address ? (  // Check if address exists
    <ul className="list-unstyled mb-0">
      <li>{request.clientId.address.street}</li>
      <li>{request.clientId.address.city}</li>
      <li>{request.clientId.address.state}</li>
    </ul>
  ) : (
    <span>No Address Available</span>
  )}
</td>



                  <td className="listreq">
                  <span className={`badge bg-${
  request.status === 'accepted' ? 'success' :
  request.status === 'rejected' ? 'danger' :
  request.status === 'completed' ? 'primary' :
  request.status === 'pending' ? 'warning' : 'secondary'
}`}>
  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
</span>
                    </td>
                    <td className="listreq">
                      {request.status === "pending" && (
                        <>
                          <Button variant="success" size="sm" onClick={() => handleStatusChange(request._id, "accepted")}>
                            Accept
                          </Button>{" "}
                          <Button variant="danger" size="sm" className="mt-4" onClick={() => handleStatusChange(request._id, "rejected")}>
                            Reject
                          </Button>
                        </>
                      )}
                      {request.status === "accepted" && (
                        <Button variant="primary" size="sm"onClick={() => handleStatusChange(request._id, "completed")}>
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
