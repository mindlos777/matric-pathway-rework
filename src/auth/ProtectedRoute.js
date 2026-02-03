import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./auth";

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // Redirect to login if not logged in
    return <Navigate to="/account" replace />;
  }

  return children; // THIS is important — render the child component!
};
