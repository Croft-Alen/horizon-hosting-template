'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Tag } from '@/components/ui/tag';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import homeData from '@/data/home.json';

const faqData = homeData.sections.faq;
const faqs = faqData.faqs;

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-pageBg overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Tag variant="brand" className="mb-4">{faqData.tag}</Tag>
          <h2 className="text-3xl md:text-4xl font-bold text-text-heading mb-3">
            {faqData.heading}
          </h2>
          <p className="text-text-muted text-base max-w-2xl mx-auto">
            {faqData.subheading}
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Card 
                className="p-4 cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className={`text-base font-medium transition-colors duration-300 ${
                    openIndex === index ? 'text-brand' : 'text-text-heading'
                  }`}>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      'w-5 h-5 text-text-muted flex-shrink-0 transition-transform duration-300',
                      openIndex === index && 'rotate-180 text-brand'
                    )}
                  />
                </div>
                
                <AnimatePresence mode="wait">
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{ height: 'auto', opacity: 1, marginTop: 12 }}
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-text-muted text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}