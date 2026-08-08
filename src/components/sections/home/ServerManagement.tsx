'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag } from '@/components/ui/tag';
import { Card } from '@/components/ui/card';
import homeData from '@/data/home.json';

const serverManagementData = homeData.sections.serverManagement;

export default function ServerManagement() {
  const [activeIndex, setActiveIndex] = useState(0);
  const features = serverManagementData.features;

  const handleCardClick = (index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
  };

  const activeFeature = features[activeIndex];

  return (
    <section className="py-20 bg-pageBg overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          <div className="w-full lg:w-[40%] flex-shrink-0">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Tag variant="brand" className="mb-4">{serverManagementData.tag}</Tag>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-text-heading mb-3"
            >
              {serverManagementData.heading}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-text-muted text-base mb-8"
            >
              {serverManagementData.subheading}
            </motion.p>

            <div className="space-y-3">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                >
                  <Card 
                    active={activeIndex === index}
                    onClick={() => handleCardClick(index)}
                    className="p-4"
                  >
                    <h4 className={`text-base font-semibold transition-colors duration-300 ${
                      activeIndex === index ? 'text-brand' : 'text-text-heading'
                    }`}>
                      {feature.title}
                    </h4>
                    
                    <AnimatePresence mode="wait">
                      {activeIndex === index && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-text-body text-sm font-normal leading-[1.6] mt-2 overflow-hidden"
                        >
                          {feature.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-[60%] flex-shrink-0">
            <div className="relative p-[1px] rounded-2xl overflow-hidden">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/10 via-white/5 to-transparent"></div>
              <div className="relative bg-cardBg rounded-2xl overflow-hidden aspect-[4/3] w-full flex items-center justify-center">
                {activeFeature.panelImage ? (
                  <img 
                    src={activeFeature.panelImage}
                    alt={activeFeature.title}
                    className="w-full h-full object-cover object-center select-none pointer-events-none"
                    draggable="false"
                    onContextMenu={(e) => e.preventDefault()}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-center p-8 w-full h-full">
                    <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-heading/10 select-none leading-none">
                      900 × 1200
                    </span>
                  </div>
                )}
                <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-pageBg to-transparent pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}