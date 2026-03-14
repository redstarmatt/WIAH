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
  { num: 1, name: 'Pensions Policy Institute', dataset: 'UK Pension Adequacy Research', url: 'https://www.pensionspolicyinstitute.org.uk/', date: '2023', note: 'Aggregate savings gap estimated at £350bn' },
  { num: 2, name: 'DWP', dataset: 'Family Resources Survey', url: 'https://www.gov.uk/government/collections/family-resources-survey--2', date: '2023', note: '39% of self-employed saving nothing for retirement' },
  { num: 3, name: 'ONS', dataset: 'Wealth and Assets Survey', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/personalandhouseholdfinances/debt/bulletins/wealthingreatbritainwave', date: '2023', note: 'Median pension pot at 55 approximately £72,000' },
];

// -- Types ------------------------------------------------------------------

interface TimeSeriesPoint {
  year: number
  medianPotAt55: number
  selfEmployedNoPension: number
  savingsGapBn?: number
}

interface PensionSavingsGapData {
  timeSeries: TimeSeriesPoint[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function PensionSavingsGapPage() {
  const [data, setData] = useState<PensionSavingsGapData | null>(null)

  useEffect(() => {
    fetch('/data/pension-savings-gap/pension_savings_gap.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const medianPotSeries: Series[] = data
    ? [{
        id: 'median-pot',
        label: 'Median pension pot at 55 (£)',
        colour: '#E63946',
        data: data.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.medianPotAt55,
        })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Pension Savings Gap" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Pension Savings Gap"
          question="Will You Have Enough to Retire On?"
          finding="The UK faces a £350 billion pension savings gap, with 39% of self-employed workers saving nothing for retirement."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The median pension pot for a 55-year-old stands at approximately £72,000 — well below the £200,000+ required for a comfortable retirement when combined with the state pension.<Cite nums={3} /> The aggregate savings gap is estimated at £350 billion by the Pensions Policy Institute and is growing at roughly 5% per year.<Cite nums={1} /> Auto-enrolment has expanded pension participation from 47% to 88% of eligible employees since 2012, but design limitations leave 39% of self-employed workers — around 1.75 million people — saving nothing for retirement.<Cite nums={2} /> The minimum 8% contribution rate (3% employer, 5% employee) is estimated to be roughly half what is needed for a moderate retirement income, and very few workers voluntarily exceed the minimum.</p>
            <p>The savings gap falls hardest on those with the least capacity to compensate. Women face a particularly acute shortfall because career breaks for caring reduce both savings years and state pension entitlement; the gender pension gap sees women receive around £7,900 less per year in private pension income than men.<Cite nums={3} /> Workers in low-paid, part-time, or gig economy roles — disproportionately from minority ethnic backgrounds — combine low contribution rates with exclusion from the auto-enrolment earnings threshold.<Cite nums={2} /> The shift from defined benefit to defined contribution schemes over the past three decades has transferred investment risk entirely to individuals, meaning retirement outcomes now depend on market conditions over which savers have no control.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Median Pot' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Median pension pot at 55"
              value="£72,000"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="but needs £200k+ for comfortable retirement"
              sparklineData={[61000, 63000, 65000, 67000, 68000, 69000, 70000, 71000, 72000]}
              href="#sec-chart"source="Pensions Policy Institute · 2023"
            />
            <MetricCard
              label="Self-employed with no pension"
              value="39%"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="3.3 million people saving nothing"
              sparklineData={[41, 40, 40, 39, 38, 39, 39, 39, 39]}
              href="#sec-chart"source="DWP · Family Resources Survey 2023"
            />
            <MetricCard
              label="Aggregate pension savings gap"
              value="£350bn"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="aggregate shortfall · growing 5% a year"
              sparklineData={[290, 295, 300, 305, 310, 315, 320, 330, 350]}
              href="#sec-chart"source="Pensions Policy Institute · 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Median pension pot at age 55, 2015–2023"
              subtitle="Median private pension wealth for those aged 55. A comfortable retirement typically requires £200,000+ in addition to the state pension."
              series={medianPotSeries}
              yLabel="Pension pot (£)"
              source={{
                name: 'Pensions Policy Institute',
                dataset: 'UK Pension Adequacy Research',
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
            <p>Pensions Policy Institute — UK Pension Adequacy Research. pensionspolicyinstitute.org.uk</p>
            <p>DWP — Family Resources Survey. gov.uk/government/collections/family-resources-survey--2</p>
            <p>ONS — Wealth and Assets Survey. ons.gov.uk/peoplepopulationandcommunity/personalandhouseholdfinances/debt/bulletins/wealthingreatbritainwave</p>
            <p>Median pension pot is estimated from the Wealth and Assets Survey and Pensions Policy Institute modelling. The savings gap is a modelled estimate of the difference between projected pension wealth and the wealth required to fund a moderate retirement income (as defined by the PLSA Retirement Living Standards). Self-employed pension participation is from the Family Resources Survey; self-employed includes both sole traders and directors of owner-managed companies.</p>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  )
}
