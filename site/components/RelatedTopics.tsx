'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getSiblingTopics, getCategoryForTopic, getMetricStatus, STATUS_COLOUR } from '@/lib/topics';

export default function RelatedTopics() {
  const pathname = usePathname();
  const slug = pathname.replace(/^\//, '').split('/')[0];
  const category = getCategoryForTopic(slug);
  const siblings = getSiblingTopics(slug, 4);

  if (!category || siblings.length === 0) return null;

  return (
    <section className="mt-16 mb-8 pt-12 border-t border-wiah-border">
      <h3 className="text-xs font-mono text-wiah-mid uppercase tracking-widest mb-6">
        More in {category.name}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {siblings.map(topic => {
          const metric = topic.metrics[0];
          const status = getMetricStatus(metric.direction, metric.polarity);
          const colour = STATUS_COLOUR[status];
          const preposition = topic.preposition ? ` ${topic.preposition}` : ' in';

          return (
            <Link
              key={topic.slug}
              href={topic.href}
              className="group block border border-wiah-border rounded-lg p-4 hover:border-wiah-mid transition-colors"
            >
              <p className="text-[11px] font-mono text-wiah-mid mb-2 leading-tight" style={{ fontFamily: 'var(--font-editorial), Georgia, serif' }}>
                What is <em><strong>actually</strong></em> happening{preposition}
              </p>
              <p className="text-sm font-semibold text-wiah-black mb-3 leading-snug group-hover:text-wiah-blue transition-colors">
                {topic.topic}
              </p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-mono font-bold" style={{ color: colour }}>
                  {metric.value}{metric.unit ? ` ${metric.unit}` : ''}
                </span>
                <span className="text-sm" style={{ color: colour }}>
                  {metric.direction === 'up' ? '↑' : metric.direction === 'down' ? '↓' : '→'}
                </span>
              </div>
              {metric.context && (
                <p className="text-[10px] font-mono text-wiah-mid mt-1 truncate">
                  {metric.context}
                </p>
              )}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
