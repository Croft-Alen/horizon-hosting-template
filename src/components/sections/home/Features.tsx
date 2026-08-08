'use client';

import { motion, Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tag } from '@/components/ui/tag';
import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/Icon';
import homeData from '@/data/home.json';

const featuresData = homeData.sections.features;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeInVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const slideLeftVariants: Variants = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 },
  },
};

const slideRightVariants: Variants = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 },
  },
};

const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Features() {
  const features = featuresData.features;

  return (
    <section id="features-section" className="py-16 bg-pageBg overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          variants={fadeInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-12"
        >
          <Tag variant="brand" className="mb-4">{featuresData.tag}</Tag>
          <h2 className="text-3xl md:text-4xl font-bold text-text-heading mb-3">
            {featuresData.heading}
          </h2>
          <p className="text-text-muted text-base max-w-2xl mx-auto">
            {featuresData.subheading}
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-4"
        >
          <motion.div
            variants={slideLeftVariants}
            className="md:col-span-4"
          >
            <Card className="p-8 flex flex-col justify-start min-h-[280px] h-full">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-brand text-pageBg font-semibold border border-black/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_6px_12px_rgba(0,0,0,0.25)] transition-all duration-150 select-none mb-5">
                <Icon name={features[0].icon} size="xl" />
              </div>
              <h3 className="text-xl font-bold text-text-heading mb-2">{features[0].title}</h3>
              <p className="text-text-muted text-base leading-relaxed mb-6">{features[0].description}</p>
              <div className="mt-auto">
                <Button 
                  href={features[0].buttonLink} 
                  className="inline-flex w-auto px-4 py-2 text-sm gap-2"
                  variant="primary"
                  size="sm"
                >
                  <span>{features[0].buttonText}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                  </svg>
                </Button>
              </div>
            </Card>
          </motion.div>

          <div className="md:col-span-4 flex flex-col gap-4">
            <motion.div
              variants={slideUpVariants}
              custom={0}
              className="flex-1"
            >
              <Card className="p-6 min-h-[130px] h-full">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand text-pageBg font-semibold border border-black/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_6px_12px_rgba(0,0,0,0.25)] transition-all duration-150 select-none mb-3">
                  <Icon name={features[1].icon} size="md" />
                </div>
                <h3 className="text-lg font-bold text-text-heading mb-1.5">{features[1].title}</h3>
                <p className="text-text-muted text-base leading-relaxed">{features[1].description}</p>
              </Card>
            </motion.div>

            <motion.div
              variants={slideUpVariants}
              custom={1}
              className="flex-1"
            >
              <Card className="p-6 min-h-[130px] h-full">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand text-pageBg font-semibold border border-black/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_6px_12px_rgba(0,0,0,0.25)] transition-all duration-150 select-none mb-3">
                  <Icon name={features[2].icon} size="md" />
                </div>
                <h3 className="text-lg font-bold text-text-heading mb-1.5">{features[2].title}</h3>
                <p className="text-text-muted text-base leading-relaxed">{features[2].description}</p>
              </Card>
            </motion.div>
          </div>

          <motion.div
            variants={slideRightVariants}
            className="md:col-span-4"
          >
            <Card className="p-8 flex flex-col min-h-[280px] h-full relative overflow-hidden">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-brand text-pageBg font-semibold border border-black/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_6px_12px_rgba(0,0,0,0.25)] transition-all duration-150 select-none mb-5">
                <Icon name={features[3].icon} size="xl" />
              </div>
              <h3 className="text-xl font-bold text-text-heading mb-2">{features[3].title}</h3>
              <p className="text-text-muted text-base leading-relaxed mb-4">{features[3].description}</p>
              
              {features[3].mapImage && (
                <div className="mt-auto w-full -mx-8 -mb-8">
                  <img 
                    src={features[3].mapImage} 
                    alt="Features Map" 
                    className="w-[200%] h-auto object-cover scale-150 origin-bottom"
                    draggable="false"
                    onContextMenu={(e) => e.preventDefault()}
                  />
                </div>
              )}
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}