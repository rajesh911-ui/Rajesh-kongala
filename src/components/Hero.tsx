import React from 'react';

interface HeroProps {
  onStartLearning: () => void;
  onViewCourseDetails: () => void;
  onOpenHologram: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartLearning,
  onViewCourseDetails,
  onOpenHologram
}) => {
  return (
    <section
      id="hero"
      className="relative w-full border-b-2 border-[#e0e0e6] bg-[#0b0b0d]/70 backdrop-blur-xs min-h-[calc(100vh-60px)] grid grid-cols-1 lg:grid-cols-[240px_1fr_340px]"
    >
      {/* ================= COLUMN 1: LEFT TECHNICAL SIDEBAR ================= */}
      <div className="sidebar p-6 border-b lg:border-b-0 lg:border-r border-[rgba(224,224,230,0.1)] flex flex-col justify-between gap-8 bg-[rgba(255,255,255,0.01)]">
        <div className="flex flex-col gap-6">
          {/* System Spec Header */}
          <div>
            <div className="label mb-2">SYS_IDX: 001/06</div>
            <div className="font-mono text-xs text-[rgba(224,224,230,0.5)]">
              COHORT_2026 // READY
            </div>
          </div>

          {/* Architecture Checklist */}
          <div className="flex flex-col gap-3 font-mono text-[0.7rem] text-[rgba(224,224,230,0.7)]">
            <div className="flex items-center gap-2">
              <span className="text-[#00ff7f]">■</span>
              <span>NO CODING REQUIRED</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#00ff7f]">■</span>
              <span>PROMPT-TO-LAYOUT ENGINE</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#00ff7f]">■</span>
              <span>FIGMA & AST CONVERSION</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#00ff7f]">■</span>
              <span>COMMERCIAL AGENCY BLUEPRINT</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#00ff7f]">■</span>
              <span>300-FRAME SCROLL SYSTEM</span>
            </div>
          </div>
        </div>

        {/* Sidebar Interactive 3D Canvas Switch */}
        <div className="pt-6 border-t border-[rgba(224,224,230,0.1)] flex flex-col gap-3">
          <div className="text-[0.65rem] font-mono text-[rgba(224,224,230,0.5)] uppercase tracking-wider">
            Interactive Visualizer
          </div>
          <button
            onClick={onOpenHologram}
            className="w-full py-2.5 px-3 border border-[rgba(224,224,230,0.2)] hover:border-[#00ff7f] bg-[rgba(255,255,255,0.02)] text-xs font-mono text-[#00ff7f] hover:bg-[#00ff7f] hover:text-[#0b0b0d] transition-all flex items-center justify-center gap-2 cursor-pointer font-bold"
          >
            <span className="material-symbols-outlined text-sm">hub</span>
            <span>LAUNCH 3D CANVAS</span>
          </button>
          <div className="font-mono text-[0.6rem] text-[rgba(224,224,230,0.4)] text-center">
            REALTIME SHADER PIPELINE
          </div>
        </div>
      </div>

      {/* ================= COLUMN 2: CENTER MAIN CONTENT ================= */}
      <div className="main-content p-6 sm:p-10 md:p-14 lg:p-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[rgba(224,224,230,0.1)]">
        {/* Monospace Badge */}
        <div className="flex items-center gap-2 mb-6">
          <span className="label">TECHNICAL SYSTEM • v3.0</span>
          <span className="font-mono text-xs text-[rgba(224,224,230,0.5)]">EARLY ADMISSION OPEN</span>
        </div>

        {/* Massive Headline in Syne */}
        <h1 className="font-headline font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.88] tracking-[-0.06em] uppercase text-[#e0e0e6] mb-8">
          AUTONOMOUS <br />
          <span className="highlight">WEB BUILDER</span> <br />
          ACADEMY
        </h1>

        {/* Subtitle in Inter */}
        <p className="font-body text-base sm:text-lg text-[rgba(224,224,230,0.7)] leading-relaxed max-w-xl mb-10">
          Master the complete engineering workflow of AI-assisted web creation. Learn to command frontier generative models, prompt complex UI layouts, convert designs directly to production, and launch commercial websites without writing lines of code.
        </p>

        {/* CTA Group with Variation 3 Brutalist Buttons */}
        <div className="flex flex-wrap items-center gap-4 mb-10">
          <button
            onClick={onStartLearning}
            className="btn btn-primary text-sm py-4 px-8 cursor-pointer shadow-lg"
          >
            <span>START LEARNING NOW</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>
          <button
            onClick={onViewCourseDetails}
            className="btn text-sm py-4 px-8 cursor-pointer"
          >
            INSPECT SYLLABUS
          </button>
        </div>

        {/* Status Line */}
        <div className="pt-6 border-t border-[rgba(224,224,230,0.1)] flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[rgba(224,224,230,0.5)]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00ff7f] animate-ping"></span>
            <span>NEXT COHORT STARTS OCTOBER 1</span>
          </div>
          <div className="text-[rgba(224,224,230,0.7)]">
            // 14 SEATS REMAINING
          </div>
        </div>
      </div>

      {/* ================= COLUMN 3: RIGHT DATA TELEMETRY PANEL ================= */}
      <div className="data-panel p-6 sm:p-8 flex flex-col justify-center gap-4 bg-[rgba(255,255,255,0.01)]">
        <div className="label self-start mb-1">SYSTEM_TELEMETRY</div>

        {/* Cell 1: No-Code */}
        <div className="data-cell">
          <div className="font-mono text-[0.62rem] text-[rgba(224,224,230,0.5)] uppercase tracking-wider mb-1">
            00.1 // ACCESSIBILITY
          </div>
          <h4>100%</h4>
          <p className="font-body text-xs text-[rgba(224,224,230,0.6)] mt-1">
            Zero coding prerequisites. Built for creators, founders, and designers.
          </p>
        </div>

        {/* Cell 2: Student Rating */}
        <div className="data-cell">
          <div className="font-mono text-[0.62rem] text-[rgba(224,224,230,0.5)] uppercase tracking-wider mb-1">
            00.2 // BENCHMARK
          </div>
          <h4>4.9 / 5</h4>
          <p className="font-body text-xs text-[rgba(224,224,230,0.6)] mt-1">
            Verified score across 1,200+ cohort graduates.
          </p>
        </div>

        {/* Cell 3: Student Cohort */}
        <div className="data-cell">
          <div className="font-mono text-[0.62rem] text-[rgba(224,224,230,0.5)] uppercase tracking-wider mb-1">
            00.3 // NETWORK
          </div>
          <h4>1,200+</h4>
          <p className="font-body text-xs text-[rgba(224,224,230,0.6)] mt-1">
            Active builders collaborating in private Discord cohort workspaces.
          </p>
        </div>

        {/* Cell 4: Access */}
        <div className="data-cell">
          <div className="font-mono text-[0.62rem] text-[rgba(224,224,230,0.5)] uppercase tracking-wider mb-1">
            00.4 // LICENSE
          </div>
          <h4>LIFETIME</h4>
          <p className="font-body text-xs text-[rgba(224,224,230,0.6)] mt-1">
            Includes all future generative AI curriculum and tool updates.
          </p>
        </div>
      </div>
    </section>
  );
};
