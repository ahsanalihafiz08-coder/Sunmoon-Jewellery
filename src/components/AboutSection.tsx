import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Crown, ShieldCheck, MapPin } from 'lucide-react';
import { STORE_INFO } from '../data/jewelleryData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 sm:py-28 bg-[#FBF8F1] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Brand Story Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E9DDCB]/50 border border-[#C9A45C]/30 text-xs font-semibold uppercase tracking-widest text-[#145C5A]">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A45C]" />
              <span>About Intemporel Genève</span>
            </div>

            <h2 className="font-serif-cormorant text-3xl sm:text-4xl md:text-5xl font-bold text-[#463A34] tracking-tight leading-[1.15]">
              The Art of <br />
              <span className="italic font-serif-playfair text-[#145C5A]">Timeless Swiss Horology</span>
            </h2>

            <div className="w-20 h-[2px] bg-gradient-to-r from-[#C9A45C] to-transparent mx-auto lg:mx-0 my-2" />

            <div className="space-y-4 text-base text-[#75665D] font-body leading-relaxed">
              <p>
                At Intemporel Genève, we believe that an exceptional timepiece is an enduring mechanical artwork—a testament to centuries of Swiss horological mastery, micro-engineering, and uncompromising precision.
              </p>
              <p>
                Situated at Route des Jeunes 4bis in Les Acacias, Genève, our salon curates premier timepieces from prestigious Swiss manufactures including Patek Philippe, Audemars Piguet, Rolex, Vacheron Constantin, and independent master watchmakers.
              </p>
              <p>
                Whether you seek a rare perpetual calendar, a high-frequency chronograph, an ultra-thin dress classic, or an iconic sports reference, we invite you to experience the discretion and expertise of our private Geneva salon.
              </p>
            </div>

            {/* Core Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-white border border-[#E9DDCB] text-center sm:text-left space-y-1">
                <Crown className="w-5 h-5 text-[#C9A45C] mx-auto sm:mx-0" />
                <p className="font-serif-cormorant text-lg font-bold text-[#463A34]">Certified Provenance</p>
                <p className="text-xs text-[#75665D]">Every movement authenticated and timing-tested.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E9DDCB] text-center sm:text-left space-y-1">
                <Heart className="w-5 h-5 text-[#C9A45C] mx-auto sm:mx-0" />
                <p className="font-serif-cormorant text-lg font-bold text-[#463A34]">Bespoke Sourcing</p>
                <p className="text-xs text-[#75665D]">Global access to rare references and complications.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E9DDCB] text-center sm:text-left space-y-1">
                <MapPin className="w-5 h-5 text-[#C9A45C] mx-auto sm:mx-0" />
                <p className="font-serif-cormorant text-lg font-bold text-[#463A34]">Geneva Salon</p>
                <p className="text-xs text-[#75665D]">Route des Jeunes 4bis, Les Acacias, Suisse.</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Visual Collage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto max-w-md">
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-[#C9A45C]/40 bg-[#F4EFE6] aspect-[4/5] relative">
                <img
                  src="/images/QvCJhSYW-Mechanical-watch-showing-gear-mo-493c363f.jpg"
                  alt="Intemporel Genève - Mechanical watch showing gear movement"
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                  fetchPriority="high"
                  decoding="sync"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#463A34]/50 via-transparent to-transparent" />
              </div>

              {/* Floating Quote Badge */}
              <div className="relative sm:absolute sm:-bottom-6 sm:-left-8 mt-4 sm:mt-0 p-5 bg-white/95 backdrop-blur-md rounded-2xl border border-[#C9A45C]/40 shadow-xl max-w-xs space-y-1 z-20">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#C9A45C]">
                  Our Philosophy
                </p>
                <p className="font-serif-cormorant text-base font-bold text-[#463A34] leading-snug">
                  "A master timepiece measures not merely seconds, but enduring moments of distinction."
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
