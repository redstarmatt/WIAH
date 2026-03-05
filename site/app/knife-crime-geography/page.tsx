'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

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
          finding="Knife offences vary 12-fold between police force areas &mdash; with London recording three times the national average rate."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Knife crime in England and Wales peaked at 50,836 recorded offences in 2023 before falling back to 48,400 in 2024. The national trend masks enormous geographic variation. London accounts for roughly a quarter of all knife offences in England and Wales, at a rate around three times the national average when adjusted for population. Within London, the distribution is highly concentrated: a small number of boroughs in inner south and east London account for a disproportionate share of incidents. The force-level variation is 12-fold, ranging from rural forces with under 10 offences per 100,000 population to the Metropolitan Police at over 120 per 100,000.</p>
            <p>Understanding why knife crime concentrates in specific geographies requires looking at the underlying determinants. Economic deprivation is the strongest predictor: areas with high youth unemployment, inadequate housing, reduced access to youth services, and high levels of community breakdown consistently record higher knife crime rates. The county lines model of drug supply &mdash; under which urban dealers exploit young people to transport and sell drugs in smaller towns &mdash; has extended knife violence into market towns and coastal communities that would not previously have featured in knife crime data. The geography of knife crime in 2024 is not limited to London; it follows the geography of drug supply networks.</p>
            <p>Prevention initiatives have shown measurable results in specific contexts. Violence reduction units, funded since 2019 in areas with the highest knife crime rates, have adopted a public health approach treating violence as a preventable condition with social determinants. Hospital-based violence intervention programmes, embedded in A&amp;E departments, have achieved reductions in repeat violence among those they reach. Street-based youth work, credible messengers with lived experience of violence, and targeted enforcement that disrupts specific gangs and networks have all shown evidence of effect. The challenge is scaling these approaches with consistent funding.</p>
            <p>Judicial responses have evolved. Minimum sentences for repeat knife possession offences were introduced and strengthened. Stop and search powers were expanded. Neither change has demonstrably reduced knife crime at the population level, though proponents argue they incapacitate the most active offenders. Critics argue that intensive stop and search without intelligence erodes community trust, particularly among young Black men who are stopped at many times the rate of white counterparts, and that this erosion makes community-based intelligence sharing harder, ultimately undermining investigation of serious violence.</p>
            <p>The downward trend in 2024 is encouraging but fragile. It coincides with continued violence reduction unit activity, a disruption of several significant county lines networks, and post-COVID stabilisation of youth group dynamics that had become more volatile during the pandemic period. Whether the trend continues depends substantially on sustained investment in prevention and on whether the economic conditions that correlate with youth violence &mdash; concentrated deprivation, inadequate housing, high youth unemployment &mdash; are themselves addressed. Knife crime, like most forms of serious violence, is a symptom of social conditions that police and courts can manage at the margins but cannot resolve alone.</p>
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
              changeText="falling from peak &middot; prevention working in some areas"
              sparklineData={[32832, 35000, 39598, 44076, 46000, 44800, 46975, 49027, 50836, 48400]}
              onExpand={() => {}}
              source="Home Office &middot; Crime Outcomes 2024"
            />
            <MetricCard
              label="London vs national rate"
              value="2.7&times;"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="London still 2.7x national rate &middot; concentrated in deprived areas"
              sparklineData={[2.6, 2.6, 2.7, 2.7, 2.9, 2.8, 2.8, 2.8, 2.7, 2.7]}
              onExpand={() => {}}
              source="Home Office &middot; Knife and Offensive Weapon Statistics 2024"
            />
            <MetricCard
              label="Force variation"
              value="12&times;"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="range from 8 to 96 per 100k between forces"
              sparklineData={[10, 10, 11, 11, 12, 12, 12, 12, 12, 12]}
              onExpand={() => {}}
              source="Home Office &middot; Knife Crime Open Data 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Total knife and offensive weapon offences, 2015&ndash;2024"
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

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Home Office &mdash; Knife and Offensive Weapon Statistics. Annual data by police force area. gov.uk/government/statistics/knife-and-offensive-weapon-statistics</p>
            <p>Home Office &mdash; Crime Outcomes in England and Wales. Annual bulletin including knife offence outcomes. gov.uk/government/collections/crime-outcomes-in-england-and-wales-statistics</p>
            <p>Knife offences include homicide with a sharp instrument, attempted murder, GBH, robbery, and possession offences involving a knife or sharp instrument. Rate calculations use ONS mid-year population estimates. London rate uses MPS data; national rate excludes GMP in years where data quality was flagged.</p>
          </div>
        </section>
      </main>
    </>
  )
}
