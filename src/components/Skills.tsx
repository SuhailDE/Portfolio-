import React, { useState } from 'react';
import { Layers, Server, Database, Wrench, CheckCircle2 } from 'lucide-react';
import { SkillCategory } from '../types/portfolio';

interface SkillsProps {
  skillCategories: SkillCategory[];
  loading: boolean;
}

export const Skills: React.FC<SkillsProps> = ({ skillCategories, loading }) => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  const getCategoryIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Layers className="w-5 h-5 text-cyan-400" />;
      case 1:
        return <Server className="w-5 h-5 text-cyan-400" />;
      case 2:
        return <Database className="w-5 h-5 text-cyan-400" />;
      case 3:
      default:
        return <Wrench className="w-5 h-5 text-cyan-400" />;
    }
  };

  if (loading || skillCategories.length === 0) {
    return (
      <section id="skills" className="py-24 border-t border-slate-800/80 bg-[#060b13]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-400">
          Loading technical stack...
        </div>
      </section>
    );
  }

  const activeCategory = skillCategories[activeCategoryIndex] || skillCategories[0];

  return (
    <section id="skills" className="py-24 relative border-t border-slate-800/80 bg-[#060b13]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
            Technical Proficiency
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            Core MERN Stack & Architecture
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Hands-on technical competencies honed through continuous production delivery, architectural refactoring, and benchmark performance tuning.
          </p>
        </div>

        {/* Category Switcher Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {skillCategories.map((cat, idx) => {
            const isActive = activeCategoryIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveCategoryIndex(idx)}
                className={`p-4 rounded-xl border text-left transition-all duration-200 flex items-start gap-3.5 ${
                  isActive
                    ? 'bg-slate-900 border-cyan-400/60 shadow-lg shadow-cyan-500/10'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/70'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                    isActive ? 'bg-cyan-950 border border-cyan-500/40' : 'bg-slate-800/60'
                  }`}
                >
                  {getCategoryIcon(idx)}
                </div>
                <div>
                  <h4 className={`text-sm font-semibold ${isActive ? 'text-cyan-400' : 'text-slate-200'}`}>
                    {cat.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                    {cat.skills.length} core technologies
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Category Overview */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/40 border border-slate-800 mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-800">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span>{activeCategory.title}</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 font-mono">
                  Production Ready
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
                {activeCategory.description}
              </p>
            </div>
            <div className="text-xs text-slate-400 font-mono">
              Category {activeCategoryIndex + 1} of {skillCategories.length}
            </div>
          </div>

          {/* Detailed Skill Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeCategory.skills.map((skill, sIdx) => (
              <div
                key={sIdx}
                className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-white">{skill.name}</span>
                    {skill.highlight && (
                      <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded font-mono font-medium">
                        Core Focus
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-mono text-cyan-400 font-semibold">
                    {skill.level}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-2.5">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-700"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="line-clamp-1">{skill.description}</span>
                  <span className="font-mono text-slate-500 text-[11px] shrink-0 ml-2">
                    {skill.experience}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MERN Architecture Summary Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs">
          <div className="space-y-1">
            <span className="font-mono text-cyan-400 font-bold">M — MongoDB</span>
            <p className="text-slate-400">Document store, aggregation stages, replica indexing & transactional safety.</p>
          </div>
          <div className="space-y-1">
            <span className="font-mono text-cyan-400 font-bold">E — Express.js</span>
            <p className="text-slate-400">Modular routers, JWT middleware, rate-limiting & standardized JSON payloads.</p>
          </div>
          <div className="space-y-1">
            <span className="font-mono text-cyan-400 font-bold">R — React.js</span>
            <p className="text-slate-400">Modern functional components, custom hooks, atomic state, and Tailwind layouts.</p>
          </div>
          <div className="space-y-1">
            <span className="font-mono text-cyan-400 font-bold">N — Node.js</span>
            <p className="text-slate-400">Non-blocking event loop, stream processing, micro-APIs & npm ecosystem mastery.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
