// src/components/AuthRoute.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "./store/authStore";

const AuthRoute: React.FC = () => {
  const { token, user, loading } = useAuthStore();

  if (loading) {
    return <div>Loading...</div>; // Optional: Show a spinner
  }

  // If logged in, redirect to dashboard/home
  if (token && user) {
    return <Navigate to="/dashboard" replace />;
  }

  // If not logged in, allow access to auth routes
  return <Outlet />;
};

export default AuthRoute;
