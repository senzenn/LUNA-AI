'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="relative bg-black/40 backdrop-blur-lg py-20">
      {/* Skull Image */}
      <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] opacity-30 pointer-events-none">
        <Image
          src="/skull-neon.png"
          alt="Neon Skull"
          fill
          className="object-contain animate-pulse mix-blend-screen"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link href="/" className="block w-48">
              <Image
                src="/logo.svg"
                alt="SkullAI Logo"
                width={200}
                height={50}
                className="object-contain"
              />
            </Link>
            <p className="text-gray-400 text-sm">
              Revolutionizing AI technology with secure, decentralized solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#about" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                  About
                </Link>
              </li>
              <li>
                <Link href="#tokenomics" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                  Tokenomics
                </Link>
              </li>
              <li>
                <Link href="#roadmap" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              {/* Add your social icons here */}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} SkullAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 