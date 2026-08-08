import Hero from '@/components/sections/home/Hero'
import Features from '@/components/sections/home/Features'
import ServerLocations from '@/components/sections/home/ServerLocations'
import ServerManagement from '@/components/sections/home/ServerManagement'
import Testimonials from '@/components/sections/home/Testimonials'
import FAQ from '@/components/sections/home/FAQ'
import CTA from '@/components/sections/home/CTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <ServerLocations />
      <ServerManagement />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  )
}