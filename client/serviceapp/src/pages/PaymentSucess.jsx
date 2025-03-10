import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "../axios"; // Ensure correct import

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [message, setMessage] = useState("Processing payment...");

  useEffect(() => {

    const token = useSelector((state) => state.auth.token); // Get token from Redux state

    if (sessionId && token) {
      axios
        .post("/verify-payment", { sessionId },{headers:{Authorization:`Bearer ${token}`,}}) // Verify session with backend
        .then((response) => {
          setMessage("Payment successful! Your service request is confirmed.");
        })
        .catch((error) => {
          setMessage("Payment verification failed. Please contact support.");
        });
    }
  }, [sessionId,token]);

  return (
    <div>
      <h2>{message}</h2>
    </div>
  );
};

export default PaymentSuccess;
