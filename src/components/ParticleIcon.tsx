'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface ParticleIconProps {
  icon: React.ReactNode;
  href: string;
}

const ParticleIcon = ({ icon, href }: ParticleIconProps) => {
  const iconRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const icon = iconRef.current;
    const particles = particlesRef.current;
    if (!icon || !particles) return;

    const createParticles = () => {
      const numParticles = 10;
      particles.innerHTML = '';

      for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute w-1 h-1 bg-purple-500 rounded-full opacity-0';
        particles.appendChild(particle);
      }
    };

    const animateParticles = () => {
      const particleElements = particles.children;
      
      gsap.to(icon, {
        scale: 1.2,
        duration: 0.2,
      });

      Array.from(particleElements).forEach((particle, i) => {
        const angle = (i / particleElements.length) * Math.PI * 2;
        const radius = 20;
        
        gsap.set(particle, {
          opacity: 1,
          x: 0,
          y: 0,
        });

        gsap.to(particle, {
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
        });
      });
    };

    const resetParticles = () => {
      gsap.to(icon, {
        scale: 1,
        duration: 0.2,
      });
    };

    createParticles();

    icon.addEventListener('mouseenter', animateParticles);
    icon.addEventListener('mouseleave', resetParticles);

    return () => {
      icon.removeEventListener('mouseenter', animateParticles);
      icon.removeEventListener('mouseleave', resetParticles);
    };
  }, []);

  return (
    <div className="relative">
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block transition-transform duration-200"
        // @ts-ignore
        ref={iconRef}
      >
        {icon}
      </a>
    </div>
  );
};

export default ParticleIcon; 