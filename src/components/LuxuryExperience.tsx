import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Crown, Shield, ArrowRight } from 'lucide-react';

interface LuxuryExperienceProps {
  onDiscoverMore: () => void;
  onOpenAppointment: () => void;
}

export const LuxuryExperience: React.FC<LuxuryExperienceProps> = ({
  onDiscoverMore,
  onOpenAppointment,
}) => {
  return (
    <section className="py-20 sm:py-28 bg-[#FBF8F1] relative overflow-hidden">
      {/* Decorative Warm Ambient Glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-[#E4CCA1]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#D99A8B]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="space-y-8 text-center"
        >
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E9DDCB]/50 border border-[#C9A45C]/30 text-xs font-semibold uppercase tracking-widest text-[#145C5A]">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A45C]" />
              <span>The Art of Adornment</span>
            </div>

            <h2 className="font-serif-cormorant text-3xl sm:text-4xl md:text-5xl font-bold text-[#463A34] tracking-tight leading-[1.15]">
              A Touch of Elegance <br />
              <span className="italic font-serif-playfair text-[#145C5A]">for Every Moment</span>
            </h2>

            {/* Champagne Gold Decorative Line */}
            <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-[#C9A45C] to-transparent mx-auto my-3" />

            <p className="text-base sm:text-lg text-[#75665D] font-body leading-relaxed max-w-2xl mx-auto">
              Fine jewellery is more than an accessory—it is an enduring reflection of your individuality, celebrating milestones, heritage, and the intimate memories you hold dearest.
            </p>

            <p className="text-sm sm:text-base text-[#75665D] font-body leading-relaxed max-w-2xl mx-auto">
              At Intemporel Genève, we present a refined atmosphere where every client receives attentive, confidential guidance. From selecting an investment-grade complication to discovering an iconic daily watch, our salon on Route des Jeunes is devoted to your horological journey.
            </p>
          </div>

          {/* Feature Points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
            <div className="p-5 rounded-2xl bg-white border border-[#E9DDCB] shadow-xs space-y-1.5">
              <div className="flex items-center gap-2 text-[#145C5A]">
                <Heart className="w-4 h-4 text-[#C9A45C]" />
                <span className="text-xs font-bold uppercase tracking-wider">Enduring Heritage</span>
              </div>
              <p className="text-xs text-[#75665D] leading-relaxed">Mechanical creations destined to become family heirlooms across generations.</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#E9DDCB] shadow-xs space-y-1.5">
              <div className="flex items-center gap-2 text-[#145C5A]">
                <Shield className="w-4 h-4 text-[#C9A45C]" />
                <span className="text-xs font-bold uppercase tracking-wider">Geneva Salon Hospitality</span>
              </div>
              <p className="text-xs text-[#75665D] leading-relaxed">Dedicated horological guidance tailored around your collector preferences and lifestyle.</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              id="luxury-discover-more-btn"
              onClick={onDiscoverMore}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#145C5A] hover:bg-[#0D3E3D] text-[#FBF8F1] text-xs font-semibold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Discover More</span>
              <ArrowRight className="w-4 h-4 text-[#C9A45C]" />
            </button>

            <button
              id="luxury-book-visit-btn"
              onClick={onOpenAppointment}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white hover:bg-[#E9DDCB]/30 border border-[#C9A45C] text-[#463A34] text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xs"
            >
              <span>Book Private Viewing</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
