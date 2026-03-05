'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface DrinkDriveRow {
  year: number
  deaths?: number
  seriousInjuries?: number
  convictions?: number
}

interface DrinkDriveDeathsData {
  topic: string
  lastUpdated: string
  timeSeries: DrinkDriveRow[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function DrinkDriveDeathsPage() {
  const [data, setData] = useState<DrinkDriveDeathsData | null>(null)

  useEffect(() => {
    fetch('/data/drink-drive-deaths/drink_drive_deaths.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const deathsSeries: Series[] = data
    ? [
        {
          id: 'deaths',
          label: 'Drink-drive deaths',
          colour: '#E63946',
          data: data.timeSeries
            .filter(d => d.deaths !== undefined)
            .map(d => ({
              date: yearToDate(d.year),
              value: d.deaths!,
            })),
        },
      ]
    : []

  const injuriesSeries: Series[] = data
    ? [
        {
          id: 'seriousInjuries',
          label: 'Serious injuries',
          colour: '#F4A261',
          data: data.timeSeries
            .filter(d => d.seriousInjuries !== undefined)
            .map(d => ({
              date: yearToDate(d.year),
              value: d.seriousInjuries!,
            })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Drink Drive Deaths" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Drink Drive Deaths"
          question="Is Drink Driving Still Killing People?"
          finding="280 people died in drink-drive collisions in 2022 &mdash; the same number as a decade ago, despite stricter enforcement and campaigning."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Drink driving deaths in Great Britain fell dramatically through the 1970s, 1980s, and 1990s as the legal limit was introduced, enforcement expanded, and social attitudes shifted. By the early 2010s, however, that progress had stalled. Deaths have oscillated between 210 and 290 per year for over a decade, with no sustained downward trend. The 2020 figure of 210 was an anomaly driven by pandemic lockdowns reducing road traffic; once traffic returned to normal in 2021 and 2022, casualties rose back to the pre-pandemic range. In 2023, 270 people died in drink-drive collisions.</p>
            <p>England and Wales retain the highest legal alcohol limit for driving in Western Europe at 80mg per 100ml of blood. Scotland lowered its limit to 50mg in 2014 &mdash; in line with the rest of Europe &mdash; and recorded a measurable reduction in drink-drive casualties in the period following the change. The Department for Transport has repeatedly reviewed the case for lowering the limit in England and Wales, and multiple road safety organisations, the British Medical Association, and the Parliamentary Advisory Council for Transport Safety have recommended the change. Ministers have consistently declined to act, citing concerns about rural communities and hospitality industry impacts.</p>
            <p>The evidential basis for a lower limit is strong. At 50mg, drivers have substantially reduced reaction times compared to zero alcohol, but are still significantly more impaired than those just below the 80mg limit. The drink-drive deaths that occur in England and Wales include a significant proportion of drivers who are over the 50mg limit but below the 80mg limit &mdash; a group who would be prosecuted in Scotland and most of the EU but who are legal drivers in England and Wales. Modelling by the Transport Research Laboratory estimated that lowering the limit would prevent around 25 deaths per year in England alone.</p>
            <p>Enforcement is the other lever. The number of breath tests administered by police has fallen substantially since 2009 as officer numbers fell and breath testing operations were deprioritised. Random breath testing &mdash; which does not require police to have reasonable grounds for suspicion &mdash; is not currently permitted in England and Wales, unlike in many European countries. The combination of a higher legal limit and lower enforcement intensity creates a permissive environment by international standards. Conviction rates remain relatively high for those caught &mdash; around 73,000 per year &mdash; because the evidential standard is straightforward, but the deterrent effect depends on the probability of being caught, which has fallen as visible enforcement has declined.</p>
            <p>The moral arithmetic is clear: around 270 people a year die in collisions involving a driver over the legal limit. This figure has not changed materially in a decade. A proven intervention &mdash; lowering the legal limit &mdash; is available, has been implemented without apparent harm in Scotland and across Europe, and has an evidence base supporting its effectiveness. The decision not to implement it is a political choice with measurable, fatal consequences. Road safety campaigners and bereaved families continue to press for change, but successive governments have chosen not to act. The result is a plateau of preventable deaths that enforcement and campaigning alone are failing to shift.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Deaths &amp; Injuries' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Deaths 2023"
              value="270"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="no long-term progress since 2012"
              sparklineData={[260, 240, 250, 280, 290, 210, 260, 280, 270]}
              onExpand={() => {}}
              source="DfT &middot; Reported Road Casualties 2023"
            />
            <MetricCard
              label="Serious injuries"
              value="1,290"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="plateau in casualties since 2012 &middot; limit discussion needed"
              sparklineData={[1200, 1110, 1170, 1330, 1320, 970, 1180, 1360, 1290]}
              onExpand={() => {}}
              source="DfT &middot; Reported Road Casualties 2023"
            />
            <MetricCard
              label="England/Wales limit"
              value="80mg/100ml"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="vs Scotland&apos;s 50mg &middot; evidence supports lower limit"
              sparklineData={[80, 80, 80, 80, 80, 80, 80, 80, 80]}
              onExpand={() => {}}
              source="Road Traffic Act 1988 &middot; unchanged since 1967"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Drink-drive deaths and serious injuries, 2012&ndash;2023"
              subtitle="Reported road casualties in collisions where at least one driver was over the legal limit. Great Britain."
              series={[...deathsSeries, ...injuriesSeries]}
              yLabel="Casualties"
              source={{
                name: 'Department for Transport',
                dataset: 'Reported Road Casualties Great Britain',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Department for Transport &mdash; Reported Road Casualties Great Britain. Annual statistical release including drink-drive casualty estimates. gov.uk/government/collections/road-accidents-and-safety-statistics</p>
            <p>Ministry of Justice &mdash; Criminal Justice Statistics. Drink-drive convictions by offence type. gov.uk/government/collections/criminal-justice-statistics</p>
            <p>Transport Research Laboratory &mdash; Evidence base for lower legal alcohol limit. trl.co.uk</p>
            <p>Drink-drive casualties are estimated figures, not exact counts. Police record whether drink driving was a contributory factor at the scene. The DfT applies a statistical model to adjust for underreporting and non-breathalysted casualties, producing annual estimates. These estimates carry uncertainty and are revised on a rolling 3-year basis. The legal limit of 80mg/100ml of blood (equivalent to 35 micrograms per 100ml of breath) has applied in England and Wales since 1967.</p>
          </div>
        </section>
      </main>
    </>
  )
}
