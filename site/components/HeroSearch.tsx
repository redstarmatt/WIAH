'use client';

import SearchTrigger from './SearchTrigger';
import { useSearch } from './SearchProvider';

const CHIPS = [
  'NHS waiting list',
  'sewage in rivers',
  'school absences',
  'ambulance response',
  'crime charge rates',
  'child poverty',
];

export default function HeroSearch() {
  const { openWithQuery } = useSearch();

  return (
    <div>
      <div className="mb-5">
        <SearchTrigger variant="hero" />
      </div>
      <div className="flex flex-wrap justify-center gap-2">
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
