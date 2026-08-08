'use client';

import { motion } from 'framer-motion';
import { 
  FaShoppingCart
} from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tag } from '@/components/ui/tag';
import vpsData from '@/data/vps.json';
import { useCurrency } from '@/context/CurrencyContext';

interface VPSPlanCardsProps {
  selectedProcessor: string;
  billingCycle: 'monthly' | 'yearly';
}

export default function VPSPlanCards({ 
  selectedProcessor, 
  billingCycle 
}: VPSPlanCardsProps) {
  const allPlans = vpsData.vps.plans;
  const { convertPrice, getSymbol } = useCurrency();
  
  const filteredPlans = allPlans.filter(plan => {
    const processorMatch = selectedProcessor === 'all' || plan.processor === selectedProcessor;
    return processorMatch;
  });

  const getPrice = (plan: any) => {
    return billingCycle === 'monthly' ? plan.price : plan.yearlyPrice;
  };

  const priceSuffix = billingCycle === 'monthly' ? 'mo' : 'yr';

  const getOrderUrl = (plan: any) => {
    const baseUrl = plan.orderUrl || '#';
    const separator = baseUrl.includes('?') ? '&' : '?';
    return `${baseUrl}${separator}cycle=${billingCycle}`;
  };

  if (filteredPlans.length === 0) {
    return (
      <section className="py-16 bg-pageBg">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-text-muted">No plans available for the selected filters.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 bg-pageBg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-5">
          {filteredPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-2.5 left-4 z-10">
                  <Tag variant="brand" className="text-xs px-3 py-1">
                    ★ Popular
                  </Tag>
                </div>
              )}
              
              <Card 
                className={`p-6 w-full ${
                  plan.popular ? 'border-brand/30' : ''
                }`}
              >
                <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6">
                  
                  <div className="flex items-center gap-4 lg:w-[180px] flex-shrink-0">
                    <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                      <img 
                        src={plan.logo}
                        alt={plan.processor}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </div>
                    <div className="flex flex-col items-start">
                      <h3 className="text-lg font-bold text-text-heading">{plan.name}</h3>
                    </div>
                  </div>

                  <div className="hidden lg:block w-px h-12 bg-white/10 flex-shrink-0"></div>

                  <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    {plan.specs.map((spec, idx) => (
                      <div key={idx} className="flex items-center text-sm text-text-body">
                        <span className="leading-relaxed text-xs sm:text-sm">{spec.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="hidden lg:block w-px h-12 bg-white/10 flex-shrink-0"></div>

                  <div className="flex items-center gap-4 lg:gap-6 w-full lg:w-auto flex-shrink-0 justify-between lg:justify-end">
                    <div className="text-left">
                      <div className="flex items-end gap-1">
                        <span className="text-2xl font-bold text-brand">{getSymbol()}{convertPrice(getPrice(plan))}</span>
                        <span className="text-text-muted text-sm mb-0.5 font-medium">/{priceSuffix}</span>
                      </div>
                      <span className="text-sm text-text-muted">{plan.setupFeeText}</span>
                    </div>
                    <Button 
                      href={getOrderUrl(plan)}
                      className="whitespace-nowrap gap-2 text-sm py-2.5 px-5"
                    >
                      <FaShoppingCart className="w-4 h-4" />
                      Order Now
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}