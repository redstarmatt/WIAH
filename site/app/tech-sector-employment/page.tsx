'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'Tech Nation', dataset: 'UK Tech Ecosystem Report 2024', url: 'https://technation.io/report/', date: '2024' },
  { num: 2, name: 'ONS', dataset: 'Business Register and Employment Survey', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/employmentandemployeetypes/bulletins/businessregisterandemploymentsurveybresprovisionalresults/latest', date: '2024' },
  { num: 3, name: 'ONS', dataset: 'Labour market statistics — tech sector redundancies', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peoplenotinwork/redundancies', date: '2024', note: '2023 downturn brought over 50,000 redundancies' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface DataPoint {
  year: number;
  totalEmployees: number;
  outsideLondonPct: number;
  redundanciesThousands: number;
  vacanciesThousands: number;
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
    fetch('/data/tech-sector-employment/tech_sector_employment.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const chart1Series: Series[] = data
    ? [
        {
          id: 'totalEmployees',
          label: 'Tech sector employees (millions)',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.totalEmployees,
          })),
        },
        {
          id: 'outsideLondonPct',
          label: 'Outside London & SE (%)',
          colour: '#2A9D8F',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.outsideLondonPct,
          })),
        },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        {
          id: 'redundanciesThousands',
          label: 'Tech redundancies (thousands)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.redundanciesThousands,
          })),
        },
        {
          id: 'vacanciesThousands',
          label: 'Tech vacancies open (thousands)',
          colour: '#2A9D8F',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.vacanciesThousands,
          })),
        },
      ]
    : [];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: Remote work accelerates' },
    { date: new Date(2023, 5, 1), label: '2023: Tech layoff wave' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: Pandemic hiring surge' },
    { date: new Date(2023, 5, 1), label: '2023: Correction and layoffs' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Tech Sector Employment" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Digital & Connectivity"
          question="Is the UK Tech Sector Creating Jobs That Last?"
          finding={<>The UK tech sector employs 1.84 million people, the third largest in Europe, but concentration in London and the South East is extreme.<Cite nums={1} /> UK tech employment grew 40% faster than the overall economy since 2015, but the 2023 tech downturn brought over 50,000 redundancies.<Cite nums={[2, 3]} /></>}
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
            label="UK tech sector employees"
            value="1.84M"
            unit=""
            direction="up"
            polarity="up-is-good"
            changeText={<>Up from 1.18M in 2015 · 3rd largest in Europe<Cite nums={1} /></>}
            sparklineData={[1.18, 1.24, 1.3, 1.38, 1.45, 1.52, 1.62, 1.74, 1.8, 1.82, 1.84]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Tech jobs outside London & SE"
            value="44%"
            unit=""
            direction="up"
            polarity="up-is-good"
            changeText={<>Up from 38% in 2015 · Regional spread improving slowly<Cite nums={2} /></>}
            sparklineData={[38, 38, 39, 39, 40, 41, 42, 43, 43, 44, 44]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Tech redundancies (2023 peak)"
            value="52K"
            unit=""
            direction="flat"
            polarity="up-is-bad"
            changeText={<>2023 downturn · Global pattern · Hiring recovering<Cite nums={3} /></>}
            sparklineData={[5, 6, 7, 8, 9, 10, 12, 15, 52, 28, 18]}
            href="#sec-coverage"
          />
        </div>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="UK tech sector employment, 2015–2025"
              subtitle="Total employment in SIC codes covering software, IT services, hardware and internet businesses. Covers employees and self-employed contractors."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Annual tech sector redundancies, UK, 2015–2025"
              subtitle="Estimated tech sector redundancies. 2023 saw a sharp spike driven by global big tech contractions and UK startup funding drought."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="What's improving"
            value="£18bn"
            unit="UK tech investment (2024)"
            description={<>The UK attracted £18 billion in tech investment in 2024, retaining its position as Europe&apos;s leading tech investment destination.<Cite nums={1} /> Regional tech hubs in Manchester, Edinburgh, Bristol and Leeds are growing faster than London in percentage terms.<Cite nums={2} /> The Mayfield Review has driven skills investment through sector skills bootcamps.<Cite nums={1} /></>}
            source="Source: Technation — UK Tech Nation Report, 2025. ONS — Business Register and Employment Survey, 2025."
          />
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

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
