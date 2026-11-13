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
          <span>Geneva Haute Horlogerie Salon</span>
        </div>

        <div className="space-y-4">
          <h2 className="font-serif-cormorant text-4xl sm:text-5xl md:text-6xl font-bold text-[#463A34] tracking-tight leading-tight">
            Acquire an Iconic Timepiece
          </h2>

          <p className="text-base sm:text-xl text-[#75665D] font-body max-w-2xl mx-auto leading-relaxed">
            Discover exceptional Swiss horology and schedule a private viewing in our Geneva salon for a confidential consultation.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            id="final-cta-explore"
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#145C5A] hover:bg-[#0D3E3D] text-[#FBF8F1] text-xs font-semibold uppercase tracking-wider transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Explore Collection</span>
            <ChevronRight className="w-4 h-4 text-[#C9A45C] group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            id="final-cta-visit"
            onClick={onVisitClick}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-[#E9DDCB]/40 border border-[#C9A45C] text-[#463A34] text-xs font-semibold uppercase tracking-wider transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <MapPin className="w-4 h-4 text-[#C9A45C]" />
            <span>Visit Our Salon</span>
          </button>

          <a
            id="final-cta-whatsapp"
            href={STORE_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/70 hover:bg-white text-[#145C5A] border border-[#145C5A]/30 text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-[#145C5A]" />
            <span>WhatsApp Concierge</span>
          </a>
        </div>

        {/* Address confirmation line */}
        <p className="text-xs text-[#75665D] pt-4 font-body">
          Route des Jeunes 4bis, 1227 Les Acacias, Genève, Suisse • Tel: {STORE_INFO.phone}
        </p>
      </div>
    </section>
  );
};
