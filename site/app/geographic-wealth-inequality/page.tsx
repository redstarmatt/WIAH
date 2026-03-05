'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

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
          finding="Households in South East England are on average three times wealthier than households in the North East &mdash; a gap that has widened since the financial crisis."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Britain&rsquo;s regional wealth divide is not primarily about income &mdash; it is about property. Wages vary between regions, but not by a factor of three. Median total household wealth in the South East (approximately &pound;510,000 in 2023) is roughly three times that in the North East (&pound;168,000). The gap has grown substantially since 2010, driven almost entirely by differential house price growth. London and the South East saw the most dramatic house price inflation in the 2010s; the North East, Midlands, and parts of the North West saw much more modest gains.</p>
            <p>The wealth gap compounds in ways that earnings data does not capture. A household in the South East that owns a &pound;500,000 home can borrow against it, can weather financial shocks by releasing equity, and will pass on substantial assets to children. A household in the North East in equivalent rented accommodation accumulates no housing wealth, cannot borrow against property, and is far more financially exposed to job loss or illness. The same income produces very different financial security depending on whether housing tenure and regional property markets have delivered wealth accumulation on top of it.</p>
            <p>The Levelling Up agenda, announced in 2020 and formulated through the subsequent White Paper, was the government&rsquo;s stated response to regional inequality. The agenda focused on infrastructure investment, R&amp;D spending, and public service improvement in left-behind regions. Analysis by the UK2070 Commission and others found the commitments fell substantially short of the scale of intervention required to close regional wealth gaps &mdash; and that, in any case, physical and economic regeneration operates on timescales of decades, not political cycles. The 2024 change of government brought a shift in framing but a similar tension between ambition and resource.</p>
            <p>Remote working, accelerated by COVID-19, offered one potential mechanism for regional rebalancing: if high-wage workers could live in lower-cost areas while drawing London salaries, some wealth might redistribute geographically. The evidence on this so far is mixed. Some smaller cities and coastal areas saw significant house price growth as remote workers moved out of London &mdash; but this effect has partially reversed as hybrid working settled at two or three days in-office, maintaining the premium on London proximity. The benefits of remote working have primarily accrued to existing homeowners in those areas, not to low-income local residents.</p>
            <p>The policy levers for narrowing the geographic wealth gap are limited and politically constrained. A land value tax would theoretically capture some of the windfall from location-specific land appreciation and redistribute it. Inheritance tax reform would reduce the dynastic compounding of geographically-concentrated wealth. Expanded social housing in high-demand areas would reduce the premium on private ownership. None of these interventions is straightforward to implement, and all face significant political resistance. The structural forces driving geographic wealth concentration &mdash; agglomeration economies, planning constraints, and the self-reinforcing dynamics of local labour markets &mdash; are not easily reversed by policy alone.</p>
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
              value="&pound;510k"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="house price inflation driving wealth accumulation"
              sparklineData={[280, 310, 360, 400, 440, 470, 495, 503, 510]}
              onExpand={() => {}}
              source="ONS Wealth and Assets Survey &middot; Wave 7 2022"
            />
            <MetricCard
              label="North East median household wealth"
              value="&pound;168k"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="modest growth but widening gap"
              sparklineData={[130, 132, 140, 148, 155, 160, 162, 165, 168]}
              onExpand={() => {}}
              source="ONS Wealth and Assets Survey &middot; Wave 7 2022"
            />
            <MetricCard
              label="SE vs NE wealth gap"
              value="3.0&times;"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="from 2.2&times; in 2010 &middot; property the key driver"
              sparklineData={[2.2, 2.3, 2.6, 2.7, 2.8, 2.9, 3.0, 3.0, 3.0]}
              onExpand={() => {}}
              source="ONS Wealth and Assets Survey &middot; 2022"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Median household wealth by region, 2010&ndash;2023"
              subtitle="Median total household wealth (&pound;000s) in South East and North East England. Includes property, financial, and pension wealth."
              series={wealthSeries}
              yLabel="Median wealth (&pound;000s)"
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
            <p>ONS &mdash; Wealth and Assets Survey (WAS). Published biennially. ons.gov.uk/peoplepopulationandcommunity/personalandhouseholdfinances/debt/bulletins/wealthingreatbritainwave</p>
            <p>Resolution Foundation &mdash; Wealth in Great Britain. resolutionfoundation.org</p>
            <p>UK2070 Commission &mdash; Make No Little Plans. uk2070.org.uk</p>
            <p>Median wealth figures from ONS WAS waves 1&ndash;7 (2006&ndash;2020). Regional classifications use ONS Government Office Regions. Total wealth includes property wealth (net of mortgage), financial wealth, physical wealth, and private pension wealth. Figures in 2023 prices using CPI deflator. Intermediate years estimated by linear interpolation between survey waves.</p>
          </div>
        </section>
      </main>
    </>
  )
}
