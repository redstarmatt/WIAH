'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import RelatedTopics from '@/components/RelatedTopics';

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
          finding="3.7% of care homes are rated Inadequate by the CQC — and a further 25% Require Improvement, meaning nearly 1 in 3 homes is not meeting the standard."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>As of 2023, 3.7% of care homes in England are rated Inadequate by the CQC — up from 2.1% in 2015 — and a further 25% Require Improvement, meaning nearly one in three homes is not meeting the standard. Financial pressure is the primary driver: local authority funding rates have historically been below the cost of care provision, forcing homes to cross-subsidise state-funded residents through higher charges to self-payers. Over 1,400 care homes have closed since 2010, reducing capacity as an ageing population increases demand. Workforce turnover runs at 28% annually, limiting the continuity of relationships that are central to good care. Around 70% of care home residents have dementia, yet CQC inspections repeatedly identify inadequate dementia training and inappropriate use of antipsychotic medication as chemical restraint.</p>
            <p>The quality gap falls most heavily on residents funded by local authorities, who are concentrated in homes operating on the tightest margins. Each home closure disrupts residents facing distressing moves at a deeply vulnerable point in their lives, often into accommodation further from family. The market structure — in which commercial operators serve a client group that cannot easily exercise consumer choice — creates incentives misaligned with quality. The £86,000 lifetime care cost cap, delayed and uncertain as of 2025, addresses catastrophic financial risk but does not directly address quality standards in the homes affected.</p>
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
              changeText="rising from 2.1% in 2015 · financial pressure driving quality down"
              sparklineData={[2.1, 2.3, 2.5, 2.8, 3.0, 3.2, 3.5, 3.6, 3.7]}
              href="#sec-chart"source="CQC · State of Care 2023"
            />
            <MetricCard
              label="Requiring Improvement"
              value="25.4%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="1 in 4 homes below standard"
              sparklineData={[22.4, 22.8, 23.1, 23.5, 24.2, 24.6, 25.0, 25.1, 25.4]}
              href="#sec-chart"source="CQC · State of Care 2023"
            />
            <MetricCard
              label="Care homes closed since 2010"
              value="1,400"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="market failures driving exit · places lost"
              sparklineData={[800, 900, 1000, 1050, 1100, 1150, 1200, 1300, 1400]}
              href="#sec-chart"source="Care Quality Commission · LaingBuisson 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Care home CQC ratings, 2015–2023"
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
            <p>Care Quality Commission — State of Care Annual Report. Published annually. cqc.org.uk/publications/major-report/state-care</p>
            <p>CQC — Provider information and inspection ratings database. cqc.org.uk/care-services</p>
            <p>LaingBuisson — Care Homes for Older People UK Market Report. laingbuisson.com</p>
            <p>Skills for Care — State of the Adult Social Care Sector and Workforce in England. skillsforcare.org.uk</p>
            <p>Rating percentages drawn from CQC published inspection data. Homes rated Inadequate or Requires Improvement calculated as proportion of all registered care homes with a published rating. Closure figures from LaingBuisson market analysis and CQC de-registrations data. Figures cover residential and nursing care homes for older people and adults with disabilities in England.</p>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  )
}
