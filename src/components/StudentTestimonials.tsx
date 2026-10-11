import React, { useState } from 'react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  category: 'all' | 'freelance' | 'founder' | 'career';
  avatarInitials: string;
  avatarColor: string;
  quote: string;
  outcome: string;
  siteBuilt: string;
  stars: number;
  cohort: string;
}

const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'elena',
    name: 'Elena Rostova',
    role: 'Freelance Designer & Web Architect',
    category: 'freelance',
    avatarInitials: 'ER',
    avatarColor: '#00ff7f',
    quote:
      'I had zero coding background and was terrified of building dynamic web applications. Within 10 days of Module 3, I delivered an interactive portal for an architectural studio that netted me $4,200.',
    outcome: 'Landed $4,200 client contract in Week 2',
    siteBuilt: 'studio-vanguard.ai',
    stars: 5,
    cohort: 'Spring 2025 Graduate'
  },
  {
    id: 'marcus',
    name: 'Marcus Chen',
    role: 'Tech Founder & Product Lead',
    category: 'founder',
    avatarInitials: 'MC',
    avatarColor: '#4cd7f6',
    quote:
      'Saved us at least $15,000 in frontend engineering agency fees. We iterated 4 completely responsive marketing funnels in one weekend using the generative intelligence workflow taught in Module 4.',
    outcome: 'Saved $15k dev budget • 21% conv rate',
    siteBuilt: 'neuralflux.co',
    stars: 5,
    cohort: 'Fall 2024 Graduate'
  },
  {
    id: 'priya',
    name: 'Priya Patel',
    role: 'Marketing Lead turned Builder',
    category: 'career',
    avatarInitials: 'PP',
    avatarColor: '#00ff7f',
    quote:
      'The prompt-to-production blueprint is unmatched. Instead of waiting weeks for developer sprint tickets, I now architect, build, and deploy high-converting landing pages with real-time feedback in hours.',
    outcome: 'Shipped 8 campaign sites in 30 days',
    siteBuilt: 'apexmarketing.agency',
    stars: 5,
    cohort: 'Winter 2025 Graduate'
  },
  {
    id: 'david',
    name: 'David Okafor',
    role: 'Agency Founder & Solopreneur',
    category: 'freelance',
    avatarInitials: 'DO',
    avatarColor: '#e0e0e6',
    quote:
      'Went from charging $600 for static WordPress themes to selling $5,500 custom AI-accelerated web experiences. The course pays for itself ten times over on your very first client delivery.',
    outcome: 'Scaled agency revenue to $18k/month',
    siteBuilt: 'luminarydigital.co',
    stars: 5,
    cohort: 'Fall 2024 Graduate'
  },
  {
    id: 'sophia',
    name: 'Sophia Martinez',
    role: 'E-commerce Brand Owner',
    category: 'founder',
    avatarInitials: 'SM',
    avatarColor: '#00ff7f',
    quote:
      'Rebuilt our entire Shopify headless landing funnel with zero developer retainers. Our average order value jumped by 32% thanks to custom interactive elements created using the generative layout modules.',
    outcome: '+32% AOV on store redesign launch',
    siteBuilt: 'organicskinlabs.store',
    stars: 5,
    cohort: 'Summer 2025 Graduate'
  },
  {
    id: 'liam',
    name: 'Liam Vance',
    role: 'Junior Designer -> Full Stack Producer',
    category: 'career',
    avatarInitials: 'LV',
    avatarColor: '#4cd7f6',
    quote:
      'Got promoted to Senior Creative Technologist because I can now turn Figma artboards into working web apps overnight. My engineering team was stunned by the speed and code cleanliness.',
    outcome: 'Promoted with 40% salary increase',
    siteBuilt: 'kineticmotion.design',
    stars: 5,
    cohort: 'Spring 2025 Graduate'
  }
];

export const StudentTestimonials: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'freelance' | 'founder' | 'career'>('all');

  const filteredTestimonials =
    activeCategory === 'all'
      ? TESTIMONIALS_DATA
      : TESTIMONIALS_DATA.filter((t) => t.category === activeCategory);

  return (
    <section className="section-box relative z-10" id="testimonials">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="label mb-3">// 04_SOCIAL_PROOF</div>
          <h2 className="font-headline font-extrabold text-3xl sm:text-4xl md:text-5xl uppercase tracking-[-0.04em] text-[#e0e0e6]">
            VERIFIED GRADUATE AUDIT LOGS
          </h2>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 font-mono text-xs">
          {[
            { id: 'all', label: 'ALL_LOGS [6]' },
            { id: 'freelance', label: 'AGENCY_CLIENTS' },
            { id: 'founder', label: 'FOUNDERS' },
            { id: 'career', label: 'CAREER_SHIFTS' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as any)}
              className={`px-3 py-1.5 border transition-all cursor-pointer ${
                activeCategory === tab.id
                  ? 'border-[#00ff7f] bg-[#00ff7f] text-[#0b0b0d] font-bold'
                  : 'border-[rgba(224,224,230,0.15)] text-[rgba(224,224,230,0.7)] hover:border-[#00ff7f] hover:text-[#00ff7f]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Testimonials Grid - Variation 3 Technical Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 bg-[rgba(224,224,230,0.1)] border border-[rgba(224,224,230,0.1)]">
        {filteredTestimonials.map((item) => (
          <div
            key={item.id}
            className="bg-[#0b0b0d] p-8 flex flex-col justify-between hover:bg-[#111116] transition-colors"
          >
            <div>
              {/* Header Info */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-[rgba(224,224,230,0.08)]">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 flex items-center justify-center font-mono font-bold text-xs text-[#0b0b0d]"
                    style={{ backgroundColor: item.avatarColor }}
                  >
                    {item.avatarInitials}
                  </div>
                  <div>
                    <h4 className="font-headline font-bold text-sm uppercase text-[#e0e0e6]">
                      {item.name}
                    </h4>
                    <p className="font-mono text-[0.65rem] text-[rgba(224,224,230,0.5)]">
                      {item.role}
                    </p>
                  </div>
                </div>

                <div className="flex text-[#00ff7f] text-xs">
                  {'★'.repeat(item.stars)}
                </div>
              </div>

              {/* Quote */}
              <p className="font-body text-sm text-[rgba(224,224,230,0.75)] leading-relaxed mb-6 italic">
                "{item.quote}"
              </p>
            </div>

            {/* Bottom Outcome & Site Metadata */}
            <div className="pt-4 border-t border-[rgba(224,224,230,0.08)] flex flex-col gap-2 font-mono text-xs">
              <div className="flex items-center gap-2 text-[#00ff7f]">
                <span className="material-symbols-outlined text-sm">verified</span>
                <span className="text-[0.7rem] font-bold">{item.outcome}</span>
              </div>
              <div className="flex items-center justify-between text-[0.65rem] text-[rgba(224,224,230,0.4)]">
                <span>SITE: {item.siteBuilt}</span>
                <span>{item.cohort}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
