'use client'

import { useEffect, useState } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import PositiveCallout from '@/components/PositiveCallout'

// -- Types ------------------------------------------------------------------

interface InfectionPoint {
  date: string
  cDiffCases: number
  mrsaCases: number
}

interface HospitalInfectionData {
  national: {
    timeSeries: InfectionPoint[]
  }
}

function yearToDate(y: string): Date {
  return new Date(parseInt(y), 5, 1)
}

// -- Page -------------------------------------------------------------------

export default function HospitalInfectionsPage() {
  const [data, setData] = useState<HospitalInfectionData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/data/hospital-infections/hospital_infections.json')
        const json = await res.json()
        setData(json)
      } catch (err) {
        console.error('Failed to load hospital infections data:', err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) return <div className="p-8 text-center">Loading&hellip;</div>
  if (!data) return <div className="p-8 text-center">Failed to load data</div>

  const cDiffSeries: Series[] = [
    {
      id: 'c-diff',
      label: 'C.difficile cases',
      colour: '#F4A261',
      data: data.national.timeSeries.map(d => ({
        date: yearToDate(d.date),
        value: d.cDiffCases,
      })),
    },
  ]

  const mrsaSeries: Series[] = [
    {
      id: 'mrsa',
      label: 'MRSA bloodstream infections',
      colour: '#E63946',
      data: data.national.timeSeries.map(d => ({
        date: yearToDate(d.date),
        value: d.mrsaCases,
      })),
    },
  ]

  return (
    <>
      <TopicNav topic="Hospital Infections" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Hospital Infections"
          question="How Safe Are Our Hospitals From Infection?"
          finding="C.difficile cases have risen for two consecutive years after decades of decline, and an estimated 300,000 patients acquire healthcare-associated infections annually &mdash; a patient safety challenge that the NHS must not lose sight of after years of hard-won progress."
          colour="#F4A261"
          preposition="in"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Healthcare-associated infections (HAIs) &mdash; infections acquired as a result of receiving care in a health setting rather than brought in by the patient &mdash; represent one of the most significant and preventable sources of patient harm in any healthcare system. In England, an estimated 300,000 patients acquire a HAI at some point each year, ranging from wound infections and urinary tract infections to life-threatening bloodstream infections caused by resistant organisms. These infections are associated with prolonged hospital stays, increased morbidity and mortality, and substantial costs: Public Health England estimated the annual cost of HAIs to the NHS at over &pound;1 billion in 2018. The two organisms that attract the most systematic surveillance are Clostridium difficile (C.diff) and methicillin-resistant Staphylococcus aureus (MRSA), both because they are important clinical problems and because their trajectory is a useful indicator of the overall quality of infection prevention and control practices within a hospital system.</p>
            <p>C.difficile is a spore-forming bacterium that causes severe diarrhoea and in some cases life-threatening colitis, particularly in older patients and those who have recently received antibiotics. It is inherently difficult to control because its spores resist standard alcohol-based hand sanitisers and can persist in the environment for months. England saw a dramatic rise in C.diff cases in the early 2000s, peaking at over 55,000 cases in 2007/08 &mdash; a figure that provoked a national crisis response, including the creation of the National Clostridium difficile Target, mandatory reporting, and the introduction of hand-hygiene campaigns, environmental cleaning protocols, and antibiotic stewardship programmes. By 2014, cases had fallen to around 36,000, and by 2019 to approximately 13,000 &mdash; a reduction of 76% from peak. This is one of the genuine public health successes of the past two decades. However, since 2020 the trend has reversed: cases rose to approximately 14,200 in 2023, a 9% increase over three years. The causes include hospital crowding, which reduces the time staff can spend on cleaning and infection control; the disruption of antibiotic stewardship programmes during the pandemic; and the operational pressures that make rigorous compliance with isolation protocols difficult to maintain when wards are running at 95% or above capacity.</p>
            </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-cdiff', label: 'C.difficile' },
          { id: 'sec-mrsa', label: 'MRSA' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="C.difficile cases per year"
              value="14,200"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="2023 &middot; Rising for 3rd year &middot; After historic fall"
              sparklineData={[36000, 25000, 18000, 15000, 14000, 13000, 12500, 12800, 13500, 14200]}
              href="#sec-cdiff"
            />
            <MetricCard
              label="MRSA bloodstream infections"
              value="1,423"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="2023 &middot; Up 45% from 2018 low of 980"
              sparklineData={[1200, 1150, 1100, 1050, 1000, 980, 1100, 1200, 1350, 1423]}
              href="#sec-cdiff"
            />
            <MetricCard
              label="Patients with HAI at any time"
              value="300,000"
              direction={'flat' as const}
              polarity={'up-is-bad' as const}
              changeText="Annual estimate &middot; All healthcare settings"
              sparklineData={[320000, 310000, 305000, 300000, 295000, 300000, 305000, 300000]}
              href="#sec-cdiff"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-cdiff" className="mb-12">
            <LineChart
              title="C.difficile cases, England, 2014&ndash;2023"
              subtitle="Reported cases of C.difficile infection in NHS acute trusts. Mandatory surveillance."
              series={cDiffSeries}
              yLabel="Cases"
              source={{
                name: 'UKHSA',
                dataset: 'C.difficile Infections in England',
                frequency: 'quarterly',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-mrsa" className="mb-12">
            <LineChart
              title="MRSA bloodstream infections, England, 2014&ndash;2023"
              subtitle="Reported MRSA bloodstream infections in NHS acute trusts. Mandatory surveillance."
              series={mrsaSeries}
              yLabel="Infections"
              source={{
                name: 'UKHSA',
                dataset: 'MRSA Bloodstream Infections',
                frequency: 'quarterly',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="MRSA cases fell 95% between 2007 and 2018 &mdash; one of the NHS&apos;s greatest achievements"
            value="95%"
            description="MRSA cases fell 95% between 2007 and 2018 &mdash; from over 7,000 to under 700 &mdash; one of the greatest infection control achievements in NHS history. C.difficile fell 76% from its 2007 peak. Though both organisms have seen recent increases, they remain far below historical highs. The infection prevention infrastructure built during this period &mdash; mandatory surveillance, hand hygiene campaigns, antibiotic stewardship, and enhanced cleaning protocols &mdash; forms the foundation for reversing the current trend."
            source="Source: UKHSA &mdash; MRSA and C.difficile Annual Summary, 2023."
          />
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>UKHSA &mdash; C.difficile Infections in England. Quarterly mandatory surveillance returns from NHS acute trusts. Covers all cases identified in hospital laboratories where C.difficile toxin is detected. Trust-level data published quarterly.</p>
            <p>UKHSA &mdash; MRSA Bloodstream Infections. Quarterly mandatory surveillance of MRSA bloodstream infections in NHS trusts. Covers cases identified through blood culture where MRSA is the causative organism.</p>
            <p>UKHSA &mdash; Point Prevalence Survey of Healthcare-Associated Infections. Periodic cross-sectional survey of inpatients across a sample of NHS hospitals. Most recent survey 2022. Provides estimates of overall HAI burden including non-mandatorily-reported infections.</p>
            <p>C.difficile cases include both hospital-onset (more than 48 hours after admission) and community-onset healthcare-associated cases. MRSA cases are bloodstream infections only; colonisation is not included. Figures cover England. Cost estimates from PHE Healthcare-Associated Infections report, 2018.</p>
          </div>
        </section>
      </main>
    </>
  )
}
