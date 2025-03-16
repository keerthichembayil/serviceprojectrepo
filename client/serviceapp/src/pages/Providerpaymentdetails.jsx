import React, { useEffect, useState } from "react";
import axios from "../axios";
import { Table, Container, Spinner, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import "../css/Providerpayment.css"

const ProviderPaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get("/provider/paymentdetprovider", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPayments(response.data.payments);
      } catch (err) {
        setError("Failed to fetch payment details");
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchPayments();
  }, [token]);

  return (
    <div className="providerpayment">
    <Container>
      <h2 className="text-center text-white bg-primary p-3 rounded">
        Provider Payment Details
      </h2>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : payments.length === 0 ? (
        <Alert variant="info">No payment records found.</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th className="bg-dark text-white">#</th>
              <th className="bg-primary text-white">Client Name</th>
              <th className="bg-success text-white">Services Requested</th>
              <th className="bg-warning text-dark">Service Date</th>
              <th className="bg-info text-white">Amount Received</th>
              <th className="bg-danger text-white">Payment Date</th>
              <th className="bg-secondary text-white">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id}>
                <td>{index + 1}</td>
                <td>{payment.clientId?.name || "N/A"}</td>
                <td>
                  {payment.requestId?.services?.length > 0
                    ? payment.requestId.services.join(", ")
                    : "N/A"}
                </td>
                <td>
                  {payment.requestId?.serviceDate
                    ? new Date(payment.requestId.serviceDate).toLocaleDateString()
                    : "N/A"}
                </td>
                <td>${payment.amount?.toFixed(2) || "0.00"}</td>
                <td>{new Date(payment.createdAt).toLocaleDateString()}</td>
                <td>
                  <span
                    className={`badge p-2 ${
                      payment.paymentStatus === "paid"
                        ? "bg-success"
                        : payment.paymentStatus === "pending"
                        ? "bg-warning"
                        : "bg-danger"
                    }`}
                  >
                    {payment.paymentStatus.toUpperCase()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
    </div>
  );
};

export default ProviderPaymentHistory;
