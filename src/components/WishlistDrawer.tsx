import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Trash2, ShoppingBag, MessageCircle, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { CATALOG_PRODUCTS, STORE_INFO } from '../data/jewelleryData';
import { JewelleryItem } from '../types';
import { JewelleryImage } from './JewelleryImage';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedItemIds: Set<string>;
  onRemoveItem: (id: string, e: React.MouseEvent) => void;
  onClearWishlist: () => void;
  onOpenAppointment: (itemNames?: string) => void;
  onSelectItem: (item: JewelleryItem) => void;
  onExploreCatalog: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  savedItemIds,
  onRemoveItem,
  onClearWishlist,
  onOpenAppointment,
  onSelectItem,
  onExploreCatalog,
}) => {
  // Find all saved items from catalogue
  const savedItems = CATALOG_PRODUCTS.filter((item) => savedItemIds.has(item.id));

  // Compute total estimated price in KWD
  const totalPriceKWD = savedItems.reduce((acc, item) => {
    if (!item.price) return acc;
    const match = item.price.match(/\d+/);
    return match ? acc + parseInt(match[0], 10) : acc;
  }, 0);

  // Generate consolidated bulk WhatsApp message
  const handleBulkWhatsAppInquiry = () => {
    if (savedItems.length === 0) return;

    let text = `Hello Sunmoon Jewelleryj,\n\nI would like to submit a bulk inquiry for the following ${savedItems.length} saved pieces from your catalogue:\n\n`;
    
    savedItems.forEach((item, index) => {
      text += `${index + 1}. ${item.name} (${item.metal}) - ${item.price || 'KWD On Request'}\n`;
    });

    if (totalPriceKWD > 0) {
      text += `\nEstimated Total: KWD ${totalPriceKWD}\n`;
    }

    text += `\nPlease confirm piece availability and appointment options at your Souq Al Watiya boutique in Maliya, Kuwait City.`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/96597482257?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  const handleBookAllAppointment = () => {
    if (savedItems.length === 0) return;
    const names = savedItems.map((i) => i.name).join(', ');
    onClose();
    onOpenAppointment(`Wishlist Collection (${savedItems.length} items): ${names}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity"
            aria-hidden="true"
          />

          {/* Slide-out Drawer from Right */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-[#FBF8F1] border-l border-[#C9A45C]/40 shadow-2xl flex flex-col justify-between overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Your Saved Pieces and Bulk Inquiry"
          >
            {/* Header */}
            <div className="p-5 sm:p-6 bg-white border-b border-[#E9DDCB] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#145C5A]/10 border border-[#145C5A]/20 flex items-center justify-center text-[#145C5A]">
                  <Heart className="w-4 h-4 fill-[#145C5A]" />
                </div>
                <div>
                  <h2 className="font-serif-cormorant text-2xl font-bold text-[#463A34] leading-tight">
                    Saved Wishlist
                  </h2>
                  <p className="text-xs text-[#75665D]">
                    {savedItems.length} {savedItems.length === 1 ? 'piece' : 'pieces'} selected
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {savedItems.length > 0 && (
                  <button
                    onClick={onClearWishlist}
                    className="text-xs text-[#75665D] hover:text-[#D99A8B] transition-colors px-2 py-1"
                    title="Clear All Saved Items"
                  >
                    Clear
                  </button>
                )}
                <button
                  id="close-wishlist-drawer-btn"
                  onClick={onClose}
                  className="w-9 h-9 rounded-full bg-[#F4EFE6] border border-[#E9DDCB] text-[#463A34] hover:bg-[#145C5A] hover:text-white flex items-center justify-center transition-colors"
                  aria-label="Close Wishlist"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
              {savedItems.length > 0 ? (
                savedItems.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="p-3.5 rounded-2xl bg-white border border-[#E9DDCB] hover:border-[#C9A45C] shadow-xs flex items-center gap-3.5 group transition-all"
                  >
                    {/* Thumbnail */}
                    <div
                      className="w-16 h-16 rounded-xl overflow-hidden bg-[#F4EFE6] shrink-0 cursor-pointer"
                      onClick={() => {
                        onClose();
                        onSelectItem(item);
                      }}
                    >
                      <JewelleryImage
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3
                          className="font-serif-cormorant text-base font-bold text-[#463A34] truncate cursor-pointer group-hover:text-[#145C5A] transition-colors"
                          onClick={() => {
                            onClose();
                            onSelectItem(item);
                          }}
                        >
                          {item.name}
                        </h3>
                        <button
                          onClick={(e) => onRemoveItem(item.id, e)}
                          className="text-[#75665D] hover:text-[#D99A8B] transition-colors p-1"
                          aria-label={`Remove ${item.name}`}
                          title="Remove from saved"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-[11px] text-[#75665D] capitalize truncate">
                        {item.category.replace('-', ' ')} • {item.metal}
                      </p>

                      <div className="mt-1 flex items-center justify-between">
                        <span className="text-xs font-bold text-[#145C5A] px-2 py-0.5 rounded-md bg-[#145C5A]/10 border border-[#145C5A]/20">
                          {item.price || 'KWD 250'}
                        </span>
                        <button
                          onClick={() => {
                            onClose();
                            onSelectItem(item);
                          }}
                          className="text-[10px] font-semibold text-[#C9A45C] hover:underline uppercase tracking-wider"
                        >
                          Quick View
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-white border border-[#E9DDCB] flex items-center justify-center text-[#C9A45C] shadow-xs">
                    <Heart className="w-7 h-7 text-[#C9A45C]" />
                  </div>
                  <div className="space-y-1.5 max-w-xs">
                    <h3 className="font-serif-cormorant text-2xl font-bold text-[#463A34]">
                      Your Wishlist is Empty
                    </h3>
                    <p className="text-xs text-[#75665D] leading-relaxed">
                      Tap the heart icon on any piece in our catalogue to save and submit a unified bulk inquiry.
                    </p>
                  </div>
                  <button
                    id="wishlist-explore-catalog-btn"
                    onClick={() => {
                      onClose();
                      onExploreCatalog();
                    }}
                    className="py-3 px-6 rounded-full bg-[#145C5A] hover:bg-[#0D3E3D] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
                  >
                    <span>EXPLORE CATALOGUE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Footer Summary & Bulk Inquiry Actions */}
            {savedItems.length > 0 && (
              <div className="p-5 sm:p-6 bg-white border-t border-[#E9DDCB] space-y-3.5">
                {/* Total Counter Box */}
                <div className="p-3.5 rounded-xl bg-[#FBF8F1] border border-[#C9A45C]/40 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider font-semibold text-[#75665D]">
                      Total Estimated Value
                    </p>
                    <p className="text-xs text-[#145C5A] font-medium">
                      {savedItems.length} Handcrafted Pieces
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-serif-cormorant text-2xl font-bold text-[#463A34]">
                      KWD {totalPriceKWD.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Bulk WhatsApp Order / Inquiry Button */}
                <button
                  id="bulk-inquiry-whatsapp-btn"
                  onClick={handleBulkWhatsAppInquiry}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#145C5A] hover:bg-[#0D3E3D] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#C9A45C] shrink-0" />
                  <span>SUBMIT BULK INQUIRY VIA WHATSAPP</span>
                </button>

                {/* Book Viewing for All */}
                <button
                  id="bulk-book-viewing-btn"
                  onClick={handleBookAllAppointment}
                  className="w-full py-3 px-4 rounded-xl bg-white hover:bg-[#F4EFE6] border border-[#C9A45C] text-[#463A34] text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-[#C9A45C] shrink-0" />
                  <span>BOOK VIEWING FOR ALL SAVED PIECES</span>
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
