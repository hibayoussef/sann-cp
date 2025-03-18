// src/App.tsx
import { ToastContainer } from "react-toastify";
import { ScrollToTop } from "./components/common/ScrollToTop";
import RoutesComponent from "./routes/Routes";
import { useLocaliztionStore } from "./store/useLocaliztionStore";
import { DirectionProvider } from "@radix-ui/react-direction";
import LanguageSync from "./LanguageSync";

export default function App() {
  const { direction } = useLocaliztionStore();
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
