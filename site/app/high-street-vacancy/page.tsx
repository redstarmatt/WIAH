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
            <p>UK high street vacancy rates peaked at 17.1% in 2020 as the pandemic forced the closure of non-essential retail and accelerated a structural shift toward online shopping that had been building for a decade. The subsequent partial recovery &mdash; to 13.6% by 2024 &mdash; reflects both genuine recovery in footfall-driven formats such as food and beverage, health and beauty, and leisure, and the conversion of former retail units to residential, office, and service uses. But the headline figure conceals profound geographic variation: in some market towns in the North and Midlands, vacancy rates of 25&ndash;30% reflect a deeper structural collapse in which the economic anchor of retail has been removed without obvious replacement.</p>
            <p>The structural drivers of high street vacancy are well understood and pre-date the pandemic. Online retail&rsquo;s share of total retail sales grew from approximately 7% in 2010 to 28% at the pandemic peak before settling at around 26% in 2023 &mdash; a permanent shift that means the retail property stock built for a lower-online-share world is structurally oversupplied. The problem is compounded by the business rates system, which taxes physical retail properties based on assessable rental values last set in 2021 and applies at rates that many retailers argue are incompatible with profitable trading in high-cost town centres. Online retailers face no equivalent property cost burden for their distribution infrastructure.</p>
            <p>Footfall recovery has been partial and uneven. National footfall reached approximately 90% of 2019 levels by 2024, compared to 65% at the pandemic trough, suggesting that people have not stopped visiting town centres but have changed how they use them. The most successful high streets have shifted from retail-dominated to mixed-use destinations, with hospitality, leisure, healthcare, and services replacing former retail units. But this transition requires active local authority intervention, planning flexibility to enable change of use, and investment in public realm and accessibility that many local councils &mdash; dealing with severe budget pressures &mdash; struggle to fund.</p>
            <p>Retail insolvencies reached their highest level in a decade in 2023, at 2,315 cases. The concentration in fashion retail and food service reflects the particular vulnerability of sectors with thin margins, high fixed costs in rent and staffing, and direct competition from online substitutes. Several major retail chains that had survived the pandemic through government support &mdash; furlough, business rate relief, debt moratoriums &mdash; encountered difficulty when that support was withdrawn and cost inflation accelerated in 2022. Their failure creates both further vacancy and a loss of anchor function in the centres they had occupied.</p>
            <p>The government has introduced a range of measures aimed at high street recovery, including the High Streets Task Force, levelling up funding for town centre regeneration, and reforms to permitted development rights that allow empty retail units to be converted to housing without full planning permission. The long-term trajectory for high streets is likely to be fewer, smaller, but more resilient retail destinations serving primarily convenience, experience, and service functions &mdash; with former retail space repurposed for housing, community, and workspace use. This is not the death of the high street but its reinvention, which requires both investment and a willingness to accept that the format of the twentieth-century high street cannot be preserved in the twenty-first.</p>
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
