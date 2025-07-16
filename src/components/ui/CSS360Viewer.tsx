import React, { useRef, useState, useEffect } from 'react';

interface CSS360ViewerProps {
  imagePath: string;
  children?: React.ReactNode;
}

export function CSS360Viewer({ imagePath, children }: CSS360ViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [startRotation, setStartRotation] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  // Preload image
  useEffect(() => {
    const img = new Image();
    img.onload = () => setIsLoaded(true);
    img.src = imagePath;
  }, [imagePath]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
    setStartRotation({ ...rotation });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - startPos.x;
    const deltaY = e.clientY - startPos.y;
    
    setRotation({
      x: Math.max(-30, Math.min(30, startRotation.x - deltaY * 0.2)),
      y: startRotation.y + deltaX * 0.3
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setStartPos({ x: touch.clientX, y: touch.clientY });
    setStartRotation({ ...rotation });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - startPos.x;
    const deltaY = touch.clientY - startPos.y;
    
    setRotation({
      x: Math.max(-30, Math.min(30, startRotation.x - deltaY * 0.2)),
      y: startRotation.y + deltaX * 0.3
    });
  };

  // Auto-rotate when not dragging
  useEffect(() => {
    if (isDragging) return;
    
    const interval = setInterval(() => {
      setRotation(prev => ({
        ...prev,
        y: prev.y + 0.1
      }));
    }, 50);
    
    return () => clearInterval(interval);
  }, [isDragging]);

  // Prevent scrolling while dragging
  useEffect(() => {
    const preventDefault = (e: Event) => {
      if (isDragging) e.preventDefault();
    };
    
    document.addEventListener('touchmove', preventDefault, { passive: false });
    return () => document.removeEventListener('touchmove', preventDefault);
  }, [isDragging]);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Loading indicator */}
      {!isLoaded && (
        <div className="fixed inset-0 flex items-center justify-center bg-tactical-black z-50">
          <div className="text-white text-xl animate-pulse">Loading 360° view...</div>
        </div>
      )}

      {/* 360 Panorama Container */}
      <div 
        ref={containerRef}
        className="fixed inset-0 w-full h-full"
        style={{ 
          zIndex: -1,
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: 'none'
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={() => setIsDragging(false)}
      >
        {/* Panorama wrapper with 3D perspective */}
        <div 
          className="absolute inset-0"
          style={{
            perspective: '1000px',
            perspectiveOrigin: '50% 50%'
          }}
        >
          {/* Panorama image container */}
          <div
            className="absolute inset-0"
            style={{
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              transformStyle: 'preserve-3d',
              transition: isDragging ? 'none' : 'transform 0.1s ease-out',
              width: '100%',
              height: '100%'
            }}
          >
            {/* Cylindrical panorama effect */}
            <div
              className="absolute"
              style={{
                width: '200%',
                height: '100%',
                left: '-50%',
                backgroundImage: `url(${imagePath})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'repeat-x',
                borderRadius: '50%',
                transform: 'translateZ(-500px)'
              }}
            />
          </div>
        </div>
      </div>

      {/* Instructions overlay */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm pointer-events-none opacity-70 z-10">
        Click and drag to look around • Scroll to navigate
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

export default CSS360Viewer;
