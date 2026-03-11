'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface DataPoint {
  year: number;
  roadSharePct: number;
  railSharePct: number;
  lorryVMT: number;
  roadFreightBtKm: number;
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
    fetch('/data/freight-road-share/freight_road_share.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const chart1Series: Series[] = data
    ? [
        {
          id: 'roadSharePct',
          label: 'Road freight (%)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.roadSharePct,
          })),
        },
        {
          id: 'railSharePct',
          label: 'Rail freight (%)',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.railSharePct,
          })),
        },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        {
          id: 'lorryVMT',
          label: 'Lorry VMT (billions)',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.lorryVMT,
          })),
        },
        {
          id: 'roadFreightBtKm',
          label: 'Road freight (bn tonne-km)',
          colour: '#F4A261',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.roadFreightBtKm,
          })),
        },
      ]
    : [];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: Covid disrupts freight patterns' },
    { date: new Date(2022, 5, 1), label: '2022: HGV driver shortage spikes road costs' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2021, 5, 1), label: '2021: HGV driver shortage reaches 100,000 shortage' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Freight Road Share" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Transport & Infrastructure"
          question="How Much of Britain's Freight Goes by Road?"
          finding="78% of UK domestic freight moves by road, compared to 63% in Germany. Rail freight handles just 9% of goods; shifting some road freight to rail would cut transport emissions significantly."
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
            label="Road freight share"
            value="78%"
            unit=""
            direction="flat"
            polarity="up-is-bad"
            changeText="vs Germany 63% · EU average 74%"
            sparklineData={[77, 77, 77, 77, 77, 78, 79, 78, 78, 78, 78]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Rail freight share"
            value="9%"
            unit=""
            direction="flat"
            polarity="up-is-good"
            changeText="vs Germany 18% · some growth in intermodal"
            sparklineData={[10, 10, 9, 9, 9, 9, 8, 9, 9, 9, 9]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Lorry VMT annual"
            value="24bn"
            unit=""
            direction="flat"
            polarity="up-is-bad"
            changeText="Vehicle miles by HGVs · broadly flat post-pandemic"
            sparklineData={[21, 22, 22, 23, 24, 22, 22, 23, 23, 24, 24]}
            href="#sec-coverage"
          />
        </div>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="UK domestic freight by mode, 2015-2025"
              subtitle="Percentage of domestic freight moved by road, rail, water and pipeline."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="HGV vehicle miles and freight tonnes, UK, 2015-2025"
              subtitle="Annual HGV vehicle miles (billions) and total goods moved by road (billion tonne-km)."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Rail freight growing from 2022"
            value="+8%"
            unit="rail freight growth 2022-2025"
            description="Rail freight grew 8% between 2022 and 2025, driven by intermodal container traffic and new automotive sector contracts. HS2 Phase 1 will free significant capacity on the West Coast Main Line for freight from 2033. The Freight Growth Target aims to triple rail freight by 2050."
            source="Source: ORR — Freight rail usage statistics, 2025."
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
