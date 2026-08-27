import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, Eye, MessageCircle, Calendar } from 'lucide-react';
import { MARQUEE_ROW_1_LINKS, MARQUEE_ROW_2_LINKS, STORE_INFO } from '../data/jewelleryData';
import { JewelleryImage } from './JewelleryImage';

interface MarqueeCardItem {
  id: string;
  title: string;
  image: string;
}

interface DualRowMarqueeProps {
  onBookViewing?: (title: string) => void;
}

export const DualRowMarquee: React.FC<DualRowMarqueeProps> = ({ onBookViewing }) => {
  const [selectedPopupCard, setSelectedPopupCard] = useState<MarqueeCardItem | null>(null);

  // Duplicate rows for seamless infinite animation looping
  const row1Items = [...MARQUEE_ROW_1_LINKS, ...MARQUEE_ROW_1_LINKS];
  const row2Items = [...MARQUEE_ROW_2_LINKS, ...MARQUEE_ROW_2_LINKS];

  return (
    <section className="py-16 sm:py-24 bg-[#FBF8F1] border-y border-[#E9DDCB] overflow-hidden relative">
      {/* Decorative Ambient Accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C9A45C]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#145C5A]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center space-y-3 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#C9A45C]/40 text-xs font-semibold uppercase tracking-widest text-[#145C5A] shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#C9A45C]" />
          <span>Infinite Haute Horlogerie & Gold Showcase</span>
        </div>

        <h2 className="font-serif-cormorant text-3xl sm:text-4xl md:text-5xl font-bold text-[#463A34] tracking-tight">
          The Gallery
        </h2>

        <p className="text-sm sm:text-base text-[#75665D] font-body max-w-2xl mx-auto leading-relaxed">
          Hover to pause and click any creation to view high-resolution craftsmanship details from our Souq Al Watiya showcase.
        </p>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full space-y-5 pause-hover">
        {/* Row 1: 22 Cards Scrolling Continuously RIGHT */}
        <div className="overflow-hidden w-full flex">
          <div className="animate-marquee-right flex gap-4 sm:gap-6 items-center">
            {row1Items.map((item, index) => (
              <div
                key={`r1-${item.id}-${index}`}
                onClick={() => setSelectedPopupCard(item)}
                className="w-52 sm:w-64 shrink-0 rounded-2xl bg-white border border-[#E9DDCB] hover:border-[#C9A45C] shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group flex flex-col justify-between"
              >
                <div className="relative aspect-square overflow-hidden bg-[#F4EFE6]">
                  <JewelleryImage
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-[#463A34]/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="px-3.5 py-1.5 rounded-full bg-white/95 text-[#145C5A] text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                      <Eye className="w-3 h-3 text-[#C9A45C]" />
                      <span>Inspect</span>
                    </span>
                  </div>
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-[#145C5A]/90 text-white text-[10px] font-semibold">
                    Row 1 • #{(index % 22) + 1}
                  </span>
                </div>
                <div className="p-3.5 bg-white border-t border-[#F4EFE6] flex items-center justify-between">
                  <p className="font-serif-cormorant text-base font-bold text-[#463A34] truncate group-hover:text-[#145C5A] transition-colors">
                    {item.title}
                  </p>
                  <span className="text-[10px] text-[#C9A45C] font-semibold uppercase tracking-wider">
                    View
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: 22 Cards Scrolling Continuously LEFT */}
        <div className="overflow-hidden w-full flex">
          <div className="animate-marquee-left flex gap-4 sm:gap-6 items-center">
            {row2Items.map((item, index) => (
              <div
                key={`r2-${item.id}-${index}`}
                onClick={() => setSelectedPopupCard(item)}
                className="w-52 sm:w-64 shrink-0 rounded-2xl bg-white border border-[#E9DDCB] hover:border-[#C9A45C] shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group flex flex-col justify-between"
              >
                <div className="relative aspect-square overflow-hidden bg-[#F4EFE6]">
                  <JewelleryImage
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-[#463A34]/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="px-3.5 py-1.5 rounded-full bg-white/95 text-[#145C5A] text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                      <Eye className="w-3 h-3 text-[#C9A45C]" />
                      <span>Inspect</span>
                    </span>
                  </div>
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-[#C9A45C] text-[#463A34] text-[10px] font-bold">
                    Row 2 • #{(index % 22) + 1}
                  </span>
                </div>
                <div className="p-3.5 bg-white border-t border-[#F4EFE6] flex items-center justify-between">
                  <p className="font-serif-cormorant text-base font-bold text-[#463A34] truncate group-hover:text-[#145C5A] transition-colors">
                    {item.title}
                  </p>
                  <span className="text-[10px] text-[#145C5A] font-semibold uppercase tracking-wider">
                    View
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Card Popup Modal */}
      <AnimatePresence>
        {selectedPopupCard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPopupCard(null)}
              className="fixed inset-0 bg-[#463A34]/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#C9A45C]/50 z-10 flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPopupCard(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md border border-[#E9DDCB] text-[#463A34] hover:bg-[#145C5A] hover:text-white flex items-center justify-center transition-colors shadow-md"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Popup Image */}
              <div className="relative aspect-[4/3] bg-[#F4EFE6] overflow-hidden">
                <JewelleryImage
                  src={selectedPopupCard.image}
                  alt={selectedPopupCard.title}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 left-4 text-white">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-[#E4CCA1]">
                    Sunmoon Jewelleryj Exclusive
                  </span>
                  <h3 className="font-serif-cormorant text-2xl font-bold">
                    {selectedPopupCard.title}
                  </h3>
                </div>
              </div>

              {/* Popup Content & Actions */}
              <div className="p-6 space-y-5">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-[#FBF8F1] border border-[#E9DDCB] text-xs font-semibold text-[#145C5A]">
                      18K & 21K Gold Selection
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-[#FBF8F1] border border-[#E9DDCB] text-xs font-semibold text-[#75665D]">
                      Souq Al Watiya, Shop 116
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#75665D] font-body leading-relaxed">
                    This creation represents our dedication to fine finish, balanced weight, and radiant brilliance. Available for viewing and bespoke fitting at our Kuwait City boutique.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => {
                      if (onBookViewing) {
                        onBookViewing(selectedPopupCard.title);
                      }
                      setSelectedPopupCard(null);
                    }}
                    className="w-full py-3 px-4 rounded-xl bg-[#145C5A] hover:bg-[#0D3E3D] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-colors"
                  >
                    <Calendar className="w-4 h-4 text-[#C9A45C]" />
                    <span>Book Viewing</span>
                  </button>

                  <a
                    href={`https://wa.me/96597482257?text=${encodeURIComponent(
                      `Hello Sunmoon Jewelleryj, I would like to inquire about "${selectedPopupCard.title}" from your Marquee Showcase.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-[#FBF8F1] hover:bg-[#E9DDCB]/50 border border-[#C9A45C] text-[#463A34] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-[#145C5A]" />
                    <span>Inquire on WhatsApp</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
