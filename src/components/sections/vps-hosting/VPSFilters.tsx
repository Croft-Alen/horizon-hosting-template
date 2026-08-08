'use client';

import { Tag } from '@/components/ui/tag';
import vpsData from '@/data/vps.json';

interface VPSFiltersProps {
  selectedProcessor: string;
  setSelectedProcessor: (processor: string) => void;
  billingCycle: 'monthly' | 'yearly';
  setBillingCycle: (cycle: 'monthly' | 'yearly') => void;
}

export default function VPSFilters({
  selectedProcessor,
  setSelectedProcessor,
  billingCycle,
  setBillingCycle
}: VPSFiltersProps) {
  const availableCycles = vpsData.vps.billingCycles || ['monthly', 'yearly'];
  const showBillingToggle = availableCycles.length > 1;

  return (
    <section className="py-5 bg-pageBg border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedProcessor('all')}
              className="focus:outline-none"
            >
              <Tag 
                variant={selectedProcessor === 'all' ? 'brand' : 'dark'}
                className="text-sm px-5 py-2 cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-2"
              >
                All
              </Tag>
            </button>
            <button
              onClick={() => setSelectedProcessor('intel')}
              className="focus:outline-none"
            >
              <Tag 
                variant={selectedProcessor === 'intel' ? 'brand' : 'dark'}
                className="text-sm px-5 py-2 cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-2"
              >
                <img 
                  src="/images/plans-logo/intel-logo.png" 
                  alt="Intel" 
                  className="w-5 h-5 object-contain"
                />
                Intel
              </Tag>
            </button>
            <button
              onClick={() => setSelectedProcessor('amd')}
              className="focus:outline-none"
            >
              <Tag 
                variant={selectedProcessor === 'amd' ? 'brand' : 'dark'}
                className="text-sm px-5 py-2 cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-2"
              >
                <img 
                  src="/images/plans-logo/amd-logo.png" 
                  alt="AMD" 
                  className="w-4 h-4 object-contain"
                />
                AMD
              </Tag>
            </button>
          </div>

          {/* Billing Cycle Toggle - Only show if both cycles are available */}
          {showBillingToggle && (
            <div className="flex items-center gap-1 bg-cardBg rounded-full p-1">
              {availableCycles.includes('monthly') && (
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className="focus:outline-none"
                >
                  <Tag 
                    variant={billingCycle === 'monthly' ? 'brand' : 'dark'}
                    className="text-sm px-5 py-2 cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    Monthly
                  </Tag>
                </button>
              )}
              {availableCycles.includes('yearly') && (
                <button
                  onClick={() => setBillingCycle('yearly')}
                  className="focus:outline-none"
                >
                  <Tag 
                    variant={billingCycle === 'yearly' ? 'brand' : 'dark'}
                    className="text-sm px-5 py-2 cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    Yearly
                  </Tag>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}