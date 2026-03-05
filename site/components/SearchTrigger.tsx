'use client';

import { useState, useEffect } from 'react';
import { useSearch } from './SearchProvider';

interface SearchTriggerProps {
  variant?: 'light' | 'dark';
}

export default function SearchTrigger({ variant = 'dark' }: SearchTriggerProps) {
  const { open } = useSearch();
  const [kbdHint, setKbdHint] = useState('⌘K');

  useEffect(() => {
    setKbdHint(/Mac|iPhone|iPad/.test(navigator.userAgent) ? '⌘K' : 'Ctrl+K');
  }, []);

  const isLight = variant === 'light';

  return (
    <button
      onClick={open}
      className={[
        'flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-colors font-mono text-xs',
        isLight
          ? 'border-white/20 bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
          : 'border-wiah-border bg-wiah-light text-wiah-mid hover:text-wiah-black hover:border-wiah-black',
      ].join(' ')}
      aria-label="Search topics (Cmd+K)"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
      <span className="hidden sm:inline">Search</span>
      <kbd
        className={[
          'hidden sm:inline px-1.5 py-0.5 rounded text-[10px]',
          isLight ? 'bg-white/10' : 'bg-white',
        ].join(' ')}
      >
        {kbdHint}
      </kbd>
    </button>
  );
}
