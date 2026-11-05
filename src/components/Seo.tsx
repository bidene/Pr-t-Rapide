import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { seoByPath, SITE_URL } from '@/data/seo';
import { useLanguage } from '@/i18n/LanguageContext';

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = href;
}

/** Met à jour le titre, la description et les balises de partage à chaque changement de page. */
export default function Seo() {
  const { pathname } = useLocation();
  const { lang, t } = useLanguage();

  useEffect(() => {
    const fr = seoByPath[pathname] ?? seoByPath['/'];
    const navLabel: Record<string, string> = {
      '/': t.nav.home,
      '/a-propos': t.nav.about,
      '/services': t.nav.services,
      '/contact': t.nav.contact,
    };
    // Version française détaillée pour Google ; titre simple traduit pour les autres langues.
    const title = lang === 'fr' ? fr.title : `${navLabel[pathname] ?? t.nav.home} — ${t.brand.name}`;
    const description = lang === 'fr' ? fr.description : t.footer.about;

    document.title = title;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);

    if (SITE_URL) {
      const url = SITE_URL.replace(/\/+$/, '') + (pathname === '/' ? '/' : pathname);
      setCanonical(url);
      setMeta('property', 'og:url', url);
    }
  }, [pathname, lang, t]);

  return null;
}
