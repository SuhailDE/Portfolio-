import React from 'react';
import { Briefcase, GraduationCap, Award, Calendar, MapPin } from 'lucide-react';

export const Experience: React.FC = () => {
  const experiences = [
    {
      period: '2024 — Present',
      role: 'Full-Stack MERN Developer',
      company: 'Apex Cloud Solutions',
      location: 'Remote / Global',
      description: 'Lead engineering for enterprise client web applications, designing modular React frontends paired with Express microservices and MongoDB database clusters.',
      achievements: [
        'Architected high-throughput REST APIs handling 100k+ monthly requests with <45ms response time.',
        'Structured compound indexing and aggregation pipelines in MongoDB, reducing database latency by 42%.',
        'Standardized component library using Tailwind CSS and React 19, accelerating client delivery cycles.'
      ],
      technologies: ['React 19', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Docker', 'Redis']
    },
    {
      period: '2022 — 2024',
      role: 'Full-Stack Web Developer',
      company: 'Velocity Labs',
      location: 'Remote',
      description: 'Developed bespoke e-commerce platforms, SaaS workflows, and interactive analytics dashboards for global clients.',
      achievements: [
        'Built full-stack e-commerce marketplace with Stripe payment webhooks and atomic stock decrementing.',
        'Engineered responsive client portals ensuring 100% mobile-first fidelity and zero layout shifts.',
        'Implemented JWT token authentication and role-based permissions across multiple micro-services.'
      ],
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Redux Toolkit', 'Tailwind CSS']
    },
    {
      period: '2021 — 2022',
      role: 'Frontend Developer',
      company: 'Digital Horizon Agency',
      location: 'Hybrid',
      description: 'Crafted modern user interfaces and client-facing web applications focusing on clean design systems and cross-device performance.',
      achievements: [
        'Developed 15+ responsive landing pages and web apps with 98+ Google Lighthouse scores.',
        'Integrated third-party REST APIs and real-time WebSocket event listeners.'
      ],
      technologies: ['React', 'JavaScript (ES6+)', 'Tailwind CSS', 'HTML5/CSS3', 'REST APIs']
    }
  ];

  const educationAndCerts = [
    {
      type: 'Degree',
      title: 'Bachelor of Science in Computer Science',
      institution: 'University School of Computing',
      year: 'Graduated with Honors',
      icon: <GraduationCap className="w-5 h-5 text-cyan-400" />,
      detail: 'Focus on Data Structures, Algorithms, Database Management Systems, and Software Engineering.'
    },
    {
      type: 'Certification',
      title: 'MongoDB Certified Associate Developer',
      institution: 'MongoDB University',
      year: 'Issued 2024',
      icon: <Award className="w-5 h-5 text-cyan-400" />,
      detail: 'Mastery in Data Modeling, Aggregation Pipelines, Transactions, and Cloud Atlas Administration.'
    },
    {
      type: 'Certification',
      title: 'Full-Stack JavaScript & Node.js Architecture',
      institution: 'Advanced Developer Institute',
      year: 'Issued 2023',
      icon: <Award className="w-5 h-5 text-cyan-400" />,
      detail: 'RESTful API Engineering, Middleware Design, Asynchronous Programming, and Security Hardening.'
    }
  ];

  return (
    <section id="experience" className="py-24 relative border-t border-slate-800/80 bg-[#060b13]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
            Career Journey
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            Experience & Education
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            A consistent track record of full-stack engineering, delivering stable production software from idea to deployment.
          </p>
        </div>

        {/* 2-Column Grid: Timeline on Left, Education/Certs on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Work Experience Timeline */}
          <div className="lg:col-span-7 space-y-8">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
              <Briefcase className="w-5 h-5 text-cyan-400" />
              <span>Work Experience</span>
            </h3>

            <div className="relative pl-6 sm:pl-8 border-l border-slate-800 space-y-10">
              {experiences.map((exp, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline node dot */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-slate-900 border-2 border-cyan-400 group-hover:scale-125 transition-transform" />

                  <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 group-hover:border-slate-700 transition-colors">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-mono font-semibold text-cyan-400 bg-cyan-950/60 border border-cyan-500/20 px-2.5 py-0.5 rounded-md flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        {exp.period}
                      </span>
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {exp.location}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-white mt-2">{exp.role}</h4>
                    <p className="text-sm font-medium text-slate-300 mb-3">{exp.company}</p>

                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
                      {exp.description}
                    </p>

                    <div className="space-y-1.5 mb-5 text-xs text-slate-300">
                      {exp.achievements.map((ach, aIdx) => (
                        <div key={aIdx} className="flex items-start gap-2">
                          <span className="text-cyan-400 font-bold">›</span>
                          <span>{ach}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-slate-800/80">
                      {exp.technologies.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[11px] font-mono text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Education & Professional Certifications */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
              <Award className="w-5 h-5 text-cyan-400" />
              <span>Education & Credentials</span>
            </h3>

            <div className="space-y-4">
              {educationAndCerts.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/20 flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded">
                          {item.type}
                        </span>
                        <span className="text-xs text-slate-500 font-mono">{item.year}</span>
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-white mt-1">
                        {item.title}
                      </h4>
                      <p className="text-xs font-medium text-slate-400 mb-2">{item.institution}</p>
                      <p className="text-xs text-slate-400 leading-relaxed">{item.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Resume Download Notice */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-950/40 to-slate-900 border border-cyan-500/20 text-xs">
              <h4 className="font-bold text-white text-sm mb-1">Looking for a complete CV?</h4>
              <p className="text-slate-400 leading-relaxed mb-4">
                You can inspect Suhail Hossain&apos;s verified credentials, project case studies, and engineering references directly or send a message below.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold text-xs transition-colors shadow-sm"
              >
                Request Detailed Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
