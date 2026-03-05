'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart from '@/components/charts/LineChart'
import type { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import PositiveCallout from '@/components/PositiveCallout'

// -- Types ------------------------------------------------------------------

interface TimeSeriesRow {
  year: number
  linkWorkers: number
  referrals: number
}

interface SocialPrescribingData {
  timeSeries: TimeSeriesRow[]
  outcomes: {
    lonelinessImproved: number
    gpAppointmentsReduced: number
    wellbeingImproved: number
  }
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function SocialPrescribingPage() {
  const [data, setData] = useState<SocialPrescribingData | null>(null)

  useEffect(() => {
    fetch('/data/social-prescribing/social_prescribing.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const growthSeries: Series[] = data
    ? [
        {
          id: 'referrals',
          label: 'Referrals',
          colour: '#2A9D8F',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.referrals })),
        },
        {
          id: 'linkworkers',
          label: 'Link workers',
          colour: '#264653',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.linkWorkers })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Social Prescribing" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Social Prescribing"
          question="Can Non-Medical Help Replace GP Appointments?"
          finding="Social prescribing link workers handled 550,000 referrals in 2023/24, with evidence of significant reductions in GP appointment demand."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Social prescribing connects people with community activities, groups, and services that address the social, emotional, and practical needs that drive a significant proportion of primary care demand. A person presenting to their GP with loneliness, financial stress, or low-level anxiety may not need medication; they may need a befriending service, a debt advice charity, or a community garden. Social prescribing link workers &mdash; non-clinical staff embedded within GP practices and Primary Care Networks &mdash; make these connections, taking time with patients that GPs rarely have and navigating community resources that GPs rarely know.</p>
            <p>The growth of social prescribing in England has been rapid. In 2020, there were approximately 1,000 link workers nationally, handling around 85,000 referrals. By 2024, this had grown to 4,500 link workers and 550,000 referrals &mdash; a five-fold increase in four years. NHS England&apos;s commitment to embedding link workers in all Primary Care Networks has been largely delivered. The NHS Long Term Plan set a target of 900,000 referrals a year by 2026; at current growth rates, this is achievable.</p>
            <p>Evidence of impact is building. Studies consistently show that social prescribing referrals reduce GP appointment demand among referred patients: estimates range from 15% to 28% reduction in the three to six months following a referral. Wellbeing measures improve in the majority of referred patients, and loneliness scores decline. The NHS estimate that 23% of patients referred through social prescribing reduce their GP contact is consistent with the published evidence base, though methodological caution is warranted because selection effects may inflate apparent benefits.</p>
            <p>The quality and reach of social prescribing is uneven. Link worker capacity varies significantly between PCNs, and the community infrastructure that link workers connect people to is thinner in deprived and rural areas. A link worker in an affluent suburb can connect patients to a well-funded voluntary sector with diverse offerings; a link worker in a deprived coastal town may find few services that still exist following years of charity sector funding cuts. The effectiveness of social prescribing is partly a function of the richness of local community assets, which are themselves products of economic geography.</p>
            <p>Social prescribing is not a substitute for clinical care, and its proponents are careful not to claim it is. It is an addition to the primary care toolkit that addresses a real gap &mdash; the social and emotional needs that conventional general practice is poorly designed to meet. The 550,000 referrals in 2023/24 represent a genuine expansion of NHS capacity to respond to human need in a way that is non-medicalising, community-based, and, where the evidence is assessed fairly, effective.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Growth' },
          { id: 'sec-callout', label: 'Impact' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Annual referrals 2024"
              value="550k"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="5x growth since 2020 &middot; target 900k by 2026"
              sparklineData={[85, 180, 350, 480, 550]}
              onExpand={() => {}}
              source="NHS England &middot; Social Prescribing 2024"
            />
            <MetricCard
              label="Link workers"
              value="4,500"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="From 1,000 in 2020 &middot; all PCNs now covered"
              sparklineData={[1000, 1440, 2800, 3900, 4500]}
              onExpand={() => {}}
              source="NHS England &middot; PCN Workforce 2024"
            />
            <MetricCard
              label="GP demand reduction"
              value="23%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Of referred patients reduce GP visits"
              sparklineData={[12, 15, 18, 21, 23]}
              onExpand={() => {}}
              source="NHS England &middot; Social Prescribing Evaluation 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Social prescribing referrals and link workers, 2020&ndash;2024"
              subtitle="Annual referrals to social prescribing link workers and total number of link workers in Primary Care Networks. England."
              series={growthSeries}
              yLabel="Referrals / Link workers"
              source={{
                name: 'NHS England',
                dataset: 'Social Prescribing Link Worker Programme',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <div id="sec-callout">
            <PositiveCallout
              title="550,000 Referrals and Growing"
              value="23%"
              unit="GP demand reduction"
              description="Social prescribing connects people to community activities, groups and services. Evidence shows it improves wellbeing, reduces loneliness and cuts GP demand. The NHS committed to 900,000 referrals a year by 2026."
              source="NHS England, 2024"
            />
          </div>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>NHS England &mdash; Social Prescribing and Community-Based Support. england.nhs.uk/personalisedcare/social-prescribing/</p>
            <p>National Academy for Social Prescribing &mdash; Evidence and Impact. socialprescribingacademy.org.uk/resources/evidence/</p>
            <p>Referral counts include referrals made through link workers employed by or contracted to Primary Care Networks. GP demand reduction figures are drawn from NHS England evaluation studies using retrospective appointment data for referred patients. Outcomes data covers wellbeing, loneliness, and health service use.</p>
          </div>
        </section>
      </main>
    </>
  )
}
