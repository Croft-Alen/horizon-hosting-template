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
  resetToDefault: () => void;
}

const defaultColors = {
  pageBg: '#0B0E14',
  cardBg: '#11151D',
  textHeading: '#FFFFFF',
  textBody: '#D6DAE2',
  textMuted: '#8B93A3',
  border: '#202630',
};

const palettes: Record<string, ColorPalette> = {
  default: {
    name: 'Default',
    brand: '#F59E0B',
    brandDark: '#D97706',
    brandLight: '#FBBF24',
    ...defaultColors,
  },
  ocean: {
    name: 'Ocean',
    brand: '#0EA5E9',
    brandDark: '#0284C7',
    brandLight: '#38BDF8',
    ...defaultColors,
  },
  green: {
    name: 'Green',
    brand: '#22C55E',
    brandDark: '#16A34A',
    brandLight: '#4ADE80',
    ...defaultColors,
  },
  purple: {
    name: 'Purple',
    brand: '#7C3AED',
    brandDark: '#5B21B6',
    brandLight: '#8B5CF6',
    ...defaultColors,
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

  const resetToDefault = () => {
    setCurrentPalette('default');
    localStorage.setItem('themePalette', 'default');
    applyPalette('default');
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
    <ThemeContext.Provider value={{ currentPalette, setPalette, palettes, resetToDefault }}>
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