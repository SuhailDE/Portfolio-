import React from 'react';
import { ArrowUpRight, Code2, ArrowDown } from 'lucide-react';

interface HeroProps {
  onContactClick: () => void;
  onAboutClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onContactClick, onAboutClick }) => {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] sm:min-h-screen pt-28 pb-16 flex flex-col justify-between items-center overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Subtle grid texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #22d3ee 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex-1 flex flex-col justify-center">
        {/* Top Status Pill */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-medium tracking-wide shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Open to opportunities</span>
          </div>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight mb-3">
          Hi, I&apos;m Suhail Hossain
        </h1>

        {/* Subtitle / Role */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-400 tracking-tight mb-5">
          MERN Stack Developer
        </h2>

        {/* Tagline */}
        <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed mb-8">
          I create modern, responsive web applications with clean UI and smooth user experiences.
        </p>

        {/* Hero Buttons matching the mockup */}
        <div className="flex flex-wrap items-center gap-4 mb-12">
          {/* Primary Contact Me Button */}
          <button
            onClick={onContactClick}
            className="group px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold text-sm sm:text-base flex items-center gap-2 transition-all duration-200 shadow-lg shadow-cyan-500/25 active:scale-95"
          >
            <span>Contact Me</span>
            <div className="p-0.5 bg-slate-950/15 rounded group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
              <ArrowUpRight className="w-4 h-4 text-slate-950 stroke-[2.5]" />
            </div>
          </button>

          {/* Secondary About Me Button */}
          <button
            onClick={onAboutClick}
            className="px-6 py-3 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-700 hover:border-slate-500 text-white font-semibold text-sm sm:text-base transition-all duration-200 active:scale-95"
          >
            About Me
          </button>
        </div>

        {/* Floating Feature Card (Exact replica from the design mockup) */}
        <div className="w-full max-w-3xl rounded-2xl bg-slate-900/50 border border-slate-800/80 p-5 sm:p-6 backdrop-blur-md shadow-2xl shadow-black/60 relative overflow-hidden group">
          {/* Subtle top edge highlight */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-950/70 border border-cyan-500/30 flex items-center justify-center shrink-0 text-cyan-400 shadow-inner group-hover:scale-105 transition-transform">
                <Code2 className="w-6 h-6 stroke-[2]" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg sm:text-xl">
                  Full-Stack Web Development
                </h3>
                <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-400 mt-1">
                  <span>React</span>
                  <span className="text-slate-600">·</span>
                  <span>Node.js</span>
                  <span className="text-slate-600">·</span>
                  <span>Express</span>
                  <span className="text-slate-600">·</span>
                  <span>MongoDB</span>
                </div>
              </div>
            </div>

            <div className="sm:text-right pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800/60">
              <p className="text-xs sm:text-sm text-cyan-400/90 font-medium tracking-wide">
                Building ideas into digital experiences.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator matching the white circle button */}
      <div className="relative z-10 pt-6 pb-2">
        <button
          onClick={onAboutClick}
          aria-label="Scroll to About section"
          className="w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-lg hover:shadow-cyan-500/20 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
        >
          <ArrowDown className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>
    </section>
  );
};
