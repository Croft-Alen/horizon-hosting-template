'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Tag } from '@/components/ui/tag';
import { Card } from '@/components/ui/card';
import homeData from '@/data/home.json';

const testimonialsData = homeData.sections.testimonials;
const testimonials = testimonialsData.testimonials;

export default function Testimonials() {
  const featuredTestimonial = testimonials[0];
  const regularTestimonials = testimonials.slice(1);

  return (
    <section className="py-20 bg-pageBg overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Tag variant="brand" className="mb-4">{testimonialsData.tag}</Tag>
          <h2 className="text-3xl md:text-4xl font-bold text-text-heading mb-3">
            {testimonialsData.heading}
          </h2>
          <p className="text-text-muted text-base max-w-2xl mx-auto">
            {testimonialsData.subheading}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <Card className="p-6 h-full flex flex-col min-h-[320px]">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-brand text-brand" />
                ))}
              </div>
              
              <Quote className="w-8 h-8 text-brand/40 mb-4" />
              
              <p className="text-text-body text-base leading-relaxed flex-1">
                &ldquo;{featuredTestimonial.content}&rdquo;
              </p>
              
              <div className="border-t border-white/10 my-4"></div>
              
              <div className="flex items-center gap-3">
                <img 
                  src={featuredTestimonial.avatar} 
                  alt={featuredTestimonial.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="text-text-heading font-semibold text-sm">
                    {featuredTestimonial.name}
                  </div>
                  <div className="text-text-muted text-xs">
                    {featuredTestimonial.role}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {regularTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * (index + 1) }}
              >
                <Card className="p-5 h-full flex flex-col min-h-[270px]">
                  <div className="flex items-center gap-0.5 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-brand text-brand" />
                    ))}
                  </div>
                  
                  <p className="text-text-body text-base leading-relaxed flex-1">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                  
                  <div className="border-t border-white/10 my-3"></div>
                  
                  <div className="flex items-center gap-3">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-text-heading font-semibold text-sm">
                        {testimonial.name}
                      </div>
                      <div className="text-text-muted text-xs">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}