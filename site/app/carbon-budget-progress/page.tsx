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
  actualEmissions: number;
  budgetCeiling: number;
  evSalesPct: number;
  heatPumpInstalls: number;
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
    fetch('/data/carbon-budget-progress/carbon_budget_progress.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const chart1Series: Series[] = data
    ? [
        {
          id: 'actualEmissions',
          label: 'Actual emissions (MtCO2e)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.actualEmissions,
          })),
        },
        {
          id: 'budgetCeiling',
          label: 'Carbon budget ceiling (MtCO2e)',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.budgetCeiling,
          })),
        },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        {
          id: 'evSalesPct',
          label: 'EV new car sales share (%)',
          colour: '#2A9D8F',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.evSalesPct,
          })),
        },
        {
          id: 'heatPumpInstalls',
          label: 'Heat pump installations (000s)',
          colour: '#F4A261',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.heatPumpInstalls,
          })),
        },
      ]
    : [];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: Pandemic causes temporary emissions fall' },
    { date: new Date(2022, 5, 1), label: '2022: Russia invasion temporarily increases gas use' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2023, 5, 1), label: '2023: ZEV mandate brings 2030 ICE ban forward' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Carbon Budget Progress" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Environment & Climate"
          question="Is Britain on Track for Net Zero?"
          finding="The UK is projected to miss its fourth carbon budget by 12%. The Climate Change Committee warns policy gaps are widening, and heat pump installations are 60% below trajectory."
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
            label="4th carbon budget miss projection"
            value="12%"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="CCC projects 12% overrun · was 8% in 2022"
            sparklineData={[3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 12]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Heat pumps vs trajectory"
            value="60% below"
            unit=""
            direction="flat"
            polarity="up-is-bad"
            changeText="2024 installations 60% below CCC pathway"
            sparklineData={[95, 90, 85, 80, 75, 70, 70, 65, 62, 60, 60]}
            href="#sec-coverage"
          />
          <MetricCard
            label="EV share of new car sales"
            value="20%"
            unit=""
            direction="up"
            polarity="up-is-good"
            changeText="+17pp since 2019 · on track for 2030 ban"
            sparklineData={[1, 2, 3, 4, 7, 8, 12, 16, 18, 19, 20]}
            href="#sec-coverage"
          />
        </div>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="UK greenhouse gas emissions vs carbon budgets, 2015-2025"
              subtitle="UK territorial emissions (MtCO2e) vs carbon budget ceiling for each period."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Net zero policy implementation progress, 2015-2025"
              subtitle="Progress against key net zero policies: EV sales share and heat pump installations vs trajectory."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="UK emissions 53% below 1990 levels"
            value="-53%"
            unit="UK territorial emissions vs 1990"
            description="UK territorial greenhouse gas emissions fell 53% below 1990 levels by 2024, among the fastest reductions of any major economy. The fourth carbon budget (2023-27) was met in its first year. Clean power from renewables reached 50.8% of electricity. The Clean Energy Act 2024 legally binds the 2030 clean power target."
            source="Source: DESNZ — UK greenhouse gas emissions statistics, 2025."
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
