'use client';

interface Props {
  total: number;
  activeIndex: number;
  onSelect: (i: number) => void;
  labels: string[];
}

export default function ScrollNav({ total, activeIndex, onSelect, labels }: Props) {
  return (
    <div className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-[5px]">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          title={labels[i]}
          aria-label={`Go to: ${labels[i]}`}
          className="group relative flex items-center justify-end"
        >
          {/* Tooltip label */}
          <span className="absolute right-5 font-mono text-[10px] text-wiah-dark bg-white border border-wiah-border px-2 py-0.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-sm">
            {labels[i]}
          </span>
          {/* Tick mark */}
          <span
            className="block rounded-full transition-all duration-300"
            style={{
              width: i === activeIndex ? '8px' : '4px',
              height: i === activeIndex ? '8px' : '4px',
              backgroundColor: i === activeIndex ? '#0D1117' : '#D1D5DB',
            }}
          />
        </button>
      ))}
    </div>
  );
}
