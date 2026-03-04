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
          finding="There are 410,000 people in residential and nursing care homes in England. One in four care homes has been rated &lsquo;requires improvement&rsquo; or &lsquo;inadequate&rsquo; by the CQC. Staff vacancies in social care hit 152,000 &mdash; a record &mdash; in 2022/23. Local authorities face a funding gap of over &pound;4 billion in adult social care."
          preposition="in"
        />

        <section id="sec-context" className="max-w-2xl mx-auto px-4 sm:px-6 mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Around 410,000 people live in residential and nursing care homes in England, most of them in the final years of their lives. The system that looks after them is under sustained financial pressure from three directions at once: a workforce that cannot retain staff, local authority commissioners that cannot pay full cost, and a means-testing threshold that has not moved since 2010. People with more than &pound;23,250 in assets must fund their own care. That figure is unchanged in nominal terms after 14 years of inflation, which means far more people now qualify as self-funders than Parliament originally intended.</p>
            <p>Self-funders &mdash; 44% of care home residents &mdash; pay on average &pound;59,000 a year for nursing care. The 2021 government plan to cap lifetime care costs at &pound;86,000 per person, following the Dilnot Commission&apos;s 2011 recommendations, was delayed to 2025 and then abandoned. The Dilnot cap has now been under discussion for 13 years without implementation. In the meantime, local authority funding gaps are estimated at &pound;4 billion by 2024 according to the Association of Directors of Adult Social Services &mdash; a gap typically bridged by cross-subsidisation from self-funders paying above-cost rates, which creates a fragile and inequitable equilibrium.</p>
            <p>Staffing is the most acute operational problem. Adult social care had 131,000 vacancies in 2023, down from a record 152,000 in 2022, but the turnover rate remains 28.3% annually &mdash; more than one in four workers leaving each year. Overseas workers now fill one in three new social care roles; the sector&apos;s reliance on international recruitment has grown sharply since EU freedom of movement ended. Over 400 care homes closed between 2019 and 2023, and 25% of homes inspected by the CQC are rated &lsquo;requires improvement&rsquo; or &lsquo;inadequate&rsquo;. A 2023 CQC inspection found 15% of homes restricting residents&apos; freedom unnecessarily.</p>
            <p>The consequences reach beyond care homes themselves. More than 13,000 people occupy hospital beds on any given day while waiting for a social care placement &mdash; a figure that drives NHS delayed discharge and contributes directly to A&amp;E pressures. Some integrated care boards are piloting virtual wards and enhanced community support designed to delay or avoid care home entry altogether, and early results in certain areas are encouraging. The logic is sound: supporting people in their own homes is both cheaper and preferable to most people. Whether that model can scale fast enough to offset demographic pressure is unresolved.</p>
            <p>The data here captures the system as commissioners and regulators see it. It does not capture the quality of life of residents who are rated adequately cared for but are lonely, unstimulated, or living in facilities far from family. CQC ratings measure compliance with standards; they do not measure whether someone&apos;s final years were good. Nor does the data tell us much about the 3.5 million unpaid carers in England who are, in effect, the invisible infrastructure keeping large numbers of people out of residential care entirely &mdash; at considerable cost to their own health and employment.</p>
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
                onExpand={() => {}}
              />
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
                onExpand={() => {}}
              />
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
                onExpand={() => {}}
              />
            </ScrollReveal>
          </div>
        </section>

        <section id="sec-charts" className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-16">
          <ScrollReveal>
            <LineChart
              title="Social care staff vacancies"
              subtitle="Vacancies in adult social care sector, England, 2016&ndash;2023"
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
              subtitle="% of care homes rated &lsquo;Good&rsquo; or &lsquo;Outstanding&rsquo;, 2016&ndash;2023"
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
            <p>Skills for Care &mdash; Adult social care workforce data. Annual surveys of care providers. Published annually. Retrieved March 2026.</p>
            <p>Care Quality Commission &mdash; Adult social care ratings and inspection reports. Rated homes include residential and nursing care homes in England. Published annually. Retrieved March 2026.</p>
            <p>Department of Health &amp; Social Care &mdash; Adult social care statistics. Sector-level data on care home capacity and occupancy. Retrieved March 2026.</p>
            <p>CQC ratings reflect the most recent inspection rating as of year-end. Ratings categories: Outstanding, Good, Requires Improvement, and Inadequate. Staff vacancy data collected via annual survey; represents full-time equivalent positions unfilled at time of survey. Funding type data derived from CQC inspection reports and includes estimated distribution based on local authority commissioning and private &amp; self-funded placements.</p>
          </div>
        </section>
      </main>
    </>
  )
}
