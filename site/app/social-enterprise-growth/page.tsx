'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import PositiveCallout from '@/components/PositiveCallout'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'Social Enterprise UK', dataset: 'State of Social Enterprise', url: 'https://www.socialenterprise.org.uk/state-of-social-enterprise', date: '2023' },
  { num: 2, name: 'Big Society Capital', dataset: 'Market Sizing Research', url: 'https://bigsocietycapital.com/', date: '2023' },
  { num: 3, name: 'HM Government', dataset: 'Social Value Act 2012 — guidance and impact', url: 'https://www.gov.uk/government/publications/social-value-act-information-and-resources', date: '2012' },
];

// -- Types ------------------------------------------------------------------

interface SocialEnterpriseRow {
  year: number
  socialEnterprisesK: number
  turnoverBn: number
  employeesM?: number
}

interface SocialEnterpriseData {
  topic: string
  lastUpdated: string
  timeSeries: SocialEnterpriseRow[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function SocialEnterpriseGrowthPage() {
  const [data, setData] = useState<SocialEnterpriseData | null>(null)

  useEffect(() => {
    fetch('/data/social-enterprise-growth/social_enterprise_growth.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const enterpriseSeries: Series[] = data
    ? [
        {
          id: 'socialEnterprisesK',
          label: 'Social enterprises (thousands)',
          colour: '#2A9D8F',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.socialEnterprisesK,
          })),
        },
        {
          id: 'turnoverBn',
          label: 'Annual turnover (£bn)',
          colour: '#264653',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.turnoverBn,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Social Enterprise Growth" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Social Enterprise Growth"
          question="Can Business Do Good?"
          finding="The UK's 100,000 social enterprises generate £60 billion a year and employ 2.3 million people — a quiet success story that almost nobody knows about."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Social enterprises — businesses that trade for a social or environmental purpose and reinvest surpluses into their mission rather than distributing them to private shareholders — have grown from around 70,000 organisations in 2015 to approximately 100,000 in 2023, generating an estimated £60 billion in annual turnover and employing 2.3 million people.<Cite nums={1} /> That makes the sector larger than UK agriculture and comparable in employment to financial services, yet it remains largely invisible in public and political discourse. The UK has developed one of the world&rsquo;s most supportive ecosystems for this model: the Community Interest Company legal form (2005), the Social Value Act 2012 requiring public bodies to consider social value in procurement, and specialist investors including Big Society Capital.<Cite nums={3} /> Some 44% of social enterprises actively prioritise employment of disadvantaged workers — people with disabilities, ex-offenders, and those leaving care — a social impact that conventional employment statistics do not capture.<Cite nums={1} /></p>
            <p>Access to capital remains the sector&rsquo;s most significant constraint: social enterprises struggle to demonstrate returns to conventional investors when surplus is reinvested in mission rather than distributed to shareholders.<Cite nums={2} /> Patient capital, blended finance, and social impact bonds exist as alternatives but remain niche. Growth of social enterprise is also partly a response to state withdrawal and market failure: community energy companies, village shops, local news outlets, and community pubs represent social enterprises filling gaps that neither market nor state adequately addresses.<Cite nums={1} /> That is the sector&rsquo;s greatest contribution and deepest challenge simultaneously — it should not have to compensate for systematic public sector underfunding, but in many communities it is the only entity willing to try.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-callout', label: 'Callout' },
          { id: 'sec-chart', label: 'Growth Trends' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Social enterprises"
              value="100k"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="+43% since 2015 · growing movement"
              sparklineData={[70, 80, 90, 95, 98, 100]}
              href="#sec-callout"source="Social Enterprise UK · State of Social Enterprise 2023"
            />
            <MetricCard
              label="Annual turnover"
              value="£60bn"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="+36% since 2015 · scale and impact"
              sparklineData={[44, 50, 55, 57, 59, 60]}
              href="#sec-chart"source="Social Enterprise UK · 2023"
            />
            <MetricCard
              label="Employing disadvantaged workers"
              value="44%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="of social enterprises prioritise disadvantaged workers"
              sparklineData={[38, 40, 41, 43, 44, 44]}
              href="#sec-chart"source="Social Enterprise UK · State of Social Enterprise 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div id="sec-callout">
            <PositiveCallout
              title="A £60 Billion Force for Good"
              value="100,000"
              unit="social enterprises in the UK"
              description="The UK has one of the world's most developed social enterprise sectors. From community bakeries to housing associations to leisure trusts, 100,000 organisations combine commercial activity with social mission — generating £60bn and employing 2.3 million people."
              source="Social Enterprise UK / NCVO, 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Social enterprise growth, 2015–2023"
              subtitle="Number of social enterprises in thousands and total annual turnover in billions of pounds."
              series={enterpriseSeries}
              yLabel="Value"
              source={{
                name: 'Social Enterprise UK',
                dataset: 'State of Social Enterprise',
                frequency: 'biennial',
              }}
            />
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Social Enterprise UK — State of Social Enterprise. Biennial survey of the social enterprise sector. socialenterprise.org.uk/state-of-social-enterprise</p>
            <p>NCVO — UK Civil Society Almanac. ncvo.org.uk/facts-and-stats/uk-civil-society-almanac</p>
            <p>Big Society Capital — Market Sizing Research. bigsocietycapital.com</p>
            <p>Social enterprise count is based on SEUK survey extrapolation to the broader population of organisations meeting the social enterprise definition: trading for a social purpose, reinvesting surpluses, and having an asset lock. Turnover figures are SEUK estimates. Figures interpolated between survey years. Intermediate years use linear interpolation.</p>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  )
}
