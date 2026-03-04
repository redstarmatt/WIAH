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
            <p>C.difficile is a spore-forming bacterium that causes severe diarrhoea and in some cases life-threatening colitis, particularly in older patients and those who have recently received antibiotics. It is inherently difficult to control because its spores resist standard alcohol-based hand sanitisers and can persist in the environment for months. England saw a dramatic rise in C.diff cases in the early 2000s, peaking at over 55,000 cases in 2007/08 &mdash; a figure that provoked a national crisis response, including the creation of the National Clostridium difficile Target, mandatory reporting, and the introduction of hand-hygiene campaigns, environmental cleaning protocols, and antibiotic stewardship programmes. By 2014, cases had fallen to around 36,000, and by 2019 to approximately 13,000 &mdash; a reduction of 76&percnt; from peak. This is one of the genuine public health successes of the past two decades. However, since 2020 the trend has reversed: cases rose to approximately 14,200 in 2023, a 9&percnt; increase over three years. The causes include hospital crowding, which reduces the time staff can spend on cleaning and infection control; the disruption of antibiotic stewardship programmes during the pandemic; and the operational pressures that make rigorous compliance with isolation protocols difficult to maintain when wards are running at 95&percnt; or above capacity.</p>
            <p>MRSA bloodstream infections underwent a similar trajectory. The bacterium, which is resistant to most standard antibiotics and causes serious bloodstream infections with high mortality, was responsible for over 7,000 infections per year in NHS hospitals in the mid-2000s. A combination of mandatory screening, improved isolation practices, enhanced cleaning, and targeted decolonisation reduced MRSA bloodstream infections to under 700 by 2018 &mdash; a reduction of over 90&percnt;. This improvement was driven by a combination of regulatory pressure, a zero-tolerance policy introduced under successive secretaries of state, financial penalties for trusts with excessive MRSA rates, and genuine clinical commitment to infection prevention. Since 2020, MRSA bloodstream infections have crept upward: 1,423 were recorded in 2023, a 45&percnt; increase from the 2018 nadir. This increase is concerning but must be contextualised: 1,423 cases remains far below the mid-2000s peak, and the patient population presenting to NHS hospitals is older and more clinically complex than a decade ago, increasing vulnerability to infection even with stable infection prevention practices.</p>
            <p>Infection rates within hospitals are not uniformly distributed. Trusts in the most deprived areas tend to have higher infection rates, reflecting older infrastructure, more complex patient populations, and historically lower investment in modern facilities. Older hospital buildings &mdash; many NHS wards date from the 1960s and 1970s &mdash; are physically harder to clean thoroughly: open-bay ward configurations with curtain partitions do not support the single-room isolation that best practice recommends for C.diff and MRSA patients. The NHS Infrastructure Review estimated in 2019 that 40&percnt; of NHS hospital buildings were beyond their optimal design life. MRSA rates are highest in large teaching hospitals and major trauma centres, which treat the most complex patients and have the highest proportion of patients with invasive devices such as central lines and urinary catheters &mdash; the main vectors for bloodstream infections. C.diff disproportionately affects older patients, women, and those on certain antibiotics; wards specialising in elderly care and oncology consistently report higher rates than surgical or maternity wards.</p>
            <p>Mandatory surveillance data on C.diff and MRSA is among the most reliable in the NHS and has driven genuine improvements through transparency and accountability. However, surveillance captures only mandatorily reported organisms and provides a partial picture of overall HAI burden. The most common HAIs &mdash; surgical site infections, urinary tract infections, hospital-acquired pneumonia, and bloodstream infections caused by organisms other than MRSA &mdash; are not subject to the same mandatory reporting requirements and are estimated through periodic prevalence surveys rather than continuous monitoring. The most recent Point Prevalence Survey of Healthcare-Associated Infections, conducted by UKHSA, found that approximately 6.4&percnt; of inpatients had a HAI on the day of survey &mdash; a figure consistent with estimates of 300,000 annual cases but not precise enough to track short-term trends. Measuring the causal contribution of HAIs to patient deaths is methodologically challenging because most patients who acquire HAIs are already seriously ill; attributing mortality directly to the infection rather than the underlying condition requires careful case-by-case analysis that is not routinely conducted at scale.</p>
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
              onExpand={() => {}}
            />
            <MetricCard
              label="MRSA bloodstream infections"
              value="1,423"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="2023 &middot; Up 45% from 2018 low of 980"
              sparklineData={[1200, 1150, 1100, 1050, 1000, 980, 1100, 1200, 1350, 1423]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Patients with HAI at any time"
              value="300,000"
              direction={'flat' as const}
              polarity={'up-is-bad' as const}
              changeText="Annual estimate &middot; All healthcare settings"
              sparklineData={[320000, 310000, 305000, 300000, 295000, 300000, 305000, 300000]}
              onExpand={() => {}}
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
            title="MRSA cases fell 95&percnt; between 2007 and 2018 &mdash; one of the NHS&apos;s greatest achievements"
            value="95%"
            description="MRSA cases fell 95&percnt; between 2007 and 2018 &mdash; from over 7,000 to under 700 &mdash; one of the greatest infection control achievements in NHS history. C.difficile fell 76&percnt; from its 2007 peak. Though both organisms have seen recent increases, they remain far below historical highs. The infection prevention infrastructure built during this period &mdash; mandatory surveillance, hand hygiene campaigns, antibiotic stewardship, and enhanced cleaning protocols &mdash; forms the foundation for reversing the current trend."
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
