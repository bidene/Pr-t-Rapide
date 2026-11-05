import { Link } from 'react-router-dom';
import { Landmark, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { contact } from '@/data/site';
import { useLanguage } from '@/i18n/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  const navLinks = [
    { to: '/', label: t.nav.home },
    { to: '/a-propos', label: t.nav.about },
    { to: '/services', label: t.nav.services },
    { to: '/contact', label: t.nav.contact },
  ];

  return (
    <footer className="bg-brand-950 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid gap-8 sm:gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 sm:gap-2.5 mb-4">
              <div className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700">
                <Landmark className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div>
                <p className="font-display text-base sm:text-lg font-extrabold">{t.brand.name}</p>
                <p className="text-[10px] sm:text-xs text-gold-400 uppercase tracking-wide">{t.brand.tagline}</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-xs">
              {t.footer.about}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-xs sm:text-sm uppercase tracking-wider text-gold-400 mb-4 sm:mb-5">{t.footer.navigation}</h4>
            <ul className="space-y-2 sm:space-y-3">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="inline-block py-1.5 sm:py-0 text-sm text-white/70 hover:text-gold-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-xs sm:text-sm uppercase tracking-wider text-gold-400 mb-4 sm:mb-5">{t.footer.ourServices}</h4>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-white/70">
              {t.servicesData.map((s) => (
                <li key={s.title}>{s.title}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-xs sm:text-sm uppercase tracking-wider text-gold-400 mb-4 sm:mb-5">{t.footer.contactTitle}</h4>
            <ul className="space-y-2 sm:space-y-4 text-sm">
              <li>
                <a href={contact.phoneHref} className="flex items-start gap-2 sm:gap-3 py-1.5 sm:py-0 text-white/70 hover:text-gold-400 transition-colors">
                  <Phone className="h-4 w-4 mt-0.5 text-gold-400 flex-shrink-0" />
                  <span>{contact.phone}</span>
                </a>
              </li>
              <li>
                <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 sm:gap-3 py-1.5 sm:py-0 text-white/70 hover:text-gold-400 transition-colors">
                  <MessageCircle className="h-4 w-4 mt-0.5 text-gold-400 flex-shrink-0" />
                  <span>{t.footer.whatsappLabel}: {contact.whatsapp}</span>
                </a>
              </li>
              <li>
                <a href={contact.emailHref} className="flex items-start gap-2 sm:gap-3 py-1.5 sm:py-0 text-white/70 hover:text-gold-400 transition-colors break-all">
                  <Mail className="h-4 w-4 mt-0.5 text-gold-400 flex-shrink-0" />
                  <span>{contact.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2 sm:gap-3 text-white/70">
                <MapPin className="h-4 w-4 mt-0.5 text-gold-400 flex-shrink-0" />
                <span>{contact.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-[10px] sm:text-xs text-white/50">
            © {new Date().getFullYear()} {t.brand.name}. {t.footer.rights}
          </p>
          <p className="text-[10px] sm:text-xs text-white/50 text-center md:text-right max-w-2xl">
            {t.footer.legal}
          </p>
        </div>
      </div>
    </footer>
  );
}
