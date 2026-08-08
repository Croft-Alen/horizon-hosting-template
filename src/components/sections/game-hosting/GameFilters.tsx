'use client';

import { Tag } from '@/components/ui/tag';
import gamesData from '@/data/games.json';
import navigationData from '@/data/navigation.json';

interface GameFiltersProps {
  selectedGame: string;
  setSelectedGame: (game: string) => void;
  billingCycle: 'monthly' | 'yearly';
  setBillingCycle: (cycle: 'monthly' | 'yearly') => void;
}

export default function GameFilters({
  selectedGame,
  setSelectedGame,
  billingCycle,
  setBillingCycle
}: GameFiltersProps) {
  // Get enabled games from navigation
  const enabledGameItems = navigationData.header.links
    .find((l: any) => l.label === 'Game Hosting')
    ?.items.filter((item: any) => item.enabled !== false) || [];

  const enabledGameIds = enabledGameItems.map((item: any) => {
    const match = item.href.match(/game=([^&]+)/);
    return match ? match[1] : null;
  }).filter(Boolean);

  // Filter games based on enabled items
  const allGames = gamesData.games;
  const games = allGames.filter((g: any) => enabledGameIds.includes(g.id));

  const selectedGameData = games.find((g: any) => g.id === selectedGame);
  const availableCycles = selectedGameData?.billingCycles || ['monthly', 'yearly'];
  const showBillingToggle = availableCycles.length > 1;

  return (
    <section className="py-5 bg-pageBg border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          
          <div className="flex flex-wrap items-center gap-2">
            {games.map((game: any) => (
              <button
                key={game.id}
                onClick={() => setSelectedGame(game.id)}
                className="focus:outline-none"
              >
                <Tag 
                  variant={selectedGame === game.id ? 'brand' : 'dark'}
                  className="text-sm px-5 py-2 cursor-pointer hover:opacity-80 transition-opacity"
                >
                  {game.name}
                </Tag>
              </button>
            ))}
          </div>

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