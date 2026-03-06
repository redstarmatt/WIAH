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

interface HomeworkingRatePoint {
  year: number;
  pctHomeworking: number;
}

interface QuintilePoint {
  quintile: string;
  quintileShort: string;
  pctHomeworking: number;
}

interface FlexibilityRetentionPoint {
  year: number;
  wouldQuitPct: number;
}

interface RemoteWorkData {
  national: {
    homeworkingByQuintile: {
      data: QuintilePoint[];
      year: number;
      note: string;
    };
    nationalHomeworkingRate: {
      timeSeries: HomeworkingRatePoint[];
      latestYear: number;
      latestPct: number;
      note: string;
    };
    flexibilityRetention: {
      timeSeries: FlexibilityRetentionPoint[];
      latestYear: number;
      latestPct: number;
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

export default function RemoteWorkAccessPage() {
  const [data, setData] = useState<RemoteWorkData | null>(null);

  useEffect(() => {
    fetch('/data/remote-work-access/remote_work.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const nationalRateSeries: Series[] = data
    ? [{
        id: 'nationalRate',
        label: 'Working from home at least 1 day/week (%)',
        colour: '#264653',
        data: data.national.nationalHomeworkingRate.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.pctHomeworking,
        })),
      }]
    : [];

  const retentionSeries: Series[] = data
    ? [{
        id: 'retention',
        label: 'Would quit without flexible working (%)',
        colour: '#F4A261',
        data: data.national.flexibilityRetention.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.wouldQuitPct,
        })),
      }]
    : [];

  const rateAnnotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: Mandatory lockdown homeworking' },
    { date: new Date(2022, 5, 1), label: '2022: Return-to-office pressure grows' },
    { date: new Date(2024, 5, 1), label: '2024: Day-one right to flexible working' },
  ];

  const retentionAnnotations: Annotation[] = [
    { date: new Date(2022, 5, 1), label: '2022: First large-scale RTO mandates' },
    { date: new Date(2024, 5, 1), label: '2024: Employment Rights Bill enacted' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Remote Work Divide" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Remote Work Divide"
          question="Is Working from Home Only for the Privileged?"
          finding="Only 12% of jobs in the bottom income quintile offer any homeworking, versus 68% in the top quintile. The remote work divide has widened regional inequality, with London gaining the greatest productivity benefits."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The pandemic created what economists call a &lsquo;bifurcated&rsquo; labour market: those whose work can be done from a laptop, and those whose work cannot. A warehouse operative, a nurse, a delivery driver, a care worker, a chef &mdash; none of these roles is compatible with homeworking. A management consultant, a software engineer, a policy analyst, a finance professional &mdash; all can be done from anywhere with good broadband. The income correlation is stark: 68% of workers in the top income quintile worked from home at least once a week in 2024, compared with just 12% in the bottom quintile.
            </p>
            <p>
              This is not simply an inconvenience gap. Remote working has compounding economic advantages: eliminated commuting costs (averaging &pound;3,200 per year for London commuters), greater control over working hours, lower incidence of workplace illness, and access to the wider national job market rather than only local roles. Office workers who can negotiate hybrid working gain all of these benefits; workers in face-to-face roles receive none. The regional dimension reinforces the inequality: London gained disproportionately from the homeworking revolution because its high-skilled, high-pay workforce is the most homeworking-compatible, widening its productivity gap over other English regions.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-rate', label: 'National Rate' },
          { id: 'sec-retention', label: 'Retention Impact' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Homeworking access bottom income quintile"
              value="12%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="vs 68% top quintile &middot; 56pp gap &middot; Largest class divide in work"
              sparklineData={[12, 18, 28, 45, 68]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Working from home (at least 1 day/week)"
              value="22%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Up from 5.7% pre-pandemic &middot; Settled at post-pandemic norm"
              sparklineData={[5.7, 25.9, 22.1, 20.4, 21.8, 22.4]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Would quit without flexibility"
              value="48%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Up from 42% in 2022 &middot; Flexibility now a key retention factor"
              sparklineData={[42, 45, 48]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-rate" className="mb-12">
            <LineChart
              title="National homeworking rate, UK, 2019&ndash;2024"
              subtitle="Percentage of employed people working from home at least once per week. Spiked to 26% during 2020 lockdowns, then settled at 22% &mdash; four times the pre-pandemic baseline."
              series={nationalRateSeries}
              annotations={rateAnnotations}
              yLabel="% working from home"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-retention" className="mb-12">
            <LineChart
              title="Workers who would seek a new job if flexibility removed, UK, 2022&ndash;2024"
              subtitle="Proportion of homeworking-eligible employees who say they would look for a new employer if their current employer mandated full-time office attendance. Rising year-on-year."
              series={retentionSeries}
              annotations={retentionAnnotations}
              yLabel="% who would seek new job"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="What&apos;s improving"
            value="Day-one right to flexible working"
            unit=""
            description="The Employment Rights Bill 2024 introduces a day-one right to request flexible working. The government&apos;s Flexible Working Taskforce is working with employers on hybrid implementation. Some employers are trialling &lsquo;compressed hours&rsquo; and job sharing to extend flexibility benefits to roles not compatible with homeworking. Digital skills programmes aim to expand the proportion of the workforce in roles that can benefit from location flexibility."
            source="Source: ONS &mdash; Homeworking in the UK 2024; CIPD &mdash; Flexible and hybrid working practices 2024."
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
