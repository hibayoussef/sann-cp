import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { Outlet } from "react-router";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";
import { useLocaliztionStore } from "@/store/useLocaliztionStore";

const LayoutContent: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  const { direction } = useLocaliztionStore();

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
