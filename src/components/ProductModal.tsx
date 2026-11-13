import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, MessageCircle, Calendar, ShieldCheck, Heart } from 'lucide-react';
import { JewelleryItem } from '../types';

interface ProductModalProps {
  item: JewelleryItem | null;
  onClose: () => void;
  onBookAppointment: (itemName?: string) => void;
  isSaved?: boolean;
  onToggleSave?: (id: string, e: React.MouseEvent) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  item,
  onClose,
  onBookAppointment,
  isSaved = false,
  onToggleSave,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [item?.id]);

  if (!item) return null;

  const images = item.galleryImages && item.galleryImages.length > 0 ? item.galleryImages : [item.image];
  const activeImage = images[activeImageIndex] ?? images[0];

  const whatsappInquiryUrl = `https://wa.me/41799660156?text=${encodeURIComponent(
    `Hello Intemporel Genève, I would like to inquire about the "${item.name}" (${item.collection} - ${item.metal} - ${item.price || 'USD On Request'}).`
  )}`;

  const modalContent = (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#463A34]/50 backdrop-blur-sm transition-opacity"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-4xl bg-[#FBF8F1] rounded-3xl border border-[#C9A45C]/50 shadow-2xl z-10 my-8 text-[#463A34]"
        >
          {/* Close Button */}
          <button
            id="close-product-modal-btn"
            onClick={onClose}
            className="absolute -top-3.5 -right-3.5 z-30 w-10 h-10 rounded-full bg-[#145C5A] text-white border-2 border-[#FBF8F1] flex items-center justify-center hover:bg-[#0D3E3D] transition-colors shadow-lg focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto rounded-3xl">
            {/* Left Column: Image Preview & Gallery */}
            <div className="md:col-span-6 p-6 sm:p-8 bg-white flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E9DDCB]">
              <div className="space-y-4">
                {/* Main Large Image */}
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#F4EFE6] border border-[#E9DDCB]">
                  <img
                    src={activeImage}
                    alt={item.name}
                    className="w-full h-full object-cover object-center"
                    loading="eager"
                    fetchPriority="high"
                    decoding="sync"
                  />
                  {item.isNewArrival && (
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#145C5A] text-white text-[10px] font-bold uppercase tracking-wider shadow-xs">
                      New Arrival
                    </span>
                  )}
                  {onToggleSave && (
                    <button
                      onClick={(e) => onToggleSave(item.id, e)}
                      className={`absolute top-3 right-3 p-2 rounded-full border transition-all ${
                        isSaved
                          ? 'bg-[#D99A8B] text-white border-[#D99A8B]'
                          : 'bg-white/90 text-[#75665D] border-[#E9DDCB] hover:text-[#D99A8B]'
                      }`}
                      aria-label="Save piece"
                    >
                      <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                  )}
                </div>

                {/* Thumbnails */}
                {images.length > 1 && (
                  <div className="flex gap-3">
                    {images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImageIndex(i)}
                        className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                          activeImageIndex === i
                            ? 'border-[#C9A45C] scale-105 shadow-xs'
                            : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${item.name} thumb ${i}`}
                          className="w-full h-full object-cover"
                          loading="eager"
                          fetchPriority="high"
                          decoding="sync"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Boutique Guarantee Note */}
              <div className="mt-6 p-4 rounded-xl bg-[#FBF8F1] border border-[#E9DDCB] flex items-start gap-3 text-xs text-[#75665D]">
                <ShieldCheck className="w-5 h-5 text-[#C9A45C] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#463A34]">Boutique Authenticity Assured</p>
                  <p>Available for private inspection at Route des Jeunes 4bis, Les Acacias, Genève.</p>
                </div>
              </div>
            </div>

            {/* Right Column: Piece Details & Concierge Actions */}
            <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#C9A45C] uppercase tracking-widest">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{item.collection}</span>
                    </div>
                    {item.price && (
                      <span className="text-sm font-bold text-[#145C5A] px-3 py-1 rounded-md bg-[#145C5A]/10 border border-[#145C5A]/20">
                        {item.price}
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif-cormorant text-3xl sm:text-4xl font-bold text-[#463A34] mt-1">
                    {item.name}
                  </h3>
                </div>

                <p className="text-sm text-[#75665D] font-body leading-relaxed">
                  {item.detailedStory || item.description}
                </p>

                {/* Technical Specifications */}
                <div className="p-4 rounded-2xl bg-white border border-[#E9DDCB] space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#145C5A]">Piece Specifications</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[#75665D]">Material / Metal:</span>
                      <p className="font-semibold text-[#463A34]">{item.metal}</p>
                    </div>
                    {item.gemstoneOrPearl && (
                      <div>
                        <span className="text-[#75665D]">Accents:</span>
                        <p className="font-semibold text-[#463A34]">{item.gemstoneOrPearl}</p>
                      </div>
                    )}
                    {item.dimensions && (
                      <div className="col-span-2 pt-1 border-t border-[#F4EFE6]">
                        <span className="text-[#75665D]">Dimensions & Sizing:</span>
                        <p className="font-semibold text-[#463A34]">{item.dimensions}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full bg-[#E9DDCB]/40 text-[#75665D] text-[11px] font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Concierge & In-Store Actions */}
              <div className="space-y-3 pt-4 border-t border-[#E9DDCB]">
                <a
                  id="modal-whatsapp-btn"
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-[#145C5A] hover:bg-[#0D3E3D] text-[#FBF8F1] text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-[#C9A45C] shrink-0" />
                  <span>INQUIRE ON WHATSAPP</span>
                </a>

                <button
                  id="modal-book-viewing-btn"
                  onClick={() => {
                    onClose();
                    onBookAppointment(item.name);
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-white hover:bg-[#E9DDCB]/30 border border-[#C9A45C] text-[#463A34] text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 transition-all leading-normal"
                >
                  <Calendar className="w-4 h-4 text-[#C9A45C] shrink-0" />
                  <span>BOOK PRIVATE BOUTIQUE VIEWING</span>
                </button>

                <p className="text-[11px] text-center text-[#75665D]">
                  Visit our salon at Route des Jeunes 4bis, 1227 Les Acacias, Genève, Suisse
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : modalContent;
};

