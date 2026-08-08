'use client';

import { useState, useRef, useEffect } from 'react';
import { FaPalette, FaTimes, FaCheck } from 'react-icons/fa';
import { useTheme } from '@/context/ThemeContext';

export default function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentPalette, setPalette, palettes } = useTheme();
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handlePaletteSelect = (paletteName: string) => {
    setPalette(paletteName);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50" ref={popupRef}>
      {/* Floating Button */}
      <button
        onClick={toggleOpen}
        className="w-12 h-12 rounded-full bg-brand text-pageBg flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 border border-black/20"
        aria-label="Theme Switcher"
      >
        {isOpen ? (
          <FaTimes className="w-5 h-5" />
        ) : (
          <FaPalette className="w-5 h-5" />
        )}
      </button>

      {/* Popup */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-cardBg rounded-2xl shadow-2xl border border-white/10 p-4 w-[280px] max-h-[400px] overflow-y-auto">
          <h3 className="text-sm font-semibold text-text-heading mb-3">Choose Theme</h3>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(palettes).map(([key, palette]) => (
              <button
                key={key}
                onClick={() => handlePaletteSelect(key)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                  currentPalette === key
                    ? 'bg-brand/20 text-brand border border-brand/30'
                    : 'text-text-body hover:bg-white/5 border border-transparent'
                }`}
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: palette.brand }} />
                </div>
                <span className="flex-1 text-left">{palette.name}</span>
                {currentPalette === key && <FaCheck className="w-3 h-3 text-brand" />}
              </button>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-white/5">
            <p className="text-xs text-text-muted text-center">Demo Mode - Changes are local</p>
          </div>
        </div>
      )}
    </div>
  );
}