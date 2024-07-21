import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import Cache from "i18next-localstorage-cache";
import translationsFr from "./fr";
import translationsEn from "./en";

i18n
  .use(Cache)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: translationsFr },
      en: { translation: translationsEn },
    },
    fallbackLng: "fr",
    debug: false,
    detection: {
      order: ["localStorage", "navigator"],
      cache: ["localStorage"],
    },
    supportedLngs: ["fr", "en"],
    interpolation: {
      escapeValue: false,
    },
    initImmediate: false,
  });

export default i18n;
