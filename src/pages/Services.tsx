import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Wallet, Home as HomeIcon, Car, RefreshCw, Briefcase, Hammer,
  CheckCircle2, ArrowRight, Phone, MessageCircle, Clock, TrendingDown,
  X, User, Mail, Send,
} from 'lucide-react';
import SectionTitle from '@/components/SectionTitle';
import { contact, images } from '@/data/site';
import { useLanguage } from '@/i18n/LanguageContext';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Wallet, Home: HomeIcon, Car, RefreshCw, Briefcase, Hammer,
};

const serviceMeta = [
  { icon: 'Wallet', image: images.cards },
  { icon: 'Home', image: images.houseKey },
  { icon: 'Car', image: images.laptop },
  { icon: 'RefreshCw', image: images.documents },
  { icon: 'Briefcase', image: images.officeHandshake },
  { icon: 'Hammer', image: images.firstHome },
];

export default function Services() {
  const { t } = useLanguage();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    amount: '',
    duration: '',
  });

  const handleOpenForm = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setSent(false);
  };

  const handleCloseForm = () => {
    setSelectedService(null);
    setForm({ firstName: '', lastName: '', email: '', phone: '', country: '', amount: '', duration: '' });
    setSent(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      handleCloseForm();
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={images.cards} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 hero-gradient" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-gold-300 mb-3">{t.services.eyebrow}</span>
            <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white leading-tight">
              {t.services.heroTitle}
            </h1>
            <p className="mt-6 text-lg text-white/85 leading-relaxed">
              {t.services.heroDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Services détaillés */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {t.servicesData.map((s, i) => {
              const reversed = i % 2 === 1;
              const meta = serviceMeta[i];
              const Icon = iconMap[meta.icon];
              return (
                <div
                  key={s.title}
                  className={`grid gap-10 lg:grid-cols-2 items-center ${reversed ? 'lg:grid-flow-col-dense' : ''}`}
                >
                  <div className={reversed ? 'lg:col-start-2' : ''}>
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                      <img src={meta.image} alt={s.title} className="w-full h-[360px] object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-950/40 to-transparent" />
                      <div className="absolute top-4 left-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/90 text-brand-700 shadow-lg">
                        {Icon && <Icon className="h-6 w-6" />}
                      </div>
                    </div>
                  </div>
                  <div className={reversed ? 'lg:col-start-1' : ''}>
                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-gold-600">{t.services.serviceLabel} {i + 1}</span>
                    <h2 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold text-brand-900">{s.title}</h2>
                    <p className="mt-4 text-gray-600 leading-relaxed">{s.desc}</p>

                    <div className="mt-6 grid grid-cols-3 gap-4">
                      <div className="rounded-xl bg-gray-50 p-4 border border-gray-100">
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{t.services.amount}</p>
                        <p className="mt-1 font-display text-sm font-bold text-brand-700">{s.amount}</p>
                      </div>
                      <div className="rounded-xl bg-gray-50 p-4 border border-gray-100">
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{t.services.duration}</p>
                        <p className="mt-1 font-display text-sm font-bold text-brand-700">{s.duration}</p>
                      </div>
                      <div className="rounded-xl bg-gray-50 p-4 border border-gray-100">
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{t.services.rate}</p>
                        <p className="mt-1 font-display text-sm font-bold text-gold-600">{s.rate}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleOpenForm(s.title)}
                      className="mt-7 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-600/30 hover:bg-brand-700 hover:scale-105 transition-all"
                    >
                      {t.services.requestLoan}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Inclus */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow={t.services.includesEyebrow}
            title={t.services.includesTitle}
            subtitle={t.services.includesSubtitle}
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.services.includes.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-xl bg-white p-4 border border-gray-100 shadow-sm">
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparatif rapide */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow={t.services.commitmentsEyebrow}
            title={t.services.commitmentsTitle}
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-brand-50 p-5 text-center border border-brand-100">
              <Clock className="h-8 w-8 text-brand-600 mx-auto" />
              <p className="mt-3 font-display text-2xl font-extrabold text-brand-700">{t.services.response24}</p>
              <p className="mt-1 text-xs text-gray-600">{t.services.response24Label}</p>
            </div>
            <div className="rounded-2xl bg-gold-50 p-5 text-center border border-gold-100">
              <TrendingDown className="h-8 w-8 text-gold-600 mx-auto" />
              <p className="mt-3 font-display text-2xl font-extrabold text-gold-700">{t.services.taeg}</p>
              <p className="mt-1 text-xs text-gray-600">{t.services.taegLabel}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-brand-700 to-brand-900">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            {t.services.ctaTitle}
          </h2>
          <p className="mt-4 text-lg text-white/80">
            {t.services.ctaDesc}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={contact.phoneHref}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-4 text-base font-bold text-brand-700 shadow-xl hover:bg-gold-50 hover:scale-105 transition-all"
            >
              <Phone className="h-5 w-5" />
              {contact.phone}
            </a>
            <a
              href={contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-green-500 px-7 py-4 text-base font-bold text-white shadow-xl hover:bg-green-600 hover:scale-105 transition-all"
            >
              <MessageCircle className="h-5 w-5" />
              {t.whatsapp}
            </a>
          </div>
        </div>
      </section>

      {/* Modal Formulaire */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white rounded-t-3xl border-b border-gray-100 p-6 flex items-center justify-between">
              <div>
                <h3 className="font-display text-xl font-bold text-brand-900">{t.services.formTitle}</h3>
                <p className="text-sm text-gray-600 mt-1">{selectedService}</p>
              </div>
              <button
                onClick={handleCloseForm}
                className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6">
              {sent ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  <p className="text-lg font-medium text-gray-900">{t.services.successMsg}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.services.firstNameLabel}</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          name="firstName"
                          required
                          value={form.firstName}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-3 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none transition-all"
                          placeholder={t.services.firstNamePlaceholder}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.services.lastNameLabel}</label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={form.lastName}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none transition-all"
                        placeholder={t.services.lastNamePlaceholder}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.services.emailLabel}</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-3 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none transition-all"
                        placeholder={t.services.emailPlaceholder}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.services.phoneLabel}</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none transition-all"
                      placeholder={t.services.phonePlaceholder}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.services.countryLabel}</label>
                    <input
                      type="text"
                      name="country"
                      required
                      value={form.country}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none transition-all"
                      placeholder={t.services.countryPlaceholder}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.services.amountLabel}</label>
                    <input
                      type="text"
                      name="amount"
                      required
                      value={form.amount}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none transition-all"
                      placeholder={t.services.amountPlaceholder}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.services.durationLabel}</label>
                    <input
                      type="number"
                      name="duration"
                      required
                      value={form.duration}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none transition-all"
                      placeholder={t.services.durationPlaceholder}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-brand-600/30 hover:bg-brand-700 hover:scale-[1.02] transition-all"
                  >
                    <Send className="h-5 w-5" />
                    {t.services.submit}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
