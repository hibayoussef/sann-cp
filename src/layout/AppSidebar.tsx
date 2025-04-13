// import { useAuthStore } from "@/store/useAuthStore";
// import { useLocaliztionStore } from "@/store/useLocaliztionStore";
// import {
//   Briefcase,
//   LogOut,
//   MonitorIcon,
//   Plus,
//   ShoppingBag,
//   ShoppingCart,
// } from "lucide-react";
// import { useCallback, useEffect, useRef, useState } from "react";
// import { useTranslation } from "react-i18next";
// import { Link, useLocation, useNavigate } from "react-router";
// import { useSidebar } from "../context/SidebarContext";
// import { ChevronDownIcon } from "../icons";
// import { _AuthApi } from "../services/auth.service";

// type NavItem = {
//   name: string;
//   icon: React.ReactNode;
//   path?: string;
//   permissionKey?: string;
//   subItems?: {
//     name: string;
//     path: string;
//     permissionKey?: string;
//     pro?: boolean;
//     new?: boolean;
//   }[];
// };

// const AppSidebar: React.FC = () => {
//   const { isExpanded, isMobileOpen, isHovered } = useSidebar();

//   const { direction } = useLocaliztionStore();
//   const { t } = useTranslation("items");
//   const { permissions } = useAuthStore();
//   const hasPermission = (key?: any) => !key || permissions?.includes(key);

//   const navItems: NavItem[] = [
//     {
//       icon: <MonitorIcon />,
//       name: "Dashboard",
//       path: "/home",
//     },
//     {
//       name: "Items",
//       icon: <ShoppingBag />,
//       subItems: [
//         { name: "Products", path: "/products", pro: false },
//         { name: "Brands", path: "/brands", permissionKey: "brands.view" },
//         {
//           name: "Categories",
//           path: "/categories",
//           permissionKey: "sub_categories.view",
//         },
//         {
//           name: "Sub Categories",
//           path: "/sub-categories",
//           permissionKey: "sub_categories.view",
//         },

//         { name: "Units", path: "/units", permissionKey: "units.view" },
//         {
//           name: "Sub Units",
//           path: "/sub-units",
//           permissionKey: "sub_units.view",
//         },
//         {
//           name: "Warranties",
//           path: "/warranties",
//           permissionKey: "warranties.view",
//         },

//         { name: "Taxes", path: "/taxes", permissionKey: "taxes.view" },
//       ].filter((item) => hasPermission(item.permissionKey)),
//     },
//     {
//       name: "Sales",
//       icon: <ShoppingCart />,
//       subItems: [
//         {
//           name: "Customers",
//           path: "/customers",
//           permissionKey: "customers.view",
//         },
//       ].filter((item) => hasPermission(item.permissionKey)),
//     },
//     {
//       name: "Purchases",
//       icon: <Briefcase />,
//       subItems: [
//         {
//           name: "Vendors",
//           path: "/vendors",
//           permissionKey: "vendors.view",
//         },
//       ].filter((item) => hasPermission(item.permissionKey)),
//     },
//     {
//       icon: <LogOut />,
//       name: t("logout"),
//     },
//   ].filter(
//     (item: any) => hasPermission(item.permissionKey) || item.subItems?.length
//   );

//   const location = useLocation();
//   const navigate = useNavigate();

//   const [openSubmenu, setOpenSubmenu] = useState<{
//     type: "main" | "others";
//     index: number;
//   } | null>(null);
//   const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
//     {}
//   );
//   const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

//   // const isActive = (path: string) => location.pathname === path;
//   const isActive = useCallback(
//     (path: string) => location.pathname === path,
//     [location.pathname]
//   );

//   useEffect(() => {
//     if (openSubmenu !== null) {
//       const key = `${openSubmenu.type}-${openSubmenu.index}`;
//       if (subMenuRefs.current[key]) {
//         setSubMenuHeight((prevHeights) => ({
//           ...prevHeights,
//           [key]: subMenuRefs.current[key]?.scrollHeight || 0,
//         }));
//       }
//     }
//   }, [openSubmenu]);

//   const filteredNavItems = navItems
//     .map((item) => ({
//       ...item,
//       subItems: item.subItems?.filter((subItem) =>
//         hasPermission(subItem.permissionKey)
//       ),
//     }))
//     .filter(
//       (item) =>
//         hasPermission(item.permissionKey) ||
//         (item.subItems && item.subItems.length > 0)
//     );

//   const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
//     setOpenSubmenu((prevOpenSubmenu) => {
//       if (
//         prevOpenSubmenu &&
//         prevOpenSubmenu.type === menuType &&
//         prevOpenSubmenu.index === index
//       ) {
//         return null;
//       }
//       return { type: menuType, index };
//     });
//   };

//   // items: NavItem[]
//   const renderMenuItems = (_: any, menuType: "main" | "others") => (
//     <ul className="flex flex-col">
//       {filteredNavItems.map((nav, index) => (
//         <li key={nav.name}>
//           {nav.subItems ? (
//             <button
//               onClick={() => handleSubmenuToggle(index, menuType)}
//               className={`flex items-center w-full gap-4 px-4 py-3 transition-colors duration-200  ${
//                 openSubmenu?.type === menuType && openSubmenu?.index === index
//                   ? "menu-item-active"
//                   : "menu-item-inactive"
//               } cursor-pointer ${
//                 !isExpanded && !isHovered
//                   ? "lg:justify-center"
//                   : "lg:justify-start"
//               }`}
//             >
//               <span
//                 className={`menu-item-icon-size flex items-center justify-center ${
//                   openSubmenu?.type === menuType && openSubmenu?.index === index
//                     ? "menu-item-icon-active"
//                     : "menu-item-icon-inactive"
//                 }`}
//               >
//                 {nav.icon}
//               </span>
//               {(isExpanded || isHovered || isMobileOpen) && (
//                 <span className="menu-item-text ">{nav.name}</span>
//               )}

//                 <ChevronDownIcon
// className={`ml-auto w-5 h-5 transition-transform duration-200 ${
//     openSubmenu?.type === menuType &&
//     openSubmenu?.index === index
//         ? "rotate-180 text-brand-500"
//         : ""
// }`}
// />

//             </button>
//           ) : nav.name === "Logout" ? (
//             <button
//               onClick={async () => {
//                 try {
//                   await _AuthApi.logout();
//                   navigate("/signin");
//                 } catch (error) {
//                   console.error("Logout failed:", error);
//                 }
//               }}
//               className={`menu-item group flex items-center w-full gap-4 px-4 py-3 ${
//                   !isExpanded && !isHovered
//                     ? "lg:justify-center"
//                     : "lg:justify-start"
//                 } ${
//                 isActive(nav.path || "")
//                   ? "menu-item-active"
//                   : "menu-item-inactive"
//                 }
//               `}
//             >
//               <span
//                 className={`menu-item-icon-size  ${
//                   isActive(nav.path || "")
//                     ? "menu-item-icon-active"
//                     : "menu-item-icon-inactive"
//                 }`}
//               >
//                 {nav.icon}
//               </span>
//               {(isExpanded || isHovered || isMobileOpen) && (
//                 <span className={`menu-item-text`} >{nav.name}</span>
//                 )}

//             </button>
//           ) : (
//             nav.path &&
//             hasPermission(nav.permissionKey) && (
//               <Link to={nav.path} className={`menu-item group   `} >
//                 <span className="menu-item-icon-size ">{nav.icon}</span>
//                 {(isExpanded || isHovered || isMobileOpen) && (
//                   <span className="menu-item-text">{nav.name}</span>
//                 )}
//               </Link>
//             )
//           )}
//           {nav.subItems &&  (
//             <div
//               ref={(el) => {
//                 subMenuRefs.current[`${menuType}-${index}`] = el;
//               }}
//               className="overflow-hidden transition-all duration-300"
//               style={{
//                 height:
//                   openSubmenu?.type === menuType && openSubmenu?.index === index
//                     ? `${subMenuHeight[`${menuType}-${index}`]}px`
//                     : "0px",
//               }}
//             >
//               <ul className="mt-2 ml-9">
//                 {nav.subItems.map((subItem) => (
//                   <li key={subItem.name} className="relative group">
//                     <Link
//                       to={subItem.path}
//                       className={`menu-dropdown-item ${
//                         isActive(subItem.path)
//                           ? "menu-dropdown-item-active"
//                           : "menu-dropdown-item-inactive"
//                       }`}
//                     >
//                       {subItem.name}
//                       <span className="flex items-center gap-1 ml-auto">
//                         {subItem.new && (
//                           <span
//                             className={`ml-auto ${
//                               isActive(subItem.path)
//                                 ? "menu-dropdown-badge-active"
//                                 : "menu-dropdown-badge-inactive"
//                             } menu-dropdown-badge`}
//                           >
//                             new
//                           </span>
//                         )}
//                         {subItem.pro && (
//                           <span
//                             className={`ml-auto ${
//                               isActive(subItem.path)
//                                 ? "menu-dropdown-badge-active"
//                                 : "menu-dropdown-badge-inactive"
//                             } menu-dropdown-badge`}
//                           >
//                             pro
//                           </span>
//                         )}
//                       </span>
//                     </Link>
//                     <button
//                       onClick={() => navigate(`${subItem.path}/create`)}
//                       className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 z-10"
//                     >
//                       <div className="w-3 h-3 rounded-full bg-brand-500 flex items-center justify-center hover:bg-brand-600">
//                         <Plus className="w-3 h-3 text-white" />
//                       </div>
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </li>
//       ))}
//     </ul>
//   );

//   return (
//    <aside
//       className={`fixed mt-16 flex flex-col lg:mt-0 top-0 left-0 bg-white shadow-md transition-all z-40 border-r h-screen dark:text-gray-400 dark:bg-gray-900
//         ${isExpanded || isMobileOpen ?  "w-[260px]"
//             : "w-[90px]"}
//         ${direction === "rtl" ? "right-0" : "left-0"}`
//       }
//     >
//       <div
//         className={`lg:py-3 px-6 w-full flex ${
//           !isExpanded && !isHovered ? "lg:justify-center" : "justify-center"
//         }`}
//       ><Link to="/" className="flex items-center justify-center gap-2">
//                   <img
//                     className=""
//                     src="/images/logo/logo-icon.svg"
//                     alt="Logo"
//                     width={26}
//                     height={26}
//                   />
//                   {(isExpanded || isHovered || isMobileOpen) && (
//                     <span
//                       className="text-xl font-bold text-[#465FFF] hidden sm:block"
//                       style={{ fontFamily: "sans-serif" }}
//                     >
//                       Nexaoma
//                     </span>
//                   )}
//                 </Link></div>

//       <div className="flex flex-col px-2 overflow-y-auto duration-300 ease-linear no-scrollbar">
//         <nav className="mb-6">
//           <div className="flex flex-col gap-4">
//             <div>
//               <h2
//                 className={`m-4 text-xs uppercase flex leading-[20px] lg:mt-4 text-gray-400 ${
//                   !isExpanded && !isHovered ? "justify-center" : "justify-start"
//                 }`}
//               >
//                 {/* <Link to="/" className="flex items-center gap-2">
//                   <img
//                     className=""
//                     src="/images/logo/logo-icon.svg"
//                     alt="Logo"
//                     width={26}
//                     height={26}
//                   />
//                   {(isExpanded || isHovered || isMobileOpen) && (
//                     <span
//                       className="text-xl font-bold text-[#465FFF] hidden sm:block"
//                       style={{ fontFamily: "sans-serif" }}
//                     >
//                       Nexaoma
//                     </span>
//                   )}
//                 </Link> */}
//               </h2>
//               {renderMenuItems(filteredNavItems, "main")}
//             </div>
//           </div>
//         </nav>
//       </div>
//     </aside>
//   );
// };

// export default AppSidebar;
import { useAuthStore } from "@/store/useAuthStore";
import { useLocaliztionStore } from "@/store/useLocaliztionStore";
import {
  Briefcase,
  LogOut,
  MonitorIcon,
  ShoppingBag,
  ShoppingCart,
  UserRoundCog,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router";
import { useSidebar } from "../context/SidebarContext";
import { ChevronDownIcon } from "../icons";
import { _AuthApi } from "../services/auth.service";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  permissionKey?: string;
  subItems?: {
    name: string;
    path: string;
    permissionKey?: string;
    pro?: boolean;
    new?: boolean;
  }[];
};

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, toggleMobileSidebar } =
    useSidebar();
  const { direction } = useLocaliztionStore();
  const { t } = useTranslation("items");
  const { permissions } = useAuthStore();
  const hasPermission = (key?: any) => !key || permissions?.includes(key);
  const iconSize = 17;
  const navItems: NavItem[] = [
    {
      icon: <MonitorIcon size={iconSize} />,
      name: "Dashboard",
      path: "/home",
    },
    {
      name: "Items",
      icon: <ShoppingBag size={iconSize} />,
      subItems: [
        { name: "Products", path: "/products", pro: false },
        { name: "Brands", path: "/brands", permissionKey: "brands.view" },
        {
          name: "Categories",
          path: "/categories",
          permissionKey: "sub_categories.view",
        },
        {
          name: "Sub Categories",
          path: "/sub-categories",
          permissionKey: "sub_categories.view",
        },
        { name: "Units", path: "/units", permissionKey: "units.view" },
        {
          name: "Sub Units",
          path: "/sub-units",
          permissionKey: "sub_units.view",
        },
        {
          name: "Warranties",
          path: "/warranties",
          permissionKey: "warranties.view",
        },
        { name: "Taxes", path: "/taxes", permissionKey: "taxes.view" },
      ].filter((item) => hasPermission(item.permissionKey)),
    },
    {
      name: "Sales",
      icon: <ShoppingCart size={iconSize} />,
      subItems: [
        {
          name: "Customers",
          path: "/customers",
          permissionKey: "customers.view",
        },
      ].filter((item) => hasPermission(item.permissionKey)),
    },
    {
      name: "Purchases",
      icon: <Briefcase size={iconSize} />,
      subItems: [
        {
          name: "Vendors",
          path: "/vendors",
          permissionKey: "vendors.view",
        },
      ].filter((item) => hasPermission(item.permissionKey)),
    },
    {
      name: "Accountant",
      icon: <UserRoundCog size={iconSize} />,
      subItems: [
        {
          name: "Chart of accounts",
          path: "/accounts",
          permissionKey: "accounts.view",
        },
        {
          name: "Map Settings",
          path: "/map-settings",
          permissionKey: "map_settings.view",
        },
      ].filter((item) => hasPermission(item.permissionKey)),
    },
    {
      icon: <LogOut size={iconSize} />,
      name: t("logout"),
    },
  ].filter(
    (item: any) => hasPermission(item.permissionKey) || item.subItems?.length
  );

  const location = useLocation();
  const navigate = useNavigate();

  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<number, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  useEffect(() => {
    if (openSubmenu !== null) {
      if (subMenuRefs.current[openSubmenu]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [openSubmenu]: subMenuRefs.current[openSubmenu]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const filteredNavItems = navItems
    .map((item) => ({
      ...item,
      subItems: item.subItems?.filter((subItem) =>
        hasPermission(subItem.permissionKey)
      ),
    }))
    .filter(
      (item) =>
        hasPermission(item.permissionKey) ||
        (item.subItems && item.subItems.length > 0)
    );
  const handleLinkClick = (path: string) => {
    if (isMobileOpen) {
      toggleMobileSidebar();
    }
    navigate(path);
  };
  const handleSubmenuToggle = (index: number) => {
    setOpenSubmenu((prevOpenSubmenu) =>
      prevOpenSubmenu === index ? null : index
    );
  };

  return (
    <aside
      className={`fixed mt-12 flex flex-col lg:mt-0 top-0 bg-white shadow-md transition-all border-r h-screen dark:border-r-gray-700 dark:text-gray-400 dark:bg-gray-900 ${
        isExpanded || isMobileOpen ? "w-[184px]" : "w-[80px]"
      } ${direction === "rtl" ? "right-0" : "left-0"} ${
        isMobileOpen
          ? "translate-x-0"
          : direction === "rtl"
          ? "translate-x-full"
          : "-translate-x-full"
      } lg:translate-x-0  `} // إضافة lg:translate-x-0
    >
      {/* ${direction === "rtl" ? "lg:translate-x-0" : "lg:-translate-x-0"} */}

      <div
        className={`lg:py-3 px-6 w-full flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-center"
        }`}
      >
        <Link to="/" className="flex items-center justify-center gap-2">
          <img
            className="lg:mr-4"
            src="/images/logo/logo-icon.svg"
            alt="Logo"
            width={26}
            height={26}
          />
          {(isExpanded || isHovered || isMobileOpen) && (
            <span
              className="text-xl font-bold text-[#465FFF] hidden sm:block"
              style={{ fontFamily: "sans-serif" }}
            >
              Nexaoma
            </span>
          )}
        </Link>
      </div>

      <div className="flex flex-col px-2 overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <nav className="p-1 flex flex-col gap-2 ">
                {filteredNavItems.map((nav, index) => (
                  <div key={nav.name}>
                    {nav.subItems ? (
                      <>
                        <button
                          onClick={() => handleSubmenuToggle(index)}
                          className={`flex items-center gap-2 p-2 hover:bg-gray-400 dark:hover:hover:bg-gray-700 dark:text-gray-100 rounded-md w-full text-[13px] font-medium`}
                        >
                          {nav.icon}
                          {(isExpanded || isMobileOpen) && (
                            <span className="text-[13px] text-gray-700  dark:text-gray-100">
                              {nav.name}
                            </span>
                          )}
                          <ChevronDownIcon
                            className={`ml-auto w-4 h-4 transition-transform ${
                              openSubmenu === index
                                ? "rotate-180 text-gray-500"
                                : ""
                            }`}
                          />
                        </button>
                        <div
                          ref={(el) => {
                            subMenuRefs.current[index] = el;
                          }}
                          className="overflow-hidden transition-all duration-300"
                          style={{
                            height:
                              openSubmenu === index
                                ? `${subMenuHeight[index]}px`
                                : "0px",
                          }}
                        >
                          <ul className="mt-1 ml-4 text-[13px]">
                            {nav.subItems.map((subItem) => (
                              <li
                                key={subItem.name}
                                className="relative group hover:bg-gray-400 dark:hover:hover:bg-gray-700 "
                              >
                                <button
                                  onClick={() => handleLinkClick(subItem.path)} // استخدم handleLinkClick هنا
                                  className={`menu-dropdown-item text-[13px] hover:bg-gray-400 dark:hover:hover:bg-gray-700 ${
                                    isActive(subItem.path)
                                      ? "menu-dropdown-item-active"
                                      : "menu-dropdown-item-inactive"
                                  }`}
                                >
                                  {subItem.name}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    ) : nav.name === "Logout" ? (
                      <button
                        onClick={async () => {
                          try {
                            await _AuthApi.logout();
                            navigate("/signin");
                          } catch (error) {
                            console.error("Logout failed:", error);
                          }
                        }}
                        className={`flex items-center gap-2 p-2 hover:bg-gray-400 dark:hover:hover:bg-gray-700 rounded-lg w-full ${
                          isActive(nav.path || "") ? "bg-gray-200" : ""
                        }`}
                      >
                        {nav.icon}
                        {(isExpanded || isMobileOpen) && (
                          <span className="text-[13px] text-gray-700 dark:text-gray-200">
                            {nav.name}
                          </span>
                        )}
                      </button>
                    ) : (
                      <Link
                        to={nav.path || ""}
                        className={`flex items-center gap-2 p-2 hover:bg-gray-400 dark:hover:hover:bg-gray-700  dark:hover:bg-gray-700 rounded-md text-[13px] ${
                          isActive(nav.path || "")
                            ? "bg-gray-200 dark:bg-gray-800"
                            : ""
                        }`}
                      >
                        {nav.icon}
                        {(isExpanded || isMobileOpen) && (
                          <span className="text-gray-700 dark:text-gray-200">
                            {nav.name}
                          </span>
                        )}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
