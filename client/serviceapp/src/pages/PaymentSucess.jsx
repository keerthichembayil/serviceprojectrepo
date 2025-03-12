import { useEffect, useState } from "react";
import { useSearchParams,useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "../axios"; // Ensure correct import

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const token = useSelector((state) => state.auth.token); // Get token from Redux state
  const navigate = useNavigate();
  const [message, setMessage] = useState("Processing payment...");
  const [loading, setLoading] = useState(true);
  const [requestId, setRequestId] = useState(null); // Store requestId in state

  useEffect(() => {
    const storedRequestId = sessionStorage.getItem("paidRequestId"); // Retrieve stored request ID
    setRequestId(storedRequestId);
  }, []);
console.log("requsetid insidepromise",requestId);
  

  useEffect(() => {


    if (!sessionId || !token|| !requestId) {
      setMessage("Invalid request. Missing payment session.");
      setLoading(false);
      return;
    }

  console.log("session id got",sessionId);

    if (sessionId && token) {
      axios
        .post("client/verify-payment", { sessionId ,requestId},{headers:{Authorization:`Bearer ${token}`,}}) // Verify session with backend
        .then(async(response) => {
          setMessage("Payment successful thank you...!");
          try {
            await axios.put("/payment/update-payment-status", { requestId }); // Update status
            console.log("Payment status updated in database.");
          } catch (error) {
            console.error("Error updating payment status:", error);
          }
  
          sessionStorage.removeItem("paidRequestId"); // Clear requestId after update
          setTimeout(() => {
            navigate("/viewclientreqdet");
          }, 3000);
        })
        .catch((error) => {
          setMessage("Payment verification failed. Please contact support.");
        });
    }
  }, [sessionId,token,requestId]);

  return (
    <div>
      <h2>{message}</h2>
    </div>
  );
};

export default PaymentSuccess;
