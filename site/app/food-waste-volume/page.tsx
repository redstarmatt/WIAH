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
  wasteMillionTonnes: number;
  wasteBn: number;
  avoidablePct: number;
  unavoidablePct: number;
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
    fetch('/data/food-waste-volume/food_waste_volume.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const chart1Series: Series[] = data
    ? [
        {
          id: 'wasteMillionTonnes',
          label: 'Food waste (million tonnes)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.wasteMillionTonnes,
          })),
        },
        {
          id: 'wasteBn',
          label: 'Value wasted (£bn)',
          colour: '#F4A261',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.wasteBn,
          })),
        },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        {
          id: 'avoidablePct',
          label: 'Avoidable waste (%)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.avoidablePct,
          })),
        },
        {
          id: 'unavoidablePct',
          label: 'Unavoidable waste (%)',
          colour: '#2A9D8F',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.unavoidablePct,
          })),
        },
      ]
    : [];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2015, 5, 1), label: '2015: WRAP Courtauld Commitment 2025 launched' },
    { date: new Date(2021, 5, 1), label: '2021: WRAP targets: 50% reduction by 2030' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2019, 5, 1), label: "2019: 'Fresher for Longer" campaign launched' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Food Waste" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Environment & Climate"
          question="How Much Food Are We Throwing Away?"
          finding="UK households waste 6.4 million tonnes of food per year — worth £17 billion. 73% of food waste is avoidable, and the average family wastes £1,000 per year."
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
            label="Household food waste"
            value="6.4m tonnes"
            unit=""
            direction="down"
            polarity="up-is-bad"
            changeText="Down from 7.3m in 2015 · progress slowing"
            sparklineData={[7.3, 7.2, 7.1, 7.0, 6.9, 6.8, 6.7, 6.6, 6.5, 6.4, 6.4]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Financial value wasted"
            value="£17bn"
            unit=""
            direction="down"
            polarity="up-is-bad"
            changeText="£640/person/year · £1,000/family of four"
            sparklineData={[18.5, 18.2, 18.0, 17.8, 17.5, 17.2, 17.0, 17.0, 17.0, 17.0, 17.0]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Avoidable food waste share"
            value="73%"
            unit=""
            direction="flat"
            polarity="up-is-bad"
            changeText="Could have been eaten · not out-of-date or inedible"
            sparklineData={[75, 74, 74, 74, 73, 73, 73, 73, 73, 73, 73]}
            href="#sec-coverage"
          />
        </div>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="UK household food waste, 2015-2025"
              subtitle="Total household food waste by weight (million tonnes) and value (£bn)."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Avoidable vs unavoidable food waste, 2015-2025"
              subtitle="Percentage of food waste that was avoidable (could have been eaten) vs unavoidable (peel, bones, etc.)."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Food waste falling steadily since 2007"
            value="-23%"
            unit="reduction since 2007 peak"
            description="UK household food waste has fallen 23% since the 2007 peak of 8.3 million tonnes, largely through the WRAP-led Courtauld Commitment and retailer food waste reduction schemes. The Love Food Hate Waste campaign has reached 40 million households. Surplus food redistribution grew 30% in 2024, rescuing 250,000 tonnes for food banks and community groups."
            source="Source: WRAP — Household food waste statistics, 2025."
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
