import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ukFlag from '../assets/UK-union-flag.svg'; // British flag for English
import swissFlag from '../assets/Flag_of_Switzerland.svg'; // Swiss flag for German

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(() => {
    // Check if a language is stored in localStorage, otherwise default to 'de' (German)
    return localStorage.getItem('language') || 'de';
  });

  // Update the language when the component mounts and when the language changes
  useEffect(() => {
    i18n.changeLanguage(currentLang); // Ensure language change takes effect
    localStorage.setItem('language', currentLang); // Store selected language in localStorage
  }, [currentLang, i18n]);

  const toggleLanguage = () => {
    const newLang = currentLang === 'en' ? 'de' : 'en';
    setCurrentLang(newLang); // Switch to the other language
  };

  return (
    <button
      onClick={toggleLanguage}
      className="focus:outline-none transition-all hover:ring-2 hover:ring-blue-500 dark:hover:ring-2 dark:hover:ring-white"
      style={{ padding: 0, borderRadius: 0 }} // Ensure no padding and square border
    >
      <img
        src={currentLang === 'de' ? swissFlag : ukFlag} // Toggle between flags
        alt={currentLang === 'de' ? 'German' : 'English'} // Descriptive alt text
        className="w-6 h-6 object-contain transition-opacity" // Ensure consistent size (24px)
        style={{
          border: 'none',
          backgroundColor: 'transparent',
          borderRadius: '0', // Square corners for the hover effect
        }}
      />
    </button>
  );
};

export default LanguageSwitcher;
