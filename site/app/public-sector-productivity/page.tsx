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
  nhsProductivityIndex: number;
  nhsActivityIndex: number;
  nhsCostIndex: number;
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
    fetch('/data/public-sector-productivity/public_sector_productivity.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const chart1Series: Series[] = data
    ? [
        {
          id: 'publicSectorIndex',
          label: 'Public sector productivity (2019=100)',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.publicSectorIndex,
          })),
        },
        {
          id: 'nhsProductivityIndex',
          label: 'NHS productivity (2019=100)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.nhsProductivityIndex,
          })),
        },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        {
          id: 'nhsActivityIndex',
          label: 'NHS activity index (2019=100)',
          colour: '#2A9D8F',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.nhsActivityIndex,
          })),
        },
        {
          id: 'nhsCostIndex',
          label: 'NHS cost index (2019=100)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.nhsCostIndex,
          })),
        },
      ]
    : [];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: Pandemic collapses measured output' },
    { date: new Date(2023, 5, 1), label: '2023: Long-term sick NHS staff driving gap' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2022, 5, 1), label: '2022: Agency staff costs spike, productivity falls further' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Public Sector Productivity" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Democracy & Governance"
          question="Is the Public Sector Getting More Efficient?"
          finding="Public sector productivity is 6% below pre-pandemic levels and 12% below a long-run trend. NHS productivity is the largest drag — currently 10% below 2019 levels."
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
            label="Public sector productivity vs pre-pandemic"
            value="-6%"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Recovering slowly from -12% trough in 2021"
            sparklineData={[-2, -2, -3, -3, -3, -12, -10, -8, -7, -6, -6]}
            href="#sec-coverage"
          />
          <MetricCard
            label="NHS productivity vs 2019"
            value="-10%"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Recovering from -22% pandemic trough · activity high but output low"
            sparklineData={[0, 0, 0, 0, 0, -22, -18, -14, -12, -10, -10]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Education productivity vs 2019"
            value="-3%"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Recovering faster than NHS · pupil absence still high"
            sparklineData={[0, 0, 0, 0, 0, -18, -8, -5, -4, -3, -3]}
            href="#sec-coverage"
          />
        </div>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="UK public sector productivity, 2015-2025"
              subtitle="Public sector output per worker index (2019=100). Total public sector and NHS separately."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="NHS activity and productivity gap, 2015-2025"
              subtitle="NHS activity (appointments, operations) relative to staffing and costs. The productivity gap means more input for less output."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="NHS productivity beginning to recover"
            value="+5pp"
            unit="NHS productivity improvement 2023-24"
            description="NHS productivity improved by 5 percentage points in 2023-24 as elective activity increased and some pandemic disruption unwound. The Elective Recovery Fund supported 6 million additional procedures. Outpatient transformation (more telephone/video appointments) improved efficiency in some specialties."
            source="Source: ONS — Public sector productivity, 2025. NHS England — Operational productivity analysis, 2025."
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
