import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Components/home";
import Login from "./Components/Login";
import AdminDashboard from "./Components/AdminDashboard";
import MemberDashboard from "./Components/MemberDashboard";
import ProtectedRoute from "./Components/ProtectedRoute";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/admin-dashboard" 
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/member-dashboard" 
          element={
            <ProtectedRoute>
              <MemberDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}
