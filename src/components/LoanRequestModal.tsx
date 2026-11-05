import { useState, useEffect } from 'react';
import { X, User, Mail, Phone, Globe, Euro, Calendar, FileText, Send, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { languages } from '@/i18n/translations';
import { sendToWhatsApp } from '@/lib/whatsapp';

type Props = {
  open: boolean;
  onClose: () => void;
};

const emptyForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  country: '',
  amount: '',
  duration: '',
  project: '',
};

const inputClass =
  'w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none transition-all';
const inputWithIconClass = inputClass.replace('px-4', 'pl-10 pr-4');
const iconClass = 'absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400';

export default function LoanRequestModal({ open, onClose }: Props) {
  const { t, lang } = useLanguage();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const handleClose = () => {
    setForm(emptyForm);
    setSent(false);
    onClose();
  };

  // Fermeture avec la touche Échap + blocage du défilement de la page
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Message rédigé dans la langue choisie par le client
    const language = languages.find((l) => l.code === lang)!;
    sendToWhatsApp(`${t.services.formTitle} — ${language.flag} ${language.label}`, [
      [t.services.firstNameLabel, form.firstName],
      [t.services.lastNameLabel, form.lastName],
      [t.services.emailLabel, form.email],
      [t.services.phoneLabel, form.phone],
      [t.services.countryLabel, form.country],
      [t.services.amountLabel, form.amount ? `${form.amount} €` : ''],
      [t.services.durationLabel, form.duration],
      [t.services.projectLabel, form.project],
    ]);
    setSent(true);
    setTimeout(handleClose, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-scale-in"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="sticky top-0 z-10 bg-white rounded-t-3xl border-b border-gray-100 p-6 flex items-center justify-between">
          <h3 className="font-display text-xl font-bold text-brand-900">{t.services.formTitle}</h3>
          <button
            onClick={handleClose}
            className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
            aria-label="Close"
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
                    <User className={iconClass} />
                    <input type="text" name="firstName" required autoComplete="given-name" value={form.firstName} onChange={handleChange} className={inputWithIconClass} placeholder={t.services.firstNamePlaceholder} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.services.lastNameLabel}</label>
                  <div className="relative">
                    <User className={iconClass} />
                    <input type="text" name="lastName" required autoComplete="family-name" value={form.lastName} onChange={handleChange} className={inputWithIconClass} placeholder={t.services.lastNamePlaceholder} />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.services.emailLabel}</label>
                <div className="relative">
                  <Mail className={iconClass} />
                  <input type="email" name="email" required autoComplete="email" value={form.email} onChange={handleChange} className={inputWithIconClass} placeholder={t.services.emailPlaceholder} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.services.phoneLabel}</label>
                <div className="relative">
                  <Phone className={iconClass} />
                  <input type="tel" name="phone" required autoComplete="tel" value={form.phone} onChange={handleChange} className={inputWithIconClass} placeholder={t.services.phonePlaceholder} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.services.countryLabel}</label>
                <div className="relative">
                  <Globe className={iconClass} />
                  <input type="text" name="country" required autoComplete="country-name" value={form.country} onChange={handleChange} className={inputWithIconClass} placeholder={t.services.countryPlaceholder} />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.services.amountLabel}</label>
                  <div className="relative">
                    <Euro className={iconClass} />
                    <input type="number" name="amount" required min={1} inputMode="numeric" value={form.amount} onChange={handleChange} className={inputWithIconClass} placeholder={t.services.amountPlaceholder} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.services.durationLabel}</label>
                  <div className="relative">
                    <Calendar className={iconClass} />
                    <input type="number" name="duration" required min={1} inputMode="numeric" value={form.duration} onChange={handleChange} className={inputWithIconClass} placeholder={t.services.durationPlaceholder} />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.services.projectLabel}</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                  <textarea name="project" required rows={4} value={form.project} onChange={handleChange} className={`${inputWithIconClass} resize-none`} placeholder={t.services.projectPlaceholder} />
                </div>
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
  );
}
