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

interface InWorkPovertyData {
  national: {
    timeSeries: Array<{ date: string; inWorkPovertyMillions: number; pctOfPoor: number }>;
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

export default function InWorkPovertyPage() {
  const [data, setData] = useState<InWorkPovertyData | null>(null);

  useEffect(() => {
    fetch('/data/in-work-poverty/in_work_poverty.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const povertySeries: Series[] = data
    ? [{
        id: 'in-work-poverty',
        label: 'People in working poverty (millions)',
        colour: '#E63946',
        data: data.national.timeSeries.map(d => ({
          date: yearToDate(d.date),
          value: d.inWorkPovertyMillions,
        })),
      }]
    : [];

  const pctSeries: Series[] = data
    ? [{
        id: 'pct-of-poor',
        label: 'Working households as % of all people in poverty',
        colour: '#F4A261',
        data: data.national.timeSeries.map(d => ({
          date: yearToDate(d.date),
          value: d.pctOfPoor,
        })),
      }]
    : [];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="In-Work Poverty" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="In-Work Poverty"
          question="How Can You Work Full-Time and Still Be Poor?"
          finding="8.1 million people live in working households below the poverty line &mdash; 60% of all people in poverty live in households where someone works, up from 45% in 1997."
          colour="#E63946"
          preposition="with"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>In-work poverty &mdash; the situation in which a household has at least one adult in paid employment but still has income below 60% of the contemporary median after housing costs &mdash; has become the dominant form of poverty in Britain. According to the DWP&apos;s Households Below Average Income (HBAI) dataset, approximately 8.1 million people were living in in-work poverty in 2022/23, representing 60% of everyone below the poverty line. This is a fundamental change from 1997, when working households represented approximately 45% of people in poverty, and from the 1980s when the majority of poverty was concentrated among workless households &mdash; the unemployed, long-term sick, and retired. The shift is not primarily the result of more people working: employment rates have been high by historical standards for most of the past two decades. Rather, it reflects structural changes in the labour market that have allowed high employment to coexist with low wages, insecure hours, and insufficient work. High housing costs, which absorb an increasing share of low-income households&apos; budgets, amplify the problem: poverty measured before housing costs is significantly lower than the after-housing-costs measure, reflecting the pressure that rent and mortgages place on working families with limited incomes.</p>
            <p>The mechanisms through which work fails to prevent poverty operate at multiple levels. At the individual level, many low-paid jobs do not provide sufficient hours to generate a living income: a worker earning &pound;11.44 per hour but working only 20 hours per week generates around &pound;11,900 per year before tax, well below the poverty line for a single person and far below what a family with children would need. Zero-hours and part-time contracts concentrated in retail, hospitality, and care mean that many workers cannot access sufficient hours regardless of their willingness to work more. At the household level, the combination of low wages across multiple earners can still fall below the poverty threshold, particularly in large families and in areas with high housing costs. The social security system was designed to top up household income through tax credits and later Universal Credit, but the adequacy of these transfers has been eroded by a decade of real-terms cuts: the two-child limit on child tax credit and the benefit cap have reduced entitlements for larger families, and the local housing allowance freeze until 2024 left housing benefit recipients unable to cover rents in most areas.</p>
            </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-poverty', label: 'Working Poverty' },
          { id: 'sec-share', label: 'Share of Poor' },
        ]} />

        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="People in working poverty"
              value="8.1M"
              direction="up"
              polarity="up-is-bad"
              changeText="2022/23 &middot; Up from 4.5M in 2005 &middot; 60% of all poverty is in-work"
              sparklineData={[4.5, 5.0, 5.6, 6.2, 6.7, 7.2, 7.8, 8.1]}
              href="#sec-poverty"
            />
            <MetricCard
              label="Working households in poverty"
              value="60%"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 45% in 1997 &middot; Majority of poverty is now in-work"
              sparklineData={[45, 47, 50, 53, 55, 57, 59, 60]}
              href="#sec-poverty"
            />
            <MetricCard
              label="Working single parents in poverty"
              value="42%"
              direction="up"
              polarity="up-is-bad"
              changeText="2022/23 &middot; Despite employment &middot; Childcare costs and low hours"
              sparklineData={[31, 33, 35, 36, 38, 39, 41, 42]}
              href="#sec-poverty"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-poverty" className="mb-12">
            <LineChart
              title="People in working poverty, UK, 2002&ndash;2023 (millions)"
              subtitle="People in households where at least one adult works but household income is below 60% of median, after housing costs (DWP HBAI)."
              series={povertySeries}
              yLabel="Millions"
              source={{
                name: 'DWP',
                dataset: 'Households Below Average Income (HBAI) &mdash; in-work poverty',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-share" className="mb-12">
            <LineChart
              title="Working households as share of all people in poverty, 2002&ndash;2023 (%)"
              subtitle="The majority of poverty is now in-work, up from 45% in the late 1990s. Work no longer guarantees escape from poverty."
              series={pctSeries}
              yLabel="%"
              source={{
                name: 'JRF &amp; DWP',
                dataset: 'UK Poverty Report &mdash; HBAI analysis',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What&apos;s changing"
            value="Universal Credit taper rate cut"
            unit="2021"
            description="The Universal Credit work allowance was raised and the taper rate cut from 63p to 55p in October 2021 &mdash; meaning that for every &pound;1 of earnings above the work allowance, claimants kept 45p instead of 37p. The OBR estimated this benefited approximately 1.9 million working families, increasing effective income by an average of &pound;1,000 per year. The change was the largest single improvement to work incentives in Universal Credit since its introduction. Combined with above-inflation National Living Wage increases, it represents meaningful progress, though in-work poverty rates remain well above early-2000s levels."
            source="Source: DWP &mdash; Households Below Average Income 2023; JRF &mdash; UK Poverty 2024; Resolution Foundation &mdash; Earnings Outlook 2024; OBR &mdash; Universal Credit taper rate assessment 2021."
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
