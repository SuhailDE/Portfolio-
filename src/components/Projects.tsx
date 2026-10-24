import React, { useState } from 'react';
import { ExternalLink, Github, Layers, ArrowUpRight, X, Database, Server, Check } from 'lucide-react';
import { Project } from '../types/portfolio';

interface ProjectsProps {
  projects: Project[];
  loading: boolean;
  onOpenMongoPlayground: () => void;
}

export const Projects: React.FC<ProjectsProps> = ({ projects, loading, onOpenMongoPlayground }) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ['All', 'Full-Stack', 'React & UI', 'Node & Mongo'];

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Full-Stack') return project.category === 'Full-Stack';
    if (activeFilter === 'React & UI') return project.tags.includes('React') || project.tags.includes('Tailwind CSS');
    if (activeFilter === 'Node & Mongo') return project.tags.includes('MongoDB') && project.tags.includes('Node.js');
    return true;
  });

  return (
    <section id="projects" className="py-24 relative border-t border-slate-800/80 bg-[#060b13]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
              Featured Engineering
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Production Full-Stack Projects
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              Real-world web applications built with the MERN stack, featuring performant APIs, responsive UI layouts, and structured database models.
            </p>
          </div>

          {/* Interactive Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900/80 border border-slate-800 rounded-xl overflow-x-auto self-start md:self-auto shrink-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
                  activeFilter === cat
                    ? 'bg-cyan-400 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((n) => (
              <div
                key={n}
                className="h-96 rounded-2xl bg-slate-900/40 border border-slate-800 animate-pulse p-6"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project._id}
                className="group rounded-2xl bg-slate-900/40 border border-slate-800/90 hover:border-slate-700 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/5"
              >
                {/* Project Image Container */}
                <div
                  className="relative aspect-video w-full overflow-hidden bg-slate-950 cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    onError={(e) => {
                      // Fallback styled container
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Top Category Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-2.5 py-1 text-[11px] font-semibold text-cyan-300 bg-slate-950/80 backdrop-blur-md rounded-md border border-cyan-500/30">
                      {project.category}
                    </span>
                  </div>

                  {/* Hover Prompt */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs bg-slate-950/40">
                    <span className="px-4 py-2 rounded-xl bg-cyan-400 text-slate-950 font-semibold text-xs flex items-center gap-1.5 shadow-lg">
                      View Architecture & Specs
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3
                      onClick={() => setSelectedProject(project)}
                      className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors cursor-pointer mb-2 flex items-center justify-between gap-2"
                    >
                      <span>{project.title}</span>
                      <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 transition-colors shrink-0" />
                    </h3>

                    <p className="text-sm text-slate-300 leading-relaxed mb-4">
                      {project.tagline}
                    </p>

                    {/* Tags List with typographic discipline */}
                    <div className="flex flex-wrap items-center gap-2 mb-6">
                      {project.tags.slice(0, 5).map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs text-slate-400 bg-slate-800/60 px-2.5 py-1 rounded-md border border-slate-700/60"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 5 && (
                        <span className="text-xs text-slate-500">
                          +{project.tags.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Footer Action Links */}
                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <div className="text-slate-400 font-mono text-[11px] truncate max-w-[200px]">
                      {project.metrics || 'Production Tested'}
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="text-slate-300 hover:text-cyan-400 font-medium transition-colors"
                      >
                        Deep Dive
                      </button>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                        title="GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 text-cyan-400 hover:text-cyan-300 rounded-lg hover:bg-cyan-950/40 transition-colors"
                        title="Live Application Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* MongoDB Backend Explorer CTA banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-cyan-950/30 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white">
                Interactive MERN Backend & MongoDB Explorer
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Inspect live database collections, run schema queries, and test Node.js REST endpoints directly.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenMongoPlayground}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 hover:text-cyan-300 border border-cyan-500/30 font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all shrink-0 self-start md:self-auto"
          >
            <span>Launch Database Console</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-3xl max-h-[90vh] bg-[#0b1324] border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90 sticky top-0 z-20">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                <h3 className="font-bold text-lg text-white truncate max-w-md">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="overflow-y-auto p-6 space-y-6">
              {/* Media Preview */}
              <div className="rounded-xl overflow-hidden aspect-video bg-slate-950 border border-slate-800">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Narrative Description */}
              <div>
                <h4 className="text-xs uppercase font-semibold text-cyan-400 tracking-wider mb-2">
                  Architecture & Implementation
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {selectedProject.longDescription || selectedProject.description}
                </p>
              </div>

              {/* Tech Stack Distribution */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
                <div>
                  <span className="text-cyan-400 font-semibold block mb-2 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" /> Frontend
                  </span>
                  <ul className="space-y-1 text-slate-300">
                    {selectedProject.techStack.frontend.map((t, idx) => (
                      <li key={idx}>· {t}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="text-cyan-400 font-semibold block mb-2 flex items-center gap-1.5">
                    <Server className="w-3.5 h-3.5" /> Backend
                  </span>
                  <ul className="space-y-1 text-slate-300">
                    {selectedProject.techStack.backend.map((t, idx) => (
                      <li key={idx}>· {t}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="text-cyan-400 font-semibold block mb-2 flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5" /> Database
                  </span>
                  <ul className="space-y-1 text-slate-300">
                    {selectedProject.techStack.database.map((t, idx) => (
                      <li key={idx}>· {t}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Key Features */}
              <div>
                <h4 className="text-xs uppercase font-semibold text-cyan-400 tracking-wider mb-3">
                  Key Technical Features
                </h4>
                <ul className="grid grid-cols-1 gap-2.5 text-xs sm:text-sm text-slate-300">
                  {selectedProject.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Database Schema & Endpoints */}
              {selectedProject.apiEndpoints && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px] font-sans font-medium mb-1">
                      MongoDB Schema Architecture:
                    </span>
                    <span className="text-slate-200">{selectedProject.dbSchemaSummary}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px] font-sans font-medium mb-1">
                      Primary API Endpoints:
                    </span>
                    <div className="space-y-1 text-cyan-300">
                      {selectedProject.apiEndpoints.map((ep, idx) => (
                        <div key={idx}>· {ep}</div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Actions Footer */}
            <div className="px-6 py-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between gap-4">
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>Source Code</span>
              </a>

              <a
                href={selectedProject.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors shadow-md shadow-cyan-500/20"
              >
                <span>Launch Live App</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
