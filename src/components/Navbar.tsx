import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MessageCircle, Menu, X, Calendar, Heart } from 'lucide-react';
import { STORE_INFO } from '../data/jewelleryData';

interface NavbarProps {
  onOpenAppointment: () => void;
  savedItemsCount?: number;
  onOpenWishlist?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAppointment,
  savedItemsCount = 0,
  onOpenWishlist,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      // Toggle glassmorphism when scrolling past initial hero threshold (80px)
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Track active section for indicator
      const sections = ['home', 'categories', 'catalog', 'gallery', 'reviews', 'location', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Categories', href: '#categories' },
    { name: 'Catalog', href: '#catalog' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Location', href: '#location' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    setTimeout(() => {
      const element = document.getElementById(targetId) || document.querySelector(href);
      if (element) {
        const headerOffset = 64;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth',
        });
      }
    }, 80);
  };

  return (
    <>
      <header
        id="main-header"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FBF8F1]/95 backdrop-blur-md border-b border-[#C9A45C]/30 shadow-sm py-2.5 sm:py-3'
            : 'bg-transparent py-3 sm:py-4 border-b border-transparent shadow-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo / Brand Name - Further in top-left corner, slightly reduced size, clean text only */}
            <a
              id="brand-logo-link"
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#home');
              }}
              className="group flex flex-col text-left focus:outline-none shrink-0"
            >
              <span
                className={`font-serif-cormorant text-xl sm:text-2xl font-bold tracking-tight text-left transition-colors leading-none ${
                  isScrolled ? 'text-[#463A34] group-hover:text-[#145C5A]' : 'text-white drop-shadow-sm'
                }`}
              >
                Sunmoon Jewelleryj
              </span>
              <span
                className={`text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-semibold text-left mt-0.5 transition-colors ${
                  isScrolled ? 'text-[#C9A45C]' : 'text-[#E5C158] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]'
                }`}
              >
                Kuwait City • Souq Al Watiya
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-6" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.name}
                    id={`nav-link-${link.name.toLowerCase()}`}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className={`text-xs font-semibold tracking-wider uppercase transition-all relative py-1 ${
                      isScrolled
                        ? isActive
                          ? 'text-[#145C5A]'
                          : 'text-[#75665D] hover:text-[#145C5A]'
                        : isActive
                        ? 'text-white font-bold drop-shadow-sm'
                        : 'text-[#FBF8F1]/90 hover:text-white drop-shadow-xs'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C9A45C] rounded-full transition-all duration-200" />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Desktop Action Buttons & Wishlist - Shifted slightly right with uniform spacing */}
            <div className="hidden lg:flex items-center gap-3 ml-2">
              {/* Wishlist Header Icon with Dynamic Badge Counter */}
              <button
                id="header-wishlist-btn"
                onClick={onOpenWishlist}
                className={`relative p-2 rounded-full border transition-all flex items-center justify-center ${
                  isScrolled
                    ? 'border-[#C9A45C]/50 text-[#145C5A] hover:bg-[#E9DDCB]/40'
                    : 'border-white/40 text-white bg-white/10 hover:bg-white/20 backdrop-blur-xs'
                }`}
                title="Saved Wishlist & Bulk Inquiry"
                aria-label={`Saved Wishlist with ${savedItemsCount} items`}
              >
                <Heart className={`w-4 h-4 ${savedItemsCount > 0 ? 'fill-[#C9A45C] text-[#C9A45C]' : ''}`} />
                {savedItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#145C5A] text-white text-[9px] font-bold flex items-center justify-center border border-white shadow-xs">
                    {savedItemsCount}
                  </span>
                )}
              </button>

              <a
                id="header-explore-btn"
                href="#catalog"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#catalog');
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all border ${
                  isScrolled
                    ? 'border-[#C9A45C] text-[#463A34] hover:bg-[#E9DDCB]/50 hover:text-[#145C5A]'
                    : 'border-white/40 text-white bg-white/10 hover:bg-white/20 backdrop-blur-xs'
                }`}
              >
                Explore Collection
              </a>

              <a
                id="header-contact-btn"
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#contact');
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider shadow-xs hover:shadow-md transition-all flex items-center gap-1.5 ${
                  isScrolled
                    ? 'bg-[#145C5A] hover:bg-[#0D3E3D] text-[#FBF8F1]'
                    : 'bg-[#C9A45C] hover:bg-[#B8924B] text-[#463A34] font-bold'
                }`}
              >
                <span>Contact Us</span>
              </a>

              {/* Direct Phone Call Button */}
              <a
                id="header-phone-btn"
                href={`tel:${STORE_INFO.phone}`}
                className={`p-2 rounded-full border transition-colors flex items-center justify-center ${
                  isScrolled
                    ? 'border-[#C9A45C]/50 text-[#145C5A] hover:bg-[#E9DDCB]/40'
                    : 'border-white/40 text-white bg-white/10 hover:bg-white/20 backdrop-blur-xs'
                }`}
                title={`Call ${STORE_INFO.phone}`}
                aria-label="Call Store"
              >
                <Phone className={`w-4 h-4 ${isScrolled ? 'text-[#145C5A]' : 'text-white'}`} />
              </a>

              <button
                id="header-book-btn"
                onClick={onOpenAppointment}
                className={`p-2 rounded-full border transition-colors ${
                  isScrolled
                    ? 'border-[#C9A45C]/50 text-[#145C5A] hover:bg-[#E9DDCB]/40'
                    : 'border-white/40 text-white bg-white/10 hover:bg-white/20 backdrop-blur-xs'
                }`}
                title="Book Boutique Viewing"
                aria-label="Book Boutique Appointment"
              >
                <Calendar className={`w-4 h-4 ${isScrolled ? 'text-[#C9A45C]' : 'text-[#E4CCA1]'}`} />
              </button>
            </div>

            {/* Mobile Header Icons: Wishlist (Heart), Call (Phone), Menu Toggle - High contrast floating glassmorphic buttons */}
            <div className="flex items-center gap-2.5 sm:gap-3 ml-auto translate-x-1 sm:translate-x-0 lg:hidden">
              {/* Mobile Wishlist Counter Icon (Heart) */}
              <button
                id="mobile-header-wishlist-btn"
                onClick={onOpenWishlist}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center relative transition-all shrink-0 shadow-lg ${
                  isScrolled
                    ? 'bg-[#145C5A] text-white border border-[#C9A45C] hover:bg-[#0D3E3D]'
                    : 'bg-[#145C5A]/95 text-white border border-[#C9A45C] backdrop-blur-md hover:bg-[#145C5A]'
                }`}
                aria-label={`Wishlist with ${savedItemsCount} items`}
              >
                <Heart className={`w-4 h-4 ${savedItemsCount > 0 ? 'fill-[#C9A45C] text-[#C9A45C]' : 'text-white'}`} />
                {savedItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C9A45C] text-[#463A34] text-[9px] font-bold flex items-center justify-center border border-white shadow-xs">
                    {savedItemsCount}
                  </span>
                )}
              </button>

              {/* Mobile Direct Phone Button */}
              <a
                id="mobile-quick-call"
                href={`tel:${STORE_INFO.phone}`}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all shrink-0 shadow-lg ${
                  isScrolled
                    ? 'bg-[#145C5A] text-white border border-[#C9A45C] hover:bg-[#0D3E3D]'
                    : 'bg-[#145C5A]/95 text-white border border-[#C9A45C] backdrop-blur-md hover:bg-[#145C5A]'
                }`}
                aria-label="Call Store"
              >
                <Phone className="w-4 h-4 text-white" />
              </a>

              {/* Mobile Menu Hamburger Toggle */}
              <button
                id="mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full focus:outline-none flex items-center justify-center transition-all shrink-0 shadow-lg ${
                  isScrolled
                    ? 'text-white bg-[#145C5A] border border-[#C9A45C] hover:bg-[#0D3E3D]'
                    : 'text-white bg-[#145C5A]/95 border border-[#C9A45C] backdrop-blur-md hover:bg-[#145C5A]'
                }`}
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-white" /> : <Menu className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-white" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed top-[54px] sm:top-[61px] left-0 right-0 z-30 bg-[#FBF8F1]/98 backdrop-blur-lg border-b border-[#C9A45C]/30 shadow-xl lg:hidden overflow-y-auto max-h-[calc(100vh-60px)]"
          >
            <div className="px-6 py-6 space-y-4">
              <nav className="flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    id={`mobile-nav-${link.name.toLowerCase()}`}
                    type="button"
                    onClick={() => handleNavClick(link.href)}
                    className="w-full text-base font-medium text-[#463A34] hover:text-[#145C5A] active:text-[#145C5A] py-3 border-b border-[#E9DDCB]/60 flex items-center justify-between text-left cursor-pointer transition-colors"
                  >
                    <span>{link.name}</span>
                    <span className="text-xs text-[#C9A45C] font-bold">→</span>
                  </button>
                ))}
              </nav>

              <div className="pt-2 flex flex-col gap-2.5">
                {/* Wishlist in Drawer */}
                {onOpenWishlist && (
                  <button
                    id="mobile-drawer-wishlist-btn"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenWishlist();
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-white border border-[#C9A45C] text-[#463A34] text-center text-sm font-semibold flex items-center justify-center gap-2"
                  >
                    <Heart className="w-4 h-4 text-[#C9A45C] fill-[#C9A45C]/30" />
                    <span>View Saved Wishlist ({savedItemsCount})</span>
                  </button>
                )}

                <a
                  id="mobile-whatsapp-cta"
                  href={STORE_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-[#145C5A] text-[#FBF8F1] text-center text-sm font-semibold flex items-center justify-center gap-2 shadow-xs"
                >
                  <MessageCircle className="w-4 h-4 text-[#C9A45C]" />
                  <span>WhatsApp Concierge</span>
                </a>

                <button
                  id="mobile-book-visit-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAppointment();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl border border-[#C9A45C] text-[#463A34] bg-white text-center text-sm font-semibold flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-[#C9A45C]" />
                  <span>Book Private Boutique Visit</span>
                </button>
              </div>

              <div className="pt-2 text-center text-xs text-[#75665D]">
                <p>Ground floor, 116, Souq Al Watiya, Maliya, Kuwait City</p>
                <p className="mt-1 font-semibold text-[#145C5A]">{STORE_INFO.phone}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

