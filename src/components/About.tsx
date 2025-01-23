'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Spline from '@splinetool/react-spline';

const SplineComponent = dynamic(() => import('./SplineComponent'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  ),
});

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const features = [
  {
    title: 'Neural Networks',
    description: 'Advanced AI algorithms powering intelligent decision-making and pattern recognition.',
    icon: '🧠'
  },
  {
    title: 'Real-time Processing',
    description: 'Lightning-fast data processing and analysis for immediate insights.',
    icon: '⚡'
  },
  {
    title: 'Secure Architecture',
    description: 'Enterprise-grade security ensuring data protection and privacy.',
    icon: '🔒'
  },
  {
    title: 'Community Driven',
    description: 'Built by the community, for the community, with decentralized governance.',
    icon: '🌐'
  }
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      // Animate text elements
      gsap.from('.about-text', {
        scrollTrigger: {
          trigger: ref.current,
          start: 'top center',
          end: 'bottom bottom',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.2,
      });

      // Animate features
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: '.features-grid',
          start: 'top center+=100',
          end: 'bottom bottom',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={ref} className="relative min-h-screen py-20 overflow-hidden">
      {/* Background Skull Image */}
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-[600px] h-[600px] opacity-20 pointer-events-none">
        <Image
          src="/skull-neon.png"
          alt="Neon Skull"
          fill
          className="object-contain animate-float mix-blend-screen"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-l from-black via-transparent to-transparent" />
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/10 to-black" />
      
      {/* Background Spline Scene */}
      <div className="absolute inset-0 z-0">
        <SplineComponent 
          scene="https://prod.spline.design/IqGw8TWYg0DeuJxJ/scene.splinecode"
          className="about-spline"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text-enhanced">
            Revolutionizing AI Technology
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Empowering the future through advanced artificial intelligence
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.2 }}
              className="feature-card bg-black/30 backdrop-blur-lg rounded-xl p-6 border border-purple-500/10"
            >
              <div className="flex items-start space-x-4">
                <span className="text-4xl">{feature.icon}</span>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-purple-400">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-16"
        >
          <div className="space-x-4">
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
              Get Started
            </button>
            <button className="border border-purple-500/30 text-purple-400 px-8 py-3 rounded-full font-medium hover:bg-purple-500/10 transition-all duration-300">
              Learn More
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 