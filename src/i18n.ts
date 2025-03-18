import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import commonEn from "./locales/en/common.json";
import commonAr from "./locales/ar/common.json";
import itemsEn from "./locales/en/items.json";
import itemsAr from "./locales/ar/items.json";
import { useLocaliztionStore } from "./store/useLocaliztionStore";

// Get the initial language from Zustand
const { language } = useLocaliztionStore.getState();

const resources = {
  en: { common: commonEn, items: itemsEn },
  ar: { common: commonAr, items: itemsAr },
};

i18n.use(initReactI18next).init({
  resources,
  lng: language, // Use Zustand language
  fallbackLng: "en",
  ns: ["common", "items"],
  defaultNS: "common",
  interpolation: { escapeValue: false },
});

export default i18n;
