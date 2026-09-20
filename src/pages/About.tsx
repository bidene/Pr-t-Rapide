import { Link } from 'react-router-dom';
import {
  Target, Eye, Heart, Award, Users, Shield, Clock, TrendingDown,
  ArrowRight, Phone, Star, Quote,
} from 'lucide-react';
import SectionTitle from '@/components/SectionTitle';
import { contact, images } from '@/data/site';
import { useLanguage } from '@/i18n/LanguageContext';

const valueIcons = [Shield, Heart, Clock, TrendingDown];

export default function About() {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={images.paris} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 hero-gradient" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-gold-300 mb-3">{t.about.eyebrow}</span>
            <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white leading-tight">
              {t.about.heroTitle}
            </h1>
            <p className="mt-6 text-lg text-white/85 leading-relaxed">
              {t.about.heroDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Histoire */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="relative">
              <img src={images.haussmann} alt="" className="rounded-3xl shadow-2xl object-cover w-full h-[460px]" />
              <div className="absolute -top-6 -left-6 rounded-2xl bg-gold-500 px-6 py-4 shadow-xl hidden sm:block">
                <p className="font-display text-3xl font-extrabold text-white">{t.about.yearsExp}</p>
                <p className="text-sm text-white/90">{t.about.yearsExpLabel}</p>
              </div>
            </div>
            <div>
              <SectionTitle
                eyebrow={t.about.storyEyebrow}
                title={t.about.storyTitle}
                center={false}
              />
              <div className="mt-6 space-y-4 text-gray-600 leading-relaxed">
                <p>{t.about.storyP1}</p>
                <p>{t.about.storyP2}</p>
                <p>{t.about.storyP3}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Valeurs */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3 mb-16">
            <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 mb-5">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-brand-900">{t.about.missionTitle}</h3>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">{t.about.missionDesc}</p>
            </div>
            <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-50 text-gold-600 mb-5">
                <Eye className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-brand-900">{t.about.visionTitle}</h3>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">{t.about.visionDesc}</p>
            </div>
            <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600 mb-5">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-brand-900">{t.about.commitmentTitle}</h3>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">{t.about.commitmentDesc}</p>
            </div>
          </div>

          <SectionTitle
            eyebrow={t.about.valuesEyebrow}
            title={t.about.valuesTitle}
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.about.values.map((v, i) => {
              const Icon = valueIcons[i] || Shield;
              return (
                <div key={v.title} className="group rounded-2xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all text-center">
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
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow={t.about.timelineEyebrow}
            title={t.about.timelineTitle}
          />
          <div className="mt-14 relative">
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-brand-100 sm:-translate-x-1/2" />
            <div className="space-y-8">
              {t.about.milestones.map((m, i) => (
                <div key={m.year} className={`relative flex items-start gap-6 sm:gap-0 ${i % 2 === 0 ? 'sm:flex-row-reverse' : ''}`}>
                  <div className="hidden sm:block flex-1" />
                  <div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-gold-500 text-white text-xs font-bold ring-4 ring-white z-10">
                    {i + 1}
                  </div>
                  <div className="flex-1 pl-12 sm:pl-0 sm:px-8">
                    <div className="rounded-2xl bg-gray-50 p-5 border border-gray-100 hover:shadow-md transition-shadow">
                      <span className="font-display text-xl font-extrabold text-brand-700">{m.year}</span>
                      <p className="mt-1 text-sm text-gray-600 leading-relaxed">{m.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-24 bg-brand-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            light
            eyebrow={t.about.testimonialsEyebrow}
            title={t.about.testimonialsTitle}
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {t.about.testimonials.map((tm) => (
              <div key={tm.name} className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 p-7">
                <Quote className="h-8 w-8 text-gold-400" />
                <p className="mt-4 text-white/85 leading-relaxed text-sm">"{tm.text}"</p>
                <div className="mt-5 flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-gold-400 fill-gold-400" />
                  ))}
                </div>
                <div className="mt-3">
                  <p className="font-bold text-white text-sm">{tm.name}</p>
                  <p className="text-xs text-white/60">{tm.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-brand-700 to-brand-900">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            {t.about.ctaTitle}
          </h2>
          <p className="mt-4 text-lg text-white/80">
            {t.about.ctaDesc}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-gold-500 px-7 py-4 text-base font-bold text-white shadow-xl hover:bg-gold-600 hover:scale-105 transition-all"
            >
              {t.about.contactUs}
              <ArrowRight className="h-5 w-5" />
            </Link>
            <a
              href={contact.phoneHref}
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur border border-white/30 px-7 py-4 text-base font-bold text-white hover:bg-white/20 transition-all"
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
