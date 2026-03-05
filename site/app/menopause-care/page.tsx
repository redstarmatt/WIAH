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

interface MenopausePoint {
  date: string
  hrtPrescriptionsMillion: number
}

interface ConsultationPoint {
  date: string
  menopauseConsultationsThousands: number
}

interface MenopauseData {
  national: {
    timeSeries: MenopausePoint[]
    gpConsultations: {
      timeSeries: ConsultationPoint[]
    }
  }
}

function yearToDate(y: string): Date {
  return new Date(parseInt(y), 5, 1)
}

// -- Page -------------------------------------------------------------------

export default function MenopaureCarePage() {
  const [data, setData] = useState<MenopauseData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/data/menopause-care/menopause_care.json')
        const json = await res.json()
        setData(json)
      } catch (err) {
        console.error('Failed to load menopause care data:', err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) return <div className="p-8 text-center">Loading&hellip;</div>
  if (!data) return <div className="p-8 text-center">Failed to load data</div>

  const hrtSeries: Series[] = [
    {
      id: 'hrt-prescriptions',
      label: 'HRT prescriptions (millions)',
      colour: '#F4A261',
      data: data.national.timeSeries.map(d => ({
        date: yearToDate(d.date),
        value: d.hrtPrescriptionsMillion,
      })),
    },
  ]

  const consultationSeries: Series[] = [
    {
      id: 'gp-consultations',
      label: 'GP menopause consultations (thousands)',
      colour: '#F4A261',
      data: data.national.gpConsultations.timeSeries.map(d => ({
        date: yearToDate(d.date),
        value: d.menopauseConsultationsThousands,
      })),
    },
  ]

  return (
    <>
      <TopicNav topic="Menopause Care" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Menopause Care"
          question="Are Women Getting the Menopause Care They Need?"
          finding="84% of women with menopause symptoms say their quality of life is affected, yet HRT prescriptions &mdash; though rising &mdash; still reach fewer than 1 in 7 menopausal women, and 42% had to see their GP three or more times before getting treatment."
          colour="#F4A261"
          preposition="in"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Approximately 13 million women in the UK are in perimenopause or post-menopause, yet England dispensed only 7.8 million HRT prescriptions in 2023 &mdash; a record high but still fewer than one in seven menopausal women. NICE updated its menopause guidelines in 2015 to reflect that modern transdermal HRT carries a low risk profile for most women under 60, but prescribing remained sluggish: in 2023, 42% of women had to visit their GP three or more times before obtaining a prescription, and mandatory menopause training in GP education was not introduced until 2024. A 2023 Menopause Charity survey found 84% of women reported a negative impact on quality of life from symptoms, with 45% describing the impact as severe. A supply crisis in 2022&ndash;23 &mdash; when over 30 HRT products were simultaneously restricted &mdash; compounded the access problem, forcing many women to switch formulations or go without treatment entirely.</p>
            <p>Access is deeply unequal. South Asian and Black women are significantly less likely to be prescribed HRT than white women with equivalent symptom severity, even after adjusting for clinical factors. Rural women face additional barriers from GP availability and fewer than 100 NHS specialist menopause clinics covering all of England. The workplace burden falls hardest on women in teaching, nursing, and social work: a 2023 Fawcett Society survey found one in four women said menopause had adversely affected their ability to work, and 10% had reduced hours or left employment entirely &mdash; disproportionate impacts in public-sector roles with predominantly older female workforces.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-hrt', label: 'HRT Prescriptions' },
          { id: 'sec-consultations', label: 'GP Consultations' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="HRT prescriptions per year"
              value="7.8M"
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="2023 &middot; Record high &middot; Up 37% since 2020"
              sparklineData={[5.0, 5.2, 5.4, 5.6, 5.7, 5.8, 7.0, 7.8]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Women seeing GP 3+ times before HRT"
              value="42"
              unit="%"
              direction={'down' as const}
              polarity={'up-is-bad' as const}
              changeText="2023 &middot; Down from 55% in 2019"
              sparklineData={[55, 53, 51, 50, 48, 45, 43, 42]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Women: menopause affected ability to work"
              value="1 in 4"
              direction={'flat' as const}
              polarity={'up-is-bad' as const}
              changeText="2023 &middot; Fawcett Society survey"
              sparklineData={[25, 25, 26, 26, 25, 25, 25, 25]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-hrt" className="mb-12">
            <LineChart
              title="HRT prescriptions dispensed, England, 2016&ndash;2023"
              subtitle="Total hormone replacement therapy items dispensed by NHS community pharmacies. Millions."
              series={hrtSeries}
              yLabel="Prescriptions (millions)"
              source={{
                name: 'NHS Business Services Authority',
                dataset: 'Prescription Cost Analysis',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-consultations" className="mb-12">
            <LineChart
              title="GP menopause consultations, England, 2016&ndash;2023"
              subtitle="Estimated annual menopause-related GP consultations. Thousands. Modelled from CPRD data."
              series={consultationSeries}
              yLabel="Consultations (thousands)"
              source={{
                name: 'CPRD / RCGP Research',
                dataset: 'Menopause Consultation Rate Estimates',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="HRT prescriptions at record high following awareness drive"
            value="37%"
            description="Following the HRT supply crisis of 2022, supply has stabilised and prescriptions are now at record highs &mdash; a 37% rise since 2020 driven by awareness campaigns, high-profile advocacy, and updated NICE guidance. Mandatory menopause training for GPs was introduced in 2024, and the government appointed its first Menopause Employment Champion in 2022. The Menopause Support NHS website, launched in 2022, has been accessed over two million times and has helped thousands of women understand their treatment options and rights."
            source="Source: NHS BSDA Prescription Cost Analysis 2023; NICE Menopause Guideline NG23."
          />
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>NHS Business Services Authority &mdash; Prescription Cost Analysis. Annual data on all NHS prescription items dispensed in England, by BNF chemical substance. HRT items identified using BNF section 6.4.1.</p>
            <p>NICE &mdash; Menopause: Diagnosis and Management (NG23). Clinical guideline updated 2015. Covers HRT prescribing, monitoring, and alternatives for women who cannot take HRT.</p>
            <p>British Menopause Society &mdash; GP Survey on Menopause Confidence. Annual survey of GP knowledge and attitudes to menopause management. Self-selected sample of GPs registered with BMS.</p>
            <p>Menopause Charity and Fawcett Society &mdash; Annual patient and workforce surveys. Self-selected online samples; results may not be nationally representative. CPRD consultation estimates derived from clinical research database of approximately 4 million active patients. HRT prescriptions cover NHS-funded dispensing only; private prescriptions excluded.</p>
          </div>
        </section>
      </main>
    </>
  )
}
