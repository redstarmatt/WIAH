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
  publicSectorIndex: number;
  privateSectorIndex: number;
  top10Pct: number;
  bottom10Pct: number;
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
    fetch('/data/earnings-by-sector/earnings_by_sector.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const chart1Series: Series[] = data
    ? [
        {
          id: 'publicSectorIndex',
          label: 'Public sector real wage index',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.publicSectorIndex,
          })),
        },
        {
          id: 'privateSectorIndex',
          label: 'Private sector real wage index',
          colour: '#2A9D8F',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.privateSectorIndex,
          })),
        },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        {
          id: 'top10Pct',
          label: 'Top decile real earnings index',
          colour: '#2A9D8F',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.top10Pct,
          })),
        },
        {
          id: 'bottom10Pct',
          label: 'Bottom decile real earnings index',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.bottom10Pct,
          })),
        },
      ]
    : [];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2022, 5, 1), label: '2022: Inflation peaks, real wages fall sharply' },
    { date: new Date(2023, 5, 1), label: '2023: Public sector strikes over pay' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2016, 5, 1), label: '2016: National Living Wage introduced' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Earnings by Sector" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economy & Work"
          question="Which Jobs Are Actually Keeping Up With Inflation?"
          finding="Real wages in most sectors remain below their 2008 peak. Public sector workers have seen 15% real-terms cuts since 2010, while financial services recovered fully."
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
            label="Public sector real wage vs 2010"
            value="-12%"
            unit=""
            direction="flat"
            polarity="up-is-bad"
            changeText="Recovering from -15% peak in 2022 · still negative"
            sparklineData={[-3, -4, -5, -7, -9, -10, -12, -15, -13, -12, -12]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Private sector real wage vs 2008"
            value="+2%"
            unit=""
            direction="up"
            polarity="up-is-good"
            changeText="Only just recovered 2008 peak · financial services +18%"
            sparklineData={[-5, -4, -3, -2, -1, -3, -2, 0, 0, 1, 2]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Lowest-paid decile real wage vs 2008"
            value="-6%"
            unit=""
            direction="flat"
            polarity="up-is-bad"
            changeText="Most exposed to inflation · NMW rises helped partially"
            sparklineData={[-10, -9, -8, -7, -6, -8, -8, -7, -7, -6, -6]}
            href="#sec-coverage"
          />
        </div>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Real wage growth by sector, UK, 2015-2025"
              subtitle="Median weekly real earnings indexed to 2015 for public sector and private sector workers. Real wages deflated by CPI."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Real earnings by income decile, UK, 2015-2025"
              subtitle="Real wage index for highest and lowest earners. The squeeze on lower earners was more severe and recovery slower."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Wage growth above inflation in 2024"
            value="+2.4%"
            unit="real wage growth 2024"
            description="Real wages grew 2.4% in 2024 as inflation fell while nominal pay growth remained elevated. Workers on the National Living Wage saw a 10% increase in April 2024, the largest ever rise, protecting the lowest-paid from the worst of the cost of living crisis."
            source="Source: ONS Annual Survey of Hours and Earnings, 2025."
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
