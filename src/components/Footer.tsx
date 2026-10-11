import React, { useState } from 'react';

interface FooterProps {
  onNavigate: (view: 'landing' | 'checkout' | 'hologram', targetSection?: string) => void;
  isCheckoutView?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, isCheckoutView: _isCheckoutView = false }) => {
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const email = 'rajeshkongala@gmail.com';

  const handleNav = (sectionId: string) => {
    onNavigate('landing', sectionId);
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer className="border-t-2 border-[#e0e0e6] px-6 md:px-12 py-8 bg-[#0b0b0d] relative z-20">
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 font-mono text-xs">
          <div className="text-[#e0e0e6] font-bold">
            © 2026 AI ACADEMY // TECHNICAL SYSTEM
          </div>
          <div className="text-[rgba(224,224,230,0.4)] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#00ff7f]"></span>
            <span>SYNAPSE_OS v3.0_STABLE</span>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-xs">
          <button
            onClick={() => handleNav('hero')}
            className="text-[rgba(224,224,230,0.6)] hover:text-[#00ff7f] transition-colors cursor-pointer uppercase"
          >
            // HOME
          </button>
          <button
            onClick={() => handleNav('course')}
            className="text-[rgba(224,224,230,0.6)] hover:text-[#00ff7f] transition-colors cursor-pointer uppercase"
          >
            // COURSE
          </button>
          <button
            onClick={() => handleNav('curriculum')}
            className="text-[rgba(224,224,230,0.6)] hover:text-[#00ff7f] transition-colors cursor-pointer uppercase"
          >
            // SYLLABUS
          </button>
          <button
            onClick={() => handleNav('testimonials')}
            className="text-[rgba(224,224,230,0.6)] hover:text-[#00ff7f] transition-colors cursor-pointer uppercase"
          >
            // AUDIT_LOGS
          </button>
          <button
            onClick={() => onNavigate('checkout')}
            className="text-[#00ff7f] font-bold hover:underline transition-colors cursor-pointer uppercase"
          >
            // ENROLL [$199]
          </button>
          <a
            href={`mailto:${email}`}
            className="text-[rgba(224,224,230,0.6)] hover:text-[#00ff7f] transition-colors"
          >
            {email}
          </a>
          <button
            onClick={() => setPrivacyModalOpen(true)}
            className="text-[rgba(224,224,230,0.4)] hover:text-[#e0e0e6] transition-colors cursor-pointer"
          >
            PRIVACY_NOTICE
          </button>
        </div>
      </div>

      {privacyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4">
          <div className="bg-[#0b0b0d] border-2 border-[#e0e0e6] max-w-md w-full p-6 text-left relative font-mono text-xs text-[#e0e0e6]">
            <button
              onClick={() => setPrivacyModalOpen(false)}
              className="absolute top-4 right-4 text-[rgba(224,224,230,0.6)] hover:text-[#00ff7f]"
            >
              <span className="material-symbols-outlined text-base">close</span>
            </button>
            <div className="text-[#00ff7f] font-bold text-sm mb-2">// PRIVACY_NOTICE</div>
            <p className="text-[rgba(224,224,230,0.8)] leading-relaxed mb-4">
              All student enrollment credentials, project code, and payment transaction metadata are encrypted. We never resell or commercialize student data.
            </p>
            <button
              onClick={() => setPrivacyModalOpen(false)}
              className="btn btn-primary w-full py-2 text-xs"
            >
              ACKNOWLEDGE
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};
