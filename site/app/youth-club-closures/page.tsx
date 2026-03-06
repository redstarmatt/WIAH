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

interface ClosuresPoint {
  year: number;
  cumulativeClosures: number;
}

interface WorkersPoint {
  year: number;
  workersThousands: number;
}

interface SpendPoint {
  year: number;
  spendMillions: number;
}

interface YouthClubsData {
  national: {
    closures: {
      timeSeries: ClosuresPoint[];
      latestYear: number;
      latestCumulativeClosures: number;
      note: string;
    };
    youthWorkers: {
      timeSeries: WorkersPoint[];
      latestYear: number;
      latestThousands: number;
      note: string;
    };
    localAuthoritySpend: {
      timeSeries: SpendPoint[];
      latestYear: number;
      latestMillions: number;
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

export default function YouthClubClosuresPage() {
  const [data, setData] = useState<YouthClubsData | null>(null);

  useEffect(() => {
    fetch('/data/youth-club-closures/youth_clubs.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const closuresAndWorkersSeries: Series[] = data
    ? [
        {
          id: 'closures',
          label: 'Youth clubs closed (cumulative from 2010)',
          colour: '#F4A261',
          data: data.national.closures.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.cumulativeClosures,
          })),
        },
        {
          id: 'workers',
          label: 'Qualified youth workers (thousands)',
          colour: '#E63946',
          data: data.national.youthWorkers.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.workersThousands,
          })),
        },
      ]
    : [];

  const spendSeries: Series[] = data
    ? [{
        id: 'spend',
        label: 'Local authority youth service spend (£ millions)',
        colour: '#F4A261',
        data: data.national.localAuthoritySpend.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.spendMillions,
        })),
      }]
    : [];

  const closuresAnnotations: Annotation[] = [
    { date: new Date(2010, 5, 1), label: '2010: Austerity — youth service cuts begin' },
    { date: new Date(2015, 5, 1), label: '2015: Second round of council cuts accelerates closures' },
    { date: new Date(2021, 5, 1), label: '2021: National Youth Guarantee announced' },
  ];

  const spendAnnotations: Annotation[] = [
    { date: new Date(2010, 5, 1), label: '2010: £1.03bn peak — pre-austerity' },
    { date: new Date(2019, 5, 1), label: '2019: Spend stabilises — but half 2010 level in real terms' },
    { date: new Date(2024, 5, 1), label: '2024: £50M additional government funding' },
  ];

  // ── Sparkline helpers ────────────────────────────────────────────────────

  const closuresSparkline = data
    ? data.national.closures.timeSeries.map(d => d.cumulativeClosures)
    : [];
  const workersSparkline = data
    ? data.national.youthWorkers.timeSeries.map(d => d.workersThousands)
    : [];
  const spendSparkline = data
    ? data.national.localAuthoritySpend.timeSeries.map(d => d.spendMillions)
    : [];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Youth Club Closures" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Youth Club Closures"
          question="What Happens When Nowhere Is Open for Young People?"
          finding="4,500 youth clubs and services closed between 2010 and 2024 &mdash; more than half of all provision. Youth worker numbers fell 70%. Academics have found a direct correlation between youth service cuts and increases in youth violence in affected areas."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The dismantling of youth services since 2010 is one of the least visible but most consequential consequences of austerity. Local authority youth service spending fell from &pound;1.03 billion in 2010 to &pound;512 million in 2024 &mdash; a 50% cut in nominal terms, and a deeper cut of around 60% in real terms. The NYA estimates 4,500 youth clubs and services have closed over this period. Qualified youth worker numbers have fallen from 6,800 to 2,000 &mdash; a 70% reduction. What replaced them, in the main, was nothing.
            </p>
            <p>
              The consequences have been traced directly by researchers. A 2022 study in the <em>Journal of Public Economics</em> found that each &pound;1 million cut in youth services in a local authority was associated with a 1.4% increase in youth violence within three years. Youth knife crime has more than doubled since 2010 in England. Whether the relationship is causal is contested by some researchers, but the timing, geography and magnitude of the correlation is striking &mdash; the cuts were deepest in urban areas, and youth violence rises have been sharpest in those same places. The social return on investment from youth services &mdash; estimated at &pound;3.20 for every &pound;1 spent &mdash; means that even from a purely fiscal perspective, the cuts have likely cost more than they saved.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-closures', label: 'Closures & Workers' },
          { id: 'sec-spend', label: 'Spending' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Youth clubs closed since 2010"
              value="4,500"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText=">50% of all provision · Fastest in deprived urban areas"
              sparklineData={closuresSparkline}
              href="#sec-closures"
            />
            <MetricCard
              label="Qualified youth workers remaining"
              value="20,000"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="Down 70% from 68,000 in 2010 · Unqualified volunteers patching gaps"
              sparklineData={workersSparkline}
              href="#sec-closures"
            />
            <MetricCard
              label="Local authority youth service spend"
              value="£512M"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="Down 50% in real terms from 2010 · Statutory services protected, youth cut first"
              sparklineData={spendSparkline}
              href="#sec-closures"
            />
          </div>
        </ScrollReveal>

        {/* Chart 1: Closures and workers */}
        <ScrollReveal>
          <section id="sec-closures" className="mb-12">
            <LineChart
              title="Youth club closures (cumulative) and qualified youth workers, England, 2010&ndash;2024"
              subtitle="Cumulative youth clubs and services closed since 2010 (amber) and qualified youth workers remaining (red, thousands). Both indicators show a steady, unrelenting decline since austerity began. Closures slowed after 2021 as spending stabilised, but has not reversed."
              series={closuresAndWorkersSeries}
              annotations={closuresAnnotations}
              yLabel="Closures / Workers (000s)"
            />
          </section>
        </ScrollReveal>

        {/* Chart 2: Spend */}
        <ScrollReveal>
          <section id="sec-spend" className="mb-12">
            <LineChart
              title="Local authority youth service expenditure, England, 2010&ndash;2024"
              subtitle="Local authority net revenue expenditure on youth services, England (£ millions, nominal). Fell from &pound;1,030 million in 2010 to &pound;512 million in 2024 in nominal terms &mdash; a real-terms reduction of around 60% after inflation."
              series={spendSeries}
              annotations={spendAnnotations}
              yLabel="£ millions"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="What&apos;s improving"
            value="National Youth Guarantee"
            unit="Commitment to youth provision"
            description="The National Youth Guarantee (2021) commits to a youth club, volunteering opportunity, and work experience place for every young person in England. Funding increased by &pound;50 million in 2024, with a further &pound;100 million committed in the 2025 spending review. The Uniformed Youth Fund supports Scout, Guide, and Cadet groups in areas of highest deprivation. The National Citizen Service programme reaches 90,000 young people per year. However, these investments fall far short of the &pound;500 million annual real-terms gap compared with 2010 spending."
            source="Source: DCMS &mdash; National Youth Guarantee commitment 2021, updated 2024. MHCLG &mdash; Local authority revenue expenditure outturn."
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
