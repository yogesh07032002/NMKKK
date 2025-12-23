import { Navigate, useLocation } from "react-router-dom";

export default function UserPrivateRoute({ children }) {
  const token = localStorage.getItem("nmk_user_token");
  const location = useLocation();

  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return children;
}
