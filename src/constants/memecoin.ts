export const MEMECOIN_DATA = {
  NAME: 'RUG2',
  SYMBOL: '$RUG2',
  DESCRIPTION: 'The Ultimate Memecoin for Web3 Enthusiasts',
  CONTRACT_ADDRESS: 'DfgT54GdfgER4536fghGFH567hgfhgf45645gfhgfhfg',  // Replace with actual Solana address
  DECIMALS: 9, // Solana uses 9 decimals
  TOTAL_SUPPLY: '1,000,000,000',
  NETWORK: 'Solana',
} as const;

export const TOKENOMICS = {
  LIQUIDITY_POOL: '80%',
  MARKETING: '10%',
  TEAM: '5%',
  DEVELOPMENT: '5%',
  TAX: {
    BUY: '0%',
    SELL: '0%',
  },
} as const;

export const SOCIAL_LINKS = {
  TWITTER: 'https://twitter.com/rug2_sol',
  TELEGRAM: 'https://t.me/rug2_sol',
  MEDIUM: 'https://medium.com/@rug2',
  GITHUB: 'https://github.com/rug2-sol',
} as const; 