import { useAuth } from "./AuthProvider";
import { Navigate, Outlet } from "react-router-dom";
function Protected() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
}

export default Protected;
