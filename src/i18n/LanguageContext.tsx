import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from 'react';
import { translations, type Lang, type Translation } from './translations';
import { detectCountry, langForCountry, detectGeoOffline, detectGeoByIp, type GeoInfo } from './geo';
import { detectBrowser, type BrowserInfo } from '@/lib/browser';

type LanguageContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translation;
  /** Pays probable du visiteur (code ISO à 2 lettres, ex. « FR », « BE »), ou null si inconnu. */
  country: string | null;
  /** Géolocalisation du visiteur : pays, région, ville… (d'abord approximative, puis précisée par l'IP). */
  geo: GeoInfo;
  /** Navigateur, système, type d'appareil, écran tactile, langues du visiteur. */
  browser: BrowserInfo;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'pret-rapide-lang';

const isLang = (value: string | null): value is Lang =>
  !!value && Object.prototype.hasOwnProperty.call(translations, value);

/** D'où vient la langue choisie : seule une langue « pays » ou « par défaut » peut être affinée par l'IP. */
type LangSource = 'bot' | 'manual' | 'browser' | 'country' | 'default';

function detectInitialLangWithSource(): { lang: Lang; source: LangSource } {
  if (typeof window === 'undefined') return { lang: 'fr', source: 'default' };

  // 0. Robots des moteurs de recherche (Googlebot, Bingbot…) : toujours la version française,
  //    sinon Google indexerait la version anglaise (Googlebot se présente en en-US).
  if (/bot|crawl|spider|slurp|lighthouse|facebookexternalhit|whatsapp/i.test(navigator.userAgent)) return { lang: 'fr', source: 'bot' };

  // 1. Choix manuel déjà fait par le visiteur
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (isLang(stored)) return { lang: stored, source: 'manual' };
  } catch {
    // localStorage indisponible (navigation privée, cookies bloqués…)
  }

  // 2. Langues préférées du navigateur, dans l'ordre (ex. ["de-CH", "en-US", "fr"])
  const preferred = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const tag of preferred) {
    const code = tag?.slice(0, 2).toLowerCase() ?? null;
    if (isLang(code)) return { lang: code, source: 'browser' };
  }

  // 3. Pays du visiteur (fuseau horaire / région du navigateur), si la langue du navigateur
  //    n'est pas disponible sur le site (ex. néerlandais en Belgique → français, hongrois en Roumanie → roumain)
  const countryLang = langForCountry(detectCountry());
  if (countryLang) return { lang: countryLang, source: 'country' };

  // 4. Langue par défaut
  return { lang: 'fr', source: 'default' };
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [initial] = useState(detectInitialLangWithSource);
  const [lang, setLangState] = useState<Lang>(initial.lang);
  const [browser] = useState<BrowserInfo>(detectBrowser);
  const [geo, setGeo] = useState<GeoInfo>(detectGeoOffline);
  // Vrai dès que le visiteur a choisi sa langue lui-même : la géolocalisation ne la change plus
  const manualChoiceRef = useRef(initial.source === 'manual');
  const country = geo.country ?? null;

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    manualChoiceRef.current = true;
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Informations du visiteur exposées sur <html> : utilisables en CSS (ex. html[data-device="mobile"])
  useEffect(() => {
    const el = document.documentElement;
    el.dataset.device = browser.device;
    el.dataset.os = browser.os.toLowerCase();
    el.dataset.browser = browser.browser.toLowerCase().replace(/\s+/g, '-');
    el.dataset.touch = String(browser.touch);
    if (country) el.dataset.country = country.toLowerCase();
  }, [browser, country]);

  // Géolocalisation précise par IP, une fois par session (jamais pour les robots)
  useEffect(() => {
    if (browser.isBot || initial.source === 'bot') return;
    let cancelled = false;
    detectGeoByIp().then((ipGeo) => {
      if (cancelled || !ipGeo) return;
      setGeo(ipGeo);
      // On n'ajuste la langue que si elle n'a été choisie ni par le visiteur ni par son navigateur
      if (initial.source === 'country' || initial.source === 'default') {
        const ipLang = langForCountry(ipGeo.country);
        if (ipLang && !manualChoiceRef.current) setLangState(ipLang);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [browser.isBot, initial.source]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang], country, geo, browser }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
