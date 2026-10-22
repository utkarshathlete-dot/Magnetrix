import React, { useState } from 'react';
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Settings,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Play,
  Instagram,
} from 'lucide-react';
import {
  saveLeadToLedger,
  validateContactForm,
  getConnectedSheetUrl,
} from '../utils/contactSheet';
import { Language, getTranslation } from '../utils/translations';

interface ContactPageProps {
  onNavigateHome: () => void;
  onOpenConsultation?: (topic?: string) => void;
  language?: Language;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onNavigateHome,
  language = 'en',
}) => {
  const t = getTranslation(language);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateContactForm({
      firstName,
      lastName,
      email,
      phone,
      service,
      message,
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const sheetUrl = getConnectedSheetUrl();

    // Save lead into ledger & trigger sync with the connected sheet
    saveLeadToLedger({
      name: `${firstName} ${lastName}`.trim() || firstName,
      email: email.trim(),
      phone: phone.trim(),
      companyOrWebsite: 'Direct Inbound',
      monthlyBudget: 'Enterprise / Custom',
      serviceOrDiscipline: service || 'General Growth Architecture',
      message: message.trim() || 'Direct Inquiry from Contact Page',
      sourceForm: 'Reference Contact Form',
      syncStatus: 'synced',
    });

    // Fire background webhook/fetch to the Excel/Google sheet endpoint if configured
    try {
      if (sheetUrl && sheetUrl.startsWith('http')) {
        // Attempt fetch in background (non-blocking for user experience)
        fetch(sheetUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            phone,
            service,
            message,
            timestamp: new Date().toISOString(),
          }),
        }).catch(() => {
          // Fallback handled via localStorage ledger
        });
      }
    } catch {
      // Ignored - lead is already saved in persistent ledger
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 400);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setService('');
    setMessage('');
  };

  return (
    <div className="w-full relative z-20 min-h-screen py-8 sm:py-12 px-4 sm:px-8 lg:px-14 flex flex-col justify-center bg-[#07080b] bg-[radial-gradient(ellipse_at_30%_50%,rgba(220,38,38,0.12),transparent_70%)]">
      {/* Top Back to Overview Navigation */}
      <div className="max-w-[1400px] w-full mx-auto mb-6 sm:mb-8 flex items-center justify-between">
        <button
          type="button"
          onClick={onNavigateHome}
          className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-300 hover:text-white transition-colors cursor-pointer group bg-black/40 hover:bg-black/70 px-4 py-2 rounded-xl border border-white/10 backdrop-blur-md"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>{t.backToOverview}</span>
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-neutral-400">
          <span>Magentrix</span>
          <span>/</span>
          <span className="text-white">{t.navContact}</span>
        </div>
      </div>

      {/* Main Split Layout: Robot on Left, Exact Card on Right */}
      <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Robot Visual matching reference image */}
        <div className="lg:col-span-5 relative w-full h-[380px] sm:h-[480px] lg:h-[660px] flex items-center justify-center overflow-hidden">
          {/* Glowing Red Sparks & Ambient Backdrop */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-600/25 via-transparent to-transparent blur-3xl pointer-events-none" />

          {/* Reference Robot Artwork Cropped for Left Stage */}
          <img
            src="/assets/aistudio/Magentrix__1__4533236d.png"
            alt="Magentrix Cybernetic Growth Architecture"
            className="absolute left-0 top-0 h-full w-[215%] object-cover object-left pointer-events-none select-none drop-shadow-[0_0_35px_rgba(239,68,68,0.4)]"
            style={{ objectPosition: '0% 50%' }}
          />

          {/* Right edge fade gradient to blend seamlessly into background */}
          <div className="absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-black/95 via-black/40 to-transparent pointer-events-none" />
        </div>

        {/* Right Column: Contact Card matching reference image */}
        <div className="lg:col-span-7 relative">
          {/* Subtle Outer Red Halo Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-red-600/35 to-red-900/15 rounded-[32px] blur-xl opacity-80 pointer-events-none" />

          <div className="relative rounded-[28px] border border-red-500/40 bg-[#0a0d12]/95 backdrop-blur-2xl p-6 sm:p-9 lg:p-10 shadow-[0_0_40px_rgba(239,68,68,0.2)]">
            {/* Top Card Header with Kicker, Heading, and Social Icons */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
              <div>
                <span className="text-red-500 font-bold tracking-wider text-xs sm:text-sm uppercase block mb-1.5">
                  {t.contactKicker}
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-white tracking-tight leading-[1.1]">
                  {t.contactTitleLine1}
                  <br />
                  {t.contactTitleLine2}
                </h1>
              </div>

              {/* Social Media Icons matching reference image */}
              <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 pt-1">
                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white hover:scale-105 transition-transform shadow-md"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-[#0077b5] flex items-center justify-center text-white font-bold text-xs hover:scale-105 transition-transform shadow-md"
                  aria-label="LinkedIn"
                >
                  in
                </a>

                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-[#1877f2] flex items-center justify-center text-white font-bold text-xs hover:scale-105 transition-transform shadow-md"
                  aria-label="Facebook"
                >
                  f
                </a>

                {/* X / Twitter */}
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-black border border-white/20 flex items-center justify-center text-white hover:scale-105 transition-transform shadow-md"
                  aria-label="X (formerly Twitter)"
                >
                  <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-[#ff0000] flex items-center justify-center text-white hover:scale-105 transition-transform shadow-md"
                  aria-label="YouTube"
                >
                  <Play className="w-3.5 h-3.5 fill-white text-white" />
                </a>
              </div>
            </div>

            {/* Subtitle */}
            <p className="text-neutral-300 text-xs sm:text-sm font-normal leading-relaxed mb-6 max-w-xl">
              {t.contactSubtitle}
            </p>

            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-red-600/20 border border-red-500/40 text-red-500 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(239,68,68,0.4)]">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  {t.contactSuccessTitle}
                </h3>
                <p className="text-neutral-300 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                  {t.contactSuccessMessage}
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-[0_4px_20px_rgba(239,68,68,0.4)] cursor-pointer"
                  >
                    {t.contactSendAnother}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                {/* Row 1: First Name & Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#12161c]/90 border border-white/10 focus-within:border-red-500 transition-colors">
                      <User className="w-4 h-4 text-neutral-400 shrink-0" />
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => {
                          setFirstName(e.target.value);
                          if (errors.firstName) setErrors((prev) => ({ ...prev, firstName: '' }));
                        }}
                        placeholder={t.contactFirstNamePlaceholder}
                        className="w-full bg-transparent text-white text-xs sm:text-sm placeholder-neutral-400 outline-none"
                      />
                    </div>
                    {errors.firstName && (
                      <div className="text-[11px] text-red-400 mt-1 pl-1">{errors.firstName}</div>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#12161c]/90 border border-white/10 focus-within:border-red-500 transition-colors">
                      <User className="w-4 h-4 text-neutral-400 shrink-0" />
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder={t.contactLastNamePlaceholder}
                        className="w-full bg-transparent text-white text-xs sm:text-sm placeholder-neutral-400 outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2: Email Address & Phone Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#12161c]/90 border border-white/10 focus-within:border-red-500 transition-colors">
                      <Mail className="w-4 h-4 text-neutral-400 shrink-0" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                        }}
                        placeholder={t.contactEmailPlaceholder}
                        className="w-full bg-transparent text-white text-xs sm:text-sm placeholder-neutral-400 outline-none"
                      />
                    </div>
                    {errors.email && (
                      <div className="text-[11px] text-red-400 mt-1 pl-1">{errors.email}</div>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#12161c]/90 border border-white/10 focus-within:border-red-500 transition-colors">
                      <Phone className="w-4 h-4 text-neutral-400 shrink-0" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                        }}
                        placeholder={t.contactPhonePlaceholder}
                        className="w-full bg-transparent text-white text-xs sm:text-sm placeholder-neutral-400 outline-none"
                      />
                    </div>
                    {errors.phone && (
                      <div className="text-[11px] text-red-400 mt-1 pl-1">{errors.phone}</div>
                    )}
                  </div>
                </div>

                {/* Row 3: Select Your Service */}
                <div className="relative">
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#12161c]/90 border border-white/10 focus-within:border-red-500 transition-colors">
                    <Settings className="w-4 h-4 text-neutral-400 shrink-0" />
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full bg-transparent text-white text-xs sm:text-sm outline-none appearance-none cursor-pointer pr-6"
                    >
                      <option value="" className="bg-[#12161c] text-neutral-400">
                        {t.contactServicePlaceholder}
                      </option>
                      <option value="Technical SEO & Entity Architecture" className="bg-[#12161c] text-white">
                        SEO & Organic Dominance
                      </option>
                      <option value="Algorithmic Paid Search & Social Performance" className="bg-[#12161c] text-white">
                        Google Ads & Paid Social (PMax)
                      </option>
                      <option value="Social Media & Performance Creative" className="bg-[#12161c] text-white">
                        Social Media & Motion Creative
                      </option>
                      <option value="Scientific Conversion Rate Optimization" className="bg-[#12161c] text-white">
                        Conversion Rate Optimization (CRO)
                      </option>
                      <option value="Marketing Automation & Telemetry Architecture" className="bg-[#12161c] text-white">
                        Server-Side CAPI & Attribution Telemetry
                      </option>
                      <option value="Full-Funnel Growth Partner" className="bg-[#12161c] text-white">
                        Full-Funnel Retained Growth Partner
                      </option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-neutral-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Row 4: Message Textarea */}
                <div>
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-[#12161c]/90 border border-white/10 focus-within:border-red-500 transition-colors">
                    <MessageSquare className="w-4 h-4 text-neutral-400 mt-0.5 shrink-0" />
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={t.contactMessagePlaceholder}
                      className="w-full bg-transparent text-white text-xs sm:text-sm placeholder-neutral-400 outline-none resize-none leading-relaxed"
                    />
                  </div>
                </div>

                {/* Row 5: Send Message Button on Left, Direct Contact Details on Right */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  {/* Send Message Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-sm rounded-xl transition-all shadow-[0_4px_25px_rgba(239,68,68,0.45)] flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] shrink-0"
                  >
                    <span>{isSubmitting ? t.contactSending : t.contactSendMessage}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {/* Direct Contact Info Lockup from reference image */}
                  <div className="flex flex-col sm:items-end gap-1.5 text-xs text-neutral-300 w-full sm:w-auto">
                    <a
                      href="tel:+919211374014"
                      className="flex items-center gap-2 hover:text-white transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-neutral-400" />
                      <span className="font-mono">+91 9211374014</span>
                    </a>
                    <a
                      href="mailto:Magnetrix.digital@gmail.com"
                      className="flex items-center gap-2 hover:text-white transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Magnetrix.digital@gmail.com</span>
                    </a>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
