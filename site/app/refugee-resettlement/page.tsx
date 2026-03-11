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
  formalResettlement: number;
  ukrainianArrivals: number;
  homesSecuredPct: number;
  stillInEmergencyAccom: number;
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
    fetch('/data/refugee-resettlement/refugee_resettlement.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const chart1Series: Series[] = data
    ? [
        {
          id: 'formalResettlement',
          label: 'Formal scheme arrivals',
          colour: '#2A9D8F',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.formalResettlement,
          })),
        },
        {
          id: 'ukrainianArrivals',
          label: 'Ukrainian arrivals (Homes for Ukraine)',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.ukrainianArrivals,
          })),
        },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        {
          id: 'homesSecuredPct',
          label: 'Homes secured within 12 months (%)',
          colour: '#2A9D8F',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.homesSecuredPct,
          })),
        },
        {
          id: 'stillInEmergencyAccom',
          label: 'Still in emergency accommodation (%)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.stillInEmergencyAccom,
          })),
        },
      ]
    : [];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2022, 5, 1), label: '2022: Russian invasion — Ukraine scheme launches' },
    { date: new Date(2021, 5, 1), label: '2021: Afghanistan fall — evacuation operation' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2021, 5, 1), label: '2021: Hotel accommodation system strained' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Refugee Resettlement" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Immigration & Population"
          question="How Many Refugees Is Britain Resettling?"
          finding="The UK has resettled 39,000 refugees under formal resettlement schemes since 2015. Afghan and Ukrainian arrivals exceeded 200,000 but stretched resettlement infrastructure."
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
            label="Resettled under formal schemes (total)"
            value="39,000"
            unit=""
            direction="up"
            polarity="up-is-good"
            changeText="Since 2015 · Vulnerable Persons Resettlement Scheme led"
            sparklineData={[1000, 3500, 6500, 11000, 16000, 18500, 21000, 26000, 31000, 36000, 39000]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Ukrainian arrivals under Homes for Ukraine"
            value="219,000"
            unit=""
            direction="up"
            polarity="up-is-good"
            changeText="Since Feb 2022 · 70% still in UK, 30% returned"
            sparklineData={[0, 0, 0, 0, 0, 0, 0, 150000, 195000, 210000, 219000]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Refugee homes secured within 12 months"
            value="72%"
            unit=""
            direction="up"
            polarity="up-is-good"
            changeText="Up from 58% in 2020 · target is 80%"
            sparklineData={[60, 62, 65, 67, 68, 58, 62, 68, 70, 71, 72]}
            href="#sec-coverage"
          />
        </div>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="UK refugee resettlement, 2015-2025"
              subtitle="Annual arrivals under formal resettlement schemes (VPRS, UK Resettlement Scheme, Afghan routes)."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Homes secured for refugees within 12 months, 2015-2025"
              subtitle="Percentage of resettled refugees who secured stable housing within 12 months of arrival."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="UK resettlement record among largest in Europe"
            value="39,000"
            unit="formal resettlement places since 2015"
            description="The UK has resettled more refugees per capita under formal schemes than most comparable European nations. The Community Sponsorship model, where local groups support refugee families, has placed over 1,000 families. The Welcome Hub network supports refugees into employment, with 65% in work within 18 months."
            source="Source: Home Office — Resettlement statistics, 2025."
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
