'use client';

import { motion } from 'framer-motion';
import { 
  FaMicrochip, 
  FaMemory, 
  FaHdd, 
  FaUsers, 
  FaShieldAlt, 
  FaHeadset,
  FaShoppingCart
} from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tag } from '@/components/ui/tag';
import gamesData from '@/data/games.json';
import { useCurrency } from '@/context/CurrencyContext';

interface PlanCardsProps {
  gameId: string;
  billingCycle: 'monthly' | 'yearly';
}

const specIcons: { [key: string]: React.ReactNode } = {
  ram: <FaMemory className="w-4 h-4" />,
  cpu: <FaMicrochip className="w-4 h-4" />,
  storage: <FaHdd className="w-4 h-4" />,
  players: <FaUsers className="w-4 h-4" />,
  shield: <FaShieldAlt className="w-4 h-4" />,
  support: <FaHeadset className="w-4 h-4" />
};

export default function PlanCards({ gameId, billingCycle }: PlanCardsProps) {
  const game = gamesData.games.find(g => g.id === gameId);
  const { convertPrice, getSymbol } = useCurrency();
  
  if (!game) {
    return (
      <section className="py-20 bg-pageBg">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-text-muted">Game not found</p>
        </div>
      </section>
    );
  }

  const getPrice = (plan: any) => {
    return billingCycle === 'monthly' ? plan.price : plan.yearlyPrice;
  };

  const priceSuffix = billingCycle === 'monthly' ? 'month' : 'year';

  const getOrderUrl = (plan: any) => {
    const baseUrl = plan.orderUrl || '#';
    const separator = baseUrl.includes('?') ? '&' : '?';
    return `${baseUrl}${separator}cycle=${billingCycle}`;
  };

  return (
    <section className="py-10 bg-pageBg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {game.plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 z-10">
                  <Tag variant="brand" className="text-xs px-3 py-1">
                    ★ Popular
                  </Tag>
                </div>
              )}
              
              <Card className="p-5 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 flex items-center justify-center flex-shrink-0">
                    <img 
                      src={plan.logo}
                      alt={plan.name}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                  <h3 className="text-lg font-bold text-text-heading">{plan.name}</h3>
                </div>

                <div className="mb-3">
                  <div className="flex items-end gap-1">
                    <span className="text-2xl font-bold text-brand">{getSymbol()}{convertPrice(getPrice(plan))}</span>
                    <span className="text-text-muted text-sm mb-0.5 font-medium">/{priceSuffix}</span>
                  </div>
                </div>

                <div className="border-t border-white/10 my-2.5"></div>

                <div className="space-y-3 mb-5 flex-grow">
                  {plan.specs.map((spec, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm text-text-body">
                      <span className="text-brand w-4 flex-shrink-0 flex items-center justify-center">
                        {specIcons[spec.icon] || <FaMicrochip className="w-4 h-4" />}
                      </span>
                      <span className="leading-relaxed">{spec.label}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  href={getOrderUrl(plan)}
                  className="w-full justify-center gap-2 text-sm py-2.5"
                >
                  <FaShoppingCart className="w-4 h-4" />
                  Order Now
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}