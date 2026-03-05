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
            <p>One in four UK adults &mdash; approximately 13 million people &mdash; has less than &pound;100 in savings, a share that has worsened every year since 2020 as the cost-of-living crisis eroded already-thin buffers. The household savings rate fell from around 9% in 2010 to 4.2% in 2022, near the lowest level since records began, driven by real wage stagnation and rising housing and childcare costs. A COVID surge to 16.3% proved fleeting; by late 2022 the rate had collapsed again. The median savings balance for the bottom quintile of earners is &pound;170 &mdash; not enough to cover a month&apos;s rent, a car repair, or a boiler replacement. The top quintile&apos;s median is &pound;89,000: savings inequality in the UK closely tracks income and wealth inequality, both extreme by European standards.</p>
            <p>The consequences extend beyond individual hardship. The Money and Pensions Service estimates around 9 million people are over-indebted, spending more on debt repayments than they can sustain. When an unexpected cost hits a household with no savings, the options narrow rapidly to consumer debt, reduced food spending, or food banks &mdash; and none of those options leave people better placed for the next shock. Younger households, renters, and those in low-wage work bear the heaviest burden: they cannot access the homeownership wealth accumulation route that has historically served as the UK&apos;s primary savings vehicle for the middle class.</p>
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
              href="#sec-overview"/>
            <MetricCard
              label="Median savings: bottom quintile"
              value={bottomQuintile ? `£${bottomQuintile.medianSavings}` : '£170'}
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="Half of lowest earners have less than £170 saved"
              sparklineData={[250, 230, 210, 190, 180, 170]}
              source="ONS Wealth & Assets Survey · 2022"
              href="#sec-savings-rate"/>
            <MetricCard
              label="Household savings rate (2022)"
              value={latestRate ? latestRate.householdSavingsRate.toString() : '5.9'}
              unit="%"
              direction="down"
              polarity="up-is-good"
              changeText="Near record low before recovering slightly · COVID peak 16.3%"
              sparklineData={[9.1, 8.3, 6.7, 4.8, 16.3, 7.0, 4.2, 5.9]}
              source="ONS · 2023"
              href="#sec-distribution"/>
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
