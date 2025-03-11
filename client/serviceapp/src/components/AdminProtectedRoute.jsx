import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminProtectedRoute = ({ children,requiredRole }) => {
    const { admin, admintoken } = useSelector((state) => state.adminAuth);

    // Fallback to localStorage if Redux state is empty
    const storedAdmin = JSON.parse(localStorage.getItem("admin"));
    const storedToken = localStorage.getItem("admintoken");

    const currentAdmin = admin || storedAdmin;
    const currentToken = admintoken || storedToken;

    if (!currentToken || !currentAdmin) {
        console.log("Admin not logged in, redirecting...");
        return <Navigate to="/adminlogin" />;
    }
    
    // Role-based access control
    if (requiredRole && currentAdmin.role !== requiredRole) {
        console.log(`Access denied to ${requiredRole} route, redirecting to home...`);
        return <Navigate to="/" />;
    }
   

    return children;
};

export default AdminProtectedRoute;
