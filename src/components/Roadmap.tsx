'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const SplineComponent = dynamic(() => import('./SplineComponent'), {
  ssr: false,
  loading: () => null,
});

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const roadmapSteps = [
  {
    title: 'CREATE A NEW SKETCH',
    steps: [
      'Touch LH thumbstick',
      'Move up'
    ]
  },
  {
    title: 'CREATING A VOXEL',
    steps: [
      'Point at any voxel',
      'Press the trigger'
    ]
  },
  {
    title: 'COLOR THEM',
    steps: [
      'Pick color on the RH thumbstick',
      'Select a voxel',
      'Press the "Paint" button'
    ]
  },
  {
    title: 'EXPORT YOUR MODEL',
    steps: [
      'Go to "Library"',
      'Open the context menu',
      'Tap "Export"',
      'Find .OBJ file on your disk'
    ]
  }
];

const Roadmap = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, threshold: 0.2 });

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Create timeline for coordinated animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'bottom bottom',
          toggleActions: 'play none none reverse',
        }
      });

      // Animate the path drawing
      tl.from('.roadmap-line', {
        strokeDashoffset: 1000,
        duration: 2,
        ease: 'power2.out',
      });

      // Animate each step with a stagger
      gsap.from('.roadmap-step', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'bottom bottom',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.3,
        ease: 'power2.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="roadmap" ref={containerRef} className="relative min-h-screen py-20 overflow-hidden">
      {/* Content Container */}
      <div className="relative z-20 max-w-6xl mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold text-center mb-20 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
        >
          Roadmap
        </motion.h2>

        {/* Roadmap Path */}
        <div className="relative">
          <svg
            className="absolute left-1/2 transform -translate-x-1/2 h-full w-1"
            style={{ top: 0 }}
            preserveAspectRatio="none"
          >
            <line
              className="roadmap-line"
              x1="50%"
              y1="0"
              x2="50%"
              y2="100%"
              stroke="url(#roadmap-gradient)"
              strokeWidth="2"
              strokeDasharray="1000"
              strokeDashoffset="0"
            />
            <defs>
              <linearGradient id="roadmap-gradient" gradientTransform="rotate(90)">
                <stop offset="0%" stopColor="#9333EA" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
            </defs>
          </svg>

          {/* Roadmap Steps */}
          <div className="relative z-10">
            {roadmapSteps.map((step, index) => (
              <div
                key={index}
                className="roadmap-step relative mb-32 last:mb-0"
              >
                <div className={`flex items-start ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} gap-8`}>
                  {/* Step Marker */}
                  <div className="relative flex-none">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                      <span className="text-white text-sm font-bold">{index + 1}</span>
                    </div>
                  </div>

                  {/* Step Content */}
                  <div 
                    className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'} 
                    backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10
                    hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-purple-500/20`}
                  >
                    <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                      {step.title}
                    </h3>
                    <ul className="space-y-3 text-gray-300">
                      {step.steps.map((subStep, subIndex) => (
                        <li key={subIndex} className="flex items-center gap-2">
                          <span className="text-pink-500">-</span>
                          <span className="text-lg">{subStep}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap; 