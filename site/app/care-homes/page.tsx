'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series, Annotation } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

function yearToDate(y: number): Date {
  return new Date(y, 5, 1)
}

interface CareHomesData {
  national: {
    cqcRatings: Array<{ year: number; outstanding: number; good: number; requiresImprovement: number; inadequate: number }>
    staffVacancies: Array<{ year: number; thousands: number }>
    byFundingType: Array<{ type: string; pct: number }>
  }
}

export default function CareHomesPage() {
  const [data, setData] = useState<CareHomesData | null>(null)

  useEffect(() => {
    fetch('/data/care-homes/care_homes.json')
      .then(res => res.json())
      .then(setData)
  }, [])

  const staffVacanciesSeries: Series[] = data
    ? [
        {
          id: 'vacancies',
          label: 'Staff vacancies',
          colour: '#6B7280',
          data: data.national.staffVacancies.map(d => ({
            date: yearToDate(d.year),
            value: d.thousands,
          })),
        },
      ]
    : []

  const cqcGoodOrOutstandingSeries: Series[] = data
    ? [
        {
          id: 'good-outstanding',
          label: '% rated Good or Outstanding',
          colour: '#2A9D8F',
          data: data.national.cqcRatings.map(d => ({
            date: yearToDate(d.year),
            value: d.good + d.outstanding,
          })),
        },
      ]
    : []

  const cqcAnnotations: Annotation[] = [
    {
      date: yearToDate(2022),
      label: 'Record vacancy peak',
    },
  ]

  return (
    <>
      <TopicNav topic="Adult social care" />
      <main className="bg-white">
        <TopicHeader
          topic="care-homes"
          colour="#6B7280"
          question="What is the State of Adult Social Care?"
          finding="There are 410,000 people in residential and nursing care homes in England. One in four care homes has been rated &lsquo;requires improvement&rsquo; or &lsquo;inadequate&rsquo; by the CQC. Staff vacancies in social care hit 152,000 — a record — in 2022/23. Local authorities face a funding gap of over £4 billion in adult social care."
          preposition="in"
        />

        <section id="sec-context" className="max-w-2xl mx-auto px-4 sm:px-6 mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Around 410,000 people live in residential and nursing care homes in England, most in the final years of their lives. The system is under sustained pressure from three directions: a workforce that cannot retain staff, local authority commissioners unable to pay full cost, and a means-testing threshold unchanged since 2010. Self-funders — 44% of residents — pay on average £59,000 per year for nursing care and effectively cross-subsidise council-funded residents. The local authority funding gap in adult social care is estimated at £4 billion. Adult social care had 131,000 vacancies in 2023 (down from a record 152,000 in 2022), with a turnover rate of 28.3% annually; overseas workers now fill one in three new roles. Over 400 care homes closed between 2019 and 2023, and 25% of CQC-inspected homes are rated &ldquo;requires improvement&rdquo; or &ldquo;inadequate.&rdquo;</p>
            <p>The consequences extend well beyond the homes themselves. More than 13,000 people occupy hospital beds on any given day while waiting for a social care placement, directly driving NHS delayed discharge and A&amp;E pressures. An estimated 3.5 million unpaid carers in England are in effect the invisible infrastructure keeping large numbers of people out of residential care, at considerable cost to their own health and employment. The Dilnot care cap, under discussion for 13 years, was delayed and abandoned — leaving those who face catastrophic care costs with no protection.</p>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <SectionNav
            sections={[
              { id: 'sec-overview', label: 'Overview' },
              { id: 'sec-context', label: 'Context' },
              { id: 'sec-charts', label: 'Charts' },
              { id: 'sec-sources', label: 'Sources' },
            ]}
          />
        </div>

        <section id="sec-overview" className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl font-bold text-wiah-black mb-8">Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ScrollReveal>
              <MetricCard
                label="Social care staff vacancies"
                value="131"
                unit="thousand"
                direction="up"
                polarity="up-is-bad"
                sparklineData={data?.national.staffVacancies.map(d => d.thousands) || []}
                changeText="2023 · Down from 152K record in 2022 · 9.9% vacancy rate"
                source="Skills for Care, Workforce data."
                href="#sec-charts"/>
            </ScrollReveal>

            <ScrollReveal>
              <MetricCard
                label="Care homes rated &lsquo;requires improvement&rsquo; or &lsquo;inadequate&rsquo;"
                value="25"
                unit="%"
                direction="up"
                polarity="up-is-bad"
                sparklineData={data?.national.cqcRatings.map(d => 100 - (d.good + d.outstanding)) || []}
                changeText="2023 · CQC ratings · 1 in 4 homes below standard"
                source="CQC, Adult social care ratings"
                href="#sec-sources"/>
            </ScrollReveal>

            <ScrollReveal>
              <MetricCard
                label="People in residential &amp; nursing care"
                value="410"
                unit="thousand"
                direction="flat"
                polarity="up-is-bad"
                changeText="England, 2023 · Flat since 2010 · 340K residential, 70K nursing"
                source="CQC, Annual ratings reports"
                href="#sec-sources"/>
            </ScrollReveal>
          </div>
        </section>

        <section id="sec-charts" className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-16">
          <ScrollReveal>
            <LineChart
              title="Social care staff vacancies"
              subtitle="Vacancies in adult social care sector, England, 2016–2023"
              series={staffVacanciesSeries}
              yLabel="Thousands"
              annotations={cqcAnnotations}
              source={{
                name: 'Skills for Care',
                dataset: 'Workforce data',
                frequency: 'annually',
              }}
            />
          </ScrollReveal>

          <ScrollReveal>
            <LineChart
              title="Care home quality ratings"
              subtitle="% of care homes rated &lsquo;Good&rsquo; or &lsquo;Outstanding&rsquo;, 2016–2023"
              series={cqcGoodOrOutstandingSeries}
              yLabel="Percentage"
              source={{
                name: 'Care Quality Commission',
                dataset: 'Adult social care ratings',
                frequency: 'annually',
              }}
            />
          </ScrollReveal>

          <ScrollReveal>
            <div className="bg-wiah-light p-8 rounded-lg">
              <h3 className="text-lg font-bold text-wiah-black mb-6">Care home places by funding source</h3>
              <div className="space-y-3">
                {data?.national.byFundingType.map(d => (
                  <div key={d.type}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-wiah-black">{d.type}</span>
                      <span className="font-mono text-wiah-mid">{d.pct}%</span>
                    </div>
                    <div className="h-2 bg-wiah-border rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${d.pct}%`, backgroundColor: '#6B7280' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </section>

        <section id="sec-sources" className="max-w-5xl mx-auto px-4 sm:px-6 py-12 border-t border-wiah-border">
          <h2 className="text-xl font-bold text-wiah-black mb-6">Sources &amp; Methodology</h2>
          <div className="max-w-2xl space-y-3 font-mono text-sm text-wiah-mid">
            <p>Skills for Care — Adult social care workforce data. Annual surveys of care providers. Published annually. Retrieved March 2026.</p>
            <p>Care Quality Commission — Adult social care ratings and inspection reports. Rated homes include residential and nursing care homes in England. Published annually. Retrieved March 2026.</p>
            <p>Department of Health &amp; Social Care — Adult social care statistics. Sector-level data on care home capacity and occupancy. Retrieved March 2026.</p>
            <p>CQC ratings reflect the most recent inspection rating as of year-end. Ratings categories: Outstanding, Good, Requires Improvement, and Inadequate. Staff vacancy data collected via annual survey; represents full-time equivalent positions unfilled at time of survey. Funding type data derived from CQC inspection reports and includes estimated distribution based on local authority commissioning and private &amp; self-funded placements.</p>
          </div>
        </section>
      </main>
    </>
  )
}
