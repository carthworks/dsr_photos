import { useEffect, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download } from 'lucide-react';

interface ImageLightboxProps {
  images: { src: string; alt: string; category?: string; type?: 'image' | 'video'; poster?: string }[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function ImageLightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: ImageLightboxProps) {
  const [zoom, setZoom] = useState(1);

  const handlePrev = useCallback(() => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    onNavigate(newIndex);
    setZoom(1);
  }, [currentIndex, images.length, onNavigate]);

  const handleNext = useCallback(() => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    onNavigate(newIndex);
    setZoom(1);
  }, [currentIndex, images.length, onNavigate]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          handlePrev();
          break;
        case 'ArrowRight':
          handleNext();
          break;
        case '+':
        case '=':
          setZoom((z) => Math.min(z + 0.5, 3));
          break;
        case '-':
          setZoom((z) => Math.max(z - 0.5, 1));
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  // Touch/swipe support
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) handleNext();
    if (isRightSwipe) handlePrev();
  };

  if (!isOpen || !images[currentIndex]) return null;

  const currentImage = images[currentIndex];
  const isVideo = currentImage.type === 'video';

  return createPortal(
    <div
      className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-sm"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
        aria-label="Close"
      >
        <X size={24} />
      </button>

      {/* Top info bar */}
      <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/50 to-transparent pointer-events-none">
        <div className="flex items-center justify-between pointer-events-auto">
          <div>
            {currentImage.category && (
              <span className="text-gold text-xs uppercase tracking-[0.18em]">
                {currentImage.category}
              </span>
            )}
            <p className="text-white text-sm mt-1">
              {currentIndex + 1} / {images.length}
            </p>
          </div>

          {/* Zoom controls - Only for images */}
          {!isVideo && (
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setZoom((z) => Math.max(z - 0.5, 1));
                }}
                className="p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
                aria-label="Zoom out"
              >
                <ZoomOut size={18} />
              </button>
              <span className="text-white text-sm min-w-[50px] text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setZoom((z) => Math.min(z + 0.5, 3));
                }}
                className="p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
                aria-label="Zoom in"
              >
                <ZoomIn size={18} />
              </button>
              <a
                href={currentImage.src}
                download
                onClick={(e) => e.stopPropagation()}
                className="p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors ml-2"
                aria-label="Download"
              >
                <Download size={18} />
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handlePrev();
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors z-20"
        aria-label="Previous image"
      >
        <ChevronLeft size={28} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors z-20"
        aria-label="Next image"
      >
        <ChevronRight size={28} />
      </button>

      {/* Media container */}
      <div
        className="absolute inset-0 flex items-center justify-center p-4 md:p-16"
        onClick={(e) => e.stopPropagation()}
      >
        {isVideo ? (
          <div className="w-full h-full max-w-5xl max-h-[80vh] flex items-center justify-center bg-black">
            {currentImage.src.includes('youtube') || currentImage.src.includes('youtu.be') ? (
              <iframe
                src={currentImage.src.replace('watch?v=', 'embed/').replace('youtu.be/', 'www.youtube.com/embed/')}
                title={currentImage.alt}
                className="w-full h-full aspect-video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                src={currentImage.src}
                controls
                autoPlay
                className="max-w-full max-h-full"
                poster={currentImage.poster}
              >
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        ) : (
          <img
            src={currentImage.src}
            alt={currentImage.alt}
            className="max-w-full max-h-full object-contain transition-transform duration-200"
            style={{
              transform: `scale(${zoom})`,
              cursor: zoom > 1 ? 'grab' : 'default',
            }}
            draggable={false}
          />
        )}
      </div>

      {/* Thumbnail strip */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex justify-center gap-2 overflow-x-auto pb-2">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                onNavigate(index);
                setZoom(1);
              }}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden transition-all ${index === currentIndex
                ? 'ring-2 ring-gold scale-110'
                : 'opacity-50 hover:opacity-80'
                }`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Keyboard hint */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 text-white/40 text-xs">
        Use ← → arrows to navigate • ESC to close • +/- to zoom
      </div>
    </div>,
    document.body
  );
}
