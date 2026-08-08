'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TermsHero from '@/components/sections/terms/TermsHero';
import NotFound from '@/components/shared/NotFound';
import termsData from '@/data/terms.json';
import navigationData from '@/data/navigation.json';

export default function TermsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isEnabled, setIsEnabled] = useState(true);
  const sections = termsData.terms.sections;

  useEffect(() => {
    // Check if Terms of Service is enabled in navigation
    const legalLink = navigationData.header.links.find((l: any) => l.label === 'Legal');
    const termsItem = legalLink?.items.find((item: any) => item.label === 'Terms of Service');
    const enabled = termsItem?.enabled !== false;
    
    setIsEnabled(enabled);
    setIsLoading(false);
  }, []);

  // Show loading state while checking
  if (isLoading) {
    return <div className="min-h-screen bg-pageBg" />;
  }

  // Show 404 if Terms of Service is disabled
  if (!isEnabled) {
    return <NotFound />;
  }

  return (
    <>
      <TermsHero />
      
      <section className="py-16 bg-pageBg pb-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="terms-content"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-text-heading mb-4">
                  {section.title}
                </h2>
                <div dangerouslySetInnerHTML={{ __html: section.content }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}