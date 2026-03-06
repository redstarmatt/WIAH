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
          finding="Only 54% of cancers in England are diagnosed at stages 1 or 2, against a target of 75% by 2028. Stage 4 bowel cancer has a 7% five-year survival rate compared to 97% at stage 1 — making late diagnosis one of the NHS's most consequential failures."
          colour="#E63946"
          preposition="in"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England has some of the worst cancer survival rates in Western Europe, and late diagnosis is the single most important explanation. Five-year cancer survival is strongly correlated with stage at diagnosis: for bowel cancer, the five-year survival rate is 97% when diagnosed at stage 1 but falls to 7% at stage 4. For lung cancer, the gap is even more extreme: stage 1 survival exceeds 80% but stage 4 survival is below 5%. England diagnoses 54% of cancers at the earliest stages (1 and 2), against an NHS Long Term Plan target of 75% by 2028. Meeting that target would, by NHS England's own modelling, save approximately 55,000 additional lives per decade. The current gap — 21 percentage points below target with four years remaining — represents one of the most consequential performance shortfalls in the entire health service. Between 300,000 and 350,000 new cancer cases are diagnosed in England each year; if 75% were diagnosed early rather than 54%, approximately 63,000 more patients per year would be diagnosed when treatment is far more likely to be curative.</p>
            <p>The pathway from first symptoms to cancer diagnosis involves multiple steps, each of which introduces potential delays. A patient must first recognise and act on symptoms; see a GP who recognises the possible significance and refers urgently; receive diagnostic tests within a defined timeframe; receive results and a clinical decision; and then begin treatment. The NHS operates a two-week wait standard for urgent GP cancer referrals, a 28-day Faster Diagnosis Standard (introduced in 2020) for resolution of diagnostic uncertainty following a referral, and a 62-day standard for beginning treatment following an urgent referral. All three are routinely missed for significant proportions of patients. The 62-day standard — the longest-standing metric, with a target of 85% compliance — has not been met nationally since 2015. By 2023, only 65% of cancer patients began treatment within 62 days of urgent referral, against the 85% target. This means approximately 35% of cancer patients — around 100,000 people per year — are waiting longer than they should from GP referral to treatment start.</p>
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
              changeText="2023 · Target: 75% by 2028 · 21 pts below target"
              sparklineData={[50, 51, 52, 53, 53, 52, 53, 54]}
              onExpand={() => {}}
            />
            <MetricCard
              label="62-day treatment standard met"
              value="65"
              unit="%"
              direction={'down' as const}
              polarity={'up-is-good' as const}
              changeText="2023 · Target: 85% · Not met since 2015"
              sparklineData={[85, 84, 82, 80, 76, 68, 65, 65]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Faster Diagnosis Standard met"
              value="65"
              unit="%"
              direction={'flat' as const}
              polarity={'up-is-good' as const}
              changeText="2023 · Target: 95% · Far below target"
              sparklineData={[60, 62, 64, 63, 64, 65, 65, 65]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-early-diagnosis" className="mb-12">
            <LineChart
              title="Cancers diagnosed at early stages (1 &amp; 2), England, 2015–2023"
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
              title="62-day cancer treatment standard compliance, England, 2015–2023"
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
            description="Lung cancer 5-year survival has risen from 8% to 18% since 2010 — faster than any comparable country — largely due to targeted lung health checks in deprived areas and earlier adoption of new treatments. The NHS targeted lung health check programme, which proactively invites high-risk individuals for low-dose CT scanning without waiting for symptoms, is now rolling out nationally. In pilot areas, it detected 80% of lung cancers at stage 1 or 2, compared to 27% through the standard symptomatic pathway — demonstrating the transformative potential of proactive early detection."
            source="Source: NHS England — NHS Long Term Plan Cancer Programme, 2023 Annual Report."
          />
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>NHS England — Cancer Waiting Times. Monthly data on two-week wait, 28-day Faster Diagnosis Standard, 31-day, and 62-day cancer treatment targets. Covers all NHS trusts in England.</p>
            <p>NCRAS / NHS England — Cancer Stage at Diagnosis. Annual data from National Cancer Registration and Analysis Service on stage at diagnosis by cancer type, sex, age, and geography. Typically published with 18-month lag.</p>
            <p>Cancer Research UK — Cancer Survival Statistics. Five-year and ten-year survival by cancer type and stage. Based on NCRAS survival analyses of NHS cancer registrations linked to mortality data.</p>
            <p>Stage at diagnosis calculated as proportion of cancers with known stage diagnosed at stage 1 or 2. Approximately 15–20% of cancers have unknown stage and are excluded from denominator. 62-day clock starts at date of urgent GP referral. Faster Diagnosis Standard clock starts at point of referral and ends at date of cancer diagnosis or ruling out. Data covers England.</p>
          </div>
        </section>
      </main>
    </>
  )
}
