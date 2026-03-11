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
  excellentPct: number;
  poorSufficientPct: number;
  sewerOverflowHours: number;
  monitoredCSOsPct: number;
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
    fetch('/data/bathing-water/bathing_water.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const chart1Series: Series[] = data
    ? [
        {
          id: 'excellentPct',
          label: 'Excellent (%)',
          colour: '#2A9D8F',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.excellentPct,
          })),
        },
        {
          id: 'poorSufficientPct',
          label: 'Poor/Sufficient (%)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.poorSufficientPct,
          })),
        },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        {
          id: 'sewerOverflowHours',
          label: 'Discharge hours (millions)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.sewerOverflowHours,
          })),
        },
        {
          id: 'monitoredCSOsPct',
          label: 'CSOs with continuous monitoring (%)',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.monitoredCSOsPct,
          })),
        },
      ]
    : [];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2021, 5, 1), label: '2021: COVID recovery; high rainfall affects quality' },
    { date: new Date(2023, 5, 1), label: '2023: Southern Water fined record £90m' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2023, 5, 1), label: '2023: Real-time data reveals full scale of discharges' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Bathing Water Quality" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Environment & Climate"
          question="Are Britain's Beaches and Rivers Safe to Swim In?"
          finding="Just 60% of England's designated bathing waters achieved Excellent status in 2024, down from 72% in 2013. Sewage discharges are the leading cause of failure."
          colour="#2A9D8F"
        />

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Chart 1' },
          { id: 'sec-chart2', label: 'Chart 2' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Bathing waters at Excellent status"
            value="60%"
            unit=""
            direction="down"
            polarity="up-is-good"
            changeText="Down from 72% in 2013 · sewage the leading cause"
            sparklineData={[72, 70, 68, 67, 66, 65, 63, 62, 61, 60, 60]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Bathing waters at Poor/Sufficient"
            value="11%"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Up from 5% in 2013 · failures concentrated after rainfall"
            sparklineData={[5, 5, 6, 6, 7, 7, 8, 9, 10, 11, 11]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Sewage discharge events"
            value="3.6m hours"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="2023 total · up from 0.1m hours in 2016"
            sparklineData={[0.1, 0.17, 0.9, 2.5, 3.1, 2.7, 1.8, 3.6, 3.6, 3.6, 3.6]}
            href="#sec-coverage"
          />
        </div>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Bathing water quality ratings, England, 2015-2025"
              subtitle="Percentage of designated bathing waters rated Excellent, Good, Sufficient and Poor."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Combined sewer overflow discharge hours, England, 2016-2025"
              subtitle="Total hours of sewage discharge from combined sewer overflows to inland and coastal waters."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Storm overflow action plan committed £56bn"
            value="£56bn"
            unit="water company investment plan 2025-30"
            description="Water companies are legally required to invest £56bn between 2025-30 to reduce storm overflow discharges by 40% by 2035. 100% of storm overflows must be monitored by the end of 2025. Southern Water, Thames Water and others face record Ofwat fines totalling £2.3bn for sewage dumping."
            source="Source: Ofwat — Water industry investment plan, 2025."
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
