import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, ExternalLink, FileSpreadsheet } from 'lucide-react';
import { validateInquiryForm } from '../utils/metrics';
import { saveLeadToLedger, getConnectedSheetUrl } from '../utils/contactSheet';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const GetStartedModal: React.FC<GetStartedModalProps> = ({
  isOpen,
  onClose,
  initialService,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [budget, setBudget] = useState('$5k - $15k/mo');
  const [primaryGoal, setPrimaryGoal] = useState(
    initialService || 'Scalable Customer Acquisition'
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sheetUrl = getConnectedSheetUrl();

  // Sync initialService if provided
  React.useEffect(() => {
    if (initialService) {
      setPrimaryGoal(initialService);
    }
  }, [initialService]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateInquiryForm({ name, email, website });
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});

    saveLeadToLedger({
      name,
      email,
      companyOrWebsite: website || 'N/A',
      monthlyBudget: budget,
      serviceOrDiscipline: primaryGoal,
      message: 'Submitted via Strategy Session Modal',
      sourceForm: 'Get Started Modal',
      syncStatus: 'synced',
    });

    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setName('');
    setEmail('');
    setWebsite('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative w-full max-w-lg bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-left">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-white p-2 rounded-full hover:bg-neutral-800 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-6 text-center">
            <div className="w-14 h-14 bg-red-500/10 border border-red-500/30 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Strategy Session Confirmed</h3>
            <p className="text-neutral-400 text-sm mb-6 max-w-md mx-auto">
              Thank you, {name}! Our growth directors will review {website || 'your brand'} and prepare custom acquisition telemetry within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={sheetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>View in Excel Sheet</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-2.5 bg-white text-black font-semibold rounded-xl hover:bg-neutral-200 transition-colors text-xs sm:text-sm"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-xs uppercase tracking-wider text-red-500 font-bold">
                Magentrix Growth Partner
              </span>
              <h2 id="modal-title" className="text-2xl font-bold text-white mt-1">
                Initiate Your Growth Strategy
              </h2>
              <p className="text-neutral-400 text-sm mt-1">
                Tell us about your brand to receive data-backed marketing projections.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white text-sm focus:border-red-500 focus:outline-none transition-colors"
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Work Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@company.com"
                  className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white text-sm focus:border-red-500 focus:outline-none transition-colors"
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Company Website
                </label>
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://yourbrand.com"
                  className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white text-sm focus:border-red-500 focus:outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Monthly Ad Budget
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white text-xs focus:border-red-500 focus:outline-none"
                  >
                    <option>$2.5k - $5k/mo</option>
                    <option>$5k - $15k/mo</option>
                    <option>$15k - $50k/mo</option>
                    <option>$50k+/mo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Primary Goal
                  </label>
                  <select
                    value={primaryGoal}
                    onChange={(e) => setPrimaryGoal(e.target.value)}
                    className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white text-xs focus:border-red-500 focus:outline-none"
                  >
                    <option>Scalable Customer Acquisition</option>
                    <option>High-ROI Paid Ads</option>
                    <option>SEO & Organic Dominance</option>
                    <option>Full Funnel Rebrand</option>
                  </select>
                </div>
              </div>

              {/* Connected Excel Sheet notice */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-[11px] text-emerald-300">
                <div className="flex items-center gap-1.5">
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Auto-syncs to Connected Excel Sheet</span>
                </div>
                <a
                  href={sheetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-semibold underline flex items-center gap-1 shrink-0"
                >
                  <span>Sheet</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-semibold text-sm rounded-xl transition-all shadow-[0_4px_20px_rgba(239,68,68,0.3)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Submit Growth Request & Sync</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
