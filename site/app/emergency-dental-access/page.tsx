'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface EmergencyDentalData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    cannotAccessM: number
    aeVisitsK: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

export default function EmergencyDentalAccessPage() {
  const [data, setData] = useState<EmergencyDentalData | null>(null)

  useEffect(() => {
    fetch('/data/emergency-dental-access/emergency_dental_access.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [
        {
          id: 'aeVisitsK',
          label: 'A&E visits (thousands)',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.aeVisitsK })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Dental Access" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Dental Care"
          question="Can People Access Emergency Dental Treatment?"
          finding="14 million people cannot access an NHS dentist, and A&E visits for dental pain have reached 180,000 per year — a crisis playing out in hospital emergency departments."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>NHS dental services in England are in a structural crisis that has deteriorated progressively since the introduction of the 2006 NHS dental contract, which changed the way dentists were paid and drove many out of NHS practice. The number of dentists providing NHS care has fallen from approximately 23,500 in 2009 to approximately 20,800 in 2024, while the registered population requiring dental care has grown substantially. The result is that an estimated 14 million adults are unable to access an NHS dentist — either because their local practice has a closed list, because NHS practices in their area have been overwhelmed with demand since the pandemic drove many practices temporarily private, or because NHS dentistry is simply not available in their locality.</p>
            <p>The pandemic created an acute disruption to dental services from which the NHS has not fully recovered. Practices were closed for several months in 2020, generating a backlog of untreated dental disease. When practices reopened, infection control requirements initially reduced throughput, and many practices that had been NHS-only or mixed moved to predominantly or exclusively private practice when UDA (Units of Dental Activity) rates made NHS work financially unrewarding. The total number of courses of NHS dental treatment provided fell from approximately 37 million in 2019-20 to approximately 28 million in 2022-23 — a 24% reduction — despite population need continuing to grow.</p>
            <p>The consequences of reduced access manifest in two measurable ways. First, dental disease progression: untreated tooth decay, gum disease, and dental infections that would have been managed early with regular dental care instead progress to more serious and costly conditions requiring extraction rather than restoration. NHS Digital data shows that tooth extraction is now the most common reason for hospital admission among children under 10 — a preventable condition driven by inadequate routine dental care and poor diet. Second, emergency department attendance: approximately 180,000 visits to hospital A&E departments per year for acute dental pain — people with dental abscesses, impacted wisdom teeth, or severe infection who have no other route to emergency treatment.</p>
            <p>The 2006 NHS dental contract — and its Unit of Dental Activity (UDA) payment system — is widely regarded as the primary structural cause of the access crisis. UDAs pay dentists a flat fee per 'band' of treatment (band 1: check-up; band 2: any restoration; band 3: complex treatment including crowns or dentures) regardless of the actual time and materials involved. This creates perverse incentives: a dentist doing a simple check-up earns the same UDA as one doing a complex restoration, meaning complex patients are effectively penalised. Many complex, vulnerable, and high-need patients have been deregistered from NHS practice as practices managed their UDA contracts efficiently. The government's 2023 reforms to the contract introduced new allowances for complex treatment but have not fundamentally changed the UDA structure.</p>
            <p>NHS England's Dental Recovery Plan, published in February 2024, committed to creating 2.5 million new appointments through dental recovery funding, extending the dental training pathway, and piloting new NHS dental access via pharmacy and community settings. The creation of new 'Dental Vans' — mobile dental units providing emergency care in areas of acute shortage — received funding. Critics, including the British Dental Association and Healthwatch, argued that the recovery plan was inadequate to the scale of the problem and that without fundamental contract reform and an increase in NHS dental funding as a share of total dental expenditure, the access crisis would continue to deepen.</p>
          </div>
        </section>

        <SectionNav
          sections={[
            { id: 'sec-metrics', label: 'Metrics' },
            { id: 'sec-chart', label: 'Chart' },
            { id: 'sec-sources', label: 'Sources' },
          ]}
        />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Adults unable to access NHS dentist"
              value="14m"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="+4m since 2019 · rural worst affected"
              sparklineData={[7, 7.5, 8, 9, 10, 10, 11, 12.5, 14]}
              source="Healthwatch England / BDA 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="A&E visits for dental pain"
              value="180,000"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="+40% since 2019 · hospital not equipped for dental"
              sparklineData={[95000, 100000, 105000, 110000, 128000, 110000, 130000, 155000, 180000]}
              source="NHS England · Hospital Episode Statistics 2024"
              onExpand={() => {}}
            />
            <MetricCard
              label="NHS dental extractions share"
              value="45%"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="45% of NHS treatments are extractions"
              sparklineData={[30, 31, 32, 33, 34, 35, 38, 42, 45]}
              source="NHS Business Services Authority · Dental Data 2024"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="A&E visits for dental pain, 2016–2024"
              subtitle="Annual hospital emergency department attendances for acute dental pain in England (thousands)."
              series={series}
              yLabel="A&E visits (thousands)"
              source={{ name: 'NHS England', dataset: 'Hospital Episode Statistics', frequency: 'annual' }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Access estimates from Healthwatch England dental access survey and British Dental Association workforce analysis. A&E visit data from NHS England Hospital Episode Statistics (primary diagnosis codes for dental conditions). NHS dental treatment volumes from NHS Business Services Authority NHS Dental Statistics (annual). NHS Dental Recovery Plan from NHS England, February 2024. UDA contract analysis from British Dental Association policy research.</p>
          </div>
        </section>
      </main>
    </>
  )
}
