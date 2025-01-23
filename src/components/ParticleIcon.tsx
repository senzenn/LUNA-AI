'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { PARTICLE_ANIMATION } from '@/constants/animation';
import { STYLES } from '@/constants/ui';

interface ParticleIconProps {
  icon: React.ReactNode;
  href: string;
}

const ParticleIcon = ({ icon, href }: ParticleIconProps) => {
  const iconRef = useRef<HTMLAnchorElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const icon = iconRef.current;
    const particles = particlesRef.current;
    if (!icon || !particles) return;

    const createParticles = () => {
      particles.innerHTML = '';

      for (let i = 0; i < PARTICLE_ANIMATION.NUM_PARTICLES; i++) {
        const particle = document.createElement('div');
        particle.className = STYLES.PARTICLE.BASE;
        particles.appendChild(particle);
      }
    };

    const animateParticles = () => {
      const particleElements = particles.children;
      
      gsap.to(icon, {
        scale: PARTICLE_ANIMATION.SCALE_UP,
        duration: PARTICLE_ANIMATION.SCALE_DURATION,
      });

      Array.from(particleElements).forEach((particle, i) => {
        const angle = (i / particleElements.length) * Math.PI * 2;
        
        gsap.set(particle, {
          opacity: 1,
          x: 0,
          y: 0,
        });

        gsap.to(particle, {
          x: Math.cos(angle) * PARTICLE_ANIMATION.PARTICLE_RADIUS,
          y: Math.sin(angle) * PARTICLE_ANIMATION.PARTICLE_RADIUS,
          opacity: 0,
          duration: PARTICLE_ANIMATION.PARTICLE_DURATION,
          ease: 'power2.out',
        });
      });
    };

    const resetParticles = () => {
      gsap.to(icon, {
        scale: 1,
        duration: PARTICLE_ANIMATION.SCALE_DURATION,
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
        ref={iconRef}
      >
        {icon}
      </a>
    </div>
  );
};

export default ParticleIcon; 