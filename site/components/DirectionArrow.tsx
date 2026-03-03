'use client';

export type Polarity = 'up-is-bad' | 'up-is-good' | 'neutral';
export type Direction = 'up' | 'down' | 'flat';

interface DirectionArrowProps {
  direction: Direction;
  polarity: Polarity;
  size?: number;
}

function getSignalColour(direction: Direction, polarity: Polarity): string {
  if (polarity === 'neutral') return 'text-wiah-mid';
  if (direction === 'flat') return 'text-wiah-amber';
  const isBad =
    (direction === 'up' && polarity === 'up-is-bad') ||
    (direction === 'down' && polarity === 'up-is-good');
  return isBad ? 'text-wiah-red' : 'text-wiah-green';
}

function getArrow(direction: Direction): string {
  if (direction === 'up') return '↑';
  if (direction === 'down') return '↓';
  return '→';
}

function getLabel(direction: Direction): string {
  if (direction === 'up') return 'Increasing';
  if (direction === 'down') return 'Decreasing';
  return 'Stable';
}

export default function DirectionArrow({ direction, polarity, size = 20 }: DirectionArrowProps) {
  const colour = getSignalColour(direction, polarity);

  return (
    <span
      className={`${colour} font-bold inline-flex items-center`}
      style={{ fontSize: size }}
      aria-label={getLabel(direction)}
      role="img"
    >
      {getArrow(direction)}
    </span>
  );
}
