export const THEME = {
  COLORS: {
    PRIMARY: 'purple-500',
    SECONDARY: 'purple-700',
    ACCENT: 'yellow-400',
    BACKGROUND: 'gray-900',
    TEXT: 'gray-100',
  },
  SPACING: {
    CONTAINER: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    SECTION: 'py-12 sm:py-16 lg:py-20',
  },
} as const;

export const NAVIGATION = {
  MAIN: [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Tokenomics', href: '/tokenomics' },
    { name: 'Roadmap', href: '/roadmap' },
  ],
} as const;

export const STYLES = {
  BUTTON: {
    PRIMARY: 'bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded',
    SECONDARY: 'bg-transparent border-2 border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white font-bold py-2 px-4 rounded',
  },
  PARTICLE: {
    BASE: 'absolute w-1 h-1 bg-purple-500 rounded-full opacity-0',
  },
} as const; 