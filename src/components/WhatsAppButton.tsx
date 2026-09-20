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
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-green-500 px-4 py-3.5 text-white font-semibold shadow-xl shadow-green-500/40 hover:bg-green-600 hover:scale-105 transition-all group"
      aria-label={t.whatsapp}
    >
      <MessageCircle className="h-6 w-6" />
      <span className="hidden sm:inline text-sm">{t.whatsapp}</span>
    </a>
  );
}
