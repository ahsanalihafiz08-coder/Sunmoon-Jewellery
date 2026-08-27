import React from 'react';
import { motion } from 'motion/react';
import { Gem, Sparkles, Users, Eye } from 'lucide-react';
import { WHY_CHOOSE_ITEMS } from '../data/jewelleryData';

export const WhyChooseUs: React.FC = () => {
  const iconMap: Record<string, any> = {
    'timeless-style': Gem,
    'elegant-selection': Sparkles,
    'personal-experience': Users,
    'beautiful-details': Eye,
  };

  return (
    <section className="py-20 sm:py-28 bg-white border-y border-[#E9DDCB] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FBF8F1] border border-[#C9A45C]/30 text-xs font-semibold uppercase tracking-widest text-[#145C5A]">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A45C]" />
            <span>The Boutique Distinction</span>
          </div>

          <h2 className="font-serif-cormorant text-3xl sm:text-4xl md:text-5xl font-bold text-[#463A34] tracking-tight">
            Why Choose Sunmoon Jewelleryj
          </h2>

          <p className="text-base sm:text-lg text-[#75665D] font-body max-w-2xl mx-auto leading-relaxed">
            Our commitment to timeless design, authentic hospitality, and thoughtful presentation sets our Kuwait City boutique apart.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {WHY_CHOOSE_ITEMS.map((item, idx) => {
            const Icon = iconMap[item.id] || Sparkles;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative p-8 rounded-2xl bg-[#FBF8F1] border border-[#E9DDCB] hover:border-[#C9A45C] hover:bg-white transition-all duration-300 shadow-xs hover:shadow-lg flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#C9A45C]/40 group-hover:bg-[#145C5A] flex items-center justify-center text-[#145C5A] group-hover:text-white transition-colors duration-300 shadow-xs">
                    <Icon className="w-6 h-6 text-[#C9A45C] group-hover:text-[#FBF8F1] transition-colors" />
                  </div>

                  {/* Title */}
                  <h3 className="font-serif-cormorant text-2xl font-bold text-[#463A34] group-hover:text-[#145C5A] transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#75665D] font-body leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Subtle bottom indicator */}
                <div className="pt-6 mt-6 border-t border-[#E9DDCB]/60 flex items-center text-xs font-semibold text-[#C9A45C] group-hover:text-[#145C5A] transition-colors">
                  <span>Explore Standard</span>
                  <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
