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
  nrmReferrals: number;
  conclusivePositive: number;
  labourExploitation: number;
  sexualExploitation: number;
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
    fetch('/data/modern-slavery-referrals/modern_slavery_referrals.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const chart1Series: Series[] = data
    ? [
        {
          id: 'nrmReferrals',
          label: 'NRM referrals',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.nrmReferrals,
          })),
        },
        {
          id: 'conclusivePositive',
          label: 'Positive conclusive decisions',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.conclusivePositive,
          })),
        },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        {
          id: 'labourExploitation',
          label: 'Labour exploitation (%)',
          colour: '#F4A261',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.labourExploitation,
          })),
        },
        {
          id: 'sexualExploitation',
          label: 'Sexual exploitation (%)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.sexualExploitation,
          })),
        },
      ]
    : [];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2017, 5, 1), label: '2017: Criminal Finances Act strengthens detection' },
    { date: new Date(2022, 5, 1), label: '2022: Nationality and Borders Act changes process' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: Labour exploitation overtakes sexual' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Modern Slavery" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Immigration & Population"
          question="How Many Modern Slavery Victims Are Being Found?"
          finding="17,004 potential victims of modern slavery were referred to the National Referral Mechanism in 2024 — 71 times more than in 2012. Albanian nationals are the largest single group."
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
            label="NRM referrals 2024"
            value="17,004"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="71x the 2012 level of 238 · Albanian nationals largest group"
            sparklineData={[3266, 3805, 5145, 6985, 10627, 10613, 12727, 14670, 16938, 17004, 16800]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Confirmed victims supported"
            value="8,400"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Positive conclusive grounds decisions · many more waiting"
            sparklineData={[1400, 1800, 2500, 3600, 5100, 5200, 6100, 7200, 8100, 8400, 8200]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Labour exploitation share"
            value="42%"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Now #1 referral type · construction, food processing, car washes"
            sparklineData={[28, 30, 32, 34, 36, 38, 39, 40, 41, 42, 42]}
            href="#sec-coverage"
          />
        </div>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="National Referral Mechanism referrals, UK, 2015-2025"
              subtitle="Annual potential modern slavery victim referrals to the NRM. Numbers have risen sharply due to better identification and reporting, not necessarily increased prevalence."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Modern slavery referrals by exploitation type, 2015-2025"
              subtitle="NRM referrals split by type of exploitation. Labour exploitation has overtaken sexual exploitation as the most common form."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Modern Slavery Act remains landmark law"
            value="2015"
            unit="Modern Slavery Act passed"
            description="The UK's 2015 Modern Slavery Act remains one of the world's most comprehensive. The Independent Anti-Slavery Commissioner coordinates a multi-agency response and the Government's Modern Slavery Unit funds specialist NGO support. The UK has invested £200m in global anti-slavery programmes since 2015."
            source="Source: Home Office — Modern Slavery statistics, 2025."
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
