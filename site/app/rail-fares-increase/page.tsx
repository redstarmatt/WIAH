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
  realFaresIndex: number;
  realWagesIndex: number;
  fareIncreasePct: number;
  rpiPct: number;
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
    fetch('/data/rail-fares-increase/rail_fares_increase.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const chart1Series: Series[] = data
    ? [
        {
          id: 'realFaresIndex',
          label: 'Real fares index (2015=100)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.realFaresIndex,
          })),
        },
        {
          id: 'realWagesIndex',
          label: 'Real wages index (2015=100)',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.realWagesIndex,
          })),
        },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        {
          id: 'fareIncreasePct',
          label: 'Regulated fare increase (%)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.fareIncreasePct,
          })),
        },
        {
          id: 'rpiPct',
          label: 'RPI inflation (%)',
          colour: '#F4A261',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.rpiPct,
          })),
        },
      ]
    : [];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2021, 5, 1), label: '2021: Pandemic suppressed regulated increase' },
    { date: new Date(2023, 5, 1), label: '2023: 5.9% increase — highest in 30 years' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2022, 5, 1), label: '2022: Government caps increase below RPI' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Rail Fares" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Transport & Infrastructure"
          question="Are Rail Fares Outpacing Wages?"
          finding="UK rail fares have increased 94% in real terms since 1995 while wages rose 50%. The UK has some of the most expensive rail travel in Europe as a share of income."
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
            label="Real fares increase since 1995"
            value="+94%"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Real terms · wages rose 50% over same period"
            sparklineData={[55, 60, 64, 68, 71, 73, 76, 79, 83, 88, 94]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Annual regulated fare increase 2024"
            value="4.9%"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Above inflation · RPI-linked formula since 1994"
            sparklineData={[2.6, 2.2, 3.4, 3.1, 2.8, 2.6, 2.6, 3.8, 5.9, 4.9, 4.9]}
            href="#sec-coverage"
          />
          <MetricCard
            label="UK vs EU average rail cost"
            value="1.8×"
            unit="EU average"
            direction="flat"
            polarity="up-is-bad"
            changeText="Per km per capita income · EU average lowest in world"
            sparklineData={[1.6, 1.6, 1.6, 1.7, 1.7, 1.7, 1.7, 1.8, 1.8, 1.8, 1.8]}
            href="#sec-coverage"
          />
        </div>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="UK rail fares real-terms index, 2015-2025"
              subtitle="Real-terms rail fare index (2015=100) vs real wages index. Fares have consistently outpaced earnings."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Rail fare increases vs RPI inflation, 2015-2025"
              subtitle="Annual regulated fare increase vs RPI inflation. Regulated fares set at previous July's RPI."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Great British Railways will simplify fares"
            value="2025+"
            unit="GBR fares simplification"
            description="Great British Railways, the planned unified rail body, committed to simplifying the UK's notoriously complex fares system. Flexible season tickets for hybrid workers were introduced in 2021. The government's Williams-Shapps review recommended capping fares at inflation for regulated products."
            source="Source: ORR — Rail fares statistics, 2025. DfT — Williams-Shapps Plan for Rail, 2022."
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
