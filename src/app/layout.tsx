import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AnnouncementStrip from '@/components/layout/AnnouncementStrip';
import { CurrencyProvider } from '@/context/CurrencyContext';
import { AnnouncementProvider } from '@/context/AnnouncementContext';

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Horizon Hosting - Premium Web Hosting Solutions',
  description: 'Experience blazing-fast hosting with Horizon Hosting. Premium web hosting, VPS, and dedicated servers for your business.',
  
  openGraph: {
    title: 'Horizon Hosting - Premium Web Hosting Solutions',
    description: 'Experience blazing-fast hosting with Horizon Hosting. Premium web hosting, VPS, and dedicated servers for your business.',
    url: 'https://horizon-hosting-template.vercel.app',
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
    canonical: 'https://horizon-hosting-template.vercel.app',
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
        <CurrencyProvider>
          <AnnouncementProvider>
            <AnnouncementStrip />
            <Header />
            <main>{children}</main>
            <Footer />
          </AnnouncementProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}