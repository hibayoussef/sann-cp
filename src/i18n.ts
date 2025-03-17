import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import commonEn from "./locales/en/common.json";


import commonAr from "./locales/ar/common.json";


const storedLanguage = localStorage.getItem("language") || "ar";

const resources = {
  en: {
    common: commonEn,
  },
  ar: {
    common: commonAr,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: storedLanguage,
  fallbackLng: storedLanguage,
  ns: ["common"],
  defaultNS: "common",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
