'use client';

import { useState } from 'react';
import Link from 'next/link';
import DirectionArrow from './DirectionArrow';
import { TopicEntry } from '@/lib/topics';

interface CompactTopicListProps {
  topics: TopicEntry[];
  maxVisible?: number;
}

export default function CompactTopicList({ topics, maxVisible = 6 }: CompactTopicListProps) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? topics : topics.slice(0, maxVisible);
  const hasMore = topics.length > maxVisible;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-1">
        {visible.map((t) => {
          const m = t.metrics[0];
          if (!m) return null;
          return (
            <Link
              key={t.slug}
              href={t.href}
              className="flex items-baseline justify-between gap-2 py-2 border-b border-wiah-border/40 hover:bg-wiah-light/50 transition-colors px-1 -mx-1 rounded-sm group"
            >
              <span className="text-sm font-semibold text-wiah-black group-hover:text-wiah-blue truncate">
                {t.topic}
              </span>
              <span className="flex items-baseline gap-1 flex-shrink-0">
                <span className="font-mono text-sm text-wiah-black">{m.value}</span>
                {m.unit && <span className="font-mono text-xs text-wiah-mid">{m.unit}</span>}
                <DirectionArrow direction={m.direction} polarity={m.polarity} size={13} />
              </span>
            </Link>
          );
        })}
      </div>
      {hasMore && !expanded && (
        <button
          onClick={() => setExpanded(true)}
          className="mt-2 font-mono text-xs text-wiah-blue hover:underline"
        >
          + {topics.length - maxVisible} more topics
        </button>
      )}
    </div>
  );
}
