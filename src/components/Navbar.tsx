'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import ParticleIcon from './ParticleIcon';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const navItems = [
  {
    name: 'About',
    href: '#about'
  },
  {
    name: 'Tokenomics',
    href: '#tokenomics'
  },
  {
    name: 'Roadmap',
    href: '#roadmap'
  }
];

const socialIcons = [
  {
    name: 'Twitter',
    href: 'https://twitter.com',
    icon: (
      <svg className="w-6 h-6 text-white/80 hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    )
  },
  {
    name: 'Telegram',
    href: 'https://t.me',
    icon: (
      <svg className="w-6 h-6 text-white/80 hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.93 1.23-5.46 3.62-.51.35-.98.52-1.4.51-.46-.01-1.35-.26-2.01-.48-.81-.27-1.46-.42-1.4-.88.03-.24.38-.49 1.07-.75 4.19-1.82 6.98-3.02 8.38-3.61 3.97-1.68 4.8-1.97 5.33-1.98.12 0 .37.03.54.18.14.12.18.28.2.46-.02.06-.02.11-.02.17z"/>
      </svg>
    )
  },
  {
    name: 'DEXScreener',
    href: 'https://dexscreener.com',
    icon: (
      <svg className="w-6 h-6 text-white/80 hover:text-white transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12h4l2-7 4 14 2-7h6" />
        <rect x="2" y="2" width="20" height="20" rx="2" strokeWidth={1.5} className="opacity-50" />
      </svg>
    )
  },
  {
    name: 'CoinGecko',
    href: 'https://coingecko.com',
    icon: (
      <svg className="w-6 h-6 text-white/80 hover:text-white transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="12" cy="12" r="9" strokeWidth={1.5} />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v8M8 12h8" />
      </svg>
    )
  },
  {
    name: 'Uniswap',
    href: 'https://uniswap.org',
    icon: (
      <svg className="w-6 h-6 text-white/80 hover:text-white transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m0-16c-4.42 0-8 1.79-8 4s3.58 4 8 4m0-8c4.42 0 8 1.79 8 4s-3.58 4-8 4m0 0c-4.42 0-8 1.79-8 4s3.58 4 8 4m0-8c4.42 0 8 1.79 8 4s-3.58 4-8 4" />
      </svg>
    )
  },
  {
    name: 'Etherscan',
    href: 'https://etherscan.io',
    icon: (
      <svg className="w-6 h-6 text-white/80 hover:text-white transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 5.25l-7.5 4.5-7.5-4.5M12 9.75v9M3 5.25v9c0 1.5 3.75 3.75 9 3.75s9-2.25 9-3.75v-9" />
      </svg>
    )
  },
];

const Navbar = () => {
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // Height of the fixed navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const header = headerRef.current;
    const logo = logoRef.current;

    if (!header || !logo) return;

    // Initial animation
    gsap.from(header, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: 'power4.out',
    });

    // Logo hover animation setup
    const logoHoverAnimation = gsap.to(logo, {
      scale: 1.1,
      duration: 0.3,
      paused: true,
      ease: 'power2.out',
    });

    logo.addEventListener('mouseenter', () => logoHoverAnimation.play());
    logo.addEventListener('mouseleave', () => logoHoverAnimation.reverse());

    // Scroll animation
    ScrollTrigger.create({
      start: 'top-=100',
      onUpdate: (self) => {
        const scrolled = self.progress > 0;
        header.style.backgroundColor = scrolled 
          ? 'rgba(0, 0, 0, 0.9)' 
          : 'transparent';
        header.style.backdropFilter = scrolled 
          ? 'blur(10px)' 
          : 'blur(0px)';
      },
    });

    return () => {
      logo.removeEventListener('mouseenter', () => logoHoverAnimation.play());
      logo.removeEventListener('mouseleave', () => logoHoverAnimation.reverse());
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      <nav className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div ref={logoRef} className="relative w-48 h-12">
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="SkullAI Logo"
                fill
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.5 }}
              >
                <Link
                  href={item.href}
                  onClick={(e) => handleScroll(e, item.href)}
                  className="text-white hover:text-purple-400 transition-colors duration-300 relative group text-sm font-medium"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-600 group-hover:w-full transition-all duration-300" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Social Icons with Particle Effects */}
          <div className="hidden md:flex items-center space-x-4">
            {socialIcons.map((social, index) => (
              <motion.div
                key={social.name}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + 0.8 }}
                className="social-icon-wrapper"
              >
                <ParticleIcon
                  icon={social.icon}
                  href={social.href}
                />
              </motion.div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-white hover:text-purple-400 transition-colors duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu (Hidden by default) */}
      <div className="hidden md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={(e) => handleScroll(e, item.href)}
              className="text-white hover:text-purple-400 block px-3 py-2 text-base font-medium"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar; 