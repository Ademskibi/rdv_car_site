// src/components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, allowedRoles }) => {
  // Get user data from localStorage
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  // If no user is logged in → redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check role authorization
  if (!allowedRoles.includes(user.role)) {
    console.log(`User role (${user.role}) not in allowed roles:`, allowedRoles);
    return <Navigate to="/not-allowed" replace />;
  }

  // If all checks pass → render protected component
  return children;
};

export default PrivateRoute;
