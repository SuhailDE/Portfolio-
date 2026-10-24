import React, { useState } from 'react';
import { Star, MessageSquarePlus, X, Check, Quote } from 'lucide-react';
import { Review } from '../types/portfolio';

interface TestimonialsProps {
  reviews: Review[];
  onAddReview: (review: Omit<Review, '_id' | 'date'>) => Promise<void>;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ reviews, onAddReview }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !content || !role) return;

    setSubmitting(true);
    try {
      await onAddReview({
        name,
        role,
        company: company || 'Engineering Partner',
        content,
        rating
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setModalOpen(false);
        setName('');
        setRole('');
        setCompany('');
        setContent('');
      }, 1500);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-24 relative border-t border-slate-800/80 bg-[#060b13]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
              Social Proof & Endorsements
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
              Collaborator Testimonials
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl">
              Feedback from engineering leaders, product managers, and startup founders who have worked directly with Suhail.
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400/50 text-slate-200 hover:text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all shrink-0 self-start md:self-auto"
          >
            <MessageSquarePlus className="w-4 h-4 text-cyan-400" />
            <span>Leave Recommendation</span>
          </button>
        </div>

        {/* Testimonials 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev._id}
              className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/90 hover:border-slate-700 transition-colors flex flex-col justify-between relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  {/* Star Rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating
                            ? 'text-cyan-400 fill-cyan-400'
                            : 'text-slate-700'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">{rev.date}</span>
                </div>

                <Quote className="w-6 h-6 text-slate-700/60 mb-2" />
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 italic">
                  &ldquo;{rev.content}&rdquo;
                </p>
              </div>

              {/* Author attribution */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-sm shrink-0">
                  {rev.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-semibold text-white truncate">{rev.name}</h4>
                  <p className="text-xs text-slate-400 truncate">
                    {rev.role} · <span className="text-slate-500">{rev.company}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Review Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
          <div
            className="w-full max-w-lg bg-[#0b1324] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative text-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-white">Leave a Recommendation</h3>
                <p className="text-xs text-slate-400">Share your experience collaborating with Suhail</p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {success ? (
              <div className="py-8 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white">Thank you!</h4>
                <p className="text-xs text-slate-400">Your recommendation has been saved to the MongoDB collection.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rachel Adams"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Your Role *</label>
                    <input
                      type="text"
                      required
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="e.g. Lead Architect"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Company / Team</label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. CloudScale Inc"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 font-medium mb-1">Rating</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="p-1 text-slate-600 hover:text-cyan-400 focus:outline-none"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= rating
                              ? 'text-cyan-400 fill-cyan-400'
                              : 'text-slate-700'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs text-slate-400 ml-2 font-mono">{rating} / 5</span>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 font-medium mb-1">Recommendation *</label>
                  <textarea
                    required
                    rows={4}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Highlight Suhail's engineering impact, problem solving, or MERN stack abilities..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 resize-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold transition-all disabled:opacity-50"
                  >
                    {submitting ? 'Saving...' : 'Post Recommendation'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
