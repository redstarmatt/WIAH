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
            <p>England has some of the worst cancer survival rates in Western Europe, and late diagnosis is the single most important explanation. Five-year cancer survival is strongly correlated with stage at diagnosis: for bowel cancer, the five-year survival rate is 97&percnt; when diagnosed at stage 1 but falls to 7&percnt; at stage 4. For lung cancer, the gap is even more extreme: stage 1 survival exceeds 80&percnt; but stage 4 survival is below 5&percnt;. England diagnoses 54&percnt; of cancers at the earliest stages (1 and 2), against an NHS Long Term Plan target of 75&percnt; by 2028. Meeting that target would, by NHS England&apos;s own modelling, save approximately 55,000 additional lives per decade. The current gap &mdash; 21 percentage points below target with four years remaining &mdash; represents one of the most consequential performance shortfalls in the entire health service. Between 300,000 and 350,000 new cancer cases are diagnosed in England each year; if 75&percnt; were diagnosed early rather than 54&percnt;, approximately 63,000 more patients per year would be diagnosed when treatment is far more likely to be curative.</p>
            <p>The pathway from first symptoms to cancer diagnosis involves multiple steps, each of which introduces potential delays. A patient must first recognise and act on symptoms; see a GP who recognises the possible significance and refers urgently; receive diagnostic tests within a defined timeframe; receive results and a clinical decision; and then begin treatment. The NHS operates a two-week wait standard for urgent GP cancer referrals, a 28-day Faster Diagnosis Standard (introduced in 2020) for resolution of diagnostic uncertainty following a referral, and a 62-day standard for beginning treatment following an urgent referral. All three are routinely missed for significant proportions of patients. The 62-day standard &mdash; the longest-standing metric, with a target of 85&percnt; compliance &mdash; has not been met nationally since 2015. By 2023, only 65&percnt; of cancer patients began treatment within 62 days of urgent referral, against the 85&percnt; target. This means approximately 35&percnt; of cancer patients &mdash; around 100,000 people per year &mdash; are waiting longer than they should from GP referral to treatment start.</p>
            <p>The pandemic caused a profound disruption to cancer pathways that has not been fully recovered. In April 2020, urgent cancer referrals fell by 60&percnt; as patients avoided contacting their GP, GP surgeries closed for face-to-face consultations, and endoscopy and imaging services were suspended. Modelling by Cancer Research UK estimated that 350,000 fewer people than expected were urgently referred for cancer in 2020, and that the resulting delays would contribute to thousands of additional deaths over subsequent years as cancers that were not referred early progressed to later stages. The number of cancers diagnosed fell substantially in 2020 &mdash; but this represented suppressed diagnosis rather than lower incidence, meaning a backlog of undiagnosed cancers accumulated in the community. By 2023, urgent cancer referrals had recovered to above pre-pandemic levels &mdash; reflecting both genuine demand and an acceleration of suppressed cases &mdash; but diagnostic and treatment capacity had not expanded proportionately, producing longer waits at every stage of the pathway.</p>
            <p>Late cancer diagnosis affects some groups far more than others. Lung cancer &mdash; the biggest cancer killer &mdash; is heavily concentrated in deprived communities where smoking prevalence remains high, and its late-diagnosis rate is among the highest of any major cancer. NHS England&apos;s targeted lung health check programme, which offers proactive low-dose CT scanning to high-risk individuals in deprived areas rather than waiting for symptomatic presentation, has demonstrated that early-stage lung cancer detection rates can be dramatically improved through proactive outreach. Bowel cancer screening, offered to all adults aged 50&ndash;74, has uptake rates that vary from 72&percnt; in the least deprived quintile to 44&percnt; in the most deprived, creating a systematic gradient in stage at diagnosis that mirrors deprivation. Ethnic minorities &mdash; particularly South Asian and Black communities &mdash; have lower uptake of bowel, breast, and cervical cancer screening programmes, reflecting barriers including language, cultural factors, and lower trust in health services. Women wait longer than men to be diagnosed with cancer across most tumour types, a pattern partly explained by GP referral practice and partly by genuine differences in symptom presentation.</p>
            <p>Cancer diagnosis data is more complex and layered than most NHS statistics, and several limitations affect interpretation. Stage at diagnosis data is collected by the National Cancer Registration and Analysis Service and lags by approximately 18 months relative to the year of diagnosis, because data completeness depends on cancer registrations being linked to pathology and imaging records that take time to process. Between 15 and 20&percnt; of cancers are still recorded with unknown stage, affecting the denominator for early-stage calculations and potentially inflating or deflating the headline figure depending on whether unknown-stage cases are more likely to be early or late. The 62-day treatment standard has been subjected to methodological controversy: the decision about when a patient&apos;s 62-day clock &ldquo;starts&rdquo; has been adjusted over time and varies between providers, and there is evidence from audit that some trusts record the clock start date in ways that improve measured compliance without improving actual patient experience. The Faster Diagnosis Standard, introduced in 2020 with a 95&percnt; target, is measured differently again and has a much shorter history, making trend analysis limited. None of these metrics captures the experience of patients who do not enter the formal pathway at all &mdash; those who do not present to a GP, those whose GP does not refer urgently, or those who disengage from the pathway after referral.</p>
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
              onExpand={() => {}}
            />
            <MetricCard
              label="62-day treatment standard met"
              value="65"
              unit="%"
              direction={'down' as const}
              polarity={'up-is-good' as const}
              changeText="2023 &middot; Target: 85% &middot; Not met since 2015"
              sparklineData={[85, 84, 82, 80, 76, 68, 65, 65]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Faster Diagnosis Standard met"
              value="65"
              unit="%"
              direction={'flat' as const}
              polarity={'up-is-good' as const}
              changeText="2023 &middot; Target: 95% &middot; Far below target"
              sparklineData={[60, 62, 64, 63, 64, 65, 65, 65]}
              onExpand={() => {}}
            />
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
