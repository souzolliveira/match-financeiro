import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Locales
import ptBR from './locales/pt-BR.json';

const resources = {
  'pt-BR': {
    translation: ptBR,
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'pt-BR',
  lng: 'pt-BR',
  keySeparator: false, // we do not use keys in form messages.welcome
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
