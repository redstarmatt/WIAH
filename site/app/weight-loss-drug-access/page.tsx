'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import MetricDetailModal from '@/components/MetricDetailModal'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import PositiveCallout from '@/components/PositiveCallout'
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'NICE', dataset: 'Technology Appraisal TA875 — Semaglutide for obesity', url: 'https://www.nice.org.uk/guidance/ta875', date: '2023' },
  { num: 2, name: 'NHS BSA', dataset: 'Prescription Cost Analysis — GLP-1 prescriptions', url: 'https://www.nhsbsa.nhs.uk/statistical-collections/prescription-cost-analysis', date: '2024' },
  { num: 3, name: 'NHS England', dataset: 'Specialist weight management services capacity', url: 'https://www.england.nhs.uk/publication/clinical-commissioning-policy-statement-tirzepatide/', date: '2024' },
  { num: 4, name: 'NHS England', dataset: 'Obesity-related NHS cost estimates', url: 'https://www.england.nhs.uk/', date: '2024' },
];

// -- Types ------------------------------------------------------------------

interface WeightLossDrugAccessData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    glp1PrescriptionsK: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function WeightLossDrugAccessPage() {
  const [data, setData] = useState<WeightLossDrugAccessData | null>(null)
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    fetch('/data/weight-loss-drug-access/weight_loss_drug_access.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const prescriptionSeries: Series[] = data
    ? [
        {
          id: 'glp1',
          label: 'GLP-1 prescriptions (thousands)',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.glp1PrescriptionsK,
          })),
        },
      ]
    : []

  // Series for eligible-but-not-treated modal
  const eligibleSeries: Series[] = [
    {
      id: 'eligible',
      label: 'Estimated eligible population (millions)',
      colour: '#F4A261',
      data: [
        { date: new Date(2021, 0, 1), value: 3.1 },
        { date: new Date(2022, 0, 1), value: 3.2 },
        { date: new Date(2023, 0, 1), value: 3.3 },
        { date: new Date(2024, 0, 1), value: 3.4 },
      ],
    },
    {
      id: 'treated',
      label: 'Receiving NHS GLP-1 for obesity (thousands)',
      colour: '#2A9D8F',
      data: [
        { date: new Date(2021, 0, 1), value: 0.002 },
        { date: new Date(2022, 0, 1), value: 0.005 },
        { date: new Date(2023, 0, 1), value: 0.015 },
        { date: new Date(2024, 0, 1), value: 0.035 },
      ],
    },
  ]

  // Series for NHS cost modal
  const costSeries: Series[] = [
    {
      id: 'cost',
      label: 'Obesity-related NHS cost (£ billions)',
      colour: '#E63946',
      data: [
        { date: new Date(2018, 0, 1), value: 5.1 },
        { date: new Date(2019, 0, 1), value: 5.3 },
        { date: new Date(2020, 0, 1), value: 5.6 },
        { date: new Date(2021, 0, 1), value: 5.9 },
        { date: new Date(2022, 0, 1), value: 6.1 },
        { date: new Date(2023, 0, 1), value: 6.3 },
        { date: new Date(2024, 0, 1), value: 6.5 },
      ],
    },
  ]

  return (
    <>
      <TopicNav topic="Weight-Loss Drug Access" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Weight-Loss Drug Access"
          question="Can You Get Weight-Loss Drugs on the NHS?"
          finding="Only 35,000 people receive GLP-1 weight-loss drugs on the NHS — out of 3.4 million who may be eligible under NICE criteria."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>GLP-1 receptor agonists — semaglutide (Wegovy, Ozempic) and tirzepatide (Mounjaro) — represent the most significant advance in obesity treatment in a generation. Clinical trials demonstrated average body weight reductions of 15–22%, durable over two years, with parallel reductions in cardiovascular events, sleep apnoea, and type 2 diabetes incidence. NICE approved semaglutide for obesity treatment in 2023 under Technology Appraisal TA875, and tirzepatide followed in 2024.<Cite nums={1} /> The eligible population — adults with a BMI of 35 or above plus at least one weight-related condition — is estimated at 3.4 million in England. Around 420,000 GLP-1 prescriptions were dispensed through NHS channels in 2024, but the majority cover established diabetes patients; only an estimated 35,000 — roughly 1% of those NICE has deemed eligible — are receiving them specifically for obesity.<Cite nums={2} /> Access through NHS specialist weight management services is severely constrained: only around 60 such services exist in England, and global supply shortages driven by US demand have periodically restricted new NHS prescribing of semaglutide.<Cite nums={3} /></p>
            <p>The economic case for broader access is compelling: obesity-related conditions cost the NHS an estimated £6.5 billion annually, and independent modelling suggests NHS-wide roll-out at current drug costs would fall within NICE's cost-effectiveness threshold.<Cite nums={4} /> Those who cannot access the drugs on the NHS pay £200–400 a month privately — an option unavailable to the low-income patients with the highest obesity burden. The gap between NICE approval and meaningful NHS access is, in practice, a rationing decision dressed as an infrastructure constraint, and its costs will compound as obesity-related ill-health continues to grow.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Prescriptions' },
          { id: 'sec-callout', label: 'Clinical Evidence' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="NHS GLP-1 prescriptions 2024"
              value="420k"
              unit=""
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="rapid growth but demand far outstrips supply"
              sparklineData={[12, 45, 180, 420]}
              onExpand={() => setExpanded('prescriptions')}
              source="NHS Business Services Authority · Prescription Cost Analysis"
            />
            <MetricCard
              label="Eligible but not treated"
              value="3.4m"
              unit=""
              direction={'flat' as const}
              polarity={'up-is-bad' as const}
              changeText="NICE eligible · NHS capacity absent"
              sparklineData={[3.4, 3.4, 3.4, 3.4]}
              onExpand={() => setExpanded('eligible')}
              source="NICE TA875 · NHS England estimates"
            />
            <MetricCard
              label="Weight-related NHS cost"
              value="£6.5bn/yr"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="obesity-related treatment costs"
              sparklineData={[5.1, 5.3, 5.6, 5.9, 6.1, 6.3, 6.5]}
              onExpand={() => setExpanded('cost')}
              source="NHS England · Health Economics"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="NHS GLP-1 weight-loss drug prescriptions, 2021–2024"
              subtitle="Total GLP-1 receptor agonist prescriptions dispensed through NHS channels (thousands), including primary care and specialist weight management pathways."
              series={prescriptionSeries}
              yLabel="Prescriptions (thousands)"
              source={{
                name: 'NHS Business Services Authority',
                dataset: 'Prescription Cost Analysis',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-callout" className="mb-12">
            <PositiveCallout
              title="NICE Approved: Wegovy &amp; Ozempic"
              value="87%"
              unit="weight loss maintained at 2 years"
              description="Clinical trials show GLP-1 agonists achieve 15% body weight reduction on average — the most effective pharmaceutical intervention for obesity ever approved by NICE. The SELECT trial demonstrated a 20% reduction in major cardiovascular events in people with obesity and established heart disease, extending the clinical case for access beyond weight loss alone."
              source="NICE Technology Appraisal TA875, 2023"
            />
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>NHS Business Services Authority — Prescription Cost Analysis. Published annually. nhsbsa.nhs.uk/statistical-collections/prescription-cost-analysis</p>
            <p>NICE — Technology Appraisal TA875: Semaglutide for managing overweight and obesity. nice.org.uk/guidance/ta875</p>
            <p>Wilding JPH et al — Once-Weekly Semaglutide in Adults with Overweight or Obesity. New England Journal of Medicine, 2021.</p>
            <p>Prescription figures cover all GLP-1 receptor agonist prescriptions dispensed in primary and secondary care through NHS channels. The eligible population estimate is based on NICE TA875 criteria applied to Health Survey for England BMI distribution data. Not all prescriptions are for obesity treatment; a proportion relate to established type 2 diabetes therapy.</p>
          </div>
        </section>
              <RelatedTopics />
      </main>

      {/* Expanded metric modals */}
      {expanded === 'prescriptions' && (
        <MetricDetailModal
          title="NHS GLP-1 weight-loss drug prescriptions, 2021–2024"
          subtitle="Total GLP-1 receptor agonist prescriptions dispensed through NHS channels (thousands), including primary care and specialist weight management pathways."
          series={prescriptionSeries}
          yLabel="Prescriptions (thousands)"
          source={{
            name: 'NHS Business Services Authority',
            dataset: 'Prescription Cost Analysis',
            url: 'https://www.nhsbsa.nhs.uk/statistical-collections/prescription-cost-analysis',
            frequency: 'annual',
          }}
          onClose={() => setExpanded(null)}
        />
      )}
      {expanded === 'eligible' && (
        <MetricDetailModal
          title="NICE-eligible population vs NHS treatment, 2021–2024"
          subtitle="Estimated adults meeting NICE TA875 criteria (BMI ≥35 + weight-related condition) versus those actually receiving GLP-1 drugs for obesity on the NHS. Treated numbers shown in millions for scale comparison."
          series={eligibleSeries}
          yLabel="Population (millions)"
          source={{
            name: 'NICE / NHS England',
            dataset: 'TA875 eligible population estimates',
            url: 'https://www.nice.org.uk/guidance/ta875',
            frequency: 'annual',
          }}
          onClose={() => setExpanded(null)}
        />
      )}
      {expanded === 'cost' && (
        <MetricDetailModal
          title="Obesity-related NHS costs, 2018–2024"
          subtitle="Estimated annual cost to the NHS of treating obesity-related conditions including type 2 diabetes, cardiovascular disease, and musculoskeletal disorders."
          series={costSeries}
          yLabel="Cost (£ billions)"
          source={{
            name: 'NHS England',
            dataset: 'Health Economics — Obesity cost estimates',
            frequency: 'annual',
          }}
          onClose={() => setExpanded(null)}
        />
      )}
    </>
  )
}
