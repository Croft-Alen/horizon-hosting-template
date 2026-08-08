'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import WebHostingHero from '@/components/sections/web-hosting/WebHostingHero';
import WebHostingFilters from '@/components/sections/web-hosting/WebHostingFilters';
import WebHostingPlanCards from '@/components/sections/web-hosting/WebHostingPlanCards';
import FAQ from '@/components/sections/home/FAQ';
import CTA from '@/components/sections/home/CTA';
import NotFound from '@/components/shared/NotFound';
import webHostingData from '@/data/web-hosting.json';
import navigationData from '@/data/navigation.json';

export default function WebHostingPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isEnabled, setIsEnabled] = useState(true);
  const [selectedType, setSelectedType] = useState('');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  useEffect(() => {
    const otherHostingLink = navigationData.header.links.find(
      (link: any) => link.label === 'Other Hosting'
    );
    
    const isWebEnabled = otherHostingLink?.items.some(
      (item: any) => item.label === 'Web Hosting' && item.enabled !== false
    ) || false;

    setIsEnabled(isWebEnabled);
    
    if (isWebEnabled) {
      const enabledTypes = webHostingData.webHosting.hostingTypes.filter((h: any) => h.enabled);
      if (enabledTypes.length > 0) {
        setSelectedType(enabledTypes[0].id);
      }
    }
    
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div className="min-h-screen bg-pageBg" />;
  }

  if (!isEnabled) {
    return <NotFound />;
  }

  return (
    <>
      <WebHostingHero />
      <WebHostingFilters 
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        billingCycle={billingCycle}
        setBillingCycle={setBillingCycle}
      />
      <WebHostingPlanCards 
        selectedType={selectedType}
        billingCycle={billingCycle}
      />
      <FAQ />
      <CTA />
    </>
  );
}