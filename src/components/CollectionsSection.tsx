import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Sparkles, X, MessageCircle, Mail, MapPin, Gauge, Shield, Clock, Compass } from 'lucide-react';
import { NINE_CATEGORIES_DATA } from '../data/jewelleryData';
import { CollectionCategory } from '../types';
import { JewelleryImage } from './JewelleryImage';

interface CollectionsSectionProps {
  onSelectCategory?: (categoryKey: string) => void;
}

export const CollectionsSection: React.FC<CollectionsSectionProps> = ({ onSelectCategory }) => {
  const [activeModalWatch, setActiveModalWatch] = useState<CollectionCategory | null>(null);

  const handleOpenModal = (col: CollectionCategory, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveModalWatch(col);
  };

  const handleCloseModal = () => {
    setActiveModalWatch(null);
  };

  // Lock background scroll smoothly without shifting viewport
  useEffect(() => {
    if (activeModalWatch) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [activeModalWatch]);

  return (
    <section id="categories" className="py-14 sm:py-20 bg-[#FBF8F1] relative">
      {/* Subtle Background Geometry */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A45C]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E9DDCB]/50 border border-[#C9A45C]/30 text-xs font-semibold uppercase tracking-widest text-[#145C5A]">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A45C]" />
            <span>Curated Geneva Horology Suites</span>
          </div>

          <h2 className="font-serif-cormorant text-3xl sm:text-4xl md:text-5xl font-bold text-[#463A34] tracking-tight">
            Featured Collections
          </h2>

          <p className="text-sm sm:text-base text-[#75665D] font-body max-w-2xl mx-auto leading-relaxed">
            Discover our nine signature Swiss timepiece collections, showcasing high-frequency chronographs, ultra-thin calibres, and Geneva haute horlogerie.
          </p>
        </div>

        {/* 3-Column Grid Containing Exactly 9 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {NINE_CATEGORIES_DATA.map((col, idx) => (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.35, delay: idx * 0.04 }}
              onClick={(e) => handleOpenModal(col, e)}
              className="group cursor-pointer relative rounded-2xl bg-white border border-[#E9DDCB] hover:border-[#C9A45C] transition-all duration-300 overflow-hidden shadow-xs hover:shadow-xl flex flex-col justify-between"
            >
              {/* Image Container with compact 16:10 aspect ratio */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#F4EFE6]">
                <JewelleryImage
                  src={col.image}
                  alt={`Intemporel Genève - ${col.title}`}
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#463A34]/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                {/* Floating Highlight Tag */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-semibold text-[#145C5A] border border-[#C9A45C]/40 shadow-xs">
                    {col.highlightText}
                  </span>
                </div>

                {/* Quick Info Arrow Button Top Right */}
                <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center text-[#463A34] group-hover:bg-[#145C5A] group-hover:text-white transition-colors duration-300 shadow-xs">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Card Details: Uniform padding and fixed heights */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white space-y-2.5">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2 h-7">
                    <h3 className="font-serif-cormorant text-xl sm:text-2xl font-bold text-[#463A34] group-hover:text-[#145C5A] transition-colors truncate">
                      {col.title}
                    </h3>
                    <span className="text-[11px] font-semibold text-[#C9A45C] tracking-wider uppercase shrink-0">
                      {col.itemCount} Items
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#75665D] font-body leading-relaxed line-clamp-2 h-9 sm:h-10 overflow-hidden">
                    {col.description}
                  </p>
                </div>

                {/* Explore Action Button: Strictly Single-Line Clean Alignment */}
                <div className="pt-3 border-t border-[#F4EFE6] flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={(e) => handleOpenModal(col, e)}
                    className="text-xs font-bold text-[#145C5A] uppercase tracking-wider group-hover:text-[#C9A45C] transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <span className="whitespace-nowrap">EXPLORE NOW</span>
                    <span className="text-[#C9A45C] group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </button>
                  <span className="text-[11px] font-medium text-[#75665D]/70 hidden sm:inline whitespace-nowrap">
                    View Specs
                  </span>
                </div>
              </div>

              {/* Gold Accent Bar */}
              <div className="h-[2px] w-full bg-transparent group-hover:bg-gradient-to-r group-hover:from-[#C9A45C] group-hover:to-[#E4CCA1] transition-all duration-300" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Interactive Watch Specification Popup Modal - Portaled to document.body so it anchors cleanly to current viewport */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {activeModalWatch && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
                {/* Modal Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={handleCloseModal}
                  className="fixed inset-0 bg-black/75 backdrop-blur-sm cursor-pointer"
                />

                {/* Modal Dialog Content - Smooth entry anchored to current viewport */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.96, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 12 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="relative w-full max-w-2xl bg-white rounded-3xl border border-[#C9A45C]/50 shadow-2xl overflow-hidden z-10 my-auto max-h-[90vh] flex flex-col"
                >
                  {/* Close Button Top Right */}
                  <button
                    onClick={handleCloseModal}
                    className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-md transition-colors shadow-md cursor-pointer"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="overflow-y-auto p-5 sm:p-7 space-y-6">
                    {/* Watch Image Banner */}
                    <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-[#F4EFE6] border border-[#E9DDCB] shadow-inner">
                      <JewelleryImage
                        src={activeModalWatch.image}
                        alt={activeModalWatch.title}
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4 sm:p-5">
                        <div>
                          <span className="px-3 py-1 rounded-full bg-[#145C5A] text-white text-[11px] font-bold uppercase tracking-wider shadow-sm">
                            {activeModalWatch.highlightText}
                          </span>
                          <h3 className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-white mt-1.5 drop-shadow-md">
                            {activeModalWatch.title}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#C9A45C] mb-1">
                        Boutique Overview
                      </h4>
                      <p className="text-sm text-[#75665D] font-body leading-relaxed">
                        {activeModalWatch.description}
                      </p>
                    </div>

                    {/* Full Specifications Grid */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#145C5A] flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#C9A45C]" />
                        <span>Manufacture Specifications</span>
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="p-3 rounded-xl bg-[#FBF8F1] border border-[#E9DDCB] flex items-start gap-2.5">
                          <Gauge className="w-4 h-4 text-[#C9A45C] shrink-0 mt-0.5" />
                          <div>
                            <span className="text-[#75665D] font-medium block">Movement</span>
                            <span className="font-semibold text-[#463A34]">{activeModalWatch.movement || 'Swiss Haute Horlogerie Automatic'}</span>
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-[#FBF8F1] border border-[#E9DDCB] flex items-start gap-2.5">
                          <Compass className="w-4 h-4 text-[#C9A45C] shrink-0 mt-0.5" />
                          <div>
                            <span className="text-[#75665D] font-medium block">Manufacture Calibre</span>
                            <span className="font-semibold text-[#463A34]">{activeModalWatch.calibre || 'Certified Swiss Manufacture'}</span>
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-[#FBF8F1] border border-[#E9DDCB] flex items-start gap-2.5">
                          <Shield className="w-4 h-4 text-[#C9A45C] shrink-0 mt-0.5" />
                          <div>
                            <span className="text-[#75665D] font-medium block">Case & Materials</span>
                            <span className="font-semibold text-[#463A34]">{activeModalWatch.caseMaterial || 'Precious Metal & Sapphire'}</span>
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-[#FBF8F1] border border-[#E9DDCB] flex items-start gap-2.5">
                          <Clock className="w-4 h-4 text-[#C9A45C] shrink-0 mt-0.5" />
                          <div>
                            <span className="text-[#75665D] font-medium block">Power Reserve & Water Resist</span>
                            <span className="font-semibold text-[#463A34]">{activeModalWatch.powerReserve || '48 Hours'} • {activeModalWatch.waterResistance || '50M'}</span>
                          </div>
                        </div>
                      </div>

                      {/* Salon Location Indicator */}
                      <div className="p-3 rounded-xl bg-[#E9DDCB]/40 border border-[#C9A45C]/30 flex items-center gap-2.5 text-xs text-[#463A34]">
                        <MapPin className="w-4 h-4 text-[#145C5A] shrink-0" />
                        <p className="font-medium">
                          Available for Private Viewing at <span className="font-bold text-[#145C5A]">Route des Jeunes 4bis, 1227 Les Acacias, Genève</span>
                        </p>
                      </div>
                    </div>

                    {/* Direct Action Buttons: WhatsApp & Direct Email Option */}
                    <div className="pt-3 border-t border-[#E9DDCB] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                      {/* WhatsApp Action Button */}
                      <a
                        href={`https://wa.me/41799660156?text=${encodeURIComponent(
                          `Hello Intemporel Genève, I would like to inquire about the ${activeModalWatch.title} (${activeModalWatch.highlightText}) displayed in your Geneva collection.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-3 px-4 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <MessageCircle className="w-4 h-4 fill-white shrink-0" />
                        <span className="whitespace-nowrap">WhatsApp (+41 79 966 01 56)</span>
                      </a>

                      {/* Direct Email Action Button */}
                      <a
                        href={`mailto:contact@intemporel-geneve.ch?subject=${encodeURIComponent(
                          `Inquiry: ${activeModalWatch.title} (${activeModalWatch.highlightText})`
                        )}&body=${encodeURIComponent(
                          `Hello Intemporel Genève,\n\nI am inquiring about the ${activeModalWatch.title} (${activeModalWatch.highlightText}) in your Geneva salon collection.\n\nPlease share availability and private viewing appointments.\n\nThank you.`
                        )}`}
                        className="flex-1 py-3 px-4 rounded-full bg-[#145C5A] hover:bg-[#0D3E3D] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <Mail className="w-4 h-4 text-[#C9A45C] shrink-0" />
                        <span className="whitespace-nowrap">Inquire via Email</span>
                      </a>

                      {/* Close Button */}
                      <button
                        type="button"
                        onClick={handleCloseModal}
                        className="py-3 px-5 rounded-full bg-white hover:bg-[#F4EFE6] border border-[#E9DDCB] text-[#75665D] hover:text-[#463A34] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap shrink-0"
                      >
                        Close
                      </button>
                    </div>
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
