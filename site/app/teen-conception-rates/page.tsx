'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import PositiveCallout from '@/components/PositiveCallout'

// -- Types ------------------------------------------------------------------

interface TeenConceptionEntry {
  year: number
  under18RatePer1000: number
}

interface TeenConceptionData {
  timeSeries: TeenConceptionEntry[]
  deprivationGap: {
    mostDeprived: number
    leastDeprived: number
  }
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function TeenConceptionRatesPage() {
  const [data, setData] = useState<TeenConceptionData | null>(null)

  useEffect(() => {
    fetch('/data/teen-conception-rates/teen_conception_rates.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [{
        id: 'under18Rate',
        label: 'Under-18 conception rate per 1,000',
        colour: '#2A9D8F',
        data: data.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.under18RatePer1000,
        })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Teen Conception Rates" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Teen Conception Rates"
          question="Is Teenage Pregnancy Still a Problem?"
          finding="Under-18 conception rates have fallen to a record low of 13 per 1,000 &mdash; one of the greatest public health successes of the past 25 years."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The under-18 conception rate in England has fallen from 47 per 1,000 in 1999 to 13.1 per 1,000 in 2022 &mdash; a decline of 72% in a single generation. This is one of the most significant public health achievements of the past 25 years, and it is largely a policy success story: the result of sustained investment in the Teenage Pregnancy Strategy launched by the Labour government in 1999, improvements in sex and relationships education, and greatly improved access to contraception, particularly long-acting reversible contraception (LARC).</p>
            <p>The strategy that drove this change had several key components: explicit national targets that created accountability; dedicated teenage pregnancy coordinators in every local authority; investment in school-based sex education and youth contraception services; and a determined effort to destigmatise young people seeking contraceptive advice. The approach was evidence-based, long-term, and given sufficient funding and political backing to sustain momentum. It worked.</p>
            <p>The comparison with our European neighbours is instructive. In 1999, England had one of the highest teenage pregnancy rates in Western Europe. By 2022, the rate had converged with countries like Germany and France, though the Netherlands and Scandinavian countries &mdash; with longer traditions of comprehensive sex education &mdash; remain lower. The English rate is now unremarkable by European standards, which would have seemed extraordinary at the turn of the millennium.</p>
            <p>However, the deprivation gradient remains stark and concerning. In the most deprived areas, the under-18 conception rate is 32 per 1,000 &mdash; more than three times the rate of 9.8 per 1,000 in the least deprived areas. This gap has not narrowed as the overall rate has fallen: if anything, it has slightly widened. Teenage pregnancy is no longer a widespread population-level problem; it is a concentrated indicator of deprivation, educational disadvantage, and inadequate support for young women in the poorest communities.</p>
            <p>The cuts to public health budgets since 2015 have eroded some of the infrastructure that drove the decline. Local authority public health funding has fallen in real terms, sexual health services have been reduced, and some areas have seen the closure of young people&rsquo;s contraception clinics. Youth contraception access is more difficult in some parts of England than it was a decade ago. The risk is that hard-won gains begin to reverse, particularly in areas where the infrastructure has been most depleted. Sustaining this success requires continued investment in the services that created it.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Conception Rate Trend' },
          { id: 'sec-callout', label: 'Positive Signal' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Under-18 rate"
              value="13.1 per 1,000"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="record low &middot; 72% fall since 1999"
              sparklineData={[47.1, 42.5, 41.9, 35.5, 27.7, 18.8, 14.4, 13.4, 13.1]}
              onExpand={() => {}}
              source="ONS &middot; Conceptions in England and Wales 2022"
            />
            <MetricCard
              label="Since 1999"
              value="-72%"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="transformation in a generation &middot; sex education + contraception"
              sparklineData={[47.1, 42.5, 35.5, 27.7, 18.8, 14.4, 13.1]}
              onExpand={() => {}}
              source="ONS &middot; Conceptions in England and Wales 2022"
            />
            <MetricCard
              label="Deprivation gap"
              value="3.3&times;"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="most deprived 32 vs least deprived 10 per 1,000"
              sparklineData={[3.0, 3.1, 3.1, 3.2, 3.2, 3.3]}
              onExpand={() => {}}
              source="ONS &middot; Conceptions by deprivation decile 2022"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Under-18 conception rate, England, 1999&ndash;2022"
              subtitle="Conceptions per 1,000 women aged under 18. Includes conceptions leading to births and those terminated. The 72% fall since 1999 is one of the most significant public health achievements of the era."
              series={series}
              yLabel="Rate per 1,000"
              source={{
                name: 'Office for National Statistics',
                dataset: 'Conceptions in England and Wales',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <div id="sec-callout">
            <PositiveCallout
              title="A 72% Fall &mdash; One of the UK&rsquo;s Greatest Health Successes"
              value="13.1"
              unit="per 1,000 under-18s"
              description="Under-18 conception rates have fallen by nearly three quarters since 1999, from 47 to 13 per 1,000. This was driven by the Teenage Pregnancy Strategy, better sex education and improved contraception access &mdash; and it saved hundreds of thousands of young lives from disruption."
              source="ONS, Conceptions in England and Wales, 2024"
            />
          </div>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Office for National Statistics &mdash; Conceptions in England and Wales. Annual statistical bulletin. ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/conceptionandfertilityrates/bulletins/conceptionstatisticsenglandandwales/</p>
            <p>ONS &mdash; Conceptions by index of multiple deprivation. Supplementary tables published with annual conceptions bulletin.</p>
            <p>Conception rate is conceptions per 1,000 women aged 15&ndash;17. Includes both maternities (live births and stillbirths) and legal abortions. Excludes miscarriages. Data for the most recent years are provisional and subject to revision. Deprivation gap is the ratio of the conception rate in the most deprived quintile to the least deprived quintile of LSOAs.</p>
          </div>
        </section>
      </main>
    </>
  )
}
