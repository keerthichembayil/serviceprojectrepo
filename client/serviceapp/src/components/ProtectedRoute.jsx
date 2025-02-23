import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, requiredRole }) => {
    const { user, token } = useSelector((state) => state.auth);

    // Fallback to localStorage if Redux state is empty
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");

    const currentUser = user || storedUser;
    const currentToken = token || storedToken;

    if (!currentToken || !currentUser) {
        console.log("Not logged in, redirecting...");
        return <Navigate to="/login" />;
    }

    // Role-based access control
    if (requiredRole && currentUser.role !== requiredRole) {
        console.log(`Access denied to ${requiredRole} route, redirecting to home...`);
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;
