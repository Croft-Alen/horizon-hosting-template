'use client';

import { motion } from 'framer-motion';
import { Tag } from '@/components/ui/tag';
import vpsData from '@/data/vps.json';

export default function VPSHero() {
  const { heroImage, heading, subheading } = vpsData.vps;

  return (
    <section className="relative min-h-[55vh] flex items-center overflow-hidden bg-pageBg pt-32">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-pageBg/60 via-pageBg/80 to-pageBg" />
        <img 
          src={heroImage} 
          alt="VPS Hosting"
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <Tag variant="brand" className="mb-4">VPS Hosting</Tag>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-text-heading leading-[1.1] mb-4">
            {heading} <br />
            <span className="text-brand">Unleash Your Potential</span>
          </h1>
          <p className="text-lg text-text-body max-w-2xl leading-relaxed">
            {subheading}
          </p>
        </motion.div>
      </div>
    </section>
  );
}