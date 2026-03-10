'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

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
          label: 'Gig workers (net of costs, £/hr)',
          colour: '#E63946',
          data: data.national.timeSeries.map(d => ({
            date: yearToDate(d.date),
            value: d.gigHourlyPay,
          })),
        },
        {
          id: 'employee-pay',
          label: 'Employees — median hourly (£/hr)',
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
          finding="An estimated 4.4 million people work in the gig economy — typically earning below minimum wage once costs are deducted — with no sick pay, no pension, and no guaranteed hours."
          colour="#F4A261"
          preposition="in the"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK gig economy encompasses a range of work arrangements in which people are engaged on a task-by-task basis, typically through a digital platform, without a guaranteed minimum wage, fixed hours, or an employment contract. Estimates of its size vary significantly by methodology: TUC and University of Hertfordshire surveys suggest approximately 4.4 million people performed gig work as their primary income source in 2024, while broader definitions that include occasional or secondary gig income could encompass up to 9 million people. Ride-hailing, food delivery, cleaning, care work, and freelance professional services account for the largest categories. The sector grew rapidly from around 2015 as smartphone penetration, algorithmic matching, and investor-subsidised pricing made platform labour economically viable for a critical mass of workers. During the COVID-19 pandemic, delivery platform worker numbers surged as lockdowns collapsed demand for in-person services while driving demand for food and grocery delivery; many of these workers remained after restrictions lifted, and the delivery economy consolidated around a smaller number of dominant platforms.</p>
            <p>The economics of gig work are significantly worse than headline rates suggest. TUC research based on worker surveys consistently finds that once vehicle costs, fuel, insurance, equipment, data, and unpaid waiting time are factored in, effective hourly earnings for delivery and ride-hailing workers fall substantially below the National Minimum Wage. The platform pays per task or per mile, but workers bear all the capital costs of the work — typically a vehicle, bicycle, or scooter — and spend significant unpaid time waiting for jobs, navigating, and managing platform apps. A 2021 TUC survey found that 38% of gig workers earned less than £8.72 per hour (then the National Living Wage) after costs, with delivery workers most exposed. Gig workers are also classified as self-employed for National Insurance purposes, meaning neither they nor their engagers pay employer NI contributions, reducing their access to contributory benefits and lowering the tax base for state services.</p>
            </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-workers', label: 'Gig Workers' },
          { id: 'sec-pay', label: 'Pay Comparison' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Estimated gig workers"
              value="4.4M"
              direction="up"
              polarity="up-is-bad"
              changeText="2024 · Up from 2.8M in 2017 · No sick pay, no pension, no guaranteed hours"
              sparklineData={[2.8, 3.1, 3.4, 3.6, 3.8, 4.0, 4.2, 4.4]}
              href="#sec-workers"
            />
            <MetricCard
              label="Earning below minimum wage after costs"
              value="38%"
              direction="up"
              polarity="up-is-bad"
              changeText="TUC 2023 · Delivery workers most exposed · Costs include vehicle, fuel, equipment"
              sparklineData={[28, 30, 32, 33, 35, 36, 37, 38]}
              href="#sec-workers"
            />
            <MetricCard
              label="Gig workers with workplace pension"
              value="9%"
              direction="flat"
              polarity="up-is-good"
              changeText="vs 76% of employees · Auto-enrolment does not apply to self-employed"
              sparklineData={[7, 8, 8, 8, 9, 9, 9, 9]}
              href="#sec-workers"
            />
          </div>
        

        <ScrollReveal>
          <section id="sec-workers" className="mb-12">
            <LineChart
              title="Estimated gig economy workers, UK, 2016–2024 (millions)"
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
              title="Gig worker net hourly pay vs employee median hourly pay, 2016–2024"
              subtitle="Gig worker figures are net of work-related costs. Employee figures are ONS ASHE median hourly earnings. The gap has widened as employee wages grew faster than gig income."
              series={paySeries}
              yLabel="£ per hour"
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
            title="What's changing"
            value="Supreme Court Uber ruling"
            unit="2021"
            description="The Supreme Court's unanimous ruling in Uber BV v Aslam (2021) established that app-based drivers are &ldquo;workers&rdquo; — not self-employed — entitling them to minimum wage and holiday pay. It was the most significant employment law ruling of the decade. Uber subsequently settled with thousands of drivers for back-pay and has implemented minimum earnings guarantees. The ruling set a precedent that other platforms must consider when structuring their engagements. The Employment Rights Bill (2024) proposes to simplify the worker/employee/self-employed distinction, potentially extending rights to a further estimated 1.5 million people."
            source="Source: TUC — Living on the Gig Economy 2024; ONS — Labour Force Survey 2024; CIPD — Good Work Index 2024; Supreme Court — Uber BV v Aslam [2021] UKSC 5."
          />
        </ScrollReveal>

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
              <RelatedTopics />
      </main>
    </>
  );
}
