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
  inadequatePct?: number
  requiresImprovementPct?: number
  closedSince2010?: number
}

interface CareHomeCqcData {
  timeSeries: TimeSeries[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function CareHomeCqcQualityPage() {
  const [data, setData] = useState<CareHomeCqcData | null>(null)

  useEffect(() => {
    fetch('/data/care-home-cqc-quality/care_home_cqc_quality.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const qualitySeries: Series[] = data
    ? [
        {
          id: 'inadequate',
          label: 'Inadequate (%)',
          colour: '#E63946',
          data: data.timeSeries
            .filter(d => d.inadequatePct !== undefined)
            .map(d => ({ date: yearToDate(d.year), value: d.inadequatePct as number })),
        },
        {
          id: 'requires-improvement',
          label: 'Requires Improvement (%)',
          colour: '#F4A261',
          data: data.timeSeries
            .filter(d => d.requiresImprovementPct !== undefined)
            .map(d => ({ date: yearToDate(d.year), value: d.requiresImprovementPct as number })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Care Home Quality" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Care Home CQC Quality"
          question="Are Care Homes Safe?"
          finding="3.7% of care homes are rated Inadequate by the CQC &mdash; and a further 25% Require Improvement, meaning nearly 1 in 3 homes is not meeting the standard."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The Care Quality Commission inspects and rates care homes in England across five domains: safe, effective, caring, responsive, and well-led. Homes receive an overall rating of Outstanding, Good, Requires Improvement, or Inadequate. As of 2023, approximately 71% of care homes are rated Good, just under 1% Outstanding, 25% Require Improvement, and 3.7% are rated Inadequate. The proportion rated Inadequate has risen steadily since 2015, when it stood at 2.1%, reflecting financial pressures on providers and workforce challenges that have intensified over the period.</p>
            <p>The financial structure of the care home sector is under severe strain. Most care homes operate as commercial businesses, funded through a combination of local authority placements (where councils fund care for those who have depleted their assets) and self-paying residents (who fund their own care). Local authority funding rates have historically been below the actual cost of care provision, creating a cross-subsidy where self-payers effectively subsidise state-funded residents. As the gap has widened, the business model of many smaller providers has become unviable. Over 1,400 care homes have closed since 2010, reducing capacity at a time when demand from an ageing population is growing.</p>
            <p>Workforce is the central operational challenge. Care homes require large numbers of workers, many in low-paid, physically demanding roles. Before the opening of international recruitment routes in 2022, the sector faced chronic vacancies; the influx of overseas workers has partially stabilised the workforce, but at the cost of significant ethical concerns about recruitment practices in source countries and the conditions faced by workers who arrive to find employment terms have changed from what was advertised. Turnover in the care sector runs at around 28% annually &mdash; meaning the average care worker stays less than four years, limiting the development of relationships that are central to good care.</p>
            <p>Dementia care is a specific quality concern within the broader picture. Around 70% of care home residents have dementia or significant memory problems. CQC inspections repeatedly identify inadequate dementia training among care workers, inappropriate use of antipsychotic medication as a chemical restraint, and environments not designed for the needs of people with cognitive impairment. The &lsquo;Blue Badge&rsquo; dementia-friendly care home scheme and similar quality improvement programmes have had local success but have not shifted the national picture.</p>
            <p>The market failure argument is increasingly prominent in policy discussions. Proponents of greater state provision argue that the commercial care home model creates incentives that are misaligned with quality: cost-cutting measures that reduce staffing ratios or training investment can improve margins without immediately affecting inspection ratings, and exit from the market when a home closes disrupts residents who face distressing moves at a vulnerable time. The alternative &mdash; greater public ownership or not-for-profit provision &mdash; faces its own funding challenges. The Dilnot Commission recommended a care cost cap, partially implemented as the &pound;86,000 cap from October 2025, though its interaction with quality outcomes remains to be seen.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'CQC Ratings' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Care homes rated Inadequate"
              value="3.7%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="rising from 2.1% in 2015 &middot; financial pressure driving quality down"
              sparklineData={[2.1, 2.3, 2.5, 2.8, 3.0, 3.2, 3.5, 3.6, 3.7]}
              onExpand={() => {}}
              source="CQC &middot; State of Care 2023"
            />
            <MetricCard
              label="Requiring Improvement"
              value="25.4%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="1 in 4 homes below standard"
              sparklineData={[22.4, 22.8, 23.1, 23.5, 24.2, 24.6, 25.0, 25.1, 25.4]}
              onExpand={() => {}}
              source="CQC &middot; State of Care 2023"
            />
            <MetricCard
              label="Care homes closed since 2010"
              value="1,400"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="market failures driving exit &middot; places lost"
              sparklineData={[800, 900, 1000, 1050, 1100, 1150, 1200, 1300, 1400]}
              onExpand={() => {}}
              source="Care Quality Commission &middot; LaingBuisson 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Care home CQC ratings, 2015&ndash;2023"
              subtitle="Percentage of inspected care homes rated Inadequate or Requiring Improvement by the Care Quality Commission."
              series={qualitySeries}
              yLabel="% of care homes"
              source={{
                name: 'Care Quality Commission',
                dataset: 'State of Care Annual Report',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Care Quality Commission &mdash; State of Care Annual Report. Published annually. cqc.org.uk/publications/major-report/state-care</p>
            <p>CQC &mdash; Provider information and inspection ratings database. cqc.org.uk/care-services</p>
            <p>LaingBuisson &mdash; Care Homes for Older People UK Market Report. laingbuisson.com</p>
            <p>Skills for Care &mdash; State of the Adult Social Care Sector and Workforce in England. skillsforcare.org.uk</p>
            <p>Rating percentages drawn from CQC published inspection data. Homes rated Inadequate or Requires Improvement calculated as proportion of all registered care homes with a published rating. Closure figures from LaingBuisson market analysis and CQC de-registrations data. Figures cover residential and nursing care homes for older people and adults with disabilities in England.</p>
          </div>
        </section>
      </main>
    </>
  )
}
