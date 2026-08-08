'use client';

import { CurrencyProvider } from '@/context/CurrencyContext';
import { AnnouncementProvider } from '@/context/AnnouncementContext';
import { ThemeProvider } from '@/context/ThemeContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CurrencyProvider>
      <AnnouncementProvider>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </AnnouncementProvider>
    </CurrencyProvider>
  );
}