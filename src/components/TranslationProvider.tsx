import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Language, TranslationContext } from '@/hooks/useTranslation';
import { getTranslation } from '@/translations/translations';

interface TranslationProviderProps {
  children: React.ReactNode;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract language from URL or default to 'en'
  const getLanguageFromPath = (pathname: string): Language => {
    if (pathname.startsWith('/ar')) return 'ar';
    if (pathname.startsWith('/en')) return 'en';
    return 'en'; // default
  };

  const [language, setLanguageState] = useState<Language>(() => 
    getLanguageFromPath(location.pathname)
  );

  // Update document direction and lang attribute based on language
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (newLanguage: Language) => {
    const currentPath = location.pathname;
    let newPath: string;

    // Remove existing language prefix
    const pathWithoutLang = currentPath.replace(/^\/(en|ar)/, '') || '/';
    
    // Add new language prefix
    if (newLanguage === 'en') {
      newPath = pathWithoutLang === '/' ? '/en' : `/en${pathWithoutLang}`;
    } else {
      newPath = pathWithoutLang === '/' ? '/ar' : `/ar${pathWithoutLang}`;
    }

    setLanguageState(newLanguage);
    navigate(newPath, { replace: true });
  };

  // Update language when URL changes
  useEffect(() => {
    const newLanguage = getLanguageFromPath(location.pathname);
    if (newLanguage !== language) {
      setLanguageState(newLanguage);
    }
  }, [location.pathname, language]);

  const t = (key: string): string => {
    return getTranslation(key, language);
  };

  const value = {
    language,
    setLanguage,
    t,
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};