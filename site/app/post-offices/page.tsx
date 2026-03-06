'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface PostOfficeData {
  national: {
    branchCount: Array<{ year: number; branches: number }>
    ruralAccess: Array<{ year: number; pctWithin3Miles: number }>
  }
}

function yearToDate(y: number): Date {
  return new Date(y, 5, 1)
}

export default function PostOfficesPage() {
  const [data, setData] = useState<PostOfficeData | null>(null)

  useEffect(() => {
    fetch('/data/post-offices/post_offices.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const branchSeries: Series[] = data
    ? [{
        id: 'branches',
        label: 'Post Office branches',
        colour: '#6B7280',
        data: data.national.branchCount.map(d => ({ date: yearToDate(d.year), value: d.branches })),
      }]
    : []

  const accessSeries: Series[] = data
    ? [{
        id: 'rural-access',
        label: 'Rural population within 3 miles of a branch',
        colour: '#264653',
        data: data.national.ruralAccess.map(d => ({ date: yearToDate(d.year), value: d.pctWithin3Miles })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Post Offices" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Post Offices"
          question="Is the Post Office Network Actually Surviving?"
          finding="The UK has lost 7,210 post office branches since 2000, a decline of 39%. Around 11,180 remain, but rural communities have been disproportionately affected, with 15% of the rural population now more than 3 miles from a branch."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK Post Office network stood at 18,390 branches in 2000 &mdash; the culmination of over 350 years as one of the most extensive retail networks in the country. By 2024, that number had fallen to approximately 11,180, a reduction of 39%. The steepest decline came between 2005 and 2008, when the Labour government&apos;s Network Change Programme closed 2,367 branches in a single consolidation round. The pace of closure has slowed since then, but a steady attrition of 100&ndash;150 branches per year continues, driven primarily by the retirement of sub-postmasters who cannot find successors and the declining commercial viability of rural outlets. Post Office Ltd operates as a government-owned company; sub-postmasters are self-employed agents, not employees &mdash; a distinction that has been central to many of the network&apos;s problems.</p>
            <p>The shift from Crown offices to franchise operations has accelerated in recent years. Crown post offices &mdash; directly operated by Post Office Ltd on high streets &mdash; have been systematically converted to franchise counters inside WHSmith and other retailers, reducing from 373 Crown offices in 2013 to fewer than 80 by 2024. This saves Post Office Ltd money but often reduces service quality: franchise counters have limited opening hours, smaller premises, and staff less familiar with complex transactions. Meanwhile, the Horizon IT scandal &mdash; in which 900-plus sub-postmasters were wrongly prosecuted between 1999 and 2015 due to a faulty Fujitsu accounting system &mdash; devastated trust in the institution and made recruitment of new sub-postmasters significantly harder.</p>
            </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-branches', label: 'Branch Count' },
          { id: 'sec-access', label: 'Rural Access' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Post office branches remaining"
              value="11,180"
              direction="down"
              polarity="up-is-good"
              changeText="Down from 18,390 in 2000 &mdash; a 39% decline"
              sparklineData={[18390, 14376, 12009, 11737, 11634, 11547, 11416, 11302, 11180]}
              source="Post Office Ltd annual data"
              onExpand={() => {}}
            />
            <MetricCard
              label="Branches lost since 2000"
              value="7,210"
              direction="up"
              polarity="up-is-bad"
              changeText="100&ndash;150 closures per year continue; recruitment of sub-postmasters remains difficult"
              sparklineData={[0, 4014, 6381, 6653, 6756, 6843, 6974, 7088, 7210]}
              source="Post Office Ltd"
              onExpand={() => {}}
            />
            <MetricCard
              label="Rural pop. more than 3 miles from branch"
              value="15"
              unit="%"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 7% in 2010; Scotland and Wales worst affected"
              sparklineData={[7, 9, 11, 12, 14, 15]}
              source="Post Office Ltd access data"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-branches" className="mb-12">
            <LineChart
              title="UK Post Office branches, 2000&ndash;2024"
              subtitle="Total number of post office branches across the UK. Post Office Ltd annual data."
              series={branchSeries}
              yLabel="Branches"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-access" className="mb-12">
            <LineChart
              title="Rural population within 3 miles of a post office, 2010&ndash;2024"
              subtitle="Percentage of rural residents meeting the government&apos;s access criterion. Post Office Ltd."
              series={accessSeries}
              yLabel="% within 3 miles"
            />
          </section>
        </ScrollReveal>
      </main>
    </>
  )
}
