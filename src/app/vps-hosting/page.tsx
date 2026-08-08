'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import VPSHero from '@/components/sections/vps-hosting/VPSHero';
import VPSFilters from '@/components/sections/vps-hosting/VPSFilters';
import VPSPlanCards from '@/components/sections/vps-hosting/VPSPlanCards';
import FAQ from '@/components/sections/home/FAQ';
import CTA from '@/components/sections/home/CTA';
import NotFound from '@/components/shared/NotFound';
import navigationData from '@/data/navigation.json';

export default function VPSHostingPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isEnabled, setIsEnabled] = useState(true);
  const [selectedProcessor, setSelectedProcessor] = useState('all');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  useEffect(() => {
    const otherHostingLink = navigationData.header.links.find(
      (link: any) => link.label === 'Other Hosting'
    );
    
    const isVPSEnabled = otherHostingLink?.items.some(
      (item: any) => item.label === 'VPS Hosting' && item.enabled !== false
    ) || false;

    setIsEnabled(isVPSEnabled);
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
      <VPSHero />
      <VPSFilters 
        selectedProcessor={selectedProcessor}
        setSelectedProcessor={setSelectedProcessor}
        billingCycle={billingCycle}
        setBillingCycle={setBillingCycle}
      />
      <VPSPlanCards 
        selectedProcessor={selectedProcessor}
        billingCycle={billingCycle}
      />
      <FAQ />
      <CTA />
    </>
  );
}