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

interface SelfEmploymentData {
  national: {
    selfEmployedCount: {
      timeSeries: Array<{ year: number; millionsSelfEmployed: number }>;
    };
    medianIncome: {
      timeSeries: Array<{ year: number; weeklyMedian: number }>;
    };
  };
  metadata: {
    sources: Array<{ name: string; dataset: string; url: string; frequency: string }>;
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function SelfEmploymentPage() {
  const [data, setData] = useState<SelfEmploymentData | null>(null);

  useEffect(() => {
    fetch('/data/self-employment/self_employment.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const countSeries: Series[] = data
    ? [{
        id: 'self-employed-count',
        label: 'Self-employed (millions)',
        colour: '#F4A261',
        data: data.national.selfEmployedCount.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.millionsSelfEmployed,
        })),
      }]
    : [];

  const incomeSeries: Series[] = data
    ? [{
        id: 'median-income',
        label: 'Median weekly income (£)',
        colour: '#264653',
        data: data.national.medianIncome.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.weeklyMedian,
        })),
      }]
    : [];

  const countAnnotations: Annotation[] = [
    { date: yearToDate(2020), label: '2020: 700K leave self-employment' },
    { date: yearToDate(2021), label: '2021: IR35 reforms' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Self-Employment" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Self-Employment"
          question="What Happened to Britain&apos;s Self-Employed?"
          finding="Self-employment peaked at 4.93 million in 2019 then collapsed: 700,000 people left the sector during COVID-19 and have not returned. The self-employed earn 40% less per hour than employees on a median basis, have no entitlement to sick pay, holiday pay, or employer pension contributions, and were excluded from furlough. IR35 reforms have pushed many into a grey zone between employment and self-employment."
          colour="#F4A261"
          preposition="with"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK&apos;s self-employed workforce peaked at 4.93 million in late 2019 before collapsing during the pandemic: by 2024 it had recovered to only 4.29 million &mdash; still 13% below the pre-pandemic peak. Median weekly earnings for the self-employed are approximately &pound;310, against &pound;535 for employees &mdash; a 42% gap &mdash; and one in three earns below the National Living Wage on an hourly basis. Only 16% of the self-employed contribute to a pension, compared with 79% of employees. IR35 off-payroll working rules, extended to the private sector in April 2021, shifted status-determination to hiring organisations, generating approximately &pound;2 billion in additional tax revenue but pushing many contractors into umbrella company arrangements where they lose self-employment tax advantages without gaining employee rights. An estimated 4.4 million people have performed gig economy work, though the Supreme Court&apos;s February 2021 ruling that Uber drivers are workers has been unevenly enforced across similar platforms.</p>
            <p>The burden of precariousness falls most heavily on those who entered self-employment involuntarily &mdash; after redundancy or as a result of IR35 restructuring &mdash; and on gig workers in delivery and ride-hailing, where ethnic minority workers are disproportionately represented. Workers aged 50+ make up 35% of the self-employed, many with limited pension savings and declining earning power. Income volatility is extreme: 45% of freelancers experienced month-to-month income swings of more than 50% in 2023, with no statutory right to sick pay, holiday pay, or redundancy, and no income support equivalent to furlough when work disappears. The Taylor Review of 2017 recommended a new &ldquo;dependent contractor&rdquo; category and clearer status tests; neither recommendation has been implemented.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-count', label: 'Self-Employed Count' },
          { id: 'sec-income', label: 'Income' },
        ]} />

        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Self-employed workers"
              value="4.29M"
              direction="down"
              polarity="up-is-good"
              changeText="2024 &middot; Down from 4.93M peak in 2019 &middot; 700K left during COVID &middot; Most have not returned"
              sparklineData={[4.77, 4.80, 4.86, 4.85, 4.93, 4.31, 4.25, 4.24, 4.26, 4.29]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Median weekly earnings (self-employed)"
              value="&pound;310"
              direction="flat"
              polarity="up-is-good"
              changeText="2024 &middot; Employees: &pound;535/wk &middot; 42% earnings gap &middot; 1 in 3 below Living Wage hourly"
              sparklineData={[280, 275, 285, 290, 300, 256, 275, 290, 300, 310]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Self-employed with a pension"
              value="16%"
              direction="flat"
              polarity="up-is-good"
              changeText="2024 &middot; Employees: 79% &middot; Auto-enrolment does not apply &middot; Major retirement income risk"
              sparklineData={[14, 14, 15, 15, 15, 15, 16, 16]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-count" className="mb-12">
            <LineChart
              title="Self-employed workers, UK, 2015&ndash;2024"
              subtitle="Total number of people whose main job is self-employed (millions). The pandemic caused a structural collapse."
              series={countSeries}
              yLabel="Millions"
              annotations={countAnnotations}
              source={{
                name: 'ONS',
                dataset: 'Labour Force Survey — Self-Employment',
                frequency: 'quarterly',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-income" className="mb-12">
            <LineChart
              title="Median weekly earnings, self-employed, UK, 2015&ndash;2024"
              subtitle="Self-reported median weekly income from self-employment (&pound;). Includes both full-time and part-time self-employed."
              series={incomeSeries}
              yLabel="£ per week"
              source={{
                name: 'ONS',
                dataset: 'Labour Force Survey',
                frequency: 'quarterly',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What&apos;s improving"
            value="Uber ruling"
            unit="Supreme Court 2021 — gig workers are workers with minimum wage and holiday rights"
            description="The Supreme Court&apos;s Uber v Aslam ruling (February 2021) established that gig economy drivers are workers, not self-employed contractors, entitling them to minimum wage, holiday pay, and pension auto-enrolment. The Employment Rights Bill proposes clearer employment status tests and stronger enforcement. The Self-Employed Income Support Scheme demonstrated that targeted support for the self-employed is feasible in a crisis. HMRC&apos;s Making Tax Digital programme is simplifying tax administration for 4.2 million self-employed. IPSE and the FSB continue to advocate for portable benefits and pension auto-enrolment for the self-employed."
            source="Source: ONS &mdash; Labour Force Survey 2024; HMRC &mdash; Self Assessment Statistics 2024; IPSE &mdash; Freelancer Confidence Index Q4 2024."
          />
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
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
