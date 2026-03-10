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
          finding="Only 45% of integrated care systems offer the NICE-recommended three cycles of IVF — leaving couples paying £5,000–£10,000 per cycle out of pocket, with NHS waiting times stretching to 18 months."
          colour="#6B7280"
          preposition="in"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Since 2004, NICE guidance has recommended that the NHS offer up to three full cycles of in vitro fertilisation to eligible women aged 23–42 who have been trying to conceive for two years or have a clinical reason for treatment. Two decades later, that standard is met by fewer than half of England's 42 integrated care systems. The proportion of ICSs offering the full three cycles has fallen from around 60% in 2016 to just 45% in 2023, as local commissioners have progressively scaled back eligibility criteria, increased age cut-offs, or reduced the number of funded cycles in response to budget pressures. The Human Fertilisation and Embryology Authority (HFEA) estimates that approximately 54,000 IVF cycles are carried out in the UK each year; of those, roughly 16,500 — under a third — are NHS-funded. The remainder are self-funded by patients at an average cost of £5,000 to £10,000 per cycle, with no guarantee of success.</p>
            <p>The postcode lottery in NHS IVF access is one of the starkest in the entire health service. In some ICSs, eligible couples can access up to three cycles with relatively few additional criteria. In others, access requires proof of childlessness in the current relationship only — excluding people who already have a child from a previous partnership — or imposes maximum body mass index thresholds as low as 30, or restricts treatment to women under 35. A 2023 survey by Fertility Network UK found that fewer than one in five respondents in England had received NHS-funded treatment without significant additional eligibility hurdles imposed locally. The financial consequences of NHS restrictions fall hardest on lower-income couples who cannot self-fund: privately-funded cycles are heavily concentrated among those in the top two quintiles of household income, while those in the bottom quintile are almost entirely reliant on whatever NHS provision exists in their area.</p>
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
              changeText="2023 · Down from 60% in 2016"
              sparklineData={[60, 58, 55, 52, 49, 47, 46, 45]}
              href="#sec-nice"
            />
            <MetricCard
              label="Average NHS IVF wait"
              value="18"
              unit="months"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="2023 · Up from 9 months in 2016"
              sparklineData={[9, 10, 12, 14, 16, 17, 18, 18]}
              href="#sec-nice"
            />
            <MetricCard
              label="Private IVF cycle cost"
              value="£5K–£10K"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="Per cycle · No success guarantee"
              sparklineData={[5000, 5500, 6000, 7000, 7500, 8000, 9000, 10000]}
              href="#sec-nice"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-nice" className="mb-12">
            <LineChart
              title="ICSs offering full NICE-recommended IVF provision, 2016–2023"
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
              title="NHS vs private IVF cycles per year, 2016–2023"
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
            description="IVF live birth rates per embryo transfer have improved to 24%, up from 20% in 2013 — meaning treatment is more effective even as access has narrowed. Advances in embryo selection, cryopreservation, and laboratory technique have driven genuine clinical progress. For women under 35 using their own eggs, the live birth rate now exceeds 32% per cycle. The HFEA's world-class register has enabled evidence-based improvements in clinical practice that benefit all patients who can access treatment."
            source="Source: HFEA — Fertility Treatment Trends Report, 2023."
          />
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Human Fertilisation and Embryology Authority (HFEA) — Fertility Treatment Trends. Annual report covering all licensed fertility clinics in the UK. Includes cycle numbers, patient demographics, and live birth rates by funding source.</p>
            <p>Fertility Network UK — Access to NHS Fertility Treatment Survey. Annual patient survey covering eligibility experiences, wait times, and treatment outcomes. Self-selected sample; results weighted but may not be nationally representative.</p>
            <p>NICE — Fertility Problems: Assessment and Treatment (CG156). Clinical guideline first published 2004, updated 2013. Recommends up to 3 full IVF cycles for eligible women aged 23–42. ICS compliance assessed by comparing local commissioning policies against guideline criteria.</p>
            <p>NHS cycle counts and private cycle counts from HFEA register. Wait time data from Fertility Network UK patient surveys. ICS compliance rates from annual Fertility Network UK NHS commissioning survey. Data covers England unless otherwise stated.</p>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  )
}
