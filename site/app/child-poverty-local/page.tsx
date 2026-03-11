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
  childrenInPoverty: number;
  childrenInWorkPoverty: number;
  worstLAPct: number;
  bestLAPct: number;
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
    fetch('/data/child-poverty-local/child_poverty_local.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const chart1Series: Series[] = data
    ? [
        {
          id: 'childrenInPoverty',
          label: 'Children in poverty (millions)',
          colour: '#F4A261',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.childrenInPoverty,
          })),
        },
        {
          id: 'childrenInWorkPoverty',
          label: 'In working family poverty (millions)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.childrenInWorkPoverty,
          })),
        },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        {
          id: 'worstLAPct',
          label: 'Highest LA rate (%)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.worstLAPct,
          })),
        },
        {
          id: 'bestLAPct',
          label: 'Lowest LA rate (%)',
          colour: '#2A9D8F',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.bestLAPct,
          })),
        },
      ]
    : [];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2017, 5, 1), label: '2017: Two-child benefit limit introduced' },
    { date: new Date(2021, 5, 1), label: '2021: Universal Credit uplift then removed' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2023, 5, 1), label: '2023: Scottish child payment narrows gap in Scotland' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Child Poverty by Area" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Poverty & Cost of Living"
          question="Where Are Children Poorest?"
          finding="Child poverty rates vary from 6% to 45% across local authorities. Inner London boroughs and coastal towns show the steepest concentrations, affecting over 4.3 million children."
          colour="#F4A261"
        />

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: 'Chart 1' },
          { id: 'sec-chart2', label: 'Chart 2' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Children in poverty"
            value="4.3m"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="31% of all children · up 200k since 2019 two-child limit"
            sparklineData={[3.7, 3.8, 4.0, 4.1, 4.1, 4.1, 4.2, 4.2, 4.3, 4.3, 4.3]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Highest LA child poverty rate"
            value="45%"
            unit=""
            direction="flat"
            polarity="up-is-bad"
            changeText="Tower Hamlets, London · long-running deprivation"
            sparklineData={[41, 42, 43, 44, 45, 44, 44, 44, 45, 45, 45]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Lowest LA child poverty rate"
            value="6%"
            unit=""
            direction="flat"
            polarity="up-is-bad"
            changeText="Surrey · 7.5x lower than highest-rate area"
            sparklineData={[6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6]}
            href="#sec-coverage"
          />
        </div>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Children in relative poverty (after housing costs), UK, 2015-2025"
              subtitle="Number of children living in households below 60% of median income, after housing costs (millions)."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Child poverty rate range across local authorities, 2015-2025"
              subtitle="Best and worst local authority child poverty rates, illustrating the geographic spread."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Two-child limit reform announced"
            value="2026"
            unit="planned abolition of two-child limit"
            description="The Labour government committed to removing the two-child benefit limit by 2026, which is projected to lift 540,000 children out of poverty. The Scottish Government's Scottish Child Payment (£26.70/week) has already reduced child poverty rates in Scotland by an estimated 4 percentage points relative to England."
            source="Source: DWP — Households below average income, 2025. Scottish Government, 2025."
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
