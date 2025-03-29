import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useSidebar } from "../context/SidebarContext";
import { ChevronDownIcon, GridIcon, HorizontaLDots, TableIcon } from "../icons";
import { _AuthApi } from "../services/auth.service";
import { useLocaliztionStore } from "@/store/useLocaliztionStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useTranslation } from "react-i18next";
import {
  Box,
  LogOut,
  MonitorIcon,
  Plus,
  ShoppingBag,
  ShoppingCart,
} from "lucide-react";

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
  const { isExpanded, isMobileOpen, isHovered } = useSidebar();

  const { direction } = useLocaliztionStore();
  const { t } = useTranslation("items");
  const { permissions } = useAuthStore();
  const hasPermission = (key?: any) => !key || permissions?.includes(key);
  
  const navItems: NavItem[] = [
    {
      icon: <MonitorIcon />,
      name: "Dashboard",
      path: "/home",
    },
    {
      name: "Items",
      icon: <ShoppingBag />,
      subItems: [
        { name: "Products", path: "/products", pro: false },
        { name: "Brands", path: "/brands", permissionKey: "brands.view" },
        {
          name: "Categories",
          path: "/categories",
          permissionKey: "categories.view",
        },
        { name: "Units", path: "/units", permissionKey: "units.view" },
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
      icon: <ShoppingCart />,
      subItems: [
        {
          name: "Customers",
          path: "/customers",
          permissionKey: "customers.view",
        },
      ].filter((item) => hasPermission(item.permissionKey)),
    },
    {
      icon: <LogOut />,
      name: t("logout"),
    },
  ].filter(
    (item: any) => hasPermission(item.permissionKey) || item.subItems?.length
  );

  const location = useLocation();
  const navigate = useNavigate();

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // const isActive = (path: string) => location.pathname === path;
  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
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

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  const renderMenuItems = (items: NavItem[], menuType: "main" | "others") => (
    <ul className="flex flex-col">
      {filteredNavItems.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
            >
              <span
                className={`menu-item-icon-size  ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text">{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "rotate-180 text-brand-500"
                      : ""
                  }`}
                />
              )}
            </button>
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
              className={`menu-item group ${
                isActive(nav.path || "")
                  ? "menu-item-active"
                  : "menu-item-inactive"
              }`}
            >
              <span
                className={`menu-item-icon-size ${
                  isActive(nav.path || "")
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text">{nav.name}</span>
              )}
            </button>
          ) : (
            nav.path &&
            hasPermission(nav.permissionKey) && (
              <Link to={nav.path} className="menu-item group">
                <span className="menu-item-icon-size">{nav.icon}</span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name} className="relative group">
                    <Link
                      to={subItem.path}
                      className={`menu-dropdown-item ${
                        isActive(subItem.path)
                          ? "menu-dropdown-item-active"
                          : "menu-dropdown-item-inactive"
                      }`}
                    >
                      {subItem.name}
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge`}
                          >
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge`}
                          >
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                    <button
                      onClick={() => navigate("/categories/create")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 z-10"
                    >
                      <div className="w-4 h-4 rounded-full bg-brand-500 flex items-center justify-center hover:bg-brand-600">
                        <Plus className="w-3 h-3 text-white" />
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`absolute top-0 bg-white shadow-md transition-all z-40 border-r h-screen
      ${isExpanded || isMobileOpen ? "w-[184px]" : "w-[80px]"}
      ${direction === "rtl" ? "right-0" : "left-0"}`}
    >
      <div
        className={`py-0 w-full flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-center"
        }`}
      ></div>

      <div className="flex flex-col px-2  overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              ></h2>
              {renderMenuItems(filteredNavItems, "main")}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
