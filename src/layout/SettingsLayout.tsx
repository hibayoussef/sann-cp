import { useLocaliztionStore } from "@/store/useLocaliztionStore";
import { Outlet } from "react-router";
import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import SettingsSidebar from "./SettingsSidebar";

const SettingsLayoutContent: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const { direction } = useLocaliztionStore();

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex">
      <SettingsSidebar />
      <Backdrop />

      <div
        className={`flex flex-col transition-all duration-300 ease-in-out w-full ${
          isMobileOpen ? "ml-0" : ""
        } `}
      >
        <div className="fixed top-0 left-0 w-full z-50 bg-white shadow">
          <AppHeader />
        </div>

        <div className="pt-[64px] px-6 sm:px-8 md:px-12 lg:px-16 w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const SettingsLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <SettingsLayoutContent />
    </SidebarProvider>
  );
};

export default SettingsLayout;
