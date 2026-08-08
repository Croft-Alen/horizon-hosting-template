'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import { Tag } from '@/components/ui/tag';
import homeData from '@/data/home.json';

const locationsData = homeData.sections.locations;
const locations = locationsData.locations;

const fadeInVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const mapFadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 },
  },
};

const dotVariants: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: (index: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.3 + index * 0.08,
    },
  }),
};

export default function Locations() {
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);
  const [tooltipPositions, setTooltipPositions] = useState<{ [key: number]: { top?: string; bottom?: string; left?: string; right?: string; transform?: string } }>({});
  const mapRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tooltipRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleTooltip = (index: number) => {
    setActiveTooltip(activeTooltip === index ? null : index);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeTooltip !== null) {
        const target = event.target as Node;
        const dot = dotRefs.current[activeTooltip];
        const tooltip = tooltipRefs.current[activeTooltip];
        
        if (dot && tooltip && !dot.contains(target) && !tooltip.contains(target)) {
          setActiveTooltip(null);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [activeTooltip]);

  useEffect(() => {
    const adjustTooltipPositions = () => {
      const newPositions: { [key: number]: { top?: string; bottom?: string; left?: string; right?: string; transform?: string } } = {};
      
      tooltipRefs.current.forEach((tooltip, index) => {
        if (!tooltip || !dotRefs.current[index]) return;
        
        const dot = dotRefs.current[index];
        const dotRect = dot?.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        const mapRect = mapRef.current?.getBoundingClientRect();
        
        if (!dotRect || !tooltipRect || !mapRect) return;
        
        const pos: { top?: string; bottom?: string; left?: string; right?: string; transform?: string } = {};
        
        const tooltipLeft = tooltipRect.left;
        const tooltipRight = tooltipRect.right;
        const viewportWidth = window.innerWidth;
        
        if (tooltipLeft < 0) {
          pos.left = '0%';
          pos.transform = 'translateX(0)';
        } else if (tooltipRight > viewportWidth) {
          pos.left = '100%';
          pos.transform = 'translateX(-100%)';
        }
        
        tooltipRefs.current.forEach((otherTooltip, otherIndex) => {
          if (index !== otherIndex && otherTooltip) {
            const otherRect = otherTooltip.getBoundingClientRect();
            
            if (tooltipRect.left < otherRect.right && tooltipRect.right > otherRect.left) {
              if (Math.abs(tooltipRect.top - otherRect.top) < 50) {
                if (index > otherIndex) {
                  pos.top = '100%';
                  pos.bottom = 'auto';
                  pos.transform = 'translateX(-50%)';
                }
              }
            }
          }
        });
        
        if (window.innerWidth < 768) {
          pos.top = '';
          pos.bottom = '100%';
          pos.transform = 'translateX(-50%)';
        }
        
        newPositions[index] = pos;
      });
      
      setTooltipPositions(newPositions);
    };

    const timeout = setTimeout(adjustTooltipPositions, 500);
    window.addEventListener('resize', adjustTooltipPositions);
    
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', adjustTooltipPositions);
    };
  }, []);

  return (
    <section id="locations-section" className="py-20 bg-pageBg overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <motion.div
          variants={fadeInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-8"
        >
          <Tag variant="brand" className="mb-4">{locationsData.tag}</Tag>
          <h2 className="text-3xl md:text-4xl font-bold text-text-heading mb-4">
            {locationsData.heading}
          </h2>
          <p className="text-text-muted text-base max-w-2xl mx-auto">
            {locationsData.subheading}
          </p>
        </motion.div>

        <motion.div
          ref={mapRef}
          variants={mapFadeInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="relative w-full aspect-[16/9] max-w-6xl mx-auto"
        >
          <img 
            src={locationsData.mapImage} 
            alt="World Map" 
            className="w-full h-full object-contain rounded-2xl select-none pointer-events-none"
            draggable="false"
          />
          
          {locations.map((loc, index) => (
            <motion.div
              key={index}
              ref={(el) => { dotRefs.current[index] = el; }}
              custom={index}
              variants={dotVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="absolute group cursor-pointer"
              style={{
                left: `${loc.x}%`,
                top: `${loc.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              onClick={() => toggleTooltip(index)}
            >
              <div className={`w-3 h-3 rounded-full bg-brand shadow-lg shadow-brand/50 transition-all duration-300 ${
                activeTooltip === index ? 'scale-150' : 'scale-100 hover:scale-125'
              }`}>
                <div className="absolute inset-0 rounded-full bg-brand animate-ping opacity-75"></div>
              </div>
              
              {activeTooltip === index && (
                <div 
                  ref={(el) => { tooltipRefs.current[index] = el; }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 pointer-events-none z-50 min-w-[140px]"
                  style={{
                    ...(tooltipPositions[index] || {}),
                  }}
                >
                  <div className="bg-cardBg border border-white/10 rounded-xl px-4 py-2.5 text-center shadow-2xl flex items-center justify-center gap-3 whitespace-nowrap">
                    <img 
                      src={`https://flagcdn.com/40x30/${loc.country}.png`}
                      alt={loc.city}
                      className="w-5 h-3.5 rounded object-cover"
                      loading="lazy"
                      width="40"
                      height="30"
                    />
                    <span className="text-sm font-bold text-text-heading">{loc.city}</span>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}