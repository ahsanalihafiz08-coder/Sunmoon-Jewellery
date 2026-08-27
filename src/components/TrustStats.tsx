import React from 'react';
import { motion } from 'motion/react';
import { Star, Award, Sparkles, Store, Users } from 'lucide-react';
import { STORE_INFO } from '../data/jewelleryData';

export const TrustStats: React.FC = () => {
  const stats = [
    {
      id: 'rating-stat',
      value: '4.4 / 5.0',
      label: 'Rating on Google',
      icon: Star,
      subtext: '★★★★★ Verified Feedback',
      accent: 'text-[#C9A45C]',
    },
    {
      id: 'reviews-stat',
      value: `${STORE_INFO.reviewCount}`,
      label: 'Customer Reviews',
      icon: Users,
      subtext: 'Trusted in Kuwait City',
      accent: 'text-[#145C5A]',
    },
    {
      id: 'craft-stat',
      value: 'Elegant Jewellery',
      label: '18K & 21K Collections',
      icon: Sparkles,
      subtext: 'Gold, Pearls & Bespoke Sets',
      accent: 'text-[#C9A45C]',
    },
    {
      id: 'experience-stat',
      value: 'Premium Experience',
      label: 'Souq Al Watiya Boutique',
      icon: Store,
      subtext: 'Ground Floor, Shop 116',
      accent: 'text-[#145C5A]',
    },
  ];

  return (
    <section className="relative py-12 bg-white/80 border-y border-[#E9DDCB] backdrop-blur-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative p-6 rounded-2xl bg-[#FBF8F1] border border-[#E9DDCB] hover:border-[#C9A45C]/60 transition-all hover:shadow-md flex flex-col items-center sm:items-start text-center sm:text-left group"
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#C9A45C]/30 flex items-center justify-center text-[#145C5A] shadow-xs group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5 text-[#C9A45C]" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#75665D]/70 bg-white/80 px-2 py-0.5 rounded-full border border-[#E9DDCB]">
                    Verified
                  </span>
                </div>

                <h3 className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-[#463A34] tracking-tight group-hover:text-[#145C5A] transition-colors">
                  {stat.value}
                </h3>
                <p className="text-sm font-semibold text-[#145C5A] mt-0.5">{stat.label}</p>
                <p className="text-xs text-[#75665D] mt-1 font-body">{stat.subtext}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
