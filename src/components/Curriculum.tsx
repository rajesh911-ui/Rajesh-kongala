import React, { useState } from 'react';
import { COURSE_MODULES } from '../data/courseData';

export const Curriculum: React.FC = () => {
  const [expandedModules, setExpandedModules] = useState<number[]>([1, 2]);

  const toggleModule = (id: number) => {
    setExpandedModules((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const expandAll = () => {
    if (expandedModules.length === COURSE_MODULES.length) {
      setExpandedModules([]);
    } else {
      setExpandedModules(COURSE_MODULES.map((m) => m.id));
    }
  };

  return (
    <section className="section-box relative z-10" id="curriculum">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="label mb-3">// 03_ROADMAP</div>
          <h2 className="font-headline font-extrabold text-3xl sm:text-4xl md:text-5xl uppercase tracking-[-0.04em] text-[#e0e0e6]">
            SIX MODULAR PHASES TO PRODUCTION
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={expandAll}
            className="btn py-2 px-4 text-xs cursor-pointer"
          >
            {expandedModules.length === COURSE_MODULES.length ? 'COLLAPSE ALL' : 'EXPAND ALL [6]'}
          </button>
        </div>
      </div>

      {/* Module Rows List - Technical System Layout */}
      <div className="border-t border-[rgba(224,224,230,0.1)]">
        {COURSE_MODULES.map((mod, idx) => {
          const isExpanded = expandedModules.includes(mod.id);
          const formattedIndex = String(idx + 1).padStart(2, '0');

          return (
            <div
              key={mod.id}
              className="border-b border-[rgba(224,224,230,0.1)] transition-colors hover:bg-[rgba(255,255,255,0.01)]"
            >
              {/* Row Header */}
              <div
                onClick={() => toggleModule(mod.id)}
                className="py-6 sm:py-8 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none"
              >
                <div className="flex items-start md:items-center gap-4 sm:gap-6">
                  {/* Big Monospace Index */}
                  <span className="font-mono text-xl sm:text-2xl font-bold text-[#00ff7f]">
                    {formattedIndex}
                  </span>

                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="label text-[0.58rem] py-0 px-1.5">WEEK {mod.id}</span>
                      <span className="font-mono text-xs text-[rgba(224,224,230,0.4)]">
                        // {mod.duration || '6 LECTURES • 3 LABS'}
                      </span>
                    </div>
                    <h3 className="font-headline text-xl sm:text-2xl font-bold uppercase text-[#e0e0e6]">
                      {mod.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-4 ml-10 md:ml-0">
                  <span className="font-mono text-xs text-[#00ff7f] hidden sm:inline-block">
                    ● ACTIVE SYLLABUS
                  </span>
                  <div className="w-8 h-8 border border-[rgba(224,224,230,0.2)] flex items-center justify-center text-[#e0e0e6] transition-transform">
                    <span className="material-symbols-outlined text-lg">
                      {isExpanded ? 'remove' : 'add'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Expanded Lessons Detail */}
              {isExpanded && (
                <div className="pb-8 pt-2 pl-4 sm:pl-14 border-t border-[rgba(224,224,230,0.06)] bg-[rgba(255,255,255,0.015)]">
                  <p className="font-body text-sm text-[rgba(224,224,230,0.7)] mb-6 max-w-3xl">
                    {mod.summary}
                  </p>

                  <div className="font-mono text-xs text-[#00ff7f] mb-3">
                    // HANDS-ON LEARNING OBJECTIVES:
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-4xl">
                    {mod.topics.map((topic, tIdx) => (
                      <div
                        key={tIdx}
                        className="p-3 border border-[rgba(224,224,230,0.1)] bg-[#0b0b0d] flex items-center gap-3 text-xs font-mono text-[rgba(224,224,230,0.85)]"
                      >
                        <span className="text-[#00ff7f]">✔</span>
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
