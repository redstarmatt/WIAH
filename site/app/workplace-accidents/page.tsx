'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'HSE', dataset: 'Statistics on fatal injuries in the workplace 2024/25', url: 'https://www.hse.gov.uk/statistics/fatals.htm', date: '2025' },
  { num: 2, name: 'HSE', dataset: 'Non-fatal injuries — Labour Force Survey and RIDDOR', url: 'https://www.hse.gov.uk/statistics/causinj/', date: '2025' },
  { num: 3, name: 'HSE', dataset: 'Costs to Britain of workplace injuries and ill health', url: 'https://www.hse.gov.uk/statistics/cost.htm', date: '2025', note: '£20.7 billion annual cost' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface DataPoint {
  year: number;
  fatalInjuries: number;
  constructionFatalities: number;
  nonFatalLFS: number;
  nonFatalRIDDOR: number;
}

interface TopicData {
  national: {
    timeSeries: DataPoint[];
  };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function TopicPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/workplace-accidents/workplace_accidents.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const chart1Series: Series[] = data
    ? [
        {
          id: 'fatalInjuries',
          label: 'Fatal injuries',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.fatalInjuries,
          })),
        },
        {
          id: 'constructionFatalities',
          label: 'Construction fatalities',
          colour: '#F4A261',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.constructionFatalities,
          })),
        },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        {
          id: 'nonFatalLFS',
          label: 'LFS self-reported injuries (000s)',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.nonFatalLFS,
          })),
        },
        {
          id: 'nonFatalRIDDOR',
          label: 'RIDDOR reported injuries (000s)',
          colour: '#6B7280',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.nonFatalRIDDOR,
          })),
        },
      ]
    : [];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: Pandemic changes working patterns' },
    { date: new Date(2022, 5, 1), label: '2022: Construction activity peaks' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2019, 5, 1), label: '2019: RIDDOR reporting requirements tightened' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Workplace Accidents" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economy & Work"
          question="Is Britain's Workplace Getting Safer?"
          finding="138 workers were killed at work in 2024/25 — construction and agriculture remain the most dangerous sectors. Non-fatal injuries have fallen long-term but costs are rising."
          colour="#6B7280"
        />

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Chart 1' },
          { id: 'sec-chart2', label: 'Chart 2' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Fatal workplace injuries"
            value="138"
            unit=""
            direction="down"
            polarity="up-is-bad"
            changeText="Down from 175 in 2015 · construction 32% of total"
            sparklineData={[175, 168, 162, 157, 149, 142, 141, 123, 135, 141, 138]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Non-fatal injuries reported"
            value="561,000"
            unit=""
            direction="flat"
            polarity="up-is-bad"
            changeText="Self-reported via LFS · actual rate much higher than RIDDOR"
            sparklineData={[621, 619, 609, 599, 581, 565, 549, 531, 543, 558, 561]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Annual cost of workplace injury"
            value="£20.7bn"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Including lost output and healthcare costs"
            sparklineData={[15.2, 15.8, 16.3, 16.8, 17.1, 17.5, 18.0, 18.9, 19.5, 20.1, 20.7]}
            href="#sec-coverage"
          />
        </div>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Fatal workplace injuries, UK, 2015-2025"
              subtitle="Number of workers killed at work per year. The long-term trend is downward but fatalities in construction, agriculture and waste remain persistent."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Non-fatal workplace injuries (000s), UK, 2015-2025"
              subtitle="Self-reported non-fatal injuries to workers (Labour Force Survey). The actual rate is far higher than RIDDOR-reported figures."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Fatal injury rate at historic low"
            value="0.42"
            unit="per 100,000 workers (2024/25)"
            description="The fatal injury rate of 0.42 per 100,000 workers is the lowest on record, reflecting decades of improved safety regulation and enforcement. The Health and Safety Executive's fatal five campaign has cut construction fatalities by 40% in a decade. The UK has one of the lowest workplace fatality rates in Europe."
            source="Source: HSE — Statistics on fatal injuries in the workplace, 2025."
          />
        </ScrollReveal>

        {/* Sources */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            {data?.metadata.sources.map((src, i) => (
              <div key={i}>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                  {src.name} — {src.dataset}
                </a>
                <div className="text-xs text-wiah-mid">Updated {src.frequency}</div>
              </div>
            ))}
          </div>
          <div className="text-sm text-wiah-mid mt-6 space-y-2">
            <h3 className="font-bold">Methodology</h3>
            <p>{data?.metadata.methodology}</p>
          </div>
          <div className="text-sm text-wiah-mid mt-6 space-y-2">
            <h3 className="font-bold">Known issues</h3>
            <ul className="list-disc list-inside space-y-1">
              {data?.metadata.knownIssues.map((issue, i) => (
                <li key={i}>{issue}</li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
