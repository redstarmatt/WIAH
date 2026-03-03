'use client';

import { useState } from 'react';
import Link from 'next/link';
import SiteName from '@/components/SiteName';
import Sparkline from '@/components/charts/Sparkline';
import DirectionArrow, { Direction, Polarity } from '@/components/DirectionArrow';

// ── Data ─────────────────────────────────────────────────────────────────────

interface Metric {
  topic: string;
  href: string;
  colour: string;
  label: string;
  value: string;
  unit: string;
  direction: Direction;
  polarity: Polarity;
  context: string;
  sparklineData: number[];
}

const METRICS: Metric[] = [
  // Health
  { topic: 'Health', href: '/health', colour: '#E63946', label: 'Average GP wait', value: '21.3', unit: 'days', direction: 'up', polarity: 'up-is-bad', context: 'doubled since 2015', sparklineData: [12.1, 13.4, 14.2, 15.8, 16.3, 17.1, 18.9, 19.4, 20.1, 20.8, 21.3] },
  { topic: 'Health', href: '/health', colour: '#E63946', label: 'Cat 2 ambulance wait', value: '34', unit: 'min', direction: 'up', polarity: 'up-is-bad', context: 'target: 18 min', sparklineData: [18, 20, 22, 25, 28, 32, 39, 42, 38, 35, 34] },
  // Housing
  { topic: 'Housing', href: '/housing', colour: '#F4A261', label: 'House price to earnings', value: '7.7', unit: '×', direction: 'up', polarity: 'up-is-bad', context: 'was 4× in 1997', sparklineData: [7.52, 7.72, 7.91, 8.04, 7.88, 7.86, 9.06, 8.56, 8.40, 7.71] },
  { topic: 'Housing', href: '/housing', colour: '#F4A261', label: 'Average monthly rent', value: '£1,381', unit: '/mo', direction: 'up', polarity: 'up-is-bad', context: '+34% since 2019', sparklineData: [1029, 1043, 1065, 1076, 1104, 1166, 1264, 1375, 1381] },
  // Water
  { topic: 'Water', href: '/water', colour: '#264653', label: 'Sewage discharge hours', value: '3.6M', unit: 'hrs', direction: 'up', polarity: 'up-is-bad', context: 'up from 0.1M in 2016', sparklineData: [0.1, 0.17, 0.9, 2.5, 3.1, 2.7, 1.8, 3.6, 3.6] },
  { topic: 'Water', href: '/water', colour: '#264653', label: 'Rivers in good health', value: '16', unit: '%', direction: 'down', polarity: 'up-is-good', context: 'target: 75% by 2027', sparklineData: [26, 22, 17, 17, 16] },
  // Justice
  { topic: 'Justice', href: '/justice', colour: '#6B7280', label: 'Crimes leading to charge', value: '7.3', unit: '%', direction: 'down', polarity: 'up-is-good', context: 'halved in 10 years', sparklineData: [15.5, 13.1, 11.2, 9.1, 7.8, 7.0, 7.3, 5.6, 5.7, 6.4, 7.3] },
  { topic: 'Justice', href: '/justice', colour: '#6B7280', label: 'Crown court backlog', value: '79.6K', unit: 'cases', direction: 'up', polarity: 'up-is-bad', context: 'record high', sparklineData: [38.1, 33.1, 40.9, 59.8, 58.1, 62.0, 68.9, 72.8, 76.6, 78.1, 79.6] },
  // Economy
  { topic: 'Economy', href: '/economy', colour: '#2A9D8F', label: 'CPI inflation', value: '3.0', unit: '%', direction: 'up', polarity: 'up-is-bad', context: 'peaked at 11.1% in 2022', sparklineData: [1.8, 1.8, 0.7, 5.5, 10.1, 4.0, 3.0, 3.0] },
  { topic: 'Economy', href: '/economy', colour: '#2A9D8F', label: 'Real weekly pay', value: '£527', unit: '/wk', direction: 'up', polarity: 'up-is-good', context: '+£41 since 2019', sparklineData: [486, 494, 500, 516, 520, 508, 515, 522, 527] },
  // Immigration
  { topic: 'Immigration', href: '/immigration', colour: '#6B7280', label: 'Net migration', value: '204K', unit: '/yr', direction: 'down', polarity: 'up-is-bad', context: 'down from 906K peak', sparklineData: [184, 329, 239, 226, 173, 672, 764, 906, 728, 204] },
  { topic: 'Immigration', href: '/immigration', colour: '#6B7280', label: 'Small boat crossings', value: '41K', unit: '2025', direction: 'up', polarity: 'up-is-bad', context: 'up from 300 in 2019', sparklineData: [0.3, 1.8, 8.5, 28.5, 45.8, 29.4, 36.8, 41.5] },
  // Energy
  { topic: 'Energy', href: '/energy', colour: '#E63946', label: 'Renewable share', value: '45', unit: '%', direction: 'up', polarity: 'up-is-good', context: 'up from 3% in 2010', sparklineData: [2.8, 6.9, 11.3, 14.9, 19.1, 24.6, 24.5, 29.3, 33.1, 37.1, 43.1, 41.4, 41.5, 40.8, 45.2] },
  { topic: 'Energy', href: '/energy', colour: '#E63946', label: 'Electricity price index', value: '201', unit: '2015=100', direction: 'up', polarity: 'up-is-bad', context: 'doubled since 2015', sparklineData: [86, 90, 94, 97, 100, 103, 107, 110, 119, 122, 127, 143, 201, 186, 180, 201] },
  // Transport
  { topic: 'Transport', href: '/transport', colour: '#F4A261', label: 'Rail punctuality', value: '86', unit: '% on time', direction: 'down', polarity: 'up-is-good', context: 'target: 92%', sparklineData: [89.8, 88.0, 87.2, 86.9, 87.4, 85.5, 92.0, 87.0, 84.5, 85.0, 86.2] },
  { topic: 'Transport', href: '/transport', colour: '#F4A261', label: 'Bus journeys', value: '3.7', unit: 'bn/yr', direction: 'down', polarity: 'up-is-good', context: 'down from 4.6bn pre-Covid', sparklineData: [4.6, 4.5, 4.4, 4.4, 4.3, 1.6, 3.2, 3.5, 3.7] },
  // Social Care
  { topic: 'Social Care', href: '/social-care', colour: '#6B7280', label: 'Patients delayed daily', value: '13.2K', unit: '', direction: 'up', polarity: 'up-is-bad', context: 'up 44% since 2019', sparklineData: [9.2, 10.6, 12.8, 12.4, 13.1, 13.5, 14.2, 13.8, 13.4, 13.1, 14.3, 13.7, 12.9, 12.6, 13.5, 13.2] },
  { topic: 'Social Care', href: '/social-care', colour: '#6B7280', label: 'CQC rated Good+', value: '84', unit: '%', direction: 'flat', polarity: 'up-is-good', context: 'broadly stable', sparklineData: [] },
  // Education
  { topic: 'Education', href: '/education', colour: '#2A9D8F', label: 'Persistent absence', value: '20.0', unit: '%', direction: 'up', polarity: 'up-is-bad', context: 'was 10.5% pre-Covid', sparklineData: [10.5, 10.8, 11.2, 10.9, 12.1, 22.5, 21.2, 20.0] },
  { topic: 'Education', href: '/education', colour: '#2A9D8F', label: 'Disadvantage gap index', value: '3.92', unit: '', direction: 'up', polarity: 'up-is-bad', context: 'widening since 2017', sparklineData: [3.78, 3.70, 3.68, 3.66, 3.66, 3.79, 3.84, 3.94, 3.93, 3.92] },
];

// Preserve topic insertion order
const TOPIC_ORDER = Array.from(new Set(METRICS.map(m => m.topic)));

// ── Helpers ──────────────────────────────────────────────────────────────────

type Status = 'worse' | 'better' | 'stable';

function getStatus(m: Metric): Status {
  if (m.direction === 'flat') return 'stable';
  const isBad =
    (m.direction === 'up' && m.polarity === 'up-is-bad') ||
    (m.direction === 'down' && m.polarity === 'up-is-good');
  return isBad ? 'worse' : 'better';
}

function getSparkColour(m: Metric): string {
  const s = getStatus(m);
  if (s === 'worse') return '#E63946';
  if (s === 'better') return '#2A9D8F';
  return '#F4A261';
}

const STATUS_COLOUR: Record<Status, string> = {
  worse: '#E63946',
  better: '#2A9D8F',
  stable: '#F4A261',
};

const STATUS_LABEL: Record<Status, string> = {
  worse: 'getting worse',
  better: 'getting better',
  stable: 'stable',
};

type FilterMode = 'all' | 'worse' | 'better' | 'stable';

// ── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [filter, setFilter] = useState<FilterMode>('all');

  const worseCount = METRICS.filter(m => getStatus(m) === 'worse').length;
  const betterCount = METRICS.filter(m => getStatus(m) === 'better').length;
  const stableCount = METRICS.filter(m => getStatus(m) === 'stable').length;
  const total = METRICS.length;

  const filtered = filter === 'all'
    ? METRICS
    : METRICS.filter(m => getStatus(m) === filter);

  return (
    <>
      {/* Sticky nav */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-wiah-border px-6 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/"><SiteName size="nav" /></Link>
          <span className="text-wiah-mid text-sm font-mono hidden sm:block">Dashboard</span>
          <Link href="/" className="text-sm text-wiah-blue hover:underline font-mono">&larr; All topics</Link>
        </div>
      </nav>

      {/* Dark hero */}
      <section className="bg-wiah-dark text-white px-6 py-10 md:py-14">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            State of the Nation
          </h1>
          <p className="mt-2 text-wiah-mid text-sm max-w-xl font-mono">
            {total} headline metrics across {TOPIC_ORDER.length} topics.
          </p>

          {/* Proportion bar */}
          <div className="mt-6 max-w-sm">
            <div className="flex h-2 rounded-full overflow-hidden">
              <div
                className="transition-all"
                style={{ width: `${(worseCount / total) * 100}%`, backgroundColor: '#E63946' }}
              />
              <div
                className="transition-all"
                style={{ width: `${(betterCount / total) * 100}%`, backgroundColor: '#2A9D8F' }}
              />
              <div
                className="transition-all"
                style={{ width: `${(stableCount / total) * 100}%`, backgroundColor: '#F4A261' }}
              />
            </div>
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-2.5 mt-5">
            <button
              onClick={() => setFilter(filter === 'worse' ? 'all' : 'worse')}
              className={`px-4 py-2 rounded-full font-mono text-xs transition-colors ${
                filter === 'worse'
                  ? 'bg-[#E63946] text-white'
                  : 'bg-[#E63946]/20 text-[#E63946] hover:bg-[#E63946]/30'
              }`}
            >
              {worseCount} getting worse
            </button>
            <button
              onClick={() => setFilter(filter === 'better' ? 'all' : 'better')}
              className={`px-4 py-2 rounded-full font-mono text-xs transition-colors ${
                filter === 'better'
                  ? 'bg-[#2A9D8F] text-white'
                  : 'bg-[#2A9D8F]/20 text-[#2A9D8F] hover:bg-[#2A9D8F]/30'
              }`}
            >
              {betterCount} getting better
            </button>
            <button
              onClick={() => setFilter(filter === 'stable' ? 'all' : 'stable')}
              className={`px-4 py-2 rounded-full font-mono text-xs transition-colors ${
                filter === 'stable'
                  ? 'bg-[#F4A261] text-white'
                  : 'bg-[#F4A261]/20 text-[#F4A261] hover:bg-[#F4A261]/30'
              }`}
            >
              {stableCount} stable
            </button>
            {filter !== 'all' && (
              <button
                onClick={() => setFilter('all')}
                className="px-4 py-2 rounded-full font-mono text-xs bg-white/10 text-white/60 hover:bg-white/20 transition-colors"
              >
                Show all
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Topic-grouped card layout */}
      <main className="max-w-5xl mx-auto px-6 py-10">
        {filter !== 'all' && (
          <p className="font-mono text-xs text-wiah-mid mb-6">
            Showing {filtered.length} of {total} metrics ·{' '}
            <button onClick={() => setFilter('all')} className="text-wiah-blue hover:underline">
              show all
            </button>
          </p>
        )}

        <div className="space-y-10">
          {TOPIC_ORDER.map(topic => {
            const topicMetrics = filtered.filter(m => m.topic === topic);
            if (topicMetrics.length === 0) return null;

            const topicColour = topicMetrics[0].colour;
            const topicHref = topicMetrics[0].href;

            return (
              <section key={topic}>
                {/* Topic header */}
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: topicColour }}
                  />
                  <span className="text-sm font-bold text-wiah-black">{topic}</span>
                  <div className="flex-1 h-px bg-wiah-border" />
                  <Link
                    href={topicHref}
                    className="text-xs font-mono text-wiah-blue hover:underline flex-shrink-0"
                  >
                    Full story →
                  </Link>
                </div>

                {/* Metric cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {topicMetrics.map(m => {
                    const status = getStatus(m);
                    const sparkColour = getSparkColour(m);

                    return (
                      <Link
                        href={m.href}
                        key={m.label}
                        className="block border border-wiah-border rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow group"
                      >
                        {/* Top accent */}
                        <div className="h-0.5" style={{ backgroundColor: STATUS_COLOUR[status] }} />

                        <div className="p-5">
                          <p className="text-xs text-wiah-mid font-mono mb-3">{m.label}</p>

                          <div className="flex items-end justify-between gap-3">
                            <div>
                              <div className="flex items-baseline gap-1.5">
                                <span className="font-mono text-2xl font-bold text-wiah-dark">
                                  {m.value}
                                </span>
                                {m.unit && (
                                  <span className="font-mono text-xs text-wiah-mid">{m.unit}</span>
                                )}
                                <DirectionArrow direction={m.direction} polarity={m.polarity} size={18} />
                              </div>
                              <p
                                className="font-mono text-xs mt-1.5"
                                style={{ color: STATUS_COLOUR[status] }}
                              >
                                {m.context}
                              </p>
                            </div>

                            {m.sparklineData.length > 1 && (
                              <Sparkline
                                data={m.sparklineData}
                                colour={sparkColour}
                                width={80}
                                height={28}
                              />
                            )}
                          </div>

                          <div className="mt-3 pt-3 border-t border-wiah-border/50">
                            <span
                              className="font-mono text-xs"
                              style={{ color: STATUS_COLOUR[status] }}
                            >
                              {STATUS_LABEL[status]}
                            </span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        {/* Footer */}
        <footer className="border-t border-wiah-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-wiah-mid">
            <p className="font-mono text-xs">
              All data sourced from official UK government statistics.
              See individual topic pages for full sources and methodology.
            </p>
            <p className="font-mono text-xs">
              Last updated: 2026-03-03
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
