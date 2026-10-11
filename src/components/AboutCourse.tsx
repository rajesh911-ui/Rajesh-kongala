import React from 'react';

export const AboutCourse: React.FC = () => {
  return (
    <section className="section-box relative z-10" id="course">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="label mb-3">// 01_OVERVIEW</div>
          <h2 className="font-headline font-extrabold text-3xl sm:text-4xl md:text-5xl uppercase tracking-[-0.04em] text-[#e0e0e6]">
            SYSTEM ARCHITECTURE & CORE OUTCOMES
          </h2>
        </div>
        <div className="font-mono text-xs text-[rgba(224,224,230,0.5)] max-w-sm">
          A modern technical curriculum replacing traditional 6-month dev cycles with generative intelligence workflows.
        </div>
      </div>

      {/* Grid 3 - Variation 3 Architectural Grid */}
      <div className="grid-3">
        {/* Card 1 */}
        <div className="grid-card flex flex-col justify-between">
          <div>
            <div className="font-mono text-xs text-[#00ff7f] mb-4">// MODULE_SPEC: PROMPT_ENGINEERING</div>
            <h3 className="font-headline text-xl font-bold uppercase text-[#e0e0e6] mb-3">
              Prompt-to-UI Synthesis
            </h3>
            <p className="font-body text-sm text-[rgba(224,224,230,0.6)] leading-relaxed">
              Transform high-level conceptual ideas and wireframe sketches into high-fidelity, interactive, production-ready website layouts using structured prompting frameworks.
            </p>
          </div>
          <div className="pt-6 mt-6 border-t border-[rgba(224,224,230,0.1)] flex items-center justify-between font-mono text-xs text-[rgba(224,224,230,0.5)]">
            <span>EFFICIENCY</span>
            <span className="text-[#00ff7f]">10x FASTER DELIVERY</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="grid-card flex flex-col justify-between">
          <div>
            <div className="font-mono text-xs text-[#00ff7f] mb-4">// MODULE_SPEC: AUTONOMOUS_STACK</div>
            <h3 className="font-headline text-xl font-bold uppercase text-[#e0e0e6] mb-3">
              Zero Syntax Friction
            </h3>
            <p className="font-body text-sm text-[rgba(224,224,230,0.6)] leading-relaxed">
              Never get stuck debugging CSS quirks or JavaScript syntax errors. Learn to direct AI copilot engines to refactor code, adjust responsive viewports, and wire integrations effortlessly.
            </p>
          </div>
          <div className="pt-6 mt-6 border-t border-[rgba(224,224,230,0.1)] flex items-center justify-between font-mono text-xs text-[rgba(224,224,230,0.5)]">
            <span>ACCESSIBILITY</span>
            <span className="text-[#00ff7f]">NO CODING REQUIRED</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="grid-card flex flex-col justify-between">
          <div>
            <div className="font-mono text-xs text-[#00ff7f] mb-4">// MODULE_SPEC: AGENCY_MONETIZATION</div>
            <h3 className="font-headline text-xl font-bold uppercase text-[#e0e0e6] mb-3">
              Commercial Agency Blueprint
            </h3>
            <p className="font-body text-sm text-[rgba(224,224,230,0.6)] leading-relaxed">
              Package your new capabilities into high-ticket freelance client offerings ($2,500 - $6,000 per build). Includes proposal templates, pricing calculators, and client onboarding workflows.
            </p>
          </div>
          <div className="pt-6 mt-6 border-t border-[rgba(224,224,230,0.1)] flex items-center justify-between font-mono text-xs text-[rgba(224,224,230,0.5)]">
            <span>ROI TIMELINE</span>
            <span className="text-[#00ff7f]">FIRST CLIENT IN 30 DAYS</span>
          </div>
        </div>
      </div>
    </section>
  );
};
