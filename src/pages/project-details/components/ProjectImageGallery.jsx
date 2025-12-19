import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const ProjectImageGallery = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images?.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images?.length - 1 ? 0 : prev + 1));
  };

  if (!images || images?.length === 0) return null;

  return (
    <div className="relative w-full h-[400px] lg:h-[500px] overflow-hidden rounded-xl bg-muted">
      <Image
        src={images?.[currentIndex]?.url}
        alt={images?.[currentIndex]?.alt}
        className="w-full h-full object-cover"
      />
      {images?.length > 1 && (
        <>
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all backdrop-blur-sm"
            aria-label="Image précédente"
          >
            <Icon name="ChevronLeft" size={24} color="#FFFFFF" />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all backdrop-blur-sm"
            aria-label="Image suivante"
          >
            <Icon name="ChevronRight" size={24} color="#FFFFFF" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images?.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-primary w-8' : 'bg-white/50'
                }`}
                aria-label={`Aller à l'image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
      <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-sm font-medium">
        {currentIndex + 1} / {images?.length}
      </div>
    </div>
  );
};

export default ProjectImageGallery;