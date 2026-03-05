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
            <p>The UK Post Office network stood at 18,390 branches in 2000; by 2024 it had fallen to approximately 11,180 &mdash; a 39% reduction. The steepest single decline came between 2005 and 2008, when the Network Change Programme closed 2,367 branches. Since then, 100&ndash;150 closures per year continue, driven by retiring sub-postmasters who cannot find successors and the declining viability of rural outlets. Crown post offices &mdash; directly run by Post Office Ltd &mdash; have been converted to franchise counters in WHSmith stores, falling from 373 in 2013 to fewer than 80 by 2024, reducing both service quality and opening hours. The Horizon IT scandal, in which 900-plus sub-postmasters were wrongly prosecuted between 1999 and 2015, has made recruitment of replacements significantly harder. The government provides &pound;50 million annually to maintain the network, and access criteria require 99% of the population to live within 3 miles of a branch &mdash; but these standards carry no statutory force.</p>
            <p>Rural communities bear the sharpest impact. Post Office Ltd data shows 15% of the rural population now lives more than 3 miles from a branch, up from 7% in 2010; the Highlands and Islands have lost 34% of branches since 2005. The consequences extend well beyond postal services: post offices process over 3,400 cash withdrawals per branch per month and in many rural areas are the last remaining community hub for banking access. Scotland and Wales have been hardest hit nationally, with closures clustering in the South West, East Anglia, and East Midlands in England.</p>
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
