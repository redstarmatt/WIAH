'use client';

import DirectionArrow, { Direction, Polarity } from './DirectionArrow';
import Sparkline from './charts/Sparkline';

interface MetricCardProps {
  label: string;
  value: string;
  unit?: string;
  direction: Direction;
  polarity: Polarity;
  changeText?: string;
  sparklineData?: number[];
  source?: string;
  onExpand?: () => void;
}

const SIGNAL_COLOURS: Record<string, string> = {
  bad: '#E63946',
  good: '#2A9D8F',
  flat: '#F4A261',
};

function getSparklineColour(direction: Direction, polarity: Polarity): string {
  if (direction === 'flat') return SIGNAL_COLOURS.flat;
  const isBad =
    (direction === 'up' && polarity === 'up-is-bad') ||
    (direction === 'down' && polarity === 'up-is-good');
  return isBad ? SIGNAL_COLOURS.bad : SIGNAL_COLOURS.good;
}

export default function MetricCard({
  label,
  value,
  unit,
  direction,
  polarity,
  changeText,
  sparklineData,
  source,
  onExpand,
}: MetricCardProps) {
  const sparkColour = getSparklineColour(direction, polarity);
  const isClickable = !!onExpand;

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
        <p className="font-mono text-xs text-wiah-mid mb-2">{changeText}</p>
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

  if (isClickable) {
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

  return (
    <div className="border border-wiah-border rounded-lg p-5 bg-white">
      {content}
    </div>
  );
}
