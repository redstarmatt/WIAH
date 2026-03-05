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
            <p>Not in Education, Employment or Training. NEET is the statistical category for young people aged 16&ndash;24 who are not engaged in any of the structured activities that typically define a pathway to adulthood in a modern economy. In 2024, approximately 830,000 young people in England fell into this category &mdash; equivalent to 11.1% of all 16&ndash;24 year olds. They are not studying, not working, not training. For many, this is not a temporary pause between activities; around 190,000 have been NEET for over a year, a period of sustained disengagement with consequences that compound over time.</p>
            <p>The numbers spiked during the pandemic &mdash; peaking at 900,000 in 2021 as employers stopped hiring and training programmes were disrupted &mdash; and have been declining slowly since. But the 2024 figure of 830,000 is still above the 2019 pre-pandemic level of 770,000, suggesting that some of the pandemic-era disengagement has become structural rather than cyclical. Long-term NEET status is particularly associated with mental health difficulties, which became significantly more prevalent among young people during the pandemic years and have not returned to pre-2020 levels.</p>
            <p>NEET status is not uniformly distributed. Young women are more likely to be NEET than young men, often because of caring responsibilities. Young people with disabilities or mental health conditions are significantly overrepresented. Young people who were looked after children, who experienced exclusion from school, or who live in areas of high deprivation face substantially elevated risks. Ethnic minority groups show divergent patterns: some are more likely to be NEET due to discrimination in the labour market; others are less likely due to strong cultural emphasis on education and family support structures.</p>
            <p>The economic consequences are well-documented. The NEET population imposes substantial costs on public services: higher rates of benefit dependency, higher use of mental health services, increased involvement with the criminal justice system, and lower lifetime tax contributions. KPMG has estimated the annual cost to the exchequer of NEET status at around &pound;45,000 per young person over their lifetime in reduced tax receipts and increased service use. Aggregated across the NEET population, this represents a structural economic burden running into the tens of billions of pounds annually.</p>
            <p>Interventions that work are reasonably well understood: early identification of at-risk young people before they become NEET, intensive one-to-one mentoring and coaching support, guaranteed offers of education or training through programmes like the Youth Guarantee, and employer engagement schemes that provide structured pathways into work. The challenge is funding and sustaining these interventions at the scale required. The government&apos;s Youth Guarantee, announced in 2024, commits to ensuring every 18&ndash;21 year old has access to education, employment or training &mdash; a meaningful commitment if properly resourced and if the quality of provision is sufficient to re-engage young people who have already disengaged once from the system.</p>
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
