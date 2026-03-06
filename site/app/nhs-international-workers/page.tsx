'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface InternationalWorkersDataPoint {
  year: number
  internationalNursesPct: number
  internationalDoctorsPct: number
}

interface NhsInternationalWorkersData {
  topic: string
  lastUpdated: string
  timeSeries: InternationalWorkersDataPoint[]
  topSourceCountries: string[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function NhsInternationalWorkersPage() {
  const [data, setData] = useState<NhsInternationalWorkersData | null>(null)

  useEffect(() => {
    fetch('/data/nhs-international-workers/nhs_international_workers.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const allSeries: Series[] = data
    ? [
        {
          id: 'intl-nurses',
          label: 'International nurses (%)',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.internationalNursesPct })),
        },
        {
          id: 'intl-doctors',
          label: 'International doctors (%)',
          colour: '#0D1117',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.internationalDoctorsPct })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="NHS International Workers" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="NHS International Workers"
          question="How Much Does the NHS Depend on Staff From Overseas?"
          finding="One in three NHS nurses trained outside the UK &mdash; the highest proportion on record, raising concerns about global health equity."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>In 2024, 33.4% of NHS nurses and 31.9% of doctors were internationally trained &mdash; the highest proportions on record &mdash; as intensive recruitment from India, the Philippines, Nigeria, Zimbabwe, and Pakistan filled vacancies that domestic training has consistently failed to meet. The NHS has recruited from several WHO &ldquo;red list&rdquo; countries &mdash; 47 nations facing severe healthcare workforce crises from which ethical guidelines recommend avoiding recruitment. The 2023 NHS Long Term Workforce Plan commits to doubling domestic medical school places and achieving greater self-sufficiency, but that pipeline takes a decade to deliver qualified staff.</p>
            <p>The ethical and geopolitical burden is concentrated on the source countries least able to absorb the loss. When a Nigerian-trained nurse or doctor joins the NHS, the investment made in their training by Nigeria&rsquo;s health system is transferred to one of the world&rsquo;s wealthiest economies &mdash; a structural subsidy flowing in the wrong direction. Within the NHS, internationally educated nurses (predominantly Black African) report the highest rates of bullying and harassment at 31%, and face disproportionate disciplinary proceedings, compounding a system that has become dependent on their labour without fully protecting them.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'International Staff' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="International nurses"
              value="33.4%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="record high &middot; up from 18.2% in 2015"
              sparklineData={[18.2, 20.1, 22.4, 26.3, 29.1, 31.8, 33.4, 33.4]}
              href="#sec-chart"source="NHS Digital &middot; NHS Workforce Statistics 2024"
            />
            <MetricCard
              label="International doctors"
              value="31.9%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="nearly 1 in 3 doctors trained abroad"
              sparklineData={[27.3, 28.1, 28.9, 29.8, 30.4, 31.2, 31.9, 31.9]}
              href="#sec-chart"source="NHS Digital &middot; NHS Workforce Statistics 2024"
            />
            <MetricCard
              label="WHO red-list countries"
              value="47"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="countries on WHO ethical recruitment red list &middot; NHS still recruits from 13"
              sparklineData={[47, 47, 47, 47, 47, 47, 47, 47]}
              href="#sec-chart"source="WHO &middot; Global Code of Practice 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="International staff in NHS, England, 2015&ndash;2024"
              subtitle="Percentage of nurses and doctors whose nationality indicates international training. 2017 and 2019 figures interpolated."
              series={allSeries}
              yLabel="% internationally trained"
              source={{
                name: 'NHS Digital',
                dataset: 'NHS Workforce Statistics',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>NHS Digital &mdash; NHS Workforce Statistics. Published monthly. digital.nhs.uk/data-and-information/publications/statistical/nhs-workforce-statistics</p>
            <p>World Health Organization &mdash; WHO Global Code of Practice on the International Recruitment of Health Personnel. who.int/publications/m/item/who-global-code-of-practice-on-the-international-recruitment-of-health-personnel</p>
            <p>International trained staff figures are based on country of nationality as recorded in the Electronic Staff Record (ESR). Country of nationality is used as a proxy for country of training as direct country-of-training data is not consistently available. Red-list country data from WHO Health Workforce Support and Safeguards List, updated 2024. NHS recruitment figures from NHS England international recruitment reporting.</p>
          </div>
        </section>
      </main>
    </>
  )
}
