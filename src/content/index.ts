import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { en, type Copy } from './en';
import { ja } from './ja';
import { zh } from './zh';

const copies: Record<string, Copy> = { en, ja, zh };
const htmlLang: Record<string, string> = { en: 'en', ja: 'ja', zh: 'zh-CN' };

export function useCopy(): Copy {
  const { language } = useLanguage();
  return copies[language] ?? en;
}

/** Keeps <html lang> in sync so fonts and screen readers pick the right language. */
export function useHtmlLang() {
  const { language } = useLanguage();
  useEffect(() => {
    document.documentElement.lang = htmlLang[language] ?? 'en';
  }, [language]);
}

export type { Copy };
