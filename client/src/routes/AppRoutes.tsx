import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";

const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/" element={isAuthenticated() ? <DashboardPage /> : <Navigate to="/login" />} />
  </Routes>
);

export default AppRoutes;
