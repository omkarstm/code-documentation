// src/App.tsx (or your router file)
import { Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import ProtectedRoute from "./ProtectedRoute";
import AuthRoute from "./AuthRoute";
import DashboardIndex from "./components/section/Dashboard";
import NewProject from "./components/section/Dashboard/NewProject";
import AllDoc from "./pages/AllDoc";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      
      {/* Auth routes: Only accessible if NOT logged in */}
      <Route element={<AuthRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>

      {/* Protected routes: Only accessible if logged in */}
      <Route element={<ProtectedRoute />}>
      <Route path="/dashboard" element={<Dashboard />}>
      <Route index element={<DashboardIndex />} />
      <Route path="new" element={<NewProject />} />
      <Route path="all" element={<AllDoc />} />
      </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;
