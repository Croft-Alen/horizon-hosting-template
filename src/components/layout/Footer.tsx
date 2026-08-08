'use client';

import Link from 'next/link';
import Image from 'next/image';
import { 
  FaDiscord, 
  FaTwitter, 
  FaGithub 
} from 'react-icons/fa';
import navigationData from '@/data/navigation.json';

export default function Footer() {
  const { footer, header } = navigationData;

  const enabledGameItems = navigationData.header.links
    .find((l: any) => l.label === 'Game Hosting')
    ?.items.filter((item: any) => item.enabled !== false) || [];

  const enabledFooterGames = footer.columns.gameHosting.links.filter((link: any) =>
    enabledGameItems.some((item: any) => item.href === link.href)
  );

  const topGames = enabledFooterGames.slice(0, 3);
  const hasMoreGames = enabledFooterGames.length > 3;

  const enabledOtherHosting = footer.columns.otherHosting.links.filter((link: any) => {
    const navLink = navigationData.header.links
      .find((l: any) => l.label === 'Other Hosting')
      ?.items.find((item: any) => item.href === link.href);
    return navLink?.enabled !== false;
  });

  const legalLink = navigationData.header.links.find((l: any) => l.label === 'Legal');
  const enabledLegalItems = legalLink?.items.filter((item: any) => item.enabled !== false) || [];
  const enabledFooterLegal = footer.columns.legal.links.filter((link: any) =>
    enabledLegalItems.some((item: any) => item.href === link.href)
  );
  const hasEnabledLegal = enabledFooterLegal.length > 0;

  const resourcesLink = navigationData.header.links.find((l: any) => l.label === 'Resources');
  const blogItem = resourcesLink?.items.find((item: any) => item.label === 'Blog');
  const isBlogEnabled = blogItem?.enabled !== false;
  const enabledFooterResources = footer.columns.resources.links.filter((link: any) => {
    if (link.label === 'Blog') return isBlogEnabled;
    return true;
  });
  const hasEnabledResources = enabledFooterResources.length > 0;

  const paymentIcons = footer.paymentIcons || [
    { src: '/images/payment-icons/visa-icon.png', alt: 'Visa' },
    { src: '/images/payment-icons/mastercard-icon.png', alt: 'Mastercard' },
    { src: '/images/payment-icons/paypal-icon.png', alt: 'PayPal' },
    { src: '/images/payment-icons/googlepay-icon.png', alt: 'Google Pay' }
  ];

  const categories = [];

  if (enabledFooterGames.length > 0) {
    categories.push({
      key: 'gameHosting',
      title: footer.columns.gameHosting.title,
      links: topGames,
      hasMore: hasMoreGames
    });
  }

  if (enabledOtherHosting.length > 0) {
    categories.push({
      key: 'otherHosting',
      title: footer.columns.otherHosting.title,
      links: enabledOtherHosting
    });
  }

  if (hasEnabledLegal) {
    categories.push({
      key: 'legal',
      title: footer.columns.legal.title,
      links: enabledFooterLegal
    });
  }

  if (hasEnabledResources) {
    categories.push({
      key: 'resources',
      title: footer.columns.resources.title,
      links: enabledFooterResources
    });
  }

  return (
    <footer className="bg-dark border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap gap-8">
          
          <div className="w-full md:w-[280px] lg:w-[240px] flex-shrink-0">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-9 w-9 relative">
                <img 
                  src={header.logo.path}
                  alt={header.logo.alt}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-2xl font-bold text-text-heading">{header.logo.name}</span>
            </div>
            <p className="text-text-muted text-base mb-6 max-w-sm leading-relaxed">
              {footer.description}
            </p>
            <div className="flex gap-4">
              <a 
                href={footer.social.discord} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-text-muted hover:text-brand transition-colors"
                aria-label="Discord"
              >
                <FaDiscord className="w-5 h-5" />
              </a>
              <a 
                href={footer.social.twitter} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-text-muted hover:text-brand transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
              <a 
                href={footer.social.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-text-muted hover:text-brand transition-colors"
                aria-label="GitHub"
              >
                <FaGithub className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="flex-1 flex flex-wrap gap-8 justify-end">
            {categories.map((category) => (
              <div key={category.key} className="min-w-[140px] flex-1 max-w-[180px]">
                <h4 className="text-text-heading font-semibold text-base mb-4">
                  {category.title}
                </h4>
                <ul className="space-y-2.5">
                  {category.links.map((link: any, idx: number) => (
                    <li key={idx}>
                      <Link 
                        href={link.href} 
                        className="text-text-muted hover:text-brand transition-colors text-base"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                  {category.hasMore && (
                    <li>
                      <Link 
                        href="/game-hosting" 
                        className="text-text-muted hover:text-brand transition-colors text-base"
                      >
                        More Games
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/5 mt-8 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-text-muted text-base text-center sm:text-left">
              {footer.copyright}
            </p>
            
            <div className="flex items-center gap-2">
              {paymentIcons.map((icon: any, index: number) => (
                <div 
                  key={index}
                  className="border border-white/10 rounded-lg px-3 py-2 flex items-center justify-center"
                >
                  <img 
                    src={icon.src}
                    alt={icon.alt}
                    className="h-5 w-auto object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}