'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'Home Office', dataset: 'Knife and Offensive Weapon Statistics 2024', url: 'https://www.gov.uk/government/statistics/knife-and-offensive-weapon-statistics', date: '2024' },
  { num: 2, name: 'Home Office', dataset: 'Crime Outcomes in England and Wales 2024', url: 'https://www.gov.uk/government/collections/crime-outcomes-in-england-and-wales-statistics', date: '2024' },
  { num: 3, name: 'Home Office', dataset: 'Violence Reduction Units — Year 4 Evaluation', url: 'https://www.gov.uk/government/publications/violence-reduction-units', date: '2023' },
];

// -- Types ------------------------------------------------------------------

interface KnifeCrimeGeoRow {
  year: number
  totalOffences?: number
  londonRate?: number
  nationalRate?: number
}

interface KnifeCrimeGeographyData {
  topic: string
  lastUpdated: string
  timeSeries: KnifeCrimeGeoRow[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function KnifeCrimeGeographyPage() {
  const [data, setData] = useState<KnifeCrimeGeographyData | null>(null)

  useEffect(() => {
    fetch('/data/knife-crime-geography/knife_crime_geography.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const offencesSeries: Series[] = data
    ? [
        {
          id: 'totalOffences',
          label: 'Total knife offences',
          colour: '#E63946',
          data: data.timeSeries
            .filter(d => d.totalOffences !== undefined)
            .map(d => ({
              date: yearToDate(d.year),
              value: d.totalOffences!,
            })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Knife Crime Geography" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Knife Crime Geography"
          question="Where Is Knife Crime Worst?"
          finding="Knife offences vary 12-fold between police force areas — with London recording three times the national average rate."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Knife crime in England and Wales peaked at 50,836 recorded offences in 2023 before falling to 48,400 in 2024.<Cite nums={1} /> The national trend masks enormous geographic variation: London accounts for roughly a quarter of all knife offences at a rate around three times the national average, concentrated in a small number of inner south and east London boroughs. Force-level variation is 12-fold, from rural forces under 10 offences per 100,000 to the Metropolitan Police at over 120.<Cite nums={1} /> Economic deprivation is the strongest predictor of concentrated knife crime — areas with high youth unemployment, inadequate housing, and reduced youth services consistently record higher rates. The county lines drug supply model has extended knife violence into market towns and coastal communities that previously would not have featured in the data.</p>
            <p>Violence reduction units, funded since 2019 in the highest-rate areas, have adopted a public health approach treating violence as preventable, and early evaluations show measurable reductions in hospital admissions for assault.<Cite nums={3} /> Stop and search powers were expanded but have not demonstrably reduced knife crime at the population level; critics argue intensive use without intelligence erodes community trust particularly among young Black men, who are stopped at many times the rate of white counterparts. The 2024 downward trend is fragile: it coincides with disruption of county lines networks and post-COVID stabilisation, but whether it continues depends on sustained prevention investment and whether the underlying economic conditions — concentrated deprivation, high youth unemployment, housing insecurity — are themselves addressed.<Cite nums={2} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Knife Crime Trend' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Total knife offences"
              value="48,400"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="falling from peak · prevention working in some areas"
              sparklineData={[32832, 35000, 39598, 44076, 46000, 44800, 46975, 49027, 50836, 48400]}
              href="#sec-chart"source="Home Office · Crime Outcomes 2024"
            />
            <MetricCard
              label="London vs national rate"
              value="2.7&times;"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="London still 2.7x national rate · concentrated in deprived areas"
              sparklineData={[2.6, 2.6, 2.7, 2.7, 2.9, 2.8, 2.8, 2.8, 2.7, 2.7]}
              href="#sec-chart"source="Home Office · Knife and Offensive Weapon Statistics 2024"
            />
            <MetricCard
              label="Force variation"
              value="12&times;"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="range from 8 to 96 per 100k between forces"
              sparklineData={[10, 10, 11, 11, 12, 12, 12, 12, 12, 12]}
              href="#sec-chart"source="Home Office · Knife Crime Open Data 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Total knife and offensive weapon offences, 2015–2024"
              subtitle="Police recorded knife or sharp instrument offences. England and Wales. Excludes Greater Manchester for years where data unavailable."
              series={offencesSeries}
              yLabel="Offences"
              source={{
                name: 'Home Office',
                dataset: 'Knife and Offensive Weapon Statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Home Office — Knife and Offensive Weapon Statistics. Annual data by police force area. gov.uk/government/statistics/knife-and-offensive-weapon-statistics</p>
            <p>Home Office — Crime Outcomes in England and Wales. Annual bulletin including knife offence outcomes. gov.uk/government/collections/crime-outcomes-in-england-and-wales-statistics</p>
            <p>Knife offences include homicide with a sharp instrument, attempted murder, GBH, robbery, and possession offences involving a knife or sharp instrument. Rate calculations use ONS mid-year population estimates. London rate uses MPS data; national rate excludes GMP in years where data quality was flagged.</p>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  )
}
