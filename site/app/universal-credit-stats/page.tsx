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
  { num: 1, name: 'DWP', dataset: 'Universal Credit statistics', url: 'https://www.gov.uk/government/collections/universal-credit-statistics', date: '2025', note: '7.5 million claimants, 26% with deductions' },
  { num: 2, name: 'DWP', dataset: 'Evaluation of deduction policy reform', url: 'https://www.gov.uk/government/publications/universal-credit-evaluation', date: '2024', note: 'Deduction cap reduced to 15% from April 2023' },
  { num: 3, name: 'DWP', dataset: 'Universal Credit advances and hardship payments', url: 'https://www.gov.uk/government/statistics/universal-credit-statistics', date: '2025', note: '850,000+ take advance per year' },
];

interface DataPoint {
  year: number;
    claimantsM: number;
    inWorkPct: number;
    paidOnTimePct: number;
    withDeductionsPct: number;
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

export default function UniversalCreditStatsPage() {
  const [data, setData] = useState<TopicData | null>(null);

  useEffect(() => {
    fetch('/data/universal-credit-stats/universal_credit_stats.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const series1: Series[] = data ? [
    {
      id: 'claimantsM',
      label: "UC claimants (millions)",
      colour: "#264653",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.claimantsM })),
    },
    {
      id: 'inWorkPct',
      label: "In-work claimants (%)",
      colour: "#2A9D8F",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.inWorkPct })),
    },
  ] : [];

  const series2: Series[] = data ? [
    {
      id: 'paidOnTimePct',
      label: "Claims paid on time (%)",
      colour: "#2A9D8F",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.paidOnTimePct })),
    },
    {
      id: 'withDeductionsPct',
      label: "Claims with deductions (%)",
      colour: "#E63946",
      data: data.national.timeSeries.map(d => ({ date: new Date(d.year, 0, 1), value: d.withDeductionsPct })),
    },
  ] : [];

  const annotations1: Annotation[] = [
    { date: new Date(2020, 0, 1), label: "2020: COVID \u2014 3m new claims in 3 weeks" },
    { date: new Date(2022, 0, 1), label: "2022: Natural migration to UC complete" },
  ];

  const annotations2: Annotation[] = [
    { date: new Date(2021, 0, 1), label: "2021: Max deduction rate reduced from 30% to 25%" },
    { date: new Date(2023, 0, 1), label: "2023: Deduction cap reduced to 15%" },
  ];

  return (
    <>
      <TopicNav topic="Universal Credit" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Poverty & Cost of Living"
          question="Does Universal Credit Actually Work?"
          finding={<>7.5 million people claim Universal Credit; 1 in 4 experience deductions that reduce their payment.<Cite nums={1} /> The 5-week wait for first payment affects 850,000 new claimants per year.<Cite nums={3} /></>}
          colour="#F4A261"
        />

        <section className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              7.5 million people claim Universal Credit; 1 in 4 experience deductions that reduce their payment.<Cite nums={1} /> The 5-week wait for first payment affects 850,000 new claimants per year.<Cite nums={3} /> The data below draws on official sources to show how this has changed over the past decade and where the pressures are most acute.
            </p>
            <p>
              The figures reflect a structural pattern rather than a short-term fluctuation. Understanding the scale of the issue is the first step toward holding policymakers to account for the decisions that shape these outcomes.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-chart1', label: "UC claimants" },
          { id: 'sec-chart2', label: "Claims paid on time" },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="UC claimants"
            value="7.5m"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Up from 4m pre-pandemic \u00b7 fully rolled out"
            sparklineData={[1.8,2.2,2.5,2.9,3.1,5.8,5.9,6.0,6.5,7.0,7.5]}
            href="#sec-chart1"
          />
          <MetricCard
            label="Claimants with deductions"
            value="26%"
            unit=""
            direction="flat"
            polarity="up-is-bad"
            changeText="Advance repayment, overpayments, debts"
            sparklineData={[28,28,27,26,26,27,26,26,26,26,26]}
            href="#sec-chart2"
          />
          <MetricCard
            label="Advance loans for 5-week wait"
            value="45%"
            unit=" of new claimants"
            direction="flat"
            polarity="up-is-bad"
            changeText="850,000+ take advance per year \u00b7 creates debt"
            sparklineData={[48,47,46,46,45,45,45,45,45,45,45]}
            href="#sec-chart1"
          />
        </div>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Universal Credit caseload, 2015\u20132025"
              subtitle="Number of people (households) claiming Universal Credit, England, Scotland and Wales. The caseload tripled during COVID as the benefit replaced legacy systems for millions."
              series={series1}
              annotations={annotations1}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="UC payment timeliness and deductions, 2015\u20132025"
              subtitle="Percentage of UC claims paid correctly and on time, and the share of claimants subject to deductions from their award."
              series={series2}
              annotations={annotations2}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Deduction cap reduced to 15%"
            value="15%"
            unit="maximum deduction cap from 2023"
            description={<>The maximum rate of UC deductions was reduced from 25% to 15% of the standard allowance from April 2023, returning an average of {"\u00a3"}57 per month to those affected.<Cite nums={2} /> The 5-week wait policy was not changed but the maximum repayment term for advance loans was extended to 24 months.<Cite nums={3} /> DWP also improved the &lsquo;trusted partner&rsquo; system allowing food banks to request emergency payments for clients in hardship.</>}
            source="Source: DWP \u2014 Universal Credit statistics, 2025. DWP \u2014 Evaluation of deduction policy reform, 2024."
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

        <div className="mt-6 max-w-2xl"><References items={editorialRefs} /></div>
      </main>
    </>
  );
}
