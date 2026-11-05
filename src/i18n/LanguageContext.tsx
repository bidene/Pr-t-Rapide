import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { translations, type Lang, type Translation } from './translations';

type LanguageContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translation;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'pret-rapide-lang';

const isLang = (value: string | null): value is Lang =>
  !!value && Object.prototype.hasOwnProperty.call(translations, value);

function detectInitialLang(): Lang {
  if (typeof window === 'undefined') return 'fr';

  // 1. Choix manuel déjà fait par le visiteur
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (isLang(stored)) return stored;
  } catch {
    // localStorage indisponible (navigation privée, cookies bloqués…)
  }

  // 2. Langues préférées du navigateur, dans l'ordre (ex. ["de-CH", "en-US", "fr"])
  const preferred = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const tag of preferred) {
    const code = tag?.slice(0, 2).toLowerCase() ?? null;
    if (isLang(code)) return code;
  }

  // 3. Langue par défaut
  return 'fr';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectInitialLang);

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
