'use client';

import { useState, useEffect, useRef } from 'react';
import Spline from '@splinetool/react-spline';
import { Application } from '@splinetool/runtime';

interface BackgroundSplineProps {
  scene: string;
  className?: string;
}

const BackgroundSpline = ({ scene, className = '' }: BackgroundSplineProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const splineRef = useRef<Application>();

  const handleLoad = (splineApp: Application) => {
    setIsLoading(false);
    splineRef.current = splineApp;
  };

  return (
    <div className={`w-full h-full relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-black" />
      )}
      <Spline
        scene={scene}
        onLoad={handleLoad}
        style={{ 
          visibility: isLoading ? 'hidden' : 'visible',
          width: '100%',
          height: '100%',
          opacity: 0.5 // Adjust this value to control background opacity
        }}
      />
    </div>
  );
};

export default BackgroundSpline; 