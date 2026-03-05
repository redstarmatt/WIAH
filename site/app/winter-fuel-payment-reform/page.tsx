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
  recipientsM?: number
  pensionerPovertyM?: number
}

interface WinterFuelData {
  timeSeries: TimeSeries[]
  projectedPovertyIncrease: number
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function WinterFuelPaymentReformPage() {
  const [data, setData] = useState<WinterFuelData | null>(null)

  useEffect(() => {
    fetch('/data/winter-fuel-payment-reform/winter_fuel_payment_reform.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const recipientsSeries: Series[] = data
    ? [{
        id: 'recipients',
        label: 'Winter Fuel Payment recipients (millions)',
        colour: '#E63946',
        data: data.timeSeries
          .filter(d => d.recipientsM !== undefined)
          .map(d => ({ date: yearToDate(d.year), value: d.recipientsM as number })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Winter Fuel Payment" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Winter Fuel Payment Reform"
          question="Who Has Lost the Winter Fuel Payment?"
          finding="10 million pensioners lost the Winter Fuel Payment in 2024 when the government means-tested it &mdash; and projections suggest 200,000 more pensioners will fall into poverty."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The Winter Fuel Payment was introduced in 1997 as a universal payment to help pensioners cover heating costs. For over two decades it was paid to all households with a member aged 66 or over, regardless of income &mdash; a design choice that made it administratively simple and politically popular, but that also meant substantial sums went to affluent pensioners who did not need financial support for their energy bills. The payment was worth &pound;200 to &pound;300 per year.</p>
            <p>In July 2024, the government announced that the payment would be means-tested from winter 2024&ndash;25. Only pensioners receiving Pension Credit or certain other means-tested benefits would remain eligible. The stated rationale was fiscal: the savings were estimated at around &pound;1.4 billion per year. The decision was politically contentious because it was implemented without pre-announcement in the Labour manifesto and because it came at a time when pensioners faced elevated energy costs following the energy price spike of 2022&ndash;23.</p>
            <p>The scale of the change is striking. Approximately 11 million pensioners received the payment before the reform. Only around 1.5 million &mdash; those on Pension Credit &mdash; remained eligible afterwards. The means test removed 85% of recipients in a single policy change. The government argued that wealthy pensioners should not receive state support for heating bills and that the savings would fund other priorities. Critics argued that the reform was poorly targeted because Pension Credit take-up is low: around a third of eligible pensioners do not claim it, meaning many genuinely poor pensioners would miss out.</p>
            <p>Pension Credit non-take-up is a structural problem. The benefit is estimated to be worth around &pound;3,900 per year to eligible pensioners, but approximately 850,000 eligible households do not claim it. Reasons include stigma, complexity, and lack of awareness &mdash; particularly among older pensioners who do not engage with digital services and may not know they are entitled. The government launched a publicity campaign to increase Pension Credit uptake in anticipation of the Winter Fuel Payment reform, but projections suggested it would take several years for the take-up rate to rise significantly.</p>
            <p>The poverty impact projections are based on modelling by the Joseph Rowntree Foundation, the Institute for Fiscal Studies, and Age UK, all of which estimated that the reform would push between 100,000 and 300,000 additional pensioners below the poverty line, concentrated among those just above the Pension Credit threshold and those eligible but not claiming. The winter of 2024&ndash;25 was the first year of the new system. The actual poverty and mortality impact will only be assessable once data for that winter becomes available in 2025&ndash;26.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Recipients' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Winter Fuel Payment recipients 2024"
              value="1.5m"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="down from 11m &middot; means test removes 85% of recipients"
              sparklineData={[11.2, 11.4, 11.3, 11.1, 11.0, 1.5]}
              onExpand={() => {}}
              source="DWP &middot; Winter Fuel Payment Statistics 2024"
            />
            <MetricCard
              label="Additional pensioners in poverty"
              value="+200k"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="projected additional pensioners in poverty"
              sparklineData={[0, 0, 0, 0, 0, 200]}
              onExpand={() => {}}
              source="JRF / IFS projections &middot; 2024"
            />
            <MetricCard
              label="Fuel-poor pensioners ineligible"
              value="800k"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="800k pensioners in fuel poverty now not receiving payment"
              sparklineData={[800, 800, 800, 800, 800, 800]}
              onExpand={() => {}}
              source="Age UK / National Energy Action &middot; 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Winter Fuel Payment recipients, 2019&ndash;2024"
              subtitle="Total households receiving Winter Fuel Payment (millions). 2024 reflects introduction of means test limiting eligibility to Pension Credit recipients."
              series={recipientsSeries}
              yLabel="Recipients (millions)"
              source={{
                name: 'Department for Work and Pensions',
                dataset: 'Winter Fuel Payment Statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>DWP &mdash; Winter Fuel Payment Statistics. Published annually. gov.uk/government/collections/winter-fuel-payments</p>
            <p>Joseph Rowntree Foundation &mdash; Poverty projections modelling (2024). jrf.org.uk</p>
            <p>Institute for Fiscal Studies &mdash; Winter Fuel Payment reform analysis (2024). ifs.org.uk</p>
            <p>Age UK &mdash; Fuel poverty and pensioner income analysis. ageuk.org.uk</p>
            <p>National Energy Action &mdash; Fuel poverty statistics. nea.org.uk</p>
            <p>Recipient figures drawn from DWP administrative data. 2019&ndash;2023 figures reflect universal payment to all state pension age households. 2024 figure reflects first year of means-tested payment restricted to Pension Credit recipients. Poverty projections represent central estimates from IFS/JRF modelling published prior to the reform implementation.</p>
          </div>
        </section>
      </main>
    </>
  )
}
