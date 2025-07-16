import React, { useRef, useEffect, useState } from 'react';

interface PanoramaViewerProps {
  imagePath: string;
  children?: React.ReactNode;
}

export function PanoramaViewer({ imagePath, children }: PanoramaViewerProps) {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!viewerRef.current) return;

    // Create a simple 360 viewer using CSS transforms
    const viewer = viewerRef.current;
    let isUserInteracting = false;
    let onPointerDownMouseX = 0;
    let onPointerDownMouseY = 0;
    let lon = 0;
    let onPointerDownLon = 0;
    let lat = 0;
    let onPointerDownLat = 0;
    let phi = 0;
    let theta = 0;

    // Load and check image
    const img = new Image();
    img.onload = () => {
      setIsLoading(false);
      setError(null);
    };
    img.onerror = () => {
      setError('Failed to load panorama image');
      setIsLoading(false);
    };
    img.src = imagePath;

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      event.preventDefault();
      isUserInteracting = true;

      const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
      const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;

      onPointerDownMouseX = clientX;
      onPointerDownMouseY = clientY;
      onPointerDownLon = lon;
      onPointerDownLat = lat;

      viewer.style.cursor = 'grabbing';
    };

    const onPointerMove = (event: MouseEvent | TouchEvent) => {
      if (!isUserInteracting) return;

      const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
      const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;

      lon = (onPointerDownMouseX - clientX) * 0.1 + onPointerDownLon;
      lat = (clientY - onPointerDownMouseY) * 0.1 + onPointerDownLat;
      lat = Math.max(-85, Math.min(85, lat));
    };

    const onPointerUp = () => {
      isUserInteracting = false;
      viewer.style.cursor = 'grab';
    };

    const animate = () => {
      requestAnimationFrame(animate);
      
      if (!isUserInteracting) {
        lon += 0.05; // Slow auto-rotation
      }

      lat = Math.max(-85, Math.min(85, lat));
      phi = THREE.MathUtils.degToRad(90 - lat);
      theta = THREE.MathUtils.degToRad(lon);

      const x = 500 * Math.sin(phi) * Math.cos(theta);
      const y = 500 * Math.cos(phi);
      const z = 500 * Math.sin(phi) * Math.sin(theta);

      if (viewer) {
        viewer.style.transform = `rotateX(${lat}deg) rotateY(${-lon}deg)`;
      }
    };

    // Add event listeners
    viewer.addEventListener('mousedown', onPointerDown);
    viewer.addEventListener('mousemove', onPointerMove);
    viewer.addEventListener('mouseup', onPointerUp);
    viewer.addEventListener('mouseleave', onPointerUp);
    viewer.addEventListener('touchstart', onPointerDown);
    viewer.addEventListener('touchmove', onPointerMove);
    viewer.addEventListener('touchend', onPointerUp);

    // Start animation
    animate();

    // Cleanup
    return () => {
      viewer.removeEventListener('mousedown', onPointerDown);
      viewer.removeEventListener('mousemove', onPointerMove);
      viewer.removeEventListener('mouseup', onPointerUp);
      viewer.removeEventListener('mouseleave', onPointerUp);
      viewer.removeEventListener('touchstart', onPointerDown);
      viewer.removeEventListener('touchmove', onPointerMove);
      viewer.removeEventListener('touchend', onPointerUp);
    };
  }, [imagePath]);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Loading state */}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-tactical-black z-50">
          <div className="text-white text-xl animate-pulse">Loading 360° view...</div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="fixed inset-0 flex items-center justify-center bg-tactical-black z-50">
          <div className="text-red-500 text-xl">{error}</div>
        </div>
      )}

      {/* Simple CSS-based 360 viewer */}
      <div 
        className="fixed inset-0 w-full h-full"
        style={{ 
          zIndex: -1,
          perspective: '1000px',
          overflow: 'hidden'
        }}
      >
        <div
          ref={viewerRef}
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${imagePath})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            transformStyle: 'preserve-3d',
            cursor: 'grab',
            userSelect: 'none'
          }}
        />
      </div>

      {/* Fallback: Simple draggable panorama */}
      <div 
        className="fixed inset-0 w-full h-full"
        style={{ 
          zIndex: -2,
          backgroundImage: `url(${imagePath})`,
          backgroundSize: 'auto 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat-x'
        }}
      />

      {/* Instructions overlay */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm pointer-events-none opacity-70 z-10">
        Click and drag to look around • Scroll to navigate
      </div>

      {/* Overlay gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 pointer-events-none" style={{ zIndex: -1 }} />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

// Import THREE utilities
const THREE = {
  MathUtils: {
    degToRad: (degrees: number) => degrees * (Math.PI / 180)
  }
};

export default PanoramaViewer;
