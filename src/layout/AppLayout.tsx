import { useLocaliztionStore } from "@/store/useLocaliztionStore";
import { Outlet, useLocation } from "react-router";
import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";
import Backdrop from "./Backdrop";

const LayoutContent: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const { direction } = useLocaliztionStore();
  const location = useLocation();

  const isSettingsPage = location.pathname === "/settings"; 

  if (isSettingsPage) {
    return (
      <>
        <div
        className={`flex-1 transition-all duration-300 ease-in-out ${ 
          isMobileOpen ? "ml-0" : ""
        }`} 
      >
        <AppHeader />
        <Outlet />
      </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFFFF] xl:flex">
      <div>
        <AppSidebar />
        <Backdrop />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isMobileOpen ? "ml-0" : ""
        } ${
          direction === "ltr"
            ? isExpanded || isHovered
              ? "lg:ml-[210px]"
              : "lg:ml-[90px]"
            : isExpanded || isHovered
            ? "lg:mr-[210px]"
            : "lg:mr-[90px]"
        }`}
      >
        <AppHeader />
        <div className="mx-auto px-4 max-w-screen-2xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const AppLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default AppLayout;
