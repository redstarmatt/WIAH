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
  fullTimeGap: number;
  allWorkersGap: number;
  financialSectorGap: number;
  educationGap: number;
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
    fetch('/data/gender-pay-gap-report/gender_pay_gap_report.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const chart1Series: Series[] = data
    ? [
        {
          id: 'fullTimeGap',
          label: 'Full-time gap (%)',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.fullTimeGap,
          })),
        },
        {
          id: 'allWorkersGap',
          label: 'All-workers gap (%)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.allWorkersGap,
          })),
        },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        {
          id: 'financialSectorGap',
          label: 'Financial services gap (%)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.financialSectorGap,
          })),
        },
        {
          id: 'educationGap',
          label: 'Education sector gap (%)',
          colour: '#2A9D8F',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.educationGap,
          })),
        },
      ]
    : [];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2017, 5, 1), label: '2017: Mandatory reporting introduced for 250+ employers' },
    { date: new Date(2023, 5, 1), label: '2023: Ethnicity pay gap reporting piloted' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: Pandemic pauses mandatory reporting' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Gender Pay Gap" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economy & Work"
          question="Is the Gender Pay Gap Closing?"
          finding="The median gender pay gap for full-time workers fell to 7.7% in 2024, but the gap for all workers including part-time remains at 13.9%, barely changed in a decade."
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
            label="Full-time gender pay gap"
            value="7.7%"
            unit=""
            direction="down"
            polarity="up-is-bad"
            changeText="Down from 10.0% in 2015 · narrowing slowly"
            sparklineData={[10.0, 9.4, 9.0, 8.6, 8.3, 7.9, 7.9, 7.7, 7.7, 7.8, 7.7]}
            href="#sec-coverage"
          />
          <MetricCard
            label="All-workers gender pay gap"
            value="13.9%"
            unit=""
            direction="down"
            polarity="up-is-bad"
            changeText="Down from 19.2% in 2015 · part-time dominated"
            sparklineData={[19.2, 18.1, 17.4, 17.3, 17.3, 15.5, 15.4, 14.9, 14.3, 14.1, 13.9]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Financial sector pay gap"
            value="23.1%"
            unit=""
            direction="flat"
            polarity="up-is-bad"
            changeText="Highest of any sector · barely changed in 5 years"
            sparklineData={[24.2, 24.0, 23.8, 23.6, 23.4, 23.2, 23.1, 23.0, 23.2, 23.1, 23.1]}
            href="#sec-coverage"
          />
        </div>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Gender pay gap by employment type, UK, 2015-2025"
              subtitle="Median hourly pay gap between men and women for full-time and all workers. The part-time penalty drives a significant gap in the all-workers measure."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Gender pay gap by sector, 2015-2025"
              subtitle="Median gender pay gap in financial services vs overall. Finance has consistently the widest gap."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Pay gap reporting now mandatory"
            value="10,000+"
            unit="employers now reporting"
            description="Over 10,000 employers now report their gender pay gap annually under regulations introduced in 2017. Sectors with mandatory reporting show faster closure rates. The government announced plans to extend reporting to include bonus gaps and ethnicity pay data."
            source="Source: EHRC — Gender pay gap reporting data, 2025."
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
