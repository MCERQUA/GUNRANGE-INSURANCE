import React, { useRef, useState, useEffect } from 'react';

interface PanoramaViewerProps {
  imagePath: string;
  children?: React.ReactNode;
}

export function PanoramaViewer({ imagePath, children }: PanoramaViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [currentX, setCurrentX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Preload image
  useEffect(() => {
    const img = new Image();
    img.onload = () => setIsLoaded(true);
    img.src = imagePath;
  }, [imagePath]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setDragStart(e.clientX - currentX);
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragStart !== null && isDragging) {
      e.preventDefault();
      const newX = e.clientX - dragStart;
      setCurrentX(newX);
    }
  };

  const handleMouseUp = () => {
    setDragStart(null);
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setDragStart(e.touches[0].clientX - currentX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (dragStart !== null && isDragging) {
      const newX = e.touches[0].clientX - dragStart;
      setCurrentX(newX);
    }
  };

  // Auto-rotate when not dragging
  useEffect(() => {
    if (isDragging || !isLoaded) return;
    
    const interval = setInterval(() => {
      setCurrentX(prev => prev - 0.5);
    }, 50);
    
    return () => clearInterval(interval);
  }, [isDragging, isLoaded]);

  // Prevent vertical scrolling when dragging horizontally
  useEffect(() => {
    const preventDefault = (e: TouchEvent) => {
      if (isDragging) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchmove', preventDefault, { passive: false });
    return () => {
      document.removeEventListener('touchmove', preventDefault);
    };
  }, [isDragging]);

  // Calculate the panorama width based on viewport
  const panoramaWidth = typeof window !== 'undefined' ? window.innerWidth * 2 : 2000;

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Loading indicator */}
      {!isLoaded && (
        <div className="fixed inset-0 flex items-center justify-center bg-tactical-black z-50">
          <div className="text-white text-xl animate-pulse">Loading 360° view...</div>
        </div>
      )}

      {/* 360 Panorama Background */}
      <div 
        ref={containerRef}
        className="fixed inset-0 w-full h-full overflow-hidden"
        style={{ 
          zIndex: -1,
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: 'none',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={() => setIsDragging(false)}
      >
        {/* Panorama image that moves horizontally */}
        <div 
          className="absolute h-full"
          style={{
            width: `${panoramaWidth}px`,
            transform: `translateX(${currentX % panoramaWidth}px)`,
            backgroundImage: `url(${imagePath})`,
            backgroundSize: `${panoramaWidth}px 100%`,
            backgroundPosition: '0 center',
            backgroundRepeat: 'no-repeat',
            transition: isDragging ? 'none' : 'transform 0.1s ease-out',
          }}
        />
        {/* Duplicate for seamless loop */}
        <div 
          className="absolute h-full"
          style={{
            width: `${panoramaWidth}px`,
            transform: `translateX(${(currentX % panoramaWidth) + panoramaWidth}px)`,
            backgroundImage: `url(${imagePath})`,
            backgroundSize: `${panoramaWidth}px 100%`,
            backgroundPosition: '0 center',
            backgroundRepeat: 'no-repeat',
            transition: isDragging ? 'none' : 'transform 0.1s ease-out',
          }}
        />
        <div 
          className="absolute h-full"
          style={{
            width: `${panoramaWidth}px`,
            transform: `translateX(${(currentX % panoramaWidth) - panoramaWidth}px)`,
            backgroundImage: `url(${imagePath})`,
            backgroundSize: `${panoramaWidth}px 100%`,
            backgroundPosition: '0 center',
            backgroundRepeat: 'no-repeat',
            transition: isDragging ? 'none' : 'transform 0.1s ease-out',
          }}
        />
      </div>

      {/* Instructions overlay */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm pointer-events-none opacity-70 z-10">
        Drag left/right to look around • Scroll to navigate
      </div>

      {/* Overlay gradient for better text readability */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 pointer-events-none" style={{ zIndex: -1 }} />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

export default PanoramaViewer;
