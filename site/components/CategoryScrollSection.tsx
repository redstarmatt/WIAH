import Link from 'next/link';
import { Category, TOPICS, getMetricStatus, STATUS_COLOUR } from '@/lib/topics';
import DirectionArrow from './DirectionArrow';

interface Props {
  category: Category;
  sectionIndex: number; // 1-based (hero is 0)
  totalCategories: number;
}

export default function CategoryScrollSection({ category, sectionIndex, totalCategories }: Props) {
  const featuredTopics = category.featured.map((s) => TOPICS[s]).filter(Boolean).slice(0, 3);
  const accentColour = featuredTopics[0]?.colour || '#264653';
  const isLight = sectionIndex % 2 === 0;

  return (
    <section
      className={`h-screen snap-start flex flex-col justify-center px-6 md:px-12 ${
        isLight ? 'bg-wiah-light' : 'bg-white'
      }`}
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Counter */}
        <p className="font-mono text-xs text-wiah-mid tracking-widest uppercase mb-4">
          <span style={{ color: accentColour }}>
            {String(sectionIndex).padStart(2, '0')}
          </span>
          {' '}/ {String(totalCategories).padStart(2, '0')}
          <span className="mx-2 text-wiah-border">·</span>
          {category.topics.length} topics
        </p>

        {/* Category name */}
        <h2 className="font-editorial text-4xl md:text-6xl text-wiah-black mb-10 leading-tight">
          {category.name}
        </h2>

        {/* Featured topics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {featuredTopics.map((topic) => {
            const m = topic.metrics[0];
            if (!m) return null;
            const status = getMetricStatus(m.direction, m.polarity);
            const colour = STATUS_COLOUR[status];

            return (
              <Link
                key={topic.slug}
                href={topic.href}
                className="group block border-t border-wiah-border pt-4 hover:border-wiah-blue/40 transition-colors"
              >
                <p className="font-mono text-xs text-wiah-mid mb-2 truncate">{topic.topic}</p>
                <p className="font-mono text-3xl font-bold leading-none" style={{ color: colour }}>
                  {m.value}
                  {m.unit && (
                    <span className="text-base font-normal ml-1.5 text-wiah-mid">{m.unit}</span>
                  )}
                </p>
                <div className="flex items-center gap-1.5 mt-2">
                  <DirectionArrow direction={m.direction} polarity={m.polarity} size={12} />
                  {m.context && (
                    <span className="font-mono text-xs text-wiah-mid truncate">{m.context}</span>
                  )}
                </div>
                <p className="font-mono text-xs text-wiah-blue group-hover:text-wiah-black transition-colors mt-3">
                  View topic →
                </p>
              </Link>
            );
          })}
        </div>

        {/* Footer row */}
        <div className="flex items-center justify-between">
          <p className="font-mono text-xs text-wiah-mid">
            {category.topics.length} topics in this category
          </p>
          {sectionIndex < totalCategories && (
            <p className="font-mono text-xs text-wiah-mid/50">scroll ↓</p>
          )}
        </div>
      </div>
    </section>
  );
}
