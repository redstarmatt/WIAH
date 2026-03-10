'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import RelatedTopics from '@/components/RelatedTopics';

// -- Types ------------------------------------------------------------------

interface TimeSeries {
  year: number
  seMedianWealthK?: number
  neMedianWealthK?: number
  gapRatio?: number
}

interface GeographicWealthData {
  timeSeries: TimeSeries[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function GeographicWealthInequalityPage() {
  const [data, setData] = useState<GeographicWealthData | null>(null)

  useEffect(() => {
    fetch('/data/geographic-wealth-inequality/geographic_wealth_inequality.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const wealthSeries: Series[] = data
    ? [
        {
          id: 'se-wealth',
          label: 'South East median wealth (£k)',
          colour: '#E63946',
          data: data.timeSeries
            .filter(d => d.seMedianWealthK !== undefined)
            .map(d => ({ date: yearToDate(d.year), value: d.seMedianWealthK as number })),
        },
        {
          id: 'ne-wealth',
          label: 'North East median wealth (£k)',
          colour: '#264653',
          data: data.timeSeries
            .filter(d => d.neMedianWealthK !== undefined)
            .map(d => ({ date: yearToDate(d.year), value: d.neMedianWealthK as number })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Geographic Wealth Inequality" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Geographic Wealth Inequality"
          question="How Unequal Is Wealth Across Britain?"
          finding="Households in South East England are on average three times wealthier than households in the North East — a gap that has widened since the financial crisis."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Britain&rsquo;s regional wealth divide is not primarily about income — it is about property. Median total household wealth in the South East (approximately £510,000 in 2023) is roughly three times that in the North East (£168,000), a gap that has grown from 2.2&times; in 2010 to 3.0&times; today, driven almost entirely by differential house price growth. London and the South East saw the most dramatic house price inflation of the 2010s; the North East, Midlands, and parts of the North West saw far more modest gains. The Levelling Up agenda, announced in 2020, was the stated policy response; the UK2070 Commission found its commitments fell substantially short of the scale required, and the 2024 change of government brought a shift in framing but no resolution to the underlying tension between ambition and resource.</p>
            <p>The wealth gap compounds in ways that earnings data does not capture. A household in the South East that owns a £500,000 home can borrow against it, weather financial shocks by releasing equity, and pass on substantial assets to children — while a household in the North East in equivalent rented accommodation accumulates nothing and is far more exposed to job loss or illness. The same income produces very different financial security depending on whether regional property markets have delivered wealth accumulation on top of it. Remote working after COVID-19 offered a partial corrective, but the effect has largely reversed as hybrid working settled at two or three office days, maintaining the premium on London proximity — and the gains accrued mainly to existing homeowners, not low-income local residents.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Regional Wealth' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="South East median household wealth"
              value="£510k"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="house price inflation driving wealth accumulation"
              sparklineData={[280, 310, 360, 400, 440, 470, 495, 503, 510]}
              href="#sec-chart"source="ONS Wealth and Assets Survey · Wave 7 2022"
            />
            <MetricCard
              label="North East median household wealth"
              value="£168k"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="modest growth but widening gap"
              sparklineData={[130, 132, 140, 148, 155, 160, 162, 165, 168]}
              href="#sec-chart"source="ONS Wealth and Assets Survey · Wave 7 2022"
            />
            <MetricCard
              label="SE vs NE wealth gap"
              value="3.0&times;"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="from 2.2&times; in 2010 · property the key driver"
              sparklineData={[2.2, 2.3, 2.6, 2.7, 2.8, 2.9, 3.0, 3.0, 3.0]}
              href="#sec-chart"source="ONS Wealth and Assets Survey · 2022"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Median household wealth by region, 2010–2023"
              subtitle="Median total household wealth (£000s) in South East and North East England. Includes property, financial, and pension wealth."
              series={wealthSeries}
              yLabel="Median wealth (£000s)"
              source={{
                name: 'ONS',
                dataset: 'Wealth and Assets Survey',
                frequency: 'biennial',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>ONS — Wealth and Assets Survey (WAS). Published biennially. ons.gov.uk/peoplepopulationandcommunity/personalandhouseholdfinances/debt/bulletins/wealthingreatbritainwave</p>
            <p>Resolution Foundation — Wealth in Great Britain. resolutionfoundation.org</p>
            <p>UK2070 Commission — Make No Little Plans. uk2070.org.uk</p>
            <p>Median wealth figures from ONS WAS waves 1–7 (2006–2020). Regional classifications use ONS Government Office Regions. Total wealth includes property wealth (net of mortgage), financial wealth, physical wealth, and private pension wealth. Figures in 2023 prices using CPI deflator. Intermediate years estimated by linear interpolation between survey waves.</p>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  )
}
