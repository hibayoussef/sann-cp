import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

const ToggleSwitcher = ({
  enabled,
  onClick,
}: {
  enabled: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? "bg-blue-500" : "bg-gray-300"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
};

const SettingsSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-600 hover:text-gray-900"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 animate-spin duration-3000"
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

      <div
        className={`fixed right-0 top-0 h-full w-60 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-3 border-b dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900">
          <h2 className="text-lg font-bold"></h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <div className="p-4 flex flex-col space-y-2">
          <button
            className="w-full py-1 text-[14px] text-white rounded-md"
            style={{ backgroundColor: "rgb(78, 98, 177)" }}
          >
            View Demo
          </button>
          <button
            className="w-full py-1 text-[14px] text-white rounded-md"
            style={{ backgroundColor: "rgb(187, 186, 66)" }}
          >
            Our Portfolio
          </button>
          <button
            className="w-full py-1 text-[14px] text-white rounded-md"
            style={{ backgroundColor: "#43ce85" }}
          >
            Licenses
          </button>
        </div>
        <div>
          <div>
            <h3 className="font-semibold mb-2 p-2  text-xs text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700">
              LTR AND RTL VERSIONS
            </h3>
            <div className="space-y-2 p-4 ">
              <div className="flex items-center gap-2">
                <span className="text-gray-500 text-[13px] dark:text-gray-300">
                  LTR
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500 text-[13px] dark:text-gray-300">
                  RTL
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2 p-2 text-xs text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700">
              NOMRATION STYLE
            </h3>
            <div className="space-y-2  p-4">
              {[
                "Vertical Menu",
                "Horizontal Click Menu",
                "Horizontal Hover Menu",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="text-gray-500 text-[13px] dark:text-gray-300">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2 p-2  text-xs text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700">
              THEME STYLE
            </h3>
            <div className="space-y-2 p-4">
              {[
                { label: "Light Theme", value: "light" },
                { label: "Dark Theme", value: "dark" },
              ].map((themeOption) => (
                <div
                  key={themeOption.value}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500  text-[13px] dark:text-gray-300">
                      {themeOption.label}
                    </span>
                  </div>
                  <ToggleSwitcher
                    enabled={theme === themeOption.value}
                    onClick={toggleTheme}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsSidebar;
