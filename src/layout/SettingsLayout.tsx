import { useLocaliztionStore } from "@/store/useLocaliztionStore";
import { Outlet, useLocation } from "react-router";
import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import AppHeader from "./AppHeader";
import SettingsSidebar from "./SettingsSidebar";

const LayoutContent: React.FC = () => {
  const { isExpanded, isHovered } = useSidebar();
  const { direction } = useLocaliztionStore();
  const location = useLocation();

  const isSettingsPage = location.pathname.startsWith("/settings");

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF] dark:bg-gray-900">
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow">
        <AppHeader />
      </div>

      <div className="flex flex-1 pt-[49px]">
          <div
            className={`fixed h-screen transition-all duration-300 z-40
              ${isExpanded || isHovered ? "w-[184px]" : "w-[90px]"} 
              ${direction === "rtl" ? "right-0" : "left-0"}`}
          >
            <SettingsSidebar />
          </div>

        <div
          className={`flex-1 transition-all duration-300 ease-in-out px-4
            ${
              isSettingsPage
                ? isExpanded || isHovered
                  ? direction === "ltr"
                    ? "ml-[184px]"
                    : "mr-[184px]"
                  : direction === "ltr"
                  ? "ml-[90px]"
                  : "mr-[90px]"
                : "ml-0"
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
