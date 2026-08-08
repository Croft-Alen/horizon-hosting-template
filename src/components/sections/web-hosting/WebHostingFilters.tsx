'use client';

import { Tag } from '@/components/ui/tag';
import webHostingData from '@/data/web-hosting.json';

interface WebHostingFiltersProps {
  selectedType: string;
  setSelectedType: (type: string) => void;
  billingCycle: 'monthly' | 'yearly';
  setBillingCycle: (cycle: 'monthly' | 'yearly') => void;
}

export default function WebHostingFilters({
  selectedType,
  setSelectedType,
  billingCycle,
  setBillingCycle
}: WebHostingFiltersProps) {
  const hostingTypes = webHostingData.webHosting.hostingTypes.filter(h => h.enabled);

  // Get available cycles from the selected hosting type
  const selectedHosting = webHostingData.webHosting.hostingTypes.find(h => h.id === selectedType && h.enabled);
  const availableCycles = selectedHosting?.billingCycles || ['monthly', 'yearly'];
  const showBillingToggle = availableCycles.length > 1;

  if (hostingTypes.length === 0) {
    return (
      <section className="py-6 bg-pageBg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-text-muted">No hosting types enabled. Please check your configuration.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-5 bg-pageBg border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          
          <div className="flex flex-wrap items-center gap-2">
            {hostingTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className="focus:outline-none"
              >
                <Tag 
                  variant={selectedType === type.id ? 'brand' : 'dark'}
                  className="text-sm px-5 py-2 cursor-pointer hover:opacity-80 transition-opacity"
                >
                  {type.name}
                </Tag>
              </button>
            ))}
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