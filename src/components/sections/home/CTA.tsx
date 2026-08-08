'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import homeData from '@/data/home.json';

const ctaData = homeData.sections.cta;

export default function CTA() {
  return (
    <section className="py-20 bg-pageBg overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-4xl font-bold text-text-heading">
              {ctaData.heading}
            </h3>
            
            <p className="text-text-muted text-base md:text-lg mt-3 max-w-2xl mx-auto">
              {ctaData.description}
            </p>
            
            <div className="flex justify-center mt-6">
              <Button
                href={ctaData.buttonLink}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="md"
                className="group"
              >
                <span>{ctaData.buttonText}</span>
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}