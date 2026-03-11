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
  overallCompletion: number;
  level2Completion: number;
  starts: number;
  completions: number;
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
    fetch('/data/apprenticeship-completion/apprenticeship_completion.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const chart1Series: Series[] = data
    ? [
        {
          id: 'overallCompletion',
          label: 'Overall completion (%)',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.overallCompletion,
          })),
        },
        {
          id: 'level2Completion',
          label: 'Level 2 completion (%)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.level2Completion,
          })),
        },
      ]
    : [];

  const chart2Series: Series[] = data
    ? [
        {
          id: 'starts',
          label: 'Apprenticeship starts (000s)',
          colour: '#2A9D8F',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.starts,
          })),
        },
        {
          id: 'completions',
          label: 'Completions (000s)',
          colour: '#264653',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.completions,
          })),
        },
      ]
    : [];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2017, 5, 1), label: '2017: Apprenticeship Levy introduced' },
    { date: new Date(2020, 5, 1), label: '2020: Pandemic disrupts delivery' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2017, 5, 1), label: '2017: Levy cut starts by 30% initially' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Apprenticeship Completion" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economy & Work"
          question="Do Apprenticeships Actually Get Finished?"
          finding="Only 52% of apprenticeships started in England are completed. Higher-level apprenticeships have a 61% completion rate while Level 2 drops to 47%."
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
            label="Overall completion rate"
            value="52%"
            unit=""
            direction="flat"
            polarity="up-is-bad"
            changeText="Broadly flat for 5 years · below 2010 rates of 62%"
            sparklineData={[62, 61, 60, 59, 58, 54, 52, 50, 51, 52, 52]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Level 2 completion rate"
            value="47%"
            unit=""
            direction="down"
            polarity="up-is-bad"
            changeText="Lowest completion level · lowest-skilled apprenticeships"
            sparklineData={[56, 55, 54, 52, 51, 48, 47, 45, 46, 47, 47]}
            href="#sec-coverage"
          />
          <MetricCard
            label="Employers citing funding complexity"
            value="28%"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="As reason for employer-side dropout"
            sparklineData={[15, 17, 19, 21, 22, 24, 25, 26, 27, 28, 28]}
            href="#sec-coverage"
          />
        </div>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Apprenticeship completion rates by level, England, 2015-2025"
              subtitle="Percentage of apprenticeships achieving successful completion, by level. Higher-level apprenticeships have significantly better completion rates."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Apprenticeship starts and completions, England, 2015-2025"
              subtitle="Annual apprenticeship starts vs completions (thousands). The gap represents dropouts and ongoing learners."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Value"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Degree apprenticeships growing fast"
            value="27,000"
            unit="degree apprenticeship completions 2024"
            description="Degree apprenticeships — Level 6 and 7 — have grown from 3,000 completions in 2019 to 27,000 in 2024, with completion rates above 70%. They are increasingly used by NHS, financial services and legal firms as an alternative to graduate recruitment."
            source="Source: DfE — Apprenticeships and traineeships data, 2025."
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
