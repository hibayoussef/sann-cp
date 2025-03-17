import { Route } from "react-router";
import SignIn from "../pages/AuthPages/SignIn";
import SignUp from "../pages/AuthPages/SignUp";
import ForgotPassword from "../pages/AuthPages/ForgotPassword";

const AuthRoutes = () => {
  return (
    <>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </>
  );
};

export default AuthRoutes;
