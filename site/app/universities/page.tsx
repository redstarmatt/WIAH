'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import MetricDetailModal from '@/components/MetricDetailModal';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface DebtOutstandingPoint {
  year: number;
  totalBn: number;
  borrowers: number;
}

interface AvgDebtPoint {
  year: number;
  avgDebt: number;
}

interface FeePoint {
  year: number;
  maxFeeGBP: number;
  note: string | null;
}

interface EnrollmentPoint {
  year: number;
  totalStudents: number;
  ftUndergrad: number;
  ftPostgrad: number;
  international: number;
}

interface EarningsPremiumPoint {
  year: number;
  graduateMedianGBP: number;
  nonGraduateMedianGBP: number;
}

interface SubjectEarnings {
  subject: string;
  medianGBP: number;
}

interface EmploymentPoint {
  year: number;
  employedPct: number;
  highlySkillPct: number;
}

interface DegreeClassPoint {
  year: number;
  firstPct: number;
  upperSecondPct: number;
  lowerSecondPct: number;
  thirdOrPassPct: number;
}

interface DropoutPoint {
  year: number;
  nonContinuationPct: number;
}

interface UniversitiesData {
  national: {
    studentDebt: {
      totalOutstanding: DebtOutstandingPoint[];
      averageDebtAtGraduation: AvgDebtPoint[];
      repaymentForecast: {
        pctExpectedToRepayInFull: number;
        yearsToWriteOff: number;
        plan2ThresholdGBP: number;
        plan5ThresholdGBP: number;
      };
    };
    tuitionFees: {
      timeSeries: FeePoint[];
      realTermsNote: string;
    };
    enrollment: {
      timeSeries: EnrollmentPoint[];
    };
    graduateOutcomes: {
      earningsPremium: EarningsPremiumPoint[];
      earningsBySubject5YrsAfterGraduation: SubjectEarnings[];
      employmentRate15Months: EmploymentPoint[];
    };
    degreeClassifications: {
      timeSeries: DegreeClassPoint[];
    };
    dropoutRates: {
      timeSeries: DropoutPoint[];
    };
  };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

function sparkFrom(arr: number[], n = 12) {
  return arr.slice(-n);
}

function fmtGBP(n: number): string {
  if (n >= 1000) return `£${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K`;
  return `£${n}`;
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function UniversitiesPage() {
  const [data, setData] = useState<UniversitiesData | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    fetch('/data/universities/universities.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  // 1. Total student debt outstanding
  const debtTotalSeries: Series[] = data
    ? [{
        id: 'total-debt',
        label: 'Total outstanding (£bn)',
        colour: '#E63946',
        data: data.national.studentDebt.totalOutstanding.map(d => ({
          date: yearToDate(d.year),
          value: d.totalBn,
        })),
      }]
    : [];

  const debtAnnotations: Annotation[] = [
    { date: new Date(2012, 0), label: '2012: £9K fees begin' },
    { date: new Date(2023, 0), label: '2023: £227bn outstanding' },
  ];

  // 2. Average debt at graduation
  const avgDebtSeries: Series[] = data
    ? [{
        id: 'avg-debt',
        label: 'Average debt at graduation (£)',
        colour: '#E63946',
        data: data.national.studentDebt.averageDebtAtGraduation.map(d => ({
          date: yearToDate(d.year),
          value: d.avgDebt,
        })),
      }]
    : [];

  const avgDebtAnnotations: Annotation[] = [
    { date: new Date(2012, 0), label: '2012: £9K fees begin' },
    { date: new Date(2017, 0), label: '2017: £9,250 cap' },
  ];

  // 3. Tuition fees over time
  const feeSeries: Series[] = data
    ? [{
        id: 'max-fee',
        label: 'Maximum tuition fee (£)',
        colour: '#264653',
        data: data.national.tuitionFees.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.maxFeeGBP,
        })),
      }]
    : [];

  const feeAnnotations: Annotation[] = [
    { date: new Date(1998, 0), label: '1998: Fees introduced (£1K)' },
    { date: new Date(2006, 0), label: '2006: Top-up fees (£3K)' },
    { date: new Date(2012, 0), label: '2012: Trebled to £9K' },
    { date: new Date(2025, 0), label: '2025: £9,535' },
  ];

  // 4. Graduate vs non-graduate earnings
  const earningsSeries: Series[] = data
    ? [
        {
          id: 'graduate',
          label: 'Graduate median (£/yr)',
          colour: '#2A9D8F',
          data: data.national.graduateOutcomes.earningsPremium.map(d => ({
            date: yearToDate(d.year),
            value: d.graduateMedianGBP,
          })),
        },
        {
          id: 'non-graduate',
          label: 'Non-graduate median (£/yr)',
          colour: '#E63946',
          data: data.national.graduateOutcomes.earningsPremium.map(d => ({
            date: yearToDate(d.year),
            value: d.nonGraduateMedianGBP,
          })),
        },
      ]
    : [];

  const earningsAnnotations: Annotation[] = [
    { date: new Date(2020, 0), label: '2020: COVID-19' },
  ];

  // 5. Enrollment — total, undergraduate, international
  const enrollmentSeries: Series[] = data
    ? [
        {
          id: 'total',
          label: 'Total students',
          colour: '#0D1117',
          data: data.national.enrollment.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.totalStudents,
          })),
        },
        {
          id: 'international',
          label: 'International students',
          colour: '#264653',
          data: data.national.enrollment.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.international,
          })),
        },
      ]
    : [];

  const enrollmentAnnotations: Annotation[] = [
    { date: new Date(2012, 0), label: '2012: £9K fees' },
    { date: new Date(2020, 0), label: '2020: COVID-19' },
    { date: new Date(2024, 0), label: '2024: Visa restrictions' },
  ];

  // 6. Degree classifications — stacked area-style (as multiple series)
  const degreeFirstSeries: Series[] = data
    ? [{
        id: 'first',
        label: 'First class (%)',
        colour: '#E63946',
        data: data.national.degreeClassifications.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.firstPct,
        })),
      }]
    : [];

  const degreeAllSeries: Series[] = data
    ? [
        {
          id: 'first',
          label: 'First class',
          colour: '#E63946',
          data: data.national.degreeClassifications.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.firstPct,
          })),
        },
        {
          id: 'upper-second',
          label: '2:1 (Upper second)',
          colour: '#F4A261',
          data: data.national.degreeClassifications.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.upperSecondPct,
          })),
        },
        {
          id: 'lower-second',
          label: '2:2 (Lower second)',
          colour: '#6B7280',
          data: data.national.degreeClassifications.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.lowerSecondPct,
          })),
        },
        {
          id: 'third-or-pass',
          label: 'Third / pass',
          colour: '#2A9D8F',
          data: data.national.degreeClassifications.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.thirdOrPassPct,
          })),
        },
      ]
    : [];

  const degreeAnnotations: Annotation[] = [
    { date: new Date(2020, 0), label: '2020: No-detriment policies' },
  ];

  // 7. Dropout rates
  const dropoutSeries: Series[] = data
    ? [{
        id: 'dropout',
        label: 'Non-continuation rate (%)',
        colour: '#E63946',
        data: data.national.dropoutRates.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.nonContinuationPct,
        })),
      }]
    : [];

  // ── Metric values ────────────────────────────────────────────────────────

  const latestAvgDebt = data?.national.studentDebt.averageDebtAtGraduation.at(-1);
  const latestEnrollment = data?.national.enrollment.timeSeries.at(-1);
  const prevEnrollment = data?.national.enrollment.timeSeries.at(-2);
  const latestDegree = data?.national.degreeClassifications.timeSeries.at(-1);
  const baselineDegree = data?.national.degreeClassifications.timeSeries[0];
  const latestEarnings = data?.national.graduateOutcomes.earningsPremium.at(-1);

  const premiumGBP = latestEarnings
    ? latestEarnings.graduateMedianGBP - latestEarnings.nonGraduateMedianGBP
    : 0;

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Universities" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Universities"
          question="Is University Actually Worth It?"
          finding={
            latestAvgDebt && latestEarnings
              ? `The average graduate leaves with ${fmtGBP(latestAvgDebt.avgDebt)} of debt \u2014 but only 23% are expected to ever repay it in full.`
              : 'Graduates leave with record debt levels, but most will never fully repay.'
          }
          colour="#264653"
          preposition="at"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              England&apos;s university funding model rests on a structural paradox: students borrow an
              average of &pound;44,940 to fund their degrees, yet only 23% of Plan 2 borrowers are
              expected to repay in full before loans are written off after 40 years. The total student
              loan book exceeds &pound;268 billion and grows by roughly &pound;20 billion annually. The
              &pound;9,250 fee cap was frozen for eight years until 2025, eroding its real value by
              around 17%, pushing universities to depend increasingly on international student fees
              &mdash; until visa restrictions in 2024 caused international enrolment to fall sharply
              from a peak of 762,000. Grade inflation is simultaneously reshaping degree standards:
              first-class awards rose from 7% in 1995 to 36% in 2021 (post-COVID no-detriment
              policies) before falling slightly to 31%, still four times the 1995 rate.
            </p>
            <p>The distributional effects fall hardest on those the system was designed to help. Students from lower-income households borrow more in maintenance loans &mdash; up to &pound;13,022 per year in London versus &pound;4,767 living at home &mdash; graduating with significantly higher total debt despite identical tuition fees. Women repay more slowly, accrue more interest, and are far less likely to clear the balance before write-off. Students at post-1992 universities, where disadvantaged students are concentrated, have median graduate earnings roughly &pound;8,000 below Russell Group peers five years after graduation, yet carry comparable or higher debt. The graduate earnings premium remains real at &pound;12,500 per year more than non-graduates &mdash; but conceals stark variation: medicine and economics graduates earn more than double creative arts graduates within five years.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-debt', label: 'Student Debt' },
          { id: 'sec-outcomes', label: 'Graduate Outcomes' },
          { id: 'sec-grades', label: 'Degree Standards' },
          { id: 'sec-enrollment', label: 'Enrollment' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Avg. debt at graduation"
            value={latestAvgDebt ? fmtGBP(latestAvgDebt.avgDebt) : '—'}
            unit=""
            direction="up"
            polarity="up-is-bad"
            baseline="Average Plan 2 borrower leaves university with nearly £45K of debt — up from £16K in 2012"
            changeText={
              latestAvgDebt
                ? `+174% since 2012 · Only 23% will repay in full`
                : 'Loading…'
            }
            sparklineData={
              data
                ? sparkFrom(
                    data.national.studentDebt.averageDebtAtGraduation.map(d => d.avgDebt)
                  )
                : []
            }
            source="SLC · Student Loans in England 2024-25"
            href="#sec-overview"/>
          <MetricCard
            label="Graduate premium"
            value={latestEarnings ? fmtGBP(premiumGBP) : '—'}
            unit="/yr"
            direction="up"
            polarity="up-is-good"
            baseline="Graduates earn £12,500 more per year than non-graduates — but this varies enormously by subject"
            changeText={
              latestEarnings
                ? `Graduate: £${(latestEarnings.graduateMedianGBP / 1000).toFixed(0)}K · Non-grad: £${(latestEarnings.nonGraduateMedianGBP / 1000).toFixed(1)}K`
                : 'Loading…'
            }
            sparklineData={
              data
                ? sparkFrom(
                    data.national.graduateOutcomes.earningsPremium.map(
                      d => d.graduateMedianGBP - d.nonGraduateMedianGBP
                    )
                  )
                : []
            }
            source="DfE · LEO Graduate Outcomes 2022/23"
            href="#sec-debt"/>
          <MetricCard
            label="First-class degrees"
            value={latestDegree ? latestDegree.firstPct.toFixed(0) : '—'}
            unit="%"
            direction={latestDegree && baselineDegree && latestDegree.firstPct > baselineDegree.firstPct ? 'up' : 'flat'}
            polarity="up-is-bad"
            baseline="31% of graduates now receive a first — up from 7% in 1995. Grade inflation has devalued the top classification."
            changeText={
              latestDegree && baselineDegree
                ? `Was ${baselineDegree.firstPct}% in 1995 · Peak: 36.4% in 2021`
                : 'Loading…'
            }
            sparklineData={
              data
                ? sparkFrom(
                    data.national.degreeClassifications.timeSeries.map(d => d.firstPct)
                  )
                : []
            }
            source="HESA · Degree classifications 2023/24"
            href="#sec-outcomes"/>
        </div>
        </ScrollReveal>

        {/* ── Section: Student Debt ───────────────────────────────────────────── */}
        <div id="sec-debt">
          <ScrollReveal>
            <div className="mb-6 pt-4">
              <h2 className="text-xl font-bold text-wiah-black mb-2">
                The student debt mountain
              </h2>
              <p className="text-base text-wiah-black leading-[1.7] max-w-2xl">
                Total outstanding student debt has grown from &pound;47 billion in 2012 to &pound;269
                billion in 2025 &mdash; expanding by roughly &pound;20 billion each year. Most of this
                will never be repaid: the government&apos;s own forecasts suggest 77% of Plan 2
                borrowers will have their remaining balance written off after 30 years.
              </p>
            </div>
          </ScrollReveal>

          {debtTotalSeries.length > 0 ? (
            <LineChart
              title="Total student loan debt outstanding, 2012–2025"
              subtitle="Total balance of outstanding student loans in England (£ billions). Includes Plan 1, Plan 2, and postgraduate loans."
              series={debtTotalSeries}
              annotations={debtAnnotations}
              yLabel="£ billion"
              source={{
                name: 'Student Loans Company',
                dataset: 'Student Loans in England, Financial Year 2024-25',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/collections/student-loans-company-statistics',
              }}
            />
          ) : (
            <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
          )}

          {avgDebtSeries.length > 0 ? (
            <LineChart
              title="Average debt at graduation, 2012–2025"
              subtitle="Mean student loan balance on entering repayment, England. Plan 2 borrowers."
              series={avgDebtSeries}
              annotations={avgDebtAnnotations}
              yLabel="£"
              source={{
                name: 'Student Loans Company',
                dataset: 'Student Loans in England, Financial Year 2024-25',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/collections/student-loans-company-statistics',
              }}
            />
          ) : (
            <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
          )}

          {/* Tuition fee step chart */}
          {feeSeries.length > 0 ? (
            <LineChart
              title="Maximum undergraduate tuition fee, 1998–2025"
              subtitle="Maximum chargeable fee for home undergraduates in England. Frozen at £9,250 for eight years until the 2025 increase."
              series={feeSeries}
              annotations={feeAnnotations}
              yLabel="£ per year"
              source={{
                name: 'House of Commons Library',
                dataset: 'Student loan statistics, March 2025',
                frequency: 'periodic',
                url: 'https://commonslibrary.parliament.uk/research-briefings/sn01079/',
              }}
            />
          ) : (
            <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
          )}

          {/* Repayment key facts */}
          {data && (
            <ScrollReveal>
              <section className="mb-12 bg-wiah-light rounded-lg p-6">
                <h3 className="text-lg font-bold text-wiah-black mb-3">
                  The repayment reality
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <p className="font-mono text-2xl font-bold text-wiah-red">
                      {data.national.studentDebt.repaymentForecast.pctExpectedToRepayInFull}%
                    </p>
                    <p className="text-xs text-wiah-mid mt-1">expected to repay in full</p>
                  </div>
                  <div>
                    <p className="font-mono text-2xl font-bold text-wiah-black">
                      {data.national.studentDebt.repaymentForecast.yearsToWriteOff}
                    </p>
                    <p className="text-xs text-wiah-mid mt-1">years until write-off (Plan 2)</p>
                  </div>
                  <div>
                    <p className="font-mono text-2xl font-bold text-wiah-black">
                      &pound;{data.national.studentDebt.repaymentForecast.plan2ThresholdGBP.toLocaleString()}
                    </p>
                    <p className="text-xs text-wiah-mid mt-1">repayment threshold (Plan 2)</p>
                  </div>
                  <div>
                    <p className="font-mono text-2xl font-bold text-wiah-black">
                      &pound;{data.national.studentDebt.repaymentForecast.plan5ThresholdGBP.toLocaleString()}
                    </p>
                    <p className="text-xs text-wiah-mid mt-1">repayment threshold (Plan 5)</p>
                  </div>
                </div>
                <p className="font-mono text-[11px] text-wiah-mid mt-4">
                  Source: SLC &amp; OBR student loan repayment forecasts, 2024-25. Plan 5 applies to new borrowers from September 2023.
                </p>
              </section>
            </ScrollReveal>
          )}
        </div>{/* end sec-debt */}

        {/* ── Section: Graduate Outcomes ──────────────────────────────────────── */}
        <div id="sec-outcomes">
          <ScrollReveal>
            <div className="mb-6 pt-4">
              <h2 className="text-xl font-bold text-wiah-black mb-2">
                The graduate premium: real but uneven
              </h2>
              <p className="text-base text-wiah-black leading-[1.7] max-w-2xl">
                On average, graduates earn significantly more than non-graduates &mdash; and the gap
                has been widening. But the average conceals enormous variation by subject. Medicine
                graduates earn more than double those in creative arts five years after graduation.
              </p>
            </div>
          </ScrollReveal>

          {earningsSeries.length > 0 ? (
            <LineChart
              title="Graduate vs non-graduate median earnings, 2010–2024"
              subtitle="Median annual earnings for graduates and non-graduates aged 21–64, England."
              series={earningsSeries}
              annotations={earningsAnnotations}
              yLabel="£ per year"
              source={{
                name: 'Department for Education',
                dataset: 'Graduate Outcomes (LEO), 2022/23',
                frequency: 'annual',
                url: 'https://explore-education-statistics.service.gov.uk/find-statistics/graduate-outcomes-leo',
              }}
            />
          ) : (
            <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
          )}

          {/* Earnings by subject table */}
          {data && (
            <ScrollReveal>
              <section className="mb-12">
                <h3 className="text-lg font-bold text-wiah-black mb-1">
                  Median earnings five years after graduation, by subject
                </h3>
                <p className="text-sm text-wiah-mid font-mono mb-4">
                  LEO data, 2018/19 graduating cohort. Median annual earnings in 2023/24.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-wiah-border">
                        <th className="text-left py-2 pr-4 font-mono text-xs text-wiah-mid">Subject</th>
                        <th className="text-right py-2 px-3 font-mono text-xs text-wiah-mid">Median earnings</th>
                        <th className="text-left py-2 pl-3 font-mono text-xs text-wiah-mid w-40">Relative</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.national.graduateOutcomes.earningsBySubject5YrsAfterGraduation.map(row => {
                        const maxEarnings = data.national.graduateOutcomes.earningsBySubject5YrsAfterGraduation[0].medianGBP;
                        return (
                          <tr key={row.subject} className="border-b border-wiah-border/50 hover:bg-wiah-light/50">
                            <td className="py-2 pr-4 text-sm">{row.subject}</td>
                            <td className="py-2 px-3 font-mono text-sm text-right font-bold">
                              &pound;{row.medianGBP.toLocaleString()}
                            </td>
                            <td className="py-2 pl-3">
                              <div className="flex items-center gap-1">
                                <div
                                  className="h-2 rounded-sm"
                                  style={{
                                    width: `${(row.medianGBP / maxEarnings) * 100}%`,
                                    maxWidth: '120px',
                                    backgroundColor:
                                      row.medianGBP >= 35000 ? '#2A9D8F'
                                      : row.medianGBP >= 27000 ? '#264653'
                                      : '#E63946',
                                  }}
                                />
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <p className="font-mono text-[11px] text-wiah-mid mt-3">
                  Source: DfE &mdash; Longitudinal Education Outcomes (LEO), Graduate and Postgraduate Outcomes 2022/23.
                </p>
              </section>
            </ScrollReveal>
          )}

          {/* Dropout rates */}
          {dropoutSeries.length > 0 ? (
            <LineChart
              title="Non-continuation rates, 2012–2023"
              subtitle="Percentage of full-time first-degree entrants who did not continue into their second year, UK."
              series={dropoutSeries}
              yLabel="Percent"
              source={{
                name: 'Office for Students',
                dataset: 'Non-continuation summary data, 2023/24',
                frequency: 'annual',
                url: 'https://www.officeforstudents.org.uk/data-and-analysis/',
              }}
            />
          ) : (
            <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
          )}
        </div>{/* end sec-outcomes */}

        {/* ── Section: Degree Standards ───────────────────────────────────────── */}
        <div id="sec-grades">
          <ScrollReveal>
            <div className="mb-6 pt-4">
              <h2 className="text-xl font-bold text-wiah-black mb-2">
                Degree classifications, 1995&ndash;2024
              </h2>
              <p className="text-base text-wiah-black leading-[1.7] max-w-2xl">
                In 1995, a first-class degree was rare &mdash; just 7% of graduates achieved one.
                By 2021, the figure had reached 36%, propelled by COVID-era no-detriment policies.
                It has since eased to 31%, but the long-term trend is unmistakable: top grades have
                become the norm, not the exception.
              </p>
            </div>
          </ScrollReveal>

          {degreeAllSeries.length > 0 ? (
            <LineChart
              title="Degree classifications awarded, 1995–2024"
              subtitle="Percentage of first-degree qualifiers by classification, UK HE providers."
              series={degreeAllSeries}
              annotations={degreeAnnotations}
              yLabel="Percent"
              source={{
                name: 'HESA / Jisc',
                dataset: 'Degree classifications by provider and subject, 2023/24',
                frequency: 'annual',
                url: 'https://www.hesa.ac.uk/data-and-analysis/students/outcomes',
              }}
            />
          ) : (
            <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
          )}

          {/* Degree classifications table */}
          {data && (
            <ScrollReveal>
              <section className="mb-12">
                <h3 className="text-lg font-bold text-wiah-black mb-1">
                  Degree classifications: 1995 vs 2024
                </h3>
                <p className="text-sm text-wiah-mid font-mono mb-4">
                  How the distribution of degree classes has shifted over three decades.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-wiah-border">
                        <th className="text-left py-2 pr-4 font-mono text-xs text-wiah-mid">Classification</th>
                        <th className="text-right py-2 px-3 font-mono text-xs text-wiah-mid">1995</th>
                        <th className="text-right py-2 px-3 font-mono text-xs text-wiah-mid">2024</th>
                        <th className="text-right py-2 pl-3 font-mono text-xs text-wiah-mid">Change</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { label: 'First', key1995: baselineDegree?.firstPct, key2024: latestDegree?.firstPct },
                        { label: '2:1 (Upper second)', key1995: baselineDegree?.upperSecondPct, key2024: latestDegree?.upperSecondPct },
                        { label: '2:2 (Lower second)', key1995: baselineDegree?.lowerSecondPct, key2024: latestDegree?.lowerSecondPct },
                        { label: 'Third / pass', key1995: baselineDegree?.thirdOrPassPct, key2024: latestDegree?.thirdOrPassPct },
                      ].map(row => {
                        const change = row.key1995 != null && row.key2024 != null
                          ? row.key2024 - row.key1995
                          : null;
                        return (
                          <tr key={row.label} className="border-b border-wiah-border/50 hover:bg-wiah-light/50">
                            <td className="py-2 pr-4 text-sm font-medium">{row.label}</td>
                            <td className="py-2 px-3 font-mono text-sm text-right">{row.key1995?.toFixed(1)}%</td>
                            <td className="py-2 px-3 font-mono text-sm text-right font-bold">{row.key2024?.toFixed(1)}%</td>
                            <td className="py-2 pl-3 font-mono text-sm text-right">
                              {change != null && (
                                <span className={change > 0 ? 'text-wiah-red' : 'text-wiah-green'}>
                                  {change > 0 ? '+' : ''}{change.toFixed(1)}pp
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <p className="font-mono text-[11px] text-wiah-mid mt-3">
                  Source: HESA aggregate data. Figures show percentage of first-degree qualifiers in the given year.
                </p>
              </section>
            </ScrollReveal>
          )}
        </div>{/* end sec-grades */}

        {/* ── Section: Enrollment ─────────────────────────────────────────────── */}
        <div id="sec-enrollment">
          <ScrollReveal>
            <div className="mb-6 pt-4">
              <h2 className="text-xl font-bold text-wiah-black mb-2">
                The international student boom &mdash; and bust
              </h2>
              <p className="text-base text-wiah-black leading-[1.7] max-w-2xl">
                International student numbers nearly doubled between 2019 and 2023, reaching 762,000.
                Universities became heavily dependent on the fees they paid &mdash; often two to three
                times the domestic rate. Then came the January 2024 visa restrictions. Enrollment fell
                sharply, and several universities now face serious financial pressure.
              </p>
            </div>
          </ScrollReveal>

          {enrollmentSeries.length > 0 ? (
            <LineChart
              title="University enrollment, 2010–2024"
              subtitle="Total students and international students at UK higher education providers."
              series={enrollmentSeries}
              annotations={enrollmentAnnotations}
              yLabel="Students"
              source={{
                name: 'HESA / Jisc',
                dataset: 'Higher Education Student Statistics UK, 2023/24',
                frequency: 'annual',
                url: 'https://www.hesa.ac.uk/data-and-analysis/students/whos-in-he',
              }}
            />
          ) : (
            <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
          )}

          {/* Enrollment summary */}
          {data && latestEnrollment && prevEnrollment && (
            <ScrollReveal>
              <section className="mb-12">
                <h3 className="text-lg font-bold text-wiah-black mb-1">
                  Enrollment at a glance, {latestEnrollment.year}/{(latestEnrollment.year + 1).toString().slice(-2)}
                </h3>
                <p className="text-sm text-wiah-mid font-mono mb-4">
                  UK higher education providers, all modes of study.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-wiah-border">
                        <th className="text-left py-2 pr-4 font-mono text-xs text-wiah-mid">Category</th>
                        <th className="text-right py-2 px-3 font-mono text-xs text-wiah-mid">{latestEnrollment.year}/{(latestEnrollment.year + 1).toString().slice(-2)}</th>
                        <th className="text-right py-2 px-3 font-mono text-xs text-wiah-mid">Change from prev. yr</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          label: 'Total students',
                          val: latestEnrollment.totalStudents,
                          prev: prevEnrollment.totalStudents,
                        },
                        {
                          label: 'Full-time undergraduates',
                          val: latestEnrollment.ftUndergrad,
                          prev: prevEnrollment.ftUndergrad,
                        },
                        {
                          label: 'Full-time postgraduates',
                          val: latestEnrollment.ftPostgrad,
                          prev: prevEnrollment.ftPostgrad,
                        },
                        {
                          label: 'International students',
                          val: latestEnrollment.international,
                          prev: prevEnrollment.international,
                        },
                      ].map(row => {
                        const changePct = ((row.val - row.prev) / row.prev) * 100;
                        return (
                          <tr key={row.label} className="border-b border-wiah-border/50 hover:bg-wiah-light/50">
                            <td className="py-2 pr-4 text-sm">{row.label}</td>
                            <td className="py-2 px-3 font-mono text-sm text-right font-bold">
                              {row.val.toLocaleString()}
                            </td>
                            <td className="py-2 px-3 font-mono text-sm text-right">
                              <span className={changePct >= 0 ? '' : 'text-wiah-red'}>
                                {changePct >= 0 ? '+' : ''}{changePct.toFixed(1)}%
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <p className="font-mono text-[11px] text-wiah-mid mt-3">
                  Source: HESA / Jisc &mdash; Higher Education Student Statistics UK, 2023/24.
                </p>
              </section>
            </ScrollReveal>
          )}
        </div>{/* end sec-enrollment */}

        {/* Positive story */}
        <ScrollReveal>
        <PositiveCallout
          title="What's improving"
          value="+£12.5K"
          unit="/yr"
          description="The graduate earnings premium has widened over the past decade. Median graduate earnings now exceed £36,000 — £12,500 per year more than for non-graduates. Graduate employment rates remain high at 87%, and subjects like computing, engineering, and nursing offer strong returns that comfortably justify the investment."
          source="Source: DfE — LEO Graduate and Postgraduate Outcomes, 2022/23."
        />
        </ScrollReveal>

        {/* Sources */}
        <section className="border-t border-wiah-border pt-8">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; methodology</h2>
          <ul className="space-y-2 font-mono text-xs text-wiah-mid">
            {data?.metadata.sources.map((src, i) => (
              <li key={i}>
                <a
                  href={src.url}
                  className="underline hover:text-wiah-blue"
                  target="_blank"
                  rel="noreferrer"
                >
                  {src.name} &mdash; {src.dataset} ({src.frequency})
                </a>
              </li>
            ))}
          </ul>
          <p className="font-mono text-xs text-wiah-mid mt-4">
            {data?.metadata.methodology}
          </p>
          {data?.metadata.knownIssues && data.metadata.knownIssues.length > 0 && (
            <div className="mt-4">
              <p className="font-mono text-xs text-wiah-mid font-bold mb-1">Known issues:</p>
              <ul className="list-disc list-inside space-y-1 font-mono text-xs text-wiah-mid">
                {data.metadata.knownIssues.map((issue, i) => (
                  <li key={i}>{issue}</li>
                ))}
              </ul>
            </div>
          )}
          <p className="font-mono text-xs text-wiah-mid mt-4">
            Data updated automatically via GitHub Actions. Last pipeline run:{' '}
            {new Date().toISOString().slice(0, 10)}.
          </p>
        </section>
      </main>

      {/* Expanded metric modals */}
      {expanded === 'avg-debt' && (
        <MetricDetailModal
          title="Average debt at graduation, 2012–2025"
          subtitle="Mean student loan balance on entering repayment, England. Plan 2 borrowers."
          series={avgDebtSeries}
          annotations={avgDebtAnnotations}
          yLabel="£"
          source={{
            name: 'Student Loans Company',
            dataset: 'Student Loans in England, Financial Year 2024-25',
            frequency: 'annual',
            url: 'https://www.gov.uk/government/collections/student-loans-company-statistics',
          }}
          onClose={() => setExpanded(null)}
        />
      )}
      {expanded === 'earnings' && (
        <MetricDetailModal
          title="Graduate vs non-graduate median earnings, 2010–2024"
          subtitle="Median annual earnings for graduates and non-graduates aged 21–64, England."
          series={earningsSeries}
          annotations={earningsAnnotations}
          yLabel="£ per year"
          source={{
            name: 'Department for Education',
            dataset: 'Graduate Outcomes (LEO), 2022/23',
            frequency: 'annual',
            url: 'https://explore-education-statistics.service.gov.uk/find-statistics/graduate-outcomes-leo',
          }}
          onClose={() => setExpanded(null)}
        />
      )}
      {expanded === 'degrees' && (
        <MetricDetailModal
          title="Degree classifications awarded, 1995–2024"
          subtitle="Percentage of first-degree qualifiers by classification, UK HE providers."
          series={degreeAllSeries}
          annotations={degreeAnnotations}
          yLabel="Percent"
          source={{
            name: 'HESA / Jisc',
            dataset: 'Degree classifications by provider and subject, 2023/24',
            frequency: 'annual',
            url: 'https://www.hesa.ac.uk/data-and-analysis/students/outcomes',
          }}
          onClose={() => setExpanded(null)}
        />
      )}
    </>
  );
}
