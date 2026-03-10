'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import DirectionArrow from './DirectionArrow';
import {
  CATEGORIES,
  TOPICS,
  getMetricStatus,
  STATUS_COLOUR,
  Category,
  TopicEntry,
} from '@/lib/topics';

function TopicRow({ topic }: { topic: TopicEntry }) {
  const m = topic.metrics[0];
  if (!m) return null;

  const status = getMetricStatus(m.direction, m.polarity);
  const colour = STATUS_COLOUR[status];

  return (
    <Link
      href={topic.href}
      className="flex items-center justify-between gap-3 py-3 border-b border-wiah-border/50 hover:border-wiah-blue/40 transition-colors group"
    >
      <span className="text-sm font-semibold text-wiah-black group-hover:text-wiah-blue transition-colors truncate">
        {topic.topic}
      </span>
      <span className="flex items-center gap-2 flex-shrink-0">
        <span className="font-mono text-sm font-semibold" style={{ color: colour }}>
          {m.value}
        </span>
        {m.unit && (
          <span className="font-mono text-xs text-wiah-mid">{m.unit}</span>
        )}
        <DirectionArrow direction={m.direction} polarity={m.polarity} size={14} />
        {m.context && (
          <span className="hidden md:inline font-mono text-xs text-wiah-mid max-w-[180px] truncate">
            {m.context}
          </span>
        )}
      </span>
    </Link>
  );
}

function CategoryTopics({ category }: { category: Category }) {
  const topics = category.topics
    .map((slug) => TOPICS[slug])
    .filter(Boolean);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
      {topics.map((t) => (
        <TopicRow key={t.slug} topic={t} />
      ))}
    </div>
  );
}

export default function TopicBrowser() {
  const [activeSlug, setActiveSlug] = useState<string>(CATEGORIES[0].slug);

  // Read ?cat= query param on mount to pre-select a category tab
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('cat');
    if (cat && CATEGORIES.some(c => c.slug === cat)) {
      setActiveSlug(cat);
      // Scroll the browser section into view after a tick
      setTimeout(() => {
        document.getElementById('topic-browser')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, []);

  const activeCategory = CATEGORIES.find((c) => c.slug === activeSlug) || CATEGORIES[0];

  return (
    <section id="topic-browser" className="px-6 py-10 md:py-14 bg-wiah-light">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-wiah-black mb-2">
          Browse all topics
        </h2>
        <p className="font-mono text-xs text-wiah-mid mb-5">
          {Object.keys(TOPICS).length} topics across {CATEGORIES.length} categories
        </p>

        {/* Category pill nav */}
        <div className="flex flex-wrap gap-2 mb-5">
          {CATEGORIES.map((cat) => {
            const isActive = cat.slug === activeSlug;
            return (
              <button
                key={cat.slug}
                onClick={() => setActiveSlug(cat.slug)}
                className={`
                  px-3.5 py-1.5 rounded-full font-mono text-xs transition-colors border
                  ${isActive
                    ? 'bg-wiah-dark text-white border-wiah-dark'
                    : 'bg-white text-wiah-mid border-wiah-border hover:border-wiah-black hover:text-wiah-black'
                  }
                `}
              >
                {cat.name}
                <span className={`ml-1.5 ${isActive ? 'text-white/60' : 'text-wiah-border'}`}>
                  {cat.topics.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Topic list for active category */}
        <CategoryTopics category={activeCategory} />
      </div>
    </section>
  );
}
