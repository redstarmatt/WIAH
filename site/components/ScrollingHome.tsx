'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { CATEGORIES, getScorecard } from '@/lib/topics';
import SiteName from './SiteName';
import HeroSearch from './HeroSearch';
import CategoryScrollSection from './CategoryScrollSection';
import ScrollNav from './ScrollNav';

export default function ScrollingHome() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { total, topicCount } = getScorecard();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onScroll = () => {
      const h = container.clientHeight;
      if (h === 0) return;
      const idx = Math.round(container.scrollTop / h);
      setActiveIndex(idx);
    };

    container.addEventListener('scroll', onScroll, { passive: true });
    return () => container.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (idx: number) => {
    const container = containerRef.current;
    if (!container) return;
    container.scrollTo({ top: idx * container.clientHeight, behavior: 'smooth' });
  };

  const labels = ['Home', ...CATEGORIES.map((c) => c.name)];

  return (
    <>
      <div
        ref={containerRef}
        className="h-screen overflow-y-scroll snap-y snap-mandatory"
      >
        {/* ── Hero ────────────────────────────────────────────────── */}
        <section className="h-screen snap-start bg-wiah-dark text-white flex flex-col justify-center px-6">
          <div className="max-w-2xl mx-auto w-full">
            <h1 className="mb-4">
              <SiteName size="hero" />
            </h1>

            <p className="font-editorial italic text-white/70 text-base md:text-lg mb-6 leading-relaxed">
              Public data. Public understanding. No noise, just signal.
            </p>

            <HeroSearch />

            <p className="mt-5 font-mono text-xs text-white/50">
              {total} indicators · {topicCount} topics · updated weekly
            </p>

            <p className="mt-8 font-mono text-xs text-white/30">
              scroll to explore ↓
            </p>
          </div>
        </section>

        {/* ── Category sections ─────────────────────────────────── */}
        {CATEGORIES.map((cat, i) => (
          <CategoryScrollSection
            key={cat.slug}
            category={cat}
            sectionIndex={i + 1}
            totalCategories={CATEGORIES.length}
          />
        ))}

        {/* ── Footer section ────────────────────────────────────── */}
        <footer className="h-screen snap-start flex flex-col items-center justify-center px-6 border-t border-wiah-border bg-wiah-dark text-white">
          <Link href="/" className="mb-6">
            <SiteName size="hero" />
          </Link>
          <p className="font-mono text-xs text-white/50 mb-8">
            Open data. No agenda.
          </p>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {CATEGORIES.map((cat) => (
              <span key={cat.slug} className="font-mono text-xs text-white/40">
                {cat.name}
              </span>
            ))}
          </nav>
          <p className="font-mono text-xs text-white/25 mt-8">
            whatisactuallyhappening.uk · updated weekly
          </p>
        </footer>
      </div>

      {/* ── Scroll nav dots ───────────────────────────────────── */}
      <ScrollNav
        total={labels.length}
        activeIndex={activeIndex}
        onSelect={scrollTo}
        labels={labels}
      />
    </>
  );
}
