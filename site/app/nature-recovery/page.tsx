'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series, Annotation } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import PositiveCallout from '@/components/PositiveCallout'

interface NatureRecoveryData {
  lnrsProgress: Array<{ year: number; published: number; total: number }>
  biodiversityNetGain: Array<{ year: number; mandatory: boolean; minimumGain: number }>
  conservationCovenants: Array<{ year: number; registered: number }>
  protectedLandPercent: Array<{ year: number; percentEngland: number; target?: boolean }>
}

function yearToDate(y: number): Date {
  return new Date(y, 5, 1)
}

export default function NatureRecoveryPage() {
  const [data, setData] = useState<NatureRecoveryData | null>(null)

  useEffect(() => {
    fetch('/data/nature-recovery/nature_recovery.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const protectedLandSeries: Series[] = data
    ? [{
        id: 'protected-land',
        label: 'Protected land (% of England)',
        colour: '#2A9D8F',
        data: data.protectedLandPercent.map(d => ({
          date: yearToDate(d.year),
          value: d.percentEngland,
        })),
      }]
    : []

  const protectedLandAnnotations: Annotation[] = [
    { date: yearToDate(2021), label: '2021: Environment Act passed' },
    { date: yearToDate(2022), label: '2022: 30\u00d730 pledge signed' },
  ]

  return (
    <>
      <TopicNav topic="Nature Recovery" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Nature Recovery"
          question="Is England making progress on nature recovery?"
          finding="England&apos;s 48 Local Nature Recovery Strategies are being finalised in 2024 &mdash; a first-ever legal framework for nature. Mandatory Biodiversity Net Gain came into force in February 2024: the first law in the world requiring new developments to leave nature better off."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The Environment Act 2021 established the most ambitious statutory framework for nature recovery England has ever had. Mandatory Biodiversity Net Gain entered force in February 2024, requiring all new development to leave biodiversity at least 10% better than before &mdash; the first such legal requirement in the world. 46 of England&apos;s 48 Local Nature Recovery Strategies were published or in final consultation by 2024, creating the first legally mandated, spatially explicit framework for deciding where nature recovery should happen. England&apos;s protected land stands at approximately 28.8% of land area, close to the 30&times;30 target committed to at Kunming-Montreal in December 2022. Conservation covenants &mdash; legally binding, permanent land management agreements following the land rather than the owner &mdash; registered 280 by 2024, a new and growing mechanism for locking in private biodiversity investment.</p>
            <p>The legislative framework has been built against a dire baseline. The UK ranks 189th out of 218 nations on biodiversity intactness, and State of Nature 2023 found 41% of UK species in decline. Reaching 30&times;30 in name is achievable; reaching it in substance is not. Currently 38% of SSSIs in England are in unfavourable condition, meaning formal protection without adequate management funding is providing only nominal coverage. Enforcing BNG across thousands of individual planning applications, translating LNRS priorities into on-the-ground land management through willing private landowners, and ensuring the 30&times;30 designation reflects genuine ecological quality rather than administrative boundary drawing remain the defining tests of whether the policy shift translates into actual nature recovery.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-protected', label: 'Protected Land' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Local Nature Recovery Strategies published"
              value="46/48"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Near-complete coverage for England in 2024 &middot; legally required framework"
              sparklineData={[12, 46]}
              source="DEFRA LNRS Programme &middot; 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Biodiversity Net Gain minimum required"
              value="10"
              unit="%"
              direction="up"
              polarity="up-is-good"
              changeText="Mandatory since Feb 2024 &middot; first law of its kind in the world"
              sparklineData={[0, 0, 0, 0, 10]}
              source="Environment Act 2021 / DEFRA &middot; 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="Protected land in England (% of area)"
              value="28.8"
              unit="%"
              direction="up"
              polarity="up-is-good"
              changeText="Approaching 30&times;30 target &mdash; protect 30% of land by 2030"
              sparklineData={[26.4, 27.1, 28.2, 28.8, 30.0]}
              source="DEFRA / Natural England &middot; 2023"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-protected" className="mb-12">
            <LineChart
              title="Protected land in England as % of total area, 2010&ndash;2030"
              subtitle="Land under statutory protection (SSSIs, National Parks, AONBs, Local Nature Reserves). 2030 point shows 30&times;30 target."
              series={protectedLandSeries}
              annotations={protectedLandAnnotations}
              yLabel="% of England&apos;s land area"
              source={{
                name: 'DEFRA / Natural England',
                dataset: 'Protected Area Statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="World-first: Mandatory Biodiversity Net Gain"
            value="10%+"
            unit=""
            description="Since February 2024, all new developments in England must deliver at least 10% biodiversity net gain &mdash; leaving nature in a measurably better state than before. England is the first country in the world to make this a legal requirement. Developers must demonstrate net gain using the DEFRA Biodiversity Metric, and commit legally to maintaining it for 30 years. This is a structural change to how development interacts with nature."
            source="Source: Environment Act 2021, DEFRA Biodiversity Net Gain implementation guidance 2024."
          />
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>DEFRA &mdash; Local Nature Recovery Strategies programme. Progress updates on publication status across all 48 responsible authorities. Available at gov.uk/government/collections/local-nature-recovery-strategies.</p>
            <p>Natural England &mdash; Protected Area Statistics. Annual data on land under statutory protection, including SSSIs, National Parks, AONBs, and Ramsar sites. Available at data.naturalengland.org.uk.</p>
            <p>Green Alliance &mdash; Nature Recovery analysis. Policy analysis of the Environment Act 2021 and delivery against targets. Available at green-alliance.org.uk.</p>
            <p>Protected land percentage uses statutory designations and may overlap with some areas counted in multiple categories. The 2030 data point represents the 30&times;30 target rather than an observed figure. SSSI condition data from Natural England SSSI condition assessments, updated annually.</p>
          </div>
        </section>
      </main>
    </>
  )
}
