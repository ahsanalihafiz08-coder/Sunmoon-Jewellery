import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Star, MessageSquare, ShieldCheck, Sparkles, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { REVIEWS_DATA, STORE_INFO } from '../data/jewelleryData';

export const ReviewsSection: React.FC = () => {
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(0);

  const filteredReviews = REVIEWS_DATA.filter((r) => {
    if (filterRating === 'all') return true;
    return r.rating === filterRating;
  });

  const pageSize = 3;
  const totalPages = Math.ceil(filteredReviews.length / pageSize);
  const currentReviews = filteredReviews.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

  return (
    <section id="reviews" className="py-20 sm:py-28 bg-[#F4EFE6] border-y border-[#E9DDCB] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Overall Rating Highlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#C9A45C]/40 text-xs font-semibold uppercase tracking-widest text-[#145C5A]">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A45C]" />
              <span>Customer Impressions</span>
            </div>

            <h2 className="font-serif-cormorant text-3xl sm:text-4xl md:text-5xl font-bold text-[#463A34] tracking-tight">
              Trusted by Jewellery Lovers in Kuwait
            </h2>

            <p className="text-base sm:text-lg text-[#75665D] font-body max-w-xl leading-relaxed">
              Read verified reviews from patrons who visit our Souq Al Watiya boutique for engagement gifts, milestone celebrations, and daily elegance.
            </p>
          </div>

          {/* Rating Summary Block */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#C9A45C]/50 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
              <div>
                <div className="flex items-baseline gap-2 justify-center sm:justify-start">
                  <span className="font-serif-cormorant text-5xl sm:text-6xl font-bold text-[#463A34]">
                    4.4
                  </span>
                  <span className="text-xl text-[#75665D]">/ 5.0</span>
                </div>

                <div className="flex items-center justify-center sm:justify-start gap-1 text-[#C9A45C] my-1.5">
                  {[...Array(4)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-[#C9A45C] text-[#C9A45C]"
                    />
                  ))}
                  {/* Fractional 5th star */}
                  <div className="relative w-4 h-4">
                    <Star className="w-4 h-4 text-[#C9A45C]" />
                    <div className="absolute inset-0 overflow-hidden w-[40%]">
                      <Star className="w-4 h-4 fill-[#C9A45C] text-[#C9A45C]" />
                    </div>
                  </div>
                </div>

                <p className="text-xs font-semibold text-[#145C5A] uppercase tracking-wider">
                  Based on 114 Google Reviews • Souq Al Watiya
                </p>
              </div>

              <div className="border-t sm:border-t-0 sm:border-l border-[#E9DDCB] pt-4 sm:pt-0 sm:pl-6 space-y-2 text-xs text-[#75665D]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#145C5A]" />
                  <span>100% Verified Patrons</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#C9A45C]" />
                  <span>Souq Al Watiya Boutique</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setFilterRating('all');
                setCurrentPage(0);
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                filterRating === 'all'
                  ? 'bg-[#145C5A] text-white shadow-xs'
                  : 'bg-white text-[#75665D] border border-[#E9DDCB] hover:border-[#C9A45C]'
              }`}
            >
              All Reviews ({REVIEWS_DATA.length})
            </button>
            <button
              onClick={() => {
                setFilterRating(5);
                setCurrentPage(0);
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                filterRating === 5
                  ? 'bg-[#145C5A] text-white shadow-xs'
                  : 'bg-white text-[#75665D] border border-[#E9DDCB] hover:border-[#C9A45C]'
              }`}
            >
              5 Stars Only
            </button>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 0}
                onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                className="w-8 h-8 rounded-full bg-white border border-[#E9DDCB] flex items-center justify-center text-[#463A34] disabled:opacity-40 hover:bg-[#145C5A] hover:text-white transition-colors"
                aria-label="Previous Reviews"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-semibold text-[#75665D]">
                {currentPage + 1} / {totalPages}
              </span>
              <button
                disabled={currentPage >= totalPages - 1}
                onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
                className="w-8 h-8 rounded-full bg-white border border-[#E9DDCB] flex items-center justify-center text-[#463A34] disabled:opacity-40 hover:bg-[#145C5A] hover:text-white transition-colors"
                aria-label="Next Reviews"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentReviews.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E9DDCB] hover:border-[#C9A45C] transition-all shadow-xs hover:shadow-lg flex flex-col justify-between relative"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex text-[#C9A45C]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C9A45C] text-[#C9A45C]" />
                    ))}
                  </div>

                  <Quote className="w-6 h-6 text-[#E9DDCB]" />
                </div>

                <p className="text-sm text-[#463A34] font-body leading-relaxed italic">
                  "{review.text}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#F4EFE6] space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif-cormorant text-lg font-bold text-[#463A34]">
                    {review.author}
                  </h4>
                  <span className="text-[10px] text-[#75665D]">{review.date}</span>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-[#145C5A]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C9A45C]" />
                  <span>{review.source}</span>
                  {review.itemMentioned && (
                    <>
                      <span>•</span>
                      <span className="text-[#75665D]">{review.itemMentioned}</span>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
