'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface TimeSeries {
  year: number
  vacancyRate?: number
  turnoverPct?: number
  internationalWorkers?: number
}

interface SocialCareWorkforceData {
  timeSeries: TimeSeries[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function SocialCareWorkforceCrisisPage() {
  const [data, setData] = useState<SocialCareWorkforceData | null>(null)

  useEffect(() => {
    fetch('/data/social-care-workforce-crisis/social_care_workforce_crisis.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const workforceSeries: Series[] = data
    ? [
        {
          id: 'vacancy-rate',
          label: 'Vacancy rate (%)',
          colour: '#E63946',
          data: data.timeSeries
            .filter(d => d.vacancyRate !== undefined)
            .map(d => ({ date: yearToDate(d.year), value: d.vacancyRate as number })),
        },
        {
          id: 'turnover',
          label: 'Turnover rate (%)',
          colour: '#F4A261',
          data: data.timeSeries
            .filter(d => d.turnoverPct !== undefined)
            .map(d => ({ date: yearToDate(d.year), value: d.turnoverPct as number })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Social Care Workforce" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Social Care Workforce Crisis"
          question="Are There Enough Social Care Workers?"
          finding="The social care sector has 152,000 vacancies &mdash; a 9.9% vacancy rate that leaves vulnerable people without the support they need."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England&rsquo;s social care workforce of approximately 1.52 million is characterised by low pay, chronic vacancies, and a turnover rate of around 28&percnt; per year &mdash; structural features that have worsened over a decade of local authority funding constraint suppressing the rates paid to providers and, in turn, to workers. The vacancy rate peaked at 10.6&percnt; in 2022, more than double the economy-wide rate, before falling to 9.9&percnt; in 2023 following the introduction of international recruitment routes for care workers &mdash; approximately 70,000 overseas workers entered the sector by 2023. Even so, 152,000 posts remain unfilled, representing delayed visits, shortened care calls, missed medication, and continuity of care destroyed for some of the country&rsquo;s most vulnerable people. Pay is the primary driver: at around &pound;11 per hour, care workers earn above the National Living Wage but below the Real Living Wage and significantly below comparable NHS roles, and the sector cannot raise wages without increases in local authority commissioning rates that council budgets cannot accommodate.</p>
            <p>The 28&percnt; annual turnover rate compounds every other problem. Social care is a relational occupation where quality depends on continuity: a worker who has supported someone for years delivers qualitatively different care from a new joiner. A sector that replaces more than a quarter of its workforce each year cannot sustain those relationships, and investment in training is repeatedly lost. International recruitment has partially filled the gap but at ethical cost &mdash; documented concerns include fees charged to workers in source countries and visa tie-in arrangements exploiting sponsored workers. The government&rsquo;s 2024 restriction on dependant visas for care workers reduced some risks while tightening an already scarce labour supply, leaving the sector with no credible domestic workforce pipeline to replace it.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Vacancy &amp; Turnover' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Vacancy rate (2023)"
              value="9.9%"
              unit=""
              direction="down"
              polarity="up-is-bad"
              changeText="slight improvement from 10.6% peak &middot; 152k vacancies"
              sparklineData={[5.8, 6.2, 6.8, 7.1, 7.8, 7.0, 9.5, 10.6, 9.9]}
              onExpand={() => {}}
              source="Skills for Care &middot; State of the Workforce 2023"
            />
            <MetricCard
              label="Annual turnover rate"
              value="28.3%"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="nearly 1 in 3 workers leaves annually &middot; workforce instability"
              sparklineData={[27.0, 27.4, 27.6, 27.8, 28.1, 27.5, 28.0, 28.5, 28.3]}
              onExpand={() => {}}
              source="Skills for Care &middot; State of the Workforce 2023"
            />
            <MetricCard
              label="International recruitment"
              value="70k"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="overseas workers filling gap &middot; ethical concerns remain"
              sparklineData={[25000, 26000, 27000, 28000, 30000, 30000, 40000, 70000, 70000]}
              onExpand={() => {}}
              source="Home Office / Skills for Care &middot; 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Social care vacancy and turnover rates, 2015&ndash;2023"
              subtitle="Vacancy rate (% of posts unfilled) and annual staff turnover rate (%) in the adult social care sector in England."
              series={workforceSeries}
              yLabel="Rate (%)"
              source={{
                name: 'Skills for Care',
                dataset: 'State of the Adult Social Care Sector and Workforce in England',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Skills for Care &mdash; State of the Adult Social Care Sector and Workforce in England. Published annually. skillsforcare.org.uk/adult-social-care-workforce-data/Workforce-intelligence/publications/national-information/The-state-of-the-adult-social-care-sector-and-workforce-in-England.aspx</p>
            <p>Home Office &mdash; Immigration statistics: work. gov.uk/government/collections/immigration-statistics-quarterly-release</p>
            <p>NHS Benchmarking Network &mdash; Social care workforce comparisons. nhsbenchmarking.nhs.uk</p>
            <p>Vacancy rate calculated as number of vacant posts as percentage of total posts (filled and vacant). Turnover rate is the number of leavers in the year as percentage of average employment. International recruitment figures from Home Office Health and Care visa data. Figures cover independent sector adult social care providers in England; NHS-provided adult social care excluded.</p>
          </div>
        </section>
      </main>
    </>
  )
}
