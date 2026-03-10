'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SiteName from './SiteName';
import SearchTrigger from './SearchTrigger';
import ShareButton from './ShareButton';
import { getCategoryForTopic } from '@/lib/topics';

interface TopicNavProps {
  topic: string;
  shareTitle?: string;
  shareText?: string;
}

export default function TopicNav({ topic, shareTitle, shareText }: TopicNavProps) {
  const pathname = usePathname();
  const slug = pathname.replace(/^\//, '').split('/')[0];
  const category = getCategoryForTopic(slug);
  const backHref = category ? `/?cat=${category.slug}` : '/';
  const backLabel = category ? `\u2190 ${category.name}` : '\u2190 All topics';

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-wiah-border px-4 sm:px-6 py-3">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
        {/* Full site name — hidden on mobile, shown from sm up */}
        <Link href="/" className="hidden sm:block shrink-0">
          <SiteName size="nav" />
        </Link>
        {/* Topic label — always visible, centered on mobile */}
        <span className="text-wiah-mid text-sm font-mono truncate flex-1 min-w-0 text-center sm:text-left">
          {topic}
        </span>
        {/* Search + share + back link */}
        <div className="flex items-center gap-3 shrink-0">
          <SearchTrigger variant="dark" />
          <ShareButton title={shareTitle} text={shareText} />
          <Link href={backHref} className="text-sm text-wiah-blue hover:underline whitespace-nowrap">
            {backLabel}
          </Link>
        </div>
      </div>
    </nav>
  );
}
