import { _AuthApi } from "@/services/auth.service";
import { Navigate, Outlet } from "react-router-dom";

const ShouldNotBeLogged = () => {
  if (_AuthApi.getToken()) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

export default ShouldNotBeLogged;
