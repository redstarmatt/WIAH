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
  skilledWorkerDays: number;
  familyVisaDays: number;
  withinTargetPct: number;
  backlongThousands: number;
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
    fetch('/data/visa-processing-times/visa_processing_times.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const chart1Series: Series[] = data
    ? [
        {
          id: 'skilledWorkerDays',
          label: 'Skilled worker (days)',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.skilledWorkerDays,
          })),
        },
        {
          id: 'familyVisaDays',
          label: 'Family visa (days)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.familyVisaDays,
          })),
        },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        {
          id: 'withinTargetPct',
          label: 'Within target (%)',
          colour: '#2A9D8F',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.withinTargetPct,
          })),
        },
        {
          id: 'backlongThousands',
          label: 'Backlog (000s applications)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.backlongThousands,
          })),
        },
      ]
    : [];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2021, 5, 1), label: '2021: Post-Brexit visa system goes live' },
    { date: new Date(2022, 5, 1), label: '2022: UKVI overwhelmed by Afghanistan/Ukraine' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2022, 5, 1), label: '2022: Record backlogs develop' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Visa Processing Times" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Immigration & Population"
          question="How Long Does It Take to Get a UK Visa?"
          finding="Skilled worker visa median processing fell to 12 days, but family visas average 60 days with some waiting over 6 months. Only 68% of applications are cleared within target."
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
            label="Skilled worker visa processing (median)"
            value="12 days"
            unit=""
            direction="down"
            polarity="up-is-bad"
            changeText="Down from 21 days in 2022 · priority services available"
            sparklineData={[18, 17, 16, 15, 14, 19, 21, 18, 15, 13, 12]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Family visa average processing"
            value="60 days"
            unit=""
            direction="down"
            polarity="up-is-bad"
            changeText="Still above 24-week target for complex cases"
            sparklineData={[45, 48, 50, 52, 48, 65, 72, 68, 65, 62, 60]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Applications cleared within target"
            value="68%"
            unit=""
            direction="up"
            polarity="up-is-good"
            changeText="Up from 55% in 2022 · backlog clearing"
            sparklineData={[78, 76, 75, 74, 77, 62, 55, 60, 64, 66, 68]}
            href="#sec-coverage"
          />
        </div>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="UK visa processing times, 2015-2025"
              subtitle="Median processing days for skilled worker and family visas."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Visa applications cleared within target, 2015-2025"
              subtitle="Percentage of visa applications processed within published target times."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Digital visa system launched"
            value="2024"
            unit="eVisa system fully deployed"
            description="The UK's eVisa system replaced physical stamps in 2024, reducing processing time for many routine applications and cutting administrative errors. Priority visa services offer 5-day processing for an additional fee, and the UKVI digital transformation programme has reduced manual processing by 40%."
            source="Source: Home Office — Immigration statistics, 2025."
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
