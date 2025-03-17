// src/App.tsx
import { ToastContainer } from "react-toastify";
import { ScrollToTop } from "./components/common/ScrollToTop";
import RoutesComponent from "./routes/Routes";

export default function App() {
  return (
    <>
      {/* <CacheProvider value={emotionCache}> */}
        <ScrollToTop />
        <RoutesComponent />
        <ToastContainer />
      {/* </CacheProvider> */}
    </>
  );
}
