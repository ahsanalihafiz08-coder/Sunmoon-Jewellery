import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, MapPin } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onVisitClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onVisitClick }) => {
  return (
    <section
      id="home"
      className="w-full min-h-[92vh] md:min-h-0 md:aspect-[16/9] relative text-white p-0 m-0 overflow-hidden flex flex-col justify-center items-center"
      style={{
        aspectRatio: '16 / 9',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        margin: 0,
        paddingTop: 0,
        paddingBottom: 0,
      }}
    >
      {/* Full-Bleed 16:9 Cover Background Image (Desktop & Mobile) */}
      <img
        src="https://i.ibb.co/gM7XvR4s/Luxury-jewelry-on-marble-slab-202608271949.jpg"
        alt="Sunmoon Jewelleryj - Luxury jewelry on marble slab"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
        loading="eager"
        decoding="async"
        style={{
          objectPosition: 'center center',
          imageRendering: 'auto',
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
        }}
      />

      {/* Luxury Contrast Gradient Overlay (Left-focused on desktop, minimal on mobile) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 md:via-black/35 to-transparent z-10 pointer-events-none" />

      {/* Hero Content Container - Zero extra spacing/margins for flush edge-to-edge alignment */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-0 my-0">
        {/* Mobile View: Single Column Centered Layout */}
        <div className="md:hidden text-center flex flex-col justify-between max-w-md mx-auto py-8">
          {/* Main Heading (shifted upward on mobile) & Sub-description (shifted downward on mobile) */}
          <div className="space-y-3 sm:space-y-5 -translate-y-7">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/50 border border-[#C9A45C]/70 backdrop-blur-md text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#E4CCA1] shadow-md"
            >
              <span>Sunmoon Jewelleryj</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif-cormorant text-4xl sm:text-5xl font-bold tracking-tight text-white leading-[1.08] drop-shadow-[0_3px_10px_rgba(0,0,0,0.85)]"
            >
              Timeless Beauty, <br />
              <span className="italic font-serif-playfair text-[#E4CCA1]">Made to Shine</span>
            </motion.h1>

            {/* Sub-description shifted downward on mobile to give generous breathing room */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-xs sm:text-base text-[#FFFFFF] font-body max-w-xl mx-auto leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] px-2 font-medium mt-5 pt-3 translate-y-2"
            >
              Discover handcrafted gold jewellery, fine pearls, and celebratory suites in Maliya, Kuwait City.
            </motion.p>
          </div>

          {/* Hero CTA Action Buttons - Shifted downward on mobile view */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col items-center justify-center gap-3 w-full max-w-xs mx-auto pt-8 translate-y-4"
          >
            <button
              id="hero-primary-cta"
              onClick={onExploreClick}
              className="w-full py-3.5 px-6 rounded-full bg-[#C9A45C] hover:bg-[#B8924B] text-[#463A34] text-xs sm:text-sm font-bold tracking-wider uppercase transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 whitespace-nowrap group cursor-pointer"
            >
              <span>EXPLORE COLLECTION</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              id="hero-secondary-cta"
              onClick={onVisitClick}
              className="w-full py-3.5 px-6 rounded-full bg-black/40 hover:bg-black/50 border border-white/60 text-white text-xs sm:text-sm font-bold tracking-wider uppercase backdrop-blur-md transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-xl cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-[#E4CCA1]" />
              <span>VISIT OUR STORE</span>
            </button>
          </motion.div>
        </div>

        {/* Desktop View (min-width: 769px): Left-Aligned Content Overlay directly on Background */}
        <div className="hidden md:flex flex-col items-start text-left max-w-2xl py-0 my-0">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-[#C9A45C]/60 backdrop-blur-md text-xs font-semibold uppercase tracking-widest text-[#E4CCA1] shadow-lg mb-5 lg:mb-6"
          >
            <span>Sunmoon Jewelleryj</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif-cormorant text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.08] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] text-left mb-5 lg:mb-6"
          >
            Timeless Beauty, <br />
            <span className="italic font-serif-playfair text-[#E4CCA1]">Made to Shine</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base lg:text-lg text-[#FBF8F1] font-body max-w-xl text-left leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] mb-8"
          >
            Discover handcrafted gold jewellery, fine pearls, and celebratory suites in Maliya, Kuwait City.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 w-full"
          >
            <button
              id="hero-primary-cta-desktop"
              onClick={onExploreClick}
              className="py-4 px-8 rounded-full bg-[#C9A45C] hover:bg-[#B8924B] text-[#463A34] text-xs sm:text-sm font-bold tracking-wider uppercase transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 whitespace-nowrap group cursor-pointer"
            >
              <span>EXPLORE COLLECTION</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              id="hero-secondary-cta-desktop"
              onClick={onVisitClick}
              className="py-4 px-7 rounded-full bg-black/40 hover:bg-black/60 border border-white/50 text-white text-xs sm:text-sm font-bold tracking-wider uppercase backdrop-blur-md transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-xl cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-[#E4CCA1]" />
              <span>VISIT OUR STORE</span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};


