'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FaDiscord, 
  FaChevronDown, 
  FaUser,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import navigationData from '@/data/navigation.json';
import gamesData from '@/data/games.json';
import { useCurrency } from '@/context/CurrencyContext';
import { useAnnouncement } from '@/context/AnnouncementContext';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { header } = navigationData;
  const headerRef = useRef<HTMLElement>(null);
  const { currency, setCurrency, currencies, getFlagUrl } = useCurrency();
  const { isVisible: announcementVisible } = useAnnouncement();

  const gameHostingLink = header.links.find((l: any) => l.label === 'Game Hosting');
  const enabledGameItems = gameHostingLink?.items.filter((item: any) => item.enabled !== false) || [];
  const hasEnabledGames = enabledGameItems.length > 0;

  const gameData = gamesData.games
    .filter(game => enabledGameItems.some((item: any) => item.href.includes(game.id)))
    .map(game => ({
      id: game.id,
      name: game.name,
      logo: game.plans[0]?.logo || '/images/plans-logo/minecraft-icon.avif',
      price: game.plans[0]?.price || 10,
      description: game.description || 'Premium game server hosting',
      href: `/game-hosting?game=${game.id}`
    }));

  const otherHostingLink = header.links.find((l: any) => l.label === 'Other Hosting');
  const enabledOtherItems = otherHostingLink?.items.filter((item: any) => item.enabled !== false) || [];
  const hasEnabledOther = enabledOtherItems.length > 0;

  const legalLink = header.links.find((l: any) => l.label === 'Legal');
  const enabledLegalItems = legalLink?.items.filter((item: any) => item.enabled !== false) || [];
  const hasEnabledLegal = enabledLegalItems.length > 0;

  const resourcesLink = header.links.find((l: any) => l.label === 'Resources');
  const blogItem = resourcesLink?.items.find((item: any) => item.label === 'Blog');
  const isBlogEnabled = blogItem?.enabled !== false;
  const hasEnabledResources = isBlogEnabled;

  const enabledLinks = header.links
    .filter((link: any) => {
      if (link.label === 'Game Hosting') {
        return hasEnabledGames;
      }
      if (link.label === 'Other Hosting') {
        return hasEnabledOther;
      }
      if (link.label === 'Legal') {
        return hasEnabledLegal;
      }
      if (link.label === 'Resources') {
        return hasEnabledResources;
      }
      return link.enabled !== false;
    });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const toggleMobileDropdown = (label: string) => {
    setOpenMobileDropdown(openMobileDropdown === label ? null : label);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenMobileDropdown(null);
  };

  if (isLoading) {
    return (
      <header className="fixed left-0 right-0 z-40 top-0 bg-transparent border-b border-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16"></div>
        </div>
      </header>
    );
  }

  return (
    <>
      <header ref={headerRef} className={`fixed left-0 right-0 z-40 transition-all duration-300 ${
        announcementVisible ? 'top-10' : 'top-0'
      } ${
        scrolled 
          ? 'bg-[var(--color-cardBg)]/80 backdrop-blur-sm border-b border-white/5' 
          : 'bg-transparent border-b border-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <div className="h-9 w-9 relative">
                <img 
                  src={header.logo.path}
                  alt={header.logo.alt}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-bold text-text-heading">{header.logo.name}</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-6">
              {enabledLinks.map((link: any, index: number) => {
                const isGameHosting = link.label === 'Game Hosting';
                const isOtherHosting = link.label === 'Other Hosting';
                const isLegal = link.label === 'Legal';
                const isResources = link.label === 'Resources';
                
                return (
                  <div key={index} className="relative">
                    <button 
                      onClick={() => toggleDropdown(link.label)}
                      className="text-text-body hover:text-text-body transition-colors text-sm font-medium flex items-center gap-1"
                    >
                      {link.label}
                      <FaChevronDown className={`w-3 h-3 transition-transform duration-200 ${
                        openDropdown === link.label ? 'rotate-180' : ''
                      }`} />
                    </button>
                    
                    {isGameHosting ? (
                      <div className={`absolute left-0 top-full mt-2 w-[500px] shadow-xl transition-all duration-200 z-50 ${
                        openDropdown === link.label ? 'opacity-100 visible' : 'opacity-0 invisible'
                      }`}>
                        <Card className="p-3">
                          <div className="grid grid-cols-2 gap-1.5">
                            {gameData.map((game) => (
                              <Link
                                key={game.id}
                                href={game.href}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors"
                                onClick={() => setOpenDropdown(null)}
                              >
                                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                                  <img 
                                    src={game.logo}
                                    alt={game.name}
                                    className="w-full h-full object-contain"
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement;
                                      target.style.display = 'none';
                                    }}
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-sm font-medium text-text-heading">
                                    {game.name}
                                  </span>
                                  <span className="text-xs text-text-muted">
                                    Starting from {currency.symbol}{game.price}
                                  </span>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </Card>
                      </div>
                    ) : isOtherHosting || isLegal || isResources ? (
                      <div className={`absolute left-0 top-full mt-2 w-48 shadow-xl transition-all duration-200 z-50 ${
                        openDropdown === link.label ? 'opacity-100 visible' : 'opacity-0 invisible'
                      }`}>
                        <Card className="p-2">
                          {link.items
                            .filter((item: any) => item.enabled !== false)
                            .map((item: any, idx: number) => (
                            <Link 
                              key={idx} 
                              href={item.href} 
                              className="block px-4 py-2 text-sm text-text-body hover:bg-white/5 rounded-lg transition-colors"
                              onClick={() => setOpenDropdown(null)}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </Card>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </nav>

            <div className="flex items-center gap-4">
              <a
                href={header.discordUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-white transition-colors"
              >
                <FaDiscord className="w-5 h-5" />
              </a>

              <div className="relative hidden lg:block">
                <button 
                  onClick={() => toggleDropdown('currency')}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <img 
                    src={getFlagUrl()}
                    alt={currency.code}
                    className="w-5 h-4 object-cover rounded-sm"
                  />
                  <span className="text-sm font-medium text-text-heading">{currency.code}</span>
                </button>
                <div className={`absolute right-0 top-full mt-2 w-40 shadow-xl transition-all duration-200 z-50 ${
                  openDropdown === 'currency' ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}>
                  <Card className="p-2">
                    {currencies.map((curr: any) => (
                      <button
                        key={curr.code}
                        onClick={() => {
                          setCurrency(curr);
                          setOpenDropdown(null);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm rounded-lg transition-colors flex items-center gap-3 ${
                          currency.code === curr.code
                            ? 'text-brand'
                            : 'text-text-body hover:text-brand hover:bg-white/5'
                        }`}
                      >
                        <img 
                          src={`https://flagcdn.com/48x36/${curr.countryCode}.png`}
                          alt={curr.code}
                          className="w-6 h-4 object-cover rounded-sm"
                        />
                        <span>{curr.code}</span>
                      </button>
                    ))}
                  </Card>
                </div>
              </div>

              <div className="relative hidden lg:block">
                <Button 
                  variant="primary"
                  size="sm"
                  className="flex items-center gap-1 h-auto"
                  onClick={() => toggleDropdown('clientSpace')}
                >
                  {header.clientSpace.label}
                  <FaChevronDown className={`w-3 h-3 transition-transform duration-200 ${
                    openDropdown === 'clientSpace' ? 'rotate-180' : ''
                  }`} />
                </Button>
                <div className={`absolute right-0 top-full mt-2 w-48 shadow-xl transition-all duration-200 z-50 ${
                  openDropdown === 'clientSpace' ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}>
                  <Card className="p-2">
                    {header.clientSpace.items.map((item: any, idx: number) => (
                      <a 
                        key={idx} 
                        href={item.href} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="block px-4 py-2 text-sm text-text-body hover:bg-white/5 rounded-lg transition-colors"
                        onClick={() => setOpenDropdown(null)}
                      >
                        {item.label}
                      </a>
                    ))}
                  </Card>
                </div>
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden text-text-body hover:text-brand transition-colors p-1"
              >
                {isMobileMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
        isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="absolute inset-0 bg-[var(--color-cardBg)]/95 backdrop-blur-sm" onClick={closeMobileMenu}></div>
        
        <div className={`relative h-full transition-all duration-300 ${
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}>
          <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
            <Link href="/" className="flex items-center gap-3" onClick={closeMobileMenu}>
              <div className="h-8 w-8 relative">
                <img 
                  src={header.logo.path}
                  alt={header.logo.alt}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-bold text-text-heading">{header.logo.name}</span>
            </Link>
            
            <button
              onClick={closeMobileMenu}
              className="text-text-body hover:text-brand transition-colors p-1"
            >
              <FaTimes className="w-6 h-6" />
            </button>
          </div>

          <div className="h-[calc(100%-4rem)] overflow-y-auto px-4 py-6">
            <nav className="flex flex-col gap-1">
              {enabledLinks.map((link: any, index: number) => {
                const isGameHosting = link.label === 'Game Hosting';
                const isOtherHosting = link.label === 'Other Hosting';
                const isLegal = link.label === 'Legal';
                const isResources = link.label === 'Resources';
                
                return (
                  <div key={index}>
                    <button 
                      onClick={() => toggleMobileDropdown(link.label)}
                      className="w-full flex items-center justify-between text-text-body hover:text-text-body transition-colors text-sm font-medium py-3 px-3 rounded-lg hover:bg-white/5"
                    >
                      {link.label}
                      <FaChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                        openMobileDropdown === link.label ? 'rotate-180' : ''
                      }`} />
                    </button>
                    
                    {isGameHosting ? (
                      <div className={`overflow-hidden transition-all duration-300 ${
                        openMobileDropdown === link.label ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                      }`}>
                        <div className="pl-4 mt-1 space-y-1 border-l border-white/5 ml-3">
                          <div className="grid grid-cols-1 gap-1 py-2">
                            {gameData.map((game) => (
                              <Link
                                key={game.id}
                                href={game.href}
                                className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/5 transition-colors"
                                onClick={closeMobileMenu}
                              >
                                <div className="w-9 h-9 flex items-center justify-center flex-shrink-0">
                                  <img 
                                    src={game.logo}
                                    alt={game.name}
                                    className="w-full h-full object-contain"
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement;
                                      target.style.display = 'none';
                                    }}
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-sm text-text-body">
                                    {game.name}
                                  </span>
                                  <span className="text-xs text-text-muted">
                                    From {currency.symbol}{game.price}/mo
                                  </span>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : isOtherHosting || isLegal || isResources ? (
                      <div className={`overflow-hidden transition-all duration-300 ${
                        openMobileDropdown === link.label ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}>
                        <div className="pl-4 mt-1 space-y-1 border-l border-white/5 ml-3">
                          {link.items
                            .filter((item: any) => item.enabled !== false)
                            .map((item: any, idx: number) => (
                            <Link 
                              key={idx} 
                              href={item.href} 
                              className="block py-3 px-3 text-sm text-text-muted hover:bg-white/5 rounded-lg transition-colors"
                              onClick={closeMobileMenu}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              })}
              
              <div>
                <button 
                  onClick={() => toggleMobileDropdown('clientSpace')}
                  className="w-full flex items-center justify-between text-text-body hover:text-brand transition-colors text-sm font-medium py-3 px-3 rounded-lg hover:bg-white/5"
                >
                  {header.clientSpace.label}
                  <FaChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                    openMobileDropdown === 'clientSpace' ? 'rotate-180' : ''
                  }`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${
                  openMobileDropdown === 'clientSpace' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="pl-4 mt-1 space-y-1 border-l border-white/5 ml-3">
                    {header.clientSpace.items.map((item: any, idx: number) => (
                      <a 
                        key={idx} 
                        href={item.href} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="block py-3 px-3 text-sm text-text-muted hover:text-brand hover:bg-white/5 rounded-lg transition-colors"
                        onClick={closeMobileMenu}
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-white/5 pt-3 mt-3">
                <button 
                  onClick={() => toggleMobileDropdown('currency')}
                  className="w-full flex items-center justify-between text-text-body hover:text-brand transition-colors text-sm font-medium py-3 px-3 rounded-lg hover:bg-white/5"
                >
                  <span className="flex items-center gap-2">
                    <img 
                      src={getFlagUrl()}
                      alt={currency.code}
                      className="w-5 h-4 object-cover rounded-sm"
                    />
                    Currency: {currency.code}
                  </span>
                  <FaChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                    openMobileDropdown === 'currency' ? 'rotate-180' : ''
                  }`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${
                  openMobileDropdown === 'currency' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="pl-4 mt-1 space-y-1 border-l border-white/5 ml-3">
                    {currencies.map((curr: any) => (
                      <button
                        key={curr.code}
                        onClick={() => {
                          setCurrency(curr);
                          closeMobileMenu();
                        }}
                        className={`w-full flex items-center gap-3 py-3 px-3 text-sm rounded-lg transition-colors ${
                          currency.code === curr.code
                            ? 'text-brand'
                            : 'text-text-muted hover:text-brand hover:bg-white/5'
                        }`}
                      >
                        <img 
                          src={`https://flagcdn.com/48x36/${curr.countryCode}.png`}
                          alt={curr.code}
                          className="w-5 h-4 object-cover rounded-sm"
                        />
                        <span>{curr.code}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}