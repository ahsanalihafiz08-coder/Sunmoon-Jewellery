import React from 'react';

interface JewelleryImageProps {
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
}

export const JewelleryImage: React.FC<JewelleryImageProps> = ({
  src,
  alt,
  className = 'w-full h-full object-cover object-center',
  onClick,
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="eager"
      fetchPriority="high"
      decoding="sync"
      onClick={onClick}
    />
  );
};
