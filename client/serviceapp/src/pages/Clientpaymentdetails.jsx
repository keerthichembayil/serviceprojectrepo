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
    <div className="clientpaymentdesign pt-3">
    <Container>
      <Card className="shadow-lg p-4 border-0 rounded-lg bg-secondary">
        <Card.Body>
          <h2 className="text-center text-white bg-primary py-2 rounded mb-4">Payment History</h2>

          {loading ? (
            <div className="text-center py-4">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : error ? (
            <Alert variant="danger" className="text-center">{error}</Alert>
          ) : payments.length === 0 ? (
            <Alert variant="info" className="text-center">No payment history found.</Alert>
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
                  <th className="bg-dark text-white">Additional Notes</th>
                  <th className="bg-dark text-white">Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, index) => (
                  <tr key={payment._id} className="align-middle">
                    <td className="stylcol">{index + 1}</td>
                    <td className="stylcol">{payment.providerId?.name || "N/A"}</td>
                    <td className="stylcol">
  {payment.requestId?.services?.length > 0
    ? payment.requestId.services.join(", ")
    : "N/A"}
</td>
                    <td className="stylcol">
                      {payment.requestId?.serviceDate
                        ? new Date(payment.requestId.serviceDate).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="stylcol">
                      <span className="fw-bold text-success">
                      ${payment.amount?.toFixed(2) || "0.00"}
                      </span>
                      
                      </td>
                    <td className="stylcol">{new Date(payment.createdAt).toLocaleDateString()}</td>
                    <td className="stylcol">{payment.requestId?.additionalNotes}</td>
                    <td className="stylcol">
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
