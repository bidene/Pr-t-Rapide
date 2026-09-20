type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
};

export default function SectionTitle({ eyebrow, title, subtitle, center = true, light = false }: Props) {
  return (
    <div className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <span className={`inline-block text-xs font-bold uppercase tracking-[0.18em] mb-3 ${light ? 'text-gold-300' : 'text-gold-600'}`}>
          {eyebrow}
        </span>
      )}
      <h2 className={`font-display text-3xl sm:text-4xl font-extrabold leading-tight ${light ? 'text-white' : 'text-brand-900'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base sm:text-lg leading-relaxed ${light ? 'text-white/80' : 'text-gray-600'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
