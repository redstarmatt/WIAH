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
            finding="The average English student now graduates with £45,000 of debt, a system that transfers cost from the state to individuals — most of whom will never fully repay it."
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <MetricCard
              label="Average graduate debt"
              value="£45,600"
              direction="up"
              polarity="up-is-bad"
              changeText="+£28,000 since 2012 tuition fee rise"
              href="#sec-charts"
            />
            <MetricCard
              label="Graduates expected to repay in full"
              value="23%"
              direction="down"
              polarity="up-is-good"
              changeText="Was 40% under pre-2012 system"
              href="#sec-charts"
            />
            <MetricCard
              label="Unpaid debt written off per year"
              value="£8.6bn"
              direction="up"
              polarity="up-is-bad"
              changeText="Forecast to reach £12bn by 2040"
              href="#sec-charts"
            />
          </div>
        </section>

        <section id="sec-context" className="py-12 border-t border-wiah-border">
          <h2 className="text-xl font-bold text-wiah-black mb-6">Context</h2>
          <div className="max-w-2xl mt-4 mb-12">
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>England's student loan system is, by design, a graduate contribution scheme rather than a conventional debt. Since 2012, undergraduates have paid up to £9,000 a year in tuition fees — raised to £9,250 in 2017 and to £9,535 from 2025. The average English graduate now leaves university owing £45,600. Repayments are structured as 9% of earnings above a £25,000 threshold, and any balance unpaid after 40 years is written off. The total cost of that write-off currently runs to £8.6bn a year and is rising.</p>
              <p>The central paradox is that a system designed to reduce public subsidy has increased it. Analysis by the Institute for Fiscal Studies found that only 23% of graduates will repay their loans in full — compared with 40% under the pre-2012 system. The 2023 reforms, which lowered annual repayments by extending the term from 30 to 40 years, made this worse: the expected government subsidy per student increased, because graduates now carry debt for longer and accrue more interest, but repay less each year. The system redistributes cost by earnings: high earners in medicine, law and finance repay in full and at market-rate interest; median earners pay more in total over a longer period; lower earners repay the least but carry the debt for their entire working lives.</p>
            </div>
          </div>
        </section>

        <PositiveCallout
          title="2023 reforms extended repayment terms"
          value="10 years"
          description="The government's 2023 reforms extended the repayment period from 30 to 40 years and lowered the repayment threshold. While this reduces annual repayments, it increases total interest paid — and leaves most graduates paying for their entire working lives."
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
