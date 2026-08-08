// components/shared/SectionContainer.tsx
export default function SectionContainer({ children }: { children: React.ReactNode }) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {children}
    </section>
  );
}