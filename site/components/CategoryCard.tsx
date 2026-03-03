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
  context?: string;
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

function getStatusColour(direction: Direction, polarity: Polarity): string {
  return getSparklineColour(direction, polarity);
}

export default function CategoryCard({ topic, href, colour, metrics, preposition }: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="block border border-wiah-border rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow group"
    >
      {/* Coloured top accent */}
      <div className="h-1" style={{ backgroundColor: colour }} />

      <div className="p-6">
        <p className="mb-5" style={{ color: colour }}>
          <SiteName size="nav" topic={topic} preposition={preposition} />
        </p>

        <div className="space-y-5">
          {metrics.map((m) => {
            const sparkColour = getSparklineColour(m.direction, m.polarity);
            const statusColour = getStatusColour(m.direction, m.polarity);

            return (
              <div key={m.label}>
                <p className="text-xs text-wiah-mid font-mono mb-1.5">{m.label}</p>
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-mono text-2xl font-bold text-wiah-black">
                        {m.value}
                      </span>
                      {m.unit && (
                        <span className="font-mono text-xs text-wiah-mid">{m.unit}</span>
                      )}
                      <DirectionArrow direction={m.direction} polarity={m.polarity} size={15} />
                    </div>
                    {m.context && (
                      <p className="font-mono text-xs mt-1" style={{ color: statusColour }}>
                        {m.context}
                      </p>
                    )}
                  </div>
                  {m.sparklineData && m.sparklineData.length > 1 && (
                    <Sparkline
                      data={m.sparklineData}
                      colour={sparkColour}
                      width={80}
                      height={28}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Link>
  );
}
