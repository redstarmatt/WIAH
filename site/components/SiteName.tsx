'use client';

interface SiteNameProps {
  size?: 'hero' | 'nav';
  topic?: string;
  preposition?: string;
}

export default function SiteName({ size = 'hero', topic, preposition = 'in' }: SiteNameProps) {
  const fontSize = size === 'hero' ? 'text-[42px]' : 'text-[15px]';

  return (
    <span className={`font-editorial ${fontSize} leading-tight`}>
      What is <strong><em>actually</em></strong> happening{topic ? (
        <span className="font-normal not-italic"> {preposition} {topic}?</span>
      ) : '?'}
    </span>
  );
}
