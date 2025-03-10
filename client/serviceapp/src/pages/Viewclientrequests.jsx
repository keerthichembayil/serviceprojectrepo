import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClientRequests } from "../redux/slices/clientRequestDetailsSlice";
import { Container, Table, Spinner, Alert, Image,Badge,Button,Form } from "react-bootstrap";
import { createPaymentSession, clearPaymentState } from "../redux/slices/paymentSlice";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY); // Replace with your actual key


const ClientRequests = () => {
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.auth.user?.email); // Get user email
  const { requests, loading, error } = useSelector((state) => state.clientRequestDetails);
  const { sessionId, paymentLoading } = useSelector((state) => state.payment);

  // State to store user-entered price for each request
  const [customAmounts, setCustomAmounts] = useState({});

  useEffect(() => {
    dispatch(fetchClientRequests());
  }, [dispatch]);


  useEffect(() => {
    if (sessionId) {
      handleStripeRedirect();
    }
  }, [sessionId]);

  const handlePayment = async (request) => {
    const amount = customAmounts[request._id]; // Get entered price

    if (!userEmail) {
      alert("User email not found. Please log in.");
      return;
    }

    try {
      dispatch(createPaymentSession({
        requestId: request._id,
        amount,
        clientEmail: userEmail,
      }));
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  const handleStripeRedirect = async () => {
    const stripe = await stripePromise;
    if (sessionId) {
      await stripe.redirectToCheckout({ sessionId });
      dispatch(clearPaymentState()); // Clear payment state after redirection
    }
  };

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
              <th>Service Date</th>
              <th>Additional Notes</th>
              <th>Status</th>
              <th>Payment</th>
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
                <td>
                  {request.serviceDate ? new Date(request.serviceDate).toDateString() : "N/A"}
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


                  {request.status === "complete" && (
                   <>
                   <Form.Control
                     type="number"
                     min="1"
                     placeholder="Enter Amount"
                     value={customAmounts[request._id] || ""}
                     onChange={(e) =>
                       setCustomAmounts({ ...customAmounts, [request._id]: e.target.value })
                     }
                     className="mb-2"
                   />
                   <Button
                     variant="success"
                     size="sm"
                     onClick={() => handlePayment(request)}
                     disabled={paymentLoading || !customAmounts[request._id]}
                   >
                     {paymentLoading ? "Processing..." : "Pay Now"}
                   </Button>
                 </>
                  )}
               
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
