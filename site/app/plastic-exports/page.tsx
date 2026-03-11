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
  totalExports: number;
  turkeyExports: number;
  verifiedRecyclingPct: number;
  unverifiedPct: number;
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
    fetch('/data/plastic-exports/plastic_exports.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const chart1Series: Series[] = data
    ? [
        {
          id: 'totalExports',
          label: 'Total exports (000 tonnes)',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.totalExports,
          })),
        },
        {
          id: 'turkeyExports',
          label: 'To Turkey (000 tonnes)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.turkeyExports,
          })),
        },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        {
          id: 'verifiedRecyclingPct',
          label: 'Verified legitimate recycling (%)',
          colour: '#2A9D8F',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.verifiedRecyclingPct,
          })),
        },
        {
          id: 'unverifiedPct',
          label: 'Unverified destination (%)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.unverifiedPct,
          })),
        },
      ]
    : [];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2018, 5, 1), label: '2018: China introduces National Sword import ban' },
    { date: new Date(2021, 5, 1), label: '2021: Basel Convention tightens export rules' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2019, 5, 1), label: '2019: BBC investigation reveals illegal dumping in Turkey' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Plastic Exports" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Environment & Climate"
          question="Where Does Britain's Plastic Waste Go?"
          finding="The UK is the world's second-largest exporter of plastic waste. 615,000 tonnes were exported in 2023, mostly to Turkey, with evidence much ends up in illegal dumps."
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
            label="Plastic waste exported"
            value="615,000 tonnes"
            unit=""
            direction="down"
            polarity="up-is-bad"
            changeText="Down from 800k peak in 2017 · Turkey now main recipient"
            sparklineData={[610, 700, 800, 770, 720, 580, 520, 580, 620, 615, 615]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Share going to Turkey"
            value="38%"
            unit=""
            direction="flat"
            polarity="up-is-bad"
            changeText="Post-China import ban 2018 · illicit dumping evidence found"
            sparklineData={[5, 5, 8, 12, 22, 35, 38, 40, 38, 38, 38]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Unverified final destination"
            value="31%"
            unit=""
            direction="flat"
            polarity="up-is-bad"
            changeText="Cannot be traced to legitimate recycling"
            sparklineData={[10, 12, 15, 18, 22, 28, 30, 31, 31, 31, 31]}
            href="#sec-coverage"
          />
        </div>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="UK plastic waste exports, 2015-2025"
              subtitle="Total plastic waste exported from the UK by destination (000 tonnes). Turkey replaced China as main recipient after China's 2018 import restrictions."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Fate of exported UK plastic waste, 2015-2025"
              subtitle="Percentage of exported plastic waste with verified legitimate recycling destination vs unverified."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Extended Producer Responsibility launching 2025"
            value="2025"
            unit="EPR scheme launches"
            description="The UK Extended Producer Responsibility (EPR) scheme launches in 2025, requiring packaging producers to fund the full cost of collection and recycling of their packaging. This is projected to increase plastic packaging recycling from 51% to 65% by 2030 and reduce plastic exports by 200,000 tonnes per year."
            source="Source: Defra — Extended Producer Responsibility for packaging, 2024."
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
