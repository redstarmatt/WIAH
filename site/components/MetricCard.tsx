'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import DirectionArrow, { Direction, Polarity } from './DirectionArrow';
import Sparkline from './charts/Sparkline';
import LineChart, { Series, Annotation, TargetLine } from './charts/LineChart';

interface MetricCardProps {
  label: string;
  value: string;
  unit?: string;
  direction: Direction;
  polarity: Polarity;
  changeText?: string;
  baseline?: string;
  sparklineData?: number[];
  source?: string;
  href?: string;
  onExpand?: () => void;
  /** Optional: full chart series for the expanded modal. If omitted, sparklineData is used. */
  expandedSeries?: Series[];
  expandedTitle?: string;
  expandedSubtitle?: string;
  expandedYLabel?: string;
  expandedAnnotations?: Annotation[];
  expandedTargetLine?: TargetLine;
  expandedSource?: {
    name: string;
    dataset: string;
    url?: string;
    frequency?: string;
  };
}

const SIGNAL_COLOURS: Record<string, string> = {
  bad: '#E63946',
  good: '#2A9D8F',
  flat: '#F4A261',
};

function getSparklineColour(direction: Direction, polarity: Polarity): string {
  if (polarity === 'neutral') return SIGNAL_COLOURS.flat;
  if (direction === 'flat') return SIGNAL_COLOURS.flat;
  const isBad =
    (direction === 'up' && polarity === 'up-is-bad') ||
    (direction === 'down' && polarity === 'up-is-good');
  return isBad ? SIGNAL_COLOURS.bad : SIGNAL_COLOURS.good;
}

/* ── Inline expanded modal ──────────────────────────────────────────────── */

function ExpandedModal({
  title,
  subtitle,
  series,
  annotations,
  targetLine,
  yLabel,
  source,
  onClose,
}: {
  title: string;
  subtitle?: string;
  series: Series[];
  annotations?: Annotation[];
  targetLine?: TargetLine;
  yLabel?: string;
  source?: { name: string; dataset: string; url?: string; frequency?: string };
  onClose: () => void;
}) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-xl shadow-2xl w-[calc(100%-2rem)] max-w-4xl max-h-[90vh] overflow-y-auto mx-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full hover:bg-wiah-light transition-colors text-wiah-mid hover:text-wiah-black"
          aria-label="Close"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4l8 8M12 4l-8 8" />
          </svg>
        </button>
        <div className="p-6 sm:p-8">
          <LineChart
            title={title}
            subtitle={subtitle}
            series={series}
            annotations={annotations}
            targetLine={targetLine}
            yLabel={yLabel}
            source={source}
          />
        </div>
      </div>
    </div>
  );
}

/* ── MetricCard ──────────────────────────────────────────────────────────── */

export default function MetricCard({
  label,
  value,
  unit,
  direction,
  polarity,
  changeText,
  baseline,
  sparklineData,
  source,
  href,
  onExpand,
  expandedSeries,
  expandedTitle,
  expandedSubtitle,
  expandedYLabel,
  expandedAnnotations,
  expandedTargetLine,
  expandedSource,
}: MetricCardProps) {
  const [showModal, setShowModal] = useState(false);
  const sparkColour = getSparklineColour(direction, polarity);

  // Determine if this card can self-expand (has sparkline or explicit series)
  const canSelfExpand = !href && !onExpand && (!!expandedSeries || (sparklineData && sparklineData.length > 1));
  const isClickable = !!href || !!onExpand || canSelfExpand;

  // Build series for the modal from sparklineData if no explicit series provided
  const modalSeries: Series[] = expandedSeries
    ? expandedSeries
    : sparklineData && sparklineData.length > 1
      ? [
          {
            id: 'trend',
            label: label,
            colour: sparkColour,
            data: sparklineData.map((v, i) => ({
              date: new Date(new Date().getFullYear() - sparklineData.length + 1 + i, 0, 1),
              value: v,
            })),
          },
        ]
      : [];

  const modalTitle = expandedTitle || label;
  const modalSubtitle = expandedSubtitle || changeText;
  const modalYLabel = expandedYLabel || (unit ? `${label} (${unit})` : undefined);
  const modalSource = expandedSource || (source ? { name: source, dataset: '' } : undefined);

  const handleSelfExpand = () => {
    setShowModal(true);
  };

  const content = (
    <>
      <p className="text-[13px] text-wiah-mid mb-1">{label}</p>
      <div className="flex items-baseline gap-2 mb-1">
        <span className="font-mono text-[32px] font-bold text-wiah-dark leading-none">
          {value}
        </span>
        {unit && (
          <span className="font-mono text-sm text-wiah-mid">{unit}</span>
        )}
        <DirectionArrow direction={direction} polarity={polarity} size={24} />
      </div>
      {changeText && (
        <p className="font-mono text-xs text-wiah-mid mb-1">{changeText}</p>
      )}
      {baseline && (
        <p className="text-xs text-wiah-mid italic mb-2 leading-snug">{baseline}</p>
      )}
      {sparklineData && sparklineData.length > 1 && (
        <div className="mb-2">
          <Sparkline data={sparklineData} colour={sparkColour} />
        </div>
      )}
      <div className="flex items-center justify-between">
        {source && (
          <p className="font-mono text-[11px] text-wiah-mid mt-1">{source}</p>
        )}
        {isClickable && (
          <p className="font-mono text-[11px] text-wiah-blue mt-1">View chart →</p>
        )}
      </div>
    </>
  );

  // href-based card (scrolls to section)
  if (href) {
    return (
      <Link
        href={href}
        className="block border border-wiah-border rounded-lg p-5 bg-white transition-colors hover:border-wiah-blue hover:bg-slate-50"
      >
        {content}
      </Link>
    );
  }

  // Explicit onExpand callback (page manages its own modal)
  if (onExpand) {
    return (
      <button
        type="button"
        onClick={onExpand}
        className="border border-wiah-border rounded-lg p-5 bg-white text-left w-full transition-colors hover:border-wiah-blue hover:bg-slate-50 cursor-pointer"
      >
        {content}
      </button>
    );
  }

  // Self-expanding card — has sparkline or explicit series data
  if (canSelfExpand) {
    return (
      <>
        <button
          type="button"
          onClick={handleSelfExpand}
          className="border border-wiah-border rounded-lg p-5 bg-white text-left w-full transition-colors hover:border-wiah-blue hover:bg-slate-50 cursor-pointer"
        >
          {content}
        </button>
        {showModal && modalSeries.length > 0 && (
          <ExpandedModal
            title={modalTitle}
            subtitle={modalSubtitle}
            series={modalSeries}
            annotations={expandedAnnotations}
            targetLine={expandedTargetLine}
            yLabel={modalYLabel}
            source={modalSource}
            onClose={() => setShowModal(false)}
          />
        )}
      </>
    );
  }

  // Fallback: static card (no sparkline data at all)
  return (
    <div className="border border-wiah-border rounded-lg p-5 bg-white">
      {content}
    </div>
  );
}
