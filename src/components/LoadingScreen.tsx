'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  isLoading: boolean;
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ isLoading, onLoadingComplete }: LoadingScreenProps) => {
  const [counter, setCounter] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing Neural Core');

  // SVG Path Animation
  const pathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  useEffect(() => {
    // Lock body scroll when loading
    if (isLoading) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
      document.body.style.touchAction = 'none'; // Prevents scroll on touch devices
    }

    const loadingTexts = [
      'Initializing Neural Core',
      'Syncing Quantum Matrix',
      'Loading Neural Pathways',
      'Calibrating AI Systems',
      'Establishing Neural Links',
      'Synchronizing Protocols',
      'System Ready'
    ];

    const interval = setInterval(() => {
      setCounter(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            // Unlock body scroll after loading complete
            document.body.style.overflow = '';
            document.body.style.height = '';
            document.body.style.touchAction = '';
            onLoadingComplete();
          }, 1000);
          return 100;
        }
        setLoadingText(loadingTexts[Math.floor((prev + 1) / 15)]);
        return prev + 1;
      });
    }, 50);

    return () => {
      clearInterval(interval);
      // Ensure body scroll is unlocked when component unmounts
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.body.style.touchAction = '';
    };
  }, [isLoading, onLoadingComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-xl font-['Space_Grotesk']"
          style={{ touchAction: 'none' }}
        >
          {/* Animated Background Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:100px_100px] [transform-origin:center] animate-grid-spin" />

          {/* Radial Gradient Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />

          {/* Animated SVG Paths */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.path
              d="M0,50 Q25,0 50,50 T100,50"
              stroke="rgba(6,182,212,0.2)"
              strokeWidth="0.5"
              fill="none"
              variants={pathVariants}
              initial="hidden"
              animate="visible"
            />
            <motion.path
              d="M0,60 Q25,10 50,60 T100,60"
              stroke="rgba(147,51,234,0.2)"
              strokeWidth="0.5"
              fill="none"
              variants={pathVariants}
              initial="hidden"
              animate="visible"
            />
          </svg>

          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="absolute w-1 h-1 bg-cyan-500/30 rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `floatParticle ${5 + Math.random() * 5}s linear infinite`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              />
            ))}
          </div>

          {/* Main Content Container */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative max-w-2xl w-full mx-4"
          >
            {/* Progress Bar */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: counter / 100 }}
              className="absolute -top-20 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 transform origin-left"
            />

            {/* Counter Display */}
            <div className="relative">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-[180px] md:text-[240px] font-bold text-center tracking-tighter"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 [text-shadow:0_0_20px_rgba(6,182,212,0.5)]">
                  {counter}
                </span>
              </motion.div>

              {/* Loading Text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-full text-center"
              >
                <div className="inline-block px-8 py-4 bg-black/50 backdrop-blur-lg rounded-xl border border-cyan-500/20">
                  <span className="text-lg text-cyan-400 font-mono tracking-wider uppercase">
                    {loadingText}
                    <span className="inline-block w-4 text-center animate-pulse">.</span>
                    <span className="inline-block w-4 text-center animate-pulse delay-100">.</span>
                    <span className="inline-block w-4 text-center animate-pulse delay-200">.</span>
                  </span>
                </div>
              </motion.div>

              {/* Circular Progress */}
              <svg
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] -rotate-90"
              >
                {/* Outer Ring */}
                <circle
                  cx="150"
                  cy="150"
                  r="140"
                  className="stroke-cyan-900/20"
                  strokeWidth="2"
                  fill="none"
                />
                <circle
                  cx="150"
                  cy="150"
                  r="140"
                  className="stroke-cyan-500"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${counter * 8.796} 879.6`}
                  style={{
                    filter: 'drop-shadow(0 0 8px rgba(6,182,212,0.5))'
                  }}
                />

                {/* Inner Ring */}
                <circle
                  cx="150"
                  cy="150"
                  r="120"
                  className="stroke-blue-900/20"
                  strokeWidth="2"
                  fill="none"
                />
                <circle
                  cx="150"
                  cy="150"
                  r="120"
                  className="stroke-blue-500"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${counter * 7.54} 754`}
                  style={{
                    filter: 'drop-shadow(0 0 8px rgba(37,99,235,0.5))'
                  }}
                />

                {/* Innermost Ring */}
                <circle
                  cx="150"
                  cy="150"
                  r="100"
                  className="stroke-purple-900/20"
                  strokeWidth="2"
                  fill="none"
                />
                <circle
                  cx="150"
                  cy="150"
                  r="100"
                  className="stroke-purple-500"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${counter * 6.28} 628`}
                  style={{
                    filter: 'drop-shadow(0 0 8px rgba(147,51,234,0.5))'
                  }}
                />
              </svg>
            </div>
          </motion.div>

          {/* Corner Decorations */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-cyan-500/30"
          />
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-cyan-500/30"
          />
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-cyan-500/30"
          />
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-cyan-500/30"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen; 