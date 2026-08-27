import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, MessageCircle, Navigation, Copy, Clock, ShieldCheck, Check, ExternalLink } from 'lucide-react';
import { STORE_INFO } from '../data/jewelleryData';

interface StoreLocationProps {
  onCopyAddress: () => void;
}

export const StoreLocation: React.FC<StoreLocationProps> = ({ onCopyAddress }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopyAddress();
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section id="location" className="py-16 sm:py-24 bg-[#F4EFE6] border-y border-[#E9DDCB] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#C9A45C]/40 text-xs font-semibold uppercase tracking-widest text-[#145C5A]">
            <MapPin className="w-3.5 h-3.5 text-[#C9A45C]" />
            <span>Kuwait City Flagship Boutique</span>
          </div>

          <h2 className="font-serif-cormorant text-3xl sm:text-4xl md:text-5xl font-bold text-[#463A34] tracking-tight">
            Visit Sunmoon Jewelleryj
          </h2>

          <p className="text-sm sm:text-base text-[#75665D] font-body max-w-2xl mx-auto leading-relaxed">
            We welcome you to our boutique showroom in Souq Al Watiya to explore our fine gold and jewellery collections in person.
          </p>
        </div>

        {/* Location Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Address, Phone, Hours, and Actions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Primary Address Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#C9A45C]/40 shadow-lg space-y-5">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#C9A45C]">
                    Exact Boutique Location
                  </span>
                  <h3 className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-[#463A34]">
                    Souq Al Watiya
                  </h3>
                </div>

                <div className="w-10 h-10 rounded-full bg-[#145C5A] text-[#C9A45C] flex items-center justify-center shadow-xs">
                  <MapPin className="w-5 h-5" />
                </div>
              </div>

              {/* Exact Address Box with Quick Copy */}
              <div className="p-4 rounded-2xl bg-[#FBF8F1] border border-[#E9DDCB] space-y-2">
                <p className="text-xs text-[#75665D] font-medium uppercase tracking-wider">Address</p>
                <p className="text-sm sm:text-base font-semibold text-[#463A34] leading-relaxed">
                  Ground Floor, 116, Souq Al Watiya, Maliya, Kuwait City, Kuwait.
                </p>

                <button
                  id="copy-address-btn"
                  onClick={handleCopy}
                  className="pt-1.5 text-xs font-semibold text-[#145C5A] hover:text-[#C9A45C] flex items-center gap-1.5 transition-colors focus:outline-none"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-600" />
                      <span className="text-green-700">Address Copied to Clipboard</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#C9A45C]" />
                      <span>Copy Address for Navigation</span>
                    </>
                  )}
                </button>
              </div>

              {/* Contact Phone & WhatsApp */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#FBF8F1] border border-[#E9DDCB] gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <Phone className="w-4 h-4 text-[#C9A45C] shrink-0" />
                    <div className="truncate">
                      <p className="text-[10px] uppercase tracking-wider text-[#75665D]">Direct Phone Line</p>
                      <p className="text-sm font-bold text-[#463A34] truncate">{STORE_INFO.phone}</p>
                    </div>
                  </div>
                  <a
                    id="call-us-store-btn"
                    href={`tel:${STORE_INFO.phone}`}
                    className="w-32 h-9 px-3 rounded-lg bg-[#145C5A] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#0D3E3D] transition-colors whitespace-nowrap shrink-0 flex items-center justify-center text-center shadow-xs"
                  >
                    <span>CALL STORE</span>
                  </a>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#145C5A]/10 border border-[#145C5A]/20 gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <MessageCircle className="w-4 h-4 text-[#145C5A] shrink-0" />
                    <div className="truncate">
                      <p className="text-[10px] uppercase tracking-wider text-[#145C5A] font-semibold">WhatsApp Concierge</p>
                      <p className="text-xs text-[#75665D] truncate">{STORE_INFO.phone}</p>
                    </div>
                  </div>
                  <a
                    id="whatsapp-store-btn"
                    href={STORE_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-32 h-9 px-3 rounded-lg bg-[#145C5A] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#0D3E3D] transition-colors whitespace-nowrap shrink-0 flex items-center justify-center text-center shadow-xs"
                  >
                    <span>CHAT WITH US</span>
                  </a>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <a
                  id="get-directions-btn"
                  href="https://maps.app.goo.gl/4gp54kWBNrQGoyDd7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-11 sm:h-12 px-4 rounded-xl bg-[#145C5A] hover:bg-[#0D3E3D] text-[#FBF8F1] text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-xs transition-colors whitespace-nowrap"
                >
                  <Navigation className="w-4 h-4 text-[#C9A45C] shrink-0" />
                  <span>GET DIRECTIONS</span>
                </a>

                <a
                  id="call-store-primary"
                  href={`tel:${STORE_INFO.phone}`}
                  className="h-11 sm:h-12 px-4 rounded-xl bg-white hover:bg-[#E9DDCB]/30 border border-[#C9A45C] text-[#463A34] text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
                >
                  <Phone className="w-4 h-4 text-[#C9A45C] shrink-0" />
                  <span>CALL STORE</span>
                </a>
              </div>
            </div>

            {/* Boutique Hours Card */}
            <div className="p-5 rounded-2xl bg-white border border-[#E9DDCB] space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#145C5A]">
                <Clock className="w-4 h-4 text-[#C9A45C]" />
                <span>Boutique Opening Hours</span>
              </div>
              <div className="space-y-2 text-xs text-[#75665D]">
                {STORE_INFO.openingHours.map((h, i) => (
                  <div key={i} className="flex justify-between py-1 border-b border-[#F4EFE6] last:border-0">
                    <span className="font-semibold text-[#463A34]">{h.days}</span>
                    <span>{h.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Stylized Compact Visual Map & Open in Google Maps Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-5"
          >
            {/* Styled Map Container with Compact Cropped Height */}
            <div className="relative rounded-3xl overflow-hidden bg-white border border-[#C9A45C]/50 shadow-xl flex flex-col">
              {/* Compact Google Maps Iframe */}
              <div className="relative w-full h-64 sm:h-72 bg-[#E9DDCB]/30 overflow-hidden">
                <iframe
                  title="Sunmoon Jewelleryj Location in Souq Al Watiya Kuwait City"
                  src="https://maps.google.com/maps?q=Souq+Al+Watiya+Maliya+Kuwait+City&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 filter contrast-105"
                  loading="lazy"
                />

                {/* Floating Map Pin Badge */}
                <div className="absolute top-4 left-4 p-3 bg-white/95 backdrop-blur-md rounded-2xl border border-[#C9A45C]/40 shadow-lg max-w-[240px]">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#145C5A] animate-ping" />
                    <p className="font-serif-cormorant text-sm font-bold text-[#463A34]">
                      Sunmoon Jewelleryj
                    </p>
                  </div>
                  <p className="text-[11px] text-[#75665D] mt-0.5">
                    Ground Floor, 116, Souq Al Watiya, Maliya
                  </p>
                </div>
              </div>

              {/* Map Footer Bar with Dedicated "Open in Google Maps" Button */}
              <div className="p-4 sm:p-5 bg-white border-t border-[#E9DDCB] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-[#75665D]">
                  <ShieldCheck className="w-4 h-4 text-[#C9A45C] shrink-0" />
                  <span>Ground Floor Shop 116 with convenient visitor parking</span>
                </div>

                <a
                  id="open-google-maps-btn"
                  href="https://maps.app.goo.gl/4gp54kWBNrQGoyDd7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#145C5A] hover:bg-[#0D3E3D] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#C9A45C]" />
                </a>
              </div>
            </div>

            {/* Boutique Location Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-[#E9DDCB] space-y-1">
                <h4 className="font-serif-cormorant text-lg font-bold text-[#463A34]">Ground Floor Location</h4>
                <p className="text-xs text-[#75665D] leading-relaxed">
                  Located at Shop 116 on the ground floor of Souq Al Watiya, Maliya, Kuwait City.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#E9DDCB] space-y-1">
                <h4 className="font-serif-cormorant text-lg font-bold text-[#463A34]">Private Boutique Viewings</h4>
                <p className="text-xs text-[#75665D] leading-relaxed">
                  Walk-in visitors welcomed anytime or reserve a consultation with our jewellery stylists.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
