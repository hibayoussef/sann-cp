import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LocaliztionState {
  language: "ar" | "en";
  direction: "rtl" | "ltr";
  //   toggleLanguage: () => void;
  setLanguage: (lang: "ar" | "en") => void;
  setDirection: (dir: "rtl" | "ltr") => void;
}

export const useLocaliztionStore = create<LocaliztionState>()(
  persist(
    (set) => ({
      language: "en",
      direction: "ltr",

      //   toggleLanguage: () =>
      //     set((state) => {
      //       const newLang = state.language === "en" ? "ar" : "en";
      //       return {
      //         language: newLang,
      //         direction: newLang === "ar" ? "rtl" : "ltr",
      //       };
      //     }),

      setLanguage: (lang) =>
        set(() => ({
          language: lang,
          direction: lang === "ar" ? "rtl" : "ltr",
        })),

      setDirection: (dir) =>
        set(() => ({
          direction: dir, // Allow independent direction change
        })),
    }),
    { name: "language-settings" } // Stores in localStorage
  )
);
