import React, { useRef, useState, useEffect } from 'react';

interface SimplePanoramaViewerProps {
  imagePath: string;
  children?: React.ReactNode;
}

export function SimplePanoramaViewer({ imagePath, children }: SimplePanoramaViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const panoramaRef = useRef<HTMLDivElement>(null);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [currentX, setCurrentX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [velocity, setVelocity] = useState(0);
  const animationRef = useRef<number>();
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(Date.now());

  // Auto-rotate when not interacting
  useEffect(() => {
    let autoRotateSpeed = 0.1;
    const autoRotate = () => {
      if (!isDragging && Math.abs(velocity) < 0.1) {
        setCurrentX(prev => prev - autoRotateSpeed);
      }
    };
    
    const interval = setInterval(autoRotate, 16);
    return () => clearInterval(interval);
  }, [isDragging, velocity]);

  // Momentum scrolling
  useEffect(() => {
    const momentumScroll = () => {
      if (!isDragging && Math.abs(velocity) > 0.1) {
        setVelocity(v => v * 0.95); // Friction
        setCurrentX(prev => prev + velocity);
        animationRef.current = requestAnimationFrame(momentumScroll);
      }
    };

    if (!isDragging && Math.abs(velocity) > 0.1) {
      animationRef.current = requestAnimationFrame(momentumScroll);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isDragging, velocity]);

  const handleStart = (clientX: number) => {
    setDragStart(clientX - currentX);
    setIsDragging(true);
    setVelocity(0);
    lastXRef.current = clientX;
    lastTimeRef.current = Date.now();
  };

  const handleMove = (clientX: number) => {
    if (dragStart !== null && isDragging) {
      const newX = clientX - dragStart;
      setCurrentX(newX);
      
      // Calculate velocity for momentum
      const now = Date.now();
      const dt = now - lastTimeRef.current;
      if (dt > 0) {
        const dx = clientX - lastXRef.current;
        setVelocity(dx / dt * 16); // Convert to pixels per frame
      }
      
      lastXRef.current = clientX;
      lastTimeRef.current = now;
    }
  };

  const handleEnd = () => {
    setDragStart(null);
    setIsDragging(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    e.preventDefault();
    handleMove(e.clientX);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    e.preventDefault();
    handleEnd();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  // Prevent vertical scrolling when dragging
  useEffect(() => {
    const preventDefault = (e: TouchEvent) => {
      if (isDragging && containerRef.current?.contains(e.target as Node)) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchmove', preventDefault, { passive: false });
    return () => {
      document.removeEventListener('touchmove', preventDefault);
    };
  }, [isDragging]);

  // Calculate the panorama position to create infinite scroll effect
  const panoramaStyle = {
    transform: `translateX(${currentX % window.innerWidth}px)`,
    width: '400vw',
    height: '100%',
    backgroundImage: `url(${imagePath})`,
    backgroundSize: 'auto 100%',
    backgroundRepeat: 'repeat-x',
    backgroundPosition: 'center center',
    willChange: 'transform',
    transition: isDragging ? 'none' : 'transform 0.1s ease-out'
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* 360 Panorama Background */}
      <div 
        ref={containerRef}
        className="fixed inset-0 w-full h-full"
        style={{ 
          zIndex: -1,
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: 'none',
          touchAction: 'none'
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleEnd}
      >
        <div 
          ref={panoramaRef}
          style={panoramaStyle}
        />
        
        {/* Instructions overlay */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm pointer-events-none opacity-70">
          Drag to look around • Scroll to navigate
        </div>
      </div>

      {/* Overlay gradient for better text readability */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" style={{ zIndex: -1 }} />

      {/* Content */}
      <div className="relative z-10 pointer-events-none">
        <div className="pointer-events-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

export default SimplePanoramaViewer;
