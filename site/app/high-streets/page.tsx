'use client'

import { useEffect, useState } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series, Annotation } from '@/components/charts/LineChart'
import PositiveCallout from '@/components/PositiveCallout'
import ScrollReveal from '@/components/ScrollReveal'
import SourceAttribution from '@/components/SourceAttribution'
import RelatedTopics from '@/components/RelatedTopics';

interface VacancyPoint {
  year: string
  vacancyRatePct: number
}

interface OnlinePoint {
  year: number
  onlinePctOfRetailSales: number
}

interface ClosurePoint {
  year: number
  netClosures: number
}

interface FootfallPoint {
  year: number
  indexedTo2019: number
}

interface HighStreetsData {
  topic: string
  lastUpdated: string
  national: {
    vacancyRates: {
      timeSeries: VacancyPoint[]
      latestPct: number
      latestPeriod: string
      note: string
    }
    onlineVsInStore: {
      timeSeries: OnlinePoint[]
      latestYear: number
      latestOnlinePct: number
    }
    storeClosures: {
      timeSeries: ClosurePoint[]
      note: string
    }
    footfall: {
      timeSeries: FootfallPoint[]
      latestYear: number
      latestIndex: number
      note: string
    }
  }
  metadata: {
    sources: Array<{
      name: string
      dataset: string
      url: string
      frequency: string
    }>
    methodology: string
    knownIssues: string[]
  }
}

function quarterToDate(q: string): Date {
  const [year, quarter] = q.split(' Q')
  const y = parseInt(year)
  const q_num = parseInt(quarter)
  const month = (q_num - 1) * 3
  return new Date(y, month, 1)
}

function yearToDate(y: number): Date {
  return new Date(y, 5, 1)
}

export default function HighStreetsPage() {
  const [data, setData] = useState<HighStreetsData | null>(null)

  useEffect(() => {
    const loadData = async () => {
      const res = await fetch('/data/high-streets/high_streets.json')
      const json = await res.json()
      setData(json)
    }
    loadData()
  }, [])

  if (!data) {
    return <div className="min-h-screen bg-wiah-white text-wiah-black flex items-center justify-center">Loading...</div>
  }

  const vacancySeries: Series[] = [
    {
      id: 'vacancy',
      label: 'Vacancy rate (%)',
      colour: '#F4A261',
      data: data.national.vacancyRates.timeSeries.map((p) => ({
        date: quarterToDate(p.year),
        value: p.vacancyRatePct,
      })),
    },
  ]

  const onlineSeries: Series[] = [
    {
      id: 'online',
      label: 'Online retail share (%)',
      colour: '#264653',
      data: data.national.onlineVsInStore.timeSeries.map((p) => ({
        date: yearToDate(p.year),
        value: p.onlinePctOfRetailSales,
      })),
    },
  ]

  const closureSeries: Series[] = [
    {
      id: 'closures',
      label: 'Net store closures',
      colour: '#E63946',
      data: data.national.storeClosures.timeSeries.map((p) => ({
        date: yearToDate(p.year),
        value: p.netClosures,
      })),
    },
  ]

  const vacancyAnnotations: Annotation[] = [
    {
      date: new Date(2021, 0, 1),
      label: '2021: Post-COVID peak 14.5%',
    },
  ]

  const onlineAnnotations: Annotation[] = [
    {
      date: new Date(2020, 5, 1),
      label: '2020: COVID e-commerce surge',
    },
  ]

  const closureAnnotations: Annotation[] = [
    {
      date: new Date(2020, 5, 1),
      label: '2020: Lockdown closures',
    },
    {
      date: new Date(2019, 5, 1),
      label: '2019: Major chains collapse',
    },
  ]

  const vacancySparklineData = [11.3, 12.0, 12.5, 11.8, 10.7, 10.0, 10.2, 11.1, 12.3, 14.5, 14.1, 13.9, 14.2, 14.0]
  const onlineSparklineData = [6.4, 8.1, 10.0, 12.9, 15.6, 18.9, 27.9, 25.6, 26.5, 27.3]
  const footfallSparklineData = [100, 63, 82, 86, 87, 86]

  return (
    <div className="min-h-screen bg-wiah-white">
      <TopicNav topic="High Streets" />

      <main className="max-w-4xl mx-auto px-4 py-16">
        <TopicHeader
          topic="High Streets"
          question="Is Your High Street Actually Dying?"
          finding="High street retail vacancy has reached 14%, the highest in over a decade. Store closures continue to outpace openings, while e-commerce has permanently taken 27% of all retail spending."
          colour="#F4A261"
        />

        <ScrollReveal>
          <div className="grid grid-cols-1 gap-6 mb-16 md:grid-cols-3">
            <MetricCard
              label="High street vacancy rate"
              value="14.0%"
              direction="up"
              polarity="up-is-bad"
              changeText="Q3 2024 · 1 in 7 units empty · Was 10% in 2017"
              sparklineData={vacancySparklineData}
              source="Source: Local Data Company, Q3 2024"
            />
            <MetricCard
              label="Online retail share"
              value="27.3%"
              direction="up"
              polarity="up-is-bad"
              changeText="2024 · Was 6.4% in 2010 · Stabilised but not reverting post-COVID"
              sparklineData={onlineSparklineData}
              source="Source: ONS Retail Sales, 2024"
            />
            <MetricCard
              label="Town centre footfall"
              value="86%"
              direction="flat"
              polarity="up-is-good"
              changeText="vs 2019 levels · 14% lower than pre-pandemic · Has not recovered"
              sparklineData={footfallSparklineData}
              source="Source: Springboard Retail Footfall Monitor, 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mb-16">
            <LineChart
              title="High street vacancy rate, UK, 2012–2024"
              subtitle="Percentage of high street retail units that are vacant. Reached 14.5% after the pandemic — 1 in 7 units empty. Has not recovered."
              series={vacancySeries}
              annotations={vacancyAnnotations}
              yLabel="%"
            />
            <SourceAttribution
              name="Local Data Company"
              dataset="UK retail vacancy rates (quarterly)"
              frequency="quarterly"
              url="https://www.localdatacompany.com/research"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mb-16">
            <LineChart
              title="Online retail as share of total retail sales, 2010–2024"
              subtitle="Online shopping has grown from 6.4% to 27.3% of all retail spending in 14 years. The COVID surge was partly permanent."
              series={onlineSeries}
              annotations={onlineAnnotations}
              yLabel="%"
            />
            <SourceAttribution
              name="ONS"
              dataset="Retail sales, internet sales as a percentage of total"
              frequency="monthly"
              url="https://www.ons.gov.uk/businessindustryandtrade/retailindustry/bulletins/retailsales/latest"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mb-16">
            <LineChart
              title="Net store closures, UK, 2015–2024"
              subtitle="Store openings minus closures. Every year since 2015 has seen more stores close than open. The pandemic accelerated a pre-existing trend."
              series={closureSeries}
              annotations={closureAnnotations}
              yLabel="Net closures"
            />
            <SourceAttribution
              name="PwC/Local Data Company"
              dataset="Annual retail census — net store closures"
              frequency="annual"
              url="https://www.localdatacompany.com/research"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section className="bg-wiah-light rounded-lg p-8 mb-16">
            <h2 className="text-2xl font-bold text-wiah-black mb-6">The picture</h2>
            <div className="space-y-4 text-wiah-black leading-relaxed">
              <p>
                Britain has the highest retail vacancy rate in Europe: 14%, against an EU average of roughly 8%. More
                than 50,000 stores have closed on a net basis since 2015, with every single year recording more
                shuttered shopfronts than new openings. The worst year was 2020, when 9,092 net closures were logged
                in a single twelve-month period; 2024 still saw 5,234. The carnage of 2019 was emblematic—Debenhams
                (2,500 jobs), Arcadia (13,000 jobs), Bonmarch&eacute;, Thomas Cook, and Mothercare all collapsed within
                months of each other. Footfall has stabilised at 86% of its 2019 level, but the composition has
                shifted: more leisure visits, fewer shopping trips, shorter dwell times.
              </p>
              <p>
                The structural driver is digital migration. Online retail accounted for 6.4% of total sales in 2010;
                by 2024 it was 27.3%—the highest penetration of any major European economy. The pandemic compressed
                years of adoption into months, and the shift proved largely irreversible. Meanwhile, the tax system
                actively penalises physical presence. Retailers pay roughly £7bn a year in business rates,
                calculated on 2015 rateable values until a belated 2022 revaluation. Online competitors face a
                fraction of this burden. The result is a playing field tilted decisively against the shop with a
                front door and a till.
              </p>
              <p>
                Government has responded with £12bn in levelling-up fund allocations, business rates relief
                for small retailers, and new High Street Rental Auction powers introduced in 2024 that let local
                councils compel landlords to let empty units. None of it has reversed the headline vacancy rate. What
                is changing is the mix. Coffee shops, gyms, hair salons, food delivery hubs, and community services
                are replacing the clothing and electrical retailers that once anchored town centres. The high street
                is not disappearing—it is being repurposed. Whether that repurposing amounts to renewal or
                managed decline depends largely on where you live.
              </p>
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What's improving"
            value="86%"
            unit="of pre-pandemic footfall maintained in 2024"
            description="Town centre footfall has stabilised at around 86% of 2019 levels and has held at that level for two years — suggesting the post-pandemic adjustment has largely been made. Hospitality, services, and leisure are replacing closed retail: the number of coffee shops, gyms, hairdressers, and food businesses in town centres is higher than in 2019. The mix is different, not simply smaller."
            source="Source: Springboard — UK Retail Footfall Monitor 2024."
          />
        </ScrollReveal>

        <ScrollReveal>
          <section className="mt-16 pt-8 border-t border-wiah-border">
            <h2 className="text-2xl font-bold text-wiah-black mb-6">Sources and methodology</h2>
            <div className="space-y-4 text-wiah-mid text-sm font-mono">
              {data.metadata.sources.map((source, i) => (
                <div key={i}>
                  <div className="font-semibold text-wiah-black">
                    {source.name} — {source.dataset}
                  </div>
                  <div>
                    <a href={source.url} className="text-wiah-blue hover:underline break-all">
                      {source.url}
                    </a>
                  </div>
                  <div>Frequency: {source.frequency}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-wiah-mid text-sm">
              <p className="mb-4">
                <strong>Methodology:</strong> {data.metadata.methodology}
              </p>
              <p>
                <strong>Known issues:</strong>
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                {data.metadata.knownIssues.map((issue, i) => (
                  <li key={i}>{issue}</li>
                ))}
              </ul>
            </div>
          </section>
        </ScrollReveal>
              <RelatedTopics />
      </main>
    </div>
  )
}
