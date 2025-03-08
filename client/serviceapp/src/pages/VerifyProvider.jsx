import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyProvider } from "../redux/slices/verifyproviderSlice";
import { Spinner, Alert, Container } from "react-bootstrap";

const VerifyProvider = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { status, loading } = useSelector((state) => state.providerverify);

    useEffect(() => {
        if (token) {
            dispatch(verifyProvider(token));
        }
    }, [token, dispatch]);

    useEffect(() => {
        if (!loading && !status.includes("Failed")) {
            setTimeout(() => navigate("/providerdashboard"), 3000); // Redirect after success
        }
    }, [loading, status, navigate]);

    return (
        <Container className="mt-5 text-center">
            <h2>Provider Verification</h2>
            <Alert variant={status.includes("Failed") ? "danger" : "success"}>
                {status}
            </Alert>
            {loading && <Spinner animation="border" className="mt-3" />}
        </Container>
    );
};

export default VerifyProvider;
