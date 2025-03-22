// src/App.tsx
import { ToastContainer } from "react-toastify";
import { ScrollToTop } from "./components/common/ScrollToTop";
import RoutesComponent from "./routes/Routes";
import { useLocaliztionStore } from "./store/useLocaliztionStore";
import { DirectionProvider } from "@radix-ui/react-direction";
import LanguageSync from "./LanguageSync";
import { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";

export default function App() {
  const { direction } = useLocaliztionStore();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  // useEffect(() => {
  //   if (isAuthenticated && location.pathname === "/signin") {
  //     navigate("/home", { replace: true });
  //   }
  // }, [isAuthenticated, location.pathname, navigate]);
  
  return (
    <div dir={direction}>
      <DirectionProvider dir={direction}>
        <LanguageSync />
        <ScrollToTop />
        <RoutesComponent />
        <ToastContainer />
      </DirectionProvider>
    </div>
  );
}
