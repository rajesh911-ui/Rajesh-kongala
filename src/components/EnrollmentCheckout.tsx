import React, { useState } from 'react';
import { CheckoutFormData } from '../types';
import { ConfettiCelebration } from './ConfettiCelebration';

interface EnrollmentCheckoutProps {
  onBackToSyllabus: () => void;
}

export const EnrollmentCheckout: React.FC<EnrollmentCheckoutProps> = ({ onBackToSyllabus }) => {
  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: 'Alex Morgan',
    email: 'alex@example.com',
    phone: '+1 (555) 019-2834',
    cohort: 'Fall 2025 Accelerated (Starts Oct 1)',
    experience: 'nocoder',
    paymentMethod: 'card',
    cardNumber: '4242 •••• •••• 4242',
    cardExpiry: '12 / 28',
    cardCvc: '883',
    postalCode: '10001',
    agreeTerms: true
  });

  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(2);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [teamModalOpen, setTeamModalOpen] = useState(false);

  // Pricing calculation
  const basePrice = 499;
  const earlyBirdDiscount = 300;
  const extraCouponDiscount = couponApplied ? 20 : 0;
  const finalPrice = basePrice - earlyBirdDiscount - extraCouponDiscount;

  const [termsError, setTermsError] = useState(false);
  const [discordCopied, setDiscordCopied] = useState(false);

  const handleApplyCoupon = () => {
    if (couponCode.trim().toUpperCase() === 'STUDENT20' || couponCode.trim().toUpperCase() === 'VIP') {
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon. Try STUDENT20 or VIP');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreeTerms) {
      setTermsError(true);
      return;
    }
    setTermsError(false);
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCheckoutComplete(true);
      setShowConfetti(true);
    }, 1200);
  };

  return (
    <div className="relative z-10 flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-8 lg:py-12 animate-in fade-in duration-300">
      {/* Breadcrumb & Top Return Context */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-[#c6c6cd]">
          <button
            onClick={onBackToSyllabus}
            className="hover:text-[#c0c1ff] transition-colors flex items-center gap-1 cursor-pointer font-medium"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            <span>Back to Syllabus</span>
          </button>
          <span className="text-[#45464d]">/</span>
          <span className="text-[#e0e3e5] font-medium">Checkout & Cohort Registration</span>
        </div>

        {/* Live Cohort Status Pill */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1d2022] border border-[#45464d]/40 text-xs shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#4cd7f6] animate-pulse"></span>
          <span className="text-[#e0e3e5] font-medium">Fall 2025 Cohort</span>
          <span className="text-[#45464d]">•</span>
          <span className="text-[#4cd7f6] font-mono font-semibold">14 Seats Remaining</span>
        </div>
      </div>

      {/* 12-Column Responsive Bento Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ================= LEFT COLUMN: SUMMARY & COURSE VALUE (5 Cols Desktop) ================= */}
        <section className="lg:col-span-5 flex flex-col gap-6 order-2 lg:order-1">
          {/* Course Showcase Card */}
          <div className="bg-[#191c1e] border border-[#45464d]/40 rounded-xl p-6 relative overflow-hidden shadow-xl backdrop-blur-md">
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#4cd7f6]/10 rounded-full blur-2xl pointer-events-none"></div>

            {/* Visual Media Thumbnail */}
            <div className="relative w-full h-44 rounded-lg overflow-hidden border border-[#45464d]/30 mb-6 group">
              <img
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                alt="AI Website Builder Academy Interactive Interface"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQuEdh7YOpJmSQond94nVreimYFgSpHBh52samHLWL8NfWOMqRvZSOZrpTN0RAJKm6v_rGUH1SbVs_YFIKv8wLr1l3YucCFBrzaX39m5ZdSCrHDquDXyNZIJyqqtTuFQlrQ9kNDlYFg1nghywowj9jLmteMNNo4aGKAtBeivCE8YEMAruGov4ZfWzahupRh4WvKgqjxpOz9ZBvxQiAJlk5OmEy5Xss9LzkjKF9njafAybH0YkKmKxI"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#191c1e] via-[#191c1e]/30 to-transparent"></div>

              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0b0f10]/90 border border-[#4cd7f6]/40 backdrop-blur-md text-xs text-[#4cd7f6] font-mono">
                <span className="material-symbols-outlined text-sm">auto_awesome</span>
                <span>Next-Gen Curriculum</span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-[#e0e3e5] font-mono bg-[#272a2c]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#45464d]/30">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[#4cd7f6] text-sm">schedule</span>
                  6 Weeks • Self-Paced
                </span>
                <span className="flex items-center gap-1 text-[#c0c1ff]">
                  <span className="material-symbols-outlined text-sm">code</span>
                  Zero Coding Required
                </span>
              </div>
            </div>

            {/* Course Title & Badge */}
            <div className="mb-4">
              <span className="inline-block text-xs font-mono uppercase tracking-wider text-[#4cd7f6] bg-[#001b21] border border-[#4cd7f6]/30 px-2.5 py-0.5 rounded mb-2">
                Cohort Enrollment Pass
              </span>
              <h2 className="text-xl md:text-2xl font-headline font-extrabold text-[#e0e3e5] tracking-tight">
                AI Website Builder Academy – Full Mastery Pass
              </h2>
              <p className="text-sm text-[#c6c6cd] mt-2 leading-relaxed">
                Master the leading generative AI developer suites, prompt engineering workflows, and no-code deployment engines to ship web apps at 10x speed.
              </p>
            </div>

            {/* Included Benefits Checklist */}
            <div className="border-t border-[#45464d]/30 pt-5 mt-4 space-y-3.5">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#c6c6cd] font-semibold">
                Everything Included in Today's Pass
              </h3>
              <ul className="space-y-3 text-sm text-[#e0e3e5]">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#3131c0]/50 border border-[#c0c1ff] flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-xs text-[#c0c1ff]">check</span>
                  </div>
                  <span>
                    <strong className="text-[#e0e3e5]">All 6 Core Modules:</strong> 20+ Hours hands-on video instruction & live terminal sessions.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#3131c0]/50 border border-[#c0c1ff] flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-xs text-[#c0c1ff]">check</span>
                  </div>
                  <span>
                    <strong className="text-[#e0e3e5]">Production Asset Pack:</strong> Ready-to-use prompt engineering blueprints & Figma-to-code components.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#3131c0]/50 border border-[#c0c1ff] flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-xs text-[#c0c1ff]">check</span>
                  </div>
                  <span>
                    <strong className="text-[#e0e3e5]">Private Discord Hub:</strong> Direct access to mentor channels & weekly live office hours with founders.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#3131c0]/50 border border-[#c0c1ff] flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-xs text-[#c0c1ff]">check</span>
                  </div>
                  <span>
                    <strong className="text-[#e0e3e5]">1-on-1 Portfolio & Live Site Review:</strong> Personalized asynchronous audit before client delivery.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#3131c0]/50 border border-[#c0c1ff] flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-xs text-[#c0c1ff]">check</span>
                  </div>
                  <span>
                    <strong className="text-[#e0e3e5]">Verified Certification:</strong> Credential token verifiable on LinkedIn and employer portals.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#3131c0]/50 border border-[#c0c1ff] flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-xs text-[#c0c1ff]">check</span>
                  </div>
                  <span>
                    <strong className="text-[#e0e3e5]">Lifetime Access:</strong> All future module additions, tool upgrades, and recorded webinars.
                  </span>
                </li>
              </ul>
            </div>

            {/* Pricing Breakdown Box */}
            <div className="mt-6 p-4 rounded-xl bg-[#1d2022] border border-[#45464d]/40 space-y-2.5">
              <div className="flex justify-between items-center text-sm text-[#c6c6cd]">
                <span>Standard Curriculum Price</span>
                <span className="line-through font-mono">${basePrice}.00</span>
              </div>
              <div className="flex justify-between items-center text-sm text-[#4cd7f6]">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base">local_offer</span>
                  Early-Bird Cohort Discount
                </span>
                <span className="font-mono font-semibold">-${earlyBirdDiscount}.00</span>
              </div>

              {couponApplied && (
                <div className="flex justify-between items-center text-sm text-emerald-400">
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-base">discount</span>
                    Promo Code (STUDENT20)
                  </span>
                  <span className="font-mono font-semibold">-${extraCouponDiscount}.00</span>
                </div>
              )}

              {/* Coupon input */}
              <div className="pt-2 flex gap-2">
                <input
                  type="text"
                  placeholder="Promo code (e.g. STUDENT20)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full bg-[#0b0f10] border border-[#45464d]/40 rounded px-2.5 py-1 text-xs font-mono text-[#e0e3e5] placeholder:text-[#909097] outline-none"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="px-3 py-1 rounded bg-[#272a2c] hover:bg-[#323537] text-xs font-mono text-[#c0c1ff]"
                >
                  Apply
                </button>
              </div>
              {couponError && <p className="text-[11px] text-[#ffb4ab]">{couponError}</p>}

              <div className="pt-2 border-t border-[#45464d]/30 flex justify-between items-baseline">
                <div>
                  <span className="text-xs text-[#c6c6cd] font-mono block">DUE TODAY</span>
                  <span className="text-2xl font-bold font-headline text-[#e0e3e5]">
                    ${finalPrice}
                    <span className="text-sm font-normal text-[#c6c6cd] font-body"> USD</span>
                  </span>
                </div>
                <span className="text-xs px-2.5 py-1 rounded bg-[#3131c0]/60 text-[#c0c1ff] font-medium border border-[#c0c1ff]/40">
                  Save 60% Today
                </span>
              </div>
            </div>

            {/* Student Testimonial Snippet */}
            <div className="mt-6 p-4 rounded-xl bg-[#272a2c]/60 border border-[#45464d]/30 relative">
              <div className="flex items-center gap-1 text-[#4cd7f6] mb-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>
                ))}
              </div>
              <blockquote className="text-xs text-[#c6c6cd] italic leading-relaxed">
                "Went from zero code knowledge to shipping 3 client websites in 3 weeks. The prompt engineering architectures alone saved me months of frustration."
              </blockquote>
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="font-semibold text-[#e0e3e5]">Sarah L.</span>
                <span className="text-[#c6c6cd] font-mono">Freelance Digital Designer</span>
              </div>
            </div>

            {/* 30-Day Guarantee */}
            <div className="mt-5 flex items-center gap-3 px-3 py-2 rounded-lg bg-[#1d2022]/60 border border-[#45464d]/30 text-xs text-[#c6c6cd]">
              <span className="material-symbols-outlined text-[#4cd7f6] text-lg">verified_user</span>
              <span>100% Risk-Free: 30-day money-back guarantee, no questions asked.</span>
            </div>
          </div>
        </section>

        {/* ================= RIGHT COLUMN: MULTI-STEP REGISTRATION FORM (7 Cols Desktop) ================= */}
        <section className="lg:col-span-7 flex flex-col gap-6 order-1 lg:order-2">
          <div className="bg-[#191c1e] border border-[#45464d]/40 rounded-xl p-6 sm:p-8 relative shadow-2xl backdrop-blur-md">
            {/* Stepper Header */}
            <div className="mb-8 border-b border-[#45464d]/30 pb-6">
              <div className="flex items-center justify-between max-w-lg mx-auto relative mb-3">
                {/* Background Progress Track */}
                <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-0.5 bg-[#45464d]/40 z-0"></div>
                <div className="absolute left-4 w-2/3 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-[#c0c1ff] to-[#4cd7f6] z-0"></div>

                {/* Step 1: Details */}
                <div 
                  onClick={() => setActiveStep(1)}
                  className="relative z-10 flex flex-col items-center cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-[#3131c0] border-2 border-[#c0c1ff] flex items-center justify-center text-xs font-semibold text-[#e0e3e5] shadow-md">
                    <span className="material-symbols-outlined text-sm font-bold">check</span>
                  </div>
                  <span className="text-[11px] font-mono tracking-wider text-[#e0e3e5] mt-1.5 font-medium">
                    1. DETAILS
                  </span>
                </div>

                {/* Step 2: Goals */}
                <div 
                  onClick={() => setActiveStep(2)}
                  className="relative z-10 flex flex-col items-center cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-[#0b0f10] border-2 border-[#4cd7f6] flex items-center justify-center text-xs font-bold text-[#4cd7f6] shadow-[0_0_12px_rgba(76,215,246,0.4)]">
                    <span>2</span>
                  </div>
                  <span className="text-[11px] font-mono tracking-wider text-[#4cd7f6] mt-1.5 font-bold">
                    2. GOALS
                  </span>
                </div>

                {/* Step 3: Payment */}
                <div 
                  onClick={() => setActiveStep(3)}
                  className="relative z-10 flex flex-col items-center cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-[#272a2c] border border-[#45464d] flex items-center justify-center text-xs font-medium text-[#909097]">
                    <span>3</span>
                  </div>
                  <span className="text-[11px] font-mono tracking-wider text-[#909097] mt-1.5">
                    3. PAYMENT
                  </span>
                </div>
              </div>

              <div className="text-center mt-4">
                <h1 className="text-2xl sm:text-3xl font-headline font-extrabold text-[#e0e3e5] tracking-tight">
                  Complete Your Enrollment
                </h1>
                <p className="text-sm text-[#c6c6cd] mt-1">
                  Takes less than 2 minutes. Instant Discord and platform credentials upon checkout.
                </p>
              </div>
            </div>

            {/* Registration Form Body */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* SECTION 1: Student Information */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[#c0c1ff] font-semibold flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">person</span>
                    Step 1 • Student Information
                  </h3>
                  <span className="text-xs text-[#c6c6cd] font-mono">* Required fields</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-medium text-[#c6c6cd] mb-1.5">Full Name *</label>
                    <div className="relative">
                      <input
                        className="w-full bg-[#0b0f10] border border-[#45464d]/60 rounded-lg px-3.5 py-2.5 text-sm text-[#e0e3e5] placeholder:text-[#909097] focus:border-[#c0c1ff] focus:ring-2 focus:ring-[#c0c1ff]/20 transition-all outline-none"
                        placeholder="Alex Morgan"
                        required
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      />
                      <span className="material-symbols-outlined absolute right-3 top-2.5 text-[#4cd7f6] text-lg">
                        check_circle
                      </span>
                    </div>
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-xs font-medium text-[#c6c6cd] mb-1.5">Email Address *</label>
                    <div className="relative">
                      <input
                        className="w-full bg-[#0b0f10] border border-[#45464d]/60 rounded-lg px-3.5 py-2.5 text-sm text-[#e0e3e5] placeholder:text-[#909097] focus:border-[#c0c1ff] focus:ring-2 focus:ring-[#c0c1ff]/20 transition-all outline-none"
                        placeholder="alex@example.com"
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                      <span className="material-symbols-outlined absolute right-3 top-2.5 text-[#4cd7f6] text-lg">
                        mail
                      </span>
                    </div>
                    <p className="text-[11px] text-[#c6c6cd] mt-1">
                      Course login and Discord invites are sent directly here.
                    </p>
                  </div>
                </div>

                {/* Phone / Mobile + Cohort Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#c6c6cd] mb-1.5">
                      WhatsApp / Mobile <span className="text-[#909097]">(Optional for SMS alerts)</span>
                    </label>
                    <div className="relative">
                      <input
                        className="w-full bg-[#0b0f10] border border-[#45464d]/60 rounded-lg px-3.5 py-2.5 text-sm text-[#e0e3e5] placeholder:text-[#909097] focus:border-[#c0c1ff] focus:ring-2 focus:ring-[#c0c1ff]/20 transition-all outline-none"
                        placeholder="+1 (555) 019-2834"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                      <span className="material-symbols-outlined absolute right-3 top-2.5 text-[#909097] text-lg">
                        phone_iphone
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#c6c6cd] mb-1.5">
                      Intended Cohort Stream
                    </label>
                    <select
                      value={formData.cohort}
                      onChange={(e) => setFormData({ ...formData, cohort: e.target.value })}
                      className="w-full bg-[#0b0f10] border border-[#45464d]/60 rounded-lg px-3.5 py-2.5 text-sm text-[#e0e3e5] focus:border-[#c0c1ff] focus:ring-2 focus:ring-[#c0c1ff]/20 transition-all outline-none"
                    >
                      <option>Fall 2025 Accelerated (Starts Oct 1)</option>
                      <option>Winter 2025 Flexible Self-Paced</option>
                      <option>Spring 2026 Weekend Intensive</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION 2: Experience & Learning Goal */}
              <div className="space-y-3 pt-4 border-t border-[#45464d]/30">
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#c0c1ff] font-semibold flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">psychology</span>
                  Step 2 • Current Technical Background
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Beginner */}
                  <label
                    onClick={() => setFormData({ ...formData, experience: 'beginner' })}
                    className={`relative flex flex-col p-3 rounded-lg border cursor-pointer transition-all ${
                      formData.experience === 'beginner'
                        ? 'border-2 border-[#c0c1ff] bg-[#272a2c] shadow-[0_0_10px_rgba(99,102,241,0.25)]'
                        : 'border-[#45464d]/40 bg-[#0b0f10] hover:border-[#c0c1ff]/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-[#e0e3e5]">Beginner</span>
                      <span
                        className={`w-3.5 h-3.5 rounded-full border ${
                          formData.experience === 'beginner' ? 'bg-[#c0c1ff] border-[#c0c1ff]' : 'border-[#909097]'
                        }`}
                      ></span>
                    </div>
                    <span className="text-[11px] text-[#c6c6cd] leading-tight">
                      No code background. Want to create sites from scratch using AI.
                    </span>
                  </label>

                  {/* No-Coder / Builder (default) */}
                  <label
                    onClick={() => setFormData({ ...formData, experience: 'nocoder' })}
                    className={`relative flex flex-col p-3 rounded-lg border cursor-pointer transition-all ${
                      formData.experience === 'nocoder'
                        ? 'border-2 border-[#c0c1ff] bg-[#272a2c] shadow-[0_0_10px_rgba(99,102,241,0.25)]'
                        : 'border-[#45464d]/40 bg-[#0b0f10] hover:border-[#c0c1ff]/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-[#c0c1ff]">No-Coder / Builder</span>
                      <span
                        className={`w-3.5 h-3.5 rounded-full border ${
                          formData.experience === 'nocoder' ? 'bg-[#c0c1ff] border-[#c0c1ff]' : 'border-[#909097]'
                        }`}
                      ></span>
                    </div>
                    <span className="text-[11px] text-[#e0e3e5] leading-tight">
                      Familiar with Notion, Webflow, or basic UI frameworks.
                    </span>
                  </label>

                  {/* Pro Designer/Dev */}
                  <label
                    onClick={() => setFormData({ ...formData, experience: 'pro' })}
                    className={`relative flex flex-col p-3 rounded-lg border cursor-pointer transition-all ${
                      formData.experience === 'pro'
                        ? 'border-2 border-[#c0c1ff] bg-[#272a2c] shadow-[0_0_10px_rgba(99,102,241,0.25)]'
                        : 'border-[#45464d]/40 bg-[#0b0f10] hover:border-[#c0c1ff]/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-[#e0e3e5]">Pro Designer/Dev</span>
                      <span
                        className={`w-3.5 h-3.5 rounded-full border ${
                          formData.experience === 'pro' ? 'bg-[#c0c1ff] border-[#c0c1ff]' : 'border-[#909097]'
                        }`}
                      ></span>
                    </div>
                    <span className="text-[11px] text-[#c6c6cd] leading-tight">
                      Experienced pro looking to accelerate delivery speed 10x.
                    </span>
                  </label>
                </div>
              </div>

              {/* SECTION 3: Payment Gateway */}
              <div className="space-y-4 pt-4 border-t border-[#45464d]/30">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[#c0c1ff] font-semibold flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">credit_card</span>
                    Step 3 • Payment Gateway
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-[#c6c6cd]">
                    <span className="material-symbols-outlined text-sm text-[#4cd7f6]">shield</span>
                    <span>Stripe 256-bit Tokenized</span>
                  </div>
                </div>

                {/* Payment Method Toggle Tabs */}
                <div className="grid grid-cols-3 gap-2 p-1 bg-[#0b0f10] rounded-lg border border-[#45464d]/40">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                    className={`py-2 px-3 rounded text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      formData.paymentMethod === 'card'
                        ? 'bg-[#1d2022] text-[#e0e3e5] border border-[#45464d]/40 shadow-xs'
                        : 'text-[#c6c6cd] hover:text-[#e0e3e5]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-base text-[#c0c1ff]">credit_card</span>
                    <span>Card</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'wallet' })}
                    className={`py-2 px-3 rounded text-xs font-medium flex items-center justify-center gap-2 transition-all ${
                      formData.paymentMethod === 'wallet'
                        ? 'bg-[#1d2022] text-[#e0e3e5] border border-[#45464d]/40 shadow-xs'
                        : 'text-[#c6c6cd] hover:text-[#e0e3e5]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-base">account_balance_wallet</span>
                    <span>Apple / Google</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'paypal' })}
                    className={`py-2 px-3 rounded text-xs font-medium flex items-center justify-center gap-2 transition-all ${
                      formData.paymentMethod === 'paypal'
                        ? 'bg-[#1d2022] text-[#e0e3e5] border border-[#45464d]/40 shadow-xs'
                        : 'text-[#c6c6cd] hover:text-[#e0e3e5]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-base">payments</span>
                    <span>PayPal</span>
                  </button>
                </div>

                {/* Card Input Matrix */}
                {formData.paymentMethod === 'card' && (
                  <div className="bg-[#0b0f10] p-4 rounded-xl border border-[#45464d]/50 space-y-3.5">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-xs font-medium text-[#c6c6cd]">Card Number</label>
                        <div className="flex items-center gap-1.5 opacity-80">
                          <span className="text-[10px] font-mono px-1 rounded bg-[#1d2022] border border-[#45464d] text-[#e0e3e5]">VISA</span>
                          <span className="text-[10px] font-mono px-1 rounded bg-[#1d2022] border border-[#45464d] text-[#e0e3e5]">MC</span>
                          <span className="text-[10px] font-mono px-1 rounded bg-[#1d2022] border border-[#45464d] text-[#e0e3e5]">AMEX</span>
                        </div>
                      </div>
                      <div className="relative">
                        <input
                          className="w-full bg-[#1d2022] border border-[#45464d]/60 rounded-lg px-3.5 py-2.5 text-sm text-[#e0e3e5] font-mono placeholder:text-[#909097] focus:border-[#c0c1ff] focus:ring-2 focus:ring-[#c0c1ff]/20 transition-all outline-none"
                          placeholder="4242 •••• •••• 4242"
                          type="text"
                          value={formData.cardNumber}
                          onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        />
                        <span className="material-symbols-outlined absolute right-3 top-2.5 text-[#909097] text-lg">
                          contactless
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-[#c6c6cd] mb-1">Expiry Date</label>
                        <input
                          className="w-full bg-[#1d2022] border border-[#45464d]/60 rounded-lg px-3 py-2 text-sm text-[#e0e3e5] font-mono placeholder:text-[#909097] focus:border-[#c0c1ff] focus:ring-2 focus:ring-[#c0c1ff]/20 outline-none"
                          placeholder="MM / YY"
                          type="text"
                          value={formData.cardExpiry}
                          onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#c6c6cd] mb-1 flex items-center justify-between">
                          <span>CVC</span>
                          <span className="material-symbols-outlined text-xs text-[#909097]">help</span>
                        </label>
                        <input
                          className="w-full bg-[#1d2022] border border-[#45464d]/60 rounded-lg px-3 py-2 text-sm text-[#e0e3e5] font-mono placeholder:text-[#909097] focus:border-[#c0c1ff] focus:ring-2 focus:ring-[#c0c1ff]/20 outline-none"
                          maxLength={4}
                          placeholder="•••"
                          type="password"
                          value={formData.cardCvc}
                          onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                        />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label className="block text-xs font-medium text-[#c6c6cd] mb-1">Postal Code</label>
                        <input
                          className="w-full bg-[#1d2022] border border-[#45464d]/60 rounded-lg px-3 py-2 text-sm text-[#e0e3e5] font-mono placeholder:text-[#909097] focus:border-[#c0c1ff] focus:ring-2 focus:ring-[#c0c1ff]/20 outline-none"
                          placeholder="10001"
                          type="text"
                          value={formData.postalCode}
                          onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {formData.paymentMethod === 'wallet' && (
                  <div className="bg-[#0b0f10] p-6 rounded-xl border border-[#45464d]/50 text-center space-y-3">
                    <span className="material-symbols-outlined text-3xl text-[#4cd7f6]">fingerprint</span>
                    <p className="text-sm text-[#e0e3e5]">1-Click Biometric Checkout Ready</p>
                    <p className="text-xs text-[#c6c6cd]">Apple Pay or Google Pay will prompt for confirmation upon clicking below.</p>
                  </div>
                )}

                {formData.paymentMethod === 'paypal' && (
                  <div className="bg-[#0b0f10] p-6 rounded-xl border border-[#45464d]/50 text-center space-y-3">
                    <span className="material-symbols-outlined text-3xl text-amber-400">payments</span>
                    <p className="text-sm text-[#e0e3e5]">PayPal Express Checkout</p>
                    <p className="text-xs text-[#c6c6cd]">You will be redirected securely to PayPal to finalize your enrollment.</p>
                  </div>
                )}
              </div>

              {/* Agreement Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    checked={formData.agreeTerms}
                    onChange={(e) => {
                      setFormData({ ...formData, agreeTerms: e.target.checked });
                      if (e.target.checked) setTermsError(false);
                    }}
                    className="mt-1 w-4 h-4 rounded border-[#45464d] bg-[#0b0f10] text-[#00ff7f] focus:ring-0 focus:ring-offset-0"
                    type="checkbox"
                  />
                  <span className="text-xs text-[#c6c6cd] leading-relaxed">
                    I agree to the <span className="text-[#00ff7f] font-mono">Terms of Service</span> (Full lifetime access to all 6 modules, asset packs, and private Discord. 30-day money-back guarantee applies).
                  </span>
                </label>
                {termsError && (
                  <p className="mt-2 text-xs font-mono text-red-400">
                    [ERROR]: Please accept the Terms of Service to proceed with enrollment.
                  </p>
                )}
              </div>

              {/* Primary Enrollment CTA Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 px-6 rounded-none bg-[#00ff7f] hover:bg-[#00e673] text-[#0b0b0d] font-mono font-bold text-sm tracking-wider uppercase shadow-lg active:scale-[0.99] transition-all duration-150 flex items-center justify-center gap-3 border-2 border-[#00ff7f] group relative overflow-hidden cursor-pointer"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-t-transparent border-[#0b0b0d] rounded-full animate-spin"></span>
                    <span>SECURING PASS & PROVISIONING...</span>
                  </div>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-lg">
                      bolt
                    </span>
                    <span className="tracking-wide">
                      COMPLETE ENROLLMENT // ${finalPrice}
                    </span>
                    <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </>
                )}
              </button>

              {/* Reassurance Bottom Strip */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-[#c6c6cd] font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#4cd7f6] text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                    lock
                  </span>
                  <span>Bank-Grade Encryption</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#4cd7f6] text-sm">autorenew</span>
                  <span>Instant Access On Confirmation</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#4cd7f6] text-sm">contact_support</span>
                  <span>
                    Direct Support:{' '}
                    <a className="text-[#c0c1ff] hover:underline" href="mailto:rajeshkongala@gmail.com">
                      rajeshkongala@gmail.com
                    </a>
                  </span>
                </div>
              </div>
            </form>
          </div>

          {/* Secondary Corporate Seats Box */}
          <div className="p-4 rounded-xl bg-[#0b0f10] border border-[#45464d]/30 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#1d2022] flex items-center justify-center text-[#4cd7f6]">
                <span className="material-symbols-outlined text-lg">terminal</span>
              </div>
              <div>
                <p className="text-xs font-mono text-[#e0e3e5]">Need institutional or corporate team seats?</p>
                <p className="text-[11px] text-[#c6c6cd]">Custom invoicing, group cohorts & VAT exemptions available.</p>
              </div>
            </div>
            <button
              onClick={() => setTeamModalOpen(true)}
              className="shrink-0 text-xs font-mono text-[#4cd7f6] hover:text-[#acedff] underline flex items-center gap-1 cursor-pointer"
            >
              <span>Inquire for Teams</span>
              <span className="material-symbols-outlined text-xs">open_in_new</span>
            </button>
          </div>
        </section>
      </div>

      {/* Confirmation Success Modal */}
      {checkoutComplete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
          {/* Confetti Explosion Component */}
          {showConfetti && (
            <ConfettiCelebration
              durationMs={5000}
              onComplete={() => setShowConfetti(false)}
            />
          )}

          <div className="bg-[#191c1e] border-2 border-[#4cd7f6] rounded-2xl max-w-lg w-full p-8 shadow-2xl relative text-center">
            <div className="w-16 h-16 rounded-full bg-[#001b21] border-2 border-[#4cd7f6] text-[#4cd7f6] flex items-center justify-center mx-auto mb-4 animate-bounce shadow-[0_0_20px_#4cd7f6]/40">
              <span className="material-symbols-outlined text-3xl">verified</span>
            </div>
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3131c0]/40 border border-[#4cd7f6]/50 text-xs font-mono text-[#4cd7f6] mb-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4cd7f6] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4cd7f6]"></span>
              </span>
              <span>REGISTRATION CONFIRMED • 2025 PASS ACTIVE</span>
            </div>

            <h2 className="text-2xl font-headline font-bold text-[#e0e3e5] mt-1">
              Welcome to the Fall 2025 Cohort! 🎉
            </h2>
            <p className="text-sm text-[#c6c6cd] mt-2 leading-relaxed">
              Congratulations <strong className="text-[#e0e3e5]">{formData.fullName}</strong>! Your seat pass has been confirmed and receipt dispatched to{' '}
              <strong className="text-[#4cd7f6]">{formData.email}</strong>.
            </p>

            <div className="my-6 p-4 rounded-xl bg-[#0b0f10] border border-[#45464d]/40 text-left space-y-2 text-xs font-mono">
              <div className="flex justify-between text-[#c6c6cd]">
                <span>Student ID:</span>
                <span className="text-[#e0e3e5]">AIB-2025-9831</span>
              </div>
              <div className="flex justify-between text-[#c6c6cd]">
                <span>Cohort Stream:</span>
                <span className="text-[#c0c1ff]">{formData.cohort}</span>
              </div>
              <div className="flex justify-between text-[#c6c6cd]">
                <span>Amount Paid:</span>
                <span className="text-emerald-400 font-bold">${finalPrice}.00 USD</span>
              </div>
              <div className="flex justify-between text-[#c6c6cd]">
                <span>Status:</span>
                <span className="text-[#4cd7f6]">Verified & Enrolled</span>
              </div>
              <div className="flex justify-between text-[#c6c6cd]">
                <span>Instructor Hotline:</span>
                <span className="text-[#e0e3e5]">rajeshkongala@gmail.com</span>
              </div>
            </div>

            {/* Quick Celebrate Again Button */}
            <div className="mb-4 flex justify-center">
              <button
                onClick={() => {
                  setShowConfetti(false);
                  setTimeout(() => setShowConfetti(true), 60);
                }}
                className="px-4 py-1.5 rounded-full bg-[#1d2022] hover:bg-[#272a2c] border border-[#c0c1ff]/40 text-xs font-mono text-[#c0c1ff] hover:text-[#ffffff] flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
              >
                <span>Celebrate Again</span>
                <span>🎊</span>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  navigator.clipboard.writeText('https://discord.gg/ai-builder-academy-sample');
                  setDiscordCopied(true);
                  setTimeout(() => setDiscordCopied(false), 3000);
                }}
                className="flex-1 py-3 border-2 border-[#00ff7f] bg-[#00ff7f] text-[#0b0b0d] text-xs font-mono font-bold hover:bg-[#00e673] flex items-center justify-center gap-1.5 cursor-pointer shadow-lg uppercase"
              >
                <span className="material-symbols-outlined text-sm">forum</span>
                <span>{discordCopied ? 'DISCORD INVITE COPIED!' : 'COPY DISCORD HUB INVITE'}</span>
              </button>
              <button
                onClick={() => {
                  setCheckoutComplete(false);
                  setShowConfetti(false);
                  onBackToSyllabus();
                }}
                className="flex-1 py-3 border border-[rgba(224,224,230,0.2)] bg-[#111116] hover:bg-[#1a1a20] text-xs font-mono text-[#e0e0e6] cursor-pointer uppercase"
              >
                RETURN TO SYLLABUS
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Corporate Team Inquire Modal */}
      {teamModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#191c1e] border border-[#45464d] rounded-2xl max-w-md w-full p-6 text-left relative">
            <button
              onClick={() => setTeamModalOpen(false)}
              className="absolute top-4 right-4 text-[#c6c6cd] hover:text-[#e0e3e5]"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <h3 className="text-lg font-headline font-bold text-[#e0e3e5] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#4cd7f6]">groups</span>
              Corporate & Team Enrollment
            </h3>
            <p className="text-xs text-[#c6c6cd] mt-2 leading-relaxed">
              We offer volume team pricing (5+ seats), corporate tax invoicing, private office hours, and bespoke prompt engineering workshops.
            </p>
            <div className="mt-4 p-3 bg-[#0b0f10] rounded-lg border border-[#45464d]/30 text-xs font-mono text-[#e0e3e5] space-y-1">
              <div>Email: <a href="mailto:rajeshkongala@gmail.com" className="text-[#4cd7f6]">rajeshkongala@gmail.com</a></div>
              <div>Subject: Team Pass Inquiry (Company Name)</div>
              <div>Turnaround: Under 12 Hours</div>
            </div>
            <a
              href="mailto:rajeshkongala@gmail.com?subject=Team%20Enrollment%20Inquiry%20-%20AI%20Website%20Builder%20Academy"
              className="mt-5 w-full py-2.5 rounded-lg bg-[#c0c1ff] text-[#1000a9] font-bold text-xs flex items-center justify-center gap-2"
            >
              <span>Compose Email to Rajesh</span>
              <span className="material-symbols-outlined text-sm">mail</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
