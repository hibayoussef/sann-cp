import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";

export const createEmotionCache = (isRTL: boolean) =>
  createCache({
    key: isRTL ? "mui-rtl" : "mui",
    stylisPlugins: isRTL ? [rtlPlugin] : [],
  });
