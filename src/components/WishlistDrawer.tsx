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

  // Compute total estimated price in USD
  const totalPriceUSD = savedItems.reduce((acc, item) => {
    if (!item.price) return acc;
    const clean = item.price.replace(/[^0-9]/g, '');
    return clean ? acc + parseInt(clean, 10) : acc;
  }, 0);

  // Generate consolidated bulk WhatsApp message
  const handleBulkWhatsAppInquiry = () => {
    if (savedItems.length === 0) return;

    let text = `Hello Intemporel Genève,\n\nI would like to submit a bulk inquiry for the following ${savedItems.length} saved timepieces from your catalogue:\n\n`;
    
    savedItems.forEach((item, index) => {
      text += `${index + 1}. ${item.name} (${item.metal}) - ${item.price || 'USD On Request'}\n`;
    });

    if (totalPriceUSD > 0) {
      text += `\nEstimated Total: $${totalPriceUSD.toLocaleString()}\n`;
    }

    text += `\nPlease confirm reference availability and appointment options at your Geneva salon on Route des Jeunes 4bis, Les Acacias, Genève.`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/41799660156?text=${encoded}`, '_blank', 'noopener,noreferrer');
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
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#463A34]/50 backdrop-blur-sm transition-opacity"
          />

          {/* Slide-over Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="w-screen max-w-md bg-[#FBF8F1] shadow-2xl flex flex-col border-l border-[#C9A45C]/40"
            >
              {/* Header */}
              <div className="p-5 sm:p-6 bg-white border-b border-[#E9DDCB] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#145C5A]/10 text-[#145C5A] flex items-center justify-center">
                    <Heart className="w-5 h-5 text-[#C9A45C] fill-[#C9A45C]" />
                  </div>
                  <div>
                    <h3 className="font-serif-cormorant text-xl font-bold text-[#463A34]">
                      Saved Wishlist
                    </h3>
                    <span className="text-[11px] text-[#75665D]">
                      {savedItems.length} {savedItems.length === 1 ? 'timepiece' : 'timepieces'} selected
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {savedItems.length > 0 && (
                    <button
                      id="clear-wishlist-btn"
                      onClick={onClearWishlist}
                      className="p-2 text-xs text-[#75665D] hover:text-[#D99A8B] transition-colors"
                      title="Clear Wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    id="close-wishlist-btn"
                    onClick={onClose}
                    className="w-9 h-9 rounded-full bg-[#FBF8F1] border border-[#E9DDCB] flex items-center justify-center text-[#463A34] hover:bg-[#145C5A] hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5 divide-y divide-[#E9DDCB]/50">
                {savedItems.length > 0 ? (
                  savedItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="pt-3.5 first:pt-0 flex items-center gap-3.5 group"
                    >
                      {/* Image Thumbnail */}
                      <div
                        className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-white border border-[#E9DDCB] shrink-0 cursor-pointer"
                        onClick={() => {
                          onClose();
                          onSelectItem(item);
                        }}
                      >
                        <JewelleryImage
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <h4
                            onClick={() => {
                              onClose();
                              onSelectItem(item);
                            }}
                            className="font-serif-cormorant text-base font-bold text-[#463A34] hover:text-[#145C5A] truncate cursor-pointer"
                          >
                            {item.name}
                          </h4>
                          <button
                            onClick={(e) => onRemoveItem(item.id, e)}
                            className="text-[#75665D] hover:text-[#D99A8B] p-1 transition-colors shrink-0"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <p className="text-[11px] text-[#75665D] truncate">{item.metal}</p>

                        <div className="mt-1 flex items-center justify-between">
                          <span className="text-xs font-bold text-[#145C5A]">
                            {item.price || '$9,500'}
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
                        Tap the heart icon on any timepiece in our catalogue to save and submit a unified bulk inquiry.
                      </p>
                    </div>
                    <button
                      id="wishlist-explore-catalog-btn"
                      onClick={() => {
                        onClose();
                        onExploreCatalog();
                      }}
                      className="py-3 px-6 rounded-full bg-[#145C5A] hover:bg-[#0D3E3D] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer"
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
                        {savedItems.length} Curated Timepieces
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-serif-cormorant text-2xl font-bold text-[#463A34]">
                        ${totalPriceUSD.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Bulk WhatsApp Order / Inquiry Button */}
                  <button
                    id="bulk-inquiry-whatsapp-btn"
                    onClick={handleBulkWhatsAppInquiry}
                    className="w-full py-3.5 px-4 rounded-xl bg-[#145C5A] hover:bg-[#0D3E3D] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-[#C9A45C] shrink-0" />
                    <span>SUBMIT BULK INQUIRY VIA WHATSAPP</span>
                  </button>

                  {/* Book Viewing for All */}
                  <button
                    id="bulk-book-viewing-btn"
                    onClick={handleBookAllAppointment}
                    className="w-full py-3 px-4 rounded-xl bg-white hover:bg-[#F4EFE6] border border-[#C9A45C] text-[#463A34] text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4 text-[#C9A45C] shrink-0" />
                    <span>BOOK SALON VIEWING FOR ALL</span>
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
