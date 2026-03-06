'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface LocalPressClosuresRow {
  year: number
  localPapersCount: number
  newsDeserts?: number
}

interface LocalPressClosuresData {
  topic: string
  lastUpdated: string
  timeSeries: LocalPressClosuresRow[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function LocalPressClosuresPage() {
  const [data, setData] = useState<LocalPressClosuresData | null>(null)

  useEffect(() => {
    fetch('/data/local-press-closures/local_press_closures.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const papersSeries: Series[] = data
    ? [
        {
          id: 'localPapersCount',
          label: 'Local newspapers',
          colour: '#6B7280',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.localPapersCount,
          })),
        },
        {
          id: 'newsDeserts',
          label: 'News desert communities',
          colour: '#E63946',
          data: data.timeSeries
            .filter(d => d.newsDeserts !== undefined)
            .map(d => ({
              date: yearToDate(d.year),
              value: d.newsDeserts as number,
            })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Local Press Closures" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Local Press Closures"
          question="Is Local News Disappearing?"
          finding="Over 320 local newspapers have closed since 2008, leaving more than 200 communities with no local press coverage at all."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Britain&rsquo;s local newspaper industry has contracted sharply since the late 2000s: from a peak of around 1,100 local papers in 2008, the count had fallen to approximately 760 by 2024 — a loss of more than 340 titles. Print advertising revenue collapsed as classifieds migrated to Gumtree and Facebook Marketplace, while digital advertising consolidated in Google and Meta, leaving local titles starved of income. By 2024, more than 210 areas of the UK had no meaningful local print or digital news coverage at all. The BBC&rsquo;s 2024 restructuring of local radio — merging 38 local stations into regional hubs — removed a further layer of accountability journalism that had partly compensated for newspaper closures.</p>
            <p>The democratic consequences are measurable. Academic research has found correlations between local newspaper closure and lower voter turnout, less competitive local elections, higher levels of uncontested council seats, and reduced public awareness of local government decisions. Local newspapers performed functions no other institution replicates at scale — attending council meetings, scrutinising planning applications, reporting court proceedings — and no systemic replacement has emerged. Public interest media startups and community newsletters cover some gaps, but rarely the civic functions that hold local power to account.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Press Closures' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Papers closed since 2008"
              value="340+"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="from 1,100 to 760 · local accountability suffering"
              sparklineData={[1100, 1020, 940, 880, 820, 780, 740, 720, 780, 760]}
              href="#sec-chart"source="Press Gazette · Local News Index 2024"
            />
            <MetricCard
              label="News desert communities"
              value="210 areas"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="no local print or digital news · democracy gap"
              sparklineData={[0, 0, 80, 130, 160, 190, 200, 210]}
              href="#sec-chart"source="Reuters Institute · UK Local News 2024"
            />
            <MetricCard
              label="BBC local stations"
              value="38 stations"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="merged to regional hubs 2024 · further local coverage loss"
              sparklineData={[38, 38, 38, 38, 38, 38, 38, 38]}
              href="#sec-chart"source="BBC · Local Radio Restructure 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Local newspapers and news deserts, 2008–2024"
              subtitle="Number of local newspapers in the UK and communities with no local news coverage."
              series={papersSeries}
              yLabel="Count"
              source={{
                name: 'Press Gazette / Reuters Institute',
                dataset: 'Local News Index',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Press Gazette — Local News Index. Annual audit of local newspaper titles in the UK. pressgazette.co.uk/local-news-index</p>
            <p>Reuters Institute for the Study of Journalism — UK Local News. Annual report tracking news deserts and coverage gaps. reutersinstitute.politics.ox.ac.uk</p>
            <p>NESTA — The State of Local Journalism. nesta.org.uk/report/state-local-journalism</p>
            <p>News desert count reflects communities (typically defined as local authority district level) where no newspaper, local news website, or BBC local station provides regular coverage of local government affairs. BBC station merger data reflects 2024 restructuring announcement.</p>
          </div>
        </section>
      </main>
    </>
  )
}
