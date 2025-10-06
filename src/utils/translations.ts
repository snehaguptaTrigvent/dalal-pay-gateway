import { Language } from '@/hooks/useTranslation';

// Type definitions for our translation structure
type TranslationObject = Record<string, any>;

// Cache for loaded translations
const translationCache: Record<Language, TranslationObject> = {
  en: {},
  ar: {}
};

// Track if translations are loaded
let translationsLoaded = false;

// Recursively flatten nested objects/arrays into dot-notated keys
const flattenObject = (input: any, prefix = ''): TranslationObject => {
  const result: TranslationObject = {};

  const isObject = (val: any) => Object.prototype.toString.call(val) === '[object Object]';
  const isArray = Array.isArray(input);

  if (isArray) {
    (input as any[]).forEach((value, index) => {
      const newPrefix = prefix ? `${prefix}.${index}` : `${index}`;
      if (value !== null && (isObject(value) || Array.isArray(value))) {
        Object.assign(result, flattenObject(value, newPrefix));
      } else {
        result[newPrefix] = value;
      }
    });
    return result;
  }

  if (isObject(input)) {
    Object.keys(input).forEach((key) => {
      const value = input[key];
      const newPrefix = prefix ? `${prefix}.${key}` : key;
      if (value !== null && (Array.isArray(value) || isObject(value))) {
        Object.assign(result, flattenObject(value, newPrefix));
      } else {
        result[newPrefix] = value;
      }
    });
    return result;
  }

  if (prefix) {
    result[prefix] = input;
  }
  return result;
};

// Load all translation modules for a language
const loadTranslations = async (language: Language): Promise<TranslationObject> => {
  try {
    const modules = await Promise.all([
      import(`../locales/${language}/common.json`),
      import(`../locales/${language}/hero.json`).catch(() => ({ default: {} })),
      import(`../locales/${language}/features.json`).catch(() => ({ default: {} })),
      import(`../locales/${language}/security.json`).catch(() => ({ default: {} })),
      import(`../locales/${language}/contact.json`).catch(() => ({ default: {} })),
      import(`../locales/${language}/footer.json`).catch(() => ({ default: {} })),
      import(`../locales/${language}/merchant.json`).catch(() => ({ default: {} })),
      import(`../locales/${language}/dashboard.json`).catch(() => ({ default: {} })),
      import(`../locales/${language}/kyc.json`).catch(() => ({ default: {} })),
    ]);

    // Combine all modules into a single flattened object
    const combined: TranslationObject = {};
    modules.forEach(module => {
      const data = (module as any).default || module;
      Object.assign(combined, flattenObject(data));
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

// Normalize keys like `kyc.steps[0].title` -> `kyc.steps.0.title`
const normalizeKey = (key: string): string => key.replace(/\[(\d+)\]/g, '.$1');

// Get translation by key and language
export const getTranslation = (key: string, language: Language): string => {
  if (!translationsLoaded) {
    console.warn('Translations not loaded yet, returning key:', key);
    return key;
  }

  const normalizedKey = normalizeKey(key);
  const translation = translationCache[language]?.[normalizedKey];
  return (typeof translation === 'string') ? translation : normalizedKey;
};