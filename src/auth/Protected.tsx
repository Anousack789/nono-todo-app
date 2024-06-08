import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
function Protected() {
  const auth = useContext(AuthContext);

  if (!auth || !auth?.user) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
}

export default Protected;
