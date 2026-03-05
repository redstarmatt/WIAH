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
            <p>The Winter Fuel Payment was introduced in 1997 as a universal &pound;200&ndash;300 annual payment to all households with a member aged 66 or over. In July 2024, the government means-tested it from winter 2024&ndash;25, restricting eligibility to pensioners receiving Pension Credit. The change removed 85% of recipients in a single decision &mdash; from approximately 11 million to 1.5 million &mdash; saving an estimated &pound;1.4 billion per year. The reform was politically contentious because it was not pre-announced in the Labour manifesto and came when pensioners faced elevated energy costs following the 2022&ndash;23 price spike. The JRF, IFS, and Age UK all estimated it would push between 100,000 and 300,000 additional pensioners below the poverty line.</p>
            <p>The reform&apos;s core vulnerability is Pension Credit non-take-up. The benefit is worth around &pound;3,900 a year to eligible pensioners, but approximately 850,000 eligible households do not claim it &mdash; often older people unaware of their entitlement or unable to navigate digital applications. These pensioners are genuinely poor but fall outside the means-test, leaving them without the payment. The government launched a Pension Credit publicity campaign ahead of the reform, but take-up increases typically take years to materialise. The 2024&ndash;25 winter was the first year of the new system; the actual poverty and mortality impact will only be assessable once data becomes available.</p>
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
              href="#sec-chart"source="DWP &middot; Winter Fuel Payment Statistics 2024"
            />
            <MetricCard
              label="Additional pensioners in poverty"
              value="+200k"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="projected additional pensioners in poverty"
              sparklineData={[0, 0, 0, 0, 0, 200]}
              href="#sec-chart"source="JRF / IFS projections &middot; 2024"
            />
            <MetricCard
              label="Fuel-poor pensioners ineligible"
              value="800k"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="800k pensioners in fuel poverty now not receiving payment"
              sparklineData={[800, 800, 800, 800, 800, 800]}
              href="#sec-chart"source="Age UK / National Energy Action &middot; 2024"
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
