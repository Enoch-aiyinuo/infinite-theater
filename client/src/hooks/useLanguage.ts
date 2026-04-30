import { useState, useEffect } from 'react';
import enTranslations from '@/locales/en.json';
import zhTranslations from '@/locales/zh.json';

export type Language = 'en' | 'zh';

const translations: Record<Language, any> = {
  en: enTranslations,
  zh: zhTranslations,
};

const getNestedValue = (obj: any, path: string): string => {
  return path.split('.').reduce((current: any, prop: string) => current?.[prop], obj) || path;
};

// 全局语言状态
let globalLanguage: Language = 'zh';
const listeners: Set<() => void> = new Set();

export const setGlobalLanguage = (lang: Language) => {
  globalLanguage = lang;
  localStorage.setItem('language', lang);
  listeners.forEach(listener => listener());
};

export const getGlobalLanguage = (): Language => {
  if (typeof window === 'undefined') return 'zh';
  const stored = localStorage.getItem('language');
  return (stored as Language) || 'zh';
};

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'zh';
    return (localStorage.getItem('language') as Language) || 'zh';
  });

  useEffect(() => {
    globalLanguage = language;
    localStorage.setItem('language', language);
    listeners.forEach((listener: () => void) => listener());
  }, [language]);

  useEffect(() => {
    const listener = () => setLanguage(globalLanguage);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const t = (key: string): string => {
    return getNestedValue(translations[language], key);
  };

  return {
    language,
    setLanguage,
    t,
  };
};
