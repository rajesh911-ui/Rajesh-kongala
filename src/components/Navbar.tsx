import React, { useState } from 'react';

interface NavbarProps {
  currentView: 'landing' | 'checkout' | 'hologram';
  onNavigate: (view: 'landing' | 'checkout' | 'hologram', targetSection?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (currentView !== 'landing') {
      onNavigate('landing', sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 h-[60px] px-5 sm:px-8 border-b-2 border-[#e0e0e6] flex justify-between items-center bg-[#0b0b0d]/95 backdrop-blur-md">
      {/* Brand Logo - Syne font with technical notation */}
      <div 
        onClick={() => onNavigate('landing')}
        className="logo font-headline font-extrabold text-base sm:text-lg tracking-tight text-[#e0e0e6] flex items-center gap-2.5 cursor-pointer group"
      >
        <span className="material-symbols-outlined text-[#00ff7f] text-xl group-hover:rotate-12 transition-transform">
          terminal
        </span>
        <span className="tracking-tighter">AI ACADEMY</span>
        <span className="label hidden sm:inline-flex text-[0.6rem] font-mono py-0.5 px-1.5 border border-[#00ff7f] text-[#00ff7f]">
          SYS_v3.0
        </span>
      </div>

      {/* Navigation Links - JetBrains Mono */}
      <nav className="hidden md:flex items-center gap-6 font-mono text-xs">
        <button
          onClick={() => handleNavClick('hero')}
          className={`transition-colors cursor-pointer uppercase ${
            currentView === 'landing' ? 'text-[#00ff7f] font-bold' : 'text-[rgba(224,224,230,0.6)] hover:text-[#e0e0e6]'
          }`}
        >
          // 01_HOME
        </button>
        <button
          onClick={() => handleNavClick('course')}
          className="text-[rgba(224,224,230,0.6)] hover:text-[#00ff7f] transition-colors cursor-pointer uppercase"
        >
          // 02_COURSE
        </button>
        <button
          onClick={() => handleNavClick('curriculum')}
          className="text-[rgba(224,224,230,0.6)] hover:text-[#00ff7f] transition-colors cursor-pointer uppercase"
        >
          // 03_SYLLABUS
        </button>
        <button
          onClick={() => handleNavClick('testimonials')}
          className="text-[rgba(224,224,230,0.6)] hover:text-[#00ff7f] transition-colors cursor-pointer uppercase"
        >
          // 04_AUDIT_LOGS
        </button>
        <button
          onClick={() => handleNavClick('contact')}
          className="text-[rgba(224,224,230,0.6)] hover:text-[#00ff7f] transition-colors cursor-pointer uppercase"
        >
          // 05_CONTACT
        </button>
      </nav>

      {/* Right Actions & Telemetry Badge */}
      <div className="flex items-center gap-3">
        {/* System Online Badge */}
        <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 border border-[rgba(224,224,230,0.15)] bg-[rgba(255,255,255,0.02)] text-[0.62rem] font-mono text-[#00ff7f]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00ff7f] animate-pulse"></span>
          <span>ONLINE // 100%</span>
        </div>

        {/* 3D Hologram Toggle */}
        <button
          onClick={() => onNavigate(currentView === 'hologram' ? 'landing' : 'hologram')}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 border border-[rgba(224,224,230,0.2)] hover:border-[#00ff7f] text-xs font-mono text-[rgba(224,224,230,0.8)] hover:text-[#00ff7f] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">view_in_ar</span>
          <span>{currentView === 'hologram' ? 'CLOSE 3D' : '3D CANVAS'}</span>
        </button>

        {/* Brutalist Primary Action Button */}
        <button
          onClick={() => onNavigate('checkout')}
          className="btn btn-primary py-1.5 px-4 text-xs tracking-wider cursor-pointer font-bold"
        >
          {currentView === 'checkout' ? 'CHECKOUT ACTIVE' : 'ENROLL [$199]'}
        </button>

        {/* Mobile Menu Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 border border-[rgba(224,224,230,0.2)] text-[#e0e0e6] hover:text-[#00ff7f] cursor-pointer"
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined text-xl">
            {mobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-[60px] left-0 right-0 bg-[#0b0b0d] border-b-2 border-[#e0e0e6] p-6 flex flex-col gap-4 font-mono text-xs z-50">
          <button
            onClick={() => handleNavClick('hero')}
            className="text-left py-2 border-b border-[rgba(224,224,230,0.1)] text-[#00ff7f]"
          >
            // 01_HOME
          </button>
          <button
            onClick={() => handleNavClick('course')}
            className="text-left py-2 border-b border-[rgba(224,224,230,0.1)] text-[rgba(224,224,230,0.8)]"
          >
            // 02_COURSE
          </button>
          <button
            onClick={() => handleNavClick('curriculum')}
            className="text-left py-2 border-b border-[rgba(224,224,230,0.1)] text-[rgba(224,224,230,0.8)]"
          >
            // 03_SYLLABUS
          </button>
          <button
            onClick={() => handleNavClick('testimonials')}
            className="text-left py-2 border-b border-[rgba(224,224,230,0.1)] text-[rgba(224,224,230,0.8)]"
          >
            // 04_AUDIT_LOGS
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className="text-left py-2 border-b border-[rgba(224,224,230,0.1)] text-[rgba(224,224,230,0.8)]"
          >
            // 05_CONTACT
          </button>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onNavigate('hologram'); }}
              className="btn btn-secondary w-full text-center py-2"
            >
              LAUNCH 3D CANVAS
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onNavigate('checkout'); }}
              className="btn btn-primary w-full text-center py-2"
            >
              ENROLL NOW [$199]
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
