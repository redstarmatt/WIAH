interface SourceAttributionProps {
  name: string;
  dataset: string;
  date?: string;
  frequency?: string;
  url?: string;
}

export default function SourceAttribution({ name, dataset, date, frequency, url }: SourceAttributionProps) {
  const text = [
    `Source: ${name}`,
    dataset,
    date,
    frequency ? `Updated ${frequency}` : null,
  ].filter(Boolean).join(', ');

  return (
    <p className="font-mono text-[11px] text-wiah-mid mt-2">
      {url ? (
        <a href={url} target="_blank" rel="noopener noreferrer" className="hover:underline">
          {text}
        </a>
      ) : (
        text
      )}
    </p>
  );
}
