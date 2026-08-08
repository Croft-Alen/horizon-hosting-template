'use client';

import { motion } from 'framer-motion';
import { Tag } from '@/components/ui/tag';
import privacyData from '@/data/privacy.json';

export default function PrivacyHero() {
  const { heroImage, heading, subheading, lastUpdated } = privacyData.privacy;

  return (
    <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden bg-pageBg pt-40 md:pt-44">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-pageBg/60 via-pageBg/80 to-pageBg" />
        <img 
          src={heroImage} 
          alt="Privacy Policy"
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Tag variant="brand" className="mb-4 inline-block">Legal</Tag>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-text-heading leading-[1.1] mb-4">
            {heading}
          </h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
            {subheading}
          </p>
          <p className="text-sm text-brand font-medium mt-4">
            Last Updated: {lastUpdated}
          </p>
        </motion.div>
      </div>
    </section>
  );
}