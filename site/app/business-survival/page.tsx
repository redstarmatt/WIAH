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
  survivalRate: number;
  hospitalitySurvival: number;
  births: number;
  deaths: number;
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
    fetch('/data/business-survival/business_survival.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const chart1Series: Series[] = data
    ? [
        {
          id: 'survivalRate',
          label: '5-year survival (%)',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.survivalRate,
          })),
        },
        {
          id: 'hospitalitySurvival',
          label: 'Hospitality survival (%)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.hospitalitySurvival,
          })),
        },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        {
          id: 'births',
          label: 'New registrations (000s)',
          colour: '#2A9D8F',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.births,
          })),
        },
        {
          id: 'deaths',
          label: 'Deregistrations (000s)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.deaths,
          })),
        },
      ]
    : [];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: Pandemic causes record closures' },
    { date: new Date(2022, 5, 1), label: '2022: Energy costs surge' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2021, 5, 1), label: '2021: Furlough ends, closure wave begins' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Business Survival" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economy & Work"
          question="How Many Small Businesses Are Actually Making It?"
          finding="Only 44% of UK businesses survive five years; post-pandemic closures spiked and start-up survival rates have fallen across all sectors since 2019."
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
            label="5-year survival rate"
            value="44%"
            unit=""
            direction="down"
            polarity="up-is-good"
            changeText="Down from 48% in 2015 · hospitality worst at 32%"
            sparklineData={[48, 47, 47, 46, 46, 45, 44, 43, 43, 44, 44]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Annual business closures"
            value="436,000"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="+18% since 2019 · retail & hospitality hardest hit"
            sparklineData={[340, 352, 358, 362, 369, 410, 395, 408, 420, 430, 436]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Net business births vs 2019"
            value="-12%"
            unit=""
            direction="down"
            polarity="up-is-good"
            changeText="Births outpaced deaths until 2020; now reversed"
            sparklineData={[8, 6, 5, 4, 2, -3, -8, -10, -11, -12, -12]}
            href="#sec-coverage"
          />
        </div>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="UK business 5-year survival rate, 2015-2025"
              subtitle="Percentage of businesses surviving five years from birth. Survival rates have declined across all sectors since 2019."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Annual business births and deaths, UK, 2015-2025"
              subtitle="New business registrations vs deregistrations per year (thousands)."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="UK start-up ecosystem remains large"
            value="800,000"
            unit="new businesses registered in 2024"
            description="Despite higher closure rates, the UK sees around 800,000 new business registrations per year — among the highest in Europe. The British Business Bank Start Up Loans programme has funded 110,000 businesses since 2012."
            source="Source: ONS Business demography, 2025. British Business Bank, 2025."
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
