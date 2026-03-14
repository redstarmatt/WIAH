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
  { num: 1, name: 'DLUHC', dataset: 'Local authority parking revenues and expenditure', date: '2025' },
  { num: 2, name: 'RAC Foundation', dataset: 'Parking on urban roads survey — city centre parking costs', date: '2024' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface DataPoint {
  year: number;
  dayParkingCost: number;
  hourlyRate: number;
  parkingRevenueBn: number;
  parkingSurplusBn: number;
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
    fetch('/data/parking-costs/parking_costs.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const chart1Series: Series[] = data
    ? [
        {
          id: 'dayParkingCost',
          label: 'Day permit cost (£)',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.dayParkingCost,
          })),
        },
        {
          id: 'hourlyRate',
          label: 'Hourly rate (£)',
          colour: '#F4A261',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.hourlyRate,
          })),
        },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        {
          id: 'parkingRevenueBn',
          label: 'Parking revenue (£bn)',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.parkingRevenueBn,
          })),
        },
        {
          id: 'parkingSurplusBn',
          label: 'Net surplus (£bn)',
          colour: '#2A9D8F',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.parkingSurplusBn,
          })),
        },
      ]
    : [];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: Covid free parking to support NHS/key workers' },
    { date: new Date(2022, 5, 1), label: '2022: High inflation drives fee increases' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2021, 5, 1), label: '2021: Parking surplus used to cross-subsidise transport' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Parking Costs" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Transport & Infrastructure"
          question="What Are the Hidden Costs of Driving?"
          finding={<>Average city centre day parking permits reached £24 in 2024.<Cite nums={2} /> Councils collected £1.8bn in parking revenue and 285 towns have removed free parking since 2015.<Cite nums={1} /></>}
          colour="#264653"
        />

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Chart 1' },
          { id: 'sec-chart2', label: 'Chart 2' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Avg city centre day permit"
            value="£24"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText={<>+85% since 2015 · London average £45, provincial cities £18<Cite nums={2} /></>}
            sparklineData={[13, 14, 15, 16, 17, 18, 17, 20, 22, 23, 24]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Council parking revenue"
            value="£1.8bn"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText={<>Up from £1.2bn in 2015 · net surplus £860m after costs<Cite nums={1} /></>}
            sparklineData={[1.2, 1.25, 1.3, 1.35, 1.4, 1.2, 1.4, 1.55, 1.65, 1.75, 1.8]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Towns removing free parking since 2015"
            value="285"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText={<>To balance council budgets · footfall impact debated<Cite nums={2} /></>}
            sparklineData={[0, 25, 55, 90, 125, 155, 190, 225, 255, 275, 285]}
            href="#sec-coverage"
          />
        </div>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Average city centre parking costs, UK, 2015-2025"
              subtitle="Average cost of one-hour and day parking in city centres."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Council parking revenue and surplus, UK, 2015-2025"
              subtitle="Total council parking revenue and net surplus after operational costs (£bn)."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Parking revenue funds public transport"
            value="£860m"
            unit="net parking surplus funds transport"
            description={<>The £860m net surplus from parking is legally required to be used for transport purposes.<Cite nums={1} /> Many councils use it to subsidise bus services, active travel infrastructure and concessionary fares.<Cite nums={1} /> Bristol&apos;s parking levy has funded 12 new bus routes.<Cite nums={2} /> The Road Safety Foundation links rising parking charges to increased pedestrian-friendly streets.<Cite nums={2} /></>}
            source="Source: DLUHC — Local authority parking revenues, 2025."
          />
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

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
