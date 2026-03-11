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
  transportPovertyM: number;
  ruralDeprivationPct: number;
  lowIncomeTransportIndex: number;
  generalInflationIndex: number;
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
    fetch('/data/transport-poverty/transport_poverty.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const chart1Series: Series[] = data
    ? [
        {
          id: 'transportPovertyM',
          label: 'Households in transport poverty (m)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.transportPovertyM,
          })),
        },
        {
          id: 'ruralDeprivationPct',
          label: 'Rural deprivation rate (%)',
          colour: '#F4A261',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.ruralDeprivationPct,
          })),
        },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        {
          id: 'lowIncomeTransportIndex',
          label: 'Low-income transport cost index',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.lowIncomeTransportIndex,
          })),
        },
        {
          id: 'generalInflationIndex',
          label: 'General inflation index (2010=100)',
          colour: '#6B7280',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.generalInflationIndex,
          })),
        },
      ]
    : [];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: Covid collapses transport demand' },
    { date: new Date(2022, 5, 1), label: '2022: Cost of living crisis squeezes transport budgets' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2021, 5, 1), label: '2021: Free bus passes under threat in several areas' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Transport Poverty" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Transport & Infrastructure"
          question="Can Low-Income Households Afford to Get Around?"
          finding="Transport costs for low-income households have risen 40% since 2010. 2.3 million households are in transport poverty — unable to afford reliable access to work, healthcare and education."
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
            label="Households in transport poverty"
            value="2.3m"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Spending 10%+ of income on transport · 8% of all HHs"
            sparklineData={[1.8, 1.9, 2.0, 2.0, 2.1, 2.1, 2.1, 2.1, 2.2, 2.3, 2.3]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Transport cost rise for low-income"
            value="+40%"
            unit="since 2010"
            direction="up"
            polarity="up-is-bad"
            changeText="Bus and rail fares rose faster than general inflation"
            sparklineData={[0, 4, 8, 12, 16, 20, 24, 28, 33, 37, 40]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Rural transport deprivation rate"
            value="23%"
            unit=""
            direction="flat"
            polarity="up-is-bad"
            changeText="Bus cuts mean 3,000 routes removed since 2010"
            sparklineData={[20, 20, 21, 21, 21, 22, 22, 22, 23, 23, 23]}
            href="#sec-coverage"
          />
        </div>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Households in transport poverty, UK, 2015-2025"
              subtitle="Estimated households spending more than 10% of income on transport (millions). Rising transport costs hit those least able to afford alternatives hardest."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Transport cost index for low-income households, 2015-2025"
              subtitle="Transport cost index for lowest income quintile (2010=100). Bus and rail fares have risen faster than general inflation for this group."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Bus Back Better funding allocated"
            value="£3bn"
            unit="Bus Service Improvement Plans 2021"
            description="The Bus Back Better national strategy allocated £3bn for Bus Service Improvement Plans, allowing local transport authorities to restore routes and subsidise fares. The Universal Bus Pass (for over 60s) has been maintained, protecting 11 million free pass holders. Concessionary travel saves low-income elderly passengers an estimated £2,400 per year."
            source="Source: DfT — Bus statistics, 2025."
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
