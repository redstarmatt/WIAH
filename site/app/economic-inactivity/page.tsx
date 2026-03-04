'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ──────────────────────────────────────────────────────────────────────

interface InactivityPoint {
  year: number;
  inactiveMillions: number;
}

interface LongTermSickPoint {
  year: number;
  sickMillions: number;
}

interface ReasonBreakdown {
  reason: string;
  pct: number;
}

interface EconomicInactivityData {
  national: {
    inactivity: {
      timeSeries: InactivityPoint[];
      latestYear: number;
      latestMillions: number;
      preCovidMillions: number;
      pctOfWorkingAge: number;
    };
    longTermSick: {
      timeSeries: LongTermSickPoint[];
      latestYear: number;
      latestMillions: number;
    };
    reasonsBreakdown: ReasonBreakdown[];
  };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function EconomicInactivityPage() {
  const [data, setData] = useState<EconomicInactivityData | null>(null);

  useEffect(() => {
    fetch('/data/economic-inactivity/economic_inactivity.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // 1. Total inactivity series
  const inactivitySeries: Series[] = data
    ? [{
        id: 'inactivity',
        label: 'Economically inactive (millions)',
        colour: '#F4A261',
        data: data.national.inactivity.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.inactiveMillions,
        })),
      }]
    : [];

  const inactivityAnnotations: Annotation[] = [
    { date: new Date(2020, 2, 1), label: '2020: COVID-19 pandemic' },
  ];

  // 2. Long-term sick series
  const sickSeries: Series[] = data
    ? [{
        id: 'longtermsick',
        label: 'Inactive due to long-term sickness (millions)',
        colour: '#E63946',
        data: data.national.longTermSick.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.sickMillions,
        })),
      }]
    : [];

  const latestInactivity = data?.national.inactivity;
  const latestSick = data?.national.longTermSick;

  return (
    <>
      <TopicNav topic="Economic Inactivity" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economic Inactivity"
          question="Why Are 2.8 Million More People Out of Work Since COVID?"
          finding={
            latestInactivity && latestSick
              ? `Economic inactivity &mdash; people of working age who are neither working nor seeking work &mdash; has risen by 800,000 since the pandemic to 9.4 million (22% of the working-age population). Long-term sickness is now the largest single reason, overtaking caring responsibilities. The UK is the only G7 country whose employment rate has not recovered to pre-COVID levels.`
              : 'Economic inactivity has risen by 800,000 since COVID to 9.4 million.'
          }
          colour="#F4A261"
          preposition="with"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              Economic inactivity among working-age adults (16&ndash;64) rose to 9.4 million by late 2023 &mdash; 22% of the working-age population and 800,000 above the pre-pandemic level. The UK is now the only G7 economy whose employment rate has not recovered to pre-COVID levels; the OBR estimates this inactivity gap represents a 2% shortfall in potential output. Before the pandemic, Britain had the lowest inactivity rate in the G7; it now lags behind the United States, Germany, Japan and France. The shift is structural, not cyclical: long-term sickness is the primary driver, with 2.8 million economically inactive due to illness in 2023, up from 2.0 million in 2019. Most of those who became inactive during COVID have not returned. Men aged 50&ndash;64 are the fastest-growing group, citing mental health disorders and musculoskeletal conditions most frequently.
            </p>
            <p>
              The Bank of England&apos;s Monetary Policy Committee and the OBR both identify the NHS waiting list &mdash; 7.5 million cases &mdash; as a significant driver of sustained inactivity: people unable to work while waiting months or years for treatment. Resolution Foundation modelling suggests eliminating the NHS backlog could return 170,000 people to employment. Mental health accounts for 38% of all long-term sickness inactivity; musculoskeletal conditions 35%; both have been exacerbated by COVID-19 sequelae and the broader decline in NHS primary care access. The UK has one of the lowest rates of occupational health provision among OECD nations &mdash; only 45% of workers have access to employer-funded occupational health. Meanwhile, 2.5 million people receive PIP or Disability Living Allowance, with the DWP processing 170,000 new claims per month.
            </p>
            <p>
              The OBR estimates that returning 200,000 additional people to work would add 0.3% to GDP and reduce welfare spending by &pound;1.9 billion annually. The Back to Work Plan (Autumn Statement 2023) committed &pound;2.5 billion over five years; the WorkWell programme, launched in 2024, pilots a single service co-ordinating NHS, DWP and employment support across 15 areas. Universal Support targets 100,000 economically inactive people with health conditions by 2025. An occupational health expansion roadmap was published in 2023, but the business case rests on tax incentives not yet legislated. A structural tension persists: the government seeks to increase employment while simultaneously reforming disability benefits &mdash; two objectives that risk working against each other if benefit reform is perceived as punitive rather than supportive.
            </p>
            <p>The aggregate figure of 9.4 million inactive working-age adults conceals sharp demographic and geographic fault lines. Women account for 60% of the economically inactive, with caring responsibilities&mdash;for children and for adult dependants&mdash;a major driver that labour market frameworks rarely quantify adequately. Among ethnic minority groups, ONS data consistently shows higher inactivity rates, particularly for Pakistani and Bangladeshi women, where rates exceed 50% in some age cohorts, reflecting a complex intersection of caring norms, qualification recognition barriers, and labour market discrimination. Geographic clustering is pronounced: Wales, the North East, and parts of Yorkshire and the East Midlands have inactivity rates 4&ndash;6 percentage points above the national average, a legacy of deindustrialisation that left communities without replacement employment suited to older male workers. The 50&ndash;64 cohort has driven the post-pandemic increase most sharply&mdash;many left the workforce during COVID-19 and have not returned, citing health and early retirement. Of the 2.5 million people claiming PIP or DLA, a substantial but unmeasured proportion are also counted as economically inactive, though the two datasets do not map onto each other cleanly. The disability employment gap&mdash;around 28 percentage points between disabled and non-disabled employment rates&mdash;has narrowed only marginally over a decade, suggesting structural rather than cyclical causes.</p>
            <p>The Labour Force Survey, the primary source for inactivity statistics, is a quarterly household survey with a sample of around 90,000 people&mdash;large nationally, but thin enough that sub-group estimates (by ethnicity, region, and condition type) carry wide confidence intervals and are revised significantly between releases. The ILO definition of economic inactivity excludes anyone who has looked for work in the past four weeks but is not available to start&mdash;meaning discouraged workers who have given up job-searching are classified as inactive, not unemployed, flattening the true measure of labour market distress. The category conflates fundamentally different situations: full-time students, unpaid carers, people with severe disabilities, early retirees, and discouraged workers are all counted identically. DWP administrative data on PIP and ESA claims, which is more comprehensive, does not integrate cleanly with ONS labour market classifications, making it difficult to isolate the health-related component of inactivity precisely. The LFS question on work-limiting health conditions is self-reported, varies with how the question is framed, and cannot distinguish between conditions that genuinely prevent work and those manageable with reasonable adjustments. No single dataset tracks individuals through health crisis, benefit claim, treatment, and labour market re-entry, leaving the effectiveness of back-to-work programmes difficult to measure rigorously at scale.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-inactivity', label: 'Inactivity Trend' },
          { id: 'sec-sickness', label: 'Long-term Sickness' },
          { id: 'sec-reasons', label: 'By Reason' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Economically inactive (working age)"
            value={latestInactivity ? latestInactivity.latestMillions.toFixed(1) : '—'}
            unit="million"
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestInactivity
                ? `2023 Q4 &middot; ${latestInactivity.pctOfWorkingAge}% of working-age adults &middot; Up 800k since COVID &middot; Only G7 country not recovered`
                : 'Loading…'
            }
            sparklineData={[8.6, 8.5, 8.4, 8.4, 8.4, 8.4, 8.7, 9.2, 9.4, 9.4]}
            source="ONS &mdash; Labour Force Survey"
            onExpand={() => {}}
          />
          <MetricCard
            label="Inactive due to long-term sickness"
            value={latestSick ? latestSick.latestMillions.toFixed(1) : '—'}
            unit="million"
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestSick
                ? `2023 &middot; Up from 2.0M pre-COVID &middot; Now largest reason for inactivity &middot; Musculoskeletal and mental health primary causes`
                : 'Loading…'
            }
            sparklineData={[2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.1, 2.2, 2.6, 2.8]}
            source="ONS &mdash; Labour Force Survey"
            onExpand={() => {}}
          />
          <MetricCard
            label="Working days lost to sickness absence"
            value="185"
            unit="million"
            direction="up"
            polarity="up-is-bad"
            changeText={
              `2022 &middot; Up 35% since 2019 &middot; NHS: 27 days/year per staff member &middot; Mental health and MSK top causes`
            }
            sparklineData={[141, 137, 131, 131, 131, 137, 170, 185, 185]}
            source="ONS &mdash; Sickness Absence Survey"
            onExpand={() => {}}
          />
        </div>
        </ScrollReveal>

        {/* Inactivity trend chart */}
        <ScrollReveal>
        <div id="sec-inactivity" className="mb-12">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-wiah-black mb-2">Total Inactivity Trend</h2>
            <p className="text-base text-wiah-mid leading-[1.7] max-w-2xl">
              Economic inactivity remained broadly stable at 8.4 million for five years until 2020,
              when the pandemic and lockdown triggered a sharp rise. Recovery has been slower than in other G7 nations.
            </p>
          </div>

          {inactivitySeries.length > 0 ? (
            <LineChart
              title="Working-age economic inactivity, UK, 2014–2023"
              subtitle="Millions of people aged 16–64 who are neither in work nor seeking work. The UK is the only G7 country not to have recovered to pre-pandemic levels."
              series={inactivitySeries}
              annotations={inactivityAnnotations}
              yLabel="Economically inactive (millions)"
              source={{
                name: 'ONS',
                dataset: 'Labour Force Survey',
                frequency: 'quarterly',
              }}
            />
          ) : (
            <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
          )}
        </div>
        </ScrollReveal>

        {/* Long-term sick chart */}
        <ScrollReveal>
        <div id="sec-sickness" className="mb-12">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-wiah-black mb-2">Long-term Sickness</h2>
            <p className="text-base text-wiah-mid leading-[1.7] max-w-2xl">
              The number of working-age people out of work due to long-term illness has nearly doubled
              since 2019, from 2.0 million to 2.8 million. This is now the single largest driver of economic inactivity.
            </p>
          </div>

          {sickSeries.length > 0 ? (
            <LineChart
              title="Economically inactive due to long-term sickness, UK, 2014–2023"
              subtitle="Number of working-age people out of work due to long-term illness &mdash; the largest single driver of the rise in inactivity since COVID."
              series={sickSeries}
              yLabel="People (millions)"
              source={{
                name: 'ONS',
                dataset: 'Labour Force Survey',
                frequency: 'quarterly',
              }}
            />
          ) : (
            <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
          )}
        </div>
        </ScrollReveal>

        {/* Reasons breakdown */}
        <ScrollReveal>
        <div id="sec-reasons" className="mb-12">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-wiah-black mb-2">Reasons for Inactivity</h2>
            <p className="text-base text-wiah-mid leading-[1.7] max-w-2xl">
              Working-age people are economically inactive for varied reasons. Long-term sickness is now the largest category,
              but caring responsibilities and full-time study remain significant.
            </p>
          </div>

          {data ? (
            <section className="mb-12">
              <h3 className="text-lg font-bold text-wiah-black mb-1">
                Economic inactivity by reason
              </h3>
              <p className="text-sm text-wiah-mid font-mono mb-4">
                Working-age people economically inactive by primary reason, UK 2023.
              </p>
              <div className="space-y-2">
                {data.national.reasonsBreakdown.map((item, i) => {
                  const maxPct = 30;
                  const pct = (item.pct / maxPct) * 100;
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <span className="w-40 text-right text-wiah-black text-sm truncate flex-shrink-0 font-mono">
                        {item.reason}
                      </span>
                      <div className="flex-1 bg-gray-100 rounded h-6 relative">
                        <div
                          className="bg-[#F4A261] h-6 rounded"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="font-mono text-wiah-black w-12 text-right flex-shrink-0">
                        {item.pct}%
                      </span>
                    </div>
                  );
                })}
              </div>
              <p className="font-mono text-[11px] text-wiah-mid mt-4">
                Source: ONS &mdash; Labour Force Survey, 2023 Q4.
              </p>
            </section>
          ) : (
            <div className="h-32 bg-wiah-light rounded animate-pulse mb-12" />
          )}
        </div>
        </ScrollReveal>

        {/* Positive story */}
        <ScrollReveal>
        <PositiveCallout
          title="Policy response"
          value="£2.5bn"
          unit="committed to the Back to Work Plan (2023)"
          description="The government&apos;s Back to Work Plan (Autumn Statement 2023) committed &pound;2.5 billion over five years, with the central measure being an extension of Intensive Personalised Employment Support for people with disabilities and health conditions. WorkWell, a pilot programme co-ordinating NHS and employment support, launched in 2024 across 15 areas. Universal Support, linking economically inactive people with tailored employment coaching and in-work health support, targets 100,000 people by 2025. Occupational Health reforms are intended to expand access to employer-funded workplace health assessments, which currently reach only 45% of workers. The OBR estimates getting 200,000 more people into work would add 0.3% to GDP."
          source="Source: ONS &mdash; Labour Force Survey Q4 2023; DWP &mdash; Inactivity Statistics 2024."
        />
        </ScrollReveal>

        {/* Sources */}
        <section className="border-t border-wiah-border pt-8 mt-12">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; methodology</h2>
          <ul className="space-y-2 font-mono text-xs text-wiah-mid">
            {data?.metadata.sources.map((src, i) => (
              <li key={i}>
                <a
                  href={src.url}
                  className="underline hover:text-wiah-blue"
                  target="_blank"
                  rel="noreferrer"
                >
                  {src.name} &mdash; {src.dataset} ({src.frequency})
                </a>
              </li>
            ))}
          </ul>
          {data && (
            <>
              <h3 className="text-base font-bold text-wiah-black mt-6 mb-2">Methodology</h3>
              <p className="font-mono text-xs text-wiah-mid leading-relaxed max-w-3xl mb-4">
                {data.metadata.methodology}
              </p>
              {data.metadata.knownIssues.length > 0 && (
                <>
                  <h3 className="text-base font-bold text-wiah-black mt-6 mb-2">Known issues</h3>
                  <ul className="font-mono text-xs text-wiah-mid leading-relaxed max-w-3xl space-y-1">
                    {data.metadata.knownIssues.map((issue, i) => (
                      <li key={i}>• {issue}</li>
                    ))}
                  </ul>
                </>
              )}
            </>
          )}
        </section>
      </main>
    </>
  );
}
