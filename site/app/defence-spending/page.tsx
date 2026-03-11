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
  defenceGDPPct: number;
  natoTarget: number;
  defenceSpendBn: number;
  equipmentBudgetBn: number;
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
    fetch('/data/defence-spending/defence_spending.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const chart1Series: Series[] = data
    ? [
        {
          id: 'defenceGDPPct',
          label: 'Defence spending (% GDP)',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.defenceGDPPct,
          })),
        },
        {
          id: 'natoTarget',
          label: 'NATO 2% target',
          colour: '#6B7280',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.natoTarget,
          })),
        },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        {
          id: 'defenceSpendBn',
          label: 'Defence spending (£bn, real)',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.defenceSpendBn,
          })),
        },
        {
          id: 'equipmentBudgetBn',
          label: 'Equipment budget (£bn, real)',
          colour: '#F4A261',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.equipmentBudgetBn,
          })),
        },
      ]
    : [];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2022, 5, 1), label: '2022: Russia invades Ukraine; NATO pressure increases' },
    { date: new Date(2024, 5, 1), label: '2024: 2.5% target announced' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2021, 5, 1), label: '2021: AUKUS announced with US and Australia' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Defence Spending" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Democracy & Governance"
          question="Is Britain Spending Enough on Defence?"
          finding="UK defence spending reached 2.3% of GDP in 2024-25, exceeding NATO's 2% target for the first time since 2010. The government committed to 2.5% by 2027."
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
            label="Defence spending as % GDP"
            value="2.3%"
            unit=""
            direction="up"
            polarity="up-is-good"
            changeText="Above NATO 2% target for first time since 2010"
            sparklineData={[2.2, 2.2, 2.1, 2.1, 2.1, 2.1, 2.2, 2.25, 2.3, 2.3, 2.3]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Target: 2.5% by 2027"
            value="2.5%"
            unit="commitment"
            direction="up"
            polarity="up-is-good"
            changeText="Would add £14bn/year · NATO 3% tier also discussed"
            sparklineData={[2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.5]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Real defence spending increase 2025-27"
            value="+£10bn"
            unit=""
            direction="up"
            polarity="up-is-good"
            changeText="Largest real-terms uplift since Cold War end"
            sparklineData={[0, 0, 0, 0, 0, 0, 2, 4, 6, 8, 10]}
            href="#sec-coverage"
          />
        </div>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="UK defence spending as % of GDP, 2015-2025"
              subtitle="Defence expenditure as a percentage of GDP compared to NATO 2% target."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="UK defence expenditure in real terms (£bn), 2015-2025"
              subtitle="Total defence spending in 2024-25 prices (£bn)."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="First major defence uplift in 35 years"
            value="2.5%"
            unit="of GDP by 2027"
            description="The commitment to 2.5% of GDP by 2027 represents the largest real-terms increase in UK defence spending since the end of the Cold War. The UK is a top-3 defence spender in NATO and increased military aid to Ukraine to £3bn in 2025. AUKUS, GCAP and Nordic-Baltic partnerships strengthen alliance capabilities."
            source="Source: DESNZ — UK defence statistics, 2025. NATO defence expenditure data, 2025."
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
