'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import RelatedTopics from '@/components/RelatedTopics';

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
          finding="The number of council-run public toilets in England has fallen from 5,600 in 2000 to around 2,350 in 2024 — a 58% decline. Local authority spending on public conveniences has nearly halved in real terms since 2010."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England had approximately 5,600 council-maintained public toilets in 2000. By 2024, that number had fallen to around 2,350 — a reduction of 58%. The rate of closure accelerated sharply after 2010 as local authorities faced sustained budget cuts: total central government funding to councils fell 49.1% in real terms between 2010/11 and 2019/20, according to the National Audit Office. Public toilet provision is a discretionary service — councils may provide them but are not legally required to. When budgets contract, discretionary services are the first to go. The Royal Society for Public Health estimated in 2019 that 4 in 10 people restrict their time outside the home because of inadequate access to public toilets, with the impact heaviest on older people, disabled people, pregnant women, and those with bowel or bladder conditions.</p>
            <p>The closures have accelerated a shift towards commercial alternatives. Many councils have adopted Community Toilet Schemes, paying local businesses £500–£1,500 per year to allow public access to their facilities. The National Association of Local Councils estimated that 160 councils operated such schemes by 2023. However, these alternatives have significant limitations: opening hours are restricted to business trading times, access depends on the business's willingness, and signage is often poor. Public toilets that remain council-operated increasingly charge 20p–50p per use, with automated facilities costing councils £15,000–£25,000 per year to maintain. Meanwhile, the use of changing places facilities — larger, fully accessible rooms with hoists and adjustable benches for severely disabled users — has grown, with 1,900 now registered across the UK, but coverage remains patchy outside hospitals and shopping centres.</p>
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
              changeText="Down from 5,600 in 2000 — a 58% decline"
              sparklineData={[5600, 4800, 4200, 3900, 3570, 3290, 3010, 2780, 2610, 2480, 2350]}
              source="BBC FOI research / British Toilet Association"
              href="#sec-count"
            />
            <MetricCard
              label="Council spending on public toilets"
              value="£67m"
              direction="down"
              polarity="up-is-good"
              changeText="Down from £120m in 2010; 44% cut in real terms"
              sparklineData={[120, 105, 93, 84, 78, 72, 69, 67]}
              source="DLUHC Revenue Outturn"
              href="#sec-count"
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
              href="#sec-count"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-count" className="mb-12">
            <LineChart
              title="Council-run public toilets in England, 2000–2024"
              subtitle="Estimated number of local authority–maintained public convenience facilities. Compiled from FOI data."
              series={toiletSeries}
              yLabel="Facilities"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-spending" className="mb-12">
            <LineChart
              title="Local authority spending on public toilets, England, 2010–2024"
              subtitle="Millions of pounds (£m) per year. DLUHC Revenue Outturn statistics. Nominal terms."
              series={spendingSeries}
              yLabel="£ million"
            />
          </section>
        </ScrollReveal>
              <RelatedTopics />
      </main>
    </>
  )
}
