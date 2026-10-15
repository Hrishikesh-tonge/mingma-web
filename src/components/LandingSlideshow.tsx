import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, Sparkles } from 'lucide-react';
import { useCafe } from '../context/CafeContext';

export const LandingSlideshow: React.FC = () => {
  const { generalInfo } = useCafe();
  const slides = generalInfo.slideshowImages && generalInfo.slideshowImages.length > 0
    ? generalInfo.slideshowImages
    : [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [imageErrorMap, setImageErrorMap] = useState<Record<string, boolean>>({});

  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (!isPlaying || slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPlaying, slides.length]);

  if (slides.length === 0) return null;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handleImageError = (id: string) => {
    setImageErrorMap((prev) => ({ ...prev, [id]: true }));
  };

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 sm:mt-4 mb-12 sm:mb-16">
      
      {/* Container Frame - 4:3 on phones, 16:9 on tablets, 21:9 on desktop */}
      <div
        className="relative aspect-4/3 sm:aspect-16/9 lg:aspect-21/9 rounded-xl overflow-hidden border border-[#EDE8DC] shadow-sm bg-[#F4F1EA] group touch-pan-y"
        onMouseEnter={() => setIsPlaying(false)}
        onMouseLeave={() => setIsPlaying(true)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Slides loop */}
        {slides.map((slide, idx) => {
          const isActive = idx === currentIndex;
          const hasError = imageErrorMap[slide.id];

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {!hasError ? (
                <img
                  src={slide.url}
                  alt={slide.title}
                  onError={() => handleImageError(slide.id)}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter brightness-[0.9] contrast-[1.03] scale-100 transition-transform duration-7000 ease-out group-hover:scale-105"
                />
              ) : (
                /* Fallback styled container if image fails to load */
                <div className="w-full h-full bg-[#1F4231] text-[#FAF9F5] flex flex-col items-center justify-center p-6 bg-grain">
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mb-3 bg-white/10">
                    <Sparkles className="w-6 h-6 text-[#DFD7C4]" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif text-center">{slide.title}</h3>
                  <p className="text-[11px] text-stone-300 font-mono mt-1 text-center">{slide.subtitle}</p>
                </div>
              )}

              {/* Scrim Overlay for Typographic Contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-stone-950/10 pointer-events-none" />

              {/* Slide Caption Text - Mobile Refined */}
              <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-10 right-4 sm:right-28 text-white z-20 max-w-xl">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="bg-[#1F4231]/90 backdrop-blur-xs text-[#FAF9F5] text-[9px] sm:text-xs font-mono uppercase tracking-widest px-2 py-0.5 rounded-xs border border-white/20">
                    {slide.subtitle}
                  </span>
                </div>
                <h3 className="text-xl sm:text-3xl lg:text-4xl font-serif text-white tracking-tight drop-shadow-sm font-light leading-snug">
                  {slide.title}
                </h3>
                {slide.caption && (
                  <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-stone-200 font-light max-w-lg leading-relaxed drop-shadow-xs line-clamp-2">
                    {slide.caption}
                  </p>
                )}
              </div>
            </div>
          );
        })}

        {/* Top-Right Counter & Pause/Play Control */}
        <div className="absolute top-3 right-3 sm:top-5 sm:right-5 z-30 flex items-center gap-2 bg-stone-950/50 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-[11px] sm:text-xs font-mono border border-white/15">
          <span>
            0{currentIndex + 1} / 0{slides.length}
          </span>
          <span className="text-white/40">|</span>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-0.5 hover:text-[#DFD7C4] transition-colors cursor-pointer"
            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          </button>
        </div>

        {/* Left / Right Arrow Controls - Compact on mobile */}
        <button
          onClick={handlePrev}
          aria-label="Previous slide"
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-stone-950/40 hover:bg-stone-950/70 backdrop-blur-md text-white flex items-center justify-center transition-all opacity-80 hover:opacity-100 cursor-pointer border border-white/15"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <button
          onClick={handleNext}
          aria-label="Next slide"
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-stone-950/40 hover:bg-stone-950/70 backdrop-blur-md text-white flex items-center justify-center transition-all opacity-80 hover:opacity-100 cursor-pointer border border-white/15"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Bottom Slide Progress Indicators */}
        <div className="absolute bottom-3 right-4 sm:bottom-4 sm:right-6 z-30 flex items-center gap-1.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex ? 'w-6 sm:w-8 bg-[#DFD7C4]' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

      </div>

      {/* Caption subtitle */}
      <div className="mt-2.5 flex items-center justify-between text-xs text-stone-500 font-light px-1">
        <span className="truncate">Swipe or click arrows to explore cafe moments.</span>
        <span className="font-mono text-[11px] text-[#1F4231] font-medium hidden sm:inline">Mall Road Space</span>
      </div>

    </section>
  );
};
