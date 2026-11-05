import { useState } from 'react';
import {
  Phone, Mail, MapPin, MessageCircle, Clock, X, Send,
  CheckCircle2, Navigation, User,
} from 'lucide-react';
import { contact, images } from '@/data/site';
import { useLanguage } from '@/i18n/LanguageContext';
import { languages } from '@/i18n/translations';
import { sendToWhatsApp } from '@/lib/whatsapp';

export default function Contact() {
  const { t, lang } = useLanguage();
  const [mapOpen, setMapOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', country: '', amount: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Message rédigé dans la langue choisie par le client
    const language = languages.find((l) => l.code === lang)!;
    sendToWhatsApp(`${t.contact.formTitle} — ${language.flag} ${language.label}`, [
      [t.contact.nameLabel, form.name],
      [t.contact.phoneLabel, form.phone],
      [t.contact.emailLabel, form.email],
      [t.contact.countryLabel, form.country],
      [t.contact.amountLabel, form.amount],
      [t.contact.messageLabel, form.message],
    ]);
    setSent(true);
    setForm({ name: '', email: '', phone: '', country: '', amount: '', message: '' });
    setTimeout(() => setSent(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const contactCards = [
    { icon: Phone, label: t.contact.phone, value: contact.phone, href: contact.phoneHref, color: 'bg-brand-600 text-white shadow-lg shadow-brand-600/30', action: t.contact.callNow },
    { icon: MessageCircle, label: t.contact.whatsapp, value: contact.whatsapp, href: contact.whatsappHref, external: true, color: 'bg-green-500 text-white shadow-lg shadow-green-500/30', action: t.contact.chatWhatsapp },
    { icon: Mail, label: t.contact.email, value: contact.email, href: contact.emailHref, color: 'bg-gold-500 text-white shadow-lg shadow-gold-500/30', action: t.contact.sendEmail },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={images.aerialParis} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 hero-gradient" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-gold-300 mb-3">{t.contact.eyebrow}</span>
            <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white leading-tight">
              {t.contact.heroTitle}
            </h1>
            <p className="mt-6 text-lg text-white/85 leading-relaxed">
              {t.contact.heroDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Cartes de contact */}
      <section className="py-20 bg-white -mt-12 relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {contactCards.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.external ? '_blank' : undefined}
                rel={c.external ? 'noopener noreferrer' : undefined}
                className="group rounded-2xl bg-white p-7 shadow-lg border border-gray-100 hover:shadow-2xl hover:border-brand-200 transition-all"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${c.color} group-hover:scale-110 transition-transform`}>
                  <c.icon className="h-6 w-6" />
                </div>
                <p className="mt-4 text-xs font-bold uppercase tracking-wider text-gray-500">{c.label}</p>
                <p className="mt-1 font-display text-base font-bold text-brand-900 break-all">{c.value}</p>
                <p className="mt-3 text-sm text-brand-600 font-medium group-hover:underline">{c.action}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Formulaire + Infos */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Formulaire */}
            <div className="rounded-3xl bg-white p-8 sm:p-10 shadow-xl border border-gray-100">
              <h2 className="font-display text-2xl font-extrabold text-brand-900">{t.contact.formTitle}</h2>
              <p className="mt-2 text-sm text-gray-600">{t.contact.formDesc}</p>

              {sent && (
                <div className="mt-6 flex items-center gap-3 rounded-xl bg-green-50 border border-green-200 p-4 animate-scale-in">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <p className="text-sm font-medium text-green-800">{t.contact.successMsg}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.contact.nameLabel}</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input type="text" name="name" required value={form.name} onChange={handleChange} className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-3 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none transition-all" placeholder={t.contact.namePlaceholder} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.contact.phoneLabel}</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input type="tel" name="phone" required value={form.phone} onChange={handleChange} className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-3 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none transition-all" placeholder={t.contact.phonePlaceholder} />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.contact.emailLabel}</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input type="email" name="email" required value={form.email} onChange={handleChange} className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-3 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none transition-all" placeholder={t.contact.emailPlaceholder} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.contact.countryLabel}</label>
                  <input type="text" name="country" required value={form.country} onChange={handleChange} className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none transition-all" placeholder={t.contact.countryPlaceholder} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.contact.amountLabel}</label>
                  {/* Le client peut écrire son montant ou choisir une tranche proposée */}
                  <input type="text" name="amount" list="contact-amounts" autoComplete="off" value={form.amount} onChange={handleChange} className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none transition-all bg-white" placeholder={t.contact.amountPlaceholder} />
                  <datalist id="contact-amounts">
                    {t.contact.amounts.map((amt) => (
                      <option key={amt} value={amt} />
                    ))}
                  </datalist>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.contact.messageLabel}</label>
                  <textarea name="message" rows={4} value={form.message} onChange={handleChange} className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none transition-all resize-none" placeholder={t.contact.messagePlaceholder} />
                </div>

                <button type="submit" className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-brand-600/30 hover:bg-brand-700 hover:scale-[1.02] transition-all">
                  <Send className="h-5 w-5" />
                  {t.contact.submit}
                </button>
                <p className="text-xs text-gray-500 text-center">{t.contact.formDisclaimer}</p>
              </form>
            </div>

            {/* Infos agence */}
            <div className="space-y-6">
              <div className="rounded-3xl bg-gradient-to-br from-brand-700 to-brand-900 p-8 text-white shadow-xl">
                <h2 className="font-display text-2xl font-extrabold">{t.contact.agencyTitle}</h2>
                <p className="mt-2 text-white/80 text-sm">{t.contact.agencyDesc}</p>

                <div className="mt-6 space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 flex-shrink-0">
                      <MapPin className="h-5 w-5 text-gold-300" />
                    </div>
                    <div>
                      <p className="text-xs text-white/60 uppercase tracking-wide font-semibold">{t.contact.addressLabel}</p>
                      <p className="text-sm font-medium mt-0.5">{contact.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 flex-shrink-0">
                      <Clock className="h-5 w-5 text-gold-300" />
                    </div>
                    <div>
                      <p className="text-xs text-white/60 uppercase tracking-wide font-semibold">{t.contact.hoursLabel}</p>
                      <p className="text-sm font-medium mt-0.5">{t.contact.hoursWeek}</p>
                      <p className="text-sm font-medium">{t.contact.hoursSat}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 flex-shrink-0">
                      <Phone className="h-5 w-5 text-gold-300" />
                    </div>
                    <div>
                      <p className="text-xs text-white/60 uppercase tracking-wide font-semibold">{t.contact.phoneLabel2}</p>
                      <a href={contact.phoneHref} className="text-sm font-medium mt-0.5 hover:text-gold-300 transition-colors block">{contact.phone}</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 flex-shrink-0">
                      <Mail className="h-5 w-5 text-gold-300" />
                    </div>
                    <div>
                      <p className="text-xs text-white/60 uppercase tracking-wide font-semibold">{t.contact.emailLabel2}</p>
                      <a href={contact.emailHref} className="text-sm font-medium mt-0.5 hover:text-gold-300 transition-colors break-all">{contact.email}</a>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setMapOpen(true)}
                  className="mt-7 w-full flex items-center justify-center gap-2 rounded-xl bg-gold-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg hover:bg-gold-600 hover:scale-[1.02] transition-all"
                >
                  <Navigation className="h-4 w-4" />
                  {t.contact.seeMap}
                </button>
              </div>

              <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100 h-64 relative group cursor-pointer" onClick={() => setMapOpen(true)}>
                <img src={images.haussmann} alt="" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-brand-950/20 to-transparent flex items-end p-6">
                  <div>
                    <MapPin className="h-6 w-6 text-gold-300" />
                    <p className="mt-1 font-display text-lg font-bold text-white">29 Boulevard Haussmann</p>
                    <p className="text-sm text-white/80">{t.contact.mapClickHint}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popup Carte */}
      {mapOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-fade-in" onClick={() => setMapOpen(false)}>
          <div className="absolute inset-0 bg-brand-950/80 backdrop-blur-sm" />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-brand-900">{t.contact.mapPopupTitle}</h3>
                  <p className="text-sm text-gray-500">{contact.address}</p>
                </div>
              </div>
              <button onClick={() => setMapOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors" aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative h-[400px] sm:h-[450px]">
              <iframe title="Map" src={contact.mapsEmbed} width="100%" height="100%" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 p-5 bg-gray-50 border-t border-gray-100">
              <a href={contact.mapsLink} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-bold text-white hover:bg-brand-700 transition-colors">
                <Navigation className="h-4 w-4" />
                {t.contact.itinerary}
              </a>
              <a href={contact.phoneHref} className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gold-500 px-5 py-3 text-sm font-bold text-white hover:bg-gold-600 transition-colors">
                <Phone className="h-4 w-4" />
                {t.contact.callAgency}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
