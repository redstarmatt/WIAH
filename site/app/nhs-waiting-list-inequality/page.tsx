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

interface DeprivationGapPoint {
  year: number;
  gapWeeks: number;
}

interface TotalListPoint {
  year: number;
  waitingMillions: number;
}

interface DeprivationWaitPoint {
  quintile: number;
  label: string;
  medianWaitWeeks: number;
  over52WeeksPct: number;
}

interface WaitingInequalityData {
  national: {
    waitByDeprivation: {
      year: number;
      data: DeprivationWaitPoint[];
    };
    deprivationGap: {
      timeSeries: DeprivationGapPoint[];
      latestYear: number;
      latestGapWeeks: number;
    };
    totalWaitingList: {
      timeSeries: TotalListPoint[];
      latestYear: number;
      latestMillions: number;
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

export default function WaitingInequalityPage() {
  const [data, setData] = useState<WaitingInequalityData | null>(null);

  useEffect(() => {
    fetch('/data/nhs-waiting-list-inequality/waiting_inequality.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const gapSeries: Series[] = data
    ? [
        {
          id: 'gap',
          label: 'Deprivation gap in median wait (weeks)',
          colour: '#E63946',
          data: data.national.deprivationGap.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.gapWeeks,
          })),
        },
      ]
    : [];

  const totalListSeries: Series[] = data
    ? [
        {
          id: 'total',
          label: 'Total NHS waiting list (millions)',
          colour: '#264653',
          data: data.national.totalWaitingList.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.waitingMillions,
          })),
        },
      ]
    : [];

  const gapAnnotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: COVID elective pause — gap widens' },
    { date: new Date(2022, 5, 1), label: '2022: Elective recovery programme starts' },
  ];

  const listAnnotations: Annotation[] = [
    { date: new Date(2021, 5, 1), label: '2021: Waiting list rebuild post-COVID' },
    { date: new Date(2023, 5, 1), label: '2023: Record 7.8M peak' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="NHS Waiting List Inequality" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Health"
          question="Who Waits Longest for NHS Treatment?"
          finding="Patients in the most deprived areas wait on average 4.2 weeks longer than those in the least deprived areas for the same procedure. The deprivation gap in waiting times has widened since 2019."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The NHS waiting list headline — 7.4 million people waiting for elective treatment — conceals a significant inequality. Patients living in the most deprived areas wait, on average, 4.2 weeks longer for the same procedure than those in the least deprived areas. The gap has doubled since 2019. It is not random: people in deprived areas are more likely to have complex conditions requiring longer pathways, are more likely to miss appointments due to transport costs or caring responsibilities, and are more likely to be seen in under-resourced trusts in areas with multiple deprivation.
            </p>
            <p>
              The consequence is that inequality in health outcomes is compounded by inequality in access to treatment. A diabetic patient in a deprived area who waits longer for ophthalmology is more likely to progress to sight loss. A hip replacement delayed for a working-age person in poverty has different consequences to the same delay for a retired person with private means. NHS England's CORE20PLUS5 programme explicitly targets the five clinical areas where this inequality is largest, but progress is slow.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-gap', label: 'Deprivation gap' },
          { id: 'sec-total', label: 'Total waiting list' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Deprivation gap in waiting times"
              value="4.2 weeks"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Most vs least deprived · Up from 2.1 weeks in 2019"
              sparklineData={[2.1, 2.4, 3.1, 3.8, 4.0, 4.2]}
              onExpand={() => {}}
            />
            <MetricCard
              label="% waiting >52 weeks (most deprived)"
              value="8.2%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="vs 5.1% least deprived · 60% higher wait burden"
              sparklineData={[3.2, 4.1, 6.8, 8.5, 8.4, 8.2]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Total NHS waiting list"
              value="7.4M"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="Down from peak 7.8M · Inequality within total persists"
              sparklineData={[4.4, 4.6, 5.8, 6.8, 7.8, 7.4]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-gap" className="mb-12">
            <LineChart
              title="Deprivation gap in NHS elective waiting times, England, 2019–2024"
              subtitle="Gap in median referral-to-treatment wait between patients in the most and least deprived areas (IMD quintiles). The COVID elective pause disproportionately affected deprived areas and the gap has not recovered."
              series={gapSeries}
              annotations={gapAnnotations}
              yLabel="Weeks (gap)"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-total" className="mb-12">
            <LineChart
              title="Total NHS England elective waiting list, 2019–2024"
              subtitle="Total number of patients waiting for elective treatment. The list peaked at 7.8 million in 2023 and has begun to fall, but the inequality within the total — who waits longest — persists regardless of headline size."
              series={totalListSeries}
              annotations={listAnnotations}
              yLabel="Millions of patients"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="What's improving"
            value="CORE20PLUS5"
            unit="NHS England inequality programme"
            description="NHS England's CORE20PLUS5 programme targets the most deprived 20% of the population across five clinical areas (cardiovascular, cancer, maternity, severe mental illness, chronic respiratory disease) where inequality gaps are largest. Elective recovery funds include specific measures to prioritise patients who have waited longest regardless of area. The NHS Long Term Plan commits to reducing health inequality as a core objective."
            source="Source: NHS England — RTT Waiting Times Statistics, 2024. NHS England — CORE20PLUS5 Dashboard, 2025."
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
