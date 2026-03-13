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

interface SavingsRatioPoint {
  year: number;
  rate: number;
}

interface NoSavingsPoint {
  year: number;
  pct: number;
}

interface MedianSavingsPoint {
  year: number;
  amount: number;
}

interface SavingsData {
  savingsRatio: SavingsRatioPoint[];
  noSavingsHouseholds: NoSavingsPoint[];
  medianSavingsBalance: MedianSavingsPoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function HouseholdSavingsRatePage() {
  const [data, setData] = useState<SavingsData | null>(null);

  useEffect(() => {
    fetch('/data/household-savings-rate/household_savings_rate.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const savingsRatioSeries: Series[] = data
    ? [{
        id: 'savings-ratio',
        label: 'Household savings ratio (%)',
        colour: '#F4A261',
        data: data.savingsRatio.map(d => ({
          date: yearToDate(d.year),
          value: d.rate,
        })),
      }]
    : [];

  const savingsRatioAnnotations: Annotation[] = [
    { date: new Date(2008, 6, 1), label: '2008: Financial crisis' },
    { date: new Date(2020, 2, 1), label: '2020: COVID lockdowns' },
    { date: new Date(2022, 0, 1), label: '2022: Cost-of-living crisis' },
  ];

  const noSavingsSeries: Series[] = data
    ? [{
        id: 'no-savings',
        label: 'Households with no savings (%)',
        colour: '#E63946',
        data: data.noSavingsHouseholds.map(d => ({
          date: yearToDate(d.year),
          value: d.pct,
        })),
      }]
    : [];

  const noSavingsAnnotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: Temporary dip during COVID' },
    { date: new Date(2022, 6, 1), label: '2022: Energy bills surge' },
  ];

  const medianBalanceSeries: Series[] = data
    ? [{
        id: 'median-balance',
        label: 'Median savings balance (£)',
        colour: '#264653',
        data: data.medianSavingsBalance.map(d => ({
          date: yearToDate(d.year),
          value: d.amount,
        })),
      }]
    : [];

  const medianBalanceAnnotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: COVID savings spike' },
    { date: new Date(2023, 0, 1), label: '2023: Real-terms drawdown' },
  ];

  // ── Derived metrics ───────────────────────────────────────────────────

  const latestRatio = data?.savingsRatio[data.savingsRatio.length - 1];
  const prePandemicRatio = data?.savingsRatio.find(d => d.year === 2019);
  const covidPeakRatio = data?.savingsRatio.find(d => d.year === 2020);

  const latestNoSavings = data?.noSavingsHouseholds[data.noSavingsHouseholds.length - 1];
  const prePandemicNoSavings = data?.noSavingsHouseholds.find(d => d.year === 2019);

  const latestBalance = data?.medianSavingsBalance[data.medianSavingsBalance.length - 1];
  const peakBalance = data?.medianSavingsBalance.reduce((a, b) => a.amount > b.amount ? a : b);

  return (
    <>
      <TopicNav topic="Household Savings Rate" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Household Savings Rate"
          question="How Much Are British Households Actually Saving?"
          finding="The UK household savings ratio has fallen to 8.4% as the COVID-era spike fully unwinds. Nearly a quarter of households have no savings at all, up from 20% before the pandemic. Median savings balances have dropped 33% in real terms since 2020, with lower-income households hit hardest by the cost-of-living crisis."
          colour="#F4A261"
          preposition="with"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK household savings ratio tells a story of two pandemics: one viral, one financial. When the first lockdown hit in March 2020, household spending collapsed overnight while incomes were largely protected by furlough payments. The result was an involuntary savings boom that pushed the ratio to 25.9% -- the highest level since records began. But that number was always misleading. The windfall was overwhelmingly concentrated among higher-income households who simply could not spend on holidays, restaurants, and commuting. For the bottom income quintile, the pandemic often meant drawing down what little savings they had.</p>
            <p>The unwinding has been relentless. As restrictions lifted, pent-up demand met rising prices. The energy price guarantee cushioned the worst of the 2022-23 shock, but household budgets were squeezed from every direction: mortgage rates tripling, food inflation running above 15%, council tax rising, and real wages falling for the longest sustained period since the Napoleonic Wars. By 2025, the savings ratio had fallen back to 8.4%, still above the pre-2008 norm of around 5% but firmly on a downward trajectory. The median household savings balance -- the amount a typical household actually has accessible in a bank account -- fell from a post-COVID peak of £6,100 to £4,100, a decline of 33% in just five years and back to levels last seen before the pandemic.</p>
            <p>The distributional picture is where the real damage lies. 24% of UK households now report having less than £100 in accessible savings, up from 20% in 2019. These are families one boiler breakdown, one car repair, one redundancy notice away from hardship. The FCA Financial Lives Survey consistently finds that savings resilience tracks income almost perfectly: among households earning below £20,000, more than half have no meaningful savings buffer. The aggregate savings ratio, which counts pension contributions and mortgage overpayments alongside current account balances, flatters to deceive. For millions of households, the question is not what percentage of income they are saving but whether they can cover an unexpected £300 bill without borrowing.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-ratio', label: 'Savings ratio' },
          { id: 'sec-no-savings', label: 'No savings' },
          { id: 'sec-balances', label: 'Balances' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Household savings ratio"
            value={latestRatio ? `${latestRatio.rate}%` : '8.4%'}
            unit="2025"
            direction="down"
            polarity="up-is-good"
            changeText={
              latestRatio && covidPeakRatio && prePandemicRatio
                ? `Down from ${covidPeakRatio.rate}% COVID peak · pre-pandemic: ${prePandemicRatio.rate}%`
                : 'Down from 25.9% COVID peak · pre-pandemic: 6.5%'
            }
            sparklineData={
              data ? sparkFrom(data.savingsRatio.map(d => d.rate)) : []
            }
            source="ONS — UK Economic Accounts, Q4 2025"
            href="#sec-ratio"
          />
          <MetricCard
            label="Households with no savings"
            value={latestNoSavings ? `${latestNoSavings.pct}%` : '24%'}
            unit="2025"
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestNoSavings && prePandemicNoSavings
                ? `Up from ${prePandemicNoSavings.pct}% in 2019 · cost-of-living driven`
                : 'Up from 20% in 2019 · cost-of-living driven'
            }
            sparklineData={
              data ? sparkFrom(data.noSavingsHouseholds.map(d => d.pct)) : []
            }
            source="FCA — Financial Lives Survey, 2025"
            href="#sec-no-savings"
          />
          <MetricCard
            label="Median savings balance"
            value={latestBalance ? `£${latestBalance.amount.toLocaleString()}` : '£4,100'}
            unit="2025"
            direction="down"
            polarity="up-is-good"
            changeText={
              latestBalance && peakBalance
                ? `Down ${Math.round(((peakBalance.amount - latestBalance.amount) / peakBalance.amount) * 100)}% from £${peakBalance.amount.toLocaleString()} peak in ${peakBalance.year}`
                : 'Down 33% from £6,100 peak in 2020'
            }
            sparklineData={
              data ? sparkFrom(data.medianSavingsBalance.map(d => d.amount)) : []
            }
            source="Bank of England — Household deposits, Q4 2025"
            href="#sec-balances"
          />
        </div>

        {/* Chart 1: Savings ratio */}
        <ScrollReveal>
          <div id="sec-ratio" className="mb-12">
            <LineChart
              series={savingsRatioSeries}
              annotations={savingsRatioAnnotations}
              title="UK household savings ratio, 2000–2025"
              subtitle="Percentage of disposable income saved. COVID spike now fully unwound."
              yLabel="Savings ratio (%)"
              source={{
                name: 'ONS',
                dataset: 'United Kingdom Economic Accounts',
                frequency: 'quarterly',
                url: 'https://www.ons.gov.uk/economy/grossdomesticproductgdp/datasets/unitedkingdomeconomicaccounts',
                date: 'Q4 2025',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Households with no savings */}
        <ScrollReveal>
          <div id="sec-no-savings" className="mb-12">
            <LineChart
              series={noSavingsSeries}
              annotations={noSavingsAnnotations}
              title="Households with no meaningful savings, 2010–2025"
              subtitle="Percentage of UK households with less than £100 in accessible savings."
              yLabel="Households (%)"
              source={{
                name: 'FCA',
                dataset: 'Financial Lives Survey',
                frequency: 'biennial',
                url: 'https://www.fca.org.uk/publications/research/financial-lives',
                date: '2025',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Median savings balance */}
        <ScrollReveal>
          <div id="sec-balances" className="mb-12">
            <LineChart
              series={medianBalanceSeries}
              annotations={medianBalanceAnnotations}
              title="Median household savings balance, 2010–2025"
              subtitle="Typical accessible savings per household, adjusted for inflation (CPIH). Post-COVID drawdown continues."
              yLabel="Savings (£)"
              source={{
                name: 'Bank of England',
                dataset: 'Household deposit statistics',
                frequency: 'monthly',
                url: 'https://www.bankofengland.co.uk/statistics/money-and-credit',
                date: 'Q4 2025',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Auto-enrolment quietly building long-term resilience"
            value="11.1 million"
            description="Since automatic enrolment into workplace pensions launched in 2012, 11.1 million additional workers have been enrolled into pension saving. Opt-out rates remain below 10%, far lower than policymakers initially expected. While these savings are locked until retirement and do not help with short-term resilience, they represent a structural shift in UK saving behaviour. The total value of auto-enrolled pension pots reached £134 billion by 2025. For younger workers in particular, this may be the most important savings policy of the last generation -- even if none of it shows up in the accessible savings figures above."
            source="Source: The Pensions Regulator — Automatic Enrolment Commentary and Analysis, 2025. DWP — Workplace Pension Participation and Saving Trends, 2025."
          />
        </ScrollReveal>

        <RelatedTopics />
      </main>
    </>
  );
}
