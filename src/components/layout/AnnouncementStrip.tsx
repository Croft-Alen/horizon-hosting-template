'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import navigationData from '@/data/navigation.json';

interface AnnouncementContextType {
  isVisible: boolean;
  closeAnnouncement: () => void;
}

const AnnouncementContext = createContext<AnnouncementContextType | undefined>(undefined);

export function AnnouncementProvider({ children }: { children: ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedState = localStorage.getItem('announcementClosed');
    const shouldShow = navigationData.announcement.enabled && savedState !== 'true';
    setIsVisible(shouldShow);
    setIsLoading(false);
  }, []);

  const closeAnnouncement = () => {
    setIsVisible(false);
    localStorage.setItem('announcementClosed', 'true');
  };

  if (isLoading) {
    return <>{children}</>;
  }

  return (
    <AnnouncementContext.Provider value={{ isVisible, closeAnnouncement }}>
      {children}
    </AnnouncementContext.Provider>
  );
}

export function useAnnouncement() {
  const context = useContext(AnnouncementContext);
  if (context === undefined) {
    // Return default values instead of throwing error for SSR/static generation
    return { isVisible: false, closeAnnouncement: () => {} };
  }
  return context;
}