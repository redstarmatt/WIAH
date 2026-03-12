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

interface DebtPoint {
  year: number;
  debt: number;
}

interface WriteOffPoint {
  year: number;
  pct: number;
}

interface OutstandingPoint {
  year: number;
  billionGBP: number;
}

interface RepaymentPoint {
  year: number;
  medianYearsToRepay: number;
}

interface InterestRatePoint {
  year: number;
  rate: number;
}

interface StudentLoanData {
  averageDebt: DebtPoint[];
  writeOffRate: WriteOffPoint[];
  totalOutstanding: OutstandingPoint[];
  repaymentTimeline: RepaymentPoint[];
  interestRateHistory: InterestRatePoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function StudentLoanEconomicsPage() {
  const [data, setData] = useState<StudentLoanData | null>(null);

  useEffect(() => {
    fetch('/data/student-loan-economics/student_loan_economics.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const debtSeries: Series[] = data
    ? [
        {
          id: 'avg-debt',
          label: 'Average graduate debt on completion',
          colour: '#F4A261',
          data: data.averageDebt.map(d => ({
            date: yearToDate(d.year),
            value: d.debt,
          })),
        },
      ]
    : [];

  const outstandingSeries: Series[] = data
    ? [
        {
          id: 'total-outstanding',
          label: 'Total outstanding student debt',
          colour: '#E63946',
          data: data.totalOutstanding.map(d => ({
            date: yearToDate(d.year),
            value: d.billionGBP,
          })),
        },
      ]
    : [];

  const interestSeries: Series[] = data
    ? [
        {
          id: 'interest-rate',
          label: 'Maximum interest rate (Plan 2)',
          colour: '#264653',
          data: data.interestRateHistory.map(d => ({
            date: yearToDate(d.year),
            value: d.rate,
          })),
        },
        {
          id: 'write-off',
          label: 'Expected write-off rate (%)',
          colour: '#6B7280',
          data: data.writeOffRate.map(d => ({
            date: yearToDate(d.year),
            value: d.pct,
          })),
        },
      ]
    : [];

  // ── Derived metric values ─────────────────────────────────────────────

  const latestDebt = data?.averageDebt[data.averageDebt.length - 1];
  const firstDebt = data?.averageDebt[0];
  const latestOutstanding = data?.totalOutstanding[data.totalOutstanding.length - 1];
  const firstOutstanding = data?.totalOutstanding[0];
  const latestWriteOff = data?.writeOffRate[data.writeOffRate.length - 1];
  const firstWriteOff = data?.writeOffRate[0];

  // ── Annotations ───────────────────────────────────────────────────────

  const debtAnnotations: Annotation[] = [
    { date: new Date(2012, 0, 1), label: "2012: Fees trebled to \u00A39,000" },
    { date: new Date(2023, 0, 1), label: "2023: Plan 5 introduced" },
  ];

  const outstandingAnnotations: Annotation[] = [
    { date: new Date(2012, 0, 1), label: "2012: \u00A39k fee regime begins" },
    { date: new Date(2020, 0, 1), label: "2020: Book passes \u00A3160bn" },
  ];

  const interestAnnotations: Annotation[] = [
    { date: new Date(2017, 0, 1), label: "2017: Rate hits 6.1%" },
    { date: new Date(2023, 0, 1), label: "2023: Rate peaks at 7.3%" },
  ];

  return (
    <>
      <TopicNav topic="Student Loan Economics" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Student Loan Economics"
          question="Does the Student Loan System Actually Work?"
          finding="The average English graduate now leaves university with \u00A346,900 of debt. The government expects to write off 45% of total lending. The outstanding loan book has reached \u00A3268 billion and is growing faster than repayments can reduce it. The system is neither a true loan nor a transparent graduate tax — it is something in between that almost nobody fully understands."
          colour="#F4A261"
          preposition="with"
        />

        {/* ── Editorial context ──────────────────────────────────────────── */}
        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              When the coalition government trebled tuition fees to \u00A39,000 in 2012, the promise was that student loans would be a self-sustaining system. Graduates would repay through an income-contingent mechanism — 9% of earnings above a threshold — and the cost to the taxpayer would be modest. Thirteen years later, the evidence is in: the system does not work as advertised. The total outstanding loan book has ballooned from \u00A346 billion in 2012 to \u00A3268 billion in 2025, growing by roughly \u00A320 billion per year. The government now expects to write off 45% of the total value lent, up from 32% when the scheme launched. That means nearly half of all student lending is effectively a grant that appears on the public balance sheet as an asset.
            </p>
            <p>
              For individual graduates, the picture is equally opaque. The average student leaves with \u00A346,900 of debt on which interest accrues at rates that have recently peaked at 7.6% — well above any savings account available to ordinary borrowers. Most graduates will never repay in full. Under Plan 2, any balance remaining after 30 years is written off. Under the newer Plan 5 (from 2023), the repayment window has been extended to 40 years and the interest rate capped at RPI — but the repayment threshold was frozen at \u00A325,000, meaning graduates begin paying sooner in real terms. The median graduate now faces repayments lasting the entirety of their working life, making the loan function as a decades-long additional marginal tax rate of 9%.
            </p>
            <p>
              The macroeconomic consequences are significant. The loan book sits off the headline public sector net debt measure but is included in the broader public sector net financial liabilities figure, which the Office for Budget Responsibility now watches closely. The annual cost to the exchequer — the gap between what is lent and what is expected to be repaid — runs to approximately \u00A310 billion per year. Independent analysts, including the Institute for Fiscal Studies, have repeatedly argued that a transparent graduate contribution scheme would be cheaper to administer, fairer across income levels, and honest about the true cost. Yet no government has been willing to reform the system, because doing so would require acknowledging that student loans are, for most borrowers, a tax by another name.
            </p>
          </div>
        </section>

        {/* ── Section nav ────────────────────────────────────────────────── */}
        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-debt', label: 'Graduate debt' },
          { id: 'sec-outstanding', label: 'Loan book' },
          { id: 'sec-interest', label: 'Interest & write-off' },
        ]} />

        {/* ── Metric cards ───────────────────────────────────────────────── */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Average graduate debt on completion"
            value={latestDebt ? `\u00A3${latestDebt.debt.toLocaleString()}` : "\u00A346,900"}
            unit="2024/25"
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestDebt && firstDebt
                ? `up from \u00A3${firstDebt.debt.toLocaleString()} in ${firstDebt.year} \u00B7 80% increase in 13 years`
                : "up from \u00A326,100 in 2012"
            }
            sparklineData={
              data ? sparkFrom(data.averageDebt.map(d => d.debt)) : []
            }
            source="Student Loans Company \u00B7 Statistical First Release, 2024/25"
            href="#sec-debt"
          />
          <MetricCard
            label="Total outstanding loan book"
            value={latestOutstanding ? `\u00A3${latestOutstanding.billionGBP}bn` : "\u00A3268bn"}
            unit="2024/25"
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestOutstanding && firstOutstanding
                ? `up from \u00A3${firstOutstanding.billionGBP}bn in ${firstOutstanding.year} \u00B7 growing ~\u00A320bn/year`
                : "up from \u00A346bn in 2012"
            }
            sparklineData={
              data ? sparkFrom(data.totalOutstanding.map(d => d.billionGBP)) : []
            }
            source="SLC / DfE \u00B7 Student Loan Statistics, 2024/25"
            href="#sec-outstanding"
          />
          <MetricCard
            label="Expected government write-off rate"
            value={latestWriteOff ? `${latestWriteOff.pct}%` : "45%"}
            unit="of total lending"
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestWriteOff && firstWriteOff
                ? `up from ${firstWriteOff.pct}% in ${firstWriteOff.year} \u00B7 majority will never repay in full`
                : "up from 32% in 2012"
            }
            sparklineData={
              data ? sparkFrom(data.writeOffRate.map(d => d.pct)) : []
            }
            source="DfE \u00B7 Student Loan Forecasts, 2024/25"
            href="#sec-interest"
          />
        </div>

        {/* ── Chart 1: Average graduate debt ─────────────────────────────── */}
        <ScrollReveal>
          <div id="sec-debt" className="mb-12">
            <LineChart
              series={debtSeries}
              title="Average graduate debt on completion, England, 2012-2025"
              subtitle="Average total debt at point of entering repayment. Includes tuition fee and maintenance loans."
              yLabel="Debt (\u00A3)"
              annotations={debtAnnotations}
              source={{
                name: 'Student Loans Company',
                dataset: 'Student Loans in England',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/collections/student-loans-statistics',
                date: '2024/25',
              }}
            />
          </div>
        </ScrollReveal>

        {/* ── Chart 2: Total outstanding loan book ───────────────────────── */}
        <ScrollReveal>
          <div id="sec-outstanding" className="mb-12">
            <LineChart
              series={outstandingSeries}
              title="Total outstanding student loan book, England, 2012-2025"
              subtitle="Cumulative face value of all outstanding student loans. Growing by approximately \u00A320 billion per year."
              yLabel="Outstanding (\u00A3bn)"
              annotations={outstandingAnnotations}
              source={{
                name: 'Student Loans Company / DfE',
                dataset: 'Student Loan Debt and Repayment Statistics',
                frequency: 'annual',
                url: 'https://explore-education-statistics.service.gov.uk/find-statistics/student-loan-forecasts-for-england',
                date: '2024/25',
              }}
            />
          </div>
        </ScrollReveal>

        {/* ── Chart 3: Interest rate and write-off ───────────────────────── */}
        <ScrollReveal>
          <div id="sec-interest" className="mb-12">
            <LineChart
              series={interestSeries}
              title="Maximum interest rate vs expected write-off rate, 2012-2025"
              subtitle="Plan 2 maximum interest rate (RPI + 3%) and the proportion of total lending the government expects to write off."
              yLabel="Percentage (%)"
              annotations={interestAnnotations}
              source={{
                name: 'DfE / SLC',
                dataset: 'Student Loan Forecasts for England',
                frequency: 'annual',
                url: 'https://explore-education-statistics.service.gov.uk/find-statistics/student-loan-forecasts-for-england',
                date: '2024/25',
              }}
            />
          </div>
        </ScrollReveal>

        {/* ── Positive callout ───────────────────────────────────────────── */}
        <ScrollReveal>
          <PositiveCallout
            title="Plan 5 caps interest at RPI, removing the most punitive rate"
            value="RPI only"
            unit="from 2023"
            description="The Plan 5 regime, introduced for students starting from September 2023, caps interest at the rate of inflation (RPI) rather than RPI + 3%. This means new graduates will no longer see their debt grow in real terms while they are unable to make repayments large enough to cover interest. The IFS estimates this will save the average Plan 5 borrower approximately \u00A310,000 over the life of their loan compared with Plan 2 terms. However, the trade-off is a 40-year repayment window (up from 30 years) and a frozen threshold of \u00A325,000, meaning more graduates begin repaying sooner."
            source="Source: Institute for Fiscal Studies \u00B7 Student Finance Policy Reform Analysis, 2023. DfE \u00B7 Plan 5 Policy Documentation."
          />
        </ScrollReveal>

        {/* ── Sources & Methodology ──────────────────────────────────────── */}
        <ScrollReveal>
          <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
            <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
            <div className="text-sm text-wiah-mid font-mono space-y-2">
              <p>
                <a
                  href="https://www.gov.uk/government/collections/student-loans-statistics"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-wiah-blue hover:underline"
                >
                  Student Loans Company — Statistical First Release
                </a>{' '}
                — primary source for individual loan balances, repayment data, and interest rates. Published annually.
              </p>
              <p>
                <a
                  href="https://explore-education-statistics.service.gov.uk/find-statistics/student-loan-forecasts-for-england"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-wiah-blue hover:underline"
                >
                  DfE — Student Loan Forecasts for England
                </a>{' '}
                — source for RAB charge (write-off rate), total outstanding loan book, and long-term fiscal projections. Published annually.
              </p>
              <p>
                <a
                  href="https://ifs.org.uk/publications/student-finance"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-wiah-blue hover:underline"
                >
                  Institute for Fiscal Studies — Student Finance Publications
                </a>{' '}
                — independent analysis of distributional impact and system cost.
              </p>
              <p>
                All figures are for England unless otherwise stated. Average debt figures reflect total balance at point of entering repayment, including tuition fee and maintenance loans. The write-off rate (RAB charge) represents the government estimate of the proportion of total lending that will not be repaid and must be absorbed by the exchequer. Total outstanding figures are face value and do not account for expected write-offs. Interest rate shown is the maximum applicable rate for Plan 2 borrowers (RPI + 3%, applied to graduates earning above the upper threshold).
              </p>
            </div>
          </section>
        </ScrollReveal>

        <RelatedTopics />
      </main>
    </>
  );
}
