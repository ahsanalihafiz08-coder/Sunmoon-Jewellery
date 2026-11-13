import React from 'react';
import { Sparkles, Phone, MapPin, Mail, ArrowUp, Star } from 'lucide-react';
import { STORE_INFO, COLLECTIONS_DATA } from '../data/jewelleryData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Collections', href: '#categories' },
    { name: 'Catalog', href: '#catalog' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'About', href: '#about' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Location', href: '#location' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-[#145C5A] text-[#FBF8F1] pt-16 pb-8 border-t border-[#C9A45C]/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/15">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-white/10 border border-[#C9A45C] flex items-center justify-center text-[#C9A45C] shadow-xs">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif-cormorant text-2xl font-bold tracking-tight text-white">
                  Intemporel Genève
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#E4CCA1] font-semibold">
                  Genève • Les Acacias
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#FBF8F1]/85 font-body leading-relaxed max-w-sm">
              Timeless Swiss horology, crafted for eternity. Curators of certified master timepieces, vintage icons, and complications in Genève, Suisse.
            </p>

            {/* Verified 5.0 Stars rating badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs">
              <div className="flex items-center text-[#C9A45C]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </div>
              <span className="font-bold text-white">5.0 Stars</span>
              <span className="text-[#E4CCA1] text-[11px]">(Verified Rating)</span>
            </div>

            {/* Social & Contact Actions with Exact Links */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              {/* WhatsApp (+41 79 966 01 56) */}
              <a
                id="footer-whatsapp-link"
                href={STORE_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center transition-transform hover:scale-110 shadow-md"
                title="Chat with Intemporel Genève on WhatsApp (+41 79 966 01 56)"
                aria-label="WhatsApp (+41 79 966 01 56)"
              >
                <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a
                id="footer-instagram-link"
                href="https://www.instagram.com/intemporel_geneve?vrfl=anQ3c2VhM2ZnYmJ0"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center transition-transform hover:scale-110 shadow-md"
                title="Follow @intemporel_geneve on Instagram"
                aria-label="Instagram (@intemporel_geneve)"
              >
                <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a
                id="footer-facebook-link"
                href="https://www.facebook.com/Intemporel.Geneve"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#1877F2] hover:bg-[#166fe5] text-white flex items-center justify-center transition-transform hover:scale-110 shadow-md"
                title="Connect with Intemporel Genève on Facebook"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* Direct Email */}
              <a
                id="footer-email-link"
                href="mailto:contact@intemporel-geneve.ch"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-transform hover:scale-110 shadow-md"
                title="Email contact@intemporel-geneve.ch"
                aria-label="Email contact@intemporel-geneve.ch"
              >
                <Mail className="w-5 h-5 text-[#E4CCA1]" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif-cormorant text-xl font-bold text-[#E4CCA1]">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-[#FBF8F1]/80 hover:text-white transition-colors flex items-center gap-1.5 py-0.5"
                  >
                    <span className="text-[#C9A45C] text-[10px]">›</span>
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Featured Collections */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif-cormorant text-xl font-bold text-[#E4CCA1]">
              Horology
            </h4>
            <ul className="space-y-2 text-xs text-[#FBF8F1]/80">
              {COLLECTIONS_DATA.slice(0, 6).map((col) => (
                <li key={col.id}>
                  <a href="#categories" className="hover:text-white transition-colors">
                    {col.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Geneva Salon Location */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif-cormorant text-xl font-bold text-[#E4CCA1]">
              Geneva Salon
            </h4>
            <div className="space-y-3 text-xs text-[#FBF8F1]/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C9A45C] shrink-0 mt-0.5" />
                <p>Route des Jeunes 4bis, 1227 Les Acacias, Genève, Suisse</p>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C9A45C] shrink-0" />
                <a href="tel:+41799660156" className="font-semibold hover:text-white">
                  +41 79 966 01 56
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C9A45C] shrink-0" />
                <a href="mailto:contact@intemporel-geneve.ch" className="hover:text-white truncate">
                  contact@intemporel-geneve.ch
                </a>
              </div>

              <div className="pt-1 text-[11px] text-[#E4CCA1]/90">
                <p className="font-semibold">Salon Opening Hours:</p>
                <p>Mon – Fri: 10:00 AM – 7:00 PM</p>
                <p>Sat: 10:00 AM – 6:00 PM</p>
                <p>Sun: By Private Appointment</p>
              </div>
            </div>
          </div>
        </div>



        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FBF8F1]/60">
          <p>© {new Date().getFullYear()} Intemporel Genève. All rights reserved. Route des Jeunes 4bis, 1227 Les Acacias, Genève, Suisse.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs text-[#E4CCA1] hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
