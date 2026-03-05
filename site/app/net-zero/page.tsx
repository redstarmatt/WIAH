'use client'

import { useEffect, useState } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import PositiveCallout from '@/components/PositiveCallout'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// ── Types ────────────────────────────────────────────────────────────────────

interface NetZeroData {
  emissions: { year: number; mtCO2e: number }[]
  renewableElectricity: { year: number; pct: number }[]
  bySector: { sector: string; pctOfTotal: number }[]
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 6, 1)
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function NetZeroPage() {
  const [data, setData] = useState<NetZeroData | null>(null)

  useEffect(() => {
    fetch('/data/net-zero/net_zero.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  // Emissions series
  const emissionsSeries: Series[] = data
    ? [{
        id: 'emissions',
        label: 'UK GHG emissions',
        colour: '#2A9D8F',
        data: data.emissions.map(d => ({
          date: yearToDate(d.year),
          value: d.mtCO2e,
        })),
      }]
    : []

  // Renewable electricity series
  const renewableSeries: Series[] = data
    ? [{
        id: 'renewable',
        label: 'Renewable electricity share',
        colour: '#2A9D8F',
        data: data.renewableElectricity.map(d => ({
          date: yearToDate(d.year),
          value: d.pct,
        })),
      }]
    : []

  // Latest values
  const latestEmissions = data?.emissions.at(-1)
  const firstEmissions = data?.emissions[0]
  const latestRenewable = data?.renewableElectricity.at(-1)

  // Calculate reduction percentage
  const reductionPct = latestEmissions && firstEmissions
    ? (((firstEmissions.mtCO2e - latestEmissions.mtCO2e) / firstEmissions.mtCO2e) * 100).toFixed(0)
    : '49'

  return (
    <>
      <TopicNav topic="Net Zero" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Net Zero"
          question="Is Britain Actually Decarbonising?"
          finding="UK greenhouse gas emissions fell to 371 million tonnes CO2-equivalent in 2024 &mdash; the lowest level since 1872. The UK has cut emissions 53% since 1990 while GDP grew 84%. Renewables generated 50.8% of UK electricity in 2024 &mdash; the first time they have crossed 50%."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>UK greenhouse gas emissions fell 49&percnt; between 1990 and 2022 &mdash; one of the fastest reductions among major economies &mdash; but almost all of it came from two sectors: electricity generation and heavy industry. Coal supplied 40&percnt; of UK power in 2012; by 2024 it had been phased out entirely. Renewables now account for 47&percnt; of electricity generation, led by the world&apos;s largest offshore wind fleet at 14.7 GW, with offshore wind costs down 70&percnt; since 2015. The hard sectors remain largely untouched. Transport produces 26&percnt; of UK emissions; 92&percnt; of cars on the road are still petrol or diesel. Buildings account for 17&percnt;; 24 million homes are heated by gas boilers and only 60,000 heat pumps were installed in 2023 against the 600,000 per year needed by the mid-2020s. The CCC found in its 2023 report that the UK was off track for a majority of its 2030 milestones. The legally binding target is a 68&percnt; reduction by 2030, relative to 1990. Labour&apos;s GB Energy and Clean Power 2030 mission target decarbonising electricity entirely; grid connection timelines currently running 10&ndash;15 years present the binding constraint.</p>
            <p>The distributional dimension of the transition is acute. Lower-income households spend a higher share of income on energy and transport, meaning carbon pricing and technology mandates &mdash; heat pump requirements, electric vehicle mandates &mdash; risk being regressive without substantial targeted support. Heat pump upfront costs of &pound;8,000&ndash;&pound;12,000 installed are prohibitive without subsidy for households renting or in fuel poverty. The public charging network stands at 54,000 points against an estimated 300,000 needed. Agriculture, at 11&percnt; of emissions with almost no reduction in thirty years, has been largely exempted from serious decarbonisation pressure; the cost of that exemption is carried by every other sector that must overdeliver to compensate.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-emissions', label: 'Emissions' },
          { id: 'sec-renewable', label: 'Renewable Energy' },
          { id: 'sec-sectors', label: 'By Sector' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
        <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="UK GHG emissions reduction since 1990"
            value={reductionPct}
            unit="%"
            direction="down"
            polarity="up-is-good"
            changeText="On track to 68% by 2030 if pace maintained"
            sparklineData={data ? data.emissions.map(d => d.mtCO2e) : []}
            source="DESNZ · Climate Change Risk Assessment"
            href="#sec-emissions"/>
          <MetricCard
            label="Electricity from renewables (2023)"
            value={latestRenewable?.pct.toString() || '50.8'}
            unit="%"
            direction="up"
            polarity="up-is-good"
            changeText="Up from 7% in 2010"
            sparklineData={data ? data.renewableElectricity.map(d => d.pct) : []}
            source="DESNZ · Energy Trends"
            href="#sec-renewable"/>
          <MetricCard
            label="Electric vehicles as % of new car sales (2023)"
            value="16"
            unit="%"
            direction="up"
            polarity="up-is-good"
            changeText="Up from 0.3% in 2019; ZEV mandate target 80% by 2030"
            sparklineData={[0.3, 0.9, 2.8, 6.5, 10.2, 13.4, 16]}
            source="DfT · Vehicle Statistics"
            href="#sec-sectors"/>
        </div>
        </ScrollReveal>

        {/* Emissions chart */}
        <ScrollReveal>
        <section id="sec-emissions" className="mb-12">
          <LineChart
            title="UK greenhouse gas emissions, 1990&ndash;2022"
            subtitle="MtCO2e (million tonnes CO2 equivalent). DESNZ provisional estimates. 1990 is the legal baseline."
            series={emissionsSeries}
            annotations={[
              { date: new Date(2020, 6, 1), label: 'COVID-19 lockdowns: temporary dip' },
            ]}
            yLabel="MtCO2e"
          />
        </section>
        </ScrollReveal>

        {/* Renewable electricity chart */}
        <ScrollReveal>
        <section id="sec-renewable" className="mb-12">
          <LineChart
            title="Share of UK electricity from renewables, 2010&ndash;2023"
            subtitle="Percentage of electricity generation from wind, solar, hydro and other renewables. DESNZ."
            series={renewableSeries}
            yLabel="%"
          />
        </section>
        </ScrollReveal>

        {/* Emissions by sector */}
        <ScrollReveal>
        <section id="sec-sectors" className="mb-12">
          <h3 className="text-xl font-bold text-wiah-black mb-6">UK greenhouse gas emissions by sector</h3>
          <div className="space-y-3">
            {data?.bySector.map(item => (
              <div key={item.sector} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-32 text-sm text-wiah-black">
                  {item.sector}
                </div>
                <div className="flex-grow flex items-center gap-2">
                  <div
                    className="h-6 bg-[#2A9D8F] rounded"
                    style={{ width: `${(item.pctOfTotal / 30) * 100}%` }}
                  />
                </div>
                <div className="flex-shrink-0 w-12 text-right font-mono text-sm text-wiah-black">
                  {item.pctOfTotal}%
                </div>
              </div>
            ))}
          </div>
        </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
        <PositiveCallout
          title="Wind power now UK&apos;s largest electricity source"
          value="14.7"
          unit="GW"
          description="In 2023, wind power overtook natural gas to become the UK&apos;s largest source of electricity for the first time. Offshore wind capacity reached 14.7 GW &mdash; the largest offshore wind fleet in the world. The UK has cut the cost of offshore wind by 70% since 2015 through competitive auction rounds."
          source="National Grid ESO · Data Explorer; UK Government · Energy White Paper"
        />
        </ScrollReveal>
      </main>
    </>
  )
}
