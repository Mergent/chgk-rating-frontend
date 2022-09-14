import { Select } from "antd";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import useLanguageStore from "../stores/language";
import { LOCALE } from "../utils/const";

const LanguageDropdown = () => {
  const [t] = useTranslation();
  const state = useLanguageStore()

  const changeLanguage = (option: string) => {
    i18n.changeLanguage(option);
    localStorage.setItem(LOCALE, option);
    state.changeLanguage(option)
  }

  return (
    <Select
      defaultValue={localStorage.getItem(LOCALE) ?? 'ru'}
      style={{
        width: 120,
      }}
      onChange={changeLanguage}
    >
      <Select.Option value="en">{t('languages.en')}</Select.Option>
      <Select.Option value="ru">{t('languages.ru')}</Select.Option>
    </Select>
  )
}

export default LanguageDropdown;
