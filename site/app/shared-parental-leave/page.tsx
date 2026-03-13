'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'HMRC', dataset: 'Shared Parental Leave and Pay Statistics', url: 'https://www.gov.uk/government/collections/hmrc-shared-parental-leave-and-pay-statistics', date: '2023', note: '3.6% of eligible fathers take SPL; up from 1% in 2015' },
  { num: 2, name: 'DWP', dataset: 'Statutory Payment Rates', url: 'https://www.gov.uk/maternity-pay-leave/pay', date: '2024', note: 'Statutory shared parental pay £184.03/week; 75% pay cut for median male earner' },
  { num: 3, name: 'TUC', dataset: 'Parental Leave Survey', url: 'https://www.tuc.org.uk/research-analysis/reports/', date: '2023', note: '78% of fathers take no leave beyond 2-week statutory paternity entitlement' },
];

// -- Types ------------------------------------------------------------------

interface SplEntry {
  year: number
  splTakeupPct: number
  weeksStatutoryPay?: number
}

interface SplData {
  timeSeries: SplEntry[]
  statutoryPayWeekly: number
  fathersNotTakingAnyLeavePct: number
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function SharedParentalLeavePage() {
  const [data, setData] = useState<SplData | null>(null)

  useEffect(() => {
    fetch('/data/shared-parental-leave/shared_parental_leave.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [{
        id: 'splTakeupPct',
        label: 'Father SPL take-up (%)',
        colour: '#F4A261',
        data: data.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.splTakeupPct,
        })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Shared Parental Leave" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Shared Parental Leave"
          question="Why Don&rsquo;t More Fathers Take Parental Leave?"
          finding="Only 3.6% of eligible fathers take shared parental leave — largely because statutory pay at £184 per week makes it financially impossible for most families."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Shared parental leave was introduced in April 2015 with the ambition of transforming the gender dynamics of childcare. Nearly a decade later, just 3.6% of eligible fathers take it — up from 1% in the first year, but far below the rates seen in Sweden, Norway, and Iceland.<Cite nums={1} /> The fundamental barrier is financial: statutory shared parental pay is £184.03 per week, meaning a father earning the median male wage of around £700 per week accepts a 75% pay cut to take leave.<Cite nums={2} /> Enhanced pay exists at some employers but is concentrated in larger, higher-paying organisations. Cultural barriers compound the financial ones — informal discouragement, career risk perceptions, and peer norms make leave-taking socially costly for men in manual occupations and small businesses in ways that surveys alone cannot capture. Countries with the highest take-up — Sweden, Norway, Iceland — use non-transferable &ldquo;daddy months&rdquo; at 80–90% pay replacement: the UK system has neither.</p>
            <p>The gender pay gap widens sharply at the point of childbirth and does not recover, because mothers take almost all the leave and fathers do not.<Cite nums={3} /> Women with children earn substantially less than women without, and the gap grows through their careers. Low paternal involvement in early childcare also has documented consequences for child development: early paternal engagement is associated with better cognitive and emotional outcomes, particularly for boys. The consequence of a policy that is financially prohibitive for most fathers is that these benefits remain unavailable to the majority, and the structural drivers of the gender pay gap remain in place.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Take-up Trend' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Father SPL take-up"
              value="3.6%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="tripled since 2015 · but still tiny"
              sparklineData={[1.0, 1.5, 2.0, 2.5, 2.8, 2.9, 3.1, 3.4, 3.6]}
              href="#sec-chart"source="HMRC · Shared Parental Leave Statistics 2023"
            />
            <MetricCard
              label="Fathers taking nothing"
              value="78%"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="78% take no leave at all beyond 2 weeks"
              sparklineData={[80, 80, 79, 79, 79, 78, 78, 78, 78]}
              href="#sec-chart"source="TUC · Parental Leave Survey 2023"
            />
            <MetricCard
              label="Statutory pay"
              value="£184/week"
              unit=""
              direction="flat"
              polarity="up-is-good"
              changeText="same as 2015 in nominal terms · real cut · too low for primary earners"
              sparklineData={[139, 140, 145, 148, 151, 156, 172, 156, 184]}
              href="#sec-chart"source="DWP · Statutory Payment Rates 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Father shared parental leave take-up, England, 2015–2023"
              subtitle="Percentage of eligible fathers who took any shared parental leave. Take-up has grown from 1% to 3.6% but remains far below the rates seen in countries with high pay replacement rates."
              series={series}
              yLabel="Take-up (%)"
              source={{
                name: 'HMRC',
                dataset: 'Shared Parental Leave and Pay Statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>HMRC — Shared Parental Leave and Pay Statistics. Annual release of take-up data. gov.uk/government/collections/hmrc-shared-parental-leave-and-pay-statistics</p>
            <p>TUC — Parental Leave Survey. Annual survey of fathers and employers on leave behaviour. tuc.org.uk/research-analysis/reports/</p>
            <p>DWP — Statutory Maternity, Paternity, Adoption and Shared Parental Pay rates. gov.uk/maternity-pay-leave/pay</p>
            <p>Take-up is defined as the percentage of eligible fathers (those whose partner took maternity leave or pay) who made any claim for shared parental leave. &ldquo;Fathers taking nothing&rdquo; refers to fathers taking no leave beyond the statutory 2-week paternity entitlement. Statutory pay rate for 2024 is £184.03 per week (or 90% of average weekly earnings if lower). Rate data are nominal and not adjusted for inflation.</p>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  )
}
