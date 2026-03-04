'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series, Annotation } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface CancerSurvivalData {
  national: {
    fiveYearSurvival: {
      timeSeries: Array<{ year: number; pct: number }>
    }
    oneYearSurvival: {
      timeSeries: Array<{ year: number; pct: number }>
    }
    stageAtDiagnosis: Array<{ stage: string; pct: number }>
    europeanComparison: Array<{ country: string; fiveYear: number }>
  }
}

function yearToDate(y: number): Date {
  return new Date(y, 5, 1)
}

// -- Page -------------------------------------------------------------------

export default function CancerSurvivalPage() {
  const [data, setData] = useState<CancerSurvivalData | null>(null)

  useEffect(() => {
    fetch('/data/cancer-survival/cancer_survival.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const fiveYearSeries: Series[] = data
    ? [{
        id: 'five-year',
        label: '5-year survival',
        colour: '#E63946',
        data: data.national.fiveYearSurvival.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.pct,
        })),
      }]
    : []

  const oneYearSeries: Series[] = data
    ? [{
        id: 'one-year',
        label: '1-year survival',
        colour: '#264653',
        data: data.national.oneYearSurvival.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.pct,
        })),
      }]
    : []

  const survivalAnnotations: Annotation[] = [
    { date: yearToDate(2020), label: '2020: COVID screening paused' },
  ]

  return (
    <>
      <TopicNav topic="Cancer Survival" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Cancer Survival"
          question="Are Cancer Patients in England Surviving?"
          finding="England&rsquo;s five-year cancer survival rate is 55% &mdash; below the European average of 57% and far behind Sweden at 65%. Late-stage diagnosis remains the central problem: a quarter of cancers are caught at stage 4."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Cancer is the leading cause of death in people under 75 in England. Around 390,000 new cases are diagnosed every year, and approximately 167,000 people die from the disease annually. Five-year survival &mdash; the standard international measure of cancer system performance &mdash; has improved steadily from 46% in 2005 to around 55% in 2023. That trajectory is real and reflects genuine advances in treatment, earlier detection for some cancers, and investment in specialist oncology services. But England still lags behind comparable European countries, and the survival gap is not closing.</p>
            <p>The primary driver of England&rsquo;s relative underperformance is stage at diagnosis. Twenty-six per cent of cancers are diagnosed at stage 4, when the disease has already spread. For many common cancers &mdash; lung, bowel, ovarian &mdash; the difference in five-year survival between stage 1 and stage 4 diagnosis is the difference between 80&ndash;90% survival and 5&ndash;15%. COVID disrupted the diagnostic pipeline severely: 40,000 fewer cancers were diagnosed in 2020 than expected. Many of those missing diagnoses eventually presented at later stages, producing a measurable dip in survival statistics that will persist for several years.</p>
            <p>The NHS Long-Term Plan set a target of 75% of cancers diagnosed at stage 1 or 2 by 2028. Current performance sits at around 43%. The gap between ambition and reality reflects workforce shortages in radiology and pathology, endoscopy capacity constraints, and the slow rollout of community diagnostic centres. The Faster Diagnosis Standard &mdash; 28 days from urgent referral to diagnosis or exclusion &mdash; was met for 71% of patients in 2024, meaning nearly three in ten patients waited longer than a month for a diagnosis after their GP flagged concern.</p>
            <p>Survival varies significantly by cancer type and by geography. Breast cancer five-year survival exceeds 85%; pancreatic cancer survival remains below 8%. Patients in the most deprived areas of England have consistently lower survival than those in the least deprived areas, a gap that has not narrowed over two decades. Part of this is late presentation, part is comorbidity, and part is differential access to treatment. The National Cancer Audit shows persistent variation in treatment rates between NHS trusts that cannot be explained by case mix alone.</p>
            <p>International comparisons should be read carefully. Registry completeness, stage-coding practices, and lead-time bias all affect headline figures. But the consistent finding across CONCORD-3, Eurocare-6, and ICBP studies &mdash; that England underperforms northern European peers on survival for the most common cancers &mdash; is robust and persistent. The gap is largest for cancers where early detection makes the biggest difference: lung, bowel, and ovarian. This is a system that treats cancer well once it is found, but finds it too late too often.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-survival', label: '5-Year Survival' },
          { id: 'sec-one-year', label: '1-Year Survival' },
          { id: 'sec-europe', label: 'European Comparison' },
          { id: 'sec-stage', label: 'Stage at Diagnosis' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="5-year cancer survival rate"
              value="55.4"
              unit="%"
              direction="up"
              polarity="up-is-good"
              changeText="2023 &middot; Up from 46% in 2005 &middot; Below EU average of 57%"
              sparklineData={[46.2, 48.1, 50.3, 52.0, 53.5, 54.8, 55.9, 56.7, 54.1, 55.4]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Cancers diagnosed at stage 4"
              value="26"
              unit="%"
              direction="up"
              polarity="up-is-bad"
              changeText="2023 &middot; Target: stage 1&ndash;2 at 75% by 2028 &middot; Currently 43%"
              sparklineData={[22, 23, 23, 24, 24, 25, 25, 27, 26, 26]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Survival gap vs Sweden"
              value="9.8"
              unit="pp"
              direction="up"
              polarity="up-is-bad"
              changeText="Sweden: 65.2% vs England: 55.4% five-year survival &middot; Gap persistent over 15 years"
              sparklineData={[11.2, 10.8, 10.5, 10.2, 10.0, 9.9, 9.8, 9.5, 10.1, 9.8]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-survival" className="mb-12">
            <LineChart
              title="Five-year net cancer survival, England, 2005&ndash;2023"
              subtitle="All cancers combined, age-standardised. Percentage surviving five years after diagnosis."
              series={fiveYearSeries}
              annotations={survivalAnnotations}
              yLabel="Survival (%)"
              source={{
                name: 'ONS',
                dataset: 'Cancer survival in England',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-one-year" className="mb-12">
            <LineChart
              title="One-year net cancer survival, England, 2005&ndash;2023"
              subtitle="All cancers combined. One-year survival is the most sensitive indicator of diagnostic delay."
              series={oneYearSeries}
              yLabel="Survival (%)"
              source={{
                name: 'ONS',
                dataset: 'Cancer survival in England',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-europe" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-2">Five-year cancer survival: European comparison</h2>
            <p className="text-sm text-wiah-mid font-mono mb-6">All cancers combined, age-standardised five-year net survival (%).</p>
            {data && (
              <div className="space-y-3">
                {data.national.europeanComparison.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-28 text-sm text-wiah-black flex-shrink-0">{item.country}</div>
                    <div className="flex-1 bg-wiah-border rounded h-5 overflow-hidden">
                      <div
                        className="h-full rounded"
                        style={{
                          width: `${(item.fiveYear / 70) * 100}%`,
                          backgroundColor: item.country === 'England' ? '#E63946' : '#264653',
                        }}
                      />
                    </div>
                    <div className="w-16 text-right text-sm font-mono text-wiah-black">{item.fiveYear.toFixed(1)}%</div>
                  </div>
                ))}
              </div>
            )}
            <p className="font-mono text-xs text-wiah-mid mt-4">Source: CONCORD-3 / Eurocare-6 &mdash; International cancer survival comparisons</p>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-stage" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-2">Stage at diagnosis, England, 2023</h2>
            <p className="text-sm text-wiah-mid font-mono mb-6">Distribution of newly diagnosed cancers by stage. 26% found at stage 4.</p>
            {data && (
              <div className="space-y-3">
                {data.national.stageAtDiagnosis.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-24 text-sm text-wiah-black flex-shrink-0">{item.stage}</div>
                    <div className="flex-1 bg-wiah-border rounded h-5 overflow-hidden">
                      <div
                        className="h-full rounded"
                        style={{
                          width: `${(item.pct / 30) * 100}%`,
                          backgroundColor: item.stage === 'Stage 4' ? '#E63946' : '#6B7280',
                        }}
                      />
                    </div>
                    <div className="w-12 text-right text-sm font-mono text-wiah-black">{item.pct}%</div>
                  </div>
                ))}
              </div>
            )}
            <p className="font-mono text-xs text-wiah-mid mt-4">Source: NHS England &mdash; Cancer Outcomes and Services Dataset (COSD)</p>
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>ONS &mdash; Cancer survival in England: adults diagnosed between 2005 and 2019, follow-up to 2023. Age-standardised net survival using the Pohar Perme estimator.</p>
            <p>CONCORD-3 programme, London School of Hygiene &amp; Tropical Medicine &mdash; Global surveillance of cancer survival. European comparison figures.</p>
            <p>NHS England &mdash; Cancer Outcomes and Services Dataset (COSD). Stage-at-diagnosis data from cancer registrations.</p>
            <p>Five-year survival estimates are net survival: the probability of surviving at least five years after diagnosis, accounting for background mortality. COVID disrupted screening and referral pathways in 2020&ndash;2021, creating a measurable dip in survival that reflects delayed diagnosis rather than deteriorating treatment quality.</p>
          </div>
        </section>
      </main>
    </>
  )
}
