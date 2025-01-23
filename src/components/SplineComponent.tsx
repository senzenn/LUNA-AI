'use client';

import { useEffect, useState, useRef } from 'react';
import Spline from '@splinetool/react-spline';
import { Application } from '@splinetool/runtime';
import gsap from 'gsap';
import LoadingScreen from './LoadingScreen';

interface SplineComponentProps {
  scene: string;
  className?: string;
}

const SplineComponent = ({ scene, className = '' }: SplineComponentProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const splineRef = useRef<Application>();
  const containerRef = useRef<HTMLDivElement>(null);
  const skullRef = useRef<any>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!splineRef.current || !skullRef.current) return;

      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      // Calculate mouse position relative to container
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      // Map to rotation values (-20 to 20 degrees)
      const rotX = (y - 0.5) * -40;
      const rotY = (x - 0.5) * 40;

      // Apply rotation to the skull with smoother animation
      gsap.to(skullRef.current.rotation, {
        x: (rotX * Math.PI) / 180,
        y: (rotY * Math.PI) / 180,
        duration: 0.5,
        ease: "power2.out"
      });
    };

    if (containerRef.current) {
      containerRef.current.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  const handleLoad = (splineApp: Application) => {
    splineRef.current = splineApp;

    // Get the skull object (adjust the name based on your Spline scene)
    skullRef.current = splineApp.findObjectByName('Skull');

    // Disable only panning and zoom
    if (splineApp.canvas) {
      // @ts-ignore
      splineApp.setZoom(1);
      // @ts-ignore
      splineApp.enablePan = false;
      // @ts-ignore
      splineApp.enableZoom = false;
    }
  };

  return (
    <div 
      ref={containerRef} 
      className={`w-full h-full relative group ${className}`}
    >
      {/* Loading Screen */}
      <LoadingScreen 
        isLoading={isLoading} 
        onLoadingComplete={() => setIsLoading(false)} 
      />

      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        {/* Primary Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-pink-900/30 animate-gradient-shift" />
        
        {/* Animated Mesh Gradient */}
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_50%,_rgba(147,51,234,0.3)_0%,_transparent_50%)] animate-mesh-shift" />
        
        {/* Dynamic Glow Effects */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl animate-pulse-slow delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow delay-2000" />
        </div>

        {/* Interactive Particles */}
        <div className="absolute inset-0">
          <div className="absolute w-2 h-2 bg-purple-400/50 rounded-full blur-sm animate-float-particle-1" />
          <div className="absolute w-2 h-2 bg-pink-400/50 rounded-full blur-sm animate-float-particle-2" />
          <div className="absolute w-2 h-2 bg-blue-400/50 rounded-full blur-sm animate-float-particle-3" />
        </div>
      </div>

      {/* Enhanced Hover Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(147,51,234,0.2)_0%,_transparent_60%)] animate-pulse-slow" />
      </div>

      {/* Spline Scene */}
      <div className="absolute inset-0" style={{ pointerEvents: 'auto' }}>
        <Spline
          scene={scene}
          onLoad={handleLoad}
          style={{ 
            width: '100%',
            height: '100%',
            visibility: isLoading ? 'hidden' : 'visible',
          }}
        />
      </div>

      {/* Enhanced Vignette Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30" />
      </div>
    </div>
  );
};

export default SplineComponent; 