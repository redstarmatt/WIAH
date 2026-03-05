'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface SmartMeterRolloutData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    installedM: number
    dumbModeM: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

export default function SmartMeterRolloutPage() {
  const [data, setData] = useState<SmartMeterRolloutData | null>(null)

  useEffect(() => {
    fetch('/data/smart-meter-rollout/smart_meter_rollout.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [
        {
          id: 'installed',
          label: 'Total installed',
          colour: '#2A9D8F',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.installedM,
          })),
        },
        {
          id: 'dumbMode',
          label: "In 'dumb mode'",
          colour: '#E63946',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.dumbModeM,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Smart Meter Rollout" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Smart Meter Rollout"
          question="How Many Homes Actually Have a Working Smart Meter?"
          finding="57% of UK homes have a smart meter, but 25% of installed meters are operating in &lsquo;dumb mode&rsquo; &mdash; not communicating with suppliers &mdash; undermining the programme&apos;s purpose."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The smart meter rollout is the largest infrastructure deployment programme in the UK energy sector since the construction of the National Grid. The programme, which began in 2012 with a target of universal installation by 2020 (later revised to 2024, then 2025), aims to replace every gas and electricity meter in Britain with a smart meter that can send real-time consumption data to energy suppliers, enabling accurate billing, time-of-use tariffs, and consumer feedback on energy use. By March 2024, approximately 35.7 million smart meters had been installed &mdash; 57% of all eligible meters &mdash; making the UK one of the largest smart meter deployments in Europe.</p>
            <p>The &apos;dumb mode&apos; problem has been one of the programme&apos;s most persistent technical challenges. The first generation of smart meters (SMETS1), installed primarily between 2014 and 2018, used proprietary communications systems that were tied to the installing supplier. When a customer switched energy supplier, the smart meter typically lost its communication capability and reverted to operating as a standard (dumb) meter, unable to transmit consumption data. An estimated 8.9 million SMETS1 meters were still in dumb mode as of 2024, representing approximately 25% of all installed smart meters. While a programme to remotely enrol SMETS1 meters into the national DCC communications system has been underway, migration has been slower than planned.</p>
            <p>The second generation smart meters (SMETS2), introduced from 2018, use a different communications architecture based on the national Data Communications Company (DCC) network. SMETS2 meters are portable across suppliers and should not lose their smart functionality on switching. However, installation rates for SMETS2 have been slower than initially planned, partly due to consumer resistance (a significant minority of households have declined installation), infrastructure challenges in rural areas with poor SMETS2 signal coverage, and the disruption caused by the energy supply crisis of 2021&ndash;22, which resulted in the collapse of multiple smaller suppliers and temporarily diverted installation capacity.</p>
            <p>The economics of smart meters depend on realising behavioural and efficiency savings that justify the &pound;13 billion programme cost. The Department for Energy Security and Net Zero estimates that a household with a working smart meter and access to in-home display saves an average of &pound;87 per year through improved awareness and behaviour change. This saving is real but relatively modest relative to the per-household cost of installation (approximately &pound;400). The larger economic case rests on system-level benefits: demand shifting through time-of-use tariffs, grid balancing using smart meter demand signals, and eventually integration with smart appliances and electric vehicle charging. These benefits are only realisable at scale with a high proportion of smart meters in active communication mode.</p>
            <p>The programme&apos;s revised trajectory under BEIS and DESNZ oversight aims to reach 80% installation coverage by 2025 and 90% by 2030. Achieving these targets requires resolving the SMETS1 dumb mode backlog, increasing installation rates in hard-to-reach properties (private rented sector, multiple occupancy buildings, and properties in poor SMETS2 signal areas), and managing consumer opt-out rates which run at approximately 5&ndash;10% of contacted households. The net zero transition significantly raises the stakes for smart meter ubiquity: demand-side flexibility &mdash; the ability to shift electricity consumption to periods of high renewable generation and low grid stress &mdash; becomes a critical component of system management as intermittent renewables reach 50&ndash;70% of the generation mix, and smart meters are the enabling infrastructure for that flexibility.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Rollout Progress' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Smart meters installed"
              value="35.7m"
              unit=""
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="35.7m &middot; 57% of all meters in Britain"
              sparklineData={[5.1, 8.2, 12.0, 16.3, 21.0, 24.5, 27.8, 31.0, 35.7]}
              onExpand={() => {}}
              source="DESNZ &middot; Smart Meters Statistical Release 2024"
            />
            <MetricCard
              label="Meters in &lsquo;dumb mode&rsquo;"
              value="8.9m"
              unit=""
              direction={'down' as const}
              polarity={'up-is-bad' as const}
              changeText="25% of installed not communicating"
              sparklineData={[2.0, 4.1, 7.8, 10.2, 11.5, 12.0, 11.0, 10.0, 8.9]}
              onExpand={() => {}}
              source="DESNZ &middot; Smart Meters Statistical Release 2024"
            />
            <MetricCard
              label="Estimated annual saving (working)"
              value="&pound;87"
              unit=""
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="&pound;87/yr avg when meter working properly"
              sparklineData={[45, 50, 55, 60, 65, 70, 75, 80, 87]}
              onExpand={() => {}}
              source="DESNZ &middot; Smart Meter Impact Assessment 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Smart meter installations vs dumb mode meters, 2016&ndash;2024"
              subtitle="Cumulative smart meters installed and number operating without communication capability."
              series={series}
              yLabel="Meters (millions)"
              source={{
                name: 'DESNZ',
                dataset: 'Smart Meters Statistical Release',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>DESNZ &mdash; Smart Meters Statistical Release. Published quarterly. gov.uk/government/collections/smart-meters-statistics</p>
            <p>DESNZ &mdash; Smart Meter Impact Assessment 2024. gov.uk/government/publications/smart-metering-implementation-programme-cost-benefit-analysis</p>
            <p>Installed meters are cumulative smart and advanced meters in operation. Dumb mode meters are SMETS1 installations not communicating via DCC network &mdash; ongoing remote enrolment means this figure changes quarterly. Annual saving estimate is mean household saving from DESNZ randomised control trial and econometric analysis.</p>
          </div>
        </section>
      </main>
    </>
  )
}
