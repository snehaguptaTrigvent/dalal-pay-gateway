import { Language } from '@/hooks/useTranslation';

// Type definitions for our translation structure
type TranslationObject = Record<string, any>;
type NestedTranslationObject = Record<string, Record<string, any>>;

// Cache for loaded translations
const translationCache: Record<Language, TranslationObject> = {
  en: {},
  ar: {}
};

// Track if translations are loaded
let translationsLoaded = false;

// Load all translation modules for a language
const loadTranslations = async (language: Language): Promise<TranslationObject> => {
  try {
    const modules = await Promise.all([
      import(`../locales/${language}/common.json`),
      import(`../locales/${language}/hero.json`),
      import(`../locales/${language}/features.json`),
      import(`../locales/${language}/security.json`),
      import(`../locales/${language}/contact.json`),
      import(`../locales/${language}/footer.json`),
      import(`../locales/${language}/merchant.json`),
      import(`../locales/${language}/kyc.json`),
    ]);

    // Combine all modules into a single object with flattened keys
    const combined: TranslationObject = {};
    
    modules.forEach((module, idx) => {
      const data = module.default || module;
      // If this is kyc.json (last in array), prefix all keys with 'kyc.'
      if (idx === modules.length - 1) {
        Object.keys(data).forEach(key => {
          const value = data[key];
          if (Array.isArray(value)) {
            value.forEach((item, arrIdx) => {
              if (typeof item === 'object' && item !== null) {
                Object.keys(item).forEach(nestedKey => {
                  combined[`kyc.${key}.${arrIdx}.${nestedKey}`] = item[nestedKey];
                });
              } else {
                combined[`kyc.${key}.${arrIdx}`] = item;
              }
            });
          } else if (typeof value === 'object' && value !== null) {
            Object.keys(value).forEach(nestedKey => {
              combined[`kyc.${key}.${nestedKey}`] = value[nestedKey];
            });
          } else {
            combined[`kyc.${key}`] = value;
          }
        });
      } else {
        Object.keys(data).forEach(section => {
          const sectionData = data[section];
          if (typeof sectionData === 'object' && sectionData !== null) {
            Object.keys(sectionData).forEach(key => {
              const value = sectionData[key];
              if (typeof value === 'object' && value !== null) {
                Object.keys(value).forEach(nestedKey => {
                  combined[`${section}.${key}.${nestedKey}`] = value[nestedKey];
                });
              } else {
                combined[`${section}.${key}`] = value;
              }
            });
          }
        });
      }
    });

    return combined;
  } catch (error) {
    console.error(`Failed to load translations for ${language}:`, error);
    return {};
  }
};

// Initialize translations
export const initializeTranslations = async (): Promise<void> => {
  if (translationsLoaded) return;

  try {
    const [enTranslations, arTranslations] = await Promise.all([
      loadTranslations('en'),
      loadTranslations('ar'),
    ]);

    translationCache.en = enTranslations;
    translationCache.ar = arTranslations;
    translationsLoaded = true;
  } catch (error) {
    console.error('Failed to initialize translations:', error);
  }
};

// Get translation by key and language
export const getTranslation = (key: string, language: Language): string => {
  if (!translationsLoaded) {
    console.warn('Translations not loaded yet, returning key:', key);
    return key;
  }

  const translation = translationCache[language]?.[key];
  return translation || key;
};