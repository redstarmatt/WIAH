'use client'

import { useEffect, useState } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series, Annotation } from '@/components/charts/LineChart'
import PositiveCallout from '@/components/PositiveCallout'
import ScrollReveal from '@/components/ScrollReveal'
import RelatedTopics from '@/components/RelatedTopics';

interface StatutoryPoint {
  year: string
  householdsThousands: number
  preventedThousands: number
}

interface RoughSleepingPoint {
  year: number
  roughSleepersEngland: number
}

interface TempAccomPoint {
  year: string
  householdsThousands: number
  childrenThousands: number
}

interface MainReason {
  reason: string
  pct: number
}

interface Metadata {
  sources: Array<{
    name: string
    dataset: string
    url: string
    frequency: string
  }>
  methodology: string
  knownIssues: string[]
}

interface HomelessnessData {
  topic: string
  lastUpdated: string
  national: {
    statutoryHomelessness: {
      timeSeries: StatutoryPoint[]
      latestYear: string
      latestHouseholds: number
    }
    roughSleeping: {
      timeSeries: RoughSleepingPoint[]
      latestYear: number
      latestCount: number
    }
    temporaryAccommodation: {
      timeSeries: TempAccomPoint[]
      latestYear: string
      latestHouseholds: number
      latestChildren: number
    }
    mainReasons: {
      latestYear: string
      reasons: MainReason[]
    }
  }
  metadata: Metadata
}

function fyToDate(fy: string): Date {
  const year = parseInt(fy.split('/')[0])
  return new Date(year, 3, 1)
}

function yearToDate(y: number): Date {
  return new Date(y, 5, 1)
}

export default function HomelessnessPage() {
  const [data, setData] = useState<HomelessnessData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('/data/homelessness/homelessness.json')
      .then((res) => res.json())
      .then((d) => {
        setData(d)
        setIsLoading(false)
      })
      .catch((err) => {
        console.error('Failed to load homelessness data:', err)
        setIsLoading(false)
      })
  }, [])

  if (isLoading) return <div className="text-center py-20">Loading...</div>

  if (!data) return <div className="text-center py-20">Failed to load data</div>

  const statutorySeries: Series[] = data
    ? [
        {
          id: 'statutory',
          label: 'Statutory homelessness (thousands)',
          colour: '#E63946',
          data: data.national.statutoryHomelessness.timeSeries.map((d) => ({
            date: fyToDate(d.year),
            value: d.householdsThousands,
          })),
        },
      ]
    : []

  const roughSleepingSeries: Series[] = data
    ? [
        {
          id: 'rough',
          label: 'Rough sleepers in England',
          colour: '#F4A261',
          data: data.national.roughSleeping.timeSeries.map((d) => ({
            date: yearToDate(d.year),
            value: d.roughSleepersEngland,
          })),
        },
      ]
    : []

  const tempAccomSeries: Series[] = data
    ? [
        {
          id: 'households',
          label: 'Households in temporary accommodation (thousands)',
          colour: '#264653',
          data: data.national.temporaryAccommodation.timeSeries.map((d) => ({
            date: fyToDate(d.year),
            value: d.householdsThousands,
          })),
        },
        {
          id: 'children',
          label: 'Children in temporary accommodation (thousands)',
          colour: '#E63946',
          data: data.national.temporaryAccommodation.timeSeries.map((d) => ({
            date: fyToDate(d.year),
            value: d.childrenThousands,
          })),
        },
      ]
    : []

  const roughSleepAnnotations: Annotation[] = [
    {
      date: new Date(2020, 5, 1),
      label: '2020: Everyone In — hotels opened',
    },
  ]

  const statutoryAnnotations: Annotation[] = [
    {
      date: new Date(2017, 3, 1),
      label: '2017: Homelessness Reduction Act',
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <TopicNav topic="Homelessness" />

      <div className="max-w-4xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Homelessness"
          question="Is Homelessness Actually Getting Worse?"
          colour="#E63946"
          finding="Homelessness in England has reached a record level. In 2023/24, 117,500 households were accepted as homeless by local authorities — up 119% since 2012/13. 159,900 children are growing up in temporary accommodation."
        />

        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <MetricCard
              label="Households accepted as homeless"
              value="117,500"
              direction="up"
              polarity="up-is-bad"
              changeText="2023/24 — All-time high — Up 119% since 2012/13"
              sparklineData={[53.5, 54.5, 59.8, 78.1, 97.2, 74.7, 74.1, 94.6, 105.4, 117.5]}
              source="Source: MHCLG — Statutory homelessness in England 2023/24."
            />
            <MetricCard
              label="Rough sleepers (England)"
              value="4,255"
              direction="up"
              polarity="up-is-bad"
              changeText="2024 — Near 2017 record — COVID Everyone In scheme reversed"
              sparklineData={[1768, 2309, 2744, 4134, 4751, 4266, 2688, 2440, 3069, 3898, 4255]}
              source="Source: MHCLG — Rough sleeping statistics 2024."
            />
            <MetricCard
              label="Children in temporary accommodation"
              value="159,900"
              direction="up"
              polarity="up-is-bad"
              changeText="2023/24 — Record high — B&amp;Bs, hostels, nightly let"
              sparklineData={[82.1, 84.5, 101.3, 124.0, 126.2, 134.0, 138.6, 131.4, 152.0, 159.9]}
              source="Source: MHCLG — Statutory homelessness in England 2023/24."
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mt-16">
            <LineChart
              title="Statutory homelessness, England, 2012–2024"
              subtitle="Households accepted as homeless by local authorities. All-time high in 2023/24 at 117,500. The Homelessness Reduction Act 2017 expanded local authority duties, partially explaining the jump."
              series={statutorySeries}
              annotations={statutoryAnnotations}
              yLabel="Thousands"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mt-16">
            <LineChart
              title="Rough sleepers in England, autumn count, 2010–2024"
              subtitle="Single-night snapshot count in November. Tripled between 2010 and 2017; briefly fell during COVID hotel programme; now rising again."
              series={roughSleepingSeries}
              annotations={roughSleepAnnotations}
              yLabel="Number"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mt-16">
            <LineChart
              title="Households and children in temporary accommodation, 2014–2024"
              subtitle="Includes B&amp;Bs, hostels, and nightly-let properties. 159,900 children are growing up in temporary accommodation — a record high."
              series={tempAccomSeries}
              yLabel="Thousands"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mt-16 bg-wiah-light p-8 rounded">
            <h3 className="text-xl font-bold text-wiah-black mb-6">The Context</h3>
            <div className="space-y-4 text-wiah-mid leading-relaxed">
              <p>
                In 2023/24, 117,500 households were accepted as statutorily homeless in England — the highest figure since records began. A further 338,400 had homelessness prevented or relieved, also a record. The human cost is concentrated on children: 159,900 are growing up in temporary accommodation, including more than 5,000 in bed-and-breakfasts. Placing families in B&amp;Bs for longer than six weeks is illegal except in emergencies, yet 87% of local authorities breached that limit in 2023/24. Temporary accommodation now costs councils an average of £1,600 per household per month; the total bill reached an estimated £2.4bn in 2024/25, up from £1.0bn five years earlier.
              </p>
              <p>
                The private rented sector drives the crisis. End of tenancy accounts for 22.3% of accepted cases — the single largest cause for seven consecutive years. Section 21 no-fault evictions were finally abolished in October 2025 under the Renters' Rights Bill, but landlords served a wave of notices before the deadline, fuelling a surge in 2023/24 presentations. The deeper problem is affordability: Local Housing Allowance, the benefit that caps rent support at the 30th percentile of local rents, has been repeatedly frozen. In London the gap between LHA and an average one-bedroom rent is £500–£800 per month. Benefits no longer cover the cheapest third of the market they were designed to reach.
              </p>
              <p>
                The Everyone In programme proved what speed and political will can achieve: 37,000 rough sleepers were housed in hotels within weeks of the March 2020 lockdown, and the annual count fell from 4,266 to 2,440 by 2021. But the hotel programme wound down without adequate move-on housing, and by 2024 rough sleeping had climbed back to 4,255 — almost exactly the 2018 level. The structural deficit is social housing. One million council homes have been sold under Right to Buy since 1980, replaced at a ratio of roughly 1:8. Some 1.3 million households sit on social housing waiting lists in 2024. Until supply catches up, temporary accommodation will continue to function as England's de facto social housing system — at far greater cost.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mt-16">
            <PositiveCallout
              title="What's improving"
              value="338,400"
              unit="households had homelessness prevented in 2023/24"
              description="The Homelessness Reduction Act 2017 introduced a new legal duty for local authorities to prevent homelessness before it occurs — through debt advice, mediation, and help accessing private rentals. In 2023/24, 338,400 households were helped, up from 175,600 in 2012/13. Prevention is far cheaper than emergency accommodation: keeping a family housed costs a fraction of a year in B&amp;B."
              source="Source: MHCLG — Statutory homelessness in England 2023/24."
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mt-16 border-t border-wiah-border pt-12">
            <h3 className="text-xl font-bold text-wiah-black mb-6">Sources &amp; Methodology</h3>
            <div className="space-y-4 text-sm text-wiah-mid font-mono">
              {data.metadata.sources.map((source, idx) => (
                <div key={idx}>
                  <p className="font-bold text-wiah-black">
                    {source.name}: {source.dataset}
                  </p>
                  <p>
                    <a href={source.url} className="text-wiah-blue hover:underline">
                      {source.url}
                    </a>
                  </p>
                  <p>Updated {source.frequency}.</p>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-3 text-sm text-wiah-mid">
              <p className="font-bold text-wiah-black">Methodology</p>
              <p>{data.metadata.methodology}</p>

              <p className="font-bold text-wiah-black mt-6">Known Issues</p>
              <ul className="list-disc list-inside space-y-2">
                {data.metadata.knownIssues.map((issue, idx) => (
                  <li key={idx}>{issue}</li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollReveal>
      </div>
        <RelatedTopics />
    </div>
  )
}
