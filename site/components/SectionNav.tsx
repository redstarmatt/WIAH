'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

export interface NavSection {
  id: string;
  label: string;
}

interface SectionNavProps {
  sections: NavSection[];
}

export default function SectionNav({ sections }: SectionNavProps) {
  const [active, setActive] = useState(() => {
    // Initialise from URL hash if it matches a known section
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.slice(1);
      if (hash && sections.some(s => s.id === hash)) return hash;
    }
    return sections[0]?.id ?? '';
  });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const pillRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const navRef = useRef<HTMLDivElement>(null);

  // On mount: if the URL contains a hash matching a section, scroll to it.
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash || !sections.some(s => s.id === hash)) return;

    setActive(hash);

    const scrollToHash = () => {
      const el = document.getElementById(hash);
      if (!el) return;
      const offset = el.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top: offset, behavior: 'instant' });
    };

    const t0 = setTimeout(scrollToHash, 0);
    const t1 = setTimeout(scrollToHash, 200);
    const t2 = setTimeout(scrollToHash, 500);
    const t3 = setTimeout(scrollToHash, 1000);
    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Track nav scroll position to show/hide fade indicators
  const updateFades = useCallback(() => {
    const nav = navRef.current;
    if (!nav) return;
    setCanScrollLeft(nav.scrollLeft > 4);
    setCanScrollRight(nav.scrollLeft + nav.clientWidth < nav.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    updateFades();
    nav.addEventListener('scroll', updateFades, { passive: true });
    window.addEventListener('resize', updateFades, { passive: true });
    return () => {
      nav.removeEventListener('scroll', updateFades);
      window.removeEventListener('resize', updateFades);
    };
  }, [updateFades]);

  // Scrollspy: find whichever section's top is closest to (but above) the
  // sticky nav height. This activates a section only once it has scrolled
  // past the nav bar, preventing premature tab switching.
  const THRESHOLD = 100; // px — matches the combined sticky nav height
  const onScroll = useCallback(() => {
    let best: string | null = null;
    let bestDist = Infinity;

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const top = el.getBoundingClientRect().top;
      if (top <= THRESHOLD) {
        const dist = THRESHOLD - top;
        if (dist < bestDist) {
          bestDist = dist;
          best = id;
        }
      }
    });

    if (best) setActive(best);
  }, [sections]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  // Keep active pill scrolled into view inside the nav bar
  useEffect(() => {
    const pill = pillRefs.current[active];
    const nav = navRef.current;
    if (!pill || !nav) return;
    const navRect = nav.getBoundingClientRect();
    const pillRect = pill.getBoundingClientRect();
    if (pillRect.left < navRect.left + 16 || pillRect.right > navRect.right - 16) {
      pill.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [active]);

  const scrollTo = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const el = document.getElementById(id);
    if (!el) return;
    const target = el.getBoundingClientRect().top + window.scrollY - 96;
    const start = window.scrollY;
    const delta = target - start;
    const duration = 300;
    const startTime = performance.now();
    const ease = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    const step = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1);
      window.scrollTo(0, start + delta * ease(t));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  return (
    <div className="sticky top-[48px] z-40 bg-white border-b border-wiah-border">
      {/* Left fade */}
      {canScrollLeft && (
        <div
          className="absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, white, transparent)' }}
        />
      )}
      {/* Right fade */}
      {canScrollRight && (
        <div
          className="absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, white, transparent)' }}
        />
      )}
      <div
        ref={navRef}
        className="overflow-x-auto"
        style={{ scrollbarWidth: 'none' }}
      >
        <div className="flex gap-1 px-4 py-2 min-w-max">
          {sections.map(({ id, label }) => (
            <button
              key={id}
              ref={el => { pillRefs.current[id] = el; }}
              onClick={(e) => scrollTo(id, e)}
              className={`
                px-3 py-1 text-[11px] font-mono rounded-full whitespace-nowrap transition-colors
                ${active === id
                  ? 'bg-wiah-dark text-white'
                  : 'text-wiah-mid hover:text-wiah-black hover:bg-wiah-light'}
              `}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
