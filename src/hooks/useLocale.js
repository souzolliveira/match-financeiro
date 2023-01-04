import moment from 'moment';
import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

const useLocale = () => {
  const { i18n } = useTranslation();
  const [locale, setLocale] = useState('pt-BR');

  const changeLocale = lang => {
    i18n.changeLanguage(lang);
    moment.locale(lang.split('-')[0]);
    window.localStorage.setItem('locale', lang);
    setLocale(lang);
  };

  useEffect(() => {
    const currentLocale = window.localStorage.getItem('locale');
    if (currentLocale) {
      i18n.changeLanguage(currentLocale);
      moment.locale(currentLocale.split('-')[0]);
      window.localStorage.setItem('locale', currentLocale);
      setLocale(currentLocale);
    } else {
      i18n.changeLanguage('pt-BR');
      moment.locale('pt');
      window.localStorage.setItem('locale', 'pt-BR');
      setLocale('pt-BR');
    }
  }, [i18n]);

  return { locale, changeLocale };
};

export default useLocale;
