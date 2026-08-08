'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ColorPalette {
  name: string;
  brand: string;
  brandDark: string;
  brandLight: string;
  pageBg: string;
  cardBg: string;
  textHeading: string;
  textBody: string;
  textMuted: string;
  border: string;
}

interface ThemeContextType {
  currentPalette: string;
  setPalette: (name: string) => void;
  palettes: Record<string, ColorPalette>;
}

const palettes: Record<string, ColorPalette> = {
  default: {
    name: 'Default',
    brand: '#F59E0B',
    brandDark: '#D97706',
    brandLight: '#FBBF24',
    pageBg: '#0B0E14',
    cardBg: '#11151D',
    textHeading: '#FFFFFF',
    textBody: '#D6DAE2',
    textMuted: '#8B93A3',
    border: '#202630',
  },
  ocean: {
    name: 'Ocean',
    brand: '#0EA5E9',
    brandDark: '#0284C7',
    brandLight: '#38BDF8',
    pageBg: '#0C1222',
    cardBg: '#141C33',
    textHeading: '#FFFFFF',
    textBody: '#D6E4F0',
    textMuted: '#8BA3C4',
    border: '#1A2A4A',
  },
  forest: {
    name: 'Forest',
    brand: '#22C55E',
    brandDark: '#16A34A',
    brandLight: '#4ADE80',
    pageBg: '#0A140E',
    cardBg: '#112218',
    textHeading: '#FFFFFF',
    textBody: '#D6E8D6',
    textMuted: '#8BA38B',
    border: '#1A2A1A',
  },
  sunset: {
    name: 'Sunset',
    brand: '#F97316',
    brandDark: '#EA580C',
    brandLight: '#FB923C',
    pageBg: '#140E0A',
    cardBg: '#2A1811',
    textHeading: '#FFFFFF',
    textBody: '#F0DED6',
    textMuted: '#C4A38B',
    border: '#4A2A1A',
  },
  purple: {
    name: 'Purple',
    brand: '#A855F7',
    brandDark: '#7E22CE',
    brandLight: '#C084FC',
    pageBg: '#0E0A14',
    cardBg: '#1A1133',
    textHeading: '#FFFFFF',
    textBody: '#E8D6F0',
    textMuted: '#B48BC4',
    border: '#2A1A4A',
  },
  dark: {
    name: 'Dark',
    brand: '#6B7280',
    brandDark: '#4B5563',
    brandLight: '#9CA3AF',
    pageBg: '#0A0A0A',
    cardBg: '#111111',
    textHeading: '#FFFFFF',
    textBody: '#D1D5DB',
    textMuted: '#6B7280',
    border: '#2A2A2A',
  },
  light: {
    name: 'Light',
    brand: '#3B82F6',
    brandDark: '#2563EB',
    brandLight: '#60A5FA',
    pageBg: '#F8FAFC',
    cardBg: '#FFFFFF',
    textHeading: '#0F172A',
    textBody: '#334155',
    textMuted: '#94A3B8',
    border: '#E2E8F0',
  },
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentPalette, setCurrentPalette] = useState('default');

  useEffect(() => {
    const saved = localStorage.getItem('themePalette');
    if (saved && palettes[saved]) {
      setCurrentPalette(saved);
    }
  }, []);

  const setPalette = (name: string) => {
    if (palettes[name]) {
      setCurrentPalette(name);
      localStorage.setItem('themePalette', name);
      applyPalette(name);
    }
  };

  const applyPalette = (name: string) => {
    const palette = palettes[name];
    if (!palette) return;

    const root = document.documentElement;
    root.style.setProperty('--color-brand', palette.brand);
    root.style.setProperty('--color-brand-dark', palette.brandDark);
    root.style.setProperty('--color-brand-light', palette.brandLight);
    root.style.setProperty('--color-pageBg', palette.pageBg);
    root.style.setProperty('--color-cardBg', palette.cardBg);
    root.style.setProperty('--color-text-heading', palette.textHeading);
    root.style.setProperty('--color-text-body', palette.textBody);
    root.style.setProperty('--color-text-muted', palette.textMuted);
    root.style.setProperty('--color-border', palette.border);
  };

  useEffect(() => {
    applyPalette(currentPalette);
  }, []);

  return (
    <ThemeContext.Provider value={{ currentPalette, setPalette, palettes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}