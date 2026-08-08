import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: '#F59E0B',
        brandDark: '#D97706',
        brandLight: '#FBBF24',
        pageBg: '#0B0E14',
        cardBg: '#cf1a1a',
        text: {
          heading: '#FFFFFF',
          body: '#E2E8F0',
          muted: '#94A3B8',
        },
        border: '#2A2A2A',
      },
      fontFamily: {
        sans: ['var(--font-space-grotesk)', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;