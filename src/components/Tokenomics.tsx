'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface TokenAllocationProps {
  title: string;
  percentage: number;
  description: string;
  gradientFrom: string;
  gradientTo: string;
}

const TokenAllocation = ({ title, percentage, description, gradientFrom, gradientTo }: TokenAllocationProps) => {
  const progressRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView && progressRef.current) {
      gsap.to(progressRef.current, {
        width: `${percentage}%`,
        duration: 1.5,
        ease: "power2.out"
      });
    }
  }, [inView, percentage]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-all duration-300"
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          {percentage}%
        </span>
      </div>
      <div className="h-3 bg-black/50 rounded-full overflow-hidden mb-3">
        <div
          ref={progressRef}
          className="h-full rounded-full transition-all duration-1000"
          style={{
            width: "0%",
            background: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`
          }}
        />
      </div>
      <p className="text-gray-400 text-sm">{description}</p>
    </motion.div>
  );
};

const Tokenomics = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const allocations = [
    {
      title: "Presale",
      percentage: 40,
      description: "Initial token distribution through public and private sales to early supporters and investors.",
      gradientFrom: "#9333EA",
      gradientTo: "#EC4899"
    },
    {
      title: "Liquidity",
      percentage: 30,
      description: "Locked liquidity to ensure stable trading and long-term sustainability.",
      gradientFrom: "#8B5CF6",
      gradientTo: "#EC4899"
    },
    {
      title: "Development",
      percentage: 20,
      description: "Reserved for ongoing platform development, technical improvements, and innovation.",
      gradientFrom: "#7C3AED",
      gradientTo: "#EC4899"
    },
    {
      title: "Marketing",
      percentage: 10,
      description: "Allocated for marketing initiatives, partnerships, and community growth.",
      gradientFrom: "#6D28D9",
      gradientTo: "#EC4899"
    }
  ];

  const additionalInfo = [
    {
      title: "Token Utility",
      description: "NELIN tokens power the ecosystem, providing governance rights and platform benefits.",
      icon: "⚡"
    },
    {
      title: "Vesting Schedule",
      description: "Strategic vesting periods to ensure long-term project stability and growth.",
      icon: "🔒"
    },
    {
      title: "Burn Mechanism",
      description: "Regular token burns to maintain deflationary economics.",
      icon: "🔥"
    },
    {
      title: "Staking Rewards",
      description: "Earn passive income by staking NELIN tokens.",
      icon: "💎"
    }
  ];

  return (
    <section id="tokenomics" ref={ref} className="relative min-h-screen py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/10 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-6">
            Tokenomics
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Our tokenomics are designed to ensure sustainable growth and value for all stakeholders
          </p>
        </motion.div>

        {/* Token Allocations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {allocations.map((allocation, index) => (
            <TokenAllocation
              key={allocation.title}
              {...allocation}
            />
          ))}
        </div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {additionalInfo.map((info, index) => (
            <div
              key={info.title}
              className="bg-black/40 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-purple-500/30 transition-all duration-300"
            >
              <div className="text-3xl mb-4">{info.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{info.title}</h3>
              <p className="text-gray-400 text-sm">{info.description}</p>
            </div>
          ))}
        </motion.div>

        {/* Creative Buy Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <button className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-500 ease-out overflow-hidden rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-105">
            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-80 group-hover:h-80 opacity-10"></span>
            <span className="relative flex items-center">
              Buy NELIN Token
              <svg
                className="w-6 h-6 ml-2 transform transition-transform duration-500 ease-out group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </button>
        </motion.div>

        {/* Token Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-black/40 backdrop-blur-md rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-2">Initial Supply</h3>
            <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              1,000,000,000
            </p>
          </div>
          <div className="bg-black/40 backdrop-blur-md rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-2">Max Supply</h3>
            <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              1,000,000,000
            </p>
          </div>
          <div className="bg-black/40 backdrop-blur-md rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-2">Network</h3>
            <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Solana
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Tokenomics; 