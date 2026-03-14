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
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'NHS England', dataset: 'Social Prescribing Link Worker Programme', url: 'https://www.england.nhs.uk/personalisedcare/social-prescribing/', date: '2024' },
  { num: 2, name: 'NHS England', dataset: 'Social Prescribing Evaluation — GP Demand Reduction', url: 'https://www.england.nhs.uk/personalisedcare/social-prescribing/', date: '2024', note: '23% of referred patients reduce GP visits' },
  { num: 3, name: 'NASP', dataset: 'Annual Workforce Survey — Social Prescribing Link Workers', url: 'https://socialprescribingacademy.org.uk/resources/evidence/', date: '2024' },
];

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
            <p>Social prescribing connects people with community activities, groups, and services that address the social, emotional, and practical needs driving a significant proportion of primary care demand. A person presenting to their GP with loneliness, financial stress, or low-level anxiety may not need medication — they may need a befriending service, a debt advice charity, or a community garden. Social prescribing link workers — non-clinical staff embedded within GP practices and Primary Care Networks — make these connections, taking time with patients that GPs rarely have. The programme has grown rapidly: from approximately 1,000 link workers and 85,000 referrals in 2020 to 4,500 link workers and 550,000 referrals in 2023/24 — a five-fold increase in four years.<Cite nums={[1, 3]} /> The NHS Long Term Plan targets 900,000 referrals a year by 2026; at current growth rates, that is achievable. Studies consistently show a 15–28% reduction in GP appointment demand in the three to six months following a social prescribing referral, with NHS England estimating that 23% of referred patients reduce their GP contact.<Cite nums={2} /></p>
            <p>The quality and reach of social prescribing is uneven. Link worker capacity varies significantly between Primary Care Networks, and the community infrastructure that workers connect patients to is thinner in deprived and rural areas.<Cite nums={3} /> A link worker in an affluent suburb can draw on a well-funded voluntary sector with diverse offerings; a link worker in a deprived coastal town may find few services still operating following years of charity sector funding cuts. The effectiveness of social prescribing is partly a function of local community assets, which are themselves products of economic geography. The programme is not a substitute for clinical care, but it addresses a real gap — the social and emotional needs that conventional general practice is poorly designed to meet.</p>
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
              changeText="5x growth since 2020 · target 900k by 2026"
              sparklineData={[85, 180, 350, 480, 550]}
              href="#sec-chart"source="NHS England · Social Prescribing 2024"
            />
            <MetricCard
              label="Link workers"
              value="4,500"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="From 1,000 in 2020 · all PCNs now covered"
              sparklineData={[1000, 1440, 2800, 3900, 4500]}
              href="#sec-callout"source="NHS England · PCN Workforce 2024"
            />
            <MetricCard
              label="GP demand reduction"
              value="23%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Of referred patients reduce GP visits"
              sparklineData={[12, 15, 18, 21, 23]}
              href="#sec-callout"source="NHS England · Social Prescribing Evaluation 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Social prescribing referrals and link workers, 2020–2024"
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

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>NHS England — Social Prescribing and Community-Based Support. england.nhs.uk/personalisedcare/social-prescribing/</p>
            <p>National Academy for Social Prescribing — Evidence and Impact. socialprescribingacademy.org.uk/resources/evidence/</p>
            <p>Referral counts include referrals made through link workers employed by or contracted to Primary Care Networks. GP demand reduction figures are drawn from NHS England evaluation studies using retrospective appointment data for referred patients. Outcomes data covers wellbeing, loneliness, and health service use.</p>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  )
}
