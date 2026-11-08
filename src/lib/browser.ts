// Détection intelligente du navigateur, du système et du type d'appareil.
// Utilise l'API moderne « User-Agent Client Hints » quand elle existe (Chrome, Edge, Opera, Samsung),
// sinon analyse la chaîne User-Agent (Safari, Firefox, anciens navigateurs).

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export type BrowserInfo = {
  browser: string; // ex. « Chrome », « Safari », « Firefox »
  browserVersion: string; // version majeure, ex. « 130 »
  os: string; // ex. « Windows », « macOS », « iOS », « Android »
  device: DeviceType;
  touch: boolean;
  languages: string[]; // langues préférées, ex. ["fr-FR", "en"]
  timezone: string | null; // ex. « Europe/Paris »
  isBot: boolean; // robots des moteurs de recherche
};

type UAData = { mobile?: boolean; platform?: string; brands?: { brand: string; version: string }[] };

const BOT_RE = /bot|crawl|spider|slurp|lighthouse|facebookexternalhit|whatsapp|headlesschrome/i;

function parseBrowser(ua: string): { browser: string; version: string } {
  const rules: [string, RegExp][] = [
    ['Edge', /Edg(?:e|A|iOS)?\/(\d+)/],
    ['Opera', /(?:OPR|Opera)\/(\d+)/],
    ['Samsung Internet', /SamsungBrowser\/(\d+)/],
    ['Firefox', /(?:Firefox|FxiOS)\/(\d+)/],
    ['Chrome', /(?:Chrome|CriOS)\/(\d+)/],
    ['Safari', /Version\/(\d+).*Safari/],
  ];
  for (const [name, re] of rules) {
    const m = ua.match(re);
    if (m) return { browser: name, version: m[1] };
  }
  return { browser: 'Autre', version: '' };
}

function parseOs(ua: string): string {
  if (/iPhone|iPad|iPod/.test(ua)) return 'iOS';
  if (/Android/.test(ua)) return 'Android';
  if (/Windows/.test(ua)) return 'Windows';
  if (/Mac OS X|Macintosh/.test(ua)) return 'macOS';
  if (/CrOS/.test(ua)) return 'ChromeOS';
  if (/Linux/.test(ua)) return 'Linux';
  return 'Autre';
}

function parseDevice(ua: string, touch: boolean, uaDataMobile?: boolean): DeviceType {
  // iPad récent : se présente comme un Mac, mais avec un écran tactile
  const iPadOs = /Macintosh/.test(ua) && touch;
  if (/iPad|Tablet/.test(ua) || iPadOs || (/Android/.test(ua) && !/Mobile/.test(ua))) return 'tablet';
  if (uaDataMobile || /Mobi|iPhone|iPod|Android.*Mobile/.test(ua)) return 'mobile';
  return 'desktop';
}

export function detectBrowser(): BrowserInfo {
  if (typeof window === 'undefined') {
    return { browser: 'Autre', browserVersion: '', os: 'Autre', device: 'desktop', touch: false, languages: [], timezone: null, isBot: false };
  }
  const ua = navigator.userAgent;
  const uaData = (navigator as Navigator & { userAgentData?: UAData }).userAgentData;
  const touch = navigator.maxTouchPoints > 0 || 'ontouchstart' in window;

  let { browser, version } = parseBrowser(ua);
  let os = parseOs(ua);
  const isMacTouch = /Macintosh/.test(ua) && touch;
  if (isMacTouch) os = 'iOS'; // iPadOS

  // Client Hints : plus fiables que l'User-Agent quand ils existent
  if (uaData?.brands?.length) {
    const known = ['Microsoft Edge', 'Opera', 'Samsung Internet', 'Google Chrome', 'Chromium'];
    const hit = known.map((k) => uaData.brands!.find((b) => b.brand === k)).find(Boolean);
    if (hit) {
      browser = hit.brand.replace('Google ', '').replace('Microsoft ', '').replace('Chromium', 'Chrome');
      version = hit.version;
    }
  }
  if (uaData?.platform) {
    const map: Record<string, string> = { Windows: 'Windows', macOS: 'macOS', Android: 'Android', 'Chrome OS': 'ChromeOS', Linux: 'Linux', iOS: 'iOS' };
    os = map[uaData.platform] ?? os;
  }

  let timezone: string | null = null;
  try {
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || null;
  } catch {
    // ignore
  }

  return {
    browser,
    browserVersion: version,
    os,
    device: parseDevice(ua, touch, uaData?.mobile),
    touch,
    languages: navigator.languages?.length ? [...navigator.languages] : [navigator.language].filter(Boolean),
    timezone,
    isBot: BOT_RE.test(ua),
  };
}
