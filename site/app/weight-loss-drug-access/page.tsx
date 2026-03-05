'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import PositiveCallout from '@/components/PositiveCallout'

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

  return (
    <>
      <TopicNav topic="Weight-Loss Drug Access" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Weight-Loss Drug Access"
          question="Can You Get Weight-Loss Drugs on the NHS?"
          finding="Only 35,000 people receive GLP-1 weight-loss drugs on the NHS &mdash; out of 3.4 million who may be eligible under NICE criteria."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>GLP-1 receptor agonists &mdash; semaglutide (Wegovy, Ozempic) and tirzepatide (Mounjaro) &mdash; represent the most significant advance in obesity treatment in a generation. Clinical trials have demonstrated average body weight reductions of 15&ndash;22%, durable over two years of treatment, with parallel reductions in cardiovascular events, sleep apnoea, and type 2 diabetes incidence. NICE approved semaglutide for obesity treatment in 2023 under Technology Appraisal TA875, and tirzepatide followed in 2024. The eligible population &mdash; adults with a BMI of 35 or above plus at least one weight-related condition, or BMI 30&ndash;35 in certain clinical circumstances &mdash; is estimated at 3.4 million people in England.</p>
            <p>The gap between NICE approval and NHS access is vast. In 2024, approximately 420,000 prescriptions for GLP-1 agonists were dispensed through NHS primary and secondary care &mdash; a figure that sounds large but covers both obesity treatment and the much larger population already established on these drugs for type 2 diabetes. The number receiving them specifically for obesity treatment through NHS pathways is estimated at around 35,000, representing roughly 1% of those NICE has determined should be eligible. The remainder either pay privately, at costs of &pound;200&ndash;400 per month, or go without.</p>
            <p>The NHS has structured access to GLP-1s for obesity through specialist weight management services, which are intended to provide the behavioural support programme that NICE requires alongside drug treatment. But specialist weight management capacity is severely limited. There are around 60 NHS specialist weight management services in England, with combined capacity far below the scale required to treat millions of eligible patients. NHS England has piloted a primary care prescribing pathway, but at the time of writing this is restricted to a small number of Integrated Care Boards and covers only patients meeting the highest-priority clinical criteria.</p>
            <p>Supply constraints have also played a role. Global demand for GLP-1 agonists &mdash; driven heavily by the United States where obesity treatment demand vastly exceeds that of any other country &mdash; has intermittently caused UK shortages, particularly of Ozempic. In 2023 and 2024, supply disruptions led MHRA and NHS England to issue guidance restricting new prescribing of semaglutide for obesity to protect supply for established type 2 diabetes patients, for whom the drug had been used longer and withdrawal carried greater clinical risk. These shortages have eased somewhat with increased manufacturing capacity, but the NHS supply situation remains fragile.</p>
            <p>The economic argument for broader access is genuinely compelling. Obesity-related conditions cost the NHS an estimated &pound;6.5 billion annually, a figure that has grown consistently. Preventing progression from obesity to type 2 diabetes, reducing cardiovascular interventions, decreasing joint replacement rates, and improving productivity among working-age people with obesity-related ill-health represent significant long-run savings. Independent health economic modelling has suggested that NHS-wide roll-out of GLP-1 treatment for eligible patients, at current drug costs, would be cost-effective within NHS thresholds. The challenge is the upfront cost, the structural limitations of specialist capacity, and political decisions about NHS resource allocation in a constrained fiscal environment.</p>
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
              onExpand={() => {}}
              source="NHS Business Services Authority &middot; Prescription Cost Analysis"
            />
            <MetricCard
              label="Eligible but not treated"
              value="3.4m"
              unit=""
              direction={'flat' as const}
              polarity={'up-is-bad' as const}
              changeText="NICE eligible &middot; NHS capacity absent"
              sparklineData={[3.4, 3.4, 3.4, 3.4]}
              onExpand={() => {}}
              source="NICE TA875 &middot; NHS England estimates"
            />
            <MetricCard
              label="Weight-related NHS cost"
              value="&pound;6.5bn/yr"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="obesity-related treatment costs"
              sparklineData={[5.1, 5.3, 5.6, 5.9, 6.1, 6.3, 6.5]}
              onExpand={() => {}}
              source="NHS England &middot; Health Economics"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="NHS GLP-1 weight-loss drug prescriptions, 2021&ndash;2024"
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
              description="Clinical trials show GLP-1 agonists achieve 15% body weight reduction on average &mdash; the most effective pharmaceutical intervention for obesity ever approved by NICE. The SELECT trial demonstrated a 20% reduction in major cardiovascular events in people with obesity and established heart disease, extending the clinical case for access beyond weight loss alone."
              source="NICE Technology Appraisal TA875, 2023"
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>NHS Business Services Authority &mdash; Prescription Cost Analysis. Published annually. nhsbsa.nhs.uk/statistical-collections/prescription-cost-analysis</p>
            <p>NICE &mdash; Technology Appraisal TA875: Semaglutide for managing overweight and obesity. nice.org.uk/guidance/ta875</p>
            <p>Wilding JPH et al &mdash; Once-Weekly Semaglutide in Adults with Overweight or Obesity. New England Journal of Medicine, 2021.</p>
            <p>Prescription figures cover all GLP-1 receptor agonist prescriptions dispensed in primary and secondary care through NHS channels. The eligible population estimate is based on NICE TA875 criteria applied to Health Survey for England BMI distribution data. Not all prescriptions are for obesity treatment; a proportion relate to established type 2 diabetes therapy.</p>
          </div>
        </section>
      </main>
    </>
  )
}
