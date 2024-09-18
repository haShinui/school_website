import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-localstorage-backend'; // Import localStorage backend

// Import translations
import enTranslations from './locales/en/translation.json';
import deTranslations from './locales/de/translation.json';

i18n
  .use(Backend) // Use localStorage backend to cache language
  .use(LanguageDetector) // Automatically detect user language
  .use(initReactI18next) // Passes i18n instance to react-i18next
  .init({
    resources: {
      en: { translation: enTranslations },
      de: { translation: deTranslations },
    },
    fallbackLng: 'de', // Default fallback language
    interpolation: {
      escapeValue: false, // React already escapes values to prevent XSS
    },
    backend: {
      // Backend configuration for localStorage
      expirationTime: 7 * 24 * 60 * 60 * 1000, // Cache translations for 7 days
    },
    detection: {
      // Language detection order: LocalStorage -> Browser -> etc.
      order: ['localStorage', 'cookie', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage'], // Cache language in localStorage
    },
  });

export default i18n;
