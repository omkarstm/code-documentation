// src/components/ProtectedRoute.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "./store/authStore";
import Header from "./components/section/Header";

const ProtectedRoute: React.FC = () => {
    const { token, user, loading } = useAuthStore();

    if (loading) {
        // Optionally, show a loading spinner while checking auth
        return <div>Loading...</div>;
    }

    // You can check either token or user, depending on your logic
    if (!token || !user) {
        return <Navigate to="/login" replace />;
    }

    return <>
        <Outlet />
    </>
};

export default ProtectedRoute;
