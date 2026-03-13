export interface Reference {
  num: number;
  name: string;
  dataset: string;
  url?: string;
  date?: string;
  note?: string;
}

interface ReferencesProps {
  items: Reference[];
}

/**
 * Numbered reference list rendered below editorial text.
 * Each entry gets an anchor id="ref-{num}" so <Cite> links scroll to it.
 */
export default function References({ items }: ReferencesProps) {
  return (
    <ol className="text-sm text-wiah-mid font-mono space-y-2 list-none pl-0">
      {items.map((ref) => (
        <li key={ref.num} id={`ref-${ref.num}`} className="flex gap-2">
          <span className="text-wiah-blue select-none shrink-0">[{ref.num}]</span>
          <span>
            {ref.url ? (
              <a
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-wiah-blue hover:underline"
              >
                {ref.name} — {ref.dataset}
              </a>
            ) : (
              <span>{ref.name} — {ref.dataset}</span>
            )}
            {ref.date && <span>, {ref.date}</span>}
            {ref.note && <span>. {ref.note}</span>}
          </span>
        </li>
      ))}
    </ol>
  );
}
