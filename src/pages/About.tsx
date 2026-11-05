import { Link } from 'react-router-dom';
import {
  Target, Eye, Heart, Award, Shield, Clock, TrendingDown,
  ArrowRight, Phone, Star,
} from 'lucide-react';
import SectionTitle from '@/components/SectionTitle';
import { contact, images } from '@/data/site';
import { useLanguage } from '@/i18n/LanguageContext';

const valueIcons = [Shield, Heart, Clock, TrendingDown];

export default function About() {
  const { t } = useLanguage();

  const pillars = [
    { icon: Target, title: t.about.missionTitle, desc: t.about.missionDesc, color: 'bg-brand-50 text-brand-600' },
    { icon: Eye, title: t.about.visionTitle, desc: t.about.visionDesc, color: 'bg-gold-50 text-gold-600' },
    { icon: Award, title: t.about.commitmentTitle, desc: t.about.commitmentDesc, color: 'bg-green-50 text-green-600' },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={images.paris} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 hero-gradient" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 px-3 sm:px-4 py-1.5 mb-4 sm:mb-6">
              <Star className="h-4 w-4 text-gold-300" />
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-white">{t.about.eyebrow}</span>
            </span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.1]">
              {t.about.heroTitle}
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-white/85 leading-relaxed max-w-2xl">
              {t.about.heroDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Histoire */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:gap-16 lg:grid-cols-2 lg:items-stretch">
            <div className="relative h-72 sm:h-96 lg:h-auto lg:min-h-[420px]">
              <img
                src={images.team}
                alt=""
                className="absolute inset-0 h-full w-full rounded-3xl shadow-xl object-cover object-[center_60%]"
              />
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 rounded-2xl bg-gold-500 px-5 sm:px-6 py-3 sm:py-4 shadow-xl">
                <p className="font-display text-2xl sm:text-3xl font-extrabold text-white leading-none">{t.about.yearsExp}</p>
                <p className="mt-1 text-xs sm:text-sm text-white/90">{t.about.yearsExpLabel}</p>
              </div>
            </div>
            <div className="lg:py-4">
              <SectionTitle
                eyebrow={t.about.storyEyebrow}
                title={t.about.storyTitle}
                center={false}
              />
              <div className="mt-6 space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed">
                <p>{t.about.storyP1}</p>
                <p>{t.about.storyP2}</p>
                <p>{t.about.storyP3}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Valeurs */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
            {pillars.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="h-full rounded-2xl bg-white p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-brand-200 transition-all">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-lg sm:text-xl font-bold text-brand-900">{title}</h3>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 sm:mt-24">
            <SectionTitle
              eyebrow={t.about.valuesEyebrow}
              title={t.about.valuesTitle}
            />
          </div>
          <div className="mt-10 sm:mt-14 grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.about.values.map((v, i) => {
              const Icon = valueIcons[i] || Shield;
              return (
                <div key={v.title} className="group h-full rounded-2xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-brand-200 transition-all text-center">
                  <div className="flex h-14 w-14 mx-auto items-center justify-center rounded-2xl bg-brand-50 text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-brand-900">{v.title}</h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow={t.about.timelineEyebrow}
            title={t.about.timelineTitle}
          />
          <div className="mt-10 sm:mt-14 relative">
            <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-brand-100" />
            <ol className="space-y-6 sm:space-y-8">
              {t.about.milestones.map((m, i) => (
                <li key={m.year} className="relative md:grid md:grid-cols-2 md:gap-16">
                  <div className="absolute left-5 md:left-1/2 top-5 -translate-x-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-gold-500 text-white text-sm font-bold ring-4 ring-white shadow-md z-10">
                    {i + 1}
                  </div>
                  <div className={`pl-14 md:pl-0 ${i % 2 === 0 ? 'md:col-start-1 md:text-right' : 'md:col-start-2'}`}>
                    <div className="rounded-2xl bg-gray-50 p-5 sm:p-6 border border-gray-100 hover:shadow-md hover:border-brand-200 transition-all">
                      <span className="font-display text-xl sm:text-2xl font-extrabold text-brand-700">{m.year}</span>
                      <p className="mt-1 text-sm text-gray-600 leading-relaxed">{m.text}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-brand-700 to-brand-900">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
            {t.about.ctaTitle}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/80">
            {t.about.ctaDesc}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold-500 px-7 py-3.5 sm:py-4 text-base font-bold text-white shadow-xl hover:bg-gold-600 hover:scale-105 transition-all"
            >
              {t.about.contactUs}
              <ArrowRight className="h-5 w-5" />
            </Link>
            <a
              href={contact.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 backdrop-blur border border-white/30 px-7 py-3.5 sm:py-4 text-base font-bold text-white hover:bg-white/20 transition-all"
            >
              <Phone className="h-5 w-5" />
              {contact.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
