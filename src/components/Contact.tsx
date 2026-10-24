import React, { useState } from 'react';
import { Mail, Github, Linkedin, Send, Copy, Check, Sparkles, Inbox, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ContactMessage } from '../types/portfolio';

interface ContactProps {
  onMessageSent: (message: ContactMessage) => void;
  onOpenInbox: () => void;
  unreadCount: number;
}

export const Contact: React.FC<ContactProps> = ({ onMessageSent, onOpenInbox, unreadCount }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('Full-Time Opportunity');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText('suhail0168@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorNotice(null);
    setSuccessNotice(null);

    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorNotice('Please fill in your name, email, and message.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          projectType,
          subject: subject || `${projectType} from ${name}`,
          message
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit message.');
      }

      // Celebrate with confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.65 },
          colors: ['#22d3ee', '#38bdf8', '#34d399', '#ffffff']
        });
      } catch {
        // Fallback silently if canvas-confetti has environment issue
      }

      setSuccessNotice('Your message was saved to the MongoDB collection! Suhail will be notified and reply promptly.');
      onMessageSent(data.data);

      // Reset form
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err: unknown) {
      setErrorNotice((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative border-t border-slate-800/80 bg-[#060b13]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
            Get In Touch
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            Let&apos;s Build Something Exceptional
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Whether you have a full-time engineering opening, a high-impact contract project, or want to discuss full-stack architecture, feel free to reach out.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Contact Info & Quick Actions */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-6">
              <h3 className="text-lg font-bold text-white">Direct Communication</h3>
              
              {/* Email Card with Copy button */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-slate-500 font-medium">Email Address</p>
                    <a
                      href="mailto:suhail0168@gmail.com"
                      className="text-sm font-mono text-cyan-400 hover:underline truncate block"
                    >
                      suhail0168@gmail.com
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={copyEmailToClipboard}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors shrink-0"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Location Card */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Work Mode</p>
                  <p className="text-sm text-slate-200">Remote Worldwide / Available Across Timezones</p>
                </div>
              </div>

              {/* Social Profiles */}
              <div className="pt-2">
                <p className="text-xs text-slate-500 font-medium mb-3">Professional Profiles</p>
                <div className="flex items-center gap-3">
                  <a
                    href="https://github.com/SuhailDE"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 text-slate-300 hover:text-white text-xs font-medium flex items-center justify-center gap-2 transition-all"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/suhail-hossain-4a9980343/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 text-slate-300 hover:text-white text-xs font-medium flex items-center justify-center gap-2 transition-all"
                  >
                    <Linkedin className="w-4 h-4 text-cyan-400" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>

              {/* Messages Inbox Inspector CTA */}
              <div className="pt-4 border-t border-slate-800/80">
                <button
                  type="button"
                  onClick={onOpenInbox}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-950 border border-cyan-500/30 hover:border-cyan-400 text-cyan-400 hover:text-cyan-300 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  <Inbox className="w-4 h-4" />
                  <span>Inspect Received Messages ({unreadCount} new)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/40 border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-2">Send a Message</h3>
              <p className="text-xs sm:text-sm text-slate-400 mb-6">
                Directly dispatched to the Node.js backend and recorded in MongoDB.
              </p>

              {successNotice && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{successNotice}</span>
                </div>
              )}

              {errorNotice && (
                <div className="mb-6 p-4 rounded-xl bg-rose-950/70 border border-rose-500/30 text-rose-300 text-xs sm:text-sm">
                  {errorNotice}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 font-medium mb-1.5">
                      Your Name <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-medium mb-1.5">
                      Your Email <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. john@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 font-medium mb-1.5">Opportunity Type</label>
                    <select
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400 transition-colors font-sans"
                    >
                      <option value="Full-Time Opportunity">Full-Time Software Engineer</option>
                      <option value="Contract / Freelance">Contract / Freelance Project</option>
                      <option value="Full-Stack MERN Architecture">MERN Stack Architecture</option>
                      <option value="General Inquiry">General Technical Discussion</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 font-medium mb-1.5">Subject</label>
                    <input
                      type="text"
                      placeholder="e.g. Full-Stack Developer Role"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 font-medium mb-1.5">
                    Your Message <span className="text-cyan-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell Suhail about your team, product requirements, or project vision..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto px-8 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/20 active:scale-95 disabled:opacity-50"
                  >
                    {submitting ? (
                      <span>Saving to MongoDB...</span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4 stroke-[2.5]" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
