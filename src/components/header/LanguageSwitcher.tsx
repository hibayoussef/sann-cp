import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaLanguage } from "react-icons/fa";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<"en" | "ar">(
    i18n.language as "en" | "ar"
  );

  const changeLanguage = (lng: "en" | "ar") => {
    i18n.changeLanguage(lng);
    setCurrentLang(lng);
    localStorage.setItem("language", lng);
    document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Language Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
      >
        <FaLanguage className="w-6 h-6 bg-red-600" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100">
          {/* Arabic Option */}
          <button
            onClick={() => changeLanguage("ar")}
            className="w-full px-4 py-3 flex items-center hover:bg-gray-50 transition-colors"
          >
            <img
              src="https://flagcdn.com/ae.svg"
              alt="Arabic"
              className="w-6 h-4 object-cover mr-3"
            />
            <span className="text-gray-700">العربية</span>
          </button>

          {/* English Option */}
          <button
            onClick={() => changeLanguage("en")}
            className="w-full px-4 py-3 flex items-center hover:bg-gray-50 transition-colors border-t border-gray-100"
          >
            <img
              src="https://flagcdn.com/gb.svg"
              alt="English"
              className="w-6 h-4 object-cover mr-3"
            />
            <span className="text-gray-700">English</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
