import { ThemeToggleButton } from "@/components/common/ThemeToggleButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocaliztionStore } from "@/store/useLocaliztionStore";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import NotificationDropdown from "../components/header/NotificationDropdown";
import SettingsDropdown from "../components/header/SettingsDropDown";
import UserDropdown from "../components/header/UserDropdown";
import { useSidebar } from "../context/SidebarContext";

const AppHeader: React.FC = () => {
  const [dir] = useState<"ltr" | "rtl">("ltr");
  const navigate = useNavigate();
  const location = useLocation();

  const isSettingsPage = location.pathname.startsWith("/settings");

  const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);
   

    const { direction, setLanguage } = useLocaliztionStore();

  useEffect(() => {
    document.documentElement.setAttribute("dir", direction);
  }, [direction]);

  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();

  const handleToggle = () => {
    if (window.innerWidth >= 991) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  const toggleApplicationMenu = () => {
    setApplicationMenuOpen(!isApplicationMenuOpen);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
  document.documentElement.setAttribute("dir", dir);
  }, [dir]);

  return (
     <header className={`sticky top-0 flex w-full bg-white border-b  border-gray-200 z-50 dark:border-gray-800 dark:bg-gray-900 lg:border-b h-12 shadow-md ${direction === 'rtl' ? 'text-right' : 'text-left'}`}> {" "}
      <div className="flex flex-col items-center justify-between flex-grow lg:flex-row lg:px-6 ">
        <div className="flex items-center justify-between w-full gap-1  px-3 py-1 border-b border-gray-200 dark:border-gray-800 sm:gap-4 lg:justify-normal lg:border-b-0 lg:px-0 lg:py-4">
          {isSettingsPage && (
            <>
              <Link to="/" className="flex items-center justify-center gap-2">
                <img
                  className="lg:mr-4"
                  src="/images/logo/logo-icon.svg"
                  alt="Logo"
                  width={26}
                  height={26}
                />
                <span
                  className="text-xl font-bold text-[#465FFF] hidden sm:block"
                  style={{ fontFamily: "sans-serif" }}
                >
                  Nexaoma
                </span>
              </Link>
            </>
          )}

          {!isSettingsPage && (
            <>
              <button
                className="w-8 h-8 flex items-center justify-center text-gray-500 rounded-lg hover:bg-gray-100 z-99999"
                onClick={handleToggle}
                aria-label="Toggle Sidebar"
              >
                {isMobileOpen ? "✖" : "☰"}
              </button>
            </>
          )}

          <button
            onClick={toggleApplicationMenu}
            className="flex items-center justify-center w-10 h-10 text-gray-700 rounded-lg z-99999 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 lg:hidden"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.99902 10.4951C6.82745 10.4951 7.49902 11.1667 7.49902 11.9951V12.0051C7.49902 12.8335 6.82745 13.5051 5.99902 13.5051C5.1706 13.5051 4.49902 12.8335 4.49902 12.0051V11.9951C4.49902 11.1667 5.1706 10.4951 5.99902 10.4951ZM17.999 10.4951C18.8275 10.4951 19.499 11.1667 19.499 11.9951V12.0051C19.499 12.8335 18.8275 13.5051 17.999 13.5051C17.1706 13.5051 16.499 12.8335 16.499 12.0051V11.9951C16.499 11.1667 17.1706 10.4951 17.999 10.4951ZM13.499 11.9951C13.499 11.1667 12.8275 10.4951 11.999 10.4951C11.1706 10.4951 10.499 11.1667 10.499 11.9951V12.0051C10.499 12.8335 11.1706 13.5051 11.999 13.5051C12.8275 13.5051 13.499 12.8335 13.499 12.0051V11.9951Z"
                fill="currentColor"
              />
            </svg>
          </button>

          <div className="hidden lg:block">
            <form>
              <div className="relative">
                <span className="absolute -translate-y-1/2 pointer-events-none left-4 top-1/2">
                  <svg
                    className="fill-gray-500 dark:fill-gray-400"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
                      fill=""
                    />
                  </svg>
                </span>
                <div className="relative">
                  <span className="absolute -translate-y-1/2 pointer-events-none left-4 top-1/2">
                    <svg
                      className="fill-gray-500 dark:fill-gray-400"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
                      />
                    </svg>
                  </span>
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search or type command..."
                    className="dark:bg-dark-900 h-9 w-full rounded-sm border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[430px] transition-all duration-300 transform focus:scale-105 focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                {/* <button className="absolute right-2.5 top-1/2 inline-flex -translate-y-1/2 items-center gap-0.5 rounded-lg border border-gray-200 bg-gray-50 px-[7px] py-[4.5px] text-xs -tracking-[0.2px] text-gray-500 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400">
                  <span> ⌘ </span>
                  <span> K </span>
                </button> */}
              </div>
            </form>
          </div>
        </div>
        <div
          className={`${
            isApplicationMenuOpen ? "flex" : "hidden"
          } items-center justify-between w-full gap-4 px-5  lg:flex shadow-theme-md lg:justify-end lg:px-0 lg:shadow-none bg-white dark:bg-gray-900`}
        >
          <DropdownMenu>
            <DropdownMenuTrigger className="text-sm">
              {/* {language} */}
              <button
                className="h-4.5 w-4.5 relative flex items-center justify-center text-gray-500 
   transition-colors dropdown-toggle hover:text-gray-700 dark:text-gray-400   
   dark:hover:text-white"
                style={{ backgroundColor: "transparent" }}
              >
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22M12 2C9.49872 4.73835 8.07725 8.29203 8 12C8.07725 15.708 9.49872 19.2616 12 22M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22M2.50002 9H21.5M2.5 15H21.5"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="dark:bg-gray-800 ">
              <DropdownMenuItem
                onClick={() => setLanguage("en")}
                className="flex items-center gap-2 dark:text-white dark:hover:bg-gray-700 "
              >
                <svg
                  width="20"
                  height="15"
                  viewBox="0 0 20 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0H20V15H0V0Z" fill="#B22234" />
                  <path d="M0 0H20V1.5H0V0Z" fill="white" />
                  <path d="M0 3H20V4.5H0V3Z" fill="white" />
                  <path d="M0 6H20V7.5H0V6Z" fill="white" />
                  <path d="M0 9H20V10.5H0V9Z" fill="white" />
                  <path d="M0 12H20V13.5H0V12Z" fill="white" />
                  <path d="M0 0H8.57143V9H0V0Z" fill="#3C3B6E" />
                  <path d="M1.5 1.5L2 3H1L1.5 1.5Z" fill="white" />
                </svg>
                English
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => setLanguage("ar")}
                className="flex items-center gap-2 dark:text-white dark:hover:bg-gray-700"
              >
                <svg
                  width="20"
                  height="15"
                  viewBox="0 0 20 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="5" height="15" fill="#CE1126" />{" "}
                  <rect x="5" width="15" height="5" fill="#00732F" />{" "}
                  <rect x="5" y="5" width="15" height="5" fill="white" />{" "}
                  <rect x="5" y="10" width="15" height="5" fill="black" />{" "}
                </svg>
                العربية
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="flex items-center gap-1 2xsm:gap-3">
            {/* <!-- Dark Mode Toggler --> */}
            {/* <LanguageSwitcher /> */}
            {/* <ThemeToggleButton /> */}
            {/* <!-- Dark Mode Toggler --> */}
            <NotificationDropdown />
            {/* <!-- Notification Menu Area --> */}
          </div>
          <div className="flex items-center gap-1 2xsm:gap-3">
            {" "}
            <ThemeToggleButton />
          </div>
          <button
            onClick={() => navigate("/settings")}
            className="p-2 text-gray-600 hover:text-gray-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 animate-spin duration-3000 dark:hover:text-gray-200 dark:text-gray-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
          <div className="flex justify-end rigth">
            
            <UserDropdown />
          </div>
          <SettingsDropdown />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
