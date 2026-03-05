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

interface InequalityData {
  national: {
    incomeGini: {
      timeSeries: Array<{ year: string; giniCoefficient: number }>;
      latestYear: string;
      latestGini: number;
    };
    incomeShares: {
      timeSeries: Array<{ year: string; top10Pct: number; bottom50Pct: number }>;
      latestYear: string;
      latestTop10Pct: number;
      latestBottom50Pct: number;
    };
    wealthDistribution: Array<{ decile: string; wealthSharePct: number }>;
    internationalComparison: Array<{ country: string; giniCoefficient: number }>;
  };
  metadata: {
    sources: Array<{ name: string; dataset: string; url: string; frequency: string }>;
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function fyToDate(fy: string): Date {
  const start = parseInt(fy.split('/')[0]);
  return new Date(start, 3, 1);
}

// ── Component ────────────────────────────────────────────────────────────────

export default function InequalityPage() {
  const [data, setData] = useState<InequalityData | null>(null);

  useEffect(() => {
    fetch('/data/inequality/inequality.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // Derive series for Gini and top 10% income share
  const giniAndShareSeries: Series[] = data
    ? [
        {
          id: 'gini',
          label: 'Gini coefficient',
          colour: '#264653',
          data: data.national.incomeGini.timeSeries.map(d => ({
            date: fyToDate(d.year),
            value: d.giniCoefficient,
          })),
        },
        {
          id: 'top10',
          label: 'Top 10% income share (%)',
          colour: '#E63946',
          data: data.national.incomeShares.timeSeries.map(d => ({
            date: fyToDate(d.year),
            value: d.top10Pct / 100,
          })),
        },
      ]
    : [];

  return (
    <>
      <TopicNav topic="Inequality" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Inequality"
          question="Is Britain Actually Getting More Unequal?"
          finding="The UK&apos;s Gini coefficient for income is 0.35 &mdash; above the OECD average of 0.32 and higher than Germany (0.29) and France (0.30). The richest 10% receive 29% of all income. Wealth inequality is far more extreme: the top 10% hold 43% of all wealth. Income inequality has been broadly stable since 2010 but wealth inequality is rising."
          colour="#264653"
          preposition="in"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK&apos;s income Gini coefficient stands at 0.35 in 2022/23 &mdash; above the OECD average of 0.32 and significantly higher than Germany (0.29), France (0.30), and Sweden (0.27), though below the United States (0.39). The top 10% of earners receive 29% of all income; the bottom 50% receive 23%. Wealth inequality is far more extreme: the wealth Gini stands at approximately 0.63, with the wealthiest 10% holding 43% of total household net wealth and the bottom 30% just 5%. Home ownership has fallen from 71% in 2003 to 63% in 2022, concentrating housing wealth among existing owners whose assets have appreciated sharply. The tax and benefit system is highly redistributive &mdash; reducing the market income Gini by 0.12 points &mdash; and the National Living Wage, raised to &pound;11.44 in April 2024, has narrowed earnings inequality at the bottom.</p>
            <p>Regional inequality in disposable incomes is among the highest in the OECD: median household income in London (&pound;42,000) is 36% above the North East (&pound;31,000) and 38% above Wales (&pound;30,500). Intergenerational wealth transmission compounds these divides: annual inheritance flows now exceed &pound;90 billion, overwhelmingly benefiting families already in the top half of the wealth distribution. Private school attendance &mdash; 6&ndash;7&percnt; of pupils &mdash; accounts for a disproportionate share of elite university places and senior professional roles. The gender wealth gap runs at roughly 35&percnt;, driven by pension disparities rooted in part-time work and caring responsibilities. Geographic concentration is stark: 14 of the 20 most deprived local authorities are in the North West or North East.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-income', label: 'Income Inequality' },
          { id: 'sec-wealth', label: 'Wealth Inequality' },
          { id: 'sec-international', label: 'International' },
        ]} />

        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Income Gini coefficient (UK)"
              value="0.35"
              direction="flat"
              polarity="up-is-bad"
              changeText="2022/23 &middot; OECD average: 0.32 &middot; Germany: 0.29, France: 0.30 &middot; USA: 0.39 &middot; Broadly stable since 2010"
              sparklineData={[0.36, 0.35, 0.34, 0.34, 0.34, 0.34, 0.35, 0.35, 0.36, 0.35, 0.34, 0.35, 0.35]}
              href="#sec-overview"/>
            <MetricCard
              label="Top 10% income share"
              value="29%"
              direction="flat"
              polarity="up-is-bad"
              changeText="2022/23 &middot; Bottom 50% receive 23% &middot; Ratio has been stable &middot; COVID temporarily compressed inequality in 2020/21"
              sparklineData={[30, 29, 29, 29, 30, 28, 29]}
              href="#sec-income"/>
            <MetricCard
              label="Wealth held by top 10%"
              value="43%"
              direction="up"
              polarity="up-is-bad"
              changeText="2020 &middot; Bottom 30% hold 5% &middot; Housing wealth main driver &middot; Wealth Gini: 0.63 (far more unequal than income)"
              sparklineData={[39, 40, 41, 42, 43]}
              href="#sec-wealth"/>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-income" className="mb-12">
            <LineChart
              title="UK income Gini coefficient and top 10% income share, 2010&ndash;2023"
              subtitle="Gini coefficient of 0 = perfect equality; 1 = complete inequality. Top 10% share shown at 1/100 scale."
              series={giniAndShareSeries}
              yLabel="Value"
              source={{
                name: 'ONS',
                dataset: 'Effects of Taxes and Benefits on UK Household Income',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-wealth" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-2">Wealth distribution by decile, UK 2020</h2>
            <p className="text-sm text-wiah-mid font-mono mb-6">Percentage of total household net wealth held by each wealth decile.</p>
            {data && (
              <div className="space-y-3">
                {data.national.wealthDistribution.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-32 text-sm text-wiah-black flex-shrink-0">{item.decile}</div>
                    <div className="flex-1 bg-wiah-border rounded h-5 overflow-hidden">
                      <div
                        className="h-full rounded"
                        style={{ width: `${(item.wealthSharePct / 43) * 100}%`, backgroundColor: '#264653' }}
                      />
                    </div>
                    <div className="w-16 text-right text-sm font-mono text-wiah-black">{item.wealthSharePct}%</div>
                  </div>
                ))}
              </div>
            )}
            <p className="font-mono text-xs text-wiah-mid mt-4">Source: ONS &mdash; Wealth and Assets Survey 2020</p>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-international" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-2">Income inequality: international comparison (Gini coefficient)</h2>
            <p className="text-sm text-wiah-mid font-mono mb-6">Post-tax, post-transfer income Gini coefficient. Higher = more unequal.</p>
            {data && (
              <div className="space-y-3">
                {data.national.internationalComparison.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-32 text-sm text-wiah-black flex-shrink-0">{item.country}</div>
                    <div className="flex-1 bg-wiah-border rounded h-5 overflow-hidden">
                      <div
                        className="h-full rounded"
                        style={{ width: `${(item.giniCoefficient / 0.40) * 100}%`, backgroundColor: '#264653' }}
                      />
                    </div>
                    <div className="w-16 text-right text-sm font-mono text-wiah-black">{item.giniCoefficient.toFixed(2)}</div>
                  </div>
                ))}
              </div>
            )}
            <p className="font-mono text-xs text-wiah-mid mt-4">Source: OECD &mdash; Income Distribution Database</p>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What&apos;s improving"
            value="&ndash;4pp"
            unit="fall in income inequality since 1990 peak &mdash; redistribution and benefits have contained further rises"
            description="The UK&apos;s income Gini reached 0.38 in the early 1990s, its post-war peak, driven by deregulation, trade union decline, and labour market polarisation. It has since fallen to 0.35. The tax and benefit system is highly redistributive: the UK reduces its market income Gini by 0.12 points through taxes and transfers, more than Germany (0.10) and comparable to Scandinavia. Universal Credit rolls in six working-age benefits; the Resolution Foundation estimates it has modestly reduced inequality at the bottom of the distribution. The National Living Wage, raised to &pound;11.44 in April 2024, has disproportionately benefited low-paid workers, narrowing earnings inequality."
            source="Source: ONS &mdash; Effects of Taxes and Benefits on UK Household Income 2022/23; Resolution Foundation &mdash; Inequality Dynamics 2024."
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
