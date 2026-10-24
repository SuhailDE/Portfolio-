import React from 'react';
import { Layers, Zap, Server, Database, CheckCircle, FileText, Mail, MapPin, Rocket, BookOpen, Download } from 'lucide-react';

interface AboutProps {
  onContactClick: () => void;
  onViewProjects: () => void;
}

export const About: React.FC<AboutProps> = ({ onContactClick, onViewProjects }) => {
  const pillars = [
    {
      icon: <Layers className="w-5 h-5 text-cyan-400" />,
      title: 'Modern React & Tailwind UI',
      description: 'Crafting responsive user interfaces with React 19, functional hooks, clean component state, and utility-first Tailwind CSS.'
    },
    {
      icon: <Server className="w-5 h-5 text-cyan-400" />,
      title: 'Express & Node.js REST APIs',
      description: 'Structuring clean API route handlers, JSON request validation, error-handling middleware, and JWT authentication.'
    },
    {
      icon: <Database className="w-5 h-5 text-cyan-400" />,
      title: 'MongoDB Document Modeling',
      description: 'Designing NoSQL schemas with Mongoose ODM, understanding document relationships, compound indexes, and queries.'
    },
    {
      icon: <Rocket className="w-5 h-5 text-cyan-400" />,
      title: 'Continuous Learner & Builder',
      description: 'Self-motivated developer constantly reading documentation, building real apps, and eager to grow rapidly inside an agile engineering team.'
    }
  ];

  const metrics = [
    { value: '100%', label: 'Driven & Hungry', detail: 'Rapid Learner & Dedicated Coder' },
    { value: '4+', label: 'Full-Stack Apps', detail: 'End-to-End MERN Projects' },
    { value: '<50ms', label: 'API Query Speed', detail: 'Optimized MongoDB Queries' },
    { value: 'Mobile', label: 'Responsive First', detail: 'Tested on Desktop & Phone' }
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
            Aspiring MERN Developer Driven by Building Real Projects
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            I am an ambitious, entry-level full-stack web developer passionate about the JavaScript & TypeScript ecosystem. I love taking projects from an empty terminal to a fully functioning, responsive web application.
          </p>
        </div>

        {/* 2-Column Main Content Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-16">
          {/* Left Column: Narrative & Philosophy */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4 text-slate-300 leading-relaxed text-sm sm:text-base">
              <p>
                As an entry-level developer, I focus on strong fundamentals and practical execution. Rather than just following tutorials, I learn by building complete applications—connecting <span className="text-cyan-400 font-medium">React</span> frontends with <span className="text-cyan-400 font-medium">Node.js and Express</span> backends, and persisting real data in <span className="text-cyan-400 font-medium">MongoDB</span>.
              </p>
              <p>
                I am actively seeking an entry-level software engineer, junior web developer, or internship role where I can bring my work ethic, enthusiasm, and fresh perspective to a collaborative team while continuing to absorb best practices from senior engineers.
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
                  <p className="text-xs text-cyan-400 font-medium">Junior / Entry-Level MERN Developer</p>
                  <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>Open to Remote & On-Site Roles</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 py-4 border-y border-slate-800/80 text-xs sm:text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Career Level</span>
                  <span className="text-cyan-400 font-medium flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    Entry-Level / Junior
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Availability</span>
                  <span className="text-emerald-400 font-medium flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Ready to Start Immediately
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Primary Stack</span>
                  <span className="text-slate-200 font-mono">React · Node · Express · Mongo</span>
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
                  <span className="text-slate-400">LinkedIn</span>
                  <a
                    href="https://www.linkedin.com/in/suhail-hossain-4a9980343/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 hover:underline font-mono truncate max-w-[200px]"
                  >
                    suhail-hossain-4a9980343
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-6 flex flex-col gap-2.5">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={onContactClick}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors shadow-md shadow-cyan-500/20"
                >
                  <Mail className="w-4 h-4" />
                  <span>Get in Touch</span>
                </button>
                <button
                  onClick={onViewProjects}
                  className="py-2.5 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  <span>View Projects</span>
                </button>
              </div>

              <a
                href="/suhail-mern-portfolio.zip"
                download="suhail-mern-portfolio.zip"
                className="w-full py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-slate-900 border border-cyan-500/30 text-cyan-400 hover:text-cyan-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download Source Code (.ZIP)</span>
              </a>
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
