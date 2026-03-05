'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface SavingsDistributionPoint {
  year: number;
  percentWithLessThan100: number;
}

interface QuintileSavings {
  quintile: string;
  medianSavings: number;
}

interface SavingsRatePoint {
  year: number;
  householdSavingsRate: number;
}

interface SavingsCrisisData {
  savingsDistribution: SavingsDistributionPoint[];
  medianSavingsByQuintile: QuintileSavings[];
  savingsRateTimeSeries: SavingsRatePoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function SavingsCrisisPage() {
  const [data, setData] = useState<SavingsCrisisData | null>(null);

  useEffect(() => {
    fetch('/data/savings-crisis/savings_crisis.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const savingsRateSeries: Series[] = data
    ? [{
        id: 'savings-rate',
        label: 'Household savings rate (%)',
        colour: '#E63946',
        data: data.savingsRateTimeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.householdSavingsRate,
        })),
      }]
    : [];

  const latest = data?.savingsDistribution[data.savingsDistribution.length - 1];
  const latestRate = data?.savingsRateTimeSeries[data.savingsRateTimeSeries.length - 1];
  const bottomQuintile = data?.medianSavingsByQuintile[0];

  return (
    <>
      <TopicNav topic="Poverty & Cost of Living" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Savings Crisis"
          question="How financially resilient are British households?"
          finding="One in four UK adults has less than £100 in savings. The bottom fifth of earners has a median savings balance of just £170 — leaving millions one unexpected bill away from debt. Savings rates collapsed to record lows before COVID."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>One in four UK adults — approximately 13 million people — has less than £100 in savings. The figure has worsened each year since 2020, as the cost-of-living crisis eroded financial buffers that were already thin. For half of households in the lowest income quintile, total savings amount to less than £170 — an amount that would not cover a single month's rent in most parts of England, or a car repair, or a boiler replacement. These households are not making choices about risk; they are structurally unable to build any cushion against financial shocks.</p>
            <p>The household savings rate — the proportion of disposable income saved rather than spent — collapsed in the years before COVID. From around 9% in 2010, it fell to 4.2% in 2022, near the lowest level since records began. This was partly a product of real wage stagnation: when incomes don't grow but costs do, savings are the first thing to fall. It was also a product of rising consumer credit and the availability of easy debt. The COVID pandemic produced a temporary surge to 16.3% as spending was constrained and government support kept incomes stable — but this proved fleeting. By 2022, the rate had fallen back to 4.2% and, according to some measures, even lower in the worst months of the energy price spike.</p>
            <p>The distribution of savings is as important as the aggregate rate. While some households — predominantly older, property-owning, higher-income — have accumulated substantial financial buffers, a large minority have almost nothing. The median savings balance for the bottom 20% of earners is £170. Even the median for the second-lowest quintile — those earning between roughly £16,000 and £24,000 a year — is just £1,200. By contrast, the top quintile's median savings balance is £89,000. The UK's savings inequality closely tracks its income and wealth inequality — and both are extreme by European standards.</p>
            <p>Financial fragility has consequences that extend beyond individual households. When an unexpected expense — a car breakdown, a dental emergency, a period of unemployment — hits a household with no savings, the choices are sharply limited: consumer debt, reduction in food spending, reliance on family, or visiting a food bank. The Money and Pensions Service estimates that around 9 million people in the UK are "over-indebted" — spending more on debt repayments than they can sustain. Many of these households have no savings buffer against any further shock.</p>
            <p>The question of why savings rates in the UK are so low — and why the savings that exist are so unequally distributed — is contested. Some economists point to the culture of homeownership, which has historically been seen as the primary savings vehicle, crowding out other forms of financial saving. Others point to low and stagnant wages, high housing and childcare costs, and a pension system that has shifted from defined benefit to defined contribution, reducing the certainty of retirement income. The common thread is an economy that has made it hard for people in the bottom half of the income distribution to save, and then expressed surprise when they cannot.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-savings-rate', label: 'Savings rate' },
          { id: 'sec-distribution', label: 'By income group' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Adults with less than £100 in savings"
              value={latest ? latest.percentWithLessThan100.toString() : '25'}
              unit="%"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 22% in 2020 · cost-of-living crisis eroding buffers"
              sparklineData={[22, 20, 24, 25]}
              source="Money & Pensions Service · 2023"
              onExpand={() => {}}
            />
            <MetricCard
              label="Median savings: bottom quintile"
              value={bottomQuintile ? `£${bottomQuintile.medianSavings}` : '£170'}
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="Half of lowest earners have less than £170 saved"
              sparklineData={[250, 230, 210, 190, 180, 170]}
              source="ONS Wealth & Assets Survey · 2022"
              onExpand={() => {}}
            />
            <MetricCard
              label="Household savings rate (2022)"
              value={latestRate ? latestRate.householdSavingsRate.toString() : '5.9'}
              unit="%"
              direction="down"
              polarity="up-is-good"
              changeText="Near record low before recovering slightly · COVID peak 16.3%"
              sparklineData={[9.1, 8.3, 6.7, 4.8, 16.3, 7.0, 4.2, 5.9]}
              source="ONS · 2023"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        {/* Chart: savings rate over time */}
        <ScrollReveal>
          <div id="sec-savings-rate" className="mb-12">
            <LineChart
              series={savingsRateSeries}
              title="UK household savings rate, 2010–2023"
              subtitle="Savings as % of disposable income. Fell sharply before COVID. The 2020 surge reversed quickly."
              yLabel="Savings as % of disposable income"
              source={{
                name: 'ONS',
                dataset: 'Household sector accounts',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Distribution by quintile */}
        <ScrollReveal>
          <div id="sec-distribution" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-1">
                Median savings balance by income quintile
              </h2>
              <p className="text-sm text-wiah-mid mb-6">The top fifth has a median savings balance 524 times that of the bottom fifth.</p>
              <div className="mt-4 space-y-4">
                {data?.medianSavingsByQuintile.map((q) => {
                  const maxSavings = 89000;
                  const pct = (q.medianSavings / maxSavings) * 100;
                  const colour = q.medianSavings < 2000 ? '#E63946' : q.medianSavings < 10000 ? '#F4A261' : '#2A9D8F';
                  return (
                    <div key={q.quintile}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-wiah-black">{q.quintile}</span>
                        <span className="font-mono text-sm font-bold" style={{ color: colour }}>
                          £{q.medianSavings.toLocaleString()}
                        </span>
                      </div>
                      <div className="h-6 bg-wiah-light rounded-sm overflow-hidden">
                        <div
                          className="h-full rounded-sm transition-all"
                          style={{ width: `${Math.max(pct, 0.5)}%`, backgroundColor: colour }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="font-mono text-xs text-wiah-mid mt-4">Source: ONS Wealth & Assets Survey, Wave 7 · 2022</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Sources */}
        <ScrollReveal>
          <div className="border-t border-wiah-border pt-8 mt-8">
            <h2 className="text-base font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
            <ul className="space-y-2 font-mono text-xs text-wiah-mid">
              <li>
                <a href="https://maps.org.uk/en/research/research-projects/financial-wellbeing-survey" className="underline hover:text-wiah-black" target="_blank" rel="noopener noreferrer">
                  Money & Pensions Service Financial Wellbeing Survey
                </a>
                {' '}— proportion of adults with less than £100 in savings
              </li>
              <li>
                <a href="https://www.ons.gov.uk/peoplepopulationandcommunity/personalandhouseholdfinances/incomeandwealth/bulletins/wealthingreatbritainwave7/2018to2020" className="underline hover:text-wiah-black" target="_blank" rel="noopener noreferrer">
                  ONS Wealth & Assets Survey
                </a>
                {' '}— median savings balances by income quintile
              </li>
            </ul>
          </div>
        </ScrollReveal>
      </main>
    </>
  );
}
