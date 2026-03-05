'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { TOPICS, getNextTopic, getMetricStatus, STATUS_COLOUR } from '@/lib/topics';
import DirectionArrow from '@/components/DirectionArrow';

const SHOW_THRESHOLD = 0.90;  // show bar when 90% scrolled
const HIDE_THRESHOLD = 0.84;  // hide bar when scroll back above 84%
const AUTO_ADVANCE_MS = 4000; // auto-navigate after 4 seconds

export default function NextTopicBar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const prevPathnameRef = useRef(pathname);

  // Derive current slug (e.g. '/health' → 'health', '/health/something' → 'health')
  const currentSlug = pathname.replace(/^\//, '').split('/')[0];
  const isTopicPage = Boolean(currentSlug && currentSlug in TOPICS);
  const nextTopic = isTopicPage ? getNextTopic(currentSlug) : null;

  // Reset dismissed state on navigation
  useEffect(() => {
    if (pathname !== prevPathnameRef.current) {
      prevPathnameRef.current = pathname;
      setIsDismissed(false);
      setIsVisible(false);
      setProgress(0);
    }
  }, [pathname]);

  // Scroll listener
  useEffect(() => {
    if (!nextTopic || isDismissed) return;

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      const ratio = window.scrollY / maxScroll;

      setIsVisible(prev => {
        if (!prev && ratio > SHOW_THRESHOLD) return true;
        if (prev && ratio < HIDE_THRESHOLD) return false;
        return prev;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [nextTopic, isDismissed, currentSlug]);

  // Progress timer — starts when visible, resets when hidden
  useEffect(() => {
    if (isVisible && nextTopic && !isDismissed) {
      startTimeRef.current = Date.now();

      intervalRef.current = setInterval(() => {
        const elapsed = Date.now() - (startTimeRef.current ?? Date.now());
        const pct = Math.min((elapsed / AUTO_ADVANCE_MS) * 100, 100);
        setProgress(pct);

        if (pct >= 100) {
          clearInterval(intervalRef.current!);
          router.push(nextTopic.href);
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
  }, [isVisible, nextTopic, isDismissed, router]);

  const handleContinue = useCallback(() => {
    if (nextTopic) router.push(nextTopic.href);
  }, [nextTopic, router]);

  const handleDismiss = useCallback(() => {
    setIsDismissed(true);
    setIsVisible(false);
  }, []);

  if (!nextTopic) return null;

  const firstMetric = nextTopic.metrics[0];
  const status = getMetricStatus(firstMetric.direction, firstMetric.polarity);
  const metricColour = STATUS_COLOUR[status];
  const preposition = nextTopic.preposition ? ` ${nextTopic.preposition}` : ' in';

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ease-out ${
        isVisible && !isDismissed ? 'translate-y-0' : 'translate-y-full'
      }`}
      aria-hidden={!isVisible || isDismissed}
    >
      {/* Progress bar */}
      <div className="h-[3px] bg-wiah-border overflow-hidden">
        <div
          className="h-full"
          style={{
            width: `${progress}%`,
            backgroundColor: nextTopic.colour,
            transition: progress === 0 ? 'none' : 'width 50ms linear',
          }}
        />
      </div>

      {/* Panel */}
      <div className="bg-white/95 backdrop-blur border-t border-wiah-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-4">

          {/* Colour accent */}
          <div
            className="w-[3px] h-10 rounded-full shrink-0"
            style={{ backgroundColor: nextTopic.colour }}
          />

          {/* Topic info */}
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-mono text-wiah-mid uppercase tracking-widest mb-0.5">
              Next up
            </p>
            <p className="text-sm font-semibold text-wiah-black truncate leading-tight">
              <span style={{ fontFamily: 'var(--font-editorial), Georgia, serif' }}>
                What is <em><strong>actually</strong></em> happening{preposition}{' '}
                {nextTopic.topic}
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

          {/* Actions */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleContinue}
              className="text-sm font-medium text-wiah-blue hover:text-wiah-black transition-colors flex items-center gap-1"
            >
              Continue <span aria-hidden>→</span>
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
  );
}
