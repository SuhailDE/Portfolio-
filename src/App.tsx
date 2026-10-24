import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { MongoPlayground } from './components/MongoPlayground';
import { MessagesInboxModal } from './components/MessagesInboxModal';
import { Project, SkillCategory, Review, ContactMessage, ServerStatus } from './types/portfolio';

export default function App() {
  const [serverStatus, setServerStatus] = useState<ServerStatus | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<SkillCategory[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const [isMongoPlaygroundOpen, setIsMongoPlaygroundOpen] = useState(false);
  const [isInboxOpen, setIsInboxOpen] = useState(false);

  // Fetch initial data from Node.js Express + MongoDB backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statusRes, projRes, skillsRes, reviewsRes, msgsRes] = await Promise.all([
          fetch('/api/status').catch(() => null),
          fetch('/api/projects').catch(() => null),
          fetch('/api/skills').catch(() => null),
          fetch('/api/reviews').catch(() => null),
          fetch('/api/messages').catch(() => null)
        ]);

        if (statusRes && statusRes.ok) setServerStatus(await statusRes.json());
        if (projRes && projRes.ok) setProjects(await projRes.json());
        if (skillsRes && skillsRes.ok) setSkills(await skillsRes.json());
        if (reviewsRes && reviewsRes.ok) setReviews(await reviewsRes.json());
        if (msgsRes && msgsRes.ok) setMessages(await msgsRes.json());
      } catch (err) {
        console.error('Error fetching portfolio data from backend:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handlers for interactive actions
  const handleScrollTo = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddReview = async (reviewData: Omit<Review, '_id' | 'date'>) => {
    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData)
    });
    if (!res.ok) throw new Error('Failed to post review');
    const created: Review = await res.json();
    setReviews((prev) => [created, ...prev]);
  };

  const handleMessageSent = (newMessage: ContactMessage) => {
    setMessages((prev) => [newMessage, ...prev]);
  };

  const handleToggleRead = async (id: string) => {
    try {
      const res = await fetch(`/api/messages/${id}/read`, { method: 'PATCH' });
      if (res.ok) {
        const updated = await res.json();
        setMessages((prev) => prev.map((m) => (m._id === id ? updated : m)));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    try {
      const res = await fetch(`/api/messages/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <div className="min-h-screen bg-[#060b13] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Navbar */}
      <Navbar
        serverStatus={serverStatus}
        onOpenInbox={() => setIsInboxOpen(true)}
        unreadCount={unreadCount}
      />

      {/* Main Content */}
      <main>
        {/* Hero Section matching mockup */}
        <Hero
          onContactClick={() => handleScrollTo('contact')}
          onAboutClick={() => handleScrollTo('about')}
        />

        {/* About Section */}
        <About
          onContactClick={() => handleScrollTo('contact')}
          onViewProjects={() => handleScrollTo('projects')}
        />

        {/* Featured Projects Showcase */}
        <Projects
          projects={projects}
          loading={loading}
          onOpenMongoPlayground={() => setIsMongoPlaygroundOpen(true)}
        />

        {/* Skills & Tech Stack */}
        <Skills
          skillCategories={skills}
          loading={loading}
        />

        {/* Experience & Credentials */}
        <Experience />

        {/* Client Testimonials */}
        <Testimonials
          reviews={reviews}
          onAddReview={handleAddReview}
        />

        {/* Contact Section */}
        <Contact
          onMessageSent={handleMessageSent}
          onOpenInbox={() => setIsInboxOpen(true)}
          unreadCount={unreadCount}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive MongoDB & Node.js Console Modal */}
      <MongoPlayground
        isOpen={isMongoPlaygroundOpen}
        onClose={() => setIsMongoPlaygroundOpen(false)}
        serverStatus={serverStatus}
      />

      {/* Contact Messages Inbox Modal */}
      <MessagesInboxModal
        isOpen={isInboxOpen}
        onClose={() => setIsInboxOpen(false)}
        messages={messages}
        onToggleRead={handleToggleRead}
        onDeleteMessage={handleDeleteMessage}
      />
    </div>
  );
}
