import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { LOCALE } from "../utils/const";

import translationEN from './en.json';
import translationRU from './ru.json';

const resources = {
  en: {
    translation: translationEN
  },
  ru: {
    translation: translationRU
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem(LOCALE) ?? 'ru',

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;