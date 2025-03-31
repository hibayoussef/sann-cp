import { useLocaliztionStore } from "@/store/useLocaliztionStore";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import Label from "../form/Label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

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

  const { direction, setDirection } = useLocaliztionStore();

  return (
    <div className="relative ">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-600  hover:text-gray-900 "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 "
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <circle cx="5" cy="5" r="1.5" fill="currentColor" />
          <circle cx="12" cy="5" r="1.5" fill="currentColor" />
          <circle cx="19" cy="5" r="1.5" fill="currentColor" />
          <circle cx="5" cy="12" r="1.5" fill="currentColor" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
          <circle cx="19" cy="12" r="1.5" fill="currentColor" />
          <circle cx="5" cy="19" r="1.5" fill="currentColor" />
          <circle cx="12" cy="19" r="1.5" fill="currentColor" />
          <circle cx="19" cy="19" r="1.5" fill="currentColor" />
        </svg>
      </button>

      <div
        className={`fixed  top-0 h-full w-60 bg-white  dark:bg-gray-800 shadow-xl transform transition-transform duration-300 z-50 ${
          direction === "ltr"
            ? isOpen
              ? "translate-x-0"
              : "translate-x-full"
            : isOpen
            ? "translate-x-0"
            : "-translate-x-full"
        } ${direction === "rtl" ? "left-0" : "right-0"}`}
      >
        <div className="p-3 border-b  dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900">
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
            <div className="space-y-2 p-4 " dir="ltr">
              <RadioGroup value={direction} onValueChange={setDirection}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ltr" id="ltr" />
                  <Label htmlFor="ltr">LTR</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="rtl" id="rtl" />
                  <Label htmlFor="rtl">RTL</Label>
                </div>
              </RadioGroup>
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
