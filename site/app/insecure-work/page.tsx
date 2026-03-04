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

interface InsecureWorkData {
  national: {
    zeroHoursContracts: {
      timeSeries: Array<{ year: number; workersThousands: number }>;
      latestYear: number;
      latestThousands: number;
      pctOfWorkforce: number;
    };
    insecureWorkTotal: {
      timeSeries: Array<{ year: number; insecureMillions: number }>;
      latestYear: number;
      latestMillions: number;
    };
    bySector: Array<{ sector: string; zeroHoursPct: number }>;
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

export default function InsecureWorkPage() {
  const [data, setData] = useState<InsecureWorkData | null>(null);

  useEffect(() => {
    fetch('/data/insecure-work/insecure_work.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const zeroHoursSeries: Series[] = data
    ? [{
        id: 'zeroHours',
        label: 'Workers on zero-hours (thousands)',
        colour: '#F4A261',
        data: data.national.zeroHoursContracts.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.workersThousands,
        })),
      }]
    : [];

  const zeroHoursAnnotations: Annotation[] = [
    { date: new Date(2014, 5, 1), label: 'Methodology change' },
    { date: new Date(2020, 5, 1), label: '2020: COVID-19' },
  ];

  const insecureWorkSeries: Series[] = data
    ? [{
        id: 'insecure',
        label: 'Insecure workers (millions)',
        colour: '#F4A261',
        data: data.national.insecureWorkTotal.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.insecureMillions,
        })),
      }]
    : [];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Insecure Work" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Insecure Work"
          question="How Many Workers Have No Guarantee of Regular Hours?"
          finding="Over 1 million workers are on zero-hours contracts in the UK. 4.4 million are in insecure work (zero-hours, temporary, or agency). The gig economy grew 400% between 2016 and 2023. Insecure workers earn on average 14% less per hour and are 3 times more likely to be in poverty."
          colour="#F4A261"
          preposition="in"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>More than 1 million workers &mdash; 3.1% of the UK workforce &mdash; are employed on zero-hours contracts, up from 250,000 in 2013. Count temporary, agency, and low-paid self-employed workers alongside them and the total in insecure employment reaches 4.4 million. The accommodation and food sector is most exposed, with 22% of workers holding no guaranteed hours. The pay penalty is substantial: insecure workers earn on average 14% less per hour than comparable employees on standard contracts and are three times more likely to fall below the poverty line &mdash; a structural disadvantage that compounds across a working lifetime.</p>
            <p>Zero-hours contracts proliferated in the 2010s as employers sought labour flexibility during and after the 2008 financial crisis. ONS methodology changes in 2014 may have revealed pre-existing usage rather than caused a step-change, but the underlying trend was real. The care sector became particularly dependent: 18% of health and social care workers are on zero-hours contracts, partly because local authority commissioning of short, variable care visits made predictable rotas impossible to guarantee. The gig economy &mdash; Uber, Deliveroo, Amazon Flex &mdash; added a further category of workers excluded from most statutory protections until the Supreme Court&apos;s landmark Uber ruling in February 2021, which established that gig workers must receive the minimum wage and holiday pay.</p>
            <p>The Employment Rights Bill, introduced in October 2024, is the most ambitious expansion of worker rights since the Employment Relations Act 1999. Workers on zero-hours contracts gain the right to request a guaranteed-hours contract after 12 weeks. Day-one protections cover unfair dismissal and statutory sick pay, removing the two-year qualifying period that had left millions of workers without recourse. &ldquo;Fire and rehire&rdquo; &mdash; deployed by P&amp;O Ferries in March 2022 to dismiss 800 seafarers without notice &mdash; becomes unlawful in most circumstances. The National Living Wage reached &pound;11.44 per hour in April 2024, the largest single-year increase in the policy&apos;s history, lifting an estimated 200,000 workers above the poverty threshold.</p>
            <p>Insecure work is not evenly distributed. Women account for 55% of zero-hours contract workers despite representing 48% of the workforce overall; young workers aged 16&ndash;24 are six times more likely to be on such contracts than those aged 35&ndash;49. Ethnic minority workers are disproportionately concentrated in the gig economy and agency work sectors, and disabled workers are twice as likely to be in low-paid insecure employment compared to non-disabled counterparts. Geographically, insecure work clusters in regional economies dependent on hospitality, logistics, and social care&mdash;the East Midlands, Yorkshire, and parts of the North West have the highest shares of zero-hours employment outside London. The gap between legal rights and practical enforcement compounds all of this. Employment tribunal claims reached a backlog of over 40,000 cases in 2024; average waiting times for a hearing exceed 18 months. Rights created by statute are of limited value to a worker on a variable-hours contract who fears losing future shifts by complaining. The courts have also produced contradictory signals: the Supreme Court&apos;s 2021 Uber ruling established worker status and minimum wage entitlement for ride-hailing drivers, but the Court of Appeal ruled in 2023 that Deliveroo riders remain self-employed contractors&mdash;a distinction that turns on contractual wording and the degree of substitution rights, leaving large swathes of the gig workforce in genuine legal uncertainty.</p>
            <p>The data on insecure work has significant structural gaps. The Labour Force Survey&apos;s zero-hours contract count is a point-in-time snapshot&mdash;it captures whether a worker is on such a contract at the survey date, but not the income volatility experienced across weeks and months, which is where the real hardship concentrates. &ldquo;Insecure employment&rdquo; is not an ONS category: it is an analytical construct assembled from several LFS variables, and different researchers applying different definitions produce counts ranging from 3.5 million to over 6 million. Bogus self-employment&mdash;where workers are classified as independent contractors to avoid employer National Insurance and statutory obligations, but in practice have no genuine autonomy&mdash;is almost entirely invisible in standard administrative data; HMRC estimates suggest it suppresses tax receipts by over &pound;1.5bn annually but the underlying worker count is unknown. Survey data captures formal contractual status, not lived experience: the psychological toll of income uncertainty&mdash;the inability to secure a mortgage, budget for childcare, or take sick leave without financial penalty&mdash;has been documented in academic literature but has no official statistical counterpart. What the headline figures show is the floor of the problem, not its ceiling.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-zerohours', label: 'Zero-Hours' },
          { id: 'sec-insecure', label: 'Insecure Work' },
          { id: 'sec-sectors', label: 'By Sector' },
        ]} />

        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Workers on zero-hours contracts"
              value="1.04M"
              direction="up"
              polarity="up-is-bad"
              changeText="2023 &middot; 3.1% of workforce &middot; Up from 250K in 2013 &middot; 22% of accommodation &amp; food sector"
              sparklineData={[250, 580, 747, 903, 883, 789, 974, 886, 920, 1022, 1040]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Workers in insecure employment (total)"
              value="4.4M"
              direction="up"
              polarity="up-is-bad"
              changeText="2023 &middot; Zero-hours, temp &amp; agency &middot; 14% hourly pay penalty &middot; 3x more likely to be in poverty"
              sparklineData={[3.8, 3.9, 4.0, 4.1, 3.7, 3.9, 4.2, 4.4]}
              onExpand={() => {}}
            />
            <MetricCard
              label="National Living Wage (April 2024)"
              value="&pound;11.44"
              direction="up"
              polarity="up-is-good"
              changeText="Per hour &middot; Largest ever increase &middot; Employment Rights Bill: day-one rights for all workers &middot; Fire-and-rehire restrictions"
              sparklineData={[6.70, 7.20, 7.50, 7.83, 8.21, 8.72, 8.91, 9.50, 10.42, 11.44]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-zerohours" className="mb-12">
            <LineChart
              title="Workers on zero-hours contracts, 2013&ndash;2023"
              subtitle="Thousands of workers on zero-hours contracts, UK, from Labour Force Survey."
              series={zeroHoursSeries}
              annotations={zeroHoursAnnotations}
              yLabel="Workers (thousands)"
              source={{
                name: 'ONS',
                dataset: 'Labour Force Survey — Zero-Hours Contracts',
                frequency: 'quarterly',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-insecure" className="mb-12">
            <LineChart
              title="Workers in insecure employment, 2016&ndash;2023"
              subtitle="Millions of workers in insecure employment (zero-hours, temporary, agency, low-paid self-employed)."
              series={insecureWorkSeries}
              yLabel="Insecure workers (millions)"
              source={{
                name: 'TUC',
                dataset: 'Insecure Work Analysis',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-sectors" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-2">Zero-hours contracts as share of employment, by sector, UK, 2023</h2>
            <p className="text-sm text-wiah-mid font-mono mb-6">Percentage of workforce on zero-hours contracts by sector.</p>
            {data && (
              <div className="space-y-3">
                {data.national.bySector.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-40 text-sm text-wiah-black flex-shrink-0">{item.sector}</div>
                    <div className="flex-1 bg-wiah-border rounded h-5 overflow-hidden">
                      <div
                        className="h-full rounded"
                        style={{ width: `${(item.zeroHoursPct / 22) * 100}%`, backgroundColor: '#F4A261' }}
                      />
                    </div>
                    <div className="w-16 text-right text-sm font-mono text-wiah-black">{item.zeroHoursPct}%</div>
                  </div>
                ))}
              </div>
            )}
            <p className="font-mono text-xs text-wiah-mid mt-4">Source: ONS &mdash; Labour Force Survey 2023</p>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What&apos;s improving"
            value="Day 1"
            unit="employment rights for all workers from the Employment Rights Bill 2024 &mdash; ending the 2-year qualifying period"
            description="The Employment Rights Bill, introduced in October 2024, is the most significant expansion of worker rights in 30 years. It grants day-one rights to statutory sick pay and protection from unfair dismissal, removing the 2-year qualifying period. Workers on zero-hours contracts gain the right to request guaranteed hours after 12 weeks. The &apos;fire and rehire&apos; tactic &mdash; used by P&amp;O Ferries in 2022 to dismiss 800 workers &mdash; will be severely restricted. The National Living Wage rose to &pound;11.44/hour in April 2024. The government&apos;s Fair Work Agency will consolidate enforcement of employment rights."
            source="Source: ONS &mdash; Zero-Hours Contracts 2023; TUC &mdash; Insecure Work Report 2024."
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
