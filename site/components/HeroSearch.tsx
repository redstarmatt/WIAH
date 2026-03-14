'use client';

import { useRouter } from 'next/navigation';
import SearchTrigger from './SearchTrigger';
import { useSearch } from './SearchProvider';
import { TOPICS } from '@/lib/topics';

const CHIPS = [
  'NHS waiting list',
  'sewage in rivers',
  'school absences',
  'ambulance response',
  'crime charge rates',
  'child poverty',
];

const ALL_HREFS = Object.values(TOPICS).map((t) => t.href);

export default function HeroSearch() {
  const { openWithQuery } = useSearch();
  const router = useRouter();

  function goSurprise() {
    const href = ALL_HREFS[Math.floor(Math.random() * ALL_HREFS.length)];
    router.push(href);
  }

  return (
    <div>
      <div className="mb-3 flex items-center gap-3">
        <div className="flex-1">
          <SearchTrigger variant="hero" />
        </div>
        <button
          onClick={goSurprise}
          className="flex-shrink-0 flex items-center gap-1.5 px-4 py-4 rounded-xl border border-white/[15%] bg-white/[8%] hover:bg-white/[12%] hover:border-white/25 transition-all font-mono text-sm text-white/65 hover:text-white/90 whitespace-nowrap"
          aria-label="Go to a random topic"
          title="Surprise me — random topic"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="16 3 21 3 21 8" />
            <line x1="4" y1="20" x2="21" y2="3" />
            <polyline points="21 16 21 21 16 21" />
            <line x1="15" y1="15" x2="21" y2="21" />
          </svg>
          <span className="hidden sm:inline">Surprise me</span>
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-2 mt-5">
        {CHIPS.map((q) => (
          <button
            key={q}
            onClick={() => openWithQuery(q)}
            className="font-mono text-xs text-white/60 hover:text-white/90 px-3 py-1.5 rounded-full border border-white/25 hover:border-white/50 transition-all cursor-pointer"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}
