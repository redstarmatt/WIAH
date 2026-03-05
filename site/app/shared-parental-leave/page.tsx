'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

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
          finding="Only 3.6% of eligible fathers take shared parental leave &mdash; largely because statutory pay at &pound;184 per week makes it financially impossible for most families."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Shared parental leave (SPL) was introduced in April 2015 with the ambition of transforming the gender dynamics of childcare by enabling parents to divide leave more flexibly. Nearly a decade later, the policy has largely failed to achieve its goals. Just 3.6% of eligible fathers take SPL &mdash; a figure that has crept up from 1% in the first year but remains far below the government&rsquo;s original aspiration and far below the rates seen in countries like Sweden, Norway, and Iceland where paternity and parental leave policies are more generous and better designed.</p>
            <p>The fundamental barrier is financial. Statutory shared parental pay is set at the same level as statutory maternity pay: &pound;184.03 per week, or 90% of average weekly earnings if that is lower. For a father earning the median male wage of around &pound;700 per week, taking SPL means accepting a pay cut of approximately 75%. For families where the father is the primary earner &mdash; which remains the majority, particularly in households with young children &mdash; this is financially prohibitive. Workplace enhanced SPL pay is available at some employers, but it is concentrated in larger, higher-paying organisations and is far from universal.</p>
            <p>Cultural barriers compound the financial ones. Many fathers report that while SPL is technically available to them, workplace cultures make it difficult to use in practice. Informal discouragement, perceptions of career risk, and lack of visible senior role models taking leave all deter take-up. Men in manual occupations and small businesses face particular barriers: their employers are less likely to offer enhanced pay, and peer norms around masculinity and work make leave-taking socially costly in ways that surveys alone cannot fully capture.</p>
            <p>The consequences of low paternal involvement in early childcare extend beyond gender equality. Evidence from developmental psychology consistently finds that early paternal engagement is associated with better cognitive and emotional outcomes for children, particularly boys. The design of leave policy has direct effects on gender pay gaps: the gender pay gap widens sharply at the point of childbirth, and does not recover, because mothers take most of the leave and fathers do not. Until leave policy creates genuine financial incentives for fathers to take substantial leave, the structural drivers of the gender pay gap will remain.</p>
            <p>International evidence points clearly to what works. Countries with the highest father leave take-up &mdash; Sweden, Norway, Iceland, Japan &mdash; share common features: high replacement rates (typically 80-90% of earnings), non-transferable &ldquo;daddy months&rdquo; that fathers lose if unused, and cultural normalisation of paternal leave as an expectation rather than an indulgence. The UK system has none of these features. Reform &mdash; specifically, a meaningful increase in pay replacement rates and the introduction of non-transferable periods for each parent &mdash; would be transformative. It would also cost money that successive governments have been unwilling to commit.</p>
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
              changeText="tripled since 2015 &middot; but still tiny"
              sparklineData={[1.0, 1.5, 2.0, 2.5, 2.8, 2.9, 3.1, 3.4, 3.6]}
              onExpand={() => {}}
              source="HMRC &middot; Shared Parental Leave Statistics 2023"
            />
            <MetricCard
              label="Fathers taking nothing"
              value="78%"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="78% take no leave at all beyond 2 weeks"
              sparklineData={[80, 80, 79, 79, 79, 78, 78, 78, 78]}
              onExpand={() => {}}
              source="TUC &middot; Parental Leave Survey 2023"
            />
            <MetricCard
              label="Statutory pay"
              value="&pound;184/week"
              unit=""
              direction="flat"
              polarity="up-is-good"
              changeText="same as 2015 in nominal terms &middot; real cut &middot; too low for primary earners"
              sparklineData={[139, 140, 145, 148, 151, 156, 172, 156, 184]}
              onExpand={() => {}}
              source="DWP &middot; Statutory Payment Rates 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Father shared parental leave take-up, England, 2015&ndash;2023"
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

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>HMRC &mdash; Shared Parental Leave and Pay Statistics. Annual release of take-up data. gov.uk/government/collections/hmrc-shared-parental-leave-and-pay-statistics</p>
            <p>TUC &mdash; Parental Leave Survey. Annual survey of fathers and employers on leave behaviour. tuc.org.uk/research-analysis/reports/</p>
            <p>DWP &mdash; Statutory Maternity, Paternity, Adoption and Shared Parental Pay rates. gov.uk/maternity-pay-leave/pay</p>
            <p>Take-up is defined as the percentage of eligible fathers (those whose partner took maternity leave or pay) who made any claim for shared parental leave. &ldquo;Fathers taking nothing&rdquo; refers to fathers taking no leave beyond the statutory 2-week paternity entitlement. Statutory pay rate for 2024 is &pound;184.03 per week (or 90% of average weekly earnings if lower). Rate data are nominal and not adjusted for inflation.</p>
          </div>
        </section>
      </main>
    </>
  )
}
