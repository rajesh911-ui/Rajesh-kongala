import React from 'react';

export const CoreCapabilities: React.FC = () => {
  const capabilities = [
    {
      code: 'CAP_01',
      title: 'Prompt-Driven Web Engineering',
      desc: 'Master the art of crafting system prompts, role definitions, and iterative context loops that generate complex responsive layouts with zero hallucination.',
      badge: 'PROMPT OPS'
    },
    {
      code: 'CAP_02',
      title: 'Visual Multi-Modal Synthesis',
      desc: 'Feed sketches, wireframe images, or reference websites directly to vision-capable AI models and receive pixel-precise Tailwind and React code in seconds.',
      badge: 'VISION AI'
    },
    {
      code: 'CAP_03',
      title: 'Real-Time State & Integrations',
      desc: 'Learn to direct AI builders to incorporate payment gateways, email collectors, database persistence, and dynamic animations without backend headaches.',
      badge: 'FULL STACK'
    },
    {
      code: 'CAP_04',
      title: 'SEO & Performance Optimization',
      desc: 'Automate search engine optimization, semantic HTML markup, Lighthouse 100 performance scores, and high-converting copywriting tailored to your target audience.',
      badge: 'LIGHTHOUSE 100'
    }
  ];

  return (
    <section className="section-box relative z-10" id="capabilities">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="label mb-3">// 02_CAPABILITIES</div>
          <h2 className="font-headline font-extrabold text-3xl sm:text-4xl md:text-5xl uppercase tracking-[-0.04em] text-[#e0e0e6]">
            SIX-WEEK TECHNICAL TRANSFORMATION
          </h2>
        </div>
        <div className="font-mono text-xs text-[rgba(224,224,230,0.5)]">
          // CONTINUOUS ARCHITECTURE BENCHMARKING
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 bg-[rgba(224,224,230,0.1)] border border-[rgba(224,224,230,0.1)]">
        {capabilities.map((cap) => (
          <div key={cap.code} className="bg-[#0b0b0d] p-8 sm:p-10 flex flex-col justify-between hover:bg-[#111116] transition-colors">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs text-[#00ff7f] tracking-widest">{cap.code}</span>
                <span className="label text-[0.6rem]">{cap.badge}</span>
              </div>
              <h3 className="font-headline text-2xl font-bold uppercase text-[#e0e0e6] mb-3">
                {cap.title}
              </h3>
              <p className="font-body text-sm text-[rgba(224,224,230,0.65)] leading-relaxed">
                {cap.desc}
              </p>
            </div>
            <div className="pt-6 mt-8 border-t border-[rgba(224,224,230,0.08)] flex items-center gap-2 font-mono text-xs text-[#00ff7f]">
              <span className="material-symbols-outlined text-sm">check_circle</span>
              <span>VERIFIED COHORT STANDARD</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
