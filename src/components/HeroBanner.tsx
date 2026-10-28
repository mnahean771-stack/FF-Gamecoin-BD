import React, { useState, useEffect, useRef } from 'react';

const BANNERS = ['/Banner 1.jpg', '/Banner 2.jpg', '/Banner 3.jpg'];

export const HeroBanner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isDragging) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BANNERS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isDragging]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setCurrentTranslate(0);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - startX;
    setCurrentTranslate(delta);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (currentTranslate < -45) {
      setCurrentIndex((prev) => (prev + 1) % BANNERS.length);
    } else if (currentTranslate > 45) {
      setCurrentIndex((prev) => (prev - 1 + BANNERS.length) % BANNERS.length);
    }
    setCurrentTranslate(0);
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className="relative mt-[18px] rounded-[26px] overflow-hidden border-[1.5px] border-[#1e293b] shadow-[0_4px_0_#1e293b,0_16px_36px_-12px_rgba(17,24,39,0.28)] bg-[#050d24] select-none touch-pan-y cursor-grab active:cursor-grabbing"
    >
      <div
        className="flex transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform"
        style={{
          transform: `translateX(calc(-${currentIndex * 100}% + ${currentTranslate}px))`,
          transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)'
        }}
      >
        {BANNERS.map((banner, idx) => (
          <div key={idx} className="w-full shrink-0 aspect-2/1 min-h-[160px] relative bg-[#050d24]">
            <img
              src={banner}
              alt={`Banner ${idx + 1}`}
              draggable={false}
              className="w-full h-full object-cover pointer-events-none select-none"
            />
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute left-0 right-0 bottom-[14px] flex justify-center gap-[7px] z-10 pointer-events-none">
        {BANNERS.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(idx);
            }}
            aria-label={`Go to slide ${idx + 1}`}
            className={`pointer-events-auto h-[5px] rounded-[6px] transition-all duration-400 cursor-pointer shadow-[0_1px_4px_rgba(0,0,0,0.45)] ${
              idx === currentIndex
                ? 'w-[36px] bg-white shadow-[0_2px_10px_rgba(37,99,235,0.85),0_1px_4px_rgba(0,0,0,0.5)]'
                : 'w-[16px] bg-white/45'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
