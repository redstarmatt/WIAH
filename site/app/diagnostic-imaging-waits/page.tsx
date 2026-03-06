'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface DiagnosticImagingWaitsData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    waiting6wksPct: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function DiagnosticImagingWaitsPage() {
  const [data, setData] = useState<DiagnosticImagingWaitsData | null>(null)

  useEffect(() => {
    fetch('/data/diagnostic-imaging-waits/diagnostic_imaging_waits.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const waitingSeries: Series[] = data
    ? [
        {
          id: 'waiting6wks',
          label: 'Waiting >6 weeks (%)',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.waiting6wksPct,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Diagnostic Imaging Waits" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Diagnostic Imaging Waits"
          question="How Long Are People Waiting for Scans?"
          finding="1.6 million people waiting for diagnostic tests — MRI, CT and endoscopy backlogs mean cancers and conditions go undetected for months."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Before the pandemic, England's diagnostic services were already under pressure, with the proportion of patients waiting more than six weeks for a diagnostic test rising from under 1% in 2015 to 3.2% by 2019. COVID-19 drove that figure to 18.7% — roughly 590,000 people waiting for tests that might reveal cancer, cardiac disease, or gastrointestinal bleeding. Recovery has been real but incomplete: by 2024, the share waiting more than six weeks had fallen to 5.1% and the absolute number to around 380,000, still roughly six times pre-pandemic levels. The median wait for an MRI scan stands at around eight weeks against a 3.5-week constitutional standard. England has fewer MRI machines per capita than the European average, and the Community Diagnostic Centres programme — around 160 centres by 2024 — has added capacity but not eliminated the backlog. The Royal College of Radiologists warns that consultant radiologist numbers are insufficient to read the volume of scans being generated even where scanning capacity exists, with a seven-year post-graduation training pipeline limiting how quickly the workforce can expand.</p>
            <p>For cancer pathways, diagnostic delays translate directly into stage at diagnosis and, consequently, survival. The pandemic backlog has resulted in measurably more people being diagnosed at advanced stage, with corresponding impacts on treatment intensity and outcomes. Endoscopy capacity is particularly strained: bowel cancer screening programmes require large volumes of colonoscopies, and post-pandemic catch-up has added to a service already under pressure from symptomatic referrals. Endoscopy waits vary significantly by geography, with some areas performing close to standard and others running well above it. Getting the right diagnostic test quickly is one of the most powerful levers the NHS has for improving cancer outcomes; that lever remains insufficiently pulled.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Waiting Times' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Waiting >6 weeks (2024)"
              value="5.1%"
              unit=""
              direction={'down' as const}
              polarity={'up-is-bad' as const}
              changeText="improving but 4&times; pre-pandemic level"
              sparklineData={[0.9, 1.1, 1.4, 2.0, 3.2, 18.7, 12.4, 8.9, 6.8, 5.1]}
              href="#sec-chart"source="NHS England · Diagnostics Waiting Times Statistics"
            />
            <MetricCard
              label="Waiting 1m+ for test"
              value="380,000"
              unit=""
              direction={'down' as const}
              polarity={'up-is-bad' as const}
              changeText="down from 590k peak · still 6&times; 2019"
              sparklineData={[45000, 50000, 60000, 85000, 110000, 590000, 450000, 480000, 400000, 380000]}
              href="#sec-chart"source="NHS England · Diagnostics Waiting Times Statistics"
            />
            <MetricCard
              label="MRI wait (median)"
              value="8 weeks"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="vs 3.5 week standard"
              sparklineData={[3.2, 3.3, 3.5, 4.0, 4.5, 10.2, 9.8, 8.5, 8.2, 8.0]}
              href="#sec-chart"source="NHS England · Diagnostics Waiting Times Statistics"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Patients waiting more than 6 weeks for diagnostics, 2015–2024"
              subtitle="Percentage of diagnostic referrals waiting beyond the 6-week NHS constitutional standard. Covers MRI, CT, endoscopy, echocardiography and other key tests."
              series={waitingSeries}
              yLabel="% waiting >6 weeks"
              source={{
                name: 'NHS England',
                dataset: 'Diagnostics Waiting Times and Activity',
                frequency: 'monthly',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>NHS England — Diagnostics Waiting Times and Activity. Published monthly. england.nhs.uk/statistics/statistical-work-areas/diagnostics-waiting-times-and-activity/</p>
            <p>Royal College of Radiologists — Clinical Radiology Workforce Census. rcr.ac.uk/clinical-radiology/being-consultant/rcr-consultant-census/</p>
            <p>The six-week diagnostic standard applies to 15 key diagnostic tests as defined in the NHS Constitution. Figures represent the proportion of patients waiting beyond six weeks at month-end. Annual figures are derived by averaging monthly snapshots. The 380,000 absolute waiting figure is based on the most recent published month within the 2024 reporting period.</p>
          </div>
        </section>
      </main>
    </>
  )
}
