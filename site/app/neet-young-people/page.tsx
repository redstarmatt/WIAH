'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface TimeSeriesPoint {
  year: number
  neetThousands: number
  neetRatePct: number
}

interface NeetYoungPeopleData {
  timeSeries: TimeSeriesPoint[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function NeetYoungPeoplePage() {
  const [data, setData] = useState<NeetYoungPeopleData | null>(null)

  useEffect(() => {
    fetch('/data/neet-young-people/neet_young_people.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const neetSeries: Series[] = data
    ? [{
        id: 'neet',
        label: 'NEET young people (thousands)',
        colour: '#E63946',
        data: data.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.neetThousands,
        })),
      }]
    : []

  const neetTargetLine = { value: 700, label: 'Target: <8% rate (~700k)' }

  return (
    <>
      <TopicNav topic="Education" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Education"
          question="How Many Young People Are Going Nowhere?"
          finding="857,000 young people aged 16&ndash;24 are not in education, employment or training &mdash; nearly 1 in 8 of their age group."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Approximately 830,000 young people in England were NEET &mdash; not in education, employment or training &mdash; in 2024, equivalent to 11.1&percnt; of all 16&ndash;24 year olds. The number peaked at 900,000 in 2021 as employers stopped hiring and training programmes were disrupted during the pandemic, and remains above the 2019 pre-pandemic level of 770,000, suggesting some of the disengagement has become structural rather than cyclical. Around 190,000 have been NEET for over a year. Long-term NEET status is strongly associated with mental health difficulties, which became significantly more prevalent among young people during the pandemic and have not returned to pre-2020 levels. KPMG has estimated the lifetime cost to the exchequer of NEET status at around &pound;45,000 per young person in reduced tax receipts and increased service use.</p>
            <p>NEET status is deeply unequal in its distribution. Young women are more likely to be NEET than young men, primarily because of caring responsibilities. Young people with disabilities or mental health conditions are significantly overrepresented. Care leavers, those excluded from school, and those in high-deprivation areas face substantially elevated risks &mdash; and have the fewest informal support structures to draw on during the transition to adulthood. The government&apos;s 2024 Youth Guarantee commits to ensuring every 18&ndash;21 year old has access to education, employment or training; whether it will be resourced sufficiently to re-engage those who have already disengaged once from the system remains to be seen.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'NEET Trend' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="NEET young people (2024)"
              value="830k"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="slowly improving &middot; but above 2019 pre-pandemic"
              sparklineData={[840, 820, 800, 790, 770, 860, 900, 870, 857, 830]}
              onExpand={() => {}}
              source="ONS &middot; Young People Not in Education, Employment or Training 2024"
            />
            <MetricCard
              label="NEET rate"
              value="11.1%"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="target &lt;8% &middot; still well above"
              sparklineData={[11.2, 10.9, 10.7, 10.5, 10.3, 11.5, 11.9, 11.6, 11.6, 11.1]}
              onExpand={() => {}}
              source="ONS &middot; Labour Force Survey 2024"
            />
            <MetricCard
              label="Long-term NEET"
              value="190k"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="over 1 year without education or work"
              sparklineData={[150, 155, 160, 162, 160, 180, 195, 192, 190, 190]}
              onExpand={() => {}}
              source="DfE &middot; NEET Statistics 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Young people NEET (16&ndash;24), England, 2015&ndash;2024"
              subtitle="Total NEET young people aged 16&ndash;24. Thousands. Spike in 2020&ndash;21 reflects pandemic disruption; recovery has been incomplete."
              series={neetSeries}
              yLabel="NEET (thousands)"
              targetLine={neetTargetLine}
              source={{
                name: 'ONS / DfE',
                dataset: 'Young People NEET Statistics',
                frequency: 'quarterly',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>ONS &mdash; Young People Not in Education, Employment or Training. Quarterly estimates from Labour Force Survey. ons.gov.uk/employmentandlabourmarket/peopleinwork/employmentandemployeetypes/bulletins/youngpeoplenotineducationemploymentortrainingneet/latest</p>
            <p>DfE &mdash; NEET Statistics Quarterly Brief. Detailed breakdowns by age, gender, ethnicity, and disability. gov.uk/government/collections/statistics-neet</p>
            <p>NEET defined as young people aged 16&ndash;24 who are not engaged in education (including part-time), employment (including self-employment, part-time, and zero-hours contracts), or government-funded training programmes. Estimates are seasonally adjusted annual averages unless otherwise stated.</p>
          </div>
        </section>
      </main>
    </>
  )
}
