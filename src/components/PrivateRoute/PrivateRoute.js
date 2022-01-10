import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider/AuthProvider";
const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  let location = useLocation();
  if (loading) {
    return <h2>Loading...</h2>;
  }
  if (!currentUser?.email) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
};

export default PrivateRoute;
