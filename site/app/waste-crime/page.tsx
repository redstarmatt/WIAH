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
  totalCost: number;
  illegalSites: number;
  prosecutions: number;
  civilSanctions: number;
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
    fetch('/data/waste-crime/waste_crime.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const chart1Series: Series[] = data
    ? [
        {
          id: 'totalCost',
          label: 'Total cost of waste crime (£m)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.totalCost,
          })),
        },
        {
          id: 'illegalSites',
          label: 'Active illegal sites (est.)',
          colour: '#F4A261',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.illegalSites,
          })),
        },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        {
          id: 'prosecutions',
          label: 'Prosecutions',
          colour: '#2A9D8F',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.prosecutions,
          })),
        },
        {
          id: 'civilSanctions',
          label: 'Civil sanctions',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.civilSanctions,
          })),
        },
      ]
    : [];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2018, 5, 1), label: '2018: Joint Unit for Waste Crime established' },
    { date: new Date(2021, 5, 1), label: '2021: EA digital waste tracking pilot' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: EA enforcement capacity cut' },
    { date: new Date(2023, 5, 1), label: '2023: New Joint Unit with NCA' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Waste Crime" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Environment & Climate"
          question="How Much Money Is Made from Illegal Waste?"
          finding="Waste crime costs the English economy £924 million per year. Environment Agency prosecutions have fallen due to resource cuts despite the problem growing significantly."
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
            label="Annual cost of waste crime"
            value="£924m"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="+£150m since 2018 · fly-tipping, illegal sites, fraud"
            sparklineData={[770, 800, 830, 850, 880, 910, 920, 920, 920, 922, 924]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Active illegal waste sites (est.)"
            value="1,000"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="EA estimates · many small sites evade detection"
            sparklineData={[600, 650, 700, 750, 800, 850, 900, 950, 980, 1000, 1000]}
            href="#sec-coverage"
          />
          <MetricCard
            label="EA waste crime prosecutions"
            value="214"
            unit=""
            direction="down"
            polarity="up-is-good"
            changeText="Down from 372 in 2015 · budget cuts"
            sparklineData={[372, 350, 330, 310, 290, 270, 260, 248, 230, 220, 214]}
            href="#sec-coverage"
          />
        </div>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Estimated cost of waste crime, England, 2015-2025"
              subtitle="Annual cost of waste crime to the English economy (£m), including cleanup costs, lost tax revenue and environmental damage."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="EA prosecutions and enforcement actions, 2015-2025"
              subtitle="Environment Agency waste crime prosecutions and civil sanctions per year."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Digital waste tracking launching 2025"
            value="2025"
            unit="mandatory digital waste tracking"
            description="From 2025, all UK waste movements must be recorded in the EA's digital waste tracking system — a significant shift from paper-based consignment notes that were easily falsified. The system is estimated to reduce waste fraud by £500m/year by making illegal diversions visible in real time."
            source="Source: EA — Digital waste tracking implementation, 2024."
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
