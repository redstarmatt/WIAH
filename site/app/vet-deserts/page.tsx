'use client'

import { useEffect, useState } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import PositiveCallout from '@/components/PositiveCallout'
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'RCVS', dataset: 'Survey of the Veterinary Profession', url: 'https://www.rcvs.org.uk/news-and-views/publications/', date: '2024' },
  { num: 2, name: 'CMA', dataset: 'Veterinary Services Market Investigation', url: 'https://www.gov.uk/cma-cases/veterinary-services-market-investigation', date: '2024' },
  { num: 3, name: 'BVA', dataset: 'Voice of the Veterinary Profession Survey', url: 'https://www.bva.co.uk/', date: '2024' },
  { num: 4, name: 'PDSA', dataset: 'Animal Wellbeing (PAW) Report', url: 'https://www.pdsa.org.uk/what-we-do/pdsa-animal-wellbeing-report', date: '2024' },
];

// -- Types ------------------------------------------------------------------

interface VetDesertsPoint {
  date: string
  practicesPer100k: number
  corporateSharePct: number
  emergencyAvgCost: number
}

interface VetDesertsData {
  national: {
    timeSeries: VetDesertsPoint[]
  }
}

function yearToDate(y: string): Date {
  return new Date(parseInt(y), 5, 1)
}

// -- Page -------------------------------------------------------------------

export default function VetDesertsPage() {
  const [data, setData] = useState<VetDesertsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/data/vet-deserts/vet_deserts.json')
        const json = await res.json()
        setData(json)
      } catch (err) {
        console.error('Failed to load vet deserts data:', err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) return <div className="p-8 text-center">Loading&hellip;</div>
  if (!data) return <div className="p-8 text-center">Failed to load data</div>

  const practicesSeries: Series[] = [
    {
      id: 'practices-per-100k',
      label: 'Vet practices per 100,000 population',
      colour: '#E63946',
      data: data.national.timeSeries.map(d => ({
        date: yearToDate(d.date),
        value: d.practicesPer100k,
      })),
    },
  ]

  const corporateSeries: Series[] = [
    {
      id: 'corporate-share',
      label: 'Corporate-owned practices',
      colour: '#E63946',
      data: data.national.timeSeries.map(d => ({
        date: yearToDate(d.date),
        value: d.corporateSharePct,
      })),
    },
    {
      id: 'independent-share',
      label: 'Independent practices',
      colour: '#2A9D8F',
      data: data.national.timeSeries.map(d => ({
        date: yearToDate(d.date),
        value: 100 - d.corporateSharePct,
      })),
    },
  ]

  const emergencyCostSeries: Series[] = [
    {
      id: 'emergency-cost',
      label: 'Average emergency vet bill',
      colour: '#E63946',
      data: data.national.timeSeries.map(d => ({
        date: yearToDate(d.date),
        value: d.emergencyAvgCost,
      })),
    },
  ]

  return (
    <>
      <TopicNav topic="Veterinary Access" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Veterinary Access"
          question="Can You Get Your Pet to a Vet?"
          finding="Vet practices per capita have fallen 25% in a decade while the UK pet population surged by 3 million during COVID, creating growing 'vet deserts' in rural areas where some owners must travel 30 miles or more for care."
          colour="#F4A261"
          preposition="with"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK's relationship with its pets has never been more intense, nor the system that cares for them more strained. The pet population surged roughly 20% during the pandemic, from an estimated 13 million dogs and cats to over 16 million, as lockdown isolation drove a wave of impulse purchasing and adoption.<Cite nums={4} /> That wave has not receded. But the veterinary infrastructure those animals depend on has been moving in the opposite direction. The number of vet practices per capita has fallen by approximately 25% over the past decade, driven primarily by corporate consolidation: six major chains — including CVS Group, IVC Evidensia, and Medivet — now own more than 60% of UK practices, up from around 28% in 2014.<Cite nums={2} /> The Competition and Markets Authority launched a formal market investigation into veterinary pricing in 2024, responding to widespread concern that consolidation is reducing choice and driving up costs. Emergency out-of-hours care has been particularly affected. Average bills for emergency consultations have tripled over the decade, reaching between £600 and £800, with some complex cases running into thousands.<Cite nums={3} /> Rural areas are increasingly underserved — parts of Wales, the Scottish Highlands, and rural England now qualify as genuine "vet deserts" where no practice exists within 30 miles.</p>
            <p>The workforce crisis behind these numbers is severe and worsening. The Royal College of Veterinary Surgeons reports that 40% of vets are considering leaving the profession, citing burnout, unsustainable workloads, and a rise in client aggression that accelerated during the pandemic.<Cite nums={1} /> The suicide rate among veterinary professionals is three times that of the general population — a statistic that has prompted the RCVS Mind Matters initiative but has not yet shifted. The British Veterinary Association's annual survey found that 95% of practices report recruitment difficulties, with rural and mixed-animal practices hit hardest.<Cite nums={3} /> New graduates carry average debt of £50,000 and are increasingly drawn to urban small-animal work or corporate roles with structured hours, leaving farm and rural practice dangerously understaffed. The consequences fall hardest on those least able to absorb them: the PDSA estimates that 5 million pets across the UK are not receiving veterinary treatment they need, concentrated in low-income households where pet insurance — itself up 30% in two years — is unaffordable.<Cite nums={4} /> The gap between the nation's emotional investment in its animals and its capacity to actually care for them has never been wider.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-practices', label: 'Practices' },
          { id: 'sec-corporate', label: 'Consolidation' },
          { id: 'sec-emergency', label: 'Emergency Costs' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Practices per 100k population"
              value="3.4"
              direction={'down' as const}
              polarity={'down-is-bad' as const}
              changeText="2024 · Down from 4.8 in 2014 · −29%"
              sparklineData={[4.8, 4.7, 4.5, 4.4, 4.2, 4.1, 3.9, 3.7, 3.6, 3.5, 3.4]}
              href="#sec-practices"
            />
            <MetricCard
              label="Vets considering leaving"
              value="40"
              unit="%"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="2024 RCVS survey · Burnout, aggression, workload"
              sparklineData={[18, 22, 24, 26, 28, 30, 33, 35, 38, 40]}
              href="#sec-practices"
            />
            <MetricCard
              label="Average emergency vet bill"
              value="£710"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="2024 · Tripled from £210 in 2014"
              sparklineData={[210, 225, 240, 265, 290, 310, 350, 420, 530, 640, 710]}
              href="#sec-emergency"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-practices" className="mb-12">
            <LineChart
              title="Vet practices per 100,000 population, UK, 2014–2024"
              subtitle="RCVS-registered practices normalised to ONS mid-year population estimates. Includes all practice types."
              series={practicesSeries}
              yLabel="Practices per 100k"
              source={{
                name: 'RCVS',
                dataset: 'Survey of the Veterinary Profession',
                frequency: 'biennial',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-corporate" className="mb-12">
            <LineChart
              title="Corporate vs independent practice share, UK, 2014–2024"
              subtitle="Estimated share of RCVS-registered practices owned by the six largest corporate groups vs independently operated."
              series={corporateSeries}
              yLabel="Share of practices (%)"
              source={{
                name: 'CMA',
                dataset: 'Veterinary Services Market Investigation',
                frequency: 'one-off',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-emergency" className="mb-12">
            <LineChart
              title="Average emergency out-of-hours vet bill, UK, 2014–2024"
              subtitle="Median cost for emergency consultation including standard diagnostic workup. Excludes surgical procedures."
              series={emergencyCostSeries}
              yLabel="Cost (£)"
              source={{
                name: 'BVA',
                dataset: 'Voice of the Veterinary Profession Survey',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Vet school places increased 30% since 2019 with new schools opening"
            value="30%"
            description="Vet school places increased 30% since 2019 with new schools at Aberdeen, Surrey, and Keele expanding the pipeline of qualified graduates. The RCVS Mind Matters initiative has embedded mental health support across the profession, and vets reporting access to workplace wellbeing support rose from 45% to 72%. These investments in both supply and sustainability offer the strongest basis for reversing the access crisis, though the effects will take years to flow through to practice level."
            source="Source: RCVS — Annual Report 2024; Mind Matters Initiative Progress Report."
          />
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>RCVS — Survey of the Veterinary Profession. Biennial survey of RCVS-registered practices covering practice numbers, ownership structure, workforce demographics, and recruitment. Practice counts normalised to ONS mid-year population estimates.</p>
            <p>BVA — Voice of the Veterinary Profession Survey. Annual survey of BVA members covering working conditions, recruitment difficulties, mental health, and client behaviour. Emergency cost data from BVA benchmarking and supplemented by CMA pricing analysis.</p>
            <p>CMA — Veterinary Services Market Investigation (2024). Formal market study examining competition, pricing, and ownership concentration in UK veterinary services. Corporate share estimates derived from CMA ownership mapping and VetRecord corporate tracker.</p>
            <p>PDSA — Animal Wellbeing (PAW) Report. Annual survey of pet owners covering access to veterinary care, pet insurance uptake, and barriers to treatment. Estimates of untreated pets based on owner-reported foregone care.</p>
            <p>Corporate ownership figures are estimates; complex holding structures mean some nominally independent practices are corporate-owned. Emergency cost figures represent medians; actual bills vary substantially by procedure, region, and time of presentation. 2020–2021 figures affected by pandemic-era disruption to both pet acquisition patterns and practice operations.</p>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  )
}
