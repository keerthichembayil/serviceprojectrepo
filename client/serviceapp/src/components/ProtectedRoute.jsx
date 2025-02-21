import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (!token || !user) {
        console.log("Not logged in, redirecting...");

        // Redirect admins to the admin login page, users to the regular login page
        return requiredRole === "admin" ? <Navigate to="/adminlogin" /> : <Navigate to="/login" />;
    }

    if (requiredRole) {
        if (requiredRole === "admin" && user.role !== "admin") {
            console.log("Access denied to admin route, redirecting to home...");
            return <Navigate to="/" />;
        }
        if (requiredRole === "user" && user.role !== "user") {
            console.log("Access denied to user route, redirecting to admin login...");
            return <Navigate to="/adminlogin" />;
        }
    }

    return children;
};

export default ProtectedRoute;
