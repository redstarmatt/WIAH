'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series, Annotation } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import PositiveCallout from '@/components/PositiveCallout'
import SectionNav from '@/components/SectionNav'

interface StudentDebtData {
  averageDebt: Array<{ year: number; avgDebt: number }>
  repaymentExpectation: Array<{ year: number; pctFullRepay: number }>
  bySubjectGroup: Array<{ subject: string; avgDebt: number }>
}

function yearToDate(y: number): Date {
  return new Date(y, 5, 1)
}

export default function StudentDebtPage() {
  const COLOUR = '#6B7280'
  const [data, setData] = useState<StudentDebtData | null>(null)

  useEffect(() => {
    fetch('/data/student-debt/student_debt.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const debtSeries: Series[] = data
    ? [
        {
          id: 'debt',
          label: 'Average debt at graduation',
          colour: COLOUR,
          data: data.averageDebt.map(d => ({
            date: yearToDate(d.year),
            value: d.avgDebt,
          })),
        },
      ]
    : []

  const repaymentSeries: Series[] = data
    ? [
        {
          id: 'repay',
          label: 'Graduates expected to fully repay',
          colour: '#E63946',
          data: data.repaymentExpectation.map(d => ({
            date: yearToDate(d.year),
            value: d.pctFullRepay,
          })),
        },
      ]
    : []

  const debtAnnotations: Annotation[] = [
    {
      date: yearToDate(2012),
      label: 'Tuition fees rise to £9,000',
    },
  ]

  const maxSubjectDebt = data
    ? Math.max(...data.bySubjectGroup.map(d => d.avgDebt))
    : 100

  return (
    <main className="min-h-screen bg-white">
      <TopicNav topic="Student Debt" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionNav
          sections={[
            { id: 'sec-overview', label: 'Overview' },
            { id: 'sec-context', label: 'Context' },

            { id: 'sec-charts', label: 'Charts' },
            { id: 'sec-sources', label: 'Sources' },
          ]}
        />

        <section id="sec-overview" className="pt-12 pb-8">
          <TopicHeader
            topic="Student Debt"
            colour={COLOUR}
            question="What does a degree actually cost?"
            finding="The average English student now graduates with &pound;45,000 of debt, a system that transfers cost from the state to individuals &mdash; most of whom will never fully repay it."
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <MetricCard
              label="Average graduate debt"
              value="£45,600"
              direction="up"
              polarity="up-is-bad"
              changeText="+£28,000 since 2012 tuition fee rise"
              onExpand={() => {}}
            />
            <MetricCard
              label="Graduates expected to repay in full"
              value="23%"
              direction="down"
              polarity="up-is-good"
              changeText="Was 40% under pre-2012 system"
              onExpand={() => {}}
            />
            <MetricCard
              label="Unpaid debt written off per year"
              value="£8.6bn"
              direction="up"
              polarity="up-is-bad"
              changeText="Forecast to reach £12bn by 2040"
              onExpand={() => {}}
            />
          </div>
        </section>

        <section id="sec-context" className="py-12 border-t border-wiah-border">
          <h2 className="text-xl font-bold text-wiah-black mb-6">Context</h2>
          <div className="max-w-2xl mt-4 mb-12">
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>England&apos;s student loan system charges up to &pound;9,535 per year in tuition fees (from 2025), leaving the average English graduate owing &pound;45,600. Repayments are 9% of earnings above &pound;25,000, with any balance written off after 40 years &mdash; a cost to the state currently running at &pound;8.6bn per year and projected to reach &pound;12bn by 2040. The central paradox is that a system designed to reduce public subsidy has increased it: the Institute for Fiscal Studies finds only 23% of graduates will repay in full, compared with 40% under the pre-2012 system. The 2023 reforms extended the term to 40 years, reducing annual repayments but increasing total interest paid, with the expected subsidy per student rising further. The government&apos;s own projections confirm the scheme costs the Exchequer more per student than the old system it replaced.</p>
              <p>The burden falls hardest on those the system was meant to help. Students from lower-income households borrow more in maintenance &mdash; up to &pound;13,022 in London &mdash; graduating with higher total debt despite identical fees. Women, who earn less on average in their first decade of employment, repay more slowly and are less likely to clear the balance before write-off. Post-1992 university graduates &mdash; where disadvantaged students concentrate &mdash; have median earnings roughly &pound;8,000 below Russell Group peers five years after graduation but carry comparable debt. A graduate from a low-income family in social work will pay 9&percnt; of every pound above &pound;25,000 for 40 years and still not repay in full; a privately-educated medical graduate repays faster, pays less interest in total, and retains the full earnings premium.</p>
            </div>
          </div>
        </section>

        <PositiveCallout
          title="2023 reforms extended repayment terms"
          value="10 years"
          description="The government&apos;s 2023 reforms extended the repayment period from 30 to 40 years and lowered the repayment threshold. While this reduces annual repayments, it increases total interest paid &mdash; and leaves most graduates paying for their entire working lives."
          source="Source: Department for Education"
        />

        <section id="sec-charts" className="py-12 border-t border-wiah-border">
          <ScrollReveal>
            <div className="mb-10">
              {data && (
                <LineChart
                  title="Average student debt at graduation, England"
                  subtitle="Pounds. Plan 2 loans, English-domiciled graduates at English universities."
                  series={debtSeries}
                  annotations={debtAnnotations}
                />
              )}
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="mb-10">
              {data && (
                <LineChart
                  title="Share of graduates expected to repay loans in full"
                  subtitle="Percentage. IFS forecasts based on current earnings trajectories."
                  series={repaymentSeries}
                />
              )}
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="mt-10 mb-10">
              <h2 className="text-xl font-bold text-wiah-black mb-6">
                Average debt by subject studied
              </h2>
              <div className="space-y-2">
                {data &&
                  data.bySubjectGroup.map(item => (
                    <div key={item.subject} className="flex items-center gap-3">
                      <div className="w-48 text-xs font-mono text-wiah-mid text-right">
                        {item.subject}
                      </div>
                      <div className="flex-1 bg-wiah-light rounded-sm h-6 overflow-hidden">
                        <div
                          className="h-full rounded-sm transition-all duration-300"
                          style={{
                            width: `${(item.avgDebt / maxSubjectDebt) * 100}%`,
                            backgroundColor: COLOUR,
                          }}
                        />
                      </div>
                      <div className="w-12 text-xs font-mono text-wiah-mid text-right">
                        £{item.avgDebt.toLocaleString()}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </ScrollReveal>
        </section>

        <section id="sec-sources" className="py-12 border-t border-wiah-border">
          <h2 className="text-xl font-bold text-wiah-black mb-6">
            Sources &amp; methodology
          </h2>
          <div className="space-y-2 font-mono text-xs text-wiah-mid">
            <p>
              Student debt and subject breakdown: Institute for Fiscal Studies (IFS),
              2023 Student Loans Policy Evaluation Report
            </p>
            <p>
              Repayment expectations and forecasts: Department for Education (DfE),
              Student Finance England
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
