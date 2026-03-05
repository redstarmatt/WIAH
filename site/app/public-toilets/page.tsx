'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface ToiletData {
  national: {
    publicToilets: Array<{ year: number; count: number }>
    councilSpending: Array<{ year: number; millionGBP: number }>
  }
}

function yearToDate(y: number): Date {
  return new Date(y, 5, 1)
}

export default function PublicToiletsPage() {
  const [data, setData] = useState<ToiletData | null>(null)

  useEffect(() => {
    fetch('/data/public-toilets/public_toilets.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const toiletSeries: Series[] = data
    ? [{
        id: 'toilets',
        label: 'Council-run public toilets',
        colour: '#6B7280',
        data: data.national.publicToilets.map(d => ({ date: yearToDate(d.year), value: d.count })),
      }]
    : []

  const spendingSeries: Series[] = data
    ? [{
        id: 'spending',
        label: 'Council spending on public toilets',
        colour: '#264653',
        data: data.national.councilSpending.map(d => ({ date: yearToDate(d.year), value: d.millionGBP })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Public Toilets" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Public Toilets"
          question="Has Britain Actually Lost Its Public Toilets?"
          finding="The number of council-run public toilets in England has fallen from 5,600 in 2000 to around 2,350 in 2024 &mdash; a 58% decline. Local authority spending on public conveniences has nearly halved in real terms since 2010."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England had approximately 5,600 council-maintained public toilets in 2000; by 2024 that had fallen to around 2,350 &mdash; a 58% decline. Closure accelerated sharply after 2010 as central government funding to councils fell 49.1% in real terms by 2019/20. Public toilet provision is a discretionary service: councils may provide it but are not required to, and when budgets contract discretionary services go first. Council spending fell from around &pound;120 million in 2010 to &pound;67 million in 2024, a 44% real-terms cut. The Royal Society for Public Health estimated that 4 in 10 people restrict time outside because of inadequate access, with the heaviest impact on older people, disabled people, pregnant women, and those with bowel or bladder conditions. A 2023 Private Member&apos;s Bill to make provision a statutory duty failed to progress through Parliament.</p>
            <p>The burden falls disproportionately on specific groups and geographies. Age UK&apos;s 2023 survey found 36% of over-65s had reduced their outings; Crohn&apos;s &amp; Colitis UK estimates 500,000 people with inflammatory bowel disease rely on reliable access to participate in normal life. Coastal and rural tourist areas face the sharpest pressure, with seaside towns seeing steep closures despite high seasonal demand. Community Toilet Schemes &mdash; paying businesses &pound;500&ndash;&pound;1,500 per year for public access &mdash; have expanded to 160 councils, but hours are restricted to trading times and signage is poor, offering an incomplete substitute.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-count', label: 'Toilet Count' },
          { id: 'sec-spending', label: 'Spending' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Council-run public toilets (England)"
              value="2,350"
              direction="down"
              polarity="up-is-good"
              changeText="Down from 5,600 in 2000 &mdash; a 58% decline"
              sparklineData={[5600, 4800, 4200, 3900, 3570, 3290, 3010, 2780, 2610, 2480, 2350]}
              source="BBC FOI research / British Toilet Association"
              onExpand={() => {}}
            />
            <MetricCard
              label="Council spending on public toilets"
              value="&pound;67m"
              direction="down"
              polarity="up-is-good"
              changeText="Down from &pound;120m in 2010; 44% cut in real terms"
              sparklineData={[120, 105, 93, 84, 78, 72, 69, 67]}
              source="DLUHC Revenue Outturn"
              onExpand={() => {}}
            />
            <MetricCard
              label="Over-65s who limit outings due to lack of toilets"
              value="36"
              unit="%"
              direction="up"
              polarity="up-is-bad"
              changeText="Age UK 2023 survey; 4 in 10 people restrict time outside"
              sparklineData={[25, 28, 30, 33, 35, 36]}
              source="Age UK / Royal Society for Public Health"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-count" className="mb-12">
            <LineChart
              title="Council-run public toilets in England, 2000&ndash;2024"
              subtitle="Estimated number of local authority&ndash;maintained public convenience facilities. Compiled from FOI data."
              series={toiletSeries}
              yLabel="Facilities"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-spending" className="mb-12">
            <LineChart
              title="Local authority spending on public toilets, England, 2010&ndash;2024"
              subtitle="Millions of pounds (&pound;m) per year. DLUHC Revenue Outturn statistics. Nominal terms."
              series={spendingSeries}
              yLabel="&pound; million"
            />
          </section>
        </ScrollReveal>
      </main>
    </>
  )
}
