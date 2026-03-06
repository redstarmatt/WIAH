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

interface SecondJobsPoint {
  year: number;
  holdersMillions: number;
}

interface NHSSecondJobsPoint {
  year: number;
  percentNHS: number;
}

interface FinancialNecessityPoint {
  year: number;
  percentFinancialNecessity: number;
}

interface SecondJobsData {
  national: {
    secondJobHolders: {
      timeSeries: SecondJobsPoint[];
      latestYear: number;
      latestMillions: number;
      note: string;
    };
    nhsSecondJobs: {
      timeSeries: NHSSecondJobsPoint[];
      latestYear: number;
      latestPercent: number;
      note: string;
    };
    financialNecessity: {
      timeSeries: FinancialNecessityPoint[];
      latestYear: number;
      latestPercent: number;
      note: string;
    };
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

export default function SecondJobHoldersPage() {
  const [data, setData] = useState<SecondJobsData | null>(null);

  useEffect(() => {
    fetch('/data/second-job-holders/second_jobs.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const totalSecondJobsSeries: Series[] = data
    ? [{
        id: 'secondJobs',
        label: 'People in second jobs (millions)',
        colour: '#6B7280',
        data: data.national.secondJobHolders.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.holdersMillions,
        })),
      }]
    : [];

  const sectorAndNecessitySeries: Series[] = data
    ? [
        {
          id: 'nhsRate',
          label: 'NHS staff with second job (%)',
          colour: '#E63946',
          data: data.national.nhsSecondJobs.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.percentNHS,
          })),
        },
        {
          id: 'necessity',
          label: 'Citing financial necessity (%)',
          colour: '#F4A261',
          data: data.national.financialNecessity.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.percentFinancialNecessity,
          })),
        },
      ]
    : [];

  const totalAnnotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: Furlough reduces second job holding temporarily' },
    { date: new Date(2022, 5, 1), label: '2022: Cost of living crisis — second jobs surge' },
  ];

  const sectorAnnotations: Annotation[] = [
    { date: new Date(2022, 5, 1), label: '2022: NHS pay disputes — real wages falling sharply' },
    { date: new Date(2023, 5, 1), label: '2023: Largest public sector pay awards in 20 years' },
  ];

  // ── Sparkline helpers ────────────────────────────────────────────────────

  const totalSparkline = data
    ? data.national.secondJobHolders.timeSeries.map(d => d.holdersMillions)
    : [];
  const nhsSparkline = data
    ? data.national.nhsSecondJobs.timeSeries.map(d => d.percentNHS)
    : [];
  const necessitySparkline = data
    ? data.national.financialNecessity.timeSeries.map(d => d.percentFinancialNecessity)
    : [];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Second Jobs" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Second Jobs &amp; Multiple Employment"
          question="How Many People Need Two Jobs to Get By?"
          finding="1.3 million people in the UK hold a second job, up 22% since 2019. Among public sector workers &mdash; nurses, teachers, police &mdash; the rate has risen sharply since 2022. Real-terms pay cuts are the primary driver."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The Office for National Statistics Labour Force Survey has tracked second job holding for three decades. The current figure of 1.3 million is near a record high, up 22% since 2019. Growth in gig economy platforms &mdash; Deliveroo, Uber, TaskRabbit, Fiverr &mdash; has made acquiring a second income stream significantly easier than it was for previous generations. But the CIPD&apos;s analysis suggests the dominant driver is not voluntary portfolio working but financial need: 55% of second job holders in 2025 cite financial necessity as their primary motivation, up from 44% in 2022, tracking the cost of living crisis almost exactly.
            </p>
            <p>
              The sharpest increases have been in the public sector, where real pay has been eroded most severely. NHS staff holding second jobs rose from 7% in 2019 to 13% in 2024. Nurses working agency shifts at weekends, teachers tutoring privately, police officers moonlighting as security guards: the phenomenon has moved from anecdote to data. The practical consequences extend beyond individual wellbeing. NHS staff working excessive hours across multiple employers risk errors from fatigue. The conflict of interest for police officers working private security is obvious. Teachers tutoring privately exacerbates educational inequality as those who can pay get more teacher time. These are externalities of a pay policy choice, not inevitable features of a modern labour market.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-total', label: 'Total Second Jobs' },
          { id: 'sec-sectors', label: 'NHS & Necessity' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="People in second jobs (UK)"
              value="1.3M"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="+22% since 2019 · Gig platforms facilitating side income"
              sparklineData={totalSparkline}
              href="#sec-total"
            />
            <MetricCard
              label="NHS staff working second jobs"
              value="13%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 7% in 2019 · Pay stagnation driving moonlighting"
              sparklineData={nhsSparkline}
              href="#sec-total"
            />
            <MetricCard
              label="Citing financial necessity"
              value="55%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="vs 44% in 2022 · Cost of living crisis primary driver"
              sparklineData={necessitySparkline}
              href="#sec-total"
            />
          </div>
        </ScrollReveal>

        {/* Chart 1: Total second job holders */}
        <ScrollReveal>
          <section id="sec-total" className="mb-12">
            <LineChart
              title="People holding a second job, UK, 2015&ndash;2025"
              subtitle="Labour Force Survey estimate of UK employees holding a second job (millions). Broadly flat 2015&ndash;2021 before rising sharply as the cost of living crisis took hold. Gig economy platforms have reduced friction for taking on secondary work."
              series={totalSecondJobsSeries}
              annotations={totalAnnotations}
              yLabel="Millions"
            />
          </section>
        </ScrollReveal>

        {/* Chart 2: NHS second jobs and financial necessity */}
        <ScrollReveal>
          <section id="sec-sectors" className="mb-12">
            <LineChart
              title="NHS staff with second jobs and financial necessity as driver, 2019&ndash;2025"
              subtitle="Percentage of NHS staff in England holding a second job (red) and percentage of all second job holders citing financial necessity as primary reason (amber). Both indicators track public sector pay stagnation and the cost of living crisis."
              series={sectorAndNecessitySeries}
              annotations={sectorAnnotations}
              yLabel="Percent (%)"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="What&apos;s improving"
            value="6-7%"
            unit="Public sector pay awards 2023-24"
            description="Public sector pay awards in 2023&ndash;24 were the largest in two decades, averaging 6&ndash;7% and representing a partial restoration of real pay. The government&apos;s Fair Pay Agreements for adult social care, if fully implemented, will set sector-wide pay floors that may reduce the need for multiple jobs. The Low Pay Commission&apos;s increased National Living Wage (from &pound;10.42 to &pound;11.44 in 2024) raised baseline pay for the lowest-paid second jobs, improving returns. Flexible working rights enacted under the Employment Relations (Flexible Working) Act 2023 make combining multiple part-time roles more manageable."
            source="Source: ONS &mdash; Labour Force Survey, employee second jobs. NHS Staff Survey 2024 &mdash; secondary employment analysis. CIPD &mdash; Good Work Index 2025."
          />
        </ScrollReveal>

        {/* Sources */}
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            {data?.metadata.sources.map((src, i) => (
              <div key={i}>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                  {src.name} &mdash; {src.dataset}
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
