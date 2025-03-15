import React, { useEffect, useState } from "react";
import axios from "../axios";
import { Table, Container, Spinner, Alert, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import '../css/clientpayment.css'
const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get("client/paymentdetails", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPayments(response.data.payments);
      } catch (err) {
        setError("Failed to fetch payment history");
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchPayments();
  }, [token]);

  return (
    <div className="clientpaymentdesign">
    <Container>
      <Card className="shadow-lg p-3">
        <Card.Body>
          <h2 className="text-center text-white bg-primary mb-4">Payment History</h2>

          {loading ? (
            <div className="text-center">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : payments.length === 0 ? (
            <Alert variant="info">No payment history found.</Alert>
          ) : (
            <Table striped bordered hover responsive className="text-center">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="bg-dark text-white">#</th>
                  <th className="bg-dark text-white">Provider Name</th>
                  <th className="bg-dark text-white">Service Requested</th>
                  <th className="bg-dark text-white">Service Date</th>
                  <th className="bg-dark text-white">Amount Paid</th>
                  <th className="bg-dark text-white">Payment Date</th>
                  <th className="bg-dark text-white">Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, index) => (
                  <tr key={payment._id}>
                    <td>{index + 1}</td>
                    <td>{payment.providerId?.name || "N/A"}</td>
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
        </Card.Body>
      </Card>
    </Container>
    </div>
  );
};

export default PaymentHistory;
