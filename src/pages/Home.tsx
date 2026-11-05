import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  Wallet, Home as HomeIcon, Car, RefreshCw, Briefcase, Hammer,
  FileText, ShieldCheck, PenLine, Banknote,
  Phone, MessageCircle, Mail, CheckCircle2,
  ArrowRight, Star, Clock, Lock, TrendingDown, Users, Award,
} from 'lucide-react';
import SectionTitle from '@/components/SectionTitle';
import Testimonials from '@/components/Testimonials';
import LoanRequestModal from '@/components/LoanRequestModal';
import { contact, images } from '@/data/site';
import { useLanguage } from '@/i18n/LanguageContext';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Wallet, Home: HomeIcon, Car, RefreshCw, Briefcase, Hammer,
  FileText, ShieldCheck, PenLine, Banknote,
};

const stepIcons = [FileText, ShieldCheck, PenLine, Banknote];

const advantageIcons = [Clock, Lock, TrendingDown, Users, Award, CheckCircle2];

export default function Home() {
  const { t } = useLanguage();
  const [currentBankIndex, setCurrentBankIndex] = useState(0);
  const [loanFormOpen, setLoanFormOpen] = useState(false);

  const banks = [
    { name: 'BNP Paribas', logo: images.banks.bnp, textColor: 'text-green-700', borderColor: 'border-green-200' },
    { name: 'Crédit Agricole', logo: images.banks.creditAgricole, textColor: 'text-teal-700', borderColor: 'border-teal-200' },
    { name: 'LCL', logo: images.banks.lcl, textColor: 'text-blue-800', borderColor: 'border-blue-200' },
    { name: 'Santander', logo: images.banks.santander, textColor: 'text-red-600', borderColor: 'border-red-200' },
    { name: 'BBVA', logo: images.banks.bbva, textColor: 'text-blue-900', borderColor: 'border-blue-300' },
    { name: 'Boursorama Banque', logo: images.banks.boursorama, textColor: 'text-pink-600', borderColor: 'border-pink-200' },
  ];

  const [animatedStats, setAnimatedStats] = useState({ clients: 0, satisfaction: 0, response: 0, credits: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBankIndex((prev) => (prev + 1) % banks.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [banks.length]);

  useEffect(() => {
    const duration = 2000; // 2 seconds animation
    const steps = 60;
    const intervalTime = duration / steps;

    const clientsInterval = setInterval(() => {
      setAnimatedStats((prev) => {
        if (prev.clients < 15000) {
          return { ...prev, clients: prev.clients + 250 };
        }
        return prev;
      });
    }, intervalTime);

    const satisfactionInterval = setInterval(() => {
      setAnimatedStats((prev) => {
        if (prev.satisfaction < 98) {
          return { ...prev, satisfaction: prev.satisfaction + 2 };
        }
        return prev;
      });
    }, intervalTime);

    const responseInterval = setInterval(() => {
      setAnimatedStats((prev) => {
        if (prev.response < 24) {
          return { ...prev, response: prev.response + 1 };
        }
        return prev;
      });
    }, intervalTime);

    const creditsInterval = setInterval(() => {
      setAnimatedStats((prev) => {
        if (prev.credits < 500) {
          return { ...prev, credits: prev.credits + 10 };
        }
        return prev;
      });
    }, intervalTime);

    return () => {
      clearInterval(clientsInterval);
      clearInterval(satisfactionInterval);
      clearInterval(responseInterval);
      clearInterval(creditsInterval);
    };
  }, []);

  const stats = [
    { value: animatedStats.clients.toLocaleString('fr-FR') + '+', label: t.home.stats.clients },
    { value: animatedStats.satisfaction + ' %', label: t.home.stats.satisfaction },
    { value: animatedStats.response + 'h', label: t.home.stats.response },
    { value: animatedStats.credits + ' M€', label: t.home.stats.credits },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={images.hero} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 hero-gradient" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-16 sm:pb-20">
          <div className="max-w-3xl">
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-[1.1] sm:leading-[1.1] animate-fade-up" style={{ animationDelay: '0.1s' }}>
              {t.home.heroTitle} <span className="text-gold-300">{t.home.heroHighlight}</span>
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl text-white/85 leading-relaxed max-w-2xl animate-fade-up" style={{ animationDelay: '0.2s' }}>
              {t.home.heroDesc}
            </p>
            <div className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-xl bg-gold-500 px-5 sm:px-7 py-3 sm:py-4 text-sm sm:text-base font-bold text-white shadow-xl shadow-gold-500/30 hover:bg-gold-600 hover:scale-105 transition-all"
              >
                {t.home.ctaServices}
                <ArrowRight className="h-4 sm:h-5 w-4 sm:w-5" />
              </Link>
              <button
                type="button"
                onClick={() => setLoanFormOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/30 px-5 sm:px-7 py-3 sm:py-4 text-sm sm:text-base font-bold text-white hover:bg-white/20 transition-all"
              >
                {t.home.ctaRequest}
              </button>
            </div>

            <div className="mt-8 sm:mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 animate-fade-up" style={{ animationDelay: '0.4s' }}>
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 px-3 sm:px-4 py-2 sm:py-3 group hover:bg-white/20 transition-all">
                  <p className="font-display text-xl sm:text-2xl font-extrabold text-gold-300 group-hover:scale-110 transition-transform">
                    {stat.value}
                  </p>
                  <p className="text-[10px] sm:text-xs text-white/80 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow={t.home.advantagesEyebrow}
            title={t.home.advantagesTitle}
            subtitle={t.home.advantagesSubtitle}
          />
          <div className="mt-10 sm:mt-14 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {t.home.advantages.map((a, i) => {
              const Icon = advantageIcons[i] || CheckCircle2;
              const iconColors = [
                { bg: 'bg-blue-50', text: 'text-blue-600', hoverBg: 'hover:bg-blue-600', hoverText: 'hover:text-white' },
                { bg: 'bg-green-50', text: 'text-green-600', hoverBg: 'hover:bg-green-600', hoverText: 'hover:text-white' },
                { bg: 'bg-purple-50', text: 'text-purple-600', hoverBg: 'hover:bg-purple-600', hoverText: 'hover:text-white' },
                { bg: 'bg-orange-50', text: 'text-orange-600', hoverBg: 'hover:bg-orange-600', hoverText: 'hover:text-white' },
                { bg: 'bg-pink-50', text: 'text-pink-600', hoverBg: 'hover:bg-pink-600', hoverText: 'hover:text-white' },
                { bg: 'bg-teal-50', text: 'text-teal-600', hoverBg: 'hover:bg-teal-600', hoverText: 'hover:text-white' },
              ];
              const colors = iconColors[i] || iconColors[0];
              return (
                <div key={a.title} className="group rounded-2xl bg-white p-5 sm:p-7 shadow-sm border border-gray-100 hover:shadow-xl hover:border-brand-200 transition-all">
                  <div className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl ${colors.bg} ${colors.text} ${colors.hoverBg} ${colors.hoverText} transition-colors`}>
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <h3 className="mt-4 sm:mt-5 font-display text-base sm:text-lg font-bold text-brand-900">{a.title}</h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{a.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partenaires bancaires */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-flex items-center gap-2 rounded-full bg-gold-100 border border-gold-200 px-3 sm:px-4 py-1.5 mb-3 sm:mb-4">
              <Star className="h-4 w-4 text-gold-600" />
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-gold-700">
                {t.home.partnersEyebrow}
              </span>
            </span>
            <h2 className="mt-3 sm:mt-4 font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-brand-900 leading-tight">
              {t.home.partnersTitle}
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              {t.home.partnersDesc}
            </p>
          </div>
          <div className="mx-auto max-w-4xl">
            <div className="relative">
              {/* Main bank display */}
              <div className="overflow-hidden py-10 -my-10">
                <div
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{ transform: `translateX(-${currentBankIndex * 100}%)` }}
                >
                  {banks.map((bank) => (
                    <div key={bank.name} className="w-full flex-shrink-0 px-14 sm:px-20">
                      <div className="max-w-md mx-auto">
                        <div
                          className={`rounded-2xl p-6 sm:p-8 shadow-xl border-2 ${bank.borderColor} hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center bg-white`}
                        >
                          <div className="flex h-28 sm:h-36 w-full items-center justify-center">
                            <img
                              src={bank.logo}
                              alt={bank.name}
                              className="max-h-full max-w-full object-contain rounded-lg"
                            />
                          </div>
                          <span className={`mt-4 font-display font-bold text-lg sm:text-xl ${bank.textColor}`}>
                            {bank.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation arrows */}
              <button
                onClick={() => setCurrentBankIndex((prev) => (prev - 1 + banks.length) % banks.length)}
                className="absolute left-0 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-brand-600 hover:bg-brand-50 hover:scale-110 transition-all"
                aria-label="Previous bank"
              >
                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => setCurrentBankIndex((prev) => (prev + 1) % banks.length)}
                className="absolute right-0 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-brand-600 hover:bg-brand-50 hover:scale-110 transition-all"
                aria-label="Next bank"
              >
                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Navigation dots */}
            <div className="flex justify-center gap-2 sm:gap-3 mt-8 sm:mt-10">
              {banks.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentBankIndex(index)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    index === currentBankIndex
                      ? 'w-6 sm:w-8 bg-brand-600'
                      : 'w-3 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to bank ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Mini preview cards */}
          <div className="mx-auto max-w-4xl mt-10 sm:mt-14 grid gap-3 sm:gap-4 grid-cols-3 lg:grid-cols-6">
            {banks.map((bank, index) => (
              <button
                type="button"
                key={bank.name}
                onClick={() => setCurrentBankIndex(index)}
                className={`flex flex-col items-center gap-2 p-3 sm:p-4 rounded-xl border-2 transition-all duration-300 ${
                  index === currentBankIndex
                    ? `bg-white shadow-md ${bank.borderColor}`
                    : 'bg-gray-50 border-transparent hover:bg-gray-100'
                }`}
              >
                <div className="flex h-10 sm:h-12 w-full items-center justify-center">
                  <img
                    src={bank.logo}
                    alt=""
                    className={`max-h-full max-w-full object-contain rounded transition-opacity ${
                      index === currentBankIndex ? 'opacity-100' : 'opacity-70'
                    }`}
                  />
                </div>
                <span className={`font-semibold text-xs sm:text-sm text-center ${index === currentBankIndex ? bank.textColor : 'text-gray-700'}`}>
                  {bank.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow={t.home.servicesEyebrow}
            title={t.home.servicesTitle}
            subtitle={t.home.servicesSubtitle}
          />
          <div className="mt-10 sm:mt-14 grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {t.servicesData.map((s, i) => {
              const serviceMeta = [
                { id: 'perso', icon: 'Wallet', image: images.cards },
                { id: 'immo', icon: 'Home', image: images.houseKey },
                { id: 'auto', icon: 'Car', image: images.laptop },
                { id: 'rachat', icon: 'RefreshCw', image: images.documents },
                { id: 'pro', icon: 'Briefcase', image: images.officeHandshake },
                { id: 'travaux', icon: 'Hammer', image: images.firstHome },
              ];
              const meta = serviceMeta[i];
              const Icon = iconMap[meta.icon];
              return (
                <div key={s.title} className="group overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 hover:shadow-2xl transition-all">
                  <div className="relative h-36 sm:h-44 overflow-hidden">
                    <img src={meta.image} alt={s.title} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-950/70 to-transparent" />
                    <div className="absolute bottom-2 sm:bottom-3 left-3 sm:left-4 flex items-center gap-2">
                      <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg bg-white/90 text-brand-700">
                        {Icon && <Icon className="h-4 w-4 sm:h-5 sm:w-5" />}
                      </div>
                      <h3 className="font-display text-base sm:text-lg font-bold text-white">{s.title}</h3>
                    </div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                    <div className="mt-3 sm:mt-4 flex flex-wrap gap-x-3 sm:gap-x-4 gap-y-1.5 text-[10px] sm:text-xs">
                      <span className="font-semibold text-brand-700">{s.amount}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-600">{s.duration}</span>
                      <span className="text-gray-400">•</span>
                      <span className="font-semibold text-gold-600">{s.rate}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-8 sm:mt-12 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 sm:px-7 py-3 sm:py-4 text-sm sm:text-base font-bold text-white shadow-lg shadow-brand-600/30 hover:bg-brand-700 hover:scale-105 transition-all"
            >
              {t.home.viewAllServices}
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Étapes */}
      <section className="py-16 sm:py-24 bg-brand-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={images.handshake} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            light
            eyebrow={t.home.stepsEyebrow}
            title={t.home.stepsTitle}
            subtitle={t.home.stepsSubtitle}
          />
          <div className="mt-10 sm:mt-14 grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {t.home.steps.map((step, i) => {
              const Icon = stepIcons[i] || FileText;
              return (
                <div key={i} className="relative">
                  <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 p-5 sm:p-7 h-full hover:bg-white/15 transition-colors">
                    <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-gold-500 text-white shadow-lg">
                      <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                    </div>
                    <h3 className="mt-4 sm:mt-5 font-display text-base sm:text-lg font-bold text-white">{step.title}</h3>
                    <p className="mt-2 text-sm text-white/75 leading-relaxed">{step.desc}</p>
                  </div>
                  {i < t.home.steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 z-10 text-gold-400">
                      <ArrowRight className="h-6 w-6" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <Testimonials />

      {/* Témoignages / image break */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 items-center">
            <div className="relative">
              <img src={images.family} alt="" className="rounded-2xl sm:rounded-3xl shadow-2xl object-cover w-full h-[300px] sm:h-[350px] lg:h-[420px]" />
              <div className="absolute -bottom-4 sm:-bottom-6 -right-4 sm:-right-6 rounded-2xl bg-white p-4 sm:p-6 shadow-xl border border-gray-100 max-w-[250px] sm:max-w-xs hidden sm:block">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-gold-400 fill-gold-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-gray-700 font-medium">{t.home.trustBadge}</p>
                <p className="mt-2 text-[10px] sm:text-xs text-gray-500">{t.home.trustBadgeAuthor}</p>
              </div>
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-gold-600">{t.home.trustEyebrow}</span>
              <h2 className="mt-3 font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-900 leading-tight">
                {t.home.trustTitle}
              </h2>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600 leading-relaxed">
                {t.home.trustDesc}
              </p>
              <ul className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
                {t.home.trustList.map((item) => (
                  <li key={item} className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/a-propos"
                className="mt-6 sm:mt-8 inline-flex items-center gap-2 font-bold text-brand-600 hover:text-brand-700 transition-colors"
              >
                {t.home.learnMore}
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-brand-700 to-brand-900">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
            {t.home.ctaTitle}
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-white/80">
            {t.home.ctaDesc}
          </p>
          <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-3 sm:gap-4">
            <a
              href={contact.phoneHref}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 sm:px-7 py-3 sm:py-4 text-sm sm:text-base font-bold text-brand-700 shadow-xl hover:bg-gold-50 hover:scale-105 transition-all"
            >
              <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
              {contact.phone}
            </a>
            <a
              href={contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-green-500 px-5 sm:px-7 py-3 sm:py-4 text-sm sm:text-base font-bold text-white shadow-xl hover:bg-green-600 hover:scale-105 transition-all"
            >
              <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
              {t.whatsapp}
            </a>
            <a
              href={contact.emailHref}
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur border border-white/30 px-5 sm:px-7 py-3 sm:py-4 text-sm sm:text-base font-bold text-white hover:bg-white/20 transition-all"
            >
              <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
              {t.home.callNow}
            </a>
          </div>
        </div>
      </section>

      <LoanRequestModal open={loanFormOpen} onClose={() => setLoanFormOpen(false)} />
    </>
  );
}
