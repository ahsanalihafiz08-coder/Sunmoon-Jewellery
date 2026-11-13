import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/jewelleryData';
import { JewelleryImage } from './JewelleryImage';

export const GallerySection: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;

      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % GALLERY_ITEMS.length : 0));
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev !== null ? (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length : 0
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  const activeImage = lightboxIndex !== null ? GALLERY_ITEMS[lightboxIndex] : null;

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-[#FBF8F1] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E9DDCB]/50 border border-[#C9A45C]/30 text-xs font-semibold uppercase tracking-widest text-[#145C5A]">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A45C]" />
            <span>Editorial Visual Portfolio</span>
          </div>

          <h2 className="font-serif-cormorant text-3xl sm:text-4xl md:text-5xl font-bold text-[#463A34] tracking-tight">
            Culture Gallery
          </h2>

          <p className="text-sm sm:text-base text-[#75665D] font-body max-w-2xl mx-auto leading-relaxed">
            A visual chronicle of iconic Swiss horological masterpieces, precision chronographs, and rare references curated by Intemporel Genève.
          </p>
        </div>

        {/* Strict 3-Cards-Per-Row Horizontal Grid on Desktop (Exactly 9 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 sm:gap-8">
          {GALLERY_ITEMS.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(idx)}
              className="group cursor-pointer relative w-full rounded-2xl overflow-hidden bg-[#F4EFE6] border border-[#E9DDCB] hover:border-[#C9A45C] shadow-xs hover:shadow-xl transition-all duration-300 aspect-[4/3]"
            >
              <JewelleryImage
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center block transform group-hover:scale-106 transition-transform duration-700 ease-out"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#463A34]/85 via-[#463A34]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-between text-white">
                <div className="flex justify-between items-center">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] uppercase font-bold tracking-widest text-[#E4CCA1]">
                    #{idx + 1} • {item.category}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-serif-cormorant text-2xl font-bold leading-tight">{item.title}</h3>
                  <p className="text-xs text-[#E9DDCB] font-body line-clamp-2 leading-relaxed">{item.caption}</p>
                </div>
              </div>

              {/* Gold Bottom Accent Line */}
              <div className="absolute bottom-0 inset-x-0 h-1 bg-[#C9A45C] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal - Portaled to document.body */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {activeImage && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setLightboxIndex(null)}
                  className="fixed inset-0 bg-black/90 backdrop-blur-md"
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative max-w-4xl w-full max-h-[90vh] bg-black/40 rounded-3xl overflow-hidden border border-white/20 shadow-2xl z-10 flex flex-col justify-between"
                >
                  {/* Close Button */}
                  <button
                    onClick={() => setLightboxIndex(null)}
                    className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-[#C9A45C] hover:text-[#463A34] transition-colors border border-white/20 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Previous / Next Navigation Arrows */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxIndex((prev) =>
                        prev !== null ? (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length : 0
                      );
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-[#C9A45C] hover:text-[#463A34] transition-colors border border-white/20 cursor-pointer"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxIndex((prev) =>
                        prev !== null ? (prev + 1) % GALLERY_ITEMS.length : 0
                      );
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-[#C9A45C] hover:text-[#463A34] transition-colors border border-white/20 cursor-pointer"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  {/* Lightbox Image Container */}
                  <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full max-h-[68vh] overflow-hidden bg-black flex items-center justify-center">
                    <img
                      src={activeImage.image}
                      alt={activeImage.title}
                      className="w-full h-full object-contain"
                      loading="eager"
                      fetchPriority="high"
                      decoding="sync"
                    />
                  </div>

                  {/* Caption Bar */}
                  <div className="p-4 sm:p-6 bg-black/80 backdrop-blur-md border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-white">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-bold text-[#E4CCA1] uppercase tracking-wider">
                          {activeImage.category}
                        </span>
                        <span className="text-white/40">•</span>
                        <span className="text-xs text-white/60">
                          ({lightboxIndex !== null ? lightboxIndex + 1 : 1} of {GALLERY_ITEMS.length})
                        </span>
                      </div>
                      <h3 className="font-serif-cormorant text-2xl font-bold">{activeImage.title}</h3>
                      <p className="text-xs sm:text-sm text-white/80 font-body max-w-xl mt-1">
                        {activeImage.caption}
                      </p>
                    </div>

                    <a
                      href={`https://wa.me/41799660156?text=${encodeURIComponent(
                        `Hello Intemporel Genève, I am inquiring about "${activeImage.title}" from your Culture Gallery.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-full bg-[#C9A45C] hover:bg-[#B8924B] text-[#463A34] text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors shadow-md cursor-pointer"
                    >
                      Inquire on WhatsApp
                    </a>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
};
