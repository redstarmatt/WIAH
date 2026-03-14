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
  { num: 1, name: 'Menopause Charity', dataset: 'Patient experience survey', date: '2023', url: 'https://www.themenopausecharity.org/' },
  { num: 2, name: 'NHS BSA', dataset: 'Prescription Cost Analysis — HRT items dispensed', url: 'https://www.nhsbsa.nhs.uk/statistical-collections', date: '2023' },
  { num: 3, name: 'NICE', dataset: 'Menopause: Diagnosis and Management (NG23)', url: 'https://www.nice.org.uk/guidance', date: '2015' },
  { num: 4, name: 'British Menopause Society', dataset: 'GP Survey on Menopause Confidence', date: '2021', url: 'https://thebms.org.uk/' },
];

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
          finding="84% of women with menopause symptoms say their quality of life is affected, yet HRT prescriptions — though rising — still reach fewer than 1 in 7 menopausal women, and 42% had to see their GP three or more times before getting treatment."
          colour="#F4A261"
          preposition="in"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Menopause affects every woman and typically occurs between the ages of 45 and 55, with approximately 13 million women currently in perimenopause or post-menopause in the UK. The most common treatment for menopausal symptoms is hormone replacement therapy (HRT), which NICE guidance identifies as highly effective for hot flushes, night sweats, mood disturbance, joint pain, and reduced libido — symptoms that, in severe cases, significantly affect a woman's ability to work, maintain relationships, and function in daily life. A 2023 survey by the Menopause Charity found that 84% of women reported their menopause symptoms had a negative impact on their quality of life, and 45% described the impact as severe.<Cite nums={1} /> Despite this, England dispensed approximately 7.8 million HRT prescriptions in 2023<Cite nums={2} /> — a record high but one that, spread across an estimated 13 million menopausal women, represents fewer than one in seven receiving treatment. The gap between clinical need and access remains substantial.</p>
            <p>For decades, HRT was underprescribed because of concerns following the 2002 Women's Health Initiative study, which reported increased risks of breast cancer, stroke, and blood clots in women taking combined HRT. Subsequent analysis showed these risks were substantially overstated for most formulations and age groups, and by 2015 the dominant medical consensus had shifted: modern HRT, particularly transdermal preparations (patches, gels), carries a low risk profile for most women under 60 and provides significant quality-of-life benefits. NICE updated its menopause guidelines in 2015 to reflect this evidence.<Cite nums={3} /> Yet prescribing remained sluggish because of entrenched clinical caution: a 2021 survey by the British Menopause Society found that only 49% of GPs felt confident managing menopause<Cite nums={4} />, and many women reported being refused HRT, offered antidepressants instead, or told their symptoms were &ldquo;normal&rdquo;. By 2023, 42% of women seeking HRT had to visit their GP three or more times before obtaining a prescription. Training in menopause management was not a mandatory part of GP training until 2024.</p>
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
              changeText="2023 · Record high · Up 37% since 2020"
              sparklineData={[5.0, 5.2, 5.4, 5.6, 5.7, 5.8, 7.0, 7.8]}
              href="#sec-hrt"
            />
            <MetricCard
              label="Women seeing GP 3+ times before HRT"
              value="42"
              unit="%"
              direction={'down' as const}
              polarity={'up-is-bad' as const}
              changeText="2023 · Down from 55% in 2019"
              sparklineData={[55, 53, 51, 50, 48, 45, 43, 42]}
              href="#sec-hrt"
            />
            <MetricCard
              label="Women: menopause affected ability to work"
              value="1 in 4"
              direction={'flat' as const}
              polarity={'up-is-bad' as const}
              changeText="2023 · Fawcett Society survey"
              sparklineData={[25, 25, 26, 26, 25, 25, 25, 25]}
              href="#sec-hrt"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-hrt" className="mb-12">
            <LineChart
              title="HRT prescriptions dispensed, England, 2016–2023"
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
              title="GP menopause consultations, England, 2016–2023"
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
            description="Following the HRT supply crisis of 2022, supply has stabilised and prescriptions are now at record highs — a 37% rise since 2020 driven by awareness campaigns, high-profile advocacy, and updated NICE guidance. Mandatory menopause training for GPs was introduced in 2024, and the government appointed its first Menopause Employment Champion in 2022. The Menopause Support NHS website, launched in 2022, has been accessed over two million times and has helped thousands of women understand their treatment options and rights."
            source="Source: NHS BSDA Prescription Cost Analysis 2023; NICE Menopause Guideline NG23."
          />
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>NHS Business Services Authority — Prescription Cost Analysis. Annual data on all NHS prescription items dispensed in England, by BNF chemical substance. HRT items identified using BNF section 6.4.1.</p>
            <p>NICE — Menopause: Diagnosis and Management (NG23). Clinical guideline updated 2015. Covers HRT prescribing, monitoring, and alternatives for women who cannot take HRT.</p>
            <p>British Menopause Society — GP Survey on Menopause Confidence. Annual survey of GP knowledge and attitudes to menopause management. Self-selected sample of GPs registered with BMS.</p>
            <p>Menopause Charity and Fawcett Society — Annual patient and workforce surveys. Self-selected online samples; results may not be nationally representative. CPRD consultation estimates derived from clinical research database of approximately 4 million active patients. HRT prescriptions cover NHS-funded dispensing only; private prescriptions excluded.</p>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  )
}
