import { useLocaliztionStore } from "@/store/useLocaliztionStore";
import { Outlet } from "react-router";
import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";

const LayoutContent: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const { direction } = useLocaliztionStore();

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF]">
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow">
        <AppHeader />
      </div>

      <div className="flex flex-1 pt-[49px]">
        <div 
          className={`fixed h-screen transition-all duration-300 z-40
            ${isExpanded || isHovered ? "w-[184px]" : "w-[90px]"} 
            ${direction === "rtl" ? "right-0" : "left-0"}`}
        >
          <AppSidebar />
        </div>
        
        <div 
          className={`flex-1 transition-all duration-300 ease-in-out px-4
            ${
              isExpanded || isHovered 
                ? direction === "ltr" 
                  ? "ml-[184px]" 
                  : "mr-[210px]"
                : direction === "ltr" 
                  ? "ml-[90px]" 
                  : "mr-[90px]"
            }`}
        >
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