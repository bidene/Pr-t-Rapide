import { MessageCircle } from 'lucide-react';
import { contact } from '@/data/site';
import { useLanguage } from '@/i18n/LanguageContext';

export default function WhatsAppButton() {
  const { t } = useLanguage();
  return (
    <a
      href={contact.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-3 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2 rounded-full bg-green-500 p-3 sm:px-4 sm:py-3.5 text-white font-semibold shadow-xl shadow-green-500/40 hover:bg-green-600 hover:scale-105 transition-all group"
      aria-label={t.whatsapp}
    >
      <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
      <span className="hidden sm:inline text-sm">{t.whatsapp}</span>
    </a>
  );
}
