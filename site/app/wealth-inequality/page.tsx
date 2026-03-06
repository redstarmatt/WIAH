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

interface WealthInequalityData {
  wealthShare: Array<{ year: number; top10pct: number; bottom50pct: number }>;
  byWealthType: Array<{ type: string; sharePct: number }>;
  byAgeGroup: Array<{ age: string; medianWealth: number }>;
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

export default function WealthInequalityPage() {
  const [data, setData] = useState<WealthInequalityData | null>(null);

  useEffect(() => {
    fetch('/data/wealth-inequality/wealth_inequality.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const wealthShareSeries: Series[] = data
    ? [
        {
          id: 'top10',
          label: 'Top 10% share',
          colour: '#E63946',
          data: data.wealthShare.map(d => ({
            date: yearToDate(d.year),
            value: d.top10pct,
          })),
        },
        {
          id: 'bottom50',
          label: 'Bottom 50% share',
          colour: '#2A9D8F',
          data: data.wealthShare.map(d => ({
            date: yearToDate(d.year),
            value: d.bottom50pct,
          })),
        },
      ]
    : [];

  return (
    <>
      <TopicNav topic="Wealth Inequality" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Wealth Inequality"
          question="Who owns Britain&apos;s wealth?"
          finding="The richest 10% of households own 43% of all UK wealth, while the bottom 50% own just 9% &mdash; a gap that has widened since 2006 and is driven primarily by property and pension inequality."
          colour="#264653"
          preposition="in"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The ONS Wealth and Assets Survey (2020&ndash;22) found that the richest 10% of households hold 43% of all household wealth in the UK, while the bottom 50% share just 9%. This is not a story about income inequality, which has been broadly stable since the mid-1990s. It is a story about the accumulation of assets &mdash; above all, property and pensions. Homeowners have seen values double or treble in many parts of England since 2000; private renters, who now account for around a fifth of households, accumulate nothing from that appreciation. Those in defined-benefit pension schemes &mdash; concentrated in public sector employment &mdash; hold substantial accrued wealth that is invisible in take-home pay comparisons.</p>
            <p>The age dimension is stark. Median household wealth for the under-25s stands at around &pound;12,000; for those aged 65&ndash;74, it reaches &pound;462,000. Much of this reflects a natural lifecycle &mdash; people accumulate assets over time &mdash; but the gap between older and younger cohorts has grown significantly. Today&apos;s 30&ndash;35-year-olds hold considerably less wealth than people of the same age did 20 years ago, primarily because homeownership rates among that group have fallen sharply. A generation that bought in the 1990s has benefited from three decades of house price growth. One that could not get onto the ladder has not.</p>
            <p>The UK tax system taxes wealth far more lightly than income. Capital gains tax rates of 18&ndash;28% sit below the 20&ndash;45% income tax band for equivalent sums. Inheritance tax is nominally 40% above the &pound;325,000 threshold, but a range of reliefs &mdash; business property relief, agricultural land exemptions, AIM share portfolios, and trusts &mdash; mean the effective rate is much lower. IHT raises around &pound;8bn per year: a fraction of what its headline rate implies. The debate about whether wealth should be taxed more heavily has returned to the policy mainstream, but successive governments have expanded rather than narrowed the exemptions available.</p>
            <p>Housing is the engine of wealth inequality in a way that no other asset class matches, because it combines leverage, tax privilege, and inter-generational transfer at scale. A household that bought a median London property in 2000 for around &pound;150,000 with a deposit of &pound;30,000 held a leveraged asset that reached &pound;520,000 by 2023 &mdash; a nominal gain of &pound;370,000 on a &pound;30,000 outlay. A private renter over the same period accumulated nothing from housing and paid, in aggregate, substantially more in rent than mortgage repayments on an equivalent property would have cost. The Resolution Foundation estimates that homeowners will inherit, on average, around &pound;150,000 more than non-owners, compounding the original ownership gap across generations. Inter-generational wealth transfer now exceeds &pound;100 billion per year in England and Wales, and the Institute for Fiscal Studies projects that inheritance will become more important than lifetime earnings as a determinant of lifetime wealth for cohorts born after 1980. The Bank of Mum and Dad is already the effective tenth-largest mortgage lender by volume. Regional variation amplifies all of this: median household wealth in London and the South East is roughly double that in the North East, Yorkshire, and Wales, almost entirely because house price appreciation has been concentrated in the south. A homeowner in Guildford and a renter in Grimsby of identical income have followed radically different wealth trajectories over the past two decades through no difference in effort or earnings capacity.</p>
            <p>Wealth data in the UK is measurably incomplete at the top and unreliable in the middle. The ONS Wealth and Assets Survey excludes the super-wealthy almost by design: the sample size is insufficient to capture households with net worth above roughly &pound;5 million, who hold a disproportionate share of total assets through trusts, offshore structures, and complex corporate arrangements that do not appear on self-reported surveys. HMRC estimates suggest that around 40,000 trusts collectively hold assets of &pound;1 trillion, the majority of which is effectively invisible to household wealth surveys. Non-domicile status &mdash; still available in modified form after the 2024 reforms &mdash; means a significant stock of wealth held by UK residents is entirely outside the statistical perimeter. Self-reporting bias compounds the problem at every wealth level: people systematically underestimate property values, forget financial accounts, and struggle to value defined-benefit pension entitlements (which the WAS attempts to impute from projected income streams, a methodologically contested exercise). The gap between the WAS estimate of total household wealth and the figure implied by national accounts is substantial and unresolved. Inheritance tax records provide a partial check on top-end wealth but cover only estates at death, miss assets transferred during lifetime, and are subject to the same valuations that claimants supply. The practical consequence is that any policy analysis based on these data &mdash; including distributional assessments of tax changes &mdash; rests on foundations that are more uncertain than official publications typically acknowledge.</p>
            <p>Intergenerational wealth transmission is the dominant driver of persistent inequality. Around &pound;5.5 trillion in housing equity sits with over-65s, and annual inheritance flows now exceed &pound;90 billion &mdash; overwhelmingly benefiting families already in the top half of the wealth distribution. Private school attendance, at 6&ndash;7% of pupils, accounts for a disproportionate share of elite university places and senior professional roles. The gender wealth gap runs at roughly 35%, driven by pension disparities rooted in part-time work and caring responsibilities. Geographic concentration is stark: 14 of the 20 most deprived local authorities are in the North West or North East. Universal Credit simplified the benefits system but its five-week wait and two-child limit have deepened hardship for the poorest families. Consumption inequality is notably lower than income inequality, partly because poorer households spend a higher share on essentials whose prices rose fastest during the 2022&ndash;23 inflation spike.</p>
            <p>The Gini coefficient, while widely cited, compresses an entire income distribution into a single number and is particularly poor at capturing extremes &mdash; it understates both deep poverty and extreme wealth. The ONS Wealth and Assets Survey is conducted biennially with a two-year publication lag, meaning the latest data typically reflects conditions three to four years earlier. Household-level measures obscure intra-household inequality, particularly disadvantaging women in single-earner couples. The very wealthy systematically avoid survey participation, and HMRC&apos;s Survey of Personal Incomes is known to undercount top incomes by 15&ndash;20% compared with tax return data. ONS has revised its equivalisation methodology and income definitions multiple times since 2002, creating breaks in the time series that make long-run comparisons unreliable without careful adjustment. Consumption-based measures often tell a materially different story from income-based ones.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-wealth-share', label: 'Wealth Share' },
          { id: 'sec-by-age', label: 'By Age Group' },
          { id: 'sec-by-type', label: 'By Wealth Type' },
        ]} />

        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Wealth share of top 10%"
              value="43%"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 38% in 2006/08"
              sparklineData={[38, 39, 40, 41, 42, 42, 43, 43, 43]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Median household total wealth"
              value="£302.5K"
              direction="flat"
              polarity="up-is-good"
              changeText="But bottom 10% have zero or negative wealth"
              sparklineData={[280, 290, 295, 300, 305, 310, 312, 310, 302.5]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Under-35s with no savings"
              value="32%"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 22% in 2015"
              sparklineData={[22, 24, 25, 27, 28, 30, 31, 32, 32]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-wealth-share" className="mb-12">
            <LineChart
              title="Share of total household wealth, UK"
              subtitle="Percentage of all household wealth owned by top 10% and bottom 50% of households. ONS Wealth &amp; Assets Survey."
              series={wealthShareSeries}
              yLabel="Share of total wealth (%)"
              source={{
                name: 'Office for National Statistics',
                dataset: 'Wealth and Assets Survey',
                frequency: 'biennial',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-by-age" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-2">Median household wealth by age group</h2>
            <p className="text-sm text-wiah-mid font-mono mb-6">Net wealth including property, pensions, financial assets and possessions (£).</p>
            {data && (
              <div className="space-y-3">
                {data.byAgeGroup.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-20 text-sm text-wiah-black flex-shrink-0">{item.age}</div>
                    <div className="flex-1 bg-wiah-border rounded h-5 overflow-hidden">
                      <div
                        className="h-full rounded"
                        style={{ width: `${(item.medianWealth / 470000) * 100}%`, backgroundColor: '#264653' }}
                      />
                    </div>
                    <div className="w-32 text-right text-sm font-mono text-wiah-black">
                      &pound;{Math.round(item.medianWealth / 1000)}K
                    </div>
                  </div>
                ))}
              </div>
            )}
            <p className="font-mono text-xs text-wiah-mid mt-4">Source: ONS &mdash; Wealth and Assets Survey 2021</p>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-by-type" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-2">Composition of total household wealth</h2>
            <p className="text-sm text-wiah-mid font-mono mb-6">Percentage breakdown of UK household wealth by asset type.</p>
            {data && (
              <div className="space-y-3">
                {data.byWealthType.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-40 text-sm text-wiah-black flex-shrink-0">{item.type}</div>
                    <div className="flex-1 bg-wiah-border rounded h-5 overflow-hidden">
                      <div
                        className="h-full rounded"
                        style={{ width: `${(item.sharePct / 45) * 100}%`, backgroundColor: '#264653' }}
                      />
                    </div>
                    <div className="w-12 text-right text-sm font-mono text-wiah-black">{item.sharePct}%</div>
                  </div>
                ))}
              </div>
            )}
            <p className="font-mono text-xs text-wiah-mid mt-4">Source: ONS &mdash; Wealth and Assets Survey 2021</p>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Pension auto-enrolment transformed saving"
            value="10M"
            unit="workers enrolled"
            description="The introduction of auto-enrolment for workplace pensions in 2012 has enrolled over 10 million previously unsaved workers. Private sector pension participation rose from 42% to 85% of eligible employees. It is the most successful wealth-building intervention of the last 30 years &mdash; though contribution rates remain too low for most to achieve comfortable retirement incomes."
            source="Source: Pensions Regulator"
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
