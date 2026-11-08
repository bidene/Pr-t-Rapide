// Détection automatique du pays du visiteur, sans service externe ni autorisation :
// 1. fuseau horaire de l'appareil (ex. « Europe/Madrid » → ES) ;
// 2. sinon, région indiquée par le navigateur (ex. « pt-BR » → BR).
// Aucune donnée n'est envoyée à un tiers (pas d'appel d'API, conforme RGPD).
import type { Lang } from './translations';

// Fuseau horaire → code pays (ISO 3166-1 alpha-2)
const TIMEZONE_COUNTRY: Record<string, string> = {
  // France et territoires
  'Europe/Paris': 'FR', 'Europe/Monaco': 'MC', 'Indian/Reunion': 'RE', 'America/Martinique': 'MQ',
  'America/Guadeloupe': 'GP', 'America/Cayenne': 'GF', 'Indian/Mayotte': 'YT', 'Pacific/Noumea': 'NC',
  'Pacific/Tahiti': 'PF',
  // Europe francophone / multilingue
  'Europe/Brussels': 'BE', 'Europe/Luxembourg': 'LU', 'Europe/Zurich': 'CH',
  // Espagne, Allemagne, Autriche, Italie, Portugal, Roumanie, Moldavie
  'Europe/Madrid': 'ES', 'Atlantic/Canary': 'ES', 'Africa/Ceuta': 'ES',
  'Europe/Berlin': 'DE', 'Europe/Busingen': 'DE', 'Europe/Vienna': 'AT', 'Europe/Vaduz': 'LI',
  'Europe/Rome': 'IT', 'Europe/San_Marino': 'SM', 'Europe/Vatican': 'VA',
  'Europe/Lisbon': 'PT', 'Atlantic/Madeira': 'PT', 'Atlantic/Azores': 'PT',
  'Europe/Bucharest': 'RO', 'Europe/Chisinau': 'MD',
  // Royaume-Uni, Irlande
  'Europe/London': 'GB', 'Europe/Dublin': 'IE',
  // Afrique francophone
  'Africa/Casablanca': 'MA', 'Africa/Algiers': 'DZ', 'Africa/Tunis': 'TN', 'Africa/Dakar': 'SN',
  'Africa/Abidjan': 'CI', 'Africa/Douala': 'CM', 'Africa/Libreville': 'GA', 'Africa/Kinshasa': 'CD',
  'Africa/Lubumbashi': 'CD', 'Africa/Brazzaville': 'CG', 'Africa/Bamako': 'ML', 'Africa/Ouagadougou': 'BF',
  'Africa/Niamey': 'NE', 'Africa/Conakry': 'GN', 'Africa/Lome': 'TG', 'Africa/Porto-Novo': 'BJ',
  'Africa/Ndjamena': 'TD', 'Africa/Bangui': 'CF', 'Indian/Antananarivo': 'MG', 'Africa/Djibouti': 'DJ',
  // Afrique lusophone
  'Africa/Luanda': 'AO', 'Africa/Maputo': 'MZ', 'Atlantic/Cape_Verde': 'CV', 'Africa/Bissau': 'GW',
  // Amériques
  'America/Montreal': 'CA', 'America/Toronto': 'CA', 'America/Vancouver': 'CA',
  'America/New_York': 'US', 'America/Chicago': 'US', 'America/Denver': 'US', 'America/Los_Angeles': 'US',
  'America/Mexico_City': 'MX', 'America/Bogota': 'CO', 'America/Lima': 'PE', 'America/Santiago': 'CL',
  'America/Argentina/Buenos_Aires': 'AR', 'America/Caracas': 'VE', 'America/Sao_Paulo': 'BR',
  'America/Port-au-Prince': 'HT',
};

// Pays → langue du site (uniquement les langues disponibles : fr, en, es, de, it, pt, ro)
const COUNTRY_LANG: Record<string, Lang> = {
  FR: 'fr', MC: 'fr', RE: 'fr', MQ: 'fr', GP: 'fr', GF: 'fr', YT: 'fr', NC: 'fr', PF: 'fr',
  BE: 'fr', LU: 'fr', CH: 'fr', CA: 'fr', HT: 'fr',
  MA: 'fr', DZ: 'fr', TN: 'fr', SN: 'fr', CI: 'fr', CM: 'fr', GA: 'fr', CD: 'fr', CG: 'fr', ML: 'fr',
  BF: 'fr', NE: 'fr', GN: 'fr', TG: 'fr', BJ: 'fr', TD: 'fr', CF: 'fr', MG: 'fr', DJ: 'fr',
  ES: 'es', MX: 'es', CO: 'es', PE: 'es', CL: 'es', AR: 'es', VE: 'es',
  DE: 'de', AT: 'de', LI: 'de',
  IT: 'it', SM: 'it', VA: 'it',
  PT: 'pt', BR: 'pt', AO: 'pt', MZ: 'pt', CV: 'pt', GW: 'pt',
  RO: 'ro', MD: 'ro',
  GB: 'en', IE: 'en', US: 'en',
};

/** Pays probable du visiteur (code ISO à 2 lettres), ou null si inconnu. */
export function detectCountry(): string | null {
  if (typeof window === 'undefined') return null;

  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz && TIMEZONE_COUNTRY[tz]) return TIMEZONE_COUNTRY[tz];
  } catch {
    // Intl indisponible : on passe à la méthode suivante
  }

  const tags = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const tag of tags) {
    const region = tag?.split('-')[1];
    if (region && /^[A-Za-z]{2}$/.test(region)) return region.toUpperCase();
  }
  return null;
}

// ---------------------------------------------------------------------------
// Géolocalisation par adresse IP (automatique, sans fenêtre d'autorisation)
// ---------------------------------------------------------------------------
// L'adresse IP du visiteur est envoyée à un service de géolocalisation gratuit (ipapi.co,
// puis geojs.io ou ipwho.is en secours). À mentionner dans la politique de confidentialité.
// Le résultat est mis en cache pour la session : un seul appel par visite.

export type GeoSource = 'ip' | 'timezone' | 'browser' | 'unknown';

export type GeoInfo = {
  country: string | null; // code ISO, ex. « FR »
  countryName: string | null; // ex. « France »
  region: string | null; // ex. « Île-de-France »
  city: string | null; // ex. « Paris »
  latitude: number | null;
  longitude: number | null;
  timezone: string | null;
  source: GeoSource;
};

const GEO_CACHE_KEY = 'pret-rapide-geo';
const GEO_TIMEOUT_MS = 3000;

type Provider = { url: string; parse: (d: Record<string, unknown>) => GeoInfo | null };

const str = (v: unknown) => (typeof v === 'string' && v.trim() ? v.trim() : null);
const num = (v: unknown) => {
  const n = typeof v === 'string' ? parseFloat(v) : typeof v === 'number' ? v : NaN;
  return Number.isFinite(n) ? n : null;
};
const code = (v: unknown) => {
  const s = str(v);
  return s && /^[A-Za-z]{2}$/.test(s) ? s.toUpperCase() : null;
};

const PROVIDERS: Provider[] = [
  {
    url: 'https://ipapi.co/json/',
    parse: (d) =>
      d.error ? null : {
        country: code(d.country_code), countryName: str(d.country_name), region: str(d.region), city: str(d.city),
        latitude: num(d.latitude), longitude: num(d.longitude), timezone: str(d.timezone), source: 'ip',
      },
  },
  {
    url: 'https://get.geojs.io/v1/ip/geo.json',
    parse: (d) => ({
      country: code(d.country_code), countryName: str(d.country), region: str(d.region), city: str(d.city),
      latitude: num(d.latitude), longitude: num(d.longitude), timezone: str(d.timezone), source: 'ip',
    }),
  },
  {
    url: 'https://ipwho.is/',
    parse: (d) =>
      d.success === false ? null : {
        country: code(d.country_code), countryName: str(d.country), region: str(d.region), city: str(d.city),
        latitude: num(d.latitude), longitude: num(d.longitude),
        timezone: str((d.timezone as Record<string, unknown> | undefined)?.id), source: 'ip',
      },
  },
];

/** Géolocalisation approximative sans réseau (fuseau horaire, puis région du navigateur). */
export function detectGeoOffline(): GeoInfo {
  let timezone: string | null = null;
  try {
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || null;
  } catch {
    // ignore
  }
  const fromTz = timezone ? TIMEZONE_COUNTRY[timezone] ?? null : null;
  const country = fromTz ?? detectCountry();
  return {
    country, countryName: null, region: null, city: null, latitude: null, longitude: null, timezone,
    source: fromTz ? 'timezone' : country ? 'browser' : 'unknown',
  };
}

async function fetchWithTimeout(url: string): Promise<Record<string, unknown>> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), GEO_TIMEOUT_MS);
  try {
    const res = await fetch(url, { signal: ctrl.signal, credentials: 'omit', referrerPolicy: 'no-referrer' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await res.json()) as Record<string, unknown>;
  } finally {
    clearTimeout(timer);
  }
}

/** Géolocalisation par IP, avec cache de session et services de secours. Ne lève jamais d'erreur. */
export async function detectGeoByIp(): Promise<GeoInfo | null> {
  try {
    const cached = sessionStorage.getItem(GEO_CACHE_KEY);
    if (cached) return JSON.parse(cached) as GeoInfo;
  } catch {
    // stockage indisponible : on continue sans cache
  }
  for (const provider of PROVIDERS) {
    try {
      const geo = provider.parse(await fetchWithTimeout(provider.url));
      if (geo?.country) {
        try {
          sessionStorage.setItem(GEO_CACHE_KEY, JSON.stringify(geo));
        } catch {
          // ignore
        }
        return geo;
      }
    } catch {
      // service indisponible, bloqué ou trop lent : on essaie le suivant
    }
  }
  return null;
}

/** Langue du site correspondant à un pays, ou null si le pays n'a pas de langue disponible. */
export function langForCountry(country: string | null): Lang | null {
  return country ? COUNTRY_LANG[country] ?? null : null;
}
