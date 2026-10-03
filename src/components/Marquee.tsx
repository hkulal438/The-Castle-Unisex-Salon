const ITEMS = ['HAIR', 'BEAUTY', 'GROOMING', 'STYLE', 'EXPERIENCE', 'THE CASTLE'];

export default function Marquee() {
  const doubled = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];
  return (
    <div className="bg-ink-900 py-8 md:py-10 overflow-hidden border-y border-white/5">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="font-display text-cream/80 text-2xl sm:text-3xl md:text-4xl font-light tracking-[0.05em] mx-6 md:mx-10">
              {item}
            </span>
            <span className="text-gold text-xl md:text-2xl">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
