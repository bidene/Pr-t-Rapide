import { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

export default function Testimonials() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = t.about.testimonials;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 sm:py-24 bg-gray-50 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-gold-600">
            {t.about.testimonialsEyebrow}
          </span>
          <h2 className="mt-3 font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-900">
            {t.about.testimonialsTitle}
          </h2>
        </div>

        <div className="relative">
          {/* Main testimonial display */}
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="max-w-3xl mx-auto">
                    <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 lg:p-12 border border-gray-100">
                      <Quote className="absolute top-4 sm:top-8 left-4 sm:left-8 h-8 w-8 sm:h-12 sm:w-12 text-gold-200" />
                      <div className="relative z-10">
                        <div className="flex items-center gap-1 mb-4 sm:mb-6">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 text-gold-400 fill-gold-400" />
                          ))}
                        </div>
                        <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed mb-6 sm:mb-8 italic">
                          "{testimonial.text}"
                        </p>
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-bold text-lg sm:text-xl">
                            {testimonial.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-display font-bold text-brand-900 text-base sm:text-lg">
                              {testimonial.name}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-600">{testimonial.role}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-6 sm:w-8 bg-brand-600'
                    : 'w-3 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 lg:-translate-x-12 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-brand-600 hover:bg-brand-50 hover:scale-110 transition-all"
            aria-label="Previous testimonial"
          >
            <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 lg:translate-x-12 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-brand-600 hover:bg-brand-50 hover:scale-110 transition-all"
            aria-label="Next testimonial"
          >
            <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Mini preview cards */}
        <div className="mt-12 sm:mt-16 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              onClick={() => goToSlide(index)}
              className={`p-3 sm:p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-brand-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    index === currentIndex
                      ? 'bg-white text-brand-600'
                      : 'bg-brand-100 text-brand-600'
                  }`}
                >
                  {testimonial.name.charAt(0)}
                </div>
                <p className="font-semibold text-sm truncate">{testimonial.name}</p>
              </div>
              <p className="text-xs opacity-80 line-clamp-2">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
