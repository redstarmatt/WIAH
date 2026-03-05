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
  vacancyRatePct: number
  footfallVs2019?: number
  retailInsolvencies?: number
}

interface HighStreetVacancyData {
  timeSeries: TimeSeriesPoint[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function HighStreetVacancyPage() {
  const [data, setData] = useState<HighStreetVacancyData | null>(null)

  useEffect(() => {
    fetch('/data/high-street-vacancy/high_street_vacancy.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const vacancySeries: Series[] = data
    ? [{
        id: 'vacancy',
        label: 'High street vacancy rate (%)',
        colour: '#6B7280',
        data: data.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.vacancyRatePct,
        })),
      }]
    : []

  return (
    <>
      <TopicNav topic="High Street Vacancy" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="High Street Vacancy"
          question="Is the High Street Dying?"
          finding="Nearly one in seven retail units now stands empty — a vacancy rate of 13.9% that masks complete collapse in some market towns."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>UK high street vacancy peaked at 17.1% in 2020 and has partially recovered to 13.6% by 2024, driven by conversion of retail units to hospitality, leisure, healthcare, and residential use as online retail&rsquo;s share of total sales settled at around 26% &mdash; up from 7% in 2010 &mdash; making the property stock structurally oversupplied. National footfall reached approximately 90% of 2019 levels by 2024, recovering from 65% at the pandemic trough. Retail insolvencies hit 2,315 in 2023, the highest in a decade, concentrated in fashion and food service, as government pandemic support (furlough, rate relief, debt moratoriums) was withdrawn while cost inflation accelerated. The business rates system &mdash; taxing physical retail on assessable values with no equivalent burden on online distribution infrastructure &mdash; compounds the structural disadvantage for high-street traders.</p>
            <p>The headline national figure conceals profound geographic variation: vacancy rates of 25&ndash;30% in some market towns in the North and Midlands reflect a deeper structural collapse in which retail anchors have been removed without replacement. The most successful high streets have shifted to mixed-use destinations, but this transition requires active local authority planning intervention, change-of-use flexibility, and public realm investment that many councils &mdash; facing severe budget pressures &mdash; struggle to fund. The long-term trajectory is likely fewer but more resilient retail destinations, with the formerly dominant retail town centre format replaced by housing, community, and workspace use &mdash; a reinvention that requires both investment and acceptance that the twentieth-century model is not recoverable.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Vacancy Rate' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="High street vacancy rate"
              value="13.6%"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="slow improvement from 17% COVID peak &middot; still above 2015"
              sparklineData={[12.1, 11.8, 12.0, 12.3, 13.3, 17.1, 15.2, 14.8, 13.9, 13.6]}
              onExpand={() => {}}
              source="Local Data Company / British Retail Consortium &middot; 2024"
            />
            <MetricCard
              label="Footfall vs 2019"
              value="90%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="recovering &middot; online shift permanent but stabilising"
              sparklineData={[100, 100, 100, 100, 100, 65, 78, 87, 88, 90]}
              onExpand={() => {}}
              source="Springboard &middot; 2024"
            />
            <MetricCard
              label="Retail insolvencies"
              value="2,315"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="highest in a decade &middot; fashion and food hardest hit"
              sparklineData={[1820, 1900, 2000, 2050, 2140, 1800, 1750, 2190, 2315]}
              onExpand={() => {}}
              source="Insolvency Service &middot; 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="UK high street vacancy rate, 2015&ndash;2024"
              subtitle="Percentage of high street retail units standing empty. Peak of 17.1% in 2020 during pandemic lockdowns."
              series={vacancySeries}
              yLabel="Vacancy rate (%)"
              source={{
                name: 'Local Data Company / British Retail Consortium',
                dataset: 'UK High Street Vacancy Monitor',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Local Data Company &mdash; High Street and Retail Park Vacancy. localdatacompany.com</p>
            <p>British Retail Consortium &mdash; Retail Vacancy Monitor. brc.org.uk</p>
            <p>Springboard &mdash; UK Footfall Index. springboard.com</p>
            <p>Insolvency Service &mdash; Insolvency Statistics. gov.uk/government/collections/insolvency-service-official-statistics</p>
            <p>Vacancy rate covers GB high streets, retail parks, and shopping centres sampled by the Local Data Company. A unit is classified as vacant if it has been unoccupied for 6+ weeks. Footfall index covers approximately 3,000 locations nationally and is rebased to 2019=100. Retail insolvencies cover company insolvencies with SIC codes in retail trade.</p>
          </div>
        </section>
      </main>
    </>
  )
}
