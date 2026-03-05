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

interface CancerPoint {
  date: string
  earlyDiagnosisPct: number
  targetCompliance62Day: number
}

interface CancerData {
  national: {
    timeSeries: CancerPoint[]
  }
}

function yearToDate(y: string): Date {
  return new Date(parseInt(y), 5, 1)
}

// -- Page -------------------------------------------------------------------

export default function CancerDiagnosisPage() {
  const [data, setData] = useState<CancerData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/data/cancer-diagnosis/cancer_diagnosis.json')
        const json = await res.json()
        setData(json)
      } catch (err) {
        console.error('Failed to load cancer diagnosis data:', err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) return <div className="p-8 text-center">Loading&hellip;</div>
  if (!data) return <div className="p-8 text-center">Failed to load data</div>

  const earlyDiagnosisSeries: Series[] = [
    {
      id: 'early-diagnosis',
      label: 'Cancers at early stage (1 &amp; 2) (%)',
      colour: '#2A9D8F',
      data: data.national.timeSeries.map(d => ({
        date: yearToDate(d.date),
        value: d.earlyDiagnosisPct,
      })),
    },
  ]

  const target62DaySeries: Series[] = [
    {
      id: '62-day-compliance',
      label: '62-day standard compliance (%)',
      colour: '#E63946',
      data: data.national.timeSeries.map(d => ({
        date: yearToDate(d.date),
        value: d.targetCompliance62Day,
      })),
    },
  ]

  return (
    <>
      <TopicNav topic="Cancer Diagnosis" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Cancer Diagnosis"
          question="How Many Cancers Are Being Caught Too Late?"
          finding="Only 54&percnt; of cancers in England are diagnosed at stages 1 or 2, against a target of 75&percnt; by 2028. Stage 4 bowel cancer has a 7&percnt; five-year survival rate compared to 97&percnt; at stage 1 &mdash; making late diagnosis one of the NHS&apos;s most consequential failures."
          colour="#E63946"
          preposition="in"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England diagnoses just 54&percnt; of cancers at stages 1 or 2, against an NHS Long Term Plan target of 75&percnt; by 2028 &mdash; 21 percentage points below target with four years remaining. The survival stakes are stark: five-year survival for stage 1 bowel cancer is 97&percnt;, falling to 7&percnt; at stage 4; for lung cancer, stage 1 survival exceeds 80&percnt; but stage 4 is below 5&percnt;. NHS England&apos;s own modelling suggests meeting the 75&percnt; target would save approximately 55,000 additional lives per decade. The 62-day standard for beginning treatment after urgent referral &mdash; target 85&percnt; compliance &mdash; has not been met nationally since 2015; by 2023, only 65&percnt; of patients began treatment within 62 days, leaving around 100,000 people per year waiting longer than they should. In April 2020, urgent cancer referrals fell by 60&percnt; and a backlog of undiagnosed cases accumulated; diagnostic and treatment capacity has not caught up.</p>
            <p>Late diagnosis is concentrated in the most deprived communities and among the groups least likely to access screening. Lung cancer, the biggest cancer killer, is heavily concentrated in deprived areas where smoking remains high; bowel screening uptake ranges from 72&percnt; in the least deprived quintile to 44&percnt; in the most deprived. Ethnic minority communities have lower uptake across bowel, breast, and cervical programmes, reflecting language barriers, cultural factors, and historical distrust of health services. Women wait longer than men for diagnosis across most tumour types. The gap between what early detection could achieve and what the NHS currently delivers represents one of the most consequential and remediable performance shortfalls in the health system.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-early-diagnosis', label: 'Early Diagnosis' },
          { id: 'sec-62-day', label: '62-Day Standard' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Cancers at early stage (1 &amp; 2)"
              value="54"
              unit="%"
              direction={'flat' as const}
              polarity={'up-is-good' as const}
              changeText="2023 &middot; Target: 75% by 2028 &middot; 21 pts below target"
              sparklineData={[50, 51, 52, 53, 53, 52, 53, 54]}
              href="#sec-early-diagnosis"/>
            <MetricCard
              label="62-day treatment standard met"
              value="65"
              unit="%"
              direction={'down' as const}
              polarity={'up-is-good' as const}
              changeText="2023 &middot; Target: 85% &middot; Not met since 2015"
              sparklineData={[85, 84, 82, 80, 76, 68, 65, 65]}
              href="#sec-62-day"/>
            <MetricCard
              label="Faster Diagnosis Standard met"
              value="65"
              unit="%"
              direction={'flat' as const}
              polarity={'up-is-good' as const}
              changeText="2023 &middot; Target: 95% &middot; Far below target"
              sparklineData={[60, 62, 64, 63, 64, 65, 65, 65]}
              href="#sec-62-day"/>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-early-diagnosis" className="mb-12">
            <LineChart
              title="Cancers diagnosed at early stages (1 &amp; 2), England, 2015&ndash;2023"
              subtitle="Percentage of all cancers diagnosed at stage 1 or stage 2. Excludes cancers with unknown stage."
              series={earlyDiagnosisSeries}
              yLabel="Early diagnoses (%)"
              targetLine={{ value: 75, label: 'NHS target (75% by 2028)' }}
              source={{
                name: 'NCRAS / NHS England',
                dataset: 'Cancer Stage at Diagnosis',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-62-day" className="mb-12">
            <LineChart
              title="62-day cancer treatment standard compliance, England, 2015&ndash;2023"
              subtitle="Percentage of urgent cancer referrals beginning treatment within 62 days. Target: 85%."
              series={target62DaySeries}
              yLabel="Compliance (%)"
              targetLine={{ value: 85, label: 'NHS target (85%)' }}
              source={{
                name: 'NHS England',
                dataset: 'Cancer Waiting Times',
                frequency: 'monthly',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Lung cancer 5-year survival has more than doubled since 2010"
            value="18%"
            description="Lung cancer 5-year survival has risen from 8&percnt; to 18&percnt; since 2010 &mdash; faster than any comparable country &mdash; largely due to targeted lung health checks in deprived areas and earlier adoption of new treatments. The NHS targeted lung health check programme, which proactively invites high-risk individuals for low-dose CT scanning without waiting for symptoms, is now rolling out nationally. In pilot areas, it detected 80&percnt; of lung cancers at stage 1 or 2, compared to 27&percnt; through the standard symptomatic pathway &mdash; demonstrating the transformative potential of proactive early detection."
            source="Source: NHS England &mdash; NHS Long Term Plan Cancer Programme, 2023 Annual Report."
          />
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>NHS England &mdash; Cancer Waiting Times. Monthly data on two-week wait, 28-day Faster Diagnosis Standard, 31-day, and 62-day cancer treatment targets. Covers all NHS trusts in England.</p>
            <p>NCRAS / NHS England &mdash; Cancer Stage at Diagnosis. Annual data from National Cancer Registration and Analysis Service on stage at diagnosis by cancer type, sex, age, and geography. Typically published with 18-month lag.</p>
            <p>Cancer Research UK &mdash; Cancer Survival Statistics. Five-year and ten-year survival by cancer type and stage. Based on NCRAS survival analyses of NHS cancer registrations linked to mortality data.</p>
            <p>Stage at diagnosis calculated as proportion of cancers with known stage diagnosed at stage 1 or 2. Approximately 15&ndash;20&percnt; of cancers have unknown stage and are excluded from denominator. 62-day clock starts at date of urgent GP referral. Faster Diagnosis Standard clock starts at point of referral and ends at date of cancer diagnosis or ruling out. Data covers England.</p>
          </div>
        </section>
      </main>
    </>
  )
}
