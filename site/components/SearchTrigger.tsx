'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearch } from './SearchProvider';

const HERO_QUESTIONS = [
  'how long is the NHS waiting list?',
  'are rivers getting cleaner or dirtier?',
  'what percentage of crimes lead to a charge?',
  'what happens after you report a burglary?',
  'how many kids are persistently absent from school?',
  'how fast does an ambulance arrive after a 999 call?',
  'has the attainment gap narrowed since 2019?',
  'how many children are living in poverty?',
];

interface SearchTriggerProps {
  variant?: 'light' | 'dark' | 'hero';
}

export default function SearchTrigger({ variant = 'dark' }: SearchTriggerProps) {
  const { open } = useSearch();
  const [kbdHint, setKbdHint] = useState('⌘K');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setKbdHint(/Mac|iPhone|iPad/.test(navigator.userAgent) ? '⌘K' : 'Ctrl+K');
  }, []);

  useEffect(() => {
    if (variant !== 'hero') return;

    const cycle = () => {
      // Fade out
      setVisible(false);
      timerRef.current = setTimeout(() => {
        setQuestionIndex((i) => (i + 1) % HERO_QUESTIONS.length);
        setVisible(true);
      }, 400);
    };

    const interval = setInterval(cycle, 3200);
    return () => {
      clearInterval(interval);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [variant]);

  if (variant === 'hero') {
    return (
      <button
        onClick={open}
        className="w-full flex items-center gap-4 px-5 py-4 rounded-xl border border-white/[15%] bg-white/[8%] hover:bg-white/[12%] hover:border-white/25 transition-all text-left group"
        aria-label="Search topics"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white/60 flex-shrink-0"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <span
          className="flex-1 font-mono text-sm transition-opacity duration-300"
          style={{
            opacity: visible ? 1 : 0,
            color: 'rgba(255,255,255,0.65)',
          }}
        >
          {HERO_QUESTIONS[questionIndex]}
        </span>
        <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded bg-white/[8%] border border-white/20 font-mono text-[10px] text-white/55 flex-shrink-0">
          {kbdHint}
        </kbd>
      </button>
    );
  }

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
