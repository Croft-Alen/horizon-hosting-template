'use client';

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FaStar, FaArrowRight, FaInfoCircle } from 'react-icons/fa';
import homeData from '@/data/home.json';
import navigationData from '@/data/navigation.json';

const heroData = homeData.sections.hero;
const allGames = heroData.games;

const enabledGameItems = navigationData.header.links
  .find((l: any) => l.label === 'Game Hosting')
  ?.items.filter((item: any) => item.enabled !== false) || [];

const enabledGameIds = enabledGameItems.map((item: any) => {
  const match = item.href.match(/game=([^&]+)/);
  return match ? match[1] : null;
}).filter(Boolean);

const games = allGames.filter((game: any) => enabledGameIds.includes(game.id));
const hasGames = games.length > 0;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const gamesContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.5,
    },
  },
};

const gameVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Hero() {
  return (
    <section className={`relative flex items-start pt-40 overflow-hidden bg-pageBg z-10 ${
      hasGames ? 'min-h-screen' : 'min-h-[60vh]'
    }`}>
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div 
            variants={itemVariants}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="flex -space-x-3">
              {heroData.trustpilot.avatars.map((avatar: string, index: number) => (
                <img 
                  key={index}
                  className="w-9 h-9 border-2 border-pageBg rounded-full object-cover" 
                  src={avatar} 
                  alt="User" 
                />
              ))}
            </div>

            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <FaStar className="w-4 h-4 text-[#00b67a]" />
                <span className="text-sm font-semibold text-text-heading">{heroData.trustpilot.label}</span>
              </div>
              <span className="text-xs text-text-muted">Trusted by {heroData.trustpilot.users}</span>
            </div>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-text-heading leading-[1.1] mb-4"
          >
            {heroData.heading.split(heroData.highlight)[0]}
            <br /> 
            <span className="text-brand">{heroData.highlight}</span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-base sm:text-lg text-text-muted max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            {heroData.description}
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Button 
              href={heroData.cta.primary.link}
              size="md"
              className="group whitespace-nowrap"
            >
              <span>{heroData.cta.primary.text}</span>
              <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform flex-shrink-0" />
            </Button>

            <Button 
              href={heroData.cta.secondary.link}
              variant="outline"
              size="md"
              className="whitespace-nowrap"
            >
              <FaInfoCircle className="w-4 h-4 flex-shrink-0" />
              <span>{heroData.cta.secondary.text}</span>
            </Button>
          </motion.div>
        </motion.div>

        {hasGames && (
          <motion.div 
            variants={gamesContainerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-20 max-w-5xl mx-auto mt-16"
          >
            <div className="flex flex-wrap justify-center -m-2">
              {games.map((game: any, index: number) => (
                <motion.div
                  key={game.id}
                  variants={gameVariants}
                  custom={index}
                  className="w-full sm:w-1/2 lg:w-1/3 p-2"
                >
                  <Link 
                    href={`/game-hosting?game=${game.id}`}
                    className="group relative aspect-[16/9] rounded-2xl overflow-hidden bg-cardBg block cursor-pointer"
                  >
                    <img 
                      src={game.image} 
                      alt={game.name}
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-pageBg via-pageBg/70 to-pageBg/30 opacity-90 transition-opacity duration-500"></div>
                    
                    <div className="absolute inset-0 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-pageBg/20 lg:block hidden"></div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:translate-y-8 lg:group-hover:translate-y-0 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-500 ease-out">
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-0.5 sm:mb-1">{game.name}</h3>
                      <p className="text-sm sm:text-base text-white/80">Starting from {game.price}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
}