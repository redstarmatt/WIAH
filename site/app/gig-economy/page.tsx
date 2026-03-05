'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface GigEconomyData {
  national: {
    timeSeries: Array<{
      date: string;
      gigWorkersMillion: number;
      gigHourlyPay: number;
      employeeHourlyPay: number;
    }>;
  };
  metadata: {
    sources: Array<{ name: string; dataset: string; url: string; frequency: string }>;
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: string): Date {
  return new Date(parseInt(y), 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function GigEconomyPage() {
  const [data, setData] = useState<GigEconomyData | null>(null);

  useEffect(() => {
    fetch('/data/gig-economy/gig_economy.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const workersSeries: Series[] = data
    ? [{
        id: 'gig-workers',
        label: 'Estimated gig workers (millions)',
        colour: '#F4A261',
        data: data.national.timeSeries.map(d => ({
          date: yearToDate(d.date),
          value: d.gigWorkersMillion,
        })),
      }]
    : [];

  const paySeries: Series[] = data
    ? [
        {
          id: 'gig-pay',
          label: 'Gig workers (net of costs, &pound;/hr)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.date),
            value: d.gigHourlyPay,
          })),
        },
        {
          id: 'employee-pay',
          label: 'Employees &mdash; median hourly (&pound;/hr)',
          colour: '#2A9D8F',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.date),
            value: d.employeeHourlyPay,
          })),
        },
      ]
    : [];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Gig Economy" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Gig Economy"
          question="What Is the Gig Economy Actually Doing to Workers?"
          finding="An estimated 4.4 million people work in the gig economy &mdash; typically earning below minimum wage once costs are deducted &mdash; with no sick pay, no pension, and no guaranteed hours."
          colour="#F4A261"
          preposition="in the"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>An estimated 4.4 million people performed gig work as their primary income source in 2024, up from 2.8 million in 2017, with ride-hailing, food delivery, cleaning, care work, and freelance services accounting for the largest categories. The economics are significantly worse than headline rates suggest: TUC research finds that once vehicle costs, fuel, insurance, equipment, and unpaid waiting time are deducted, 38&percnt; of gig workers earn below the National Minimum Wage after costs. Gig workers are classified as self-employed for National Insurance purposes, meaning neither they nor platforms pay employer NI contributions, reducing access to contributory benefits. The Supreme Court&rsquo;s ruling in Uber BV v Aslam [2021] established that Uber drivers are &ldquo;workers&rdquo; entitled to minimum wage and holiday pay &mdash; the most significant employment law ruling of the decade &mdash; and the Employment Rights Bill 2024 proposes to extend those rights further.</p>
            <p>The gig economy&rsquo;s costs fall disproportionately on younger and migrant workers. Workers aged 18&ndash;30 account for roughly 55&percnt; of participants; in London and other major cities, delivery workers are disproportionately from Black, Asian, and minority ethnic backgrounds, often without the language support or legal literacy to challenge their classification. Around 40&percnt; of all gig economy workers are based in London and the South East. Only 9&percnt; of gig workers have a workplace pension, against 76&percnt; of employees, meaning that low pay and insecurity in the present compounds into poverty in retirement.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-workers', label: 'Gig Workers' },
          { id: 'sec-pay', label: 'Pay Comparison' },
        ]} />

        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Estimated gig workers"
              value="4.4M"
              direction="up"
              polarity="up-is-bad"
              changeText="2024 &middot; Up from 2.8M in 2017 &middot; No sick pay, no pension, no guaranteed hours"
              sparklineData={[2.8, 3.1, 3.4, 3.6, 3.8, 4.0, 4.2, 4.4]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Earning below minimum wage after costs"
              value="38&percnt;"
              direction="up"
              polarity="up-is-bad"
              changeText="TUC 2023 &middot; Delivery workers most exposed &middot; Costs include vehicle, fuel, equipment"
              sparklineData={[28, 30, 32, 33, 35, 36, 37, 38]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Gig workers with workplace pension"
              value="9&percnt;"
              direction="flat"
              polarity="up-is-good"
              changeText="vs 76&percnt; of employees &middot; Auto-enrolment does not apply to self-employed"
              sparklineData={[7, 8, 8, 8, 9, 9, 9, 9]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-workers" className="mb-12">
            <LineChart
              title="Estimated gig economy workers, UK, 2016&ndash;2024 (millions)"
              subtitle="People performing gig work as a primary income source, combining platform delivery, ride-hailing, freelance, and care platform work."
              series={workersSeries}
              yLabel="Millions"
              source={{
                name: 'TUC &amp; University of Hertfordshire',
                dataset: 'Living on the Gig Economy Survey',
                frequency: 'periodic',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-pay" className="mb-12">
            <LineChart
              title="Gig worker net hourly pay vs employee median hourly pay, 2016&ndash;2024"
              subtitle="Gig worker figures are net of work-related costs. Employee figures are ONS ASHE median hourly earnings. The gap has widened as employee wages grew faster than gig income."
              series={paySeries}
              yLabel="&pound; per hour"
              source={{
                name: 'TUC &amp; ONS',
                dataset: 'Gig Economy Survey &amp; Annual Survey of Hours and Earnings',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What&apos;s changing"
            value="Supreme Court Uber ruling"
            unit="2021"
            description="The Supreme Court&apos;s unanimous ruling in Uber BV v Aslam (2021) established that app-based drivers are &ldquo;workers&rdquo; &mdash; not self-employed &mdash; entitling them to minimum wage and holiday pay. It was the most significant employment law ruling of the decade. Uber subsequently settled with thousands of drivers for back-pay and has implemented minimum earnings guarantees. The ruling set a precedent that other platforms must consider when structuring their engagements. The Employment Rights Bill (2024) proposes to simplify the worker/employee/self-employed distinction, potentially extending rights to a further estimated 1.5 million people."
            source="Source: TUC &mdash; Living on the Gig Economy 2024; ONS &mdash; Labour Force Survey 2024; CIPD &mdash; Good Work Index 2024; Supreme Court &mdash; Uber BV v Aslam [2021] UKSC 5."
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
