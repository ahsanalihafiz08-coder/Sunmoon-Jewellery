import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { NINE_CATEGORIES_DATA } from '../data/jewelleryData';
import { JewelleryImage } from './JewelleryImage';

interface CollectionsSectionProps {
  onSelectCategory: (categoryKey: string) => void;
}

export const CollectionsSection: React.FC<CollectionsSectionProps> = ({ onSelectCategory }) => {
  return (
    <section id="categories" className="py-16 sm:py-24 bg-[#FBF8F1] relative">
      {/* Subtle Background Geometry */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A45C]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E9DDCB]/50 border border-[#C9A45C]/30 text-xs font-semibold uppercase tracking-widest text-[#145C5A]">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A45C]" />
            <span>Curated Kuwait Boutique Suites</span>
          </div>

          <h2 className="font-serif-cormorant text-3xl sm:text-4xl md:text-5xl font-bold text-[#463A34] tracking-tight">
            Featured Categories
          </h2>

          <p className="text-sm sm:text-base text-[#75665D] font-body max-w-2xl mx-auto leading-relaxed">
            Discover our nine signature jewellery categories, masterfully crafted in 18K and 21K gold, natural pearls, and fine diamonds.
          </p>
        </div>

        {/* 3-Column Grid Containing Exactly 9 Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {NINE_CATEGORIES_DATA.map((col, idx) => (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              onClick={() => onSelectCategory(col.categoryKey)}
              className="group cursor-pointer relative rounded-2xl bg-white border border-[#E9DDCB] hover:border-[#C9A45C] transition-all duration-300 overflow-hidden shadow-xs hover:shadow-xl flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#F4EFE6]">
                <JewelleryImage
                  src={col.image}
                  alt={`Sunmoon Jewelleryj - ${col.title}`}
                  className="w-full h-full object-cover object-center transform group-hover:scale-106 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#463A34]/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                {/* Floating Highlight Tag */}
                <div className="absolute top-3.5 left-3.5">
                  <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-semibold text-[#145C5A] border border-[#C9A45C]/40 shadow-xs">
                    {col.highlightText}
                  </span>
                </div>

                {/* Arrow Icon Top Right */}
                <div className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center text-[#463A34] group-hover:bg-[#145C5A] group-hover:text-white transition-colors duration-300 shadow-xs">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Card Details */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between bg-white">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif-cormorant text-2xl font-bold text-[#463A34] group-hover:text-[#145C5A] transition-colors">
                      {col.title}
                    </h3>
                    <span className="text-[11px] font-semibold text-[#C9A45C] tracking-wider uppercase">
                      {col.itemCount} Items
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#75665D] font-body leading-relaxed line-clamp-2">
                    {col.description}
                  </p>
                </div>

                {/* Explore Action Button */}
                <div className="pt-4 mt-3 border-t border-[#F4EFE6] flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-[#145C5A] uppercase tracking-wider group-hover:underline break-words">
                    EXPLORE {col.title.toUpperCase()}
                  </span>
                  <span className="text-xs text-[#C9A45C] group-hover:translate-x-1 transition-transform shrink-0">
                    →
                  </span>
                </div>
              </div>

              {/* Gold Accent Bar */}
              <div className="h-[2.5px] w-full bg-transparent group-hover:bg-gradient-to-r group-hover:from-[#C9A45C] group-hover:to-[#E4CCA1] transition-all duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
