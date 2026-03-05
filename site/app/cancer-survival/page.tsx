'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series, Annotation } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import PositiveCallout from '@/components/PositiveCallout'

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
          question="Cancer survival has risen by 10 percentage points in 15 years."
          finding="Five-year cancer survival in England rose from 46% in 2005 to 55.4% in 2023 &mdash; a 9.4 percentage-point improvement. This is one of the biggest sustained improvements in any health outcome in NHS history."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Five-year cancer survival in England has risen from 46.2% for patients diagnosed in 2005 to 55.4% for those diagnosed in 2021 &mdash; a 9.2 percentage-point improvement over 15 years. This is not a small statistical fluctuation: it represents tens of thousands of people alive who, diagnosed a decade earlier with the same cancer, would not have survived five years. It is one of the most significant improvements in any health outcome tracked by the NHS, and it is almost never described as such.</p>
            <p>What drove the improvement? Broadly equal contributions from better treatment and earlier detection. Targeted therapies for breast, lung, and bowel cancers have transformed survival for specific subtypes. Immunotherapy has produced durable remissions in melanoma and lung cancer that were unimaginable in 2005. Improved surgical techniques, specialist multidisciplinary teams, and the rollout of cancer networks all raised the floor of treatment quality. For some cancers &mdash; testicular cancer, Hodgkin lymphoma, thyroid cancer &mdash; five-year survival now exceeds 90%.</p>
            <p>The international comparison is more complex. England&rsquo;s 55.4% five-year survival still lags behind the European average of 57% and far behind Sweden at 65%. The gap is largest for cancers where early detection is most decisive &mdash; lung, bowel, ovarian. England&rsquo;s record on late-stage diagnosis remains a genuine weakness: 26% of cancers are still caught at stage 4, when treatment options are limited. The NHS Long-Term Plan set a target of 75% diagnosed at stage 1 or 2 by 2028; current performance is around 43%.</p>
            <p>COVID disrupted cancer pathways severely: 40,000 fewer cancers were diagnosed in 2020 than expected, and the dip in survival data for 2020&ndash;2021 reflects delayed presentation rather than deteriorating treatment quality. As that cohort works through the system, survival statistics in the near term will remain affected. The recovery in diagnostic activity since 2022 has been strong &mdash; over 3 million cancer checks were carried out in 2023, a record &mdash; but catching up a backlog accumulated over a pandemic is a different challenge from routine earlier detection.</p>
            <p>The trajectory since 2005 is remarkable. Breast cancer: up from 79% to 86% five-year survival. Prostate cancer: up from 77% to 88%. Bowel cancer: up from 52% to 62%. These are not small gains. They represent genuine, compounding progress in one of the most difficult domains in medicine. The honest account of cancer in England holds both truths: a system that has achieved something extraordinary over two decades, and one that still diagnoses too many cancers too late to give patients the best possible chance.</p>
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
              changeText="Up +9.2pp since 2005 &middot; one of NHS&rsquo;s biggest-ever improvements"
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

        <ScrollReveal>
          <PositiveCallout
            title="One of the NHS&rsquo;s biggest-ever improvements"
            value="+9.2pp"
            unit="5-year survival since 2005"
            description="Five-year cancer survival rising from 46.2% to 55.4% over 15 years represents roughly 20,000 additional people alive five years after diagnosis each year — compared to what would have happened under 2005 survival rates. The improvement reflects genuine advances in treatment (targeted therapies, immunotherapy, better surgery) and earlier detection for some cancers. Breast, prostate, testicular, and thyroid cancers all now have five-year survival rates above 85%."
            source="Source: ONS — Cancer survival in England, patients diagnosed 2005–2021, follow-up to 2023."
          />
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
