import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Landmark } from 'lucide-react';
import { contact } from '@/data/site';
import { useLanguage } from '@/i18n/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Navbar() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const links = [
    { to: '/', label: t.nav.home },
    { to: '/a-propos', label: t.nav.about },
    { to: '/services', label: t.nav.services },
    { to: '/contact', label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 sm:gap-2.5 group">
            <div className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 shadow-lg shadow-brand-600/30 group-hover:scale-105 transition-transform">
              <Landmark className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div className="flex flex-col leading-tight">
              <span
                className={`font-display text-base sm:text-lg font-extrabold transition-colors ${
                  scrolled ? 'text-brand-900' : 'text-white'
                }`}
              >
                {t.brand.name}
              </span>
              <span
                className={`text-[10px] sm:text-[11px] font-medium tracking-wide uppercase transition-colors ${
                  scrolled ? 'text-gold-600' : 'text-gold-300'
                }`}
              >
                {t.brand.tagline}
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {links.map((l) => {
              const active = location.pathname === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`relative px-3 sm:px-4 py-2 rounded-lg font-medium text-xs sm:text-sm transition-all ${
                    scrolled
                      ? active
                        ? 'text-brand-700 bg-brand-50'
                        : 'text-gray-700 hover:text-brand-700 hover:bg-brand-50'
                      : active
                        ? 'text-white bg-white/15'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-2 sm:gap-3">
            <LanguageSwitcher variant={scrolled ? 'light' : 'dark'} />
            <a
              href={contact.phoneHref}
              className={`flex items-center gap-2 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold transition-all ${
                scrolled
                  ? 'bg-gold-500 text-white hover:bg-gold-600 shadow-md shadow-gold-500/30'
                  : 'bg-white text-brand-800 hover:bg-gold-50 shadow-lg'
              }`}
            >
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">{contact.phone}</span>
              <span className="sm:hidden">Appeler</span>
            </a>
          </div>

          <div className="lg:hidden flex items-center gap-2">
            <LanguageSwitcher variant={scrolled ? 'light' : 'dark'} />
            <button
              onClick={() => setOpen(!open)}
              className={`inline-flex items-center justify-center rounded-lg p-2 transition-colors ${
                scrolled ? 'text-brand-800 hover:bg-brand-50' : 'text-white hover:bg-white/10'
              }`}
              aria-label="Menu"
            >
              {open ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {open && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl animate-fade-in">
          <div className="px-4 py-4 space-y-1">
            {links.map((l) => {
              const active = location.pathname === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`block rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                    active
                      ? 'text-brand-700 bg-brand-50'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
            <a
              href={contact.phoneHref}
              className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-gold-500 px-4 py-3 text-sm font-semibold text-white shadow-md"
            >
              <Phone className="h-4 w-4" />
              {contact.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
