'use client';

import { motion } from 'framer-motion';
import { Tag } from '@/components/ui/tag';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import gamesData from '@/data/games.json';
import navigationData from '@/data/navigation.json';

interface GameHeroProps {
  gameId: string;
  onGameChange: (gameId: string) => void;
}

export default function GameHero({ gameId, onGameChange }: GameHeroProps) {
  const enabledGameItems = navigationData.header.links
    .find((l: any) => l.label === 'Game Hosting')
    ?.items.filter((item: any) => item.enabled !== false) || [];

  const enabledGameIds = enabledGameItems.map((item: any) => {
    const match = item.href.match(/game=([^&]+)/);
    return match ? match[1] : null;
  }).filter(Boolean);

  const allGames = gamesData.games;
  const games = allGames.filter((g: any) => enabledGameIds.includes(g.id));

  const game = gamesData.games.find((g: any) => g.id === gameId);
  const currentIndex = games.findIndex((g: any) => g.id === gameId);
  const gameName = game?.name || 'Game';
  const gameDescription = game?.description || 'Premium game server hosting with powerful hardware and 24/7 support.';

  const gameCardImages: { [key: string]: string } = {
    minecraft: '/images/hero/minecraft.jpg',
    hytale: '/images/hero/hytale.webp',
    ark: '/images/hero/ark.jpg',
    cs2: '/images/hero/cs2.jpg',
    rust: '/images/hero/rust.jpg',
    fivem: '/images/hero/fivem.jpg'
  };

  const handlePrevious = () => {
    if (games.length === 0) return;
    const prevIndex = currentIndex === 0 ? games.length - 1 : currentIndex - 1;
    onGameChange(games[prevIndex].id);
  };

  const handleNext = () => {
    if (games.length === 0) return;
    const nextIndex = currentIndex === games.length - 1 ? 0 : currentIndex + 1;
    onGameChange(games[nextIndex].id);
  };

  if (!game || games.length === 0) return null;

  return (
    <section className="relative min-h-[55vh] flex items-center overflow-hidden bg-pageBg pt-32 pb-12 sm:pb-16 lg:pb-20">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-pageBg/60 via-pageBg/80 to-pageBg" />
        <img 
          src={game?.heroImage || '/images/game-hosting/default-hero.jpg'} 
          alt={gameName}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          
          <div className="hidden lg:block w-full lg:w-[25%] xl:w-[20%] relative group max-w-[280px] mx-auto lg:mx-0">
            <div className="relative rounded-2xl overflow-hidden aspect-[3/4] max-h-[320px]">
              <img 
                src={gameCardImages[game.id] || '/images/hero/minecraft.jpg'}
                alt={gameName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pageBg/80 via-pageBg/40 to-pageBg/10" />
            </div>

            <button
              onClick={handlePrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-pageBg/80 hover:bg-brand text-white p-1.5 rounded-full transition-all duration-200 hover:scale-110 z-20"
              aria-label="Previous game"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-pageBg/80 hover:bg-brand text-white p-1.5 rounded-full transition-all duration-200 hover:scale-110 z-20"
              aria-label="Next game"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="lg:hidden flex items-center justify-between w-full gap-4">
            <button
              onClick={handlePrevious}
              className="bg-pageBg/80 hover:bg-brand text-white p-3 rounded-full transition-all duration-200 hover:scale-110 flex-shrink-0"
              aria-label="Previous game"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <div className="flex-1"></div>
            
            <button
              onClick={handleNext}
              className="bg-pageBg/80 hover:bg-brand text-white p-3 rounded-full transition-all duration-200 hover:scale-110 flex-shrink-0"
              aria-label="Next game"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="w-full lg:w-[75%] xl:w-[80%]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-start mb-4">
                <Tag variant="brand">Game Hosting</Tag>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-text-heading leading-[1.1] mb-4">
                {gameName} <br />
                <span className="text-brand">Server Hosting</span>
              </h1>
              <p className="text-base sm:text-lg text-text-body max-w-2xl leading-relaxed">
                {gameDescription}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-24 lg:h-32 bg-gradient-to-t from-pageBg to-transparent z-10 pointer-events-none" />
    </section>
  );
}