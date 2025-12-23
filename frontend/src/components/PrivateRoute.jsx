// src/components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const adminToken = localStorage.getItem("nmk_admin_token");

  if (!adminToken) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

