'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { MEMECOIN_DATA } from '@/constants/memecoin';
import SolanaIcon from './icons/SolanaIcon';

const CABadge = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(MEMECOIN_DATA.CONTRACT_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-4 left-4 z-50"
    >
      <div className="flex flex-col gap-2 rounded-xl bg-[#1C1C1C]/90 p-3 backdrop-blur-sm border border-purple-500/20 shadow-lg">
        <div className="flex items-center gap-2">
          <div className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00FFA3] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00FFA3]" />
          </div>
          <span className="text-sm font-medium text-[#00FFA3]">Contract Address</span>
        </div>
        
        <button
          onClick={handleCopy}
          className="group flex items-center gap-2 rounded-lg bg-[#00FFA3]/5 px-3 py-2 transition-colors hover:bg-[#00FFA3]/10"
        >
          <code className="text-xs font-mono text-[#00FFA3]/80">
            {MEMECOIN_DATA.CONTRACT_ADDRESS.slice(0, 6)}...
            {MEMECOIN_DATA.CONTRACT_ADDRESS.slice(-4)}
          </code>
          <motion.span
            initial={false}
            animate={{ scale: copied ? 1.2 : 1 }}
            className="ml-auto text-xs text-[#00FFA3]"
          >
            {copied ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M17.663 3.118c.225.015.45.032.673.05C19.876 3.298 21 4.604 21 6.109v9.642a3 3 0 01-3 3V16.5c0-5.922-4.576-10.775-10.384-11.217.324-1.132 1.3-2.01 2.548-2.114.224-.019.448-.036.673-.051A3 3 0 0113.5 1.5H15a3 3 0 012.663 1.618zM12 4.5A1.5 1.5 0 0113.5 3H15a1.5 1.5 0 011.5 1.5H12z" clipRule="evenodd" />
                <path d="M3 8.625c0-1.036.84-1.875 1.875-1.875h.375A3.75 3.75 0 019 10.5v1.875c0 1.036.84 1.875 1.875 1.875h1.875A3.75 3.75 0 0116.5 18v2.625c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625v-12z" />
              </svg>
            )}
          </motion.span>
        </button>

        <div className="flex items-center justify-between gap-2 text-xs text-[#00FFA3]/60">
          <div className="flex items-center gap-1.5">
            <SolanaIcon className="w-3.5 h-3.5" />
            <span>Network:</span>
          </div>
          <span className="font-medium">{MEMECOIN_DATA.NETWORK}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default CABadge; 