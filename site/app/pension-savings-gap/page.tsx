'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

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
            <p>The median pension pot for a 55-year-old in the UK stands at approximately £72,000 &mdash; a figure that sounds substantial until set against the cost of retirement. Financial planners typically estimate that a comfortable retirement requires an income of approximately £37,300 per year for a single person, which at prevailing annuity rates requires a private pension pot in excess of £200,000, supplemented by the state pension. At the current median, most people approaching retirement are facing a significant shortfall. The aggregate gap between what has been saved and what will be needed &mdash; estimated at £350 billion by the Pensions Policy Institute &mdash; is the largest unremarked financial risk in the UK economy.</p>
            <p>Auto-enrolment, introduced in 2012, has been the most significant structural intervention in UK pension saving of the past two decades. By 2024, approximately 22 million workers were enrolled in workplace pension schemes, a dramatic increase from the pre-auto-enrolment era. But auto-enrolment has a significant design limitation: it does not apply to self-employed workers, who must make their own arrangements. Among the self-employed &mdash; who number approximately 4.5 million &mdash; 39% have no private pension savings whatsoever. This is not primarily a matter of financial irresponsibility: self-employed incomes are often volatile, the lack of employer contribution removes a major incentive, and the administrative burden of making irregular pension contributions is significant for people without payroll infrastructure.</p>
            <p>The contribution rates mandated by auto-enrolment are also widely regarded as insufficient for a comfortable retirement. The minimum contribution of 8% of qualifying earnings (3% employer, 5% employee) was designed as a floor, not a target. Independent analysis consistently suggests that workers need to contribute 12&ndash;15% of earnings throughout their working life to achieve a comfortable retirement income. Very few workers contribute above the minimum; many contribute exactly the minimum and no more. The Pensions and Lifetime Savings Association advocates for a significant increase in auto-enrolment minimum contributions, but any increase would reduce take-home pay and faces political resistance.</p>
            <p>The shift from defined benefit (DB) to defined contribution (DC) pension schemes has transferred investment risk from employers to individuals. In a DB scheme, the employer bears the risk that investment returns are insufficient to fund the promised pension. In DC, the individual bears that risk: if markets perform poorly in the years approaching retirement, the pot available at retirement is smaller, regardless of what the individual contributed. The widespread closure of DB schemes in the private sector since the 1990s means most workers under 45 are entirely exposed to this investment risk. Their retirement outcomes will be determined not just by how much they save but by market conditions over which they have no control.</p>
            <p>The policy response to the pension savings gap is evolving. The Mansion House reforms aim to direct DC pension funds toward longer-term, higher-return investments including infrastructure and private equity, in the hope of improving returns for savers. The government has also committed to lowering the age threshold for auto-enrolment from 22 to 18 and removing the lower qualifying earnings threshold, which would extend coverage to younger and lower-paid workers. Whether these reforms will materially close the savings gap depends on implementation pace and whether workers who have not previously saved respond to the changes in their expected way.</p>
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
              onExpand={() => {}}
              source="Pensions Policy Institute &middot; 2023"
            />
            <MetricCard
              label="Self-employed with no pension"
              value="39%"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="3.3 million people saving nothing"
              sparklineData={[41, 40, 40, 39, 38, 39, 39, 39, 39]}
              onExpand={() => {}}
              source="DWP &middot; Family Resources Survey 2023"
            />
            <MetricCard
              label="Aggregate pension savings gap"
              value="£350bn"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="aggregate shortfall &middot; growing 5% a year"
              sparklineData={[290, 295, 300, 305, 310, 315, 320, 330, 350]}
              onExpand={() => {}}
              source="Pensions Policy Institute &middot; 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Median pension pot at age 55, 2015&ndash;2023"
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

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Pensions Policy Institute &mdash; UK Pension Adequacy Research. pensionspolicyinstitute.org.uk</p>
            <p>DWP &mdash; Family Resources Survey. gov.uk/government/collections/family-resources-survey--2</p>
            <p>ONS &mdash; Wealth and Assets Survey. ons.gov.uk/peoplepopulationandcommunity/personalandhouseholdfinances/debt/bulletins/wealthingreatbritainwave</p>
            <p>Median pension pot is estimated from the Wealth and Assets Survey and Pensions Policy Institute modelling. The savings gap is a modelled estimate of the difference between projected pension wealth and the wealth required to fund a moderate retirement income (as defined by the PLSA Retirement Living Standards). Self-employed pension participation is from the Family Resources Survey; self-employed includes both sole traders and directors of owner-managed companies.</p>
          </div>
        </section>
      </main>
    </>
  )
}
