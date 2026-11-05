import { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, BadgeCheck } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const AUTOPLAY_MS = 6000;

// Une couleur d'avatar par client, pour les distinguer d'un coup d'œil
const avatarColors = [
  'from-brand-500 to-brand-700',
  'from-gold-400 to-gold-600',
  'from-emerald-500 to-teal-600',
  'from-rose-500 to-pink-600',
  'from-violet-500 to-indigo-600',
];

export default function Testimonials() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const testimonials = t.about.testimonials;
  const count = testimonials.length;

  // Défilement automatique, mis en pause au survol et relancé après chaque changement
  useEffect(() => {
    if (paused) return;
    const timeout = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % count);
    }, AUTOPLAY_MS);
    return () => clearTimeout(timeout);
  }, [currentIndex, paused, count]);

  const goToSlide = (index: number) => setCurrentIndex(index);
  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % count);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + count) % count);

  const colorFor = (index: number) => avatarColors[index % avatarColors.length];

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden bg-gradient-to-b from-gray-50 via-white to-brand-50/60">
      {/* Halos décoratifs */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-brand-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-gold-200/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:gap-16 lg:grid-cols-12 items-center">
          {/* Colonne gauche : titre, chiffres clés, sélection du client */}
          <div className="min-w-0 lg:col-span-5 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full bg-gold-50 border border-gold-200 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-gold-700">
              <Star className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />
              {t.about.testimonialsEyebrow}
            </span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-brand-900 leading-tight">
              {t.about.testimonialsTitle}
            </h2>

            <div className="mt-8 grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0">
              <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-4 sm:p-5">
                <p className="font-display text-3xl font-extrabold text-brand-700">98 %</p>
                <div className="mt-1 flex justify-center lg:justify-start gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 text-gold-400 fill-gold-400" />
                  ))}
                </div>
                <p className="mt-1.5 text-xs sm:text-sm text-gray-600">{t.home.stats.satisfaction}</p>
              </div>
              <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-4 sm:p-5">
                <p className="font-display text-3xl font-extrabold text-brand-700">15 000+</p>
                <div className="mt-1 flex justify-center lg:justify-start -space-x-2">
                  {testimonials.map((item, i) => (
                    <span
                      key={item.name}
                      className={`h-5 w-5 rounded-full ring-2 ring-white bg-gradient-to-br ${colorFor(i)} flex items-center justify-center text-[9px] font-bold text-white`}
                    >
                      {item.name.charAt(0)}
                    </span>
                  ))}
                </div>
                <p className="mt-1.5 text-xs sm:text-sm text-gray-600">{t.home.stats.clients}</p>
              </div>
            </div>

            {/* Liste des clients (ordinateur) */}
            <div className="mt-8 hidden lg:flex flex-col gap-2">
              {testimonials.map((item, index) => {
                const active = index === currentIndex;
                return (
                  <button
                    key={item.name}
                    onClick={() => goToSlide(index)}
                    className={`group flex items-center gap-3 rounded-2xl px-4 py-3 text-left transition-all duration-300 ${
                      active
                        ? 'bg-white shadow-lg shadow-brand-900/5 ring-1 ring-brand-100'
                        : 'hover:bg-white/70'
                    }`}
                  >
                    <span
                      className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${colorFor(index)} font-bold text-white transition-transform ${
                        active ? 'scale-110' : 'opacity-70 group-hover:opacity-100'
                      }`}
                    >
                      {item.name.charAt(0)}
                    </span>
                    <span className="min-w-0">
                      <span className={`block font-semibold text-sm ${active ? 'text-brand-900' : 'text-gray-700'}`}>
                        {item.name}
                      </span>
                      <span className="block text-xs text-gray-500 truncate">{item.role}</span>
                    </span>
                    <span
                      className={`ml-auto h-8 w-1 rounded-full transition-colors ${active ? 'bg-gold-400' : 'bg-transparent'}`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Colonne droite : témoignage mis en avant */}
          <div
            className="min-w-0 lg:col-span-7"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="relative">
              {/* Carte décalée derrière, pour la profondeur */}
              <div className="absolute inset-0 translate-x-3 translate-y-3 sm:translate-x-5 sm:translate-y-5 rounded-[2rem] bg-gradient-to-br from-brand-600 to-brand-800" />

              <div className="relative overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-brand-900/10 border border-gray-100">
                <div
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {testimonials.map((item, index) => (
                    <figure
                      key={item.name}
                      className="w-full flex-shrink-0 p-7 sm:p-10 lg:p-12"
                      aria-hidden={index !== currentIndex}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-300 to-gold-500 shadow-lg shadow-gold-500/30">
                          <Quote className="h-6 w-6 sm:h-7 sm:w-7 text-white fill-white" />
                        </span>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 text-gold-400 fill-gold-400" />
                          ))}
                        </div>
                      </div>

                      <blockquote className="mt-6 sm:mt-8 font-display text-lg sm:text-xl lg:text-2xl font-semibold text-brand-950 leading-relaxed">
                        “{item.text}”
                      </blockquote>

                      <figcaption className="mt-8 flex items-center gap-4 border-t border-gray-100 pt-6">
                        <span
                          className={`flex h-12 w-12 sm:h-14 sm:w-14 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${colorFor(index)} text-lg sm:text-xl font-bold text-white ring-4 ring-gray-50`}
                        >
                          {item.name.charAt(0)}
                        </span>
                        <span>
                          <span className="flex items-center gap-1.5 font-display text-base sm:text-lg font-bold text-brand-900">
                            {item.name}
                            <BadgeCheck className="h-5 w-5 text-brand-500" />
                          </span>
                          <span className="block text-sm text-gray-500">{item.role}</span>
                        </span>
                      </figcaption>
                    </figure>
                  ))}
                </div>

                {/* Barre de progression du défilement automatique */}
                <div className="h-1 w-full bg-gray-100">
                  <div
                    key={currentIndex}
                    className="h-full bg-gradient-to-r from-brand-500 to-gold-400 animate-progress"
                    style={{
                      animationDuration: `${AUTOPLAY_MS}ms`,
                      animationPlayState: paused ? 'paused' : 'running',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-10 sm:mt-12 flex items-center justify-center lg:justify-start gap-4">
              <button
                onClick={prevSlide}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white border border-gray-200 text-brand-700 shadow-sm hover:bg-brand-600 hover:text-white hover:border-brand-600 transition-all"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-2">
                {testimonials.map((item, index) => (
                  <button
                    key={item.name}
                    onClick={() => goToSlide(index)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      index === currentIndex ? 'w-8 bg-brand-600' : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg shadow-brand-600/30 hover:bg-brand-700 transition-all"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              <span className="ml-2 font-display text-sm font-semibold text-gray-400 tabular-nums">
                {String(currentIndex + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
