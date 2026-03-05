'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface HousingDisrepairClaimsData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    claimsK: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

export default function HousingDisrepairClaimsPage() {
  const [data, setData] = useState<HousingDisrepairClaimsData | null>(null)

  useEffect(() => {
    fetch('/data/housing-disrepair-claims/housing_disrepair_claims.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [
        {
          id: 'claims',
          label: 'Claims (thousands)',
          colour: '#F4A261',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.claimsK,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Housing Disrepair Claims" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Housing Disrepair Claims"
          question="How Many Renters Are Living in Disrepair?"
          finding="Housing disrepair legal claims have surged 180% since 2019 as social tenants pursue landlords over damp, mould and structural defects."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Housing disrepair &mdash; the failure of a landlord to maintain a property in a condition fit for habitation &mdash; is a legal obligation imposed on all landlords under the Landlord and Tenant Act 1985 and the Homes (Fitness for Human Habitation) Act 2018. The 2018 Act, introduced as a private member&apos;s bill by Karen Buck MP, gave tenants a direct right of action against landlords who allow properties to fall into disrepair or become unfit for habitation &mdash; a significant strengthening of tenant legal rights after decades in which enforcement relied primarily on local authority environmental health action rather than individual civil remedy. In the years following the Act&apos;s commencement, disrepair claims filed at county courts rose substantially.</p>
            <p>The surge accelerated dramatically after the pandemic. Households spending more time at home during 2020&ndash;21 became more aware of damp, mould, structural defects, and heating failures. At the same time, a commercial legal sector developed specifically around housing disrepair: claims management companies and solicitors offering conditional fee arrangements (no win, no fee) began marketing disrepair services aggressively to social tenants. By 2024, housing disrepair claims had reached approximately 92,000 per year, compared to 33,000 in 2019 &mdash; a 180% increase. Housing associations and local authorities have faced a wave of litigation that is straining their legal and operational resources and, in some cases, diverting maintenance budgets into legal costs.</p>
            <p>The claims are concentrated in the social housing sector, where tenants have legal standing and landlords have clearly defined repair obligations. Private rental sector tenants are also protected by the 2018 Act but face higher practical barriers to making claims &mdash; including the risk of retaliatory eviction in the absence of robust no-fault eviction protections. The condition of social housing stock is highly variable: well-managed housing associations with regular maintenance programmes generate few claims, while poorly maintained local authority stock &mdash; particularly legacy tower blocks and inter-war estates with ageing building fabric &mdash; generate high claim rates. The Awaab Ishak case, in which a two-year-old child died from exposure to black mould in a Rochdale housing association flat in 2020, became the defining moment in public consciousness around social housing disrepair.</p>
            <p>The legal and political response to Awaab&apos;s death included the Social Housing (Regulation) Act 2023, which introduced new landlord transparency obligations, a revised Decent Homes Standard consultation, and the &apos;Awaab&apos;s Law&apos; provision requiring social landlords to investigate and remediate damp and mould hazards within specified timeframes. The Regulator of Social Housing&apos;s consumer regulation regime was strengthened, with new powers to inspect, assess and if necessary take enforcement action against registered providers. These changes represent a structural shift in the regulatory expectations placed on social landlords &mdash; but implementation will take time, and the courts remain the primary route of redress for tenants in poorly maintained properties.</p>
            <p>The broader picture of housing stock condition in England remains concerning. The English Housing Survey 2023 found that 4.2 million homes &mdash; 16% of the housing stock &mdash; fall below the Decent Homes Standard, including 1.1 million with category 1 hazards (the most serious physical risks). Private rented sector homes are the most likely to be non-decent, but social housing is far from uniform in quality. The gap between the best and worst social landlords is wide, and the regulator&apos;s new consumer standards are intended to narrow it. For the tenants of the worst-maintained properties &mdash; disproportionately older people, those with disabilities, and families in overcrowded accommodation &mdash; the legal route to redress through disrepair claims, while now more accessible than before, remains complex and stressful.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Claims' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Disrepair claims filed annually"
              value="92,000"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="+180% since 2019 · surge post-pandemic"
              sparklineData={[28000, 30000, 33000, 35000, 38000, 48000, 65000, 80000, 92000]}
              onExpand={() => {}}
              source="Ministry of Justice &middot; Civil Justice Statistics 2024"
            />
            <MetricCard
              label="Homes with category 1 hazards"
              value="1.1m"
              unit=""
              direction={'flat' as const}
              polarity={'up-is-bad' as const}
              changeText="1.1m homes with most serious risks"
              sparklineData={[1.3, 1.3, 1.2, 1.2, 1.2, 1.1, 1.1, 1.1, 1.1]}
              onExpand={() => {}}
              source="DLUHC &middot; English Housing Survey 2023"
            />
            <MetricCard
              label="Average compensation awarded"
              value="&pound;4,200"
              unit=""
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="+&pound;1,100 since 2020 · rising awards"
              sparklineData={[2100, 2300, 2600, 2800, 3100, 3400, 3700, 4000, 4200]}
              onExpand={() => {}}
              source="Ministry of Justice &middot; Civil Justice Statistics 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Housing disrepair claims, 2016&ndash;2024"
              subtitle="Annual housing disrepair claims filed at county courts in England and Wales."
              series={series}
              yLabel="Claims (thousands)"
              source={{
                name: 'Ministry of Justice',
                dataset: 'Civil Justice Statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Ministry of Justice &mdash; Civil Justice Statistics Quarterly. Published quarterly. gov.uk/government/collections/civil-justice-statistics-quarterly</p>
            <p>DLUHC &mdash; English Housing Survey 2023. Published annually. gov.uk/government/collections/english-housing-survey</p>
            <p>Claims figures are county court housing disrepair claims under the Landlord and Tenant Act 1985 and Homes (Fitness for Human Habitation) Act 2018. Category 1 hazard data from English Housing Survey. Compensation figures are mean awards in settled and judged cases.</p>
          </div>
        </section>
      </main>
    </>
  )
}
