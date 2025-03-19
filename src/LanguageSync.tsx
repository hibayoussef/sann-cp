import { useEffect } from "react";
import i18n from "@/i18n";
import { useLocaliztionStore } from "./store/useLocaliztionStore";

const LanguageSync = () => {
  const { language } = useLocaliztionStore();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return null; // No UI needed
};

export default LanguageSync;
