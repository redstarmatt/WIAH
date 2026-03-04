'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series, Annotation } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface BloodPressureData {
  national: {
    hypertensionPrevalence: {
      timeSeries: Array<{ year: number; estimatedMillions: number; diagnosedMillions: number }>
    }
    controlRate: {
      timeSeries: Array<{ year: number; pct: number }>
    }
    healthChecksDelivered: {
      timeSeries: Array<{ year: number; thousands: number }>
    }
  }
}

function yearToDate(y: number): Date {
  return new Date(y, 5, 1)
}

// -- Page -------------------------------------------------------------------

export default function BloodPressurePage() {
  const [data, setData] = useState<BloodPressureData | null>(null)

  useEffect(() => {
    fetch('/data/blood-pressure/blood_pressure.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const prevalenceSeries: Series[] = data
    ? [
        {
          id: 'estimated',
          label: 'Estimated total (millions)',
          colour: '#E63946',
          data: data.national.hypertensionPrevalence.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.estimatedMillions,
          })),
        },
        {
          id: 'diagnosed',
          label: 'Diagnosed on GP registers (millions)',
          colour: '#264653',
          data: data.national.hypertensionPrevalence.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.diagnosedMillions,
          })),
        },
      ]
    : []

  const controlSeries: Series[] = data
    ? [{
        id: 'control',
        label: 'BP controlled to target (%)',
        colour: '#2A9D8F',
        data: data.national.controlRate.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.pct,
        })),
      }]
    : []

  const healthCheckSeries: Series[] = data
    ? [{
        id: 'health-checks',
        label: 'NHS Health Checks delivered (thousands)',
        colour: '#264653',
        data: data.national.healthChecksDelivered.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.thousands,
        })),
      }]
    : []

  const controlAnnotations: Annotation[] = [
    { date: yearToDate(2020), label: '2020: Face-to-face reviews paused' },
  ]

  const healthCheckAnnotations: Annotation[] = [
    { date: yearToDate(2020), label: '2020: Programme paused for COVID' },
  ]

  return (
    <>
      <TopicNav topic="Blood Pressure" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Blood Pressure"
          question="Why Do 7 Million People Not Know Their Blood Pressure Is High?"
          finding="An estimated 15 million people in England have high blood pressure, but only 7.8 million are diagnosed. Of those diagnosed, just 60% have their blood pressure controlled to target. Hypertension is the single largest preventable cause of death in the UK."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>High blood pressure &mdash; hypertension &mdash; is the single largest modifiable risk factor for cardiovascular disease, the leading cause of death worldwide. In England, an estimated 15.2 million adults have blood pressure above the clinical threshold (140/90 mmHg or above), making it the most common chronic condition after chronic pain. Hypertension causes no symptoms until it causes a heart attack, stroke, kidney failure, or vascular dementia. It is entirely treatable with cheap, well-tolerated medications. And yet approximately 7.4 million people &mdash; nearly half of those affected &mdash; are undiagnosed.</p>
            <p>The detection gap is not a mystery. Blood pressure can only be measured by taking a reading, and the opportunities for measurement have been shrinking. The NHS Health Check programme, which invites adults aged 40&ndash;74 for a cardiovascular risk assessment every five years, delivered 1.48 million checks in 2024 &mdash; still below the 1.61 million achieved in 2018. The programme was effectively suspended during COVID, and recovery has been uneven across local authorities. Uptake ranges from 30% to 75% depending on area, with the lowest rates in the most deprived communities where hypertension prevalence is highest.</p>
            <p>Even among the 7.8 million people on GP hypertension registers, control rates are disappointing. Only 60% have their blood pressure managed to the NICE target of 140/90 mmHg or below. That figure dropped sharply during COVID as face-to-face blood pressure reviews were paused and has not fully recovered. The Quality and Outcomes Framework incentivises GP practices to maintain hypertension registers and conduct annual reviews, but the payment thresholds are set low enough that practices can meet them while leaving a substantial proportion of patients sub-optimally controlled.</p>
            <p>The consequences of undetected and uncontrolled hypertension are not abstract. The British Heart Foundation estimates that high blood pressure contributes to approximately 75,000 deaths per year in the UK through strokes, heart attacks, heart failure, and kidney disease. Modelling by NICE suggests that improving detection and control to match the best-performing countries would prevent 14,000 heart attacks and strokes annually. The cost of antihypertensive medication is minimal &mdash; many first-line drugs cost less than &pound;2 per month. The return on investment from better blood pressure management is among the highest of any intervention in medicine.</p>
            <p>The challenge is systemic rather than clinical. General practice is under pressure, with declining appointment availability and rising patient-to-GP ratios. Community pharmacy blood pressure checking services, introduced as a pilot, have shown promise but are not yet at scale. Self-monitoring with home blood pressure devices is recommended by NICE but requires patient engagement and infrastructure for remote data capture. The fundamental problem is one of healthcare system capacity and design: hypertension management requires regular, proactive measurement of a condition that produces no symptoms, in a system designed around reactive care for people who present with problems. The gap between what we know works and what is actually happening is unusually wide.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-prevalence', label: 'Detection Gap' },
          { id: 'sec-control', label: 'Control Rate' },
          { id: 'sec-checks', label: 'NHS Health Checks' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Undiagnosed hypertension"
              value="7.4"
              unit="million"
              direction="up"
              polarity="up-is-bad"
              changeText="2024 &middot; Nearly half of all cases &middot; No symptoms until crisis"
              sparklineData={[5.7, 5.9, 6.0, 6.3, 7.1, 7.3, 7.4]}
              onExpand={() => {}}
            />
            <MetricCard
              label="BP controlled to target"
              value="60.4"
              unit="%"
              direction="down"
              polarity="up-is-good"
              changeText="2024 &middot; Among diagnosed patients &middot; Down from 64% in 2016"
              sparklineData={[62.3, 63.8, 64.1, 63.5, 58.2, 59.8, 60.4]}
              onExpand={() => {}}
            />
            <MetricCard
              label="NHS Health Checks delivered"
              value="1.48"
              unit="million"
              direction="down"
              polarity="up-is-good"
              changeText="2024 &middot; Still below 2018 level of 1.61M &middot; Uptake varies 30&ndash;75% by area"
              sparklineData={[1482, 1546, 1562, 1603, 1612, 1580, 824, 1012, 1283, 1402, 1478]}
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-prevalence" className="mb-12">
            <LineChart
              title="Hypertension: estimated vs diagnosed, England, 2012&ndash;2024"
              subtitle="Gap between total estimated prevalence and GP-registered diagnoses, in millions."
              series={prevalenceSeries}
              yLabel="Millions"
              source={{
                name: 'NICE / BHF / QOF',
                dataset: 'Hypertension prevalence estimates and GP registers',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-control" className="mb-12">
            <LineChart
              title="Blood pressure control rate, England, 2012&ndash;2024"
              subtitle="% of diagnosed hypertensive patients with BP at or below 140/90 mmHg at last review."
              series={controlSeries}
              annotations={controlAnnotations}
              yLabel="Controlled (%)"
              source={{
                name: 'NHS Digital / QOF',
                dataset: 'Quality and Outcomes Framework, hypertension indicators',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-checks" className="mb-12">
            <LineChart
              title="NHS Health Checks delivered, England, 2014&ndash;2024"
              subtitle="Annual cardiovascular risk assessments offered to adults aged 40&ndash;74, in thousands."
              series={healthCheckSeries}
              annotations={healthCheckAnnotations}
              yLabel="Checks (thousands)"
              source={{
                name: 'OHID',
                dataset: 'NHS Health Check programme data',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>NHS Digital &mdash; Quality and Outcomes Framework (QOF). GP hypertension registers and blood pressure control indicators. Published annually.</p>
            <p>OHID &mdash; NHS Health Check programme data. Local authority returns on invitations and checks completed. Published annually.</p>
            <p>British Heart Foundation / NICE &mdash; Hypertension prevalence modelling based on Health Survey for England. Estimated total prevalence includes undiagnosed cases.</p>
            <p>The &ldquo;detection gap&rdquo; is calculated as estimated total prevalence minus GP QOF register count. Prevalence estimates rely on survey data and modelling; actual undiagnosed figures are uncertain. Blood pressure control target is 140/90 mmHg per NICE CG136 (or 150/90 for those aged 80+). NHS Health Check figures reflect completed checks, not invitations sent.</p>
          </div>
        </section>
      </main>
    </>
  )
}
