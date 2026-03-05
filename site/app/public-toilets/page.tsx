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
            <p>England had approximately 5,600 council-maintained public toilets in 2000. By 2024, that number had fallen to around 2,350 &mdash; a reduction of 58%. The rate of closure accelerated sharply after 2010 as local authorities faced sustained budget cuts: total central government funding to councils fell 49.1% in real terms between 2010/11 and 2019/20, according to the National Audit Office. Public toilet provision is a discretionary service &mdash; councils may provide them but are not legally required to. When budgets contract, discretionary services are the first to go. The Royal Society for Public Health estimated in 2019 that 4 in 10 people restrict their time outside the home because of inadequate access to public toilets, with the impact heaviest on older people, disabled people, pregnant women, and those with bowel or bladder conditions.</p>
            <p>The closures have accelerated a shift towards commercial alternatives. Many councils have adopted Community Toilet Schemes, paying local businesses &pound;500&ndash;&pound;1,500 per year to allow public access to their facilities. The National Association of Local Councils estimated that 160 councils operated such schemes by 2023. However, these alternatives have significant limitations: opening hours are restricted to business trading times, access depends on the business&apos;s willingness, and signage is often poor. Public toilets that remain council-operated increasingly charge 20p&ndash;50p per use, with automated facilities costing councils &pound;15,000&ndash;&pound;25,000 per year to maintain. Meanwhile, the use of changing places facilities &mdash; larger, fully accessible rooms with hoists and adjustable benches for severely disabled users &mdash; has grown, with 1,900 now registered across the UK, but coverage remains patchy outside hospitals and shopping centres.</p>
            <p>The Public Health (Open Spaces) Bill, proposed in 2023 as a private member&apos;s bill, sought to make public toilet provision a statutory duty for local authorities but failed to progress through Parliament. The government&apos;s 2024 Community Toilet Scheme guidance encourages councils to maintain access through partnerships with businesses but provides no additional funding. The Changing Places fund provided &pound;30 million between 2020 and 2024 for fully accessible toilet facilities at key public locations, resulting in around 400 new Changing Places installations. However, the core public toilet estate continues to shrink. The British Toilet Association, the sector&apos;s representative body, has called for a national public toilet strategy that would establish minimum provision standards, but successive governments have declined to mandate councils on a service that costs &pound;5,000&ndash;&pound;15,000 per facility per year to maintain.</p>
            <p>The impact of toilet closures falls disproportionately on specific groups and geographies. Older people are most affected: Age UK&apos;s 2023 survey found that 36% of over-65s had reduced their outings due to lack of public toilets. Crohn&apos;s &amp; Colitis UK estimates that 500,000 people in the UK live with inflammatory bowel disease, for whom reliable toilet access is essential for participating in normal life. Coastal and rural tourist areas face acute pressure, as seasonal visitor numbers overwhelm limited facilities. Seaside towns have seen some of the steepest closures despite high summer demand. Urban centres typically have better alternative provision through cafes and shops, but deprived areas within cities often have fewer businesses willing to participate in Community Toilet Schemes. Scotland has a slightly better record &mdash; the Public Health etc. (Scotland) Act 2008 requires local authorities to publish a toilet strategy, though not to maintain specific provision levels.</p>
            <p>There is no comprehensive, regularly updated national database of public toilet provision. The headline figure of 2,350 is estimated from Freedom of Information requests compiled by the BBC, local press, and campaign organisations, not from a single authoritative dataset. Councils report toilet closures inconsistently: some count individual cubicles, others count buildings. Community Toilet Scheme access points are sometimes included in council figures and sometimes not, inflating apparent provision. The &ldquo;58% decline&rdquo; figure compares a 2000 baseline (itself an estimate) with a 2024 figure compiled from incomplete FOI responses. Spending data comes from DLUHC Revenue Outturn statistics, but some councils classify toilet maintenance under parks, highways, or tourism budgets, making consistent comparison difficult. The health impact &mdash; people restricting outings &mdash; is self-reported through surveys with small sample sizes. The actual relationship between toilet closure and reduced mobility for older and disabled people, while widely asserted, has not been subject to rigorous epidemiological study.</p>
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
