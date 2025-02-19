import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (!token || !user) {
      console.log("first enter");
      return <Navigate to="/login" />;
    //   ie checking if loged in 
    }
  
    if (requiredRole && user.role !== requiredRole) {
      console.log("secondenter");
        // logged in but checking role is correct as laready logged in not going to login
      return <Navigate to="/" />;
    }
  
    return children;
  };

  export default ProtectedRoute;