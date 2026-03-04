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
            <p>Some 4.3 million children in the United Kingdom live in poverty &mdash; 31% of all children, the highest rate since 1998. After deducting housing costs, 3.2 million fall below the relative poverty threshold of 60% of median household income. The geography is stark: the North East records a child poverty rate of 38%, and individual wards in Birmingham, Bradford and inner London boroughs exceed 50%. Coastal communities in Blackpool, Jaywick and parts of east Kent have seen the fastest rises since 2010. The two-child limit on the child element of Universal Credit, introduced in April 2017, now affects 1.5 million children whose families receive no additional support for a third or subsequent child.</p>
            <p>The composition of child poverty has transformed. In the 1990s, 42% of children in poverty lived in working households; by 2023 that figure had risen to 71%. In-work poverty among families with children climbed from 14% to 21% over the past decade, driven by a labour market of low-wage jobs, zero-hours contracts and childcare costs that consume a third of household income for many working parents. The two-child limit compounds the problem &mdash; each additional child beyond two generates no extra Child Tax Credit or Universal Credit child element, a policy that disproportionately affects larger families, single parents and ethnic minority households with above-average family sizes. A contested exemption for children conceived through rape requires mothers to provide evidence to the Department for Work and Pensions.</p>
            <p>The consequences register in children&apos;s bodies. Some 2.5 million children experience food insecurity; 2.1 million are eligible for free school meals. Food bank use by families with children rose 17% between 2022 and 2024. Scotland&apos;s Child Payment &mdash; &pound;25 per week per eligible child under 16, launched in 2021 &mdash; has demonstrated measurable impact on household food security and is now held up as a policy model. In England, the Child Poverty Taskforce established in July 2024 is developing a cross-departmental strategy, though several Labour MPs are pressing for the removal of the two-child limit at an estimated Treasury cost of &pound;1.4 billion per year. The evidence from universal free school meals pilots, childcare subsidies and direct cash transfers points in one direction: sustained income support reduces child poverty.</p>
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
