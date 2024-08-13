import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// Higher-order component to protect routes
const ProtectedRoute = ({ element, ...rest }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  // If no token, redirect to login page and preserve the location the user wanted to go
  return token ? element : <Navigate to="/login" state={{ from: location }} />;
};

export default ProtectedRoute;
