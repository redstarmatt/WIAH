'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series, Annotation } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import RelatedTopics from '@/components/RelatedTopics';

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
            <p>An estimated 15.2 million adults in England have blood pressure above the clinical threshold of 140/90 mmHg, making hypertension the most common chronic condition after chronic pain. It causes no symptoms until it causes a heart attack, stroke, kidney failure, or vascular dementia — and is entirely treatable with medications costing less than £2 per month. Yet approximately 7.4 million people remain undiagnosed. Of the 7.8 million on GP registers, only 60% have their blood pressure controlled to the NICE target — down from 64% in 2016, with control rates dropping sharply during COVID when face-to-face reviews were paused. The NHS Health Check programme delivered 1.48 million cardiovascular risk assessments in 2024, still below the 1.61 million achieved before the pandemic, with uptake ranging from 30% to 75% across local authorities.</p>
            <p>The consequences are quantifiable and avoidable. The British Heart Foundation estimates high blood pressure contributes to approximately 75,000 deaths per year through strokes, heart attacks, and kidney disease; NICE modelling suggests matching the best-performing countries would prevent 14,000 cardiovascular events annually. The detection gap is deepest in the most deprived communities, where hypertension prevalence is highest but NHS Health Check uptake is lowest — a pattern that concentrates preventable cardiovascular harm among those least able to manage its consequences.</p>
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
              changeText="2024 · Nearly half of all cases · No symptoms until crisis"
              sparklineData={[5.7, 5.9, 6.0, 6.3, 7.1, 7.3, 7.4]}
              href="#sec-prevalence"/>
            <MetricCard
              label="BP controlled to target"
              value="60.4"
              unit="%"
              direction="down"
              polarity="up-is-good"
              changeText="2024 · Among diagnosed patients · Down from 64% in 2016"
              sparklineData={[62.3, 63.8, 64.1, 63.5, 58.2, 59.8, 60.4]}
              href="#sec-control"/>
            <MetricCard
              label="NHS Health Checks delivered"
              value="1.48"
              unit="million"
              direction="down"
              polarity="up-is-good"
              changeText="2024 · Still below 2018 level of 1.61M · Uptake varies 30–75% by area"
              sparklineData={[1482, 1546, 1562, 1603, 1612, 1580, 824, 1012, 1283, 1402, 1478]}
              href="#sec-checks"/>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-prevalence" className="mb-12">
            <LineChart
              title="Hypertension: estimated vs diagnosed, England, 2012–2024"
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
              title="Blood pressure control rate, England, 2012–2024"
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
              title="NHS Health Checks delivered, England, 2014–2024"
              subtitle="Annual cardiovascular risk assessments offered to adults aged 40–74, in thousands."
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
            <p>NHS Digital — Quality and Outcomes Framework (QOF). GP hypertension registers and blood pressure control indicators. Published annually.</p>
            <p>OHID — NHS Health Check programme data. Local authority returns on invitations and checks completed. Published annually.</p>
            <p>British Heart Foundation / NICE — Hypertension prevalence modelling based on Health Survey for England. Estimated total prevalence includes undiagnosed cases.</p>
            <p>The &ldquo;detection gap&rdquo; is calculated as estimated total prevalence minus GP QOF register count. Prevalence estimates rely on survey data and modelling; actual undiagnosed figures are uncertain. Blood pressure control target is 140/90 mmHg per NICE CG136 (or 150/90 for those aged 80+). NHS Health Check figures reflect completed checks, not invitations sent.</p>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  )
}
