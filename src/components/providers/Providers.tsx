'use client';

import { CurrencyProvider } from '@/context/CurrencyContext';
import { AnnouncementProvider } from '@/context/AnnouncementContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CurrencyProvider>
      <AnnouncementProvider>
        {children}
      </AnnouncementProvider>
    </CurrencyProvider>
  );
}