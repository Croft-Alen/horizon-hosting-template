import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AnnouncementStrip from '@/components/layout/AnnouncementStrip';
import Providers from '@/components/providers/Providers';
import ThemeSwitcher from '@/components/demo/ThemeSwitcher';

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://your-domain.com'),
  title: 'Horizon Hosting - Premium Web Hosting Solutions',
  description: 'Experience blazing-fast hosting with Horizon Hosting. Premium web hosting, VPS, and dedicated servers for your business.',
  
  openGraph: {
    title: 'Horizon Hosting - Premium Web Hosting Solutions',
    description: 'Experience blazing-fast hosting with Horizon Hosting. Premium web hosting, VPS, and dedicated servers for your business.',
    url: 'https://your-domain.com',
    siteName: 'Horizon Hosting',
    images: ['/og-image.jpg'],
    type: 'website',
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Horizon Hosting - Premium Web Hosting Solutions',
    description: 'Experience blazing-fast hosting with Horizon Hosting. Premium web hosting, VPS, and dedicated servers for your business.',
    images: ['/og-image.jpg'],
  },
  
  robots: {
    index: true,
    follow: true,
  },
  
  alternates: {
    canonical: 'https://your-domain.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={spaceGrotesk.variable} suppressHydrationWarning>
      <body className="antialiased bg-pageBg text-text-body">
        <Providers>
          <AnnouncementStrip />
          <Header />
          <main>{children}</main>
          <Footer />
          <ThemeSwitcher />
        </Providers>
      </body>
    </html>
  );
}