import React, { useState } from 'react';

interface JewelleryImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  onClick?: () => void;
}

// Curated high-resolution jewellery fallbacks matching the bright luxury palette
const LUXURY_FALLBACKS = [
  'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1611591475102-44167e411bcf?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=1000&q=80',
];

export const JewelleryImage: React.FC<JewelleryImageProps> = ({
  src,
  alt,
  className = 'w-full h-full object-cover object-center',
  loading = 'lazy',
  onClick,
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasErrored, setHasErrored] = useState(false);

  React.useEffect(() => {
    setCurrentSrc(src);
    setHasErrored(false);
  }, [src]);

  // Deterministic fallback based on src string length / hash
  const getFallback = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash + str.charCodeAt(i) * (i + 1)) % LUXURY_FALLBACKS.length;
    }
    return LUXURY_FALLBACKS[hash];
  };

  const handleError = () => {
    if (!hasErrored) {
      setHasErrored(true);
      setCurrentSrc(getFallback(src));
    }
  };

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={handleError}
      onClick={onClick}
    />
  );
};
