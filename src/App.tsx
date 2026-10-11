import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutCourse } from './components/AboutCourse';
import { CoreCapabilities } from './components/CoreCapabilities';
import { Curriculum } from './components/Curriculum';
import { StudentTestimonials } from './components/StudentTestimonials';
import { RegistrationSection } from './components/RegistrationSection';
import { ContactSection } from './components/ContactSection';
import { EnrollmentCheckout } from './components/EnrollmentCheckout';
import { HologramCanvasModal } from './components/HologramCanvasModal';
import { ScrollScreenBackground } from './components/ScrollScreenBackground';
import { Footer } from './components/Footer';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'checkout' | 'hologram'>('landing');
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track scroll progress for subtle top header line
  useEffect(() => {
    const onScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress((window.scrollY / docHeight) * 100);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Listen to hash changes for deep linking (e.g. #register, #curriculum, #course)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#enroll' || hash === '#checkout') {
        setCurrentView('checkout');
      } else if (hash === '#3d' || hash === '#hologram') {
        setCurrentView('hologram');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleNavigate = (view: 'landing' | 'checkout' | 'hologram', targetSection?: string) => {
    setCurrentView(view);
    if (view === 'landing' && targetSection) {
      setTimeout(() => {
        const el = document.getElementById(targetSection);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-[#e0e0e6] flex flex-col font-body selection:bg-[#00ff7f] selection:text-[#0b0b0d] relative overflow-x-hidden">
      {/* 300-Frame Image Sequencer / Technical Canvas Background */}
      <ScrollScreenBackground currentView={currentView} />

      {/* Top Laser Progress Bar Linked to Screen Scroll */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-transparent z-50 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#00ff7f] via-[#85ffbe] to-[#00ff7f] shadow-[0_0_12px_#00ff7f] transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Screen Mode Switcher Floating Bar */}
      <div className="fixed bottom-6 right-6 z-40 bg-[#0b0b0d]/95 backdrop-blur-md border border-[rgba(224,224,230,0.2)] p-1 shadow-2xl flex items-center gap-1 text-xs font-mono">
        <button
          onClick={() => handleNavigate('landing')}
          className={`px-3 py-1.5 transition-all flex items-center gap-1.5 cursor-pointer ${
            currentView === 'landing'
              ? 'bg-[#00ff7f] text-[#0b0b0d] font-bold shadow-sm'
              : 'text-[rgba(224,224,230,0.6)] hover:text-[#e0e0e6]'
          }`}
          title="Landing Page Screen"
        >
          <span className="material-symbols-outlined text-sm">home</span>
          <span>LANDING</span>
        </button>
        <button
          onClick={() => handleNavigate('checkout')}
          className={`px-3 py-1.5 transition-all flex items-center gap-1.5 cursor-pointer ${
            currentView === 'checkout'
              ? 'bg-[#00ff7f] text-[#0b0b0d] font-bold shadow-sm'
              : 'text-[rgba(224,224,230,0.6)] hover:text-[#e0e0e6]'
          }`}
          title="Enrollment Checkout Screen"
        >
          <span className="material-symbols-outlined text-sm">shopping_cart</span>
          <span>ENROLL [$199]</span>
        </button>
        <button
          onClick={() => handleNavigate('hologram')}
          className={`px-3 py-1.5 transition-all flex items-center gap-1.5 cursor-pointer ${
            currentView === 'hologram'
              ? 'bg-[#00ff7f] text-[#0b0b0d] font-bold shadow-sm'
              : 'text-[rgba(224,224,230,0.6)] hover:text-[#00ff7f]'
          }`}
          title="3D Hologram Interface Canvas"
        >
          <span className="material-symbols-outlined text-sm">view_in_ar</span>
          <span>3D CANVAS</span>
        </button>
      </div>

      {/* Sticky Top Navigation */}
      <Navbar currentView={currentView} onNavigate={handleNavigate} />

      {/* View Switcher Container */}
      <main className="relative z-10 flex-grow">
        {currentView === 'landing' && (
          <>
            <Hero
              onStartLearning={() => handleNavigate('checkout')}
              onViewCourseDetails={() => {
                const el = document.getElementById('course');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenHologram={() => handleNavigate('hologram')}
            />
            <AboutCourse />
            <CoreCapabilities />
            <Curriculum />
            <StudentTestimonials />
            <RegistrationSection onGoToFullCheckout={() => handleNavigate('checkout')} />
            <ContactSection />
          </>
        )}

        {currentView === 'checkout' && (
          <EnrollmentCheckout onBackToSyllabus={() => handleNavigate('landing', 'curriculum')} />
        )}

        {currentView === 'hologram' && (
          <HologramCanvasModal
            onClose={() => handleNavigate('landing')}
            onEnroll={() => handleNavigate('checkout')}
          />
        )}
      </main>

      {/* Shared Technical Footer */}
      <Footer onNavigate={handleNavigate} isCheckoutView={currentView === 'checkout'} />
    </div>
  );
}
