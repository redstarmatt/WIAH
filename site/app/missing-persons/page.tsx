'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series, Annotation } from '@/components/charts/LineChart'
import PositiveCallout from '@/components/PositiveCallout'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import RelatedTopics from '@/components/RelatedTopics'
import Cite from '@/components/Cite'
import References, { Reference } from '@/components/References'

const editorialRefs: Reference[] = [
  { num: 1, name: 'NCA', dataset: 'UK Missing Persons Unit Data Report', url: 'https://missingpersons.police.uk/en-gb/resources/downloads/missing-persons-statistical-bulletins', date: '2024' },
  { num: 2, name: 'Department for Education', dataset: 'Children Looked After in England', url: 'https://explore-education-statistics.service.gov.uk/find-statistics/children-looked-after-in-england-including-adoptions', date: '2024' },
  { num: 3, name: 'Missing People', dataset: 'Key Information on Missing People', url: 'https://www.missingpeople.org.uk/about-us/about-the-issue', date: '2024' },
  { num: 4, name: 'HMICFRS', dataset: 'Missing children: who cares?', url: 'https://www.justiceinspectorates.gov.uk/hmicfrs/publications/missing-children-who-cares/', date: '2023' },
]

// -- Types ------------------------------------------------------------------

interface ReportEntry {
  year: number
  total: number
  repeatPct: number
}

interface CareEntry {
  year: number
  episodes: number
}

interface OutcomeEntry {
  year: number
  foundWithin48hrsPct: number
  longTermMissing: number
}

interface MissingPersonsData {
  national: {
    reports: { timeSeries: ReportEntry[] }
    childrenInCare: { timeSeries: CareEntry[] }
    outcomes: { timeSeries: OutcomeEntry[] }
  }
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function MissingPersonsPage() {
  const [data, setData] = useState<MissingPersonsData | null>(null)

  useEffect(() => {
    fetch('/data/missing-persons/missing_persons.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  /* Chart 1 — Total missing reports */
  const reportsSeries: Series[] = data
    ? [
        {
          id: 'totalReports',
          label: 'Total missing reports',
          colour: '#6B7280',
          data: data.national.reports.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.total,
          })),
        },
      ]
    : []

  const reportsAnnotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: 'COVID-19 lockdowns' },
  ]

  /* Chart 2 — Children in care missing episodes */
  const careSeries: Series[] = data
    ? [
        {
          id: 'careEpisodes',
          label: 'Missing episodes (children in care)',
          colour: '#E63946',
          data: data.national.childrenInCare.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.episodes,
          })),
        },
      ]
    : []

  const careAnnotations: Annotation[] = [
    { date: new Date(2017, 0, 1), label: 'County lines expansion' },
    { date: new Date(2020, 0, 1), label: 'COVID-19 lockdowns' },
  ]

  /* Chart 3 — Outcomes */
  const outcomesSeries: Series[] = data
    ? [
        {
          id: 'foundWithin48hrs',
          label: 'Found within 48 hours (%)',
          colour: '#2A9D8F',
          data: data.national.outcomes.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.foundWithin48hrsPct,
          })),
        },
        {
          id: 'longTermMissing',
          label: 'Long-term missing cases',
          colour: '#E63946',
          data: data.national.outcomes.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.longTermMissing,
          })),
        },
      ]
    : []

  const latest = data?.national.reports.timeSeries.at(-1)
  const latestCare = data?.national.childrenInCare.timeSeries.at(-1)

  return (
    <>
      <TopicNav topic="Missing Persons" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Missing Persons"
          question="What Happens When Someone Goes Missing?"
          finding="Over 170,000 missing person reports are filed each year in England and Wales, three quarters involving people who have gone missing before. Children in care are six times more likely to go missing, and around 2,000 cases remain unresolved long-term."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Every year, more than 170,000 missing person reports are filed with police forces across England and Wales.<Cite nums={1} /> Behind each report is a family in crisis, a vulnerable individual at risk, or a child being exploited. Three quarters of all missing reports are repeat cases &mdash; the same individuals going missing again and again, often driven by mental health crises, domestic abuse, or exploitation.<Cite nums={1} /> Children in local authority care are six times more likely to go missing than children in the general population, a pattern that has worsened as county lines drug networks increasingly target residential care homes for recruitment.<Cite nums={2} /> Police forces spend an estimated &pound;700 million per year on missing persons investigations, making it one of the largest single demands on policing resources.<Cite nums={3} /> The NCA Missing Persons Unit coordinates national intelligence, but the operational burden falls on 43 separate police forces with inconsistent recording practices and varying levels of specialist resource.</p>
            <p>The outcomes picture is mixed. Most missing people are found within 48 hours &mdash; but the proportion resolved quickly has been declining slowly, from 85% in 2014 to around 82% now.<Cite nums={1} /> Roughly 2,000 cases remain open long-term, a figure that has been gradually rising.<Cite nums={1} /> Mental health is flagged as a contributing factor in more than 40% of adult missing episodes, yet the availability of crisis mental health support varies dramatically by area.<Cite nums={3} /> Dementia-related missing episodes have doubled over the past decade as the condition becomes more prevalent, placing new demands on police and care services alike. Exploitation &mdash; through county lines networks and trafficking &mdash; is an increasingly significant driver of child missing episodes, with many children going missing repeatedly as they are moved between locations by criminal networks.<Cite nums={4} /> The structural factors driving the numbers upward &mdash; inadequate mental health provision, underfunded care placements, and an ageing population &mdash; show no sign of reversing.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-reports', label: 'Missing Reports' },
          { id: 'sec-care', label: 'Children in Care' },
          { id: 'sec-outcomes', label: 'Outcomes' },
          { id: 'sec-positive', label: 'Progress' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Missing reports per year"
              value={latest ? (latest.total / 1000).toFixed(0) + 'k' : '—'}
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="+18% since 2014 · ~470 reports per day"
              sparklineData={data?.national.reports.timeSeries.map(d => d.total) ?? []}
              href="#sec-reports"
              source="NCA · UK Missing Persons Unit Data Report 2024"
            />
            <MetricCard
              label="Repeat cases"
              value={latest ? latest.repeatPct + '%' : '—'}
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="+7pp since 2014 · same individuals, recurring crises"
              sparklineData={data?.national.reports.timeSeries.map(d => d.repeatPct) ?? []}
              href="#sec-reports"
              source="NCA · UK Missing Persons Unit Data Report 2024"
            />
            <MetricCard
              label="Children in care missing episodes"
              value={latestCare ? (latestCare.episodes / 1000).toFixed(1) + 'k' : '—'}
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="+77% since 2014 · exploitation a growing driver"
              sparklineData={data?.national.childrenInCare.timeSeries.map(d => d.episodes) ?? []}
              href="#sec-care"
              source="DfE · Children Looked After in England 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-reports" className="mb-12">
            <LineChart
              title="Total missing person reports, England and Wales, 2014–2024"
              subtitle="Annual missing person reports filed with police forces. COVID-19 lockdowns temporarily reduced reports in 2020 before the upward trend resumed."
              series={reportsSeries}
              annotations={reportsAnnotations}
              yLabel="Reports"
              source={{
                name: 'NCA',
                dataset: 'UK Missing Persons Unit Data Report',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-care" className="mb-12">
            <LineChart
              title="Missing episodes for children in care, England, 2014–2024"
              subtitle="Number of missing episodes involving looked-after children. County lines expansion since 2017 and exploitation through criminal networks are key drivers of the sustained increase."
              series={careSeries}
              annotations={careAnnotations}
              yLabel="Episodes"
              source={{
                name: 'DfE',
                dataset: 'Children Looked After in England',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-outcomes" className="mb-12">
            <LineChart
              title="Missing persons outcomes, 2014–2024"
              subtitle="Percentage found within 48 hours (green, left axis) alongside total long-term missing cases (red). Resolution rates are slowly declining while the number of unresolved cases grows."
              series={outcomesSeries}
              yLabel="% / Cases"
              source={{
                name: 'NCA / Missing People',
                dataset: 'Missing Persons Outcomes Data',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-positive" className="mb-12">
            <PositiveCallout
              title="Improving response"
              value="43"
              unit="police forces"
              description="The Herbert Protocol for dementia patients and the Philomena Protocol for children in care have been adopted by all 43 police forces in England and Wales, reducing response times for the most vulnerable missing persons. Child Exploitation and Missing (CEM) teams now operate in most police force areas, providing specialist resource for cases involving exploitation through county lines and trafficking networks."
              source="NCA Missing Persons Unit · Herbert Protocol / Philomena Protocol national rollout 2023"
            />
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>NCA &mdash; UK Missing Persons Unit Data Report. Annual statistical bulletin covering England and Wales. missingpersons.police.uk/en-gb/resources/downloads/missing-persons-statistical-bulletins</p>
            <p>Department for Education &mdash; Children Looked After in England including Adoptions. Annual statistical release covering missing episodes for looked-after children. explore-education-statistics.service.gov.uk/find-statistics/children-looked-after-in-england-including-adoptions</p>
            <p>Missing People &mdash; Key Information on Missing People. Annual charity research and data. missingpeople.org.uk/about-us/about-the-issue</p>
            <p>Recording practices vary between police forces, particularly for repeat missing episodes. COVID-19 lockdowns in 2020 reduced reported missing incidents but may have masked hidden harm. Children in care data covers England only; NCA data covers England and Wales. Long-term missing figures include cases where the individual may have left the UK or assumed a new identity. Mental health as a contributing factor is likely underreported due to inconsistent flagging in police records.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  )
}
