import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Search, ArrowRight, Calendar, Eye } from 'lucide-react';
import { CATALOG_PRODUCTS } from '../data/jewelleryData';
import { JewelleryItem } from '../types';
import { JewelleryImage } from './JewelleryImage';

interface FeaturedJewelleryProps {
  onSelectItem: (item: JewelleryItem) => void;
  onBookViewing?: (itemName: string) => void;
  selectedCategoryFilter: string;
  onFilterChange: (cat: string) => void;
  savedItemIds?: Set<string>;
  onToggleSaveItem?: (id: string, e: React.MouseEvent) => void;
}

export const FeaturedJewellery: React.FC<FeaturedJewelleryProps> = ({
  onSelectItem,
  onBookViewing,
  selectedCategoryFilter,
  onFilterChange,
  savedItemIds: propSavedIds,
  onToggleSaveItem: propToggleSave,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [internalSavedItemIds, setInternalSavedItemIds] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem('sunmoon_saved_items');
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
        localStorage.setItem('sunmoon_saved_items', JSON.stringify(Array.from(next)));
      } catch {}
      return next;
    });
  };

  const filterTabs = [
    { label: 'ALL CATALOG', key: 'all' },
    { label: 'Rings', key: 'rings' },
    { label: 'Necklaces', key: 'necklaces' },
    { label: 'Earrings', key: 'earrings' },
    { label: 'Bracelets', key: 'bracelets' },
    { label: 'Special Occasion', key: 'special-occasion' },
  ];

  const filteredItems = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return CATALOG_PRODUCTS.filter((item) => {
      const matchesCategoryTab =
        selectedCategoryFilter === 'all' || item.category === selectedCategoryFilter;

      if (!q) return matchesCategoryTab;

      const catName = item.category.toLowerCase();
      const itemName = item.name.toLowerCase();
      const itemDesc = item.description.toLowerCase();
      const itemMetal = item.metal.toLowerCase();
      const itemPrice = (item.price || '').toLowerCase();

      // Normalize search terms and aliases for categories
      const isRingQuery = q.includes('ring') || q.includes('solitaire') || q.includes('band');
      const isNecklaceQuery = q.includes('necklace') || q.includes('choker') || q.includes('chain') || q.includes('pendant');
      const isEarringQuery = q.includes('earring') || q.includes('drop') || q.includes('stud');
      const isBraceletQuery = q.includes('bracelet') || q.includes('bangle') || q.includes('cuff');
      const isSpecialQuery = q.includes('bridal') || q.includes('wedding') || q.includes('occasion') || q.includes('suite');

      const matchesCategoryAlias =
        (isRingQuery && catName === 'rings') ||
        (isNecklaceQuery && catName === 'necklaces') ||
        (isEarringQuery && catName === 'earrings') ||
        (isBraceletQuery && catName === 'bracelets') ||
        (isSpecialQuery && (catName === 'special-occasion' || catName === 'necklaces'));

      const matchesDirectText =
        itemName.includes(q) ||
        itemDesc.includes(q) ||
        itemMetal.includes(q) ||
        catName.includes(q) ||
        itemPrice.includes(q);

      const matchesSearch = matchesDirectText || matchesCategoryAlias;

      return matchesSearch && matchesCategoryTab;
    });
  }, [selectedCategoryFilter, searchQuery]);

  return (
    <section id="catalog" className="py-16 sm:py-24 bg-[#F4EFE6]/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#C9A45C]/40 text-xs font-semibold uppercase tracking-widest text-[#145C5A]">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A45C]" />
              <span>Full Boutique Catalogue</span>
            </div>
            <h2 className="font-serif-cormorant text-3xl sm:text-4xl md:text-5xl font-bold text-[#463A34] tracking-tight">
              Main Product Catalog
            </h2>
            <p className="text-sm sm:text-base text-[#75665D] font-body leading-relaxed">
              Explore all 36 handcrafted pieces from Sunmoon Jewelleryj at Souq Al Watiya. Filter by category, inspect specifications, or book a private boutique viewing.
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
                placeholder="Search collection or metal..."
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
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {filterTabs.map((tab) => {
            const isActive = selectedCategoryFilter === tab.key;
            return (
              <button
                key={tab.key}
                id={`filter-tab-${tab.key}`}
                onClick={() => onFilterChange(tab.key)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#145C5A] text-[#FBF8F1] shadow-sm'
                    : 'bg-white text-[#75665D] border border-[#E9DDCB] hover:border-[#C9A45C] hover:text-[#463A34]'
                }`}
              >
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Structured 3-Column Grid Containing Exactly 36 Product Cards */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item, idx) => {
              const isSaved = activeSavedIds.has(item.id);

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.35, delay: (idx % 6) * 0.05 }}
                  className="group relative rounded-2xl bg-white border border-[#E9DDCB] hover:border-[#C9A45C] transition-all duration-300 shadow-xs hover:shadow-xl flex flex-col justify-between overflow-hidden"
                >
                  {/* Image Container */}
                  <div
                    className="relative aspect-square overflow-hidden bg-[#FBF8F1] cursor-pointer"
                    onClick={() => onSelectItem(item)}
                  >
                    <JewelleryImage
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                    />

                    <div className="absolute inset-0 bg-[#463A34]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="px-4 py-2 rounded-full bg-white/95 text-[#145C5A] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <Eye className="w-3.5 h-3.5 text-[#C9A45C]" />
                        <span>Quick View</span>
                      </span>
                    </div>

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#145C5A] text-white text-[10px] font-bold uppercase tracking-wider shadow-xs">
                        #{idx + 1}
                      </span>
                      {item.isNewArrival && (
                        <span className="px-2 py-0.5 rounded-full bg-[#C9A45C] text-[#463A34] text-[10px] font-bold uppercase tracking-wider shadow-xs">
                          New
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-[#75665D] bg-[#FBF8F1] px-2.5 py-0.5 rounded-md border border-[#E9DDCB] capitalize">
                          {item.category.replace('-', ' ')} • {item.metal}
                        </span>
                        <span className="text-xs font-bold text-[#145C5A] px-2 py-0.5 rounded-md bg-[#145C5A]/10 border border-[#145C5A]/20">
                          {item.price || 'KWD 250'}
                        </span>
                      </div>

                      <h3
                        className="font-serif-cormorant text-xl font-bold text-[#463A34] group-hover:text-[#145C5A] transition-colors line-clamp-1 cursor-pointer pt-1"
                        onClick={() => onSelectItem(item)}
                      >
                        {item.name}
                      </h3>

                      <p className="text-xs text-[#75665D] font-body line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Bottom Action Bar: Details -> on Bottom Left | Book Viewing, Save (Heart) & Price on Bottom Right */}
                    <div className="pt-3 border-t border-[#F4EFE6] flex items-center justify-between gap-2">
                      {/* Bottom Left: VIEW DETAILS -> */}
                      <button
                        id={`product-details-btn-${idx + 1}`}
                        onClick={() => onSelectItem(item)}
                        className="text-xs font-bold text-[#145C5A] hover:text-[#C9A45C] transition-colors flex items-center gap-1 group/btn whitespace-nowrap uppercase tracking-wider"
                      >
                        <span>VIEW DETAILS</span>
                        <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform shrink-0" />
                      </button>

                      {/* Bottom Right: Book Viewing, Save (Heart Icon) & Price Tag */}
                      <div className="flex items-center gap-2">
                        {/* Book Viewing Button */}
                        <button
                          id={`product-book-viewing-${idx + 1}`}
                          onClick={() => {
                            if (onBookViewing) {
                              onBookViewing(item.name);
                            }
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#145C5A] hover:bg-[#0D3E3D] text-white text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1 transition-colors shadow-xs shrink-0 whitespace-nowrap"
                          title="Book Viewing at Souq Al Watiya"
                        >
                          <Calendar className="w-3 h-3 text-[#C9A45C] shrink-0" />
                          <span>Book Viewing</span>
                        </button>

                        {/* Save (Heart Icon) Toggle */}
                        <button
                          id={`product-save-heart-${idx + 1}`}
                          onClick={(e) => toggleSaveItem(item.id, e)}
                          className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all shrink-0 ${
                            isSaved
                              ? 'bg-[#D99A8B]/15 border-[#D99A8B] text-[#D99A8B]'
                              : 'bg-white border-[#E9DDCB] text-[#75665D] hover:text-[#D99A8B] hover:border-[#D99A8B]'
                          }`}
                          aria-label={isSaved ? 'Remove from Saved' : 'Save Piece'}
                          title={isSaved ? 'Saved' : 'Save to Favorites'}
                        >
                          <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#E9DDCB] max-w-md mx-auto p-8">
            <Sparkles className="w-8 h-8 text-[#C9A45C] mx-auto mb-3" />
            <h3 className="font-serif-cormorant text-xl font-bold text-[#463A34]">No pieces matched</h3>
            <p className="text-xs text-[#75665D] mt-1 mb-4">
              Try adjusting your search query or view all available categories.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                onFilterChange('all');
              }}
              className="px-5 py-2 rounded-full bg-[#145C5A] text-white text-xs font-semibold uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
