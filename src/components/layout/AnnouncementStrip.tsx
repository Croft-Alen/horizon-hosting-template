'use client';

import { FaTimes } from 'react-icons/fa';
import { useAnnouncement } from '@/context/AnnouncementContext';
import navigationData from '@/data/navigation.json';

export default function AnnouncementStrip() {
  const { isVisible, closeAnnouncement } = useAnnouncement();
  const { announcement } = navigationData;

  if (!announcement.enabled || !isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-brand text-pageBg text-sm font-medium h-10 flex items-center px-4">
      <div className="container mx-auto text-center relative">
        <span className="font-semibold">{announcement.text}</span>
        <button
          onClick={closeAnnouncement}
          className="absolute right-0 top-1/2 -translate-y-1/2 text-pageBg/70 hover:text-pageBg transition-colors"
        >
          <FaTimes className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}