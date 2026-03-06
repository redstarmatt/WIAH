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

interface ChildPovertyData {
  national: {
    childPoverty: {
      timeSeries: Array<{ year: number; pctAfterHousingCosts: number }>;
      latestYear: number;
      latestMillions: number;
      latestPct: number;
    };
    inWorkPoverty: {
      timeSeries: Array<{ year: number; pctInWorkPoverty: number }>;
      latestYear: number;
      latestPct: number;
    };
    byRegion: Array<{ region: string; pctAfterHousingCosts: number }>;
  };
  metadata: {
    sources: Array<{ name: string; dataset: string; url: string; frequency: string }>;
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Component ────────────────────────────────────────────────────────────────

export default function ChildPovertyPage() {
  const [data, setData] = useState<ChildPovertyData | null>(null);

  useEffect(() => {
    fetch('/data/child-poverty/child_poverty.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const childPovertySeries: Series[] = data
    ? [{
        id: 'poverty',
        label: 'Child poverty rate (after housing costs)',
        colour: '#E63946',
        data: data.national.childPoverty.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.pctAfterHousingCosts,
        })),
      }]
    : [];

  const povertyAnnotations: Annotation[] = [
    { date: new Date(2013, 5, 1), label: '2013: Universal Credit introduced' },
  ];

  const inWorkPovertySeries: Series[] = data
    ? [{
        id: 'inwork',
        label: 'In-work child poverty rate',
        colour: '#F4A261',
        data: data.national.inWorkPoverty.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.pctInWorkPoverty,
        })),
      }]
    : [];

  return (
    <>
      <TopicNav topic="Child Poverty" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Child Poverty"
          question="How Many Children in Britain Are Growing Up in Poverty?"
          finding="4.3 million children in the UK live in poverty &mdash; 31% of all children, the highest rate since 1998. 3.2 million children live in relative poverty after housing costs. The two-child benefit limit affects 1.5 million children. Deprived areas of the North East have child poverty rates exceeding 45%."
          colour="#E63946"
          preposition="in"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Around 4.3 million children in the UK live in relative poverty &mdash; 31 percent of all children, the highest share since 1998. Poverty is not evenly distributed: rates exceed 45 percent in parts of inner London, Birmingham, and Bradford, while affluent commuter counties sit below 15 percent. The two-child limit on Universal Credit, introduced in 2017, directly affects 1.5 million children in larger families, capping support regardless of parental employment status. It is one of the most consequential pieces of welfare policy of the past decade, and remains largely unchanged.</p>
            <p>The composition of child poverty has shifted dramatically. In the 1990s, around 42 percent of poor children lived in working households; today that figure is 71 percent. In-work poverty has risen from 14 percent to 21 percent over two decades, driven by the growth of zero-hours contracts, stagnant real wages in care, retail, and logistics, and childcare costs that can consume more than a third of take-home pay. The two-child limit&apos;s &ldquo;rape clause&rdquo; &mdash; which requires some women to declare non-consensual conception to claim support for a third child &mdash; has been widely criticised by charities, lawyers, and parliamentary committees.</p>
            </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-poverty', label: 'Poverty Trend' },
          { id: 'sec-inwork', label: 'In-Work Poverty' },
          { id: 'sec-regions', label: 'By Region' },
        ]} />

        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Children living in poverty (after housing costs)"
              value="4.3M"
              direction="up"
              polarity="up-is-bad"
              changeText="2023 &middot; 31% of all children &middot; Highest since 1998 &middot; 3.2M in relative poverty"
              sparklineData={[3600, 3500, 3400, 3400, 3500, 3600, 3700, 3800, 3900, 4000, 4100, 4200, 4300]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Children in poverty in working households"
              value="3.1M"
              direction="up"
              polarity="up-is-bad"
              changeText="2023 &middot; 21% of children in working families &middot; In-work poverty rose from 14% in 2010 &middot; Low pay + high housing costs"
              sparklineData={[2000, 2100, 2100, 2200, 2300, 2500, 2700, 2800, 3100]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Children affected by two-child benefit cap"
              value="1.5M"
              direction="up"
              polarity="up-is-bad"
              changeText="2023 &middot; Introduced 2017 &middot; Limits child element of Universal Credit to 2 children &middot; Disproportionately affects larger families"
              sparklineData={[0, 100, 300, 500, 700, 900, 1100, 1300, 1500]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-poverty" className="mb-12">
            <LineChart
              title="Children in poverty (after housing costs), UK, 2000&ndash;2023"
              subtitle="Percentage of all children living in households with income below 60% of median household income, after deducting housing costs."
              series={childPovertySeries}
              yLabel="% of children in poverty"
              annotations={povertyAnnotations}
              source={{
                name: 'DWP',
                dataset: 'Households Below Average Income',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-inwork" className="mb-12">
            <LineChart
              title="Children in poverty in working households, UK, 2010&ndash;2023"
              subtitle="Percentage of children in poverty where at least one adult in the household is in paid work."
              series={inWorkPovertySeries}
              yLabel="% of children in poverty (working households)"
              source={{
                name: 'DWP',
                dataset: 'Households Below Average Income',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-regions" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-2">Child poverty rate by region (after housing costs), 2023</h2>
            <p className="text-sm text-wiah-mid font-mono mb-6">Percentage of children living in poverty by English region.</p>
            {data && (
              <div className="space-y-3">
                {data.national.byRegion.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-40 text-sm text-wiah-black flex-shrink-0">{item.region}</div>
                    <div className="flex-1 bg-wiah-border rounded h-5 overflow-hidden">
                      <div
                        className="h-full rounded"
                        style={{ width: `${(item.pctAfterHousingCosts / 38) * 100}%`, backgroundColor: '#E63946' }}
                      />
                    </div>
                    <div className="w-16 text-right text-sm font-mono text-wiah-black">{item.pctAfterHousingCosts}%</div>
                  </div>
                ))}
              </div>
            )}
            <p className="font-mono text-xs text-wiah-mid mt-4">Source: DWP &mdash; Households Below Average Income 2023</p>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What&apos;s improving"
            value="&pound;2.5bn"
            unit="commitment to extend free school meals and expand breakfast clubs across England"
            description="The government&apos;s Child Poverty Taskforce, established in July 2024, is developing a cross-departmental strategy targeting the 4.3 million children in poverty. Universal free school meals now reach all primary school children in Scotland and Wales; England provides them to all infant pupils (Years 1&ndash;2) and those on income-based benefits. Free childcare expansion &mdash; 15 hours rising to 30 hours for working parents of under-5s &mdash; took effect from April 2024. The Household Support Fund (&pound;842 million in 2023/24) provides emergency assistance through local authorities. Holiday Activities and Food programmes fed 600,000 children in summer 2023."
            source="Source: DWP &mdash; Households Below Average Income 2022/23; Child Poverty Action Group &mdash; Child Poverty Facts and Figures 2024."
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
