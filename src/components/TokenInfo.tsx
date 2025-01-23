'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useState } from 'react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimatedCounterProps {
  value: number;
  label: string;
}

const AnimatedCounter = ({ value, label }: AnimatedCounterProps) => {
  const counterRef = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    const target = value;
    const duration = 2;
    const steps = 60;
    const stepDuration = duration * 1000 / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const currentValue = Math.floor(target * progress);
      setDisplayValue(currentValue.toLocaleString());

      if (currentStep === steps) {
        clearInterval(interval);
        setDisplayValue(value.toLocaleString());
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [value]);

  return (
    <div className="text-center">
      <div ref={counterRef} className="text-4xl md:text-5xl font-bold text-purple-400">
        {displayValue}
      </div>
      <div className="text-gray-400 mt-2">{label}</div>
    </div>
  );
};

const TokenInfo = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });
  const [copied, setCopied] = useState(false);
  const contractAddress = "2Gp8G4XTwoCvfJNNXTLUAtErqwT8HtfYGGFM5piBpump";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const features = [
    {
      icon: "🚀",
      title: "Community Driven",
      description: "Built by the community, for the community."
    },
    {
      icon: "🔒",
      title: "Secure & Transparent",
      description: "Contract verified and audited."
    },
    {
      icon: "💎",
      title: "Long-term Vision",
      description: "Building a lasting ecosystem."
    },
    {
      icon: "📈",
      title: "Growth Potential",
      description: "Continuous development and expansion."
    }
  ];

  return (
    <section ref={ref} className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
          >
            <AnimatedCounter value={15000} label="Total Holders" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
          >
            <AnimatedCounter value={1000000} label="Market Cap" />
          </motion.div>
        </div>

        {/* Contract Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 mb-16"
        >
          <h3 className="text-2xl font-bold text-purple-400 mb-6">Contract Details</h3>
          <div className="space-y-4">
            <div>
              <div className="text-gray-400 mb-2">Contract Address (CA)</div>
              <div className="flex items-center gap-4">
                <code className="flex-1 bg-black/20 rounded-lg p-4 font-mono text-sm text-gray-300 overflow-x-auto">
                  {contractAddress}
                </code>
                <button
                  onClick={handleCopy}
                  className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg transition-colors duration-300"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black/20 rounded-lg p-4">
                <div className="text-gray-400 mb-1">Total Supply</div>
                <div className="text-xl font-bold text-white">1,000,000,000</div>
              </div>
              <div className="bg-black/20 rounded-lg p-4">
                <div className="text-gray-400 mb-1">Network</div>
                <div className="text-xl font-bold text-white">Solana</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Buy Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300">
            Buy LUNA Token
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default TokenInfo; 