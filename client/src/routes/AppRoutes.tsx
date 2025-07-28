import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import SpotifySearchPage from "../pages/SpotifySearchPage";
import PlaylistDetailPage from "../pages/PlaylistDetailPage";
import { useAuth } from "../context/AuthContext"; // ✅

const AppRoutes = () => {
  const { isAuthenticated } = useAuth(); // ✅

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/"
        element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/search"
        element={isAuthenticated ? <SpotifySearchPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/playlist/:id"
        element={isAuthenticated ? <PlaylistDetailPage /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};

export default AppRoutes;
