import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SWISS_FILTER_BRANDS } from '../data/jewelleryData';
import { WatchBrandLogo } from './WatchBrandLogo';

interface BrandFilterBarProps {
  selectedBrand: string;
  onSelectBrand: (brand: string) => void;
}

export const BrandFilterBar: React.FC<BrandFilterBarProps> = ({
  selectedBrand,
  onSelectBrand,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollRow = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const distance = direction === 'left' ? -280 : 280;
    scrollContainerRef.current.scrollBy({ left: distance, behavior: 'smooth' });
  };

  return (
    <section
      id="brand-selector"
      aria-label="Choose your favorite brand name"
      className="w-full bg-[#FBF8F1] border-t border-b border-[#E9DDCB] py-5 sm:py-6 relative"
    >
      {/* Subtle Top & Bottom Champagne Gold Accent Hairlines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A45C]/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A45C]/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Clean Heading Row */}
        <div className="flex items-center justify-between gap-3 mb-3.5">
          <h2 className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-[#145C5A] tracking-tight">
            Choose your favorite brand name
          </h2>

          <div className="flex items-center gap-2 shrink-0">
            {selectedBrand !== 'all' && (
              <button
                type="button"
                onClick={() => onSelectBrand('all')}
                className="text-[11px] font-bold text-[#145C5A] hover:text-[#C9A45C] uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap px-3 py-1 rounded-full bg-white border border-[#E9DDCB] mr-1"
              >
                All Brands ✕
              </button>
            )}
            <div className="hidden md:flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => scrollRow('left')}
                aria-label="Scroll brands left"
                className="w-8 h-8 rounded-full bg-white border border-[#E9DDCB] hover:border-[#C9A45C] text-[#463A34] hover:text-[#145C5A] flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollRow('right')}
                aria-label="Scroll brands right"
                className="w-8 h-8 rounded-full bg-white border border-[#E9DDCB] hover:border-[#C9A45C] text-[#463A34] hover:text-[#145C5A] flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Single Horizontal Scrolling Row Containing Watch Brand Names & Their Respective Logos */}
        <div
          ref={scrollContainerRef}
          className="flex flex-nowrap items-center gap-2.5 sm:gap-3 overflow-x-auto no-scrollbar scroll-smooth whitespace-nowrap py-1 touch-pan-x"
        >
          {/* All Brands Item */}
          <button
            type="button"
            onClick={() => onSelectBrand('all')}
            className={`group px-4 py-2.5 rounded-2xl transition-all duration-200 cursor-pointer shrink-0 border flex items-center gap-2.5 whitespace-nowrap ${
              selectedBrand === 'all'
                ? 'bg-[#145C5A] text-[#FBF8F1] border-[#145C5A] shadow-md ring-1 ring-[#C9A45C]/60'
                : 'bg-white text-[#463A34] border-[#E9DDCB] hover:border-[#C9A45C] hover:text-[#145C5A] shadow-2xs'
            }`}
          >
            <span
              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                selectedBrand === 'all'
                  ? 'bg-[#C9A45C]/20 text-[#E4CCA1]'
                  : 'bg-[#FBF8F1] text-[#145C5A] border border-[#E9DDCB] group-hover:border-[#C9A45C]'
              }`}
            >
              <WatchBrandLogo brand="all" className="w-4 h-4" />
            </span>
            <span className="font-serif-cormorant text-sm sm:text-base font-bold uppercase tracking-wider whitespace-nowrap">
              All Brands
            </span>
          </button>

          {/* Luxury Watchmaker Brands with Individual Logos */}
          {SWISS_FILTER_BRANDS.map((brand) => {
            const isActive = selectedBrand.toLowerCase() === brand.toLowerCase();
            return (
              <button
                key={brand}
                type="button"
                onClick={() => onSelectBrand(brand)}
                className={`group px-4 py-2.5 rounded-2xl transition-all duration-200 cursor-pointer shrink-0 border flex items-center gap-2.5 whitespace-nowrap ${
                  isActive
                    ? 'bg-[#145C5A] text-[#FBF8F1] border-[#145C5A] shadow-md ring-1 ring-[#C9A45C]/60'
                    : 'bg-white text-[#463A34] border-[#E9DDCB] hover:border-[#C9A45C] hover:text-[#145C5A] shadow-2xs'
                }`}
              >
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    isActive
                      ? 'bg-[#C9A45C]/25 text-[#E4CCA1]'
                      : 'bg-[#FBF8F1] text-[#145C5A] border border-[#E9DDCB] group-hover:border-[#C9A45C] group-hover:text-[#C9A45C]'
                  }`}
                >
                  <WatchBrandLogo brand={brand} className="w-4 h-4" />
                </span>
                <span className="font-serif-cormorant text-sm sm:text-base font-bold uppercase tracking-wider whitespace-nowrap">
                  {brand}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
