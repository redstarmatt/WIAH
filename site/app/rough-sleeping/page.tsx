'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// ── Types ────────────────────────────────────────────────────────────────────

interface RoughSleepingPoint {
  year: number;
  count: number;
}

interface HomelessnessPoint {
  year: number;
  householdsThousands: number;
}

interface CauseItem {
  cause: string;
  pct: number;
}

interface RoughSleepingData {
  national: {
    roughSleeping: {
      timeSeries: RoughSleepingPoint[];
      latestYear: number;
      latestCount: number;
      peak2017: number;
    };
    homelessnessDecisions: {
      timeSeries: HomelessnessPoint[];
      latestYear: number;
      latestThousands: number;
    };
    temporaryAccommodation: {
      latestHouseholds: number;
      latestChildren: number;
      annualCostMillionGBP: number;
    };
    causesByType: CauseItem[];
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

function sparkFrom(arr: number[], n = 12) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function RoughSleepingPage() {
  const [data, setData] = useState<RoughSleepingData | null>(null);

  useEffect(() => {
    fetch('/data/rough-sleeping/rough_sleeping.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  // 1. Rough sleeping trend
  const roughSleepingSeries: Series[] = data
    ? [{
        id: 'rough-sleeping',
        label: 'People sleeping rough (autumn count)',
        colour: '#E63946',
        data: data.national.roughSleeping.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.count,
        })),
      }]
    : [];

  const roughSleepingAnnotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: "Everyone In" scheme' },
  ];

  // 2. Homelessness decisions trend
  const homelessnessSeries: Series[] = data
    ? [{
        id: 'homelessness',
        label: 'Households owed a homelessness duty',
        colour: '#F4A261',
        data: data.national.homelessnessDecisions.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.householdsThousands,
        })),
      }]
    : [];

  return (
    <>
      <TopicNav topic="Rough Sleeping" />

      <main className="min-h-screen bg-white">
        <TopicHeader
          topic="Rough Sleeping"
          question="How Many People Are Sleeping Rough in Britain?"
          finding="3,898 people were counted sleeping rough in England on a single autumn night in 2023 — up 27% in a year. The real figure is estimated to be three to five times higher. Rough sleeping rose 120% between 2010 and 2017 and, despite a brief COVID-era fall, is rising again. Around 270,000 households are recognised as homeless by councils each year."
          colour="#E63946"
          preposition="with"
        />

        <section className="max-w-4xl mx-auto px-4 py-8">

          <section id="sec-context" className="max-w-2xl mt-4 mb-12">
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>The autumn 2023 rough sleeping snapshot recorded 3,898 people sleeping rough in England — a 27% increase in a single year and the highest figure since the pandemic interrupted the series. The &ldquo;Everyone In&rdquo; scheme of March 2020 housed approximately 14,600 people within six weeks, demonstrating that rough sleeping is a policy problem rather than an intractable social condition — a lesson that housing charities argue has not been built upon. Section 21 no-fault evictions, which account for around a quarter of homelessness presentations to local authorities, continued at scale until the Renters Rights Act passed in spring 2025. Beyond rough sleeping, around 109,000 households — including approximately 140,000 children — were in statutory temporary accommodation in late 2023, many in bed-and-breakfast hotels where families share a single room for months.</p>
              <p>The burden falls most heavily on people with the fewest options: those with mental illness, drug or alcohol dependency, histories in care, or recent release from prison. Hidden homelessness — sofa-surfing, overcrowded households, cars and tents — is several times larger than the visible rough sleeping count but not systematically measured. Temporary accommodation spending has consumed housing budgets that might otherwise fund prevention, and the children placed in B&amp;Bs experience disrupted schooling and instability whose long-term costs do not appear in any official homelessness statistic.</p>
            </div>
          </section>

          <SectionNav sections={[
            { id: 'sec-overview', label: 'Overview' },
            { id: 'sec-rough', label: 'Rough Sleeping' },
            { id: 'sec-homeless', label: 'Homelessness' },
            { id: 'sec-causes', label: 'Causes' },
          ]} />

          {/* Metric cards */}
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="People counted sleeping rough (single night)"
              value={data?.national.roughSleeping.latestCount.toLocaleString() || '—'}
              direction="up"
              polarity="up-is-bad"
              changeText="Autumn 2023 · Up 27% in a year · Up 120% since 2010 · Real figure est. 3–5x higher"
              sparklineData={
                data
                  ? sparkFrom(data.national.roughSleeping.timeSeries.map(d => d.count))
                  : []
              }
              source="MHCLG · Rough Sleeping Snapshot"
              href="#sec-rough"/>
            <MetricCard
              label="Households recognised as homeless (annual)"
              value={data?.national.homelessnessDecisions.latestThousands ? `${data.national.homelessnessDecisions.latestThousands}K` : '—'}
              direction="up"
              polarity="up-is-bad"
              changeText="2022/23 · Up from 203K in 2019/20 · Owed 'prevention duty' under Homelessness Reduction Act 2017 · Rising rents primary cause"
              sparklineData={
                data
                  ? sparkFrom(data.national.homelessnessDecisions.timeSeries.map(d => d.householdsThousands), 5)
                  : []
              }
              source="MHCLG · Statutory Homelessness Statistics"
              href="#sec-homeless"/>
            <MetricCard
              label="Households in temporary accommodation"
              value={data?.national.temporaryAccommodation.latestHouseholds ? `${(data.national.temporaryAccommodation.latestHouseholds / 1000).toFixed(0)}K` : '—'}
              direction="up"
              polarity="up-is-bad"
              changeText="March 2023 · Record high · 131K children in temp accommodation · Cost to councils: £1.74bn/year"
              sparklineData={[70, 72, 74, 76, 78, 79, 80, 82, 88, 95, 104]}
              source="MHCLG · Homelessness Statistics"
              href="#sec-causes"/>
          </div>
          

          {/* Chart 1: Rough sleeping trend */}
          <div id="sec-rough">
          {roughSleepingSeries.length > 0 ? (
            <LineChart
              title="People sleeping rough, England (autumn count), 2010–2023"
              subtitle="Single-night estimate by local authorities. Fell during COVID-19 'Everyone In' scheme; now rising again."
              series={roughSleepingSeries}
              annotations={roughSleepingAnnotations}
              yLabel="Rough sleepers counted"
              source={{
                name: 'MHCLG',
                dataset: 'Rough Sleeping Snapshot',
                frequency: 'annual',
              }}
            />
          ) : (
            <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
          )}
          </div>

          {/* Chart 2: Homelessness decisions */}
          <div id="sec-homeless">
          {homelessnessSeries.length > 0 ? (
            <LineChart
              title="Households recognised as homeless, 2019–2023"
              subtitle="Households owed a prevention or relief duty under the Homelessness Reduction Act 2017, England."
              series={homelessnessSeries}
              yLabel="Households (thousands)"
              source={{
                name: 'MHCLG',
                dataset: 'Statutory Homelessness Statistics',
                frequency: 'quarterly',
              }}
            />
          ) : (
            <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
          )}
          </div>

          {/* Primary causes bar chart */}
          <div id="sec-causes" className="mb-12">
            <h3 className="text-lg font-bold text-wiah-black mb-2">Primary causes of homelessness</h3>
            <p className="font-mono text-xs text-wiah-mid mb-6">Households owed a homelessness duty by primary cause, England 2022/23.</p>
            {data?.national.causesByType && data.national.causesByType.length > 0 ? (
              <div className="space-y-4">
                {data.national.causesByType.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="font-mono text-xs text-wiah-mid w-32">{item.cause}</span>
                    <div className="flex-1 bg-wiah-light rounded h-5 overflow-hidden">
                      <div
                        className="h-full bg-wiah-red flex items-center justify-end pr-2"
                        style={{ width: `${(item.pct / 25) * 100}%` }}
                      >
                        {item.pct >= 10 && (
                          <span className="font-mono text-xs text-white font-bold">{item.pct}%</span>
                        )}
                      </div>
                    </div>
                    {item.pct < 10 && (
                      <span className="font-mono text-xs text-wiah-mid">{item.pct}%</span>
                    )}
                  </div>
                ))}
              </div>
            ) : null}
            <p className="font-mono text-xs text-wiah-mid mt-6">Note: Homelessness caused by end of private tenancy increased by 8% year-on-year, driven primarily by rising rents. Family and relationship breakdown accounts for over a fifth of cases.</p>
          </div>

          {/* Editorial context */}
          <section className="mb-12 bg-wiah-light p-6 rounded">
            <h2 className="text-lg font-bold text-wiah-black mb-4">What's happening</h2>
            <div className="space-y-4 text-base leading-relaxed text-wiah-black">
              <p>Rough sleeping in England rose 120% between 2010 and 2017, from 1,768 to 4,751 people counted on a single autumn night. The COVID-19 &ldquo;Everyone In&rdquo; scheme briefly reversed the trend, housing most rough sleepers within days and driving the count down to 2,440 by 2021 — but the reprieve was short-lived. By 2023 the figure had climbed back to 3,898, a 27% surge in a single year. The official count is widely recognised as a severe underestimate: Crisis and academic researchers put the true number at three to five times higher. The primary drivers are structural — the end of private sector tenancies accounts for 25% of homelessness presentations, fuelled by rents rising far faster than housing benefit, which was frozen in cash terms from 2016 to 2020 and only partially unfrozen thereafter. The Vagrancy Act 1824, which criminalised rough sleeping, was repealed in 2022 but remains in effect pending replacement legislation.</p>
              <p>Behind the rough sleeping figures sits a homelessness system under extraordinary pressure. As of March 2023 a record 104,000 households — including 131,000 children — are living in temporary accommodation such as B&amp;Bs, hostels and emergency placements, up 49% from 70,000 in 2014. The annual cost to councils has soared to £1.74 billion from under £500 million in 2010. The Homelessness Reduction Act 2017 created a statutory &ldquo;prevention duty&rdquo; requiring councils to help anyone at risk of homelessness within 56 days, but 271,000 households were owed a duty in 2022/23 — 34% above pre-pandemic levels. &ldquo;No-fault&rdquo; Section 21 evictions accounted for a quarter of all homelessness presentations before their planned abolition under the Renters (Reform) Act 2024.</p>
              <p>Policy interventions have shown what works — and what is missing. The Rough Sleeping Initiative, funded at £300 million since 2018, provided outreach workers and rapid-access accommodation and is credited with halting the pre-2018 rise. Housing First, backed by randomised evidence from Finland and Canada showing 80%-plus housing retention for complex-needs individuals, has been piloted in Greater Manchester, Liverpool and the West Midlands with broadly positive but underfunded results. The &ldquo;Everyone In&rdquo; scheme demonstrated that rough sleeping can effectively be ended in days when political will and emergency resources are mobilised. The critical gap remains affordable housing supply: England builds roughly 220,000 homes a year against a government target of 300,000, and social housing stock has fallen by 1.5 million since 1980 owing to Right to Buy.</p>
            </div>
          </section>

          {/* Positive story */}
          <ScrollReveal>
          <PositiveCallout
            title="What helped"
            value="2,688"
            unit="people sleeping rough in 2020 — lowest since 2010, thanks to 'Everyone In'"
            description="The COVID-19 &lsquo;Everyone In' scheme, launched in March 2020, housed virtually every rough sleeper in England within weeks — achieving in days what a decade of policy had failed to do. The count fell from 4,266 to 2,440 by 2021. The success showed that rough sleeping can be ended when emergency political will and resources are applied. The Rough Sleeping Initiative, providing dedicated outreach workers and specialist housing, has been funded at £300 million since 2018 and is credited with preventing thousands of first-time rough sleeping episodes. Housing First pilots in Greater Manchester, Liverpool, and West Midlands are showing promising outcomes for people with complex needs."
            source="Source: MHCLG — Rough Sleeping Snapshot 2023; MHCLG — Statutory Homelessness Statistics 2022/23."
          />
          </ScrollReveal>

          {/* Sources */}
          <section className="border-t border-wiah-border pt-8">
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
                    {src.name} — {src.dataset} ({src.frequency})
                  </a>
                </li>
              ))}
            </ul>
            <p className="font-mono text-xs text-wiah-mid mt-4">
              {data?.metadata.methodology}
            </p>
            {data?.metadata.knownIssues && data.metadata.knownIssues.length > 0 && (
              <div className="mt-4">
                <p className="font-mono text-xs text-wiah-mid font-bold mb-1">Known issues:</p>
                <ul className="list-disc list-inside space-y-1 font-mono text-xs text-wiah-mid">
                  {data.metadata.knownIssues.map((issue, i) => (
                    <li key={i}>{issue}</li>
                  ))}
                </ul>
              </div>
            )}
            <p className="font-mono text-xs text-wiah-mid mt-4">
              Data updated automatically via GitHub Actions. Last pipeline run:{' '}
              {new Date().toISOString().slice(0, 10)}.
            </p>
          </section>
        </section>
              <RelatedTopics />
      </main>
    </>
  );
}
