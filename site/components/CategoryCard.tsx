'use client';

import Link from 'next/link';
import SiteName from './SiteName';
import DirectionArrow, { Direction, Polarity } from './DirectionArrow';
import Sparkline from './charts/Sparkline';

interface Metric {
  label: string;
  value: string;
  unit?: string;
  direction: Direction;
  polarity: Polarity;
  sparklineData?: number[];
}

interface CategoryCardProps {
  topic: string;
  href: string;
  colour: string;
  metrics: Metric[];
  preposition?: string;
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

export default function CategoryCard({ topic, href, colour, metrics, preposition }: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="block border border-wiah-border rounded-lg p-6 bg-white hover:shadow-sm transition-shadow"
    >
      <p className="mb-4" style={{ color: colour }}>
        <SiteName size="nav" topic={topic} preposition={preposition} />
      </p>
      <div className="space-y-3">
        {metrics.map((m) => (
          <div key={m.label} className="flex items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-wiah-mid truncate">{m.label}</p>
              <div className="flex items-baseline gap-1.5">
                <span className="font-mono text-lg font-bold text-wiah-black">
                  {m.value}
                </span>
                {m.unit && (
                  <span className="font-mono text-xs text-wiah-mid">{m.unit}</span>
                )}
                <DirectionArrow direction={m.direction} polarity={m.polarity} size={14} />
              </div>
            </div>
            {m.sparklineData && m.sparklineData.length > 1 && (
              <Sparkline
                data={m.sparklineData}
                colour={getSparklineColour(m.direction, m.polarity)}
                width={60}
                height={16}
              />
            )}
          </div>
        ))}
      </div>
    </Link>
  );
}
