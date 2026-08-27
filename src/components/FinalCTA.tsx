import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, MapPin, ChevronRight, MessageCircle } from 'lucide-react';
import { STORE_INFO } from '../data/jewelleryData';

interface FinalCTAProps {
  onExploreClick: () => void;
  onVisitClick: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onExploreClick, onVisitClick }) => {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-gradient-to-br from-[#FBF8F1] via-[#E9DDCB]/60 to-[#F4EFE6] border-t border-[#E9DDCB]">
      {/* Subtle Glows */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#C9A45C]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#D99A8B]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#C9A45C]/40 backdrop-blur-xs text-xs font-semibold uppercase tracking-widest text-[#145C5A] shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#C9A45C]" />
          <span>Kuwait City Luxury Boutique</span>
        </div>

        <div className="space-y-4">
          <h2 className="font-serif-cormorant text-4xl sm:text-5xl md:text-6xl font-bold text-[#463A34] tracking-tight leading-tight">
            Find Something Beautiful
          </h2>

          <p className="text-base sm:text-xl text-[#75665D] font-body max-w-2xl mx-auto leading-relaxed">
            Discover elegant jewellery and visit us in Kuwait City for a personal shopping experience.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            id="final-cta-explore"
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#145C5A] hover:bg-[#0D3E3D] text-[#FBF8F1] text-xs font-semibold uppercase tracking-wider transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
          >
            <span>Explore Collection</span>
            <ChevronRight className="w-4 h-4 text-[#C9A45C] group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            id="final-cta-visit"
            onClick={onVisitClick}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-[#E9DDCB]/40 border border-[#C9A45C] text-[#463A34] text-xs font-semibold uppercase tracking-wider transition-all shadow-xs flex items-center justify-center gap-2"
          >
            <MapPin className="w-4 h-4 text-[#C9A45C]" />
            <span>Visit Our Store</span>
          </button>

          <a
            id="final-cta-whatsapp"
            href={STORE_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/70 hover:bg-white text-[#145C5A] border border-[#145C5A]/30 text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-[#145C5A]" />
            <span>WhatsApp Concierge</span>
          </a>
        </div>

        {/* Address confirmation line */}
        <p className="text-xs text-[#75665D] pt-4 font-body">
          Ground floor, 116, Souq Al Watiya, Maliya, Kuwait City • Tel: {STORE_INFO.phone}
        </p>
      </div>
    </section>
  );
};
