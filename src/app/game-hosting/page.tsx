'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import GameHero from '@/components/sections/game-hosting/GameHero';
import GameFilters from '@/components/sections/game-hosting/GameFilters';
import PlanCards from '@/components/sections/game-hosting/PlanCards';
import ServerManagement from '@/components/sections/home/ServerManagement';
import FAQ from '@/components/sections/home/FAQ';
import NotFound from '@/components/shared/NotFound';
import gamesData from '@/data/games.json';
import navigationData from '@/data/navigation.json';

function GameHostingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const gameParam = searchParams.get('game');
  
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGame, setSelectedGame] = useState('minecraft');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [enabledGameIds, setEnabledGameIds] = useState<string[]>([]);

  useEffect(() => {
    const enabledGameItems = navigationData.header.links
      .find((l: any) => l.label === 'Game Hosting')
      ?.items.filter((item: any) => item.enabled !== false) || [];

    const ids = enabledGameItems.map((item: any) => {
      const match = item.href.match(/game=([^&]+)/);
      return match ? match[1] : null;
    }).filter(Boolean) as string[];

    setEnabledGameIds(ids);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isLoading) return;

    if (enabledGameIds.length === 0) {
      return;
    }

    if (gameParam && !enabledGameIds.includes(gameParam)) {
      router.push(`/game-hosting?game=${enabledGameIds[0]}`);
    } else if (!gameParam) {
      setSelectedGame(enabledGameIds[0]);
    } else {
      setSelectedGame(gameParam);
    }
  }, [gameParam, enabledGameIds, isLoading, router]);

  const handleGameChange = (gameId: string) => {
    setSelectedGame(gameId);
    window.history.pushState({}, '', `/game-hosting?game=${gameId}`);
  };

  if (isLoading) {
    return <div className="min-h-screen bg-pageBg" />;
  }

  if (enabledGameIds.length === 0) {
    return <NotFound />;
  }

  return (
    <>
      <GameHero gameId={selectedGame} onGameChange={handleGameChange} />
      <GameFilters 
        selectedGame={selectedGame}
        setSelectedGame={setSelectedGame}
        billingCycle={billingCycle}
        setBillingCycle={setBillingCycle}
      />
      <PlanCards 
        gameId={selectedGame}
        billingCycle={billingCycle}
      />
      <ServerManagement />
      <FAQ />
    </>
  );
}

export default function GameHostingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-pageBg" />}>
      <GameHostingContent />
    </Suspense>
  );
}