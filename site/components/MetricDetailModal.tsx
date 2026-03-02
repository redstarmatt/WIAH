'use client';

import { useEffect, useCallback } from 'react';
import LineChart, { Series, Annotation, TargetLine } from './charts/LineChart';

interface MetricDetailModalProps {
  title: string;
  subtitle?: string;
  series: Series[];
  annotations?: Annotation[];
  targetLine?: TargetLine;
  yLabel?: string;
  source?: {
    name: string;
    dataset: string;
    url?: string;
    frequency?: string;
  };
  onClose: () => void;
}

export default function MetricDetailModal({
  title,
  subtitle,
  series,
  annotations,
  targetLine,
  yLabel,
  source,
  onClose,
}: MetricDetailModalProps) {
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
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Content */}
      <div className="relative bg-white rounded-xl shadow-2xl w-[calc(100%-2rem)] max-w-4xl max-h-[90vh] overflow-y-auto mx-4">
        {/* Close button */}
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
