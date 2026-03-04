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
          finding="Only 45&percnt; of integrated care systems offer the NICE-recommended three cycles of IVF &mdash; leaving couples paying &pound;5,000&ndash;&pound;10,000 per cycle out of pocket, with NHS waiting times stretching to 18 months."
          colour="#6B7280"
          preposition="in"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Since 2004, NICE guidance has recommended that the NHS offer up to three full cycles of in vitro fertilisation to eligible women aged 23&ndash;42 who have been trying to conceive for two years or have a clinical reason for treatment. Two decades later, that standard is met by fewer than half of England&apos;s 42 integrated care systems. The proportion of ICSs offering the full three cycles has fallen from around 60&percnt; in 2016 to just 45&percnt; in 2023, as local commissioners have progressively scaled back eligibility criteria, increased age cut-offs, or reduced the number of funded cycles in response to budget pressures. The Human Fertilisation and Embryology Authority (HFEA) estimates that approximately 54,000 IVF cycles are carried out in the UK each year; of those, roughly 16,500 &mdash; under a third &mdash; are NHS-funded. The remainder are self-funded by patients at an average cost of &pound;5,000 to &pound;10,000 per cycle, with no guarantee of success.</p>
            <p>The postcode lottery in NHS IVF access is one of the starkest in the entire health service. In some ICSs, eligible couples can access up to three cycles with relatively few additional criteria. In others, access requires proof of childlessness in the current relationship only &mdash; excluding people who already have a child from a previous partnership &mdash; or imposes maximum body mass index thresholds as low as 30, or restricts treatment to women under 35. A 2023 survey by Fertility Network UK found that fewer than one in five respondents in England had received NHS-funded treatment without significant additional eligibility hurdles imposed locally. The financial consequences of NHS restrictions fall hardest on lower-income couples who cannot self-fund: privately-funded cycles are heavily concentrated among those in the top two quintiles of household income, while those in the bottom quintile are almost entirely reliant on whatever NHS provision exists in their area.</p>
            <p>Average NHS waiting times for a first IVF appointment have extended from around nine months in 2016 to 18 months by 2023, reflecting both rising demand and the diversion of fertility specialists and clinical staff during the pandemic. The disruption of COVID-19 was severe: HFEA data shows that NHS cycle numbers fell from around 19,500 in 2019 to approximately 17,000 in 2020, as fertility clinics closed or severely restricted access for much of the year. Though private clinics recovered quickly &mdash; private cycle numbers reached record highs of over 58,000 by 2023 &mdash; NHS capacity did not return to pre-pandemic levels. NHS cycles in 2023 were approximately 15&percnt; below the 2018 peak. The extended wait also matters medically: female fertility declines with age, and an 18-month wait from referral to treatment onset can materially affect the likelihood of success, particularly for women over 37.</p>
            <p>The geographic variation in IVF access maps closely onto broader patterns of NHS commissioning inequality. ICSs in the North East and Yorkshire, the Midlands, and parts of the South West have the most restrictive access policies, while London and the South East are more likely to meet NICE standards &mdash; though even in London, waiting times are substantial. There is evidence that minority ethnic communities face compounded barriers: a 2022 study published in Human Reproduction found that Black and South Asian women with fertility conditions were less likely to be referred for specialist care, less likely to be offered NHS-funded treatment, and more likely to face delays once referred. Single women and same-sex couples, who became eligible for NHS IVF under expanded criteria introduced in some ICSs post-2015, are more likely to be subject to restrictive local eligibility rules than heterosexual couples.</p>
            <p>Measuring IVF access and outcomes carries specific limitations. The HFEA&apos;s register is the most comprehensive source of IVF data in any country, but it records clinical cycles rather than patient pathways: a couple who is refused NHS treatment after assessment will not appear in HFEA data at all, and the population of &ldquo;lost&rdquo; patients &mdash; those who gave up on treatment they could not afford &mdash; is entirely invisible. ICS-level compliance with NICE guidance is assessed through periodic surveys rather than audit, and some ICSs report formal compliance while imposing eligibility criteria that effectively exclude most potential patients. Wait time data relies primarily on patient surveys from fertility charities rather than administrative records, introducing potential selection bias: patients who have engaged with support organisations may have longer or more complicated waits than the general population. NHS Digital does not publish a national waiting time statistic for fertility treatment as it does for other elective procedures, leaving advocates relying on piecemeal evidence to make the case for reform.</p>
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
            description="IVF live birth rates per embryo transfer have improved to 24&percnt;, up from 20&percnt; in 2013 &mdash; meaning treatment is more effective even as access has narrowed. Advances in embryo selection, cryopreservation, and laboratory technique have driven genuine clinical progress. For women under 35 using their own eggs, the live birth rate now exceeds 32&percnt; per cycle. The HFEA&apos;s world-class register has enabled evidence-based improvements in clinical practice that benefit all patients who can access treatment."
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
