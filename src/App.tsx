import React, { useState, useCallback, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustStats } from './components/TrustStats';
import { CollectionsSection } from './components/CollectionsSection';
import { FeaturedJewellery } from './components/FeaturedJewellery';
import { DualRowMarquee } from './components/DualRowMarquee';
import { LuxuryExperience } from './components/LuxuryExperience';
import { WhyChooseUs } from './components/WhyChooseUs';
import { JewelleryProcess } from './components/JewelleryProcess';
import { StoreLocation } from './components/StoreLocation';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { FloatingFABs } from './components/FloatingFABs';
import { AIChatbotModal } from './components/AIChatbotModal';
import { ProductModal } from './components/ProductModal';
import { AppointmentModal } from './components/AppointmentModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { Toast } from './components/Toast';
import { STORE_INFO } from './data/jewelleryData';
import { JewelleryItem } from './types';

export default function App() {
  // State for modals and interaction
  const [selectedProduct, setSelectedProduct] = useState<JewelleryItem | null>(null);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [appointmentItemName, setAppointmentItemName] = useState<string | undefined>(undefined);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');

  // Wishlist state persisted in localStorage
  const [savedItemIds, setSavedItemIds] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem('sunmoon_saved_items');
      return stored ? new Set(JSON.parse(stored)) : new Set<string>();
    } catch {
      return new Set<string>();
    }
  });

  const handleToggleSaveItem = useCallback((id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSavedItemIds((prev) => {
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
  }, []);

  const handleClearWishlist = useCallback(() => {
    setSavedItemIds(new Set());
    try {
      localStorage.removeItem('sunmoon_saved_items');
    } catch {}
  }, []);
  
  // Toast notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'info' | 'error'>('success');

  const showToast = useCallback((message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  }, []);

  const handleCopyAddress = useCallback(() => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(STORE_INFO.address);
      showToast('Address copied: Ground Floor, 116, Souq Al Watiya, Maliya, Kuwait City', 'info');
    } else {
      showToast(STORE_INFO.address, 'info');
    }
  }, [showToast]);

  const handleSelectCategoryFromCollections = (catKey: string) => {
    setSelectedCategoryFilter(catKey);
    const element = document.getElementById('catalog') || document.getElementById('jewellery');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId) || document.querySelector(`#${sectionId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenAppointment = (itemName?: string) => {
    setAppointmentItemName(itemName);
    setIsAppointmentOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F1] text-[#463A34] relative overflow-x-hidden">
      {/* Sticky Glassmorphism Header with Wishlist Counter */}
      <Navbar
        onOpenAppointment={() => handleOpenAppointment()}
        savedItemsCount={savedItemIds.size}
        onOpenWishlist={() => setIsWishlistOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden">
        {/* 1. Hero Section */}
        <Hero
          onExploreClick={() => scrollToSection('catalog')}
          onVisitClick={() => scrollToSection('location')}
        />

        {/* Luxury Trust Section */}
        <TrustStats />

        {/* 2. Featured Categories (9 Cards, 3 Columns) */}
        <CollectionsSection onSelectCategory={handleSelectCategoryFromCollections} />

        {/* 3. Main Product Catalog Section (36 Cards, 3 Columns, Details Bottom Left, Book Viewing / Save / Price Bottom Right) */}
        <FeaturedJewellery
          onSelectItem={(item) => setSelectedProduct(item)}
          onBookViewing={(itemName) => handleOpenAppointment(itemName)}
          selectedCategoryFilter={selectedCategoryFilter}
          onFilterChange={(cat) => setSelectedCategoryFilter(cat)}
          savedItemIds={savedItemIds}
          onToggleSaveItem={handleToggleSaveItem}
        />

        {/* 4. Dual-Row Marquee Animation Section */}
        <DualRowMarquee onBookViewing={(itemName) => handleOpenAppointment(itemName)} />

        {/* Luxury Experience Split Section */}
        <LuxuryExperience
          onDiscoverMore={() => scrollToSection('about')}
          onOpenAppointment={() => handleOpenAppointment()}
        />

        {/* Why Choose Sunmoon Jewelleryj */}
        <WhyChooseUs />

        {/* 4-Step Jewellery Experience / Process */}
        <JewelleryProcess />

        {/* 5. Store Location in Souq Al Watiya */}
        <StoreLocation onCopyAddress={handleCopyAddress} />

        {/* 6. Curated Gallery Section (10 Cards, Responsive Grid, Lightbox) */}
        <GallerySection />

        {/* Reviews Section */}
        <ReviewsSection />

        {/* About the Boutique */}
        <AboutSection />

        {/* Contact & Inquiry Section */}
        <ContactSection
          onSuccessToast={(msg) => showToast(msg, 'success')}
          onOpenAppointment={() => handleOpenAppointment()}
        />

        {/* Final Call to Action */}
        <FinalCTA
          onExploreClick={() => scrollToSection('catalog')}
          onVisitClick={() => scrollToSection('location')}
        />
      </main>

      {/* Footer with WhatsApp and Instagram */}
      <Footer />

      {/* Persistent Floating Action Buttons (AI Chatbot, WhatsApp, Phone Call) */}
      <FloatingFABs onOpenAIChat={() => setIsAIChatOpen(true)} />

      {/* Saved Wishlist & Bulk Checkout Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        savedItemIds={savedItemIds}
        onRemoveItem={handleToggleSaveItem}
        onClearWishlist={handleClearWishlist}
        onOpenAppointment={handleOpenAppointment}
        onSelectItem={(item) => setSelectedProduct(item)}
        onExploreCatalog={() => scrollToSection('catalog')}
      />

      {/* AI Chatbot Concierge Modal */}
      <AIChatbotModal
        isOpen={isAIChatOpen}
        onClose={() => setIsAIChatOpen(false)}
        onOpenAppointment={(itemName) => {
          setIsAIChatOpen(false);
          handleOpenAppointment(itemName);
        }}
      />

      {/* Product Quick-View Details Modal */}
      <ProductModal
        item={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onBookAppointment={(itemName) => handleOpenAppointment(itemName)}
        isSaved={selectedProduct ? savedItemIds.has(selectedProduct.id) : false}
        onToggleSave={handleToggleSaveItem}
      />

      {/* Boutique Appointment Modal */}
      <AppointmentModal
        isOpen={isAppointmentOpen}
        onClose={() => {
          setIsAppointmentOpen(false);
          setAppointmentItemName(undefined);
        }}
        initialItemName={appointmentItemName}
        onSuccessToast={(msg) => showToast(msg, 'success')}
      />

      {/* Floating Toast Notification */}
      <Toast
        message={toastMessage}
        type={toastType}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
}

