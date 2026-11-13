import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Search, ArrowRight, Calendar, Eye } from 'lucide-react';
import { CATALOG_PRODUCTS, getTimepiecesByBrand } from '../data/jewelleryData';
import { JewelleryItem } from '../types';
import { JewelleryImage } from './JewelleryImage';

interface FeaturedJewelleryProps {
  onSelectItem: (item: JewelleryItem) => void;
  onBookViewing?: (itemName: string) => void;
  selectedCategoryFilter: string;
  onFilterChange: (cat: string) => void;
  selectedBrandFilter?: string;
  onBrandFilterChange?: (brand: string) => void;
  savedItemIds?: Set<string>;
  onToggleSaveItem?: (id: string, e: React.MouseEvent) => void;
}

export const FeaturedJewellery: React.FC<FeaturedJewelleryProps> = ({
  onSelectItem,
  onBookViewing,
  selectedCategoryFilter,
  onFilterChange,
  selectedBrandFilter = 'all',
  onBrandFilterChange,
  savedItemIds: propSavedIds,
  onToggleSaveItem: propToggleSave,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [internalSavedItemIds, setInternalSavedItemIds] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem('intemporel_saved_items') || localStorage.getItem('sunmoon_saved_items');
      return stored ? new Set(JSON.parse(stored)) : new Set<string>();
    } catch {
      return new Set<string>();
    }
  });

  const activeSavedIds = propSavedIds || internalSavedItemIds;

  const toggleSaveItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (propToggleSave) {
      propToggleSave(id, e);
      return;
    }

    setInternalSavedItemIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      try {
        localStorage.setItem('intemporel_saved_items', JSON.stringify(Array.from(next)));
      } catch {}
      return next;
    });
  };

  const filterTabs = [
    { label: 'ALL TIMEPIECES', key: 'all' },
    { label: 'Sports Luxury', key: 'sports-luxury' },
    { label: 'Chronographs', key: 'chronographs' },
    { label: 'Dress Watches', key: 'dress-watches' },
    { label: 'Complications', key: 'complications' },
    { label: 'Haute Horlogerie', key: 'haute-horlogerie' },
    { label: 'Haute Joaillerie', key: 'haute-joaillerie' },
  ];

  // Select items based on brand filter across complete existing inventory
  const currentPool = useMemo(() => {
    if (!selectedBrandFilter || selectedBrandFilter === 'all') {
      return CATALOG_PRODUCTS;
    }

    const matched = getTimepiecesByBrand(selectedBrandFilter);
    return matched.length > 0 ? matched : CATALOG_PRODUCTS;
  }, [selectedBrandFilter]);

  const filteredItems = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return currentPool.filter((item) => {
      const matchesCategoryTab =
        selectedCategoryFilter === 'all' || item.category === selectedCategoryFilter;

      if (!q) return matchesCategoryTab;

      const catName = item.category.toLowerCase();
      const itemName = item.name.toLowerCase();
      const itemDesc = item.description.toLowerCase();
      const itemMetal = item.metal.toLowerCase();
      const itemPrice = (item.price || '').toLowerCase();

      const matchesSearch =
        itemName.includes(q) ||
        itemDesc.includes(q) ||
        itemMetal.includes(q) ||
        catName.includes(q) ||
        itemPrice.includes(q);

      return matchesSearch && matchesCategoryTab;
    });
  }, [currentPool, selectedCategoryFilter, searchQuery]);

  return (
    <section id="catalog" className="pt-6 sm:pt-8 pb-14 sm:pb-20 bg-[#F4EFE6]/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {selectedBrandFilter === 'all' ? (
          <>
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#C9A45C]/40 text-xs font-semibold uppercase tracking-widest text-[#145C5A]">
                  <Sparkles className="w-3.5 h-3.5 text-[#C9A45C]" />
                  <span>Geneva Salon Catalogue</span>
                </div>
                <h2 className="font-serif-cormorant text-3xl sm:text-4xl md:text-5xl font-bold text-[#463A34] tracking-tight">
                  Mini Product Catalog
                </h2>
                <p className="text-sm sm:text-base text-[#75665D] font-body leading-relaxed">
                  Explore our curated master timepieces verified by Intemporel Genève. Filter by complication or brand, inspect mechanical movements, or reserve a private viewing.
                </p>
              </div>

              {/* Quick Search */}
              <div className="w-full md:w-72">
                <div className="relative">
                  <input
                    id="jewellery-search-input"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search reference, brand, or metal..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-[#C9A45C]/40 text-xs text-[#463A34] placeholder-[#75665D]/60 focus:outline-none focus:border-[#145C5A] shadow-xs"
                  />
                  <Search className="w-4 h-4 text-[#C9A45C] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#75665D] hover:text-[#463A34]"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Filter Navigation Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
              {filterTabs.map((tab) => {
                const isActive = selectedCategoryFilter === tab.key;
                return (
                  <button
                    key={tab.key}
                    id={`filter-tab-${tab.key}`}
                    onClick={() => onFilterChange(tab.key)}
                    className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                      isActive
                        ? 'bg-[#145C5A] text-[#FBF8F1] shadow-sm'
                        : 'bg-white text-[#75665D] border border-[#E9DDCB] hover:border-[#C9A45C] hover:text-[#463A34]'
                    }`}
                  >
                    <span className="whitespace-nowrap">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          /* Compact Active Brand Header so watches display immediately in view below BrandFilterBar */
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 p-3.5 rounded-2xl bg-white border border-[#C9A45C]/40 shadow-xs">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#145C5A] animate-pulse shrink-0" />
              <h2 className="font-serif-cormorant text-xl sm:text-2xl font-bold text-[#463A34]">
                {selectedBrandFilter} Timepieces
              </h2>
              <span className="text-xs font-medium text-[#75665D] bg-[#FBF8F1] px-2.5 py-0.5 rounded-full border border-[#E9DDCB]">
                {filteredItems.length} {filteredItems.length === 1 ? 'Piece' : 'Pieces'}
              </span>
            </div>
            {onBrandFilterChange && (
              <button
                type="button"
                onClick={() => onBrandFilterChange('all')}
                className="text-xs font-bold text-[#145C5A] hover:text-[#C9A45C] transition-colors cursor-pointer uppercase tracking-wider whitespace-nowrap px-3 py-1.5 rounded-full bg-[#FBF8F1] border border-[#E9DDCB]"
              >
                Show All 36 Timepieces ✕
              </button>
            )}
          </div>
        )}

        {/* 3 Cards Per Row Horizontal Grid Layout with Compact Height & Top-Right Heart */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredItems.map((item, idx) => {
              const isSaved = activeSavedIds.has(item.id);

              return (
                <motion.div
                  key={`${selectedBrandFilter}-${item.id}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={selectedBrandFilter !== 'all' ? { opacity: 1, y: 0 } : undefined}
                  whileInView={selectedBrandFilter === 'all' ? { opacity: 1, y: 0 } : undefined}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.3, delay: (idx % 3) * 0.03 }}
                  className="group relative rounded-2xl bg-white border border-[#E9DDCB] hover:border-[#C9A45C] transition-all duration-300 shadow-xs hover:shadow-xl flex flex-col justify-between overflow-hidden"
                >
                  {/* Image Container with compact 4:3 aspect ratio */}
                  <div
                    className="relative aspect-[4/3] overflow-hidden bg-[#FBF8F1] cursor-pointer"
                    onClick={() => onSelectItem(item)}
                  >
                    <JewelleryImage
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                    />

                    <div className="absolute inset-0 bg-[#463A34]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="px-3.5 py-1.5 rounded-full bg-white/95 text-[#145C5A] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <Eye className="w-3.5 h-3.5 text-[#C9A45C]" />
                        <span>Quick View</span>
                      </span>
                    </div>

                    {/* Top-Left Badges */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10">
                      <span className="px-2 py-0.5 rounded-full bg-[#145C5A] text-white text-[10px] font-bold uppercase tracking-wider shadow-xs">
                        #{idx + 1}
                      </span>
                      {item.isNewArrival && (
                        <span className="px-2 py-0.5 rounded-full bg-[#C9A45C] text-[#463A34] text-[10px] font-bold uppercase tracking-wider shadow-xs">
                          Featured
                        </span>
                      )}
                    </div>

                    {/* Top-Right Corner Overlay: Wishlist Heart Icon */}
                    <div className="absolute top-2.5 right-2.5 z-10">
                      <button
                        id={`product-save-heart-${idx + 1}`}
                        onClick={(e) => toggleSaveItem(item.id, e)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-md cursor-pointer ${
                          isSaved
                            ? 'bg-[#D99A8B] text-white'
                            : 'bg-white/90 backdrop-blur-xs text-[#75665D] hover:text-[#D99A8B] hover:bg-white'
                        }`}
                        aria-label={isSaved ? 'Remove from Saved' : 'Save Piece'}
                        title={isSaved ? 'Saved' : 'Save to Favorites'}
                      >
                        <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Body Content with compact uniform padding */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-2.5">
                    <div className="space-y-1.5">
                      {/* Category Pill and USD Price Row with Fixed Height */}
                      <div className="flex items-center justify-between gap-2 h-6">
                        <span className="text-[11px] font-semibold text-[#75665D] bg-[#FBF8F1] px-2.5 py-0.5 rounded-md border border-[#E9DDCB] capitalize truncate max-w-[65%]">
                          {item.category.replace('-', ' ')} • {item.metal}
                        </span>
                        <span className="text-xs font-bold text-[#145C5A] px-2 py-0.5 rounded-md bg-[#145C5A]/10 border border-[#145C5A]/20 shrink-0">
                          {item.price || '$9,500'}
                        </span>
                      </div>

                      {/* Single-Line Truncated Title */}
                      <h3
                        className="font-serif-cormorant text-xl font-bold text-[#463A34] group-hover:text-[#145C5A] transition-colors truncate cursor-pointer pt-0.5"
                        onClick={() => onSelectItem(item)}
                        title={item.name}
                      >
                        {item.name}
                      </h3>

                      {/* Uniform 2-Line Truncated Description */}
                      <p className="text-xs text-[#75665D] font-body line-clamp-2 h-9 overflow-hidden leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Bottom Action Bar: Strictly Single-Line Clean Alignment */}
                    <div className="pt-2.5 border-t border-[#F4EFE6] flex items-center justify-between gap-2">
                      {/* Left: VIEW DETAILS */}
                      <button
                        id={`product-details-btn-${idx + 1}`}
                        onClick={() => onSelectItem(item)}
                        className="text-xs font-bold text-[#145C5A] hover:text-[#C9A45C] transition-colors flex items-center gap-1 group/btn whitespace-nowrap uppercase tracking-wider cursor-pointer shrink-0"
                      >
                        <span className="whitespace-nowrap">VIEW DETAILS</span>
                        <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform shrink-0" />
                      </button>

                      {/* Right: Book Viewing Button */}
                      <button
                        id={`product-book-viewing-${idx + 1}`}
                        onClick={() => {
                          if (onBookViewing) {
                            onBookViewing(item.name);
                          }
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#145C5A] hover:bg-[#0D3E3D] text-white text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1 transition-colors shadow-xs shrink-0 whitespace-nowrap cursor-pointer"
                        title="Book Viewing at Geneva Salon"
                      >
                        <Calendar className="w-3 h-3 text-[#C9A45C] shrink-0" />
                        <span className="whitespace-nowrap">Book Viewing</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#E9DDCB] max-w-md mx-auto p-8">
            <Sparkles className="w-8 h-8 text-[#C9A45C] mx-auto mb-3" />
            <h3 className="font-serif-cormorant text-xl font-bold text-[#463A34]">No timepieces matched</h3>
            <p className="text-xs text-[#75665D] mt-1 mb-4">
              Try adjusting your category filter, or reset to all brands.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  setSearchQuery('');
                  onFilterChange('all');
                }}
                className="px-4 py-2 rounded-full bg-white border border-[#E9DDCB] text-[#463A34] text-xs font-semibold uppercase tracking-wider cursor-pointer hover:border-[#C9A45C]"
              >
                Reset Categories
              </button>
              {onBrandFilterChange && (
                <button
                  onClick={() => onBrandFilterChange('all')}
                  className="px-4 py-2 rounded-full bg-[#145C5A] text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
                >
                  All Brands
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
