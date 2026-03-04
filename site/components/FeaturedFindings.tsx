'use client';

import Link from 'next/link';
import { getMetricStatus, STATUS_COLOUR, TOPICS } from '@/lib/topics';

/**
 * Editorially curated headline findings — the stats that make you stop scrolling.
 * Each finding is a single data point from a topic, chosen for maximum impact.
 */

interface Finding {
  topicSlug: string;
  metricIndex: number;     // which metric from the topic
  headline: string;        // the stat, rendered large
  context: string;         // one-line editorial framing
  label: string;           // what the number measures
}

const FEATURED: Finding[] = [
  {
    topicSlug: 'nhs-waiting-lists',
    metricIndex: 0,
    headline: '7.6M',
    context: 'people on NHS waiting lists — peak 7.8M in Sep 2023',
    label: 'NHS England',
  },
  {
    topicSlug: 'child-poverty',
    metricIndex: 0,
    headline: '4.3M',
    context: 'children in poverty — 31% of all children in the UK',
    label: 'Child poverty',
  },
  {
    topicSlug: 'water',
    metricIndex: 0,
    headline: '3.6M hrs',
    context: 'of sewage discharged into rivers — up from 100K in 2016',
    label: 'Sewage discharge',
  },
  {
    topicSlug: 'justice',
    metricIndex: 0,
    headline: '7.3%',
    context: 'of crimes lead to a charge — halved in 10 years',
    label: 'Criminal justice',
  },
  {
    topicSlug: 'homelessness',
    metricIndex: 1,
    headline: '159,900',
    context: 'children in temporary accommodation — record high',
    label: 'Homelessness',
  },
  {
    topicSlug: 'education',
    metricIndex: 0,
    headline: '20%',
    context: 'of pupils persistently absent — was 10.5% pre-Covid',
    label: 'School absence',
  },
];

export default function FeaturedFindings() {
  return (
    <section className="px-6 py-14 md:py-20">
      <div className="max-w-5xl mx-auto">
        <p className="font-mono text-xs text-wiah-mid uppercase tracking-wider mb-8">
          Right now
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          {FEATURED.map((f) => {
            const topic = TOPICS[f.topicSlug];
            if (!topic) return null;

            const metric = topic.metrics[f.metricIndex];
            if (!metric) return null;

            const status = getMetricStatus(metric.direction, metric.polarity);
            const colour = STATUS_COLOUR[status];

            return (
              <Link
                key={f.topicSlug}
                href={topic.href}
                className="group block"
              >
                <p
                  className="font-mono text-4xl md:text-5xl font-bold leading-none"
                  style={{ color: colour }}
                >
                  {f.headline}
                </p>
                <p className="mt-3 text-sm text-wiah-black leading-snug">
                  {f.context}
                </p>
                <p className="mt-2 font-mono text-xs text-wiah-mid group-hover:text-wiah-blue transition-colors">
                  {f.label} →
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
