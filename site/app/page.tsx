import SiteName from '@/components/SiteName';
import CategoryCard from '@/components/CategoryCard';

type Direction = 'up' | 'down' | 'flat';
type Polarity = 'up-is-bad' | 'up-is-good';

interface TopicMetric {
  label: string;
  value: string;
  unit?: string;
  direction: Direction;
  polarity: Polarity;
  context?: string;
  sparklineData?: number[];
}

interface TopicData {
  topic: string;
  href: string;
  colour: string;
  preposition?: string;
  metrics: TopicMetric[];
}

const TOPICS: TopicData[] = [
  {
    topic: 'Health',
    href: '/health',
    colour: '#E63946',
    metrics: [
      {
        label: 'Average GP wait',
        value: '21.3',
        unit: 'days',
        direction: 'up' as const,
        polarity: 'up-is-bad' as const,
        context: 'doubled since 2015',
        sparklineData: [12.1, 13.4, 14.2, 15.8, 16.3, 17.1, 18.9, 19.4, 20.1, 20.8, 21.3],
      },
      {
        label: 'Cat 2 ambulance wait',
        value: '34',
        unit: 'min',
        direction: 'up' as const,
        polarity: 'up-is-bad' as const,
        context: 'target: 18 min',
        sparklineData: [18, 20, 22, 25, 28, 32, 39, 42, 38, 35, 34],
      },
    ],
  },
  {
    topic: 'Housing',
    href: '/housing',
    colour: '#F4A261',
    preposition: 'with',
    metrics: [
      {
        label: 'House price to earnings',
        value: '7.7',
        unit: '×',
        direction: 'up' as const,
        polarity: 'up-is-bad' as const,
        context: 'was 4× in 1997',
        sparklineData: [7.52, 7.72, 7.91, 8.04, 7.88, 7.86, 9.06, 8.56, 8.40, 7.71],
      },
      {
        label: 'Average monthly rent',
        value: '£1,381',
        unit: '/mo',
        direction: 'up' as const,
        polarity: 'up-is-bad' as const,
        context: '+34% since 2019',
        sparklineData: [1029, 1043, 1065, 1076, 1104, 1166, 1264, 1375, 1381],
      },
    ],
  },
  {
    topic: 'Water',
    href: '/water',
    colour: '#264653',
    metrics: [
      {
        label: 'Sewage discharge hours',
        value: '3.6M',
        unit: 'hrs',
        direction: 'up' as const,
        polarity: 'up-is-bad' as const,
        context: 'up from 0.1M in 2016',
        sparklineData: [0.1, 0.17, 0.9, 2.5, 3.1, 2.7, 1.8, 3.6, 3.6],
      },
      {
        label: 'Rivers in good health',
        value: '16',
        unit: '%',
        direction: 'down' as const,
        polarity: 'up-is-good' as const,
        context: 'target: 75% by 2027',
        sparklineData: [26, 22, 17, 17, 16],
      },
    ],
  },
  {
    topic: 'Justice',
    href: '/justice',
    colour: '#6B7280',
    metrics: [
      {
        label: 'Crimes leading to charge',
        value: '7.3',
        unit: '%',
        direction: 'down' as const,
        polarity: 'up-is-good' as const,
        context: 'halved in 10 years',
        sparklineData: [15.5, 13.1, 11.2, 9.1, 7.8, 7.0, 7.3, 5.6, 5.7, 6.4, 7.3],
      },
      {
        label: 'Crown court backlog',
        value: '79.6K',
        unit: 'cases',
        direction: 'up' as const,
        polarity: 'up-is-bad' as const,
        context: 'record high',
        sparklineData: [38.1, 33.1, 40.9, 59.8, 58.1, 62.0, 68.9, 72.8, 76.6, 78.1, 79.6],
      },
    ],
  },
  {
    topic: 'Economy',
    href: '/economy',
    colour: '#2A9D8F',
    metrics: [
      {
        label: 'CPI inflation',
        value: '3.0',
        unit: '%',
        direction: 'up' as const,
        polarity: 'up-is-bad' as const,
        context: 'peaked at 11.1% in 2022',
        sparklineData: [1.8, 1.8, 0.7, 5.5, 10.1, 4.0, 3.0, 3.0],
      },
      {
        label: 'Real weekly pay',
        value: '£527',
        unit: '/wk',
        direction: 'up' as const,
        polarity: 'up-is-good' as const,
        context: '+£41 since 2019',
        sparklineData: [486, 494, 500, 516, 520, 508, 515, 522, 527],
      },
    ],
  },
  {
    topic: 'Immigration',
    href: '/immigration',
    colour: '#6B7280',
    preposition: 'with',
    metrics: [
      {
        label: 'Net migration',
        value: '204K',
        unit: '/yr',
        direction: 'down' as const,
        polarity: 'up-is-bad' as const,
        context: 'down from 906K peak',
        sparklineData: [184, 329, 239, 226, 173, 672, 764, 906, 728, 204],
      },
      {
        label: 'Small boat crossings',
        value: '41K',
        unit: '2025',
        direction: 'up' as const,
        polarity: 'up-is-bad' as const,
        context: 'up from 300 in 2019',
        sparklineData: [0.3, 1.8, 8.5, 28.5, 45.8, 29.4, 36.8, 41.5],
      },
    ],
  },
  {
    topic: 'Energy',
    href: '/energy',
    colour: '#E63946',
    metrics: [
      {
        label: 'Renewable share',
        value: '45',
        unit: '%',
        direction: 'up' as const,
        polarity: 'up-is-good' as const,
        context: 'up from 3% in 2010',
        sparklineData: [2.8, 6.9, 11.3, 14.9, 19.1, 24.6, 24.5, 29.3, 33.1, 37.1, 43.1, 41.4, 41.5, 40.8, 45.2],
      },
      {
        label: 'Electricity price index',
        value: '201',
        unit: '2015=100',
        direction: 'up' as const,
        polarity: 'up-is-bad' as const,
        context: 'doubled since 2015',
        sparklineData: [86, 90, 94, 97, 100, 103, 107, 110, 119, 122, 127, 143, 201, 186, 180, 201],
      },
    ],
  },
  {
    topic: 'Transport',
    href: '/transport',
    colour: '#F4A261',
    metrics: [
      {
        label: 'Rail punctuality',
        value: '86',
        unit: '% on time',
        direction: 'down' as const,
        polarity: 'up-is-good' as const,
        context: 'target: 92%',
        sparklineData: [89.8, 88.0, 87.2, 86.9, 87.4, 85.5, 92.0, 87.0, 84.5, 85.0, 86.2],
      },
      {
        label: 'Bus journeys',
        value: '3.7',
        unit: 'bn/yr',
        direction: 'down' as const,
        polarity: 'up-is-good' as const,
        context: 'down from 4.6bn pre-Covid',
        sparklineData: [4.6, 4.5, 4.4, 4.4, 4.3, 1.6, 3.2, 3.5, 3.7],
      },
    ],
  },
  {
    topic: 'Social Care',
    href: '/social-care',
    colour: '#6B7280',
    preposition: 'with',
    metrics: [
      {
        label: 'Patients delayed daily',
        value: '13.2K',
        unit: '',
        direction: 'up' as const,
        polarity: 'up-is-bad' as const,
        context: 'up 44% since 2019',
        sparklineData: [9.2, 10.6, 12.8, 12.4, 13.1, 13.5, 14.2, 13.8, 13.4, 13.1, 14.3, 13.7, 12.9, 12.6, 13.5, 13.2],
      },
      {
        label: 'CQC rated Good+',
        value: '84',
        unit: '%',
        direction: 'flat' as const,
        polarity: 'up-is-good' as const,
        context: 'broadly stable',
        sparklineData: [],
      },
    ],
  },
  {
    topic: 'Education',
    href: '/education',
    colour: '#2A9D8F',
    metrics: [
      {
        label: 'Persistent absence',
        value: '20.0',
        unit: '%',
        direction: 'up' as const,
        polarity: 'up-is-bad' as const,
        context: 'was 10.5% pre-Covid',
        sparklineData: [10.5, 10.8, 11.2, 10.9, 12.1, 22.5, 21.2, 20.0],
      },
      {
        label: 'Disadvantage gap index',
        value: '3.92',
        unit: '',
        direction: 'up' as const,
        polarity: 'up-is-bad' as const,
        context: 'widening since 2017',
        sparklineData: [3.78, 3.70, 3.68, 3.66, 3.66, 3.79, 3.84, 3.94, 3.93, 3.92],
      },
    ],
  },
  {
    topic: 'Environment',
    href: '/environment',
    colour: '#2A9D8F',
    metrics: [
      {
        label: 'GHG emissions',
        value: '395',
        unit: 'MtCO₂e',
        direction: 'down' as const,
        polarity: 'up-is-bad' as const,
        context: 'down 50% since 1990',
        sparklineData: [588, 554, 573, 556, 524, 504, 491, 474, 468, 452, 406, 433, 417, 395],
      },
      {
        label: 'Species abundance',
        value: '68',
        unit: '% of 1970',
        direction: 'down' as const,
        polarity: 'up-is-good' as const,
        context: 'UK: worst in G7 for nature',
        sparklineData: [76, 74, 72, 71, 70, 71, 70, 69, 70, 69, 68, 68],
      },
    ],
  },
  {
    topic: 'Poverty',
    href: '/poverty',
    colour: '#E63946',
    preposition: 'with',
    metrics: [
      {
        label: 'Children in poverty',
        value: '3.4M',
        unit: '',
        direction: 'up' as const,
        polarity: 'up-is-bad' as const,
        context: '26% of all children',
        sparklineData: [2.5, 2.5, 2.5, 2.3, 2.3, 2.5, 2.7, 2.7, 2.7, 2.8, 2.9, 2.9, 2.9, 3.0, 3.1, 3.2, 3.4],
      },
      {
        label: 'Food bank parcels',
        value: '3.1M',
        unit: '/yr',
        direction: 'up' as const,
        polarity: 'up-is-bad' as const,
        context: 'up from 350K in 2013',
        sparklineData: [0.35, 0.91, 1.08, 1.18, 1.33, 1.53, 1.83, 1.90, 2.50, 2.99, 3.03, 3.12],
      },
    ],
  },
  {
    topic: 'Broadband & Digital',
    href: '/broadband',
    colour: '#264653',
    preposition: 'with',
    metrics: [
      {
        label: 'Median broadband speed',
        value: '126',
        unit: 'Mbps',
        direction: 'up' as const,
        polarity: 'up-is-good' as const,
        context: 'up from 15 Mbps in 2013',
        sparklineData: [15, 18.5, 22.8, 29, 36.2, 46.2, 64, 80.2, 88, 94, 108, 126],
      },
      {
        label: 'Full fibre coverage',
        value: '68',
        unit: '%',
        direction: 'up' as const,
        polarity: 'up-is-good' as const,
        context: 'up from 2% in 2017',
        sparklineData: [2, 4, 8, 14, 27, 42, 57, 68],
      },
    ],
  },
];

// Compute scorecard counts
function metricStatus(direction: Direction, polarity: Polarity): 'worse' | 'better' | 'stable' {
  if (direction === 'flat') return 'stable';
  const isBad = (direction === 'up' && polarity === 'up-is-bad') || (direction === 'down' && polarity === 'up-is-good');
  return isBad ? 'worse' : 'better';
}

export default function HomePage() {
  const allMetrics = TOPICS.flatMap(t => t.metrics);
  const worseCount = allMetrics.filter(m => metricStatus(m.direction, m.polarity) === 'worse').length;
  const betterCount = allMetrics.filter(m => metricStatus(m.direction, m.polarity) === 'better').length;
  const stableCount = allMetrics.filter(m => metricStatus(m.direction, m.polarity) === 'stable').length;
  const total = allMetrics.length;

  return (
    <main>
      {/* Dark hero */}
      <section className="bg-wiah-dark text-white px-6 py-20 md:py-28">
        <div className="max-w-4xl mx-auto">
          <h1>
            <SiteName size="hero" />
          </h1>
          <p className="mt-5 text-wiah-mid text-lg max-w-xl leading-relaxed">
            The real state of the UK — visible, understandable, shareable.
          </p>

          {/* Scorecard strip */}
          <div className="mt-10">
            {/* Proportion bar */}
            <div className="flex h-1.5 rounded-full overflow-hidden max-w-xs mb-5">
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

            <div className="flex flex-wrap gap-8">
              <div>
                <span className="font-mono text-4xl font-bold" style={{ color: '#E63946' }}>{worseCount}</span>
                <p className="font-mono text-xs text-wiah-mid mt-1">deteriorating</p>
              </div>
              <div>
                <span className="font-mono text-4xl font-bold" style={{ color: '#2A9D8F' }}>{betterCount}</span>
                <p className="font-mono text-xs text-wiah-mid mt-1">improving</p>
              </div>
              {stableCount > 0 && (
                <div>
                  <span className="font-mono text-4xl font-bold" style={{ color: '#F4A261' }}>{stableCount}</span>
                  <p className="font-mono text-xs text-wiah-mid mt-1">stable</p>
                </div>
              )}
            </div>
            <p className="font-mono text-xs text-wiah-mid mt-3">
              of {total} tracked metrics across {TOPICS.length} topics
            </p>
          </div>

          <a
            href="/dashboard"
            className="inline-block mt-8 px-6 py-3 rounded-full font-mono text-sm font-bold bg-white text-wiah-dark hover:bg-wiah-light transition-colors"
          >
            View full dashboard →
          </a>
        </div>
      </section>

      {/* Category grid */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TOPICS.map((t) => (
            <CategoryCard
              key={t.topic}
              topic={t.topic}
              href={t.href}
              colour={t.colour}
              metrics={t.metrics}
              preposition={t.preposition}
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-wiah-border py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-wiah-mid">
          <SiteName size="nav" />
          <p className="font-mono text-xs">
            Open data. No cookies. No agenda.
          </p>
        </div>
      </footer>
    </main>
  );
}
