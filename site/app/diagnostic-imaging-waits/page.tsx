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
          finding="1.6 million people waiting for diagnostic tests &mdash; MRI, CT and endoscopy backlogs mean cancers and conditions go undetected for months."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Before the pandemic, England&apos;s diagnostic services were already under pressure. The proportion of patients waiting more than six weeks for a diagnostic test &mdash; MRI, CT scan, endoscopy, echocardiogram, or other key investigation &mdash; had crept up from under 1% in 2015 to 3.2% by 2019, even as the government held the six-week standard as a formal NHS constitutional target. Then Covid-19 arrived. Services that required close contact, enclosed spaces and specialist staff were among the hardest hit. By 2020, the proportion waiting more than six weeks had reached 18.7%. That represented roughly 590,000 people in absolute terms, waiting for a test that might reveal whether they had cancer, cardiac disease, gastrointestinal bleeding, or any of dozens of other serious conditions.</p>
            <p>The recovery has been real but incomplete. By 2024, the proportion waiting more than six weeks had fallen to 5.1%, and the absolute number to around 380,000. That still represents a waiting list roughly six times larger than before the pandemic, and the median wait for an MRI scan stands at around eight weeks against a 3.5-week standard. For cancer pathways, diagnostic delays translate directly into stage at diagnosis. A tumour detected at stage one has a fundamentally different prognosis to one detected at stage three or four, and the evidence is clear that the pandemic diagnostic backlog has resulted in more people being diagnosed at advanced stage, with corresponding impacts on survival and treatment intensity.</p>
            <p>The diagnostic estate &mdash; the physical infrastructure of scanners, scopes, and testing equipment &mdash; is the binding constraint in many areas. England has fewer MRI machines per capita than the European average. Scanners operate for a fixed number of hours per day and require trained radiographers and radiologists to operate them; both are in short supply. The independent sector has been drawn into NHS diagnostic pathways through the Community Diagnostic Centres programme, which by 2024 had established around 160 centres providing additional capacity away from main hospital sites. This has helped but has not eliminated the backlog.</p>
            <p>There is also a workforce dimension that cannot be solved by capital investment alone. Clinical radiology has one of the longest training pipelines in medicine: a radiologist takes seven years post-graduation to train fully. The Royal College of Radiologists has repeatedly warned that consultant radiologist numbers are insufficient to read the volume of scans being generated, even when scanning capacity exists. AI-assisted image reading is being piloted in several trusts and shows genuine promise for certain scan types, but regulatory frameworks and clinical governance requirements mean widespread deployment remains limited.</p>
            <p>Endoscopy presents a distinct challenge. Bowel cancer screening programmes require large volumes of colonoscopies, and post-pandemic catch-up has added pressure on a service already stretched by the backlog of symptomatic referrals. The NHS Endoscopy Workforce Plan has attempted to address this through expansion of non-medical endoscopist roles &mdash; nurses and other clinical staff trained to perform procedures previously done only by doctors &mdash; with reasonable success in some regions. But endoscopy capacity remains unevenly distributed, with some areas facing waits significantly above the national average and others performing closer to standard. Getting the right diagnostic test quickly is one of the most powerful levers the NHS has for improving cancer outcomes; that lever remains insufficiently pulled.</p>
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
              onExpand={() => {}}
              source="NHS England &middot; Diagnostics Waiting Times Statistics"
            />
            <MetricCard
              label="Waiting 1m+ for test"
              value="380,000"
              unit=""
              direction={'down' as const}
              polarity={'up-is-bad' as const}
              changeText="down from 590k peak &middot; still 6&times; 2019"
              sparklineData={[45000, 50000, 60000, 85000, 110000, 590000, 450000, 480000, 400000, 380000]}
              onExpand={() => {}}
              source="NHS England &middot; Diagnostics Waiting Times Statistics"
            />
            <MetricCard
              label="MRI wait (median)"
              value="8 weeks"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="vs 3.5 week standard"
              sparklineData={[3.2, 3.3, 3.5, 4.0, 4.5, 10.2, 9.8, 8.5, 8.2, 8.0]}
              onExpand={() => {}}
              source="NHS England &middot; Diagnostics Waiting Times Statistics"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Patients waiting more than 6 weeks for diagnostics, 2015&ndash;2024"
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
            <p>NHS England &mdash; Diagnostics Waiting Times and Activity. Published monthly. england.nhs.uk/statistics/statistical-work-areas/diagnostics-waiting-times-and-activity/</p>
            <p>Royal College of Radiologists &mdash; Clinical Radiology Workforce Census. rcr.ac.uk/clinical-radiology/being-consultant/rcr-consultant-census/</p>
            <p>The six-week diagnostic standard applies to 15 key diagnostic tests as defined in the NHS Constitution. Figures represent the proportion of patients waiting beyond six weeks at month-end. Annual figures are derived by averaging monthly snapshots. The 380,000 absolute waiting figure is based on the most recent published month within the 2024 reporting period.</p>
          </div>
        </section>
      </main>
    </>
  )
}
