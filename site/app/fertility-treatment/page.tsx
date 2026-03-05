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

interface FertilityPoint {
  date: string
  niceCompliantPct: number
  avgWaitMonths: number
}

interface NhsPrivatePoint {
  date: string
  nhsCycles: number
  privateCycles: number
}

interface FertilityData {
  national: {
    timeSeries: FertilityPoint[]
    nhsVsPrivate: {
      timeSeries: NhsPrivatePoint[]
    }
  }
}

function yearToDate(y: string): Date {
  return new Date(parseInt(y), 5, 1)
}

// -- Page -------------------------------------------------------------------

export default function FertilityTreatmentPage() {
  const [data, setData] = useState<FertilityData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/data/fertility-treatment/fertility_treatment.json')
        const json = await res.json()
        setData(json)
      } catch (err) {
        console.error('Failed to load fertility treatment data:', err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) return <div className="p-8 text-center">Loading&hellip;</div>
  if (!data) return <div className="p-8 text-center">Failed to load data</div>

  const niceSeries: Series[] = [
    {
      id: 'nice-compliant',
      label: 'ICSs offering full 3 NICE cycles (%)',
      colour: '#6B7280',
      data: data.national.timeSeries.map(d => ({
        date: yearToDate(d.date),
        value: d.niceCompliantPct,
      })),
    },
  ]

  const nhsPrivateSeries: Series[] = [
    {
      id: 'nhs-cycles',
      label: 'NHS IVF cycles',
      colour: '#264653',
      data: data.national.nhsVsPrivate.timeSeries.map(d => ({
        date: yearToDate(d.date),
        value: d.nhsCycles,
      })),
    },
    {
      id: 'private-cycles',
      label: 'Private IVF cycles',
      colour: '#E63946',
      data: data.national.nhsVsPrivate.timeSeries.map(d => ({
        date: yearToDate(d.date),
        value: d.privateCycles,
      })),
    },
  ]

  return (
    <>
      <TopicNav topic="Fertility Treatment" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Fertility Treatment"
          question="Is IVF on the NHS Actually Available?"
          finding="Only 45% of integrated care systems offer the NICE-recommended three cycles of IVF &mdash; leaving couples paying &pound;5,000&ndash;&pound;10,000 per cycle out of pocket, with NHS waiting times stretching to 18 months."
          colour="#6B7280"
          preposition="in"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Since 2004, NICE guidance has recommended the NHS offer up to three full cycles of IVF to eligible women aged 23&ndash;42. Two decades later, that standard is met by fewer than half of England&apos;s 42 integrated care systems: the proportion of ICSs offering the full three cycles has fallen from around 60% in 2016 to just 45% in 2023, as local commissioners scaled back eligibility criteria, raised age cut-offs, or reduced funded cycles to manage budget pressures. Of approximately 54,000 IVF cycles carried out in the UK each year, roughly 16,500 &mdash; under a third &mdash; are NHS-funded; the remainder cost patients &pound;5,000 to &pound;10,000 per cycle. Average NHS waiting times have extended from nine months in 2016 to 18 months in 2023, a medically significant delay given that female fertility declines with age. NHS cycle numbers in 2023 remain approximately 15% below the 2018 peak; private cycles reached record highs over the same period.</p>
            <p>The postcode lottery is one of the starkest in the health service, and its financial consequences fall hardest on lower-income couples who cannot self-fund: privately-funded cycles are heavily concentrated in the top two income quintiles, while those in the bottom quintile depend entirely on whatever NHS provision exists in their area. ICSs in the North East, Midlands, and parts of the South West have the most restrictive access policies. There is evidence of compounded barriers for minority ethnic communities: a 2022 study in Human Reproduction found Black and South Asian women with fertility conditions were less likely to be referred, less likely to be offered NHS-funded treatment, and more likely to face delays. Single women and same-sex couples, though formally eligible in some ICSs since 2015, are disproportionately subject to restrictive local criteria.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-nice', label: 'NICE Compliance' },
          { id: 'sec-nhs-private', label: 'NHS vs Private' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="ICSs offering full 3 NICE cycles"
              value="45"
              unit="%"
              direction={'down' as const}
              polarity={'up-is-good' as const}
              changeText="2023 &middot; Down from 60% in 2016"
              sparklineData={[60, 58, 55, 52, 49, 47, 46, 45]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Average NHS IVF wait"
              value="18"
              unit="months"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="2023 &middot; Up from 9 months in 2016"
              sparklineData={[9, 10, 12, 14, 16, 17, 18, 18]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Private IVF cycle cost"
              value="&pound;5K&ndash;&pound;10K"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="Per cycle &middot; No success guarantee"
              sparklineData={[5000, 5500, 6000, 7000, 7500, 8000, 9000, 10000]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-nice" className="mb-12">
            <LineChart
              title="ICSs offering full NICE-recommended IVF provision, 2016&ndash;2023"
              subtitle="Percentage of integrated care systems offering all three recommended cycles. England."
              series={niceSeries}
              yLabel="ICSs compliant (%)"
              source={{
                name: 'HFEA / Fertility Network UK',
                dataset: 'NHS IVF Commissioning Survey',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-nhs-private" className="mb-12">
            <LineChart
              title="NHS vs private IVF cycles per year, 2016&ndash;2023"
              subtitle="Total IVF treatment cycles funded by the NHS compared to privately funded. England."
              series={nhsPrivateSeries}
              yLabel="IVF cycles"
              source={{
                name: 'HFEA',
                dataset: 'Fertility Treatment Trends Report',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="IVF live birth rates have improved significantly"
            value="24%"
            description="IVF live birth rates per embryo transfer have improved to 24%, up from 20% in 2013 &mdash; meaning treatment is more effective even as access has narrowed. Advances in embryo selection, cryopreservation, and laboratory technique have driven genuine clinical progress. For women under 35 using their own eggs, the live birth rate now exceeds 32% per cycle. The HFEA&apos;s world-class register has enabled evidence-based improvements in clinical practice that benefit all patients who can access treatment."
            source="Source: HFEA &mdash; Fertility Treatment Trends Report, 2023."
          />
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Human Fertilisation and Embryology Authority (HFEA) &mdash; Fertility Treatment Trends. Annual report covering all licensed fertility clinics in the UK. Includes cycle numbers, patient demographics, and live birth rates by funding source.</p>
            <p>Fertility Network UK &mdash; Access to NHS Fertility Treatment Survey. Annual patient survey covering eligibility experiences, wait times, and treatment outcomes. Self-selected sample; results weighted but may not be nationally representative.</p>
            <p>NICE &mdash; Fertility Problems: Assessment and Treatment (CG156). Clinical guideline first published 2004, updated 2013. Recommends up to 3 full IVF cycles for eligible women aged 23&ndash;42. ICS compliance assessed by comparing local commissioning policies against guideline criteria.</p>
            <p>NHS cycle counts and private cycle counts from HFEA register. Wait time data from Fertility Network UK patient surveys. ICS compliance rates from annual Fertility Network UK NHS commissioning survey. Data covers England unless otherwise stated.</p>
          </div>
        </section>
      </main>
    </>
  )
}
