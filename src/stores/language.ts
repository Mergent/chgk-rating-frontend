import create from "zustand";
import { LOCALE } from "../utils/const";

interface LanguageState {
  language: string
  changeLanguage: (language: string) => void
}

const useLanguageStore = create<LanguageState>((set) => ({
  language: localStorage.getItem(LOCALE) || (navigator.language?.slice(0, 2) === 'de' ? 'de' : 'en'),
  changeLanguage: (language) => {
    set((state) => ({
      language
    }))
  }
}));

export default useLanguageStore
