'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useSearch } from './SearchProvider';
import { search, SearchResult } from '@/lib/search';

export default function SearchModal() {
  const { isOpen, close } = useSearch();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => inputRef.current?.focus());
      document.body.style.overflow = 'hidden';
    } else {
      setQuery('');
      setResults([]);
      setActiveIndex(0);
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  useEffect(() => {
    setResults(search(query));
    setActiveIndex(0);
  }, [query]);

  const goToResult = useCallback(
    (result: SearchResult) => {
      close();
      router.push(result.item.href);
    },
    [close, router]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setActiveIndex((prev) => Math.min(prev + 1, results.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setActiveIndex((prev) => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (results[activeIndex]) goToResult(results[activeIndex]);
          break;
        case 'Escape':
          e.preventDefault();
          close();
          break;
      }
    },
    [results, activeIndex, goToResult, close]
  );

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] sm:pt-[20vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Search topics"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={close} />

      {/* Panel */}
      <div className="relative bg-white rounded-xl shadow-2xl w-[calc(100%-2rem)] max-w-lg mx-4 overflow-hidden">
        {/* Input row */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-wiah-border">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#6B7280"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="flex-shrink-0"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search topics, metrics, categories..."
            className="flex-1 text-sm text-wiah-black placeholder-wiah-mid bg-transparent outline-none"
            autoComplete="off"
            spellCheck={false}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-wiah-mid hover:text-wiah-black transition-colors"
              aria-label="Clear search"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4l8 8M12 4l-8 8" />
              </svg>
            </button>
          )}
          <kbd className="text-[10px] font-mono text-wiah-mid bg-wiah-light px-1.5 py-0.5 rounded flex-shrink-0">
            ESC
          </kbd>
        </div>

        {/* Results */}
        {query.length > 0 ? (
          <div className="max-h-[50vh] overflow-y-auto">
            {results.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <p className="text-sm text-wiah-mid">No results for &ldquo;{query}&rdquo;</p>
                <p className="text-xs text-wiah-mid/60 mt-1 font-mono">
                  Try a broader term or browse all topics below
                </p>
              </div>
            ) : (
              <ul role="listbox" className="py-2">
                {results.map((result, i) => (
                  <SearchResultRow
                    key={result.item.slug}
                    result={result}
                    isActive={i === activeIndex}
                    onClick={() => goToResult(result)}
                    onMouseEnter={() => setActiveIndex(i)}
                  />
                ))}
              </ul>
            )}
          </div>
        ) : (
          /* Empty state — quick links */
          <div className="px-4 py-5">
            <p className="font-mono text-xs text-wiah-mid mb-3">Quick links</p>
            <div className="flex flex-wrap gap-1.5">
              {['Health', 'Housing', 'Economy', 'Education', 'Water', 'Justice', 'Poverty'].map(
                (name) => (
                  <button
                    key={name}
                    onClick={() => setQuery(name)}
                    className="px-2.5 py-1 rounded-full border border-wiah-border text-xs font-mono text-wiah-mid hover:text-wiah-black hover:border-wiah-black transition-colors"
                  >
                    {name}
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="px-4 py-2 border-t border-wiah-border flex items-center gap-4 text-[10px] font-mono text-wiah-mid">
          <span>↑↓ navigate</span>
          <span>↵ open</span>
          <span>esc close</span>
        </div>
      </div>
    </div>
  );
}

// ── Result row ─────────────────────────────────────────────────────────────────

interface SearchResultRowProps {
  result: SearchResult;
  isActive: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
}

function SearchResultRow({ result, isActive, onClick, onMouseEnter }: SearchResultRowProps) {
  const { item, matchType, matchedMetricIndex } = result;
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (isActive && ref.current) {
      ref.current.scrollIntoView({ block: 'nearest' });
    }
  }, [isActive]);

  const displayMetric = item.metrics[matchedMetricIndex ?? 0];

  return (
    <li
      ref={ref}
      role="option"
      aria-selected={isActive}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className={[
        'flex items-center justify-between gap-3 px-4 py-2.5 cursor-pointer transition-colors',
        isActive ? 'bg-wiah-light' : 'hover:bg-wiah-light/50',
      ].join(' ')}
    >
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-wiah-black truncate">{item.topicName}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="font-mono text-[10px] text-wiah-mid truncate">
            {item.categoryName}
          </span>
          {(matchType === 'metric-label' || matchType === 'metric-context') && displayMetric && (
            <>
              <span className="text-wiah-border">·</span>
              <span className="font-mono text-[10px] text-wiah-mid truncate">
                {displayMetric.label}
              </span>
            </>
          )}
        </div>
      </div>

      {displayMetric && (
        <div className="flex items-center gap-1 flex-shrink-0">
          <span
            className="font-mono text-sm font-semibold"
            style={{ color: displayMetric.statusColour }}
          >
            {displayMetric.value}
          </span>
          {displayMetric.unit && (
            <span className="font-mono text-[10px] text-wiah-mid">{displayMetric.unit}</span>
          )}
        </div>
      )}
    </li>
  );
}
