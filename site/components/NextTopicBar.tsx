'use client';

import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { TOPICS, getNextTopicInCategory, getRandomTopic, getCategoryForTopic, getMetricStatus, STATUS_COLOUR } from '@/lib/topics';

const SHOW_THRESHOLD = 0.90;
const HIDE_THRESHOLD = 0.84;
const AUTO_ADVANCE_MS = 3000;
const SCROLL_IDLE_MS = 800;

export default function NextTopicBar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const prevPathnameRef = useRef(pathname);
  const scrollIdleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isScrollIdle, setIsScrollIdle] = useState(false);

  const currentSlug = pathname.replace(/^\//, '').split('/')[0];
  const isTopicPage = Boolean(currentSlug && currentSlug in TOPICS);
  const nextTopic = isTopicPage ? getNextTopicInCategory(currentSlug) : null;
  const category = isTopicPage ? getCategoryForTopic(currentSlug) : null;
  const isEndOfCategory = isTopicPage && !nextTopic;

  // Stable random topic for end-of-category (recalculated on page change)
  const randomTopic = useMemo(
    () => (isEndOfCategory ? getRandomTopic(currentSlug) : null),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentSlug, isEndOfCategory],
  );

  // The topic to show — either next in category, or a random one
  const displayTopic = nextTopic ?? randomTopic;

  // Reset on navigation
  useEffect(() => {
    if (pathname !== prevPathnameRef.current) {
      prevPathnameRef.current = pathname;
      setIsDismissed(false);
      setIsVisible(false);
      setProgress(0);
      setIsFadingOut(false);
      setIsScrollIdle(false);
    }
  }, [pathname]);

  // Scroll listener — also tracks idle state so countdown only starts after user stops scrolling
  useEffect(() => {
    if (!displayTopic || isDismissed) return;

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      const ratio = window.scrollY / maxScroll;

      setIsVisible(prev => {
        if (!prev && ratio > SHOW_THRESHOLD) return true;
        if (prev && ratio < HIDE_THRESHOLD) return false;
        return prev;
      });

      // Reset idle state on every scroll event
      setIsScrollIdle(false);
      if (scrollIdleTimerRef.current) clearTimeout(scrollIdleTimerRef.current);
      scrollIdleTimerRef.current = setTimeout(() => setIsScrollIdle(true), SCROLL_IDLE_MS);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollIdleTimerRef.current) clearTimeout(scrollIdleTimerRef.current);
    };
  }, [displayTopic, isDismissed, currentSlug]);

  const navigateTo = useCallback((href: string) => {
    setIsFadingOut(true);
    setTimeout(() => router.push(href), 180);
  }, [router]);

  // Progress timer — only counts down once the user has stopped scrolling
  // No auto-advance for end-of-category random suggestions
  useEffect(() => {
    if (isVisible && displayTopic && !isDismissed && isScrollIdle && !isEndOfCategory) {
      startTimeRef.current = Date.now();

      intervalRef.current = setInterval(() => {
        const elapsed = Date.now() - (startTimeRef.current ?? Date.now());
        const pct = Math.min((elapsed / AUTO_ADVANCE_MS) * 100, 100);
        setProgress(pct);

        if (pct >= 100) {
          clearInterval(intervalRef.current!);
          navigateTo(displayTopic.href);
        }
      }, 50);

      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setProgress(0);
      startTimeRef.current = null;
    }
  }, [isVisible, displayTopic, isDismissed, navigateTo, isScrollIdle, isEndOfCategory]);

  const handleContinue = useCallback(() => {
    if (displayTopic) navigateTo(displayTopic.href);
  }, [displayTopic, navigateTo]);

  const handleShuffle = useCallback(() => {
    const random = getRandomTopic(currentSlug);
    if (random) navigateTo(random.href);
  }, [currentSlug, navigateTo]);

  const handleDismiss = useCallback(() => {
    setIsDismissed(true);
    setIsVisible(false);
  }, []);

  if (!displayTopic) return null;

  const firstMetric = displayTopic.metrics[0];
  const status = getMetricStatus(firstMetric.direction, firstMetric.polarity);
  const metricColour = STATUS_COLOUR[status];
  const preposition = displayTopic.preposition ? ` ${displayTopic.preposition}` : ' in';

  return (
    <>
      {/* Page fade-out overlay */}
      <div
        className="fixed inset-0 z-[60] bg-white pointer-events-none"
        style={{
          opacity: isFadingOut ? 1 : 0,
          transition: isFadingOut ? 'opacity 180ms ease-in' : 'none',
        }}
      />

      {/* Bar */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ease-out ${
          isVisible && !isDismissed ? 'translate-y-0' : 'translate-y-full'
        }`}
        aria-hidden={!isVisible || isDismissed}
      >
        {/* Progress bar — only shown for category-aware next (not random) */}
        {!isEndOfCategory && (
          <div className="h-[3px] bg-wiah-border overflow-hidden">
            <div
              className="h-full"
              style={{
                width: `${progress}%`,
                backgroundColor: displayTopic.colour,
                transition: progress === 0 ? 'none' : 'width 50ms linear',
              }}
            />
          </div>
        )}

        {/* Panel */}
        <div className="bg-white/95 backdrop-blur border-t border-wiah-border">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-4">

            <div
              className="w-[3px] h-10 rounded-full shrink-0"
              style={{ backgroundColor: displayTopic.colour }}
            />

            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-mono text-wiah-mid uppercase tracking-widest mb-0.5">
                {isEndOfCategory
                  ? `You\u2019ve explored all of ${category?.name ?? 'this category'}`
                  : `Next in ${category?.name ?? 'this category'}`
                }
              </p>
              <p className="text-sm font-semibold text-wiah-black truncate leading-tight">
                <span style={{ fontFamily: 'var(--font-editorial), Georgia, serif' }}>
                  What is <em><strong>actually</strong></em> happening{preposition}{' '}
                  {displayTopic.topic}
                </span>
              </p>
              <p className="text-[11px] font-mono text-wiah-mid truncate mt-0.5">
                <span style={{ color: metricColour }}>
                  {firstMetric.value}{firstMetric.unit ? ` ${firstMetric.unit}` : ''}
                  {' '}
                  {firstMetric.direction === 'up' ? '↑' : firstMetric.direction === 'down' ? '↓' : '→'}
                </span>
                {firstMetric.context ? ` · ${firstMetric.context}` : ''}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {/* Shuffle button — always available */}
              <button
                onClick={handleShuffle}
                className="text-wiah-mid hover:text-wiah-black transition-colors p-1.5 rounded-md hover:bg-wiah-light"
                aria-label="Go to a random topic"
                title="Surprise me"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 4h2.5a4 4 0 0 1 3.2 1.6L8 7.5l1.3 1.9A4 4 0 0 0 12.5 11H15" />
                  <path d="M1 11h2.5a4 4 0 0 0 3.2-1.6" />
                  <path d="M12.5 4H15" />
                  <path d="M13 2l2 2-2 2" />
                  <path d="M13 9l2 2-2 2" />
                </svg>
              </button>

              <button
                onClick={handleContinue}
                className="text-sm font-medium text-wiah-blue hover:text-wiah-black transition-colors flex items-center gap-1"
              >
                {isEndOfCategory ? 'Explore' : 'Continue'} <span aria-hidden>→</span>
              </button>
              <button
                onClick={handleDismiss}
                className="text-wiah-mid hover:text-wiah-black transition-colors text-lg leading-none"
                aria-label="Dismiss"
              >
                ×
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
