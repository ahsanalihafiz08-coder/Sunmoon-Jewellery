import React from 'react';

interface WatchBrandLogoProps {
  brand: string;
  className?: string;
}

export const WatchBrandLogo: React.FC<WatchBrandLogoProps> = ({ brand, className = 'w-5 h-5' }) => {
  const key = brand.toLowerCase();

  // Rolex: Five-pointed Coronet Crown
  if (key === 'rolex') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <path d="M4 18h16l1.5-9-4.5 3.5L15 5l-3 6-3-6-2 7.5L2.5 9 4 18z" />
        <ellipse cx="12" cy="19.5" rx="7.5" ry="1.5" />
        <circle cx="9" cy="4" r="0.8" fill="currentColor" />
        <circle cx="15" cy="4" r="0.8" fill="currentColor" />
        <circle cx="12" cy="3" r="0.8" fill="currentColor" />
        <circle cx="2.5" cy="7.5" r="0.7" fill="currentColor" />
        <circle cx="21.5" cy="7.5" r="0.7" fill="currentColor" />
      </svg>
    );
  }

  // Patek Philippe: Calatrava Cross
  if (key === 'patek philippe') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <path d="M12 2.5c-1.5 2-1.5 4.5 0 6.5 1.5-2 1.5-4.5 0-6.5z" />
        <path d="M12 21.5c1.5-2 1.5-4.5 0-6.5-1.5 2-1.5 4.5 0 6.5z" />
        <path d="M2.5 12c2 1.5 4.5 1.5 6.5 0-2-1.5-4.5-1.5-6.5 0z" />
        <path d="M21.5 12c-2-1.5-4.5-1.5-6.5 0 2 1.5 4.5 1.5 6.5 0z" />
        <circle cx="12" cy="12" r="2.2" />
      </svg>
    );
  }

  // Audemars Piguet: Iconic Octagonal Royal Oak Bezel + AP
  if (key === 'audemars piguet') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <polygon points="8.5,2.5 15.5,2.5 21.5,8.5 21.5,15.5 15.5,21.5 8.5,21.5 2.5,15.5 2.5,8.5" />
        <circle cx="12" cy="12" r="5.5" strokeDasharray="2 2" />
        <text x="12" y="14.2" textAnchor="middle" fill="currentColor" stroke="none" fontSize="6.5" fontWeight="700" fontFamily="serif">AP</text>
      </svg>
    );
  }

  // Vacheron Constantin: Maltese Cross
  if (key === 'vacheron constantin') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <path d="M9.5 3L12 5.2 14.5 3 13.5 9.5l6.5-1-2.2 2.5L20 13.5l-6.5-1 1 6.5L12 16.8 9.5 19l1-6.5-6.5 1 2.2-2.5L4 8.5l6.5 1z" />
        <circle cx="12" cy="11.5" r="1.4" fill="currentColor" />
      </svg>
    );
  }

  // Cartier: Signature Intertwined Double-C Oval Crest
  if (key === 'cartier') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <ellipse cx="12" cy="12" rx="9" ry="7" />
        <path d="M11 8.5a3.5 3.5 0 1 0 0 7" />
        <path d="M13 8.5a3.5 3.5 0 1 1 0 7" />
      </svg>
    );
  }

  // Omega: Classical Greek Omega Symbol Ω
  if (key === 'omega') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <path d="M4 19h5.2v-2.2a6.5 6.5 0 1 1 5.6 0V19H20" />
      </svg>
    );
  }

  // Breitling: Winged Aviation Emblem
  if (key === 'breitling') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <path d="M2 8.5c4 0 6.5 1.5 8 3.5-1.5 2-4 3.5-8 3.5" />
        <path d="M22 8.5c-4 0-6.5 1.5-8 3.5 1.5 2 4 3.5 8 3.5" />
        <circle cx="12" cy="12" r="3.5" />
        <path d="M12 6v12" />
      </svg>
    );
  }

  // Zenith: Iconic 5-Pointed Zenith Guiding Star
  if (key === 'zenith') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <polygon points="12,2.5 14.9,8.7 21.5,9.6 16.7,14.2 17.9,20.8 12,17.6 6.1,20.8 7.3,14.2 2.5,9.6 9.1,8.7" />
      </svg>
    );
  }

  // Jaeger-LeCoultre: Precision JLC Dial & Compass Crest
  if (key === 'jaeger-lecoultre') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <rect x="6" y="3.5" width="12" height="17" rx="2" />
        <circle cx="12" cy="12" r="3.5" />
        <path d="M12 10v2l1.5 1" />
      </svg>
    );
  }

  // Piaget: Altiplano Ultra-Thin Guilloché Crest
  if (key === 'piaget') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <circle cx="12" cy="12" r="8.5" />
        <circle cx="12" cy="12" r="5" />
        <text x="12" y="14.2" textAnchor="middle" fill="currentColor" stroke="none" fontSize="7" fontWeight="700" fontFamily="serif">P</text>
      </svg>
    );
  }

  // IWC: Schaffhausen Chronograph & Globe Emblem
  if (key === 'iwc') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <circle cx="12" cy="12" r="8.5" />
        <text x="12" y="14" textAnchor="middle" fill="currentColor" stroke="none" fontSize="6" fontWeight="700" fontFamily="serif">IWC</text>
      </svg>
    );
  }

  // Hublot: H-Bolt Porthole Emblem
  if (key === 'hublot') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <circle cx="12" cy="12" r="8.5" />
        <path d="M9 8v8M15 8v8M9 12h6" strokeWidth="1.8" />
        <circle cx="12" cy="5.2" r="0.6" fill="currentColor" />
        <circle cx="12" cy="18.8" r="0.6" fill="currentColor" />
      </svg>
    );
  }

  // Chopard: Diamond & Classic C Crest
  if (key === 'chopard') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <path d="M12 3l7 6-7 12L5 9l7-6z" />
        <path d="M5 9h14" />
      </svg>
    );
  }

  // Tudor: Heritage Shield Emblem
  if (key === 'tudor') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <path d="M5 4h14v7c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V4z" />
        <circle cx="12" cy="11" r="2.5" />
      </svg>
    );
  }

  // Panerai: Luminor Cushion Case & Crown-Guard Bridge
  if (key === 'panerai') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <rect x="4" y="5" width="14" height="14" rx="4" />
        <circle cx="11" cy="12" r="4.5" />
        <path d="M18 9.5h2.5v5H18" />
      </svg>
    );
  }

  // Blancpain: Classical 1735 Moonphase / Chronometer Crest
  if (key === 'blancpain') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <circle cx="12" cy="12" r="8.5" />
        <path d="M13.5 8.2a4.2 4.2 0 1 0 3.5 6.3 3.4 3.4 0 0 1-3.5-6.3z" />
      </svg>
    );
  }

  // TAG Heuer: Swiss Racing Shield Crest
  if (key === 'tag heuer') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <path d="M4.5 4h15v9l-7.5 7-7.5-7V4z" />
        <path d="M8 9.5h8M12 9.5v5.5" />
      </svg>
    );
  }

  // Ulysse Nardin: Marine Chronometer Anchor
  if (key === 'ulysse nardin') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <circle cx="12" cy="5.5" r="2" />
        <path d="M12 7.5v13M8 11h8M5 14a7 7 0 0 0 14 0" />
      </svg>
    );
  }

  // Default / All Brands: Geneva Horology 4-Point Sparkle Crest
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 6l1.5 4.5L18 12l-4.5 1.5L12 18l-1.5-4.5L6 12l4.5-1.5z" />
    </svg>
  );
};
