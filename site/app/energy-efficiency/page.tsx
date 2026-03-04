'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface EnergyEfficiencyData {
  national: {
    epcRating: Array<{ year: number; pctAtCOrAbove: number }>
    heatPumps: Array<{ year: number; installations: number }>
  }
}

function yearToDate(y: number): Date {
  return new Date(y, 5, 1)
}

export default function EnergyEfficiencyPage() {
  const [data, setData] = useState<EnergyEfficiencyData | null>(null)

  useEffect(() => {
    fetch('/data/energy-efficiency/energy_efficiency.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const epcSeries: Series[] = data
    ? [{
        id: 'epc',
        label: 'Homes rated EPC C or above',
        colour: '#2A9D8F',
        data: data.national.epcRating.map(d => ({ date: yearToDate(d.year), value: d.pctAtCOrAbove })),
      }]
    : []

  const heatPumpSeries: Series[] = data
    ? [{
        id: 'heat-pumps',
        label: 'Annual heat pump installations',
        colour: '#264653',
        data: data.national.heatPumps.map(d => ({ date: yearToDate(d.year), value: d.installations / 1000 })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Energy Efficiency" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Energy Efficiency"
          question="Are Britain&apos;s Homes Actually Getting More Efficient?"
          finding="Only 49&percnt; of English homes have an EPC rating of C or above, against a target of 100&percnt; by 2035. Heat pump installations reached 72,000 in 2024 &mdash; less than 12&percnt; of the 600,000 per year needed to meet net zero targets."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK has 29.2 million homes, and heating them accounts for approximately 17&percnt; of national greenhouse gas emissions. Some 19 million of those homes are heated by natural gas boilers. The government&apos;s stated ambition is for all homes to achieve an Energy Performance Certificate (EPC) rating of C or above by 2035, but as of 2024 only 49&percnt; of English homes meet this standard. The English Housing Survey found that 12.7 million homes remain at EPC D or below, with 3.2 million at EPC E, F, or G &mdash; the worst categories. Bringing all homes to EPC C would require retrofitting insulation, upgrading windows, and in many cases replacing heating systems, at an estimated aggregate cost of &pound;65&ndash;&pound;80 billion. Annual government spending on residential energy efficiency measures stands at around &pound;1.3 billion &mdash; roughly one-fiftieth of the total needed.</p>
            <p>Heat pump installations have grown but remain far below the trajectory required. The Microgeneration Certification Scheme (MCS) recorded 72,000 installations in 2024, up from 19,000 in 2017. The government&apos;s heat and buildings strategy requires 600,000 installations per year by the late 2020s to be on track for net zero. The Boiler Upgrade Scheme (BUS) offers a &pound;7,500 grant towards the cost of an air source heat pump, but take-up has been slow &mdash; only 39,000 vouchers were redeemed in the scheme&apos;s first two years. The upfront cost of a heat pump, typically &pound;8,000&ndash;&pound;14,000 installed, remains the primary barrier. Running costs depend on the relative price of electricity and gas; at current tariff structures, a heat pump in a poorly insulated home can cost more to run than the gas boiler it replaces, which actively discourages adoption.</p>
            <p>Labour&apos;s Warm Homes Plan pledged &pound;6.6 billion over the 2025&ndash;2030 parliament for home energy efficiency upgrades, targeting 300,000 homes per year. This builds on the existing Great British Insulation Scheme (GBIS), which provides grants for cavity wall and loft insulation to low-income households and those in the least efficient properties. Previous government insulation programmes have a mixed record: the Green Deal (2013&ndash;2015) delivered fewer than 15,000 measures before being scrapped, and the Green Homes Grant voucher scheme (2020&ndash;2021) spent &pound;314 million of its &pound;1.5 billion budget before being abandoned due to administrative failure. The Future Homes Standard, from 2025, requires new-build homes to produce 75&ndash;80&percnt; fewer carbon emissions through better insulation and low-carbon heating, but addresses only the 200,000&ndash;250,000 homes built per year &mdash; not the 28 million existing stock.</p>
            <p>Energy efficiency varies significantly by housing type, tenure, and region. Private rented homes are the worst-performing sector: 29&percnt; are rated EPC E or below, compared to 14&percnt; of owner-occupied homes. Minimum Energy Efficiency Standards (MEES) require private rentals to reach EPC E, but enforcement is weak &mdash; the National Residential Landlords Association estimates only 3&percnt; of non-compliant properties have been subject to any enforcement action. Geographically, Wales and the North East have the highest proportions of inefficient housing, reflecting older building stock and lower investment. Rural properties &mdash; often off the gas grid and reliant on oil or LPG heating &mdash; face the highest heating costs and are often the most difficult and expensive to retrofit. Scotland has its own standards requiring all homes to achieve EPC C by 2033, enforced through the Social Housing Net Zero Standard.</p>
            <p>EPC ratings are widely criticised as a poor measure of actual energy performance. An EPC is based on a modelled assessment of the building fabric and heating system, not real-world energy consumption &mdash; meaning a well-insulated home heated inefficiently can score better than an efficient home with poor fabric. The methodology has not been significantly updated since its introduction in 2007. Heat pump installation data from MCS only captures certified installations; DIY and uncertified installations are missed. The &pound;65&ndash;&pound;80 billion retrofit cost estimate depends on assumptions about material costs, labour availability, and the mix of measures required, all of which carry substantial uncertainty. The 600,000 heat pumps per year target is a modelled number from the Climate Change Committee, not a statutory requirement. The construction industry currently has an estimated skills gap of 150,000 retrofit workers &mdash; a constraint that may be more binding than funding in the medium term.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-epc', label: 'EPC Ratings' },
          { id: 'sec-heatpumps', label: 'Heat Pumps' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Homes rated EPC C or above"
              value="49"
              unit="%"
              direction="up"
              polarity="up-is-good"
              changeText="Up from 14% in 2012; target: 100% by 2035"
              sparklineData={[14, 19, 28, 34, 40, 46, 49]}
              source="English Housing Survey"
              onExpand={() => {}}
            />
            <MetricCard
              label="Heat pump installations (2024)"
              value="72,000"
              direction="up"
              polarity="up-is-good"
              changeText="Up from 19,000 in 2017 &mdash; but 600,000/yr needed by 2028"
              sparklineData={[19, 22, 27, 32, 43, 55, 60, 72]}
              source="MCS installation data"
              onExpand={() => {}}
            />
            <MetricCard
              label="Homes still rated EPC D or below"
              value="12.7m"
              direction="down"
              polarity="up-is-bad"
              changeText="3.2m at EPC E, F, or G &mdash; the worst categories"
              sparklineData={[17.1, 16.2, 15.4, 14.6, 13.8, 13.2, 12.7]}
              source="English Housing Survey"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-epc" className="mb-12">
            <LineChart
              title="Homes rated EPC C or above, England, 2012&ndash;2024"
              subtitle="Percentage of assessed homes meeting the government&apos;s 2035 target of EPC C. English Housing Survey."
              series={epcSeries}
              yLabel="% at EPC C+"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-heatpumps" className="mb-12">
            <LineChart
              title="Annual heat pump installations, UK, 2017&ndash;2024"
              subtitle="Thousands of MCS-certified heat pump installations per year. Excludes uncertified installations."
              series={heatPumpSeries}
              yLabel="Thousands installed"
            />
          </section>
        </ScrollReveal>
      </main>
    </>
  )
}
