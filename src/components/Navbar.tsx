import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Database, CheckCircle2, Download } from 'lucide-react';
import { ServerStatus } from '../types/portfolio';

interface NavbarProps {
  serverStatus: ServerStatus | null;
  onOpenInbox: () => void;
  unreadCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ serverStatus, onOpenInbox, unreadCount }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Contact Me', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#060b13]/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/40 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#home');
          }}
          className="group flex items-center gap-2 whitespace-nowrap shrink-0"
        >
          <span className="text-2xl font-black tracking-tight text-cyan-400 group-hover:text-cyan-300 transition-colors">
            SH.
          </span>
          {serverStatus && (
            <span
              className="hidden lg:inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/20 px-2 py-0.5 rounded-md"
              title="MERN Node.js + MongoDB API Connected"
            >
              <Database className="w-3 h-3 text-cyan-400" />
              <span>MERN Online</span>
            </span>
          )}
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`relative py-1 transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-cyan-400 font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action & Quick Tools */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenInbox}
            className="relative p-2 rounded-xl text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 transition-colors"
            title="View submitted messages"
          >
            <span className="sr-only">Messages Inbox</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-500 text-slate-950 font-mono text-[10px] font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          <a
            href="/suhail-mern-portfolio.zip"
            download="suhail-mern-portfolio.zip"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-xl transition-all whitespace-nowrap shrink-0"
            title="Download full project source code (.zip)"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Download ZIP</span>
          </a>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#contact');
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all shadow-md shadow-cyan-500/20 whitespace-nowrap shrink-0"
          >
            <span>Hire Me</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#060b13]/98 border-b border-slate-800 px-5 pt-3 pb-6 mt-2 space-y-3 backdrop-blur-xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === link.id
                    ? 'bg-cyan-500/10 text-cyan-400 font-semibold'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
            <a
              href="/suhail-mern-portfolio.zip"
              download="suhail-mern-portfolio.zip"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-200 bg-slate-900 border border-slate-700 rounded-xl"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Download ZIP</span>
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 rounded-xl"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
