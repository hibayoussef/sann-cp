import { useLocaliztionStore } from "@/store/useLocaliztionStore";
import {
    Building,
    LogOut,
    MonitorIcon,
    Package,
    SettingsIcon,
    ShoppingCart,
    Users
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
  subItems?: { name: string; path: string }[];
};

const SettingsSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered } = useSidebar();
  const { direction } = useLocaliztionStore();
  const { t } = useTranslation("items");
  const navigate = useNavigate();
  const location = useLocation();

  const navItems: NavItem[] = [
    {
      icon: <MonitorIcon className="w-5 h-5 text-gray-500" />,
      name: "Dashboard",
      path: "/home",
    },
    {
      name: "Organization",
      icon: <Building className="w-5 h-5 text-gray-600" />,
      subItems: [
        { name: "Profile", path: "/organization/profile" },
        { name: "Branding", path: "" },
        { name: "Custom Domain", path: "" },
        { name: "Branches", path: "/settings/branches" },
        { name: "Currencies", path: "" },
        { name: "Approvals", path: "" },
      ],
    },
    {
      name: "Users & Roles",
      icon: <Users className="w-5 h-5 text-gray-600" />,
      subItems: [
        { name: "User Management", path: "/users/manage" },
        { name: "Role Permissions", path: "/users/permissions" },
      ],
    },
    {
      name: "Preferences",
      icon: <SettingsIcon className="w-5 h-5 text-gray-600" />,
      subItems: [
        { name: "General", path: "/preferences/general" },
        { name: "Notifications", path: "/preferences/notifications" },
      ],
    },
    {
      name: "Sales",
      icon: <ShoppingCart className="w-5 h-5 text-gray-600" />,
      subItems: [
        { name: "Orders", path: "/sales/orders" },
        { name: "Invoices", path: "/sales/invoices" },
      ],
    },
    {
      name: "Purchases",
      icon: <Package className="w-5 h-5 text-gray-600" />,
      subItems: [
        { name: "Suppliers", path: "/purchases/suppliers" },
        { name: "Bills", path: "/purchases/bills" },
      ],
    },
    {
      icon: <LogOut className="w-5 h-5 text-gray-500" />,
      name: t("logout"),
      path: "/logout",
    },
  ];

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
      const key = openSubmenu;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prev) => ({
          ...prev,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number) => {
    setOpenSubmenu((prev) => (prev === index ? null : index));
  };

  return (
    <aside
      className={`absolute top-0 bg-gray-100 shadow-sm transition-all z-40 border-r h-screen
      ${isExpanded || isMobileOpen ? "w-[184px]" : "w-[80px]"}
      ${direction === "rtl" ? "right-0" : "left-0"}
      hover:bg-gray-200`}
    >
      <div
        className={`py-1 w-full flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-center"
        }`}
      ></div>
      <nav className="p-1 flex flex-col gap-2">
        {navItems.map((nav, index) => (
          <div key={nav.name}>
            {nav.subItems ? (
              <>
                <button
                  onClick={() => handleSubmenuToggle(index)}
                  className="flex items-center gap-2 p-2 hover:bg-gray-300 rounded-md w-full text-sm font-medium"
                >
                  {nav.icon}
                  {(isExpanded || isMobileOpen) && (
                    <span className="text-gray-700">{nav.name}</span>
                  )}
                  <ChevronDownIcon
                    className={`ml-auto w-4 h-4 transition-transform ${
                      openSubmenu === index ? "rotate-180 text-gray-500" : ""
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
                  <ul className="mt-1 ml-4 text-sm">
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
                        </Link>
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
                className={`flex items-center gap-2 p-2 hover:bg-gray-400 rounded-lg w-full ${
                  isActive(nav.path || "") ? "bg-gray-200" : ""
                }`}
              >
                {nav.icon}
                {(isExpanded || isMobileOpen) && (
                  <span className="text-gray-700">{nav.name}</span>
                )}
              </button>
            ) : (
              <Link
                to={nav.path || ""}
                className={`flex items-center gap-2 p-2 hover:bg-gray-300 rounded-md text-sm ${
                  isActive(nav.path || "") ? "bg-gray-200" : ""
                }`}
              >
                {nav.icon}
                {(isExpanded || isMobileOpen) && (
                  <span className="text-gray-700">{nav.name}</span>
                )}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default SettingsSidebar;
