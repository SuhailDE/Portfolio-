import React from 'react';
import { Layers, Zap, Server, Database, CheckCircle, FileText, Mail, MapPin } from 'lucide-react';

interface AboutProps {
  onContactClick: () => void;
  onViewProjects: () => void;
}

export const About: React.FC<AboutProps> = ({ onContactClick, onViewProjects }) => {
  const pillars = [
    {
      icon: <Layers className="w-5 h-5 text-cyan-400" />,
      title: 'Frontend React Architecture',
      description: 'Building reactive interfaces with modern React 19, hooks, component reusability, and lightning-fast Tailwind CSS utility layouts.'
    },
    {
      icon: <Server className="w-5 h-5 text-cyan-400" />,
      title: 'Node.js & Express Backends',
      description: 'Designing modular REST APIs, secure JWT authentication flows, request validation, error-handling middleware, and CORS security.'
    },
    {
      icon: <Database className="w-5 h-5 text-cyan-400" />,
      title: 'MongoDB & Data Modeling',
      description: 'Architecting NoSQL BSON document models, compound indexes, aggregation pipelines, and atomic transactions with Mongoose ODM.'
    },
    {
      icon: <Zap className="w-5 h-5 text-cyan-400" />,
      title: 'Responsive & Accessible UX',
      description: 'Obsessed with fluid responsive layouts on mobile, tablet, and 4K desktops with zero layout shifts and sub-100ms interactions.'
    }
  ];

  const metrics = [
    { value: '3+', label: 'Years Experience', detail: 'Hands-on Full-Stack Building' },
    { value: '24+', label: 'Projects Completed', detail: 'SPAs, APIs & Dashboards' },
    { value: '<50ms', label: 'Average Query Time', detail: 'Optimized MongoDB Indexes' },
    { value: '100%', label: 'Responsive Testing', detail: 'Mobile & Desktop Verified' }
  ];

  return (
    <section id="about" className="py-24 relative border-t border-slate-800/80 bg-[#060b13]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
            About Suhail Hossain
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            Passionate MERN Engineer Building Scalable Web Products
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            I specialize in transforming intricate product ideas into performant, elegant digital systems. With deep expertise across the complete MERN stack, I bridge the gap between intuitive user design and resilient backend architecture.
          </p>
        </div>

        {/* 2-Column Main Content Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-16">
          {/* Left Column: Narrative & Philosophy */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4 text-slate-300 leading-relaxed text-sm sm:text-base">
              <p>
                My development workflow centers around building clean, maintainable systems. Whether designing complex data schemas in <span className="text-cyan-400 font-medium">MongoDB</span>, crafting bulletproof RESTful micro-endpoints in <span className="text-cyan-400 font-medium">Express & Node.js</span>, or constructing responsive component hierarchies in <span className="text-cyan-400 font-medium">React & Tailwind</span>, I focus on performance, accessibility, and clean abstractions.
              </p>
              <p>
                Having delivered enterprise dashboards, e-commerce marketplaces, and real-time collaboration platforms, I adhere to strict code-review guidelines, automated validation, and mobile-first responsiveness.
              </p>
            </div>

            {/* Core Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {pillars.map((pillar, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-cyan-950/60 border border-cyan-500/20 flex items-center justify-center mb-3">
                    {pillar.icon}
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-1.5">{pillar.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Developer Profile Card */}
          <div className="lg:col-span-5 rounded-2xl bg-slate-900/40 border border-slate-800 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-black text-2xl shadow-lg shadow-cyan-500/20">
                  SH
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Suhail Hossain</h3>
                  <p className="text-xs text-cyan-400 font-medium">Full-Stack MERN Developer</p>
                  <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>Global Remote / Worldwide</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 py-4 border-y border-slate-800/80 text-xs sm:text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Availability</span>
                  <span className="text-emerald-400 font-medium flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Available for hire
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Primary Stack</span>
                  <span className="text-slate-200 font-mono">React · Node · Mongo · Express</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Direct Email</span>
                  <a
                    href="mailto:suhail0168@gmail.com"
                    className="text-cyan-400 hover:underline font-mono"
                  >
                    suhail0168@gmail.com
                  </a>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Code Architecture</span>
                  <span className="text-slate-200">Layered MVC / REST</span>
                </div>
              </div>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={onContactClick}
                className="flex-1 py-2.5 px-4 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors shadow-md shadow-cyan-500/20"
              >
                <Mail className="w-4 h-4" />
                <span>Message Me</span>
              </button>
              <button
                onClick={onViewProjects}
                className="py-2.5 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span>Explore Works</span>
              </button>
            </div>
          </div>
        </div>

        {/* Full-Width Metrics Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 rounded-2xl bg-slate-900/30 border border-slate-800">
          {metrics.map((metric, i) => (
            <div key={i} className="text-center sm:text-left">
              <div className="text-3xl sm:text-4xl font-extrabold text-cyan-400 font-mono tracking-tight mb-1">
                {metric.value}
              </div>
              <div className="text-sm font-semibold text-white mb-0.5">{metric.label}</div>
              <div className="text-xs text-slate-500">{metric.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
