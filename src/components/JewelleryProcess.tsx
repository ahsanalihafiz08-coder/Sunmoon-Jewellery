import React from 'react';
import { motion } from 'motion/react';
import { Compass, Sparkles, Store, HeartHandshake } from 'lucide-react';
import { PROCESS_STEPS, STORE_INFO } from '../data/jewelleryData';

export const JewelleryProcess: React.FC = () => {
  const iconComponents: Record<string, any> = {
    Compass,
    Sparkles,
    Store,
    HeartHandshake,
  };

  return (
    <section className="py-20 sm:py-28 bg-[#FBF8F1] relative overflow-hidden">
      {/* Background connector line on large screens */}
      <div className="hidden lg:block absolute top-[52%] left-1/2 -translate-x-1/2 w-[70%] h-[2px] bg-gradient-to-r from-transparent via-[#C9A45C]/40 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E9DDCB]/50 border border-[#C9A45C]/30 text-xs font-semibold uppercase tracking-widest text-[#145C5A]">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A45C]" />
            <span>The Boutique Journey</span>
          </div>

          <h2 className="font-serif-cormorant text-3xl sm:text-4xl md:text-5xl font-bold text-[#463A34] tracking-tight">
            How You Experience Sunmoon
          </h2>

          <p className="text-base sm:text-lg text-[#75665D] font-body max-w-2xl mx-auto leading-relaxed">
            From initial inspiration to taking home an enduring keepsake, we make every step seamless and memorable.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PROCESS_STEPS.map((step, idx) => {
            const Icon = iconComponents[step.icon] || Sparkles;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="relative p-6 sm:p-8 rounded-2xl bg-white border border-[#E9DDCB] hover:border-[#C9A45C] transition-all duration-300 shadow-xs hover:shadow-xl flex flex-col justify-between group"
              >
                <div>
                  {/* Step Number & Icon Header */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif-cormorant text-3xl sm:text-4xl font-bold text-[#C9A45C] group-hover:text-[#145C5A] transition-colors">
                      {step.step}
                    </span>

                    <div className="w-10 h-10 rounded-full bg-[#FBF8F1] border border-[#C9A45C]/40 flex items-center justify-center text-[#145C5A] shadow-xs group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 text-[#C9A45C]" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif-cormorant text-2xl font-bold text-[#463A34] group-hover:text-[#145C5A] transition-colors mb-2">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#75665D] font-body leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F4EFE6] text-[11px] text-[#C9A45C] font-semibold tracking-wider uppercase">
                  Phase {step.step} of 04
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom invitation card */}
        <div className="mt-12 p-6 rounded-2xl bg-[#E9DDCB]/40 border border-[#C9A45C]/30 max-w-2xl mx-auto text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="font-serif-cormorant text-xl font-bold text-[#463A34]">Ready to begin your journey?</p>
            <p className="text-xs text-[#75665D]">Visit us in Souq Al Watiya or message our concierge on WhatsApp.</p>
          </div>
          <a
            id="process-whatsapp-link"
            href={STORE_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-full bg-[#145C5A] text-[#FBF8F1] text-xs font-semibold uppercase tracking-wider whitespace-nowrap shadow-xs hover:bg-[#0D3E3D] transition-colors"
          >
            Start on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};
