import SiteName from '@/components/SiteName';
import CategoryCard from '@/components/CategoryCard';

const TOPICS = [
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
        sparklineData: [12.1, 13.4, 14.2, 15.8, 16.3, 17.1, 18.9, 19.4, 20.1, 20.8, 21.3],
      },
      {
        label: 'Cat 2 ambulance wait',
        value: '34',
        unit: 'min',
        direction: 'up' as const,
        polarity: 'up-is-bad' as const,
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
        sparklineData: [7.52, 7.72, 7.91, 8.04, 7.88, 7.86, 9.06, 8.56, 8.40, 7.71],
      },
      {
        label: 'Average monthly rent',
        value: '£1,381',
        unit: '/mo',
        direction: 'up' as const,
        polarity: 'up-is-bad' as const,
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
        sparklineData: [0.1, 0.17, 0.9, 2.5, 3.1, 2.7, 1.8, 3.6, 3.6],
      },
      {
        label: 'Rivers in good health',
        value: '16',
        unit: '%',
        direction: 'down' as const,
        polarity: 'up-is-good' as const,
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
        sparklineData: [15.5, 13.1, 11.2, 9.1, 7.8, 7.0, 7.3, 5.6, 5.7, 6.4, 7.3],
      },
      {
        label: 'Crown court backlog',
        value: '79.6K',
        unit: 'cases',
        direction: 'up' as const,
        polarity: 'up-is-bad' as const,
        sparklineData: [38.1, 33.1, 40.9, 59.8, 58.1, 62.0, 68.9, 72.8, 76.6, 78.1, 79.6],
      },
    ],
  },
  {
    topic: 'Economy',
    href: '/economy',
    colour: '#264653',
    metrics: [
      {
        label: 'CPI inflation',
        value: '3.0',
        unit: '%',
        direction: 'up' as const,
        polarity: 'up-is-bad' as const,
        sparklineData: [1.8, 1.8, 0.7, 5.5, 10.1, 4.0, 3.0, 3.0],
      },
      {
        label: 'Real weekly pay',
        value: '£527',
        unit: '/wk',
        direction: 'up' as const,
        polarity: 'up-is-good' as const,
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
        sparklineData: [184, 329, 239, 226, 173, 672, 764, 906, 728, 204],
      },
      {
        label: 'Small boat crossings',
        value: '41K',
        unit: '2025',
        direction: 'up' as const,
        polarity: 'up-is-bad' as const,
        sparklineData: [0.3, 1.8, 8.5, 28.5, 45.8, 29.4, 36.8, 41.5],
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
        sparklineData: [10.5, 10.8, 11.2, 10.9, 12.1, 22.5, 21.2, 20.0],
      },
      {
        label: 'Disadvantage gap index',
        value: '3.92',
        unit: '',
        direction: 'up' as const,
        polarity: 'up-is-bad' as const,
        sparklineData: [3.78, 3.70, 3.68, 3.66, 3.66, 3.79, 3.84, 3.94, 3.93, 3.92],
      },
    ],
  },
];

export default function HomePage() {
  return (
    <main>
      {/* Dark hero */}
      <section className="bg-wiah-dark text-white px-6 py-20 md:py-32">
        <div className="max-w-4xl mx-auto">
          <h1>
            <SiteName size="hero" />
          </h1>
          <p className="mt-6 text-wiah-mid text-lg max-w-xl leading-relaxed">
            The real state of the UK — visible, understandable, shareable.
            Data-driven stories on the things that matter.
          </p>
        </div>
      </section>

      {/* Category grid */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
