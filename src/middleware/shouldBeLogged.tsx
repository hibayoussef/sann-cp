import { _AuthApi } from "@/services/auth.service";
import { Navigate, Outlet } from "react-router-dom";

const ShouldBeLogged = () => {
  if (!_AuthApi.getToken()) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};

export default ShouldBeLogged;
