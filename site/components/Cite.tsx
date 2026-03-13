'use client';

interface CiteProps {
  /** Reference number(s) — e.g. 1 or [1, 3] for multiple citations */
  nums: number | number[];
}

/**
 * Inline superscript citation marker. Renders as [1] or [1,3] and links
 * to the corresponding <References> entry on the same page.
 */
export default function Cite({ nums }: CiteProps) {
  const arr = Array.isArray(nums) ? nums : [nums];
  return (
    <sup className="text-[10px] text-wiah-blue font-mono ml-[1px]">
      [
      {arr.map((n, i) => (
        <span key={n}>
          {i > 0 && ','}
          <a
            href={`#ref-${n}`}
            className="hover:underline"
            aria-label={`Reference ${n}`}
          >
            {n}
          </a>
        </span>
      ))}
      ]
    </sup>
  );
}
