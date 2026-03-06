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

interface EmploymentRate5064Point {
  year: number;
  employmentRatePct: number;
}

interface InactivityPoint {
  year: number;
  inactiveThousands: number;
}

interface EmploymentRate65PlusPoint {
  year: number;
  employmentRatePct: number;
}

interface OlderWorkersData {
  national: {
    employmentRate5064: {
      timeSeries: EmploymentRate5064Point[];
      latestYear: number;
      latestPct: number;
      note: string;
    };
    inactivityLongTermIllness: {
      timeSeries: InactivityPoint[];
      latestYear: number;
      latestThousands: number;
      note: string;
    };
    employmentRate65plus: {
      timeSeries: EmploymentRate65PlusPoint[];
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

export default function Over50sEmploymentPage() {
  const [data, setData] = useState<OlderWorkersData | null>(null);

  useEffect(() => {
    fetch('/data/over-50s-employment/older_workers.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const employmentSeries: Series[] = data
    ? [
        {
          id: 'emp5064',
          label: 'Employment rate 50\u201364 (%)',
          colour: '#264653',
          data: data.national.employmentRate5064.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.employmentRatePct,
          })),
        },
        {
          id: 'emp65plus',
          label: 'Employment rate 65+ (%)',
          colour: '#2A9D8F',
          data: data.national.employmentRate65plus.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.employmentRatePct,
          })),
        },
      ]
    : [];

  const inactivitySeries: Series[] = data
    ? [{
        id: 'inactivity',
        label: 'Inactive 50\u201364 due to long-term illness (thousands)',
        colour: '#E63946',
        data: data.national.inactivityLongTermIllness.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.inactiveThousands,
        })),
      }]
    : [];

  const employmentAnnotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: Pandemic \u2014 early retirement spike' },
    { date: new Date(2022, 5, 1), label: '2022: Great Unretirement begins' },
  ];

  const inactivityAnnotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: Pandemic triggers long-COVID wave' },
    { date: new Date(2022, 5, 1), label: '2022: NHS waiting list backlog peaks' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Over-50s Employment" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Over-50s Employment"
          question="Why Are Millions of Older Workers Being Left Behind?"
          finding="3.5 million 50–64 year olds are economically inactive. The main reasons are long-term illness (rising 40% since 2019), early retirement, and caring responsibilities. The &lsquo;Great Unretirement&rsquo; has recovered only a fraction of those who left."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The pandemic triggered a wave of early exits from the labour market among those aged 50 and over — particularly those who had been planning to retire within the decade. Many chose to bring those plans forward when workplaces closed, caring responsibilities intensified, or redundancy packages became available. The so-called Great Unretirement — the partial reversal of this trend since 2022 as inflation eroded pension incomes — has recovered some ground, but the 50–64 employment rate in 2024 of 67.8% remains below its 2019 pre-pandemic peak of 69.8%.
            </p>
            <p>
              More structurally concerning is the rise in long-term illness as a driver of inactivity among this age group. NHS waiting list backlogs meant that conditions treatable in 2018 were not being treated until 2023 or 2024, if at all. Long-COVID added a new layer of chronic, debilitating illness disproportionately affecting working-age adults. The number of 50–64 year olds economically inactive due to long-term sickness rose from 680,000 in 2019 to a peak of 980,000 in 2023 before easing slightly to 950,000 in 2024. This is not simply &lsquo;people retiring early&rsquo;: it is people being pushed out of work by health conditions they cannot manage while working.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-employment', label: 'Employment Rates' },
          { id: 'sec-illness', label: 'Long-Term Illness' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Employment rate 50–64 age group"
              value="67.8%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Recovering from pandemic low of 65.8% · But long-term illness rising"
              sparklineData={[67.2, 67.8, 68.4, 69.1, 69.8, 68.2, 65.8, 66.4, 67.1, 67.8]}
              href="#sec-employment"
            />
            <MetricCard
              label="Inactive 50–64s citing long-term illness"
              value="950,000"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="+40% since 2019 · NHS waiting list backlog a key driver"
              sparklineData={[680, 720, 820, 940, 980, 950]}
              href="#sec-employment"
            />
            <MetricCard
              label="Employment rate 65+ age group"
              value="10.8%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Record high · Financial necessity and flexible working"
              sparklineData={[10.2, 10.5, 10.8, 11.0, 11.2, 9.8, 10.1, 10.4, 10.6, 10.8]}
              href="#sec-employment"
            />
          </div>
        </ScrollReveal>

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-employment" className="mb-12">
            <LineChart
              title="Employment rates for older age groups, UK, 2015–2024"
              subtitle="Percentage of 50\u201364 and 65+ age groups in employment. Both dipped sharply in 2020, with a partial recovery since. The 65+ rate has reached a record high driven partly by financial necessity."
              series={employmentSeries}
              annotations={employmentAnnotations}
              yLabel="Employment rate (%)"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-illness" className="mb-12">
            <LineChart
              title="People aged 50–64 inactive due to long-term illness, UK, 2019–2024"
              subtitle="Number economically inactive primarily due to long-term sickness or disability. Rose 40% from 680,000 in 2019 to a peak of 980,000 in 2023. NHS waiting lists and Long-Covid are key drivers."
              series={inactivitySeries}
              annotations={inactivityAnnotations}
              yLabel="Thousands"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="What's improving"
            value="Mid-life MOT reviews"
            unit=""
            description="Mid-life MOT career reviews have been rolled out via Jobcentres. The government's 50+ Employment Champions programme mentors employers on retaining older workers. DWP's WorkWell programme, piloting in 15 areas, combines employment support with health advice for those with long-term conditions. Some employers are pioneering &lsquo;returner&rsquo; programmes specifically for those who left the workforce during the pandemic. The state pension triple lock has provided income floor security for those approaching pension age."
            source="Source: ONS — Labour Force Survey 2024; DWP — WorkWell programme evaluation 2024."
          />
        </ScrollReveal>

        {/* Sources */}
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
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
