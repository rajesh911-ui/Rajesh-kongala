import React, { useState } from 'react';
import { ConfettiCelebration } from './ConfettiCelebration';

interface RegistrationSectionProps {
  onGoToFullCheckout: () => void;
}

export const RegistrationSection: React.FC<RegistrationSectionProps> = ({ onGoToFullCheckout }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    level: 'beginner'
  });
  const [submitted, setSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim()) {
      setErrorMsg('Please enter your full name and email address.');
      return;
    }
    setErrorMsg('');
    setSubmitted(true);
    setShowConfetti(true);
  };

  return (
    <section className="section-box relative z-10" id="register">
      <div className="max-w-4xl mx-auto">
        <div className="p-8 sm:p-12 bg-[#0b0b0d] border-2 border-[#e0e0e6] shadow-2xl relative overflow-hidden">
          {/* Top Tag */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[rgba(224,224,230,0.1)]">
            <div className="label">// 05_ENROLLMENT_PORTAL</div>
            <div className="font-mono text-xs text-[#00ff7f]">STATUS: 14 SEATS REMAINING</div>
          </div>

          <div className="mb-8">
            <h2 className="font-headline font-extrabold text-3xl sm:text-4xl uppercase tracking-[-0.04em] text-[#e0e0e6]">
              INSTANT REGISTRATION CONSOLE
            </h2>
            <p className="font-body text-sm text-[rgba(224,224,230,0.6)] mt-2 leading-relaxed">
              Lock in your cohort placement now. Receive instant access to Discord channels, template repositories, and live office hours.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 border-2 border-[#00ff7f] bg-[rgba(0,255,127,0.03)] text-center relative">
              {showConfetti && (
                <ConfettiCelebration
                  durationMs={4500}
                  onComplete={() => setShowConfetti(false)}
                />
              )}
              <div className="w-14 h-14 border-2 border-[#00ff7f] text-[#00ff7f] flex items-center justify-center mx-auto mb-4 text-2xl font-mono">
                ✓
              </div>
              <h3 className="font-headline text-2xl font-bold uppercase text-[#e0e0e6]">
                REGISTRATION CONFIRMED // ADMITTED
              </h3>
              <p className="font-body text-sm text-[rgba(224,224,230,0.7)] mt-2 max-w-md mx-auto">
                Welcome to the cohort, <strong className="text-[#00ff7f]">{formData.fullName}</strong>! A verification pass and Discord invitation has been dispatched to <em>{formData.email}</em>.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={onGoToFullCheckout}
                  className="btn btn-primary cursor-pointer"
                >
                  UPGRADE TO PRO PASS [$199]
                </button>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setShowConfetti(false);
                  }}
                  className="btn cursor-pointer"
                >
                  REGISTER ANOTHER STUDENT
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMsg && (
                <div className="p-3 border border-red-500/50 bg-red-950/20 text-red-400 font-mono text-xs">
                  [ERROR]: {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-mono text-xs text-[rgba(224,224,230,0.7)] uppercase mb-2">
                    // FULL_NAME:
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className="w-full p-3.5 bg-[#111116] border border-[rgba(224,224,230,0.2)] focus:border-[#00ff7f] text-[#e0e0e6] font-mono text-xs outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-[rgba(224,224,230,0.7)] uppercase mb-2">
                    // EMAIL_ADDRESS:
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@example.com"
                    className="w-full p-3.5 bg-[#111116] border border-[rgba(224,224,230,0.2)] focus:border-[#00ff7f] text-[#e0e0e6] font-mono text-xs outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-mono text-xs text-[rgba(224,224,230,0.7)] uppercase mb-2">
                    // PHONE_OPTIONAL:
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 019-2834"
                    className="w-full p-3.5 bg-[#111116] border border-[rgba(224,224,230,0.2)] focus:border-[#00ff7f] text-[#e0e0e6] font-mono text-xs outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-[rgba(224,224,230,0.7)] uppercase mb-2">
                    // EXPERIENCE_LEVEL:
                  </label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    className="w-full p-3.5 bg-[#111116] border border-[rgba(224,224,230,0.2)] focus:border-[#00ff7f] text-[#e0e0e6] font-mono text-xs outline-none transition-colors cursor-pointer"
                  >
                    <option value="beginner">Total Beginner (No Coding Background)</option>
                    <option value="designer">Designer / Creative Professional</option>
                    <option value="marketer">Marketer / Product Builder</option>
                    <option value="founder">Founder / Solopreneur</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <button
                  type="submit"
                  className="btn btn-primary py-4 px-8 cursor-pointer"
                >
                  <span>SUBMIT APPLICATION</span>
                  <span className="material-symbols-outlined text-base">send</span>
                </button>

                <button
                  type="button"
                  onClick={onGoToFullCheckout}
                  className="font-mono text-xs text-[#00ff7f] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>OR COMPLETE INSTANT VIP ENROLLMENT ($199)</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
