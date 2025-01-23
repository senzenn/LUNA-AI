'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';
import About from '@/components/About';
import Tokenomics from '@/components/Tokenomics';
import Roadmap from '@/components/Roadmap';
import Footer from '@/components/Footer';
import TokenInfo from '@/components/TokenInfo';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const SplineComponent = dynamic(() => import('@/components/SplineComponent'), {
  ssr: false,
  loading: () => null,
});

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    // GSAP Animations
    const ctx = gsap.context(() => {
      // Smooth scroll animation
      gsap.to('.content-section', {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.content-section',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // Parallax effect for sections
      gsap.utils.toArray<HTMLElement>('.parallax-section').forEach((section) => {
        gsap.to(section, {
          backgroundPosition: `50% ${-window.innerHeight / 2}px`,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} className="relative w-full overflow-x-hidden bg-black text-white">
      {/* Add gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/50 via-purple-900/20 to-black/50 pointer-events-none z-1" />
      
      <Navbar />
      
      {/* Hero Section */}
      <section ref={heroRef} className="h-screen relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-10"
        >
          <SplineComponent 
            scene="https://prod.spline.design/TXGwl0n0qr7IlqWF/scene.splinecode"
            className="hero-spline"
          />
        </motion.div>
        
      

        {/* Mouse scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <div className="w-8 h-14 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{
                y: [0, 8, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'loop',
              }}
              className="w-2 h-2 bg-white rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Content Sections */}
      <div className="relative z-10">
        <div className="content-section">
          <About />
        </div>
        <div className="content-section">
          <TokenInfo />
        </div>
        <div className="content-section">
          <Tokenomics />
        </div>
        <div className="content-section">
          <Roadmap />
        </div>
      </div>
      <Footer />
      <svg className="hidden">
        <defs>
          <filter id="wobble">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.01 0.01"
              numOctaves="2"
              seed="2"
            >
              <animate
                attributeName="baseFrequency"
                dur="30s"
                values="0.01 0.01;0.02 0.02;0.01 0.01"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" scale="15" />
          </filter>
        </defs>
      </svg>
    </main>
  );
}

