'use client';

interface PositiveCalloutProps {
  title: string;
  value: string;
  unit?: string;
  description: string;
  source: string;
}

export default function PositiveCallout({
  title,
  value,
  unit,
  description,
  source,
}: PositiveCalloutProps) {
  return (
    <div className="border border-wiah-border rounded-lg overflow-hidden mb-12 flex">
      {/* Green accent bar */}
      <div className="w-1.5 bg-[#2A9D8F] flex-shrink-0" />

      <div className="p-5 flex-1">
        <p className="text-xs font-mono text-[#2A9D8F] uppercase tracking-wider mb-2">
          {title}
        </p>
        <div className="flex items-baseline gap-1 mb-2">
          <span className="font-mono text-2xl font-bold text-wiah-black">
            {value}
          </span>
          {unit && (
            <span className="font-mono text-sm text-wiah-mid">{unit}</span>
          )}
        </div>
        <p className="text-sm text-wiah-black leading-relaxed">{description}</p>
        <p className="font-mono text-[11px] text-wiah-mid mt-3">{source}</p>
      </div>
    </div>
  );
}
