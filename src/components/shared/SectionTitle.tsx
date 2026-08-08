// components/shared/SectionTitle.tsx
export default function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-heading mb-4">
        {title}
      </h2>
      <p className="text-text-muted max-w-2xl mx-auto">{subtitle}</p>
    </div>
  );
}