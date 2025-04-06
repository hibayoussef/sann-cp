// import { useLocaliztionStore } from "@/store/useLocaliztionStore";
// import { Outlet, useLocation } from "react-router";
// import { SidebarProvider, useSidebar } from "../context/SidebarContext";
// import AppHeader from "./AppHeader";
// import AppSidebar from "./AppSidebar";

// const LayoutContent: React.FC = () => {
//   const { isExpanded, isHovered,isMobileOpen } = useSidebar();
//   const { direction } = useLocaliztionStore();
//   const location = useLocation();

//   const isSettingsPage = location.pathname.startsWith("/settings");

//   return (
//     <div className="min-h-screen flex flex-col bg-[#FFFFFF] dark:bg-gray-900">
//       <div className="fixed top-0 left-0 w-full z-50 bg-white shadow  ">
//         <AppHeader />
//       </div>

//       <div className="flex flex-1 pt-[49px]">
//         {!isSettingsPage && (
//           <div
//             className={`fixed h-screen transition-all duration-300 z-40
//               ${isExpanded || isHovered ? "w-[184px]" : "w-[90px]"}
//               ${direction === "rtl" ? "right-0" : "left-0"}`}
//           >
//           <AppSidebar />
//           </div>
//         )}

//          <div
//         className={`flex-1 transition-all duration-300 ease-in-out ${
//           isExpanded || isHovered ? "lg:ml-[260px]" : "lg:ml-[90px]"
//         } ${isMobileOpen ? "ml-0" : ""}`}
//       >
//         <AppHeader />
//         <div className="p-2 mx-auto max-w-screen-2xl md:p-2">
//           <Outlet />
//         </div>
//       </div> 
//       </div>
//     </div>
//   );
// };

// const AppLayout: React.FC = () => {
//   return (
//     <SidebarProvider>
//       <LayoutContent />
//     </SidebarProvider>
//   );
// };

// export default AppLayout;

import { useLocaliztionStore } from "@/store/useLocaliztionStore";
import { Outlet, useLocation } from "react-router";
import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";
import Backdrop from "./Backdrop";

const LayoutContent: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const location = useLocation();

  const isSettingsPage = location.pathname.startsWith("/settings");

  return (
    <div className="min-h-screen xl:flex ">
      {!isSettingsPage && (
        <div>
          <AppSidebar />
          <Backdrop />
        </div>
      )}

      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          !isSettingsPage
            ? isExpanded || isHovered
              ? "lg:ml-[184px]"
              : "lg:ml-[80px]"
            : "ml-0" 
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <AppHeader />
        <div className="p-2 mx-auto max-w-screen-2xl md:p-2">
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