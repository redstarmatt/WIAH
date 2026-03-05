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

interface StrokeData {
  national: {
    mortalityRate: {
      timeSeries: Array<{ year: number; ratePer100k: number }>
    }
    thrombolysisRate: {
      timeSeries: Array<{ year: number; pct: number }>
    }
    thrombectomyRate: {
      timeSeries: Array<{ year: number; pct: number }>
    }
    strokeUnitAdmission: {
      timeSeries: Array<{ year: number; pct: number }>
    }
  }
}

function yearToDate(y: number): Date {
  return new Date(y, 5, 1)
}

// -- Page -------------------------------------------------------------------

export default function StrokePage() {
  const [data, setData] = useState<StrokeData | null>(null)

  useEffect(() => {
    fetch('/data/stroke/stroke.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const mortalitySeries: Series[] = data
    ? [{
        id: 'mortality',
        label: 'Stroke mortality per 100,000',
        colour: '#E63946',
        data: data.national.mortalityRate.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.ratePer100k,
        })),
      }]
    : []

  const treatmentSeries: Series[] = data
    ? [
        {
          id: 'thrombolysis',
          label: 'Thrombolysis rate (%)',
          colour: '#264653',
          data: data.national.thrombolysisRate.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.pct,
          })),
        },
        {
          id: 'thrombectomy',
          label: 'Thrombectomy rate (%)',
          colour: '#2A9D8F',
          data: data.national.thrombectomyRate.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.pct,
          })),
        },
      ]
    : []

  const mortalityAnnotations: Annotation[] = [
    { date: yearToDate(2020), label: '2020: COVID delays presentations' },
  ]

  return (
    <>
      <TopicNav topic="Stroke" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Stroke"
          question="Can You Get the Right Treatment in Time?"
          finding="Stroke kills 35,000 people a year in England and is the leading cause of adult disability. Only 11% of ischaemic stroke patients receive clot-busting thrombolysis, and fewer than 4% get thrombectomy &mdash; despite evidence it transforms outcomes."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Stroke is the fourth leading cause of death in England and the single largest cause of adult disability, with around 100,000 strokes each year killing approximately 35,000 people and leaving twice as many with significant disability. For ischaemic stroke &mdash; 85% of cases &mdash; two treatments are transformative when delivered within hours: thrombolysis within 4.5 hours and thrombectomy within 24 hours. The evidence is unambiguous, yet England&rsquo;s thrombolysis rate sits at just 11%, unchanged for five years, and the thrombectomy rate is 3.8% &mdash; far below the estimated 10&ndash;12% of patients who could benefit. Stroke unit admission, which reduces mortality by approximately 20%, has also declined from 84% in 2016 to 78%, driven by bed pressures. Age-standardised stroke mortality fell from 47 per 100,000 in 2012 to 40 in 2023, but improvement has flattened, and 45% of stroke survivors do not receive the six-month review recommended by national guidelines.</p>
            <p>The bottleneck is infrastructure and geography. England has 24 thrombectomy-capable centres, but only a handful provide round-the-clock services &mdash; a patient having a stroke at 3am in rural Cornwall faces fundamentally different odds to one in central London. The NHS Long-Term Plan committed to increasing thrombectomy to 10% of stroke patients, and the NHS Stroke Improvement Programme has set targets, but progress has been slow and uneven. The Stroke Association estimates the annual economic cost to the NHS and social care at &pound;8.9 billion, a figure that will only fall with faster pre-hospital pathways and sustained investment in thrombectomy capacity.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-mortality', label: 'Mortality' },
          { id: 'sec-treatment', label: 'Treatment Rates' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Stroke mortality rate"
              value="40.2"
              unit="per 100K"
              direction="down"
              polarity="up-is-bad"
              changeText="2023 &middot; Down from 47 in 2012 &middot; Improvement flattening"
              sparklineData={[47.2, 45.8, 44.1, 43.5, 42.0, 40.8, 40.1, 39.4, 42.6, 41.3, 40.9, 40.2]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Thrombolysis rate"
              value="11"
              unit="%"
              direction="flat"
              polarity="up-is-good"
              changeText="2023 &middot; Stalled for 5 years &middot; Target: higher than 20%"
              sparklineData={[9.8, 10.4, 11.1, 11.5, 11.8, 11.7, 11.3, 11.1, 10.6, 10.2, 10.8, 11.0]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Thrombectomy rate"
              value="3.8"
              unit="%"
              direction="up"
              polarity="up-is-good"
              changeText="2023 &middot; Up from 1.2% in 2017 &middot; Target: 10% of ischaemic strokes"
              sparklineData={[1.2, 1.8, 2.4, 2.1, 2.9, 3.4, 3.8]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-mortality" className="mb-12">
            <LineChart
              title="Stroke mortality rate, England, 2012&ndash;2023"
              subtitle="Age-standardised mortality rate per 100,000 population. All cerebrovascular diseases."
              series={mortalitySeries}
              annotations={mortalityAnnotations}
              yLabel="Deaths per 100,000"
              source={{
                name: 'ONS',
                dataset: 'Death registrations, cerebrovascular diseases',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-treatment" className="mb-12">
            <LineChart
              title="Acute stroke treatment rates, England, 2012&ndash;2023"
              subtitle="% of ischaemic stroke patients receiving thrombolysis or thrombectomy."
              series={treatmentSeries}
              yLabel="Patients treated (%)"
              source={{
                name: 'SSNAP',
                dataset: 'Sentinel Stroke National Audit Programme',
                frequency: 'quarterly',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="CVD mortality down 75% since the 1960s"
            value="−75%"
            unit="cardiovascular deaths since 1969"
            description="The age-standardised cardiovascular disease mortality rate fell from approximately 1,045 per 100,000 in 1969 to around 255 per 100,000 today — a reduction of roughly 75%. Stroke deaths halved in England in the first decade of this century alone. This is the result of statins, antihypertensive medication, falling smoking rates, and decades of investment in emergency cardiac and stroke care working in combination. It is one of the largest improvements in any health outcome in British history, saving an estimated 150,000 lives per year compared to 1960s mortality rates."
            source="Source: British Heart Foundation Statistical Compendium; ONS Death Registrations; Cardiovascular Research (2022)."
          />
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>SSNAP &mdash; Sentinel Stroke National Audit Programme. Clinical audit covering 99% of acute stroke admissions in England, Wales, and Northern Ireland. Treatment rates, stroke unit admission, and care quality indicators. Published quarterly.</p>
            <p>ONS &mdash; Death registrations, cerebrovascular diseases. Age-standardised mortality rates per 100,000 population. ICD-10 codes I60&ndash;I69. Published annually.</p>
            <p>Stroke Association &mdash; State of the Nation reports. Rehabilitation access and post-stroke review data.</p>
            <p>Mortality rates are age-standardised to the 2013 European Standard Population. Thrombolysis rate measures the proportion of confirmed ischaemic stroke patients receiving alteplase. Thrombectomy rate measures the proportion receiving mechanical clot retrieval. Both figures cover England only.</p>
          </div>
        </section>
      </main>
    </>
  )
}
