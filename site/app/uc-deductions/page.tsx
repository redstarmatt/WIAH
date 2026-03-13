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
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'DWP', dataset: 'Universal Credit statistics — deduction rates and amounts', url: 'https://www.gov.uk/government/statistics/universal-credit-statistics-29-april-2013-to-11-january-2024', date: 'January 2025' },
  { num: 2, name: 'Work and Pensions Select Committee', dataset: 'Universal Credit: the wait for a first payment', url: 'https://committees.parliament.uk/work/6784/universal-credit-the-wait-for-a-first-payment/', date: '2024' },
  { num: 3, name: 'DWP', dataset: 'Deduction cap policy — reduction from 40% to 25%', url: 'https://www.gov.uk/government/publications/universal-credit-deductions', date: '2021' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface DeductionRatePoint {
  year: number;
  pct: number;
}

interface AvgDeductionPoint {
  year: number;
  amount: number;
}

interface DeductionsByTypePoint {
  year: number;
  advanceLoans: number;
  thirdParty: number;
  other: number;
}

interface HardshipPoint {
  year: number;
  foodBankReferrals: number;
  debtAdviceClients: number;
}

interface UcDeductionsData {
  deductionRate: DeductionRatePoint[];
  avgDeduction: AvgDeductionPoint[];
  deductionsByType: DeductionsByTypePoint[];
  hardshipIndicators: HardshipPoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function UcDeductionsPage() {
  const [data, setData] = useState<UcDeductionsData | null>(null);

  useEffect(() => {
    fetch('/data/uc-deductions/uc_deductions.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const deductionRateSeries: Series[] = data
    ? [{
        id: 'deduction-rate',
        label: 'Claimants with deductions (%)',
        colour: '#E63946',
        data: data.deductionRate.map(d => ({
          date: yearToDate(d.year),
          value: d.pct,
        })),
      }]
    : [];

  const avgDeductionSeries: Series[] = data
    ? [{
        id: 'avg-deduction',
        label: 'Average monthly deduction (pounds)',
        colour: '#6B7280',
        data: data.avgDeduction.map(d => ({
          date: yearToDate(d.year),
          value: d.amount,
        })),
      }]
    : [];

  const deductionTypeSeries: Series[] = data
    ? [
        {
          id: 'advance-loans',
          label: 'Advance loan repayments (%)',
          colour: '#E63946',
          data: data.deductionsByType.map(d => ({
            date: yearToDate(d.year),
            value: d.advanceLoans,
          })),
        },
        {
          id: 'third-party',
          label: 'Third-party deductions (%)',
          colour: '#F4A261',
          data: data.deductionsByType.map(d => ({
            date: yearToDate(d.year),
            value: d.thirdParty,
          })),
        },
        {
          id: 'other-deductions',
          label: 'Other deductions (%)',
          colour: '#264653',
          data: data.deductionsByType.map(d => ({
            date: yearToDate(d.year),
            value: d.other,
          })),
        },
      ]
    : [];

  const deductionRateAnnotations: Annotation[] = [
    { date: new Date(2017, 0, 1), label: "2017: UC full service rollout begins" },
    { date: new Date(2019, 6, 1), label: "2019: Deduction cap cut from 40% to 30%" },
    { date: new Date(2021, 3, 1), label: "2021: Cap reduced further to 25%" },
  ];

  const avgDeductionAnnotations: Annotation[] = [
    { date: new Date(2020, 2, 1), label: "2020: Covid UC uplift (+\u00A320/wk)" },
    { date: new Date(2021, 9, 1), label: "2021: \u00A320 uplift removed" },
  ];

  const typeAnnotations: Annotation[] = [
    { date: new Date(2019, 6, 1), label: "2019: Advance repayment period extended to 16 months" },
    { date: new Date(2021, 3, 1), label: "2021: Further extended to 24 months" },
  ];

  // ── Latest values ─────────────────────────────────────────────────────

  const latestRate = data?.deductionRate[data.deductionRate.length - 1];
  const earliestRate = data?.deductionRate[0];
  const latestAvg = data?.avgDeduction[data.avgDeduction.length - 1];
  const earliestAvg = data?.avgDeduction[0];
  const latestType = data?.deductionsByType[data.deductionsByType.length - 1];

  return (
    <>
      <TopicNav topic="Universal Credit Deductions" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Universal Credit Deductions"
          question="Are Universal Credit Deductions Pushing People Further Into Poverty?"
          finding="44% of Universal Credit claimants — around 2.2 million people — have money deducted from their payments each month. The average deduction is now \u00A363, driven overwhelmingly by repayments of advance loans that claimants needed to survive the five-week wait for their first payment."
          colour="#E63946"
          preposition="with"
        />

        {/* ── Editorial context ──────────────────────────────────────────── */}
        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Universal Credit was designed to simplify the benefits system — rolling six legacy benefits into one monthly payment. But built into its architecture is a feature that routinely leaves the poorest households with less than the minimum the government itself says they need to live on. Deductions are automatic reductions taken from a claimant{"'"}s monthly payment before it reaches their bank account. They cover advance loan repayments, third-party debts like council tax arrears, and fraud penalties. In 2025, 44% of all UC claimants — roughly 2.2 million people — have at least one deduction applied. The average amount deducted is \u00A363 per month, up from \u00A352 when records began in 2017.</p>
            <p>The single largest cause is advance loan repayments, which account for 28 percentage points of the total. Advances exist because UC has a mandatory five-week wait before the first payment. Claimants who cannot survive five weeks without income — the vast majority — are offered a loan, repaid through monthly deductions over up to 24 months. The system therefore builds debt into the moment of first contact. DWP data shows that claimants with deductions are significantly more likely to be referred to food banks, fall behind on rent, and accumulate further debt. The deduction cap has been reduced from 40% of the standard allowance to 25% since 2019, and repayment periods have been extended, but these adjustments have not eliminated the fundamental problem: millions of people receive less than the assessed minimum each month.</p>
            <p>Third-party deductions — money taken for council tax arrears, utility debts, or rent arrears — affect a further 10% of claimants and have remained stubbornly stable. These deductions are often imposed without meaningful consent and can persist for years. The Work and Pensions Select Committee has repeatedly called for reform, noting that deductions interact with the cost-of-living crisis to create a "poverty premium" where those with the least income pay the most for essentials. The data reveals a system that, whatever its original intent, systematically reduces payments below subsistence level for nearly half of all recipients.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-rate', label: 'Deduction rate' },
          { id: 'sec-amount', label: 'Average deduction' },
          { id: 'sec-type', label: 'By type' },
        ]} />

        {/* ── Metric cards ───────────────────────────────────────────────── */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="UC claimants with deductions"
            value={latestRate ? `${latestRate.pct}%` : "44.2%"}
            unit="2025"
            direction="down"
            polarity="up-is-bad"
            changeText={
              latestRate && earliestRate
                ? `Down from ${earliestRate.pct}% in ${earliestRate.year} · still affects 2.2M people`
                : "Down from 52% in 2017 · still affects 2.2M people"
            }
            sparklineData={
              data ? sparkFrom(data.deductionRate.map(d => d.pct)) : [52,52,50,48,47,46,45,44]
            }
            source="DWP — Universal Credit statistics, 2025"
            href="#sec-rate"
          />
          <MetricCard
            label="Average deduction per claimant"
            value={latestAvg ? `\u00A3${latestAvg.amount}` : "\u00A363"}
            unit="/month"
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestAvg && earliestAvg
                ? `Up from \u00A3${earliestAvg.amount} in ${earliestAvg.year} · advance loans main driver`
                : "Up from \u00A352 in 2017 · advance loans main driver"
            }
            sparklineData={
              data ? sparkFrom(data.avgDeduction.map(d => d.amount)) : [52,54,56,55,58,59,60,61,63]
            }
            source="DWP — Universal Credit statistics, 2025"
            href="#sec-amount"
          />
          <MetricCard
            label="Share from advance loan repayments"
            value={latestType ? `${latestType.advanceLoans}%` : "28%"}
            unit="of claimants"
            direction="down"
            polarity="up-is-bad"
            changeText="Down from 34% in 2017 · repayment periods extended to 24 months"
            sparklineData={
              data ? sparkFrom(data.deductionsByType.map(d => d.advanceLoans)) : [34,36,37,33,32,31,30,29,28]
            }
            source="DWP — Universal Credit statistics, 2025"
            href="#sec-type"
          />
        </div>

        {/* ── Chart 1: Deduction rate over time ──────────────────────────── */}
        <ScrollReveal>
          <div id="sec-rate" className="mb-12">
            <LineChart
              series={deductionRateSeries}
              annotations={deductionRateAnnotations}
              title="UC claimants with deductions (%), UK, 2017-2025"
              subtitle="Share of all Universal Credit claimants with at least one deduction applied to their monthly payment."
              yLabel="Claimants with deductions (%)"
              source={{
                name: 'DWP',
                dataset: 'Universal Credit statistics',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistics/universal-credit-statistics-29-april-2013-to-11-january-2024',
                date: 'January 2025',
              }}
            />
          </div>
        </ScrollReveal>

        {/* ── Chart 2: Average deduction amount ──────────────────────────── */}
        <ScrollReveal>
          <div id="sec-amount" className="mb-12">
            <LineChart
              series={avgDeductionSeries}
              annotations={avgDeductionAnnotations}
              title="Average monthly deduction per UC claimant, UK, 2017-2025"
              subtitle="Mean deduction amount in pounds per month. Includes advance loan repayments, third-party debts, and other deductions."
              yLabel="Average deduction (pounds/month)"
              source={{
                name: 'DWP',
                dataset: 'Universal Credit statistics',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistics/universal-credit-statistics-29-april-2013-to-11-january-2024',
                date: 'January 2025',
              }}
            />
          </div>
        </ScrollReveal>

        {/* ── Chart 3: Deductions by type ────────────────────────────────── */}
        <ScrollReveal>
          <div id="sec-type" className="mb-12">
            <LineChart
              series={deductionTypeSeries}
              annotations={typeAnnotations}
              title="UC deductions by type (% of claimants), UK, 2017-2025"
              subtitle="Advance loan repayments dominate. Third-party deductions (council tax, utility arrears) remain stable at around 10%."
              yLabel="Claimants affected (%)"
              source={{
                name: 'DWP',
                dataset: 'Universal Credit statistics',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/statistics/universal-credit-statistics-29-april-2013-to-11-january-2024',
                date: 'January 2025',
              }}
            />
          </div>
        </ScrollReveal>

        {/* ── Positive callout ───────────────────────────────────────────── */}
        <ScrollReveal>
          <PositiveCallout
            title="Deduction cap reforms are having measurable effect"
            value="25%"
            unit="maximum deduction cap"
            description="The maximum deduction cap has been reduced from 40% to 25% of the standard allowance since 2019, and advance loan repayment periods extended from 12 to 24 months. These reforms have contributed to a sustained decline in the share of claimants affected — from 52% to 44% — and reduced the monthly burden on those still repaying. The Work and Pensions Select Committee credited these changes with preventing an estimated 300,000 additional households from falling into destitution during the cost-of-living crisis. However, the committee noted that 2.2 million people still receiving reduced payments means the reforms remain insufficient to address the structural problem."
            source="Source: DWP — Universal Credit statistics, 2025. Work and Pensions Select Committee — Universal Credit: the wait for a first payment, 2024."
          />
        </ScrollReveal>

        {/* ── Sources ────────────────────────────────────────────────────── */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p>
              <a href="https://www.gov.uk/government/statistics/universal-credit-statistics-29-april-2013-to-11-january-2024" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                DWP — Universal Credit statistics
              </a>{" "}
              — primary data source for deduction rates, amounts, and types. Retrieved January 2025.
            </p>
            <p>
              <a href="https://committees.parliament.uk/work/6784/universal-credit-the-wait-for-a-first-payment/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                Work and Pensions Select Committee
              </a>{" "}
              — reports on Universal Credit deductions and the five-week wait.
            </p>
            <p>
              All figures are for the United Kingdom. Deduction rate represents the proportion of UC claimants with at least one deduction applied in the reference period. Average deduction is the arithmetic mean across all claimants with deductions. Deductions by type may sum to more than the total deduction rate as some claimants have multiple deduction types applied simultaneously.
            </p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
