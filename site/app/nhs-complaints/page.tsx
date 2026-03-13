'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series, Annotation } from '@/components/charts/LineChart'
import PositiveCallout from '@/components/PositiveCallout'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import RelatedTopics from '@/components/RelatedTopics'
import Cite from '@/components/Cite'
import References, { Reference } from '@/components/References'

const editorialRefs: Reference[] = [
  { num: 1, name: 'NHS Digital', dataset: 'Data on Written Complaints in the NHS 2023/24', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/data-on-written-complaints-in-the-nhs', date: '2024' },
  { num: 2, name: 'CQC', dataset: 'Complainant Survey 2023/24', url: 'https://www.cqc.org.uk/publications/surveys', date: '2024' },
  { num: 3, name: 'PHSO', dataset: 'Annual Report and Accounts 2023/24', url: 'https://www.ombudsman.org.uk/publications', date: '2024' },
  { num: 4, name: 'NHS England', dataset: 'Patient Safety Incident Response Framework (PSIRF)', url: 'https://www.england.nhs.uk/patient-safety/incident-response-framework/', date: '2023' },
]

// -- Types ------------------------------------------------------------------

interface ComplaintsDataPoint {
  year: number
  writtenComplaints: number
  satisfiedPct: number
  phsoReceived: number
  phsoCompleted: number
}

interface CategoryBreakdown {
  category: string
  pct: number
}

interface NhsComplaintsData {
  topic: string
  lastUpdated: string
  timeSeries: ComplaintsDataPoint[]
  categoryBreakdown2024: CategoryBreakdown[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function NhsComplaintsPage() {
  const [data, setData] = useState<NhsComplaintsData | null>(null)

  useEffect(() => {
    fetch('/data/nhs-complaints/nhs_complaints.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  /* Chart 1: Total complaints over time */
  const complaintsSeries: Series[] = data
    ? [
        {
          id: 'written-complaints',
          label: 'Written complaints',
          colour: '#F4A261',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.writtenComplaints })),
        },
      ]
    : []

  const complaintsAnnotations: Annotation[] = [
    { date: new Date(2020, 2, 1), label: 'COVID-19 pandemic' },
    { date: new Date(2023, 0, 1), label: 'PSIRF introduced' },
  ]

  /* Chart 3: PHSO received vs completed */
  const phsoSeries: Series[] = data
    ? [
        {
          id: 'phso-received',
          label: 'Cases received',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.phsoReceived })),
        },
        {
          id: 'phso-completed',
          label: 'Cases completed',
          colour: '#2A9D8F',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.phsoCompleted })),
        },
      ]
    : []

  const latestYear = data ? data.timeSeries[data.timeSeries.length - 1] : null
  const phsoBacklog = latestYear ? latestYear.phsoReceived - latestYear.phsoCompleted : 0
  const cumulativeBacklog = data
    ? data.timeSeries.reduce((acc, d) => acc + (d.phsoReceived - d.phsoCompleted), 0)
    : 0

  return (
    <>
      <TopicNav topic="NHS Complaints" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="NHS Complaints"
          question="What Happens When the NHS Gets It Wrong?"
          finding="Over 250,000 written complaints are made to NHS organisations each year &mdash; yet only 30% of complainants feel their concern was adequately addressed."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The NHS receives roughly 250,000 written complaints each year across hospitals, GP practices, dental services, and ambulance trusts. Clinical treatment accounts for 40% of all complaints, followed by communication and information failures (20%) and concerns about staff values and behaviours (15%). These figures have risen steadily over the past decade, reflecting both growing pressure on services and greater awareness of complaint mechanisms. Yet the volume almost certainly understates the true scale of dissatisfaction &mdash; NHS England itself acknowledges that formal complaints represent &ldquo;the tip of the iceberg,&rdquo; with many patients deterred by complex processes, fear of repercussions for ongoing care, or simply exhaustion. Average response times have worsened significantly: many trusts now take 40 or more working days to respond, well beyond the 25-working-day target. Only 30% of complainants in CQC surveys report feeling their concern was adequately addressed, a figure that has deteriorated year on year since 2015.</p>
            <p>When local resolution fails, patients can escalate to the Parliamentary and Health Service Ombudsman (PHSO), which currently faces a backlog of more than 5,000 cases. Average investigation times stretch to 12&ndash;18 months, and even then the PHSO upholds approximately 45% of the cases it fully investigates &mdash; suggesting that a substantial proportion of complaints dismissed at trust level had genuine merit. Maternity complaints have doubled in recent years, driven in part by the Ockenden and Kirkup reviews which exposed systematic failures at multiple trusts that went uncorrected for years. The introduction of the Patient Safety Incident Response Framework (PSIRF) in 2023, replacing the Serious Incident Framework, represents a deliberate cultural shift away from individual blame toward systems-level learning. Staff fear of blame culture has long deterred incident reporting &mdash; PSIRF aims to change that by requiring trusts to treat complaints and safety incidents as opportunities for systemic improvement rather than exercises in individual accountability.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-complaints-trend', label: 'Complaint Trends' },
          { id: 'sec-categories', label: 'Categories' },
          { id: 'sec-phso', label: 'PHSO Backlog' },
          { id: 'sec-positive', label: 'What\u2019s Improving' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        {/* Metric cards */}
        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Written complaints per year"
              value="251,480"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="+44% since 2014 · hospitals account for majority"
              sparklineData={[174872, 188270, 199540, 208735, 218210, 229458, 194630, 211840, 234510, 245320, 251480]}
              href="#sec-complaints-trend"
              source="NHS Digital · Data on Written Complaints in the NHS 2023/24"
            />
            <MetricCard
              label="Complainants satisfied with response"
              value="30"
              unit="%"
              direction="down"
              polarity="up-is-good"
              changeText="down from 38% in 2014 · CQC complainant survey"
              sparklineData={[38, 37, 36, 35, 34, 33, 34, 32, 31, 30, 30]}
              href="#sec-categories"
              source="CQC · Complainant Survey 2023/24"
            />
            <MetricCard
              label="PHSO backlog"
              value="5,200+"
              unit="cases"
              direction="up"
              polarity="up-is-bad"
              changeText="avg investigation time 12–18 months · 45% upheld"
              sparklineData={[284, 462, 484, 490, 630, 710, 630, 1030, 1160, 1260, 1460]}
              href="#sec-phso"
              source="PHSO · Annual Report and Accounts 2023/24"
            />
          </div>
        </ScrollReveal>

        {/* Chart 1: Complaints trend */}
        <ScrollReveal>
          <section id="sec-complaints-trend" className="mb-12">
            <LineChart
              title="NHS written complaints received, England, 2014–2024"
              subtitle="Total formal written complaints to all NHS organisations. The 2020 dip reflects reduced activity and complaint submission during COVID-19, not genuine improvement."
              series={complaintsSeries}
              annotations={complaintsAnnotations}
              yLabel="Complaints"
              source={{
                name: 'NHS Digital',
                dataset: 'Data on Written Complaints in the NHS',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        {/* Chart 2: Category breakdown (horizontal bars) */}
        <ScrollReveal>
          <section id="sec-categories" className="mb-12">
            <div className="bg-white rounded-lg border border-wiah-border p-8">
              <h2 className="text-lg font-bold text-wiah-black mb-1">
                Complaint categories, England, 2024
              </h2>
              <p className="text-sm text-wiah-mid font-mono mb-6">
                Clinical treatment dominates. Communication failures and staff behaviour together account for a further 35%.
              </p>
              {data && (
                <div className="space-y-5">
                  {data.categoryBreakdown2024.map((c) => (
                    <div key={c.category}>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-sm font-semibold text-wiah-black">{c.category}</span>
                        <span className="font-mono text-sm text-wiah-mid">{c.pct}%</span>
                      </div>
                      <div className="relative h-5 bg-wiah-light rounded overflow-hidden">
                        <div
                          className="absolute left-0 top-0 h-full rounded"
                          style={{ width: `${(c.pct / 45) * 100}%`, backgroundColor: '#F4A261' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <p className="font-mono text-[11px] text-wiah-mid mt-6">
                Source: NHS Digital &middot; Data on Written Complaints in the NHS 2023/24. Updated annually.
              </p>
            </div>
          </section>
        </ScrollReveal>

        {/* Chart 3: PHSO received vs completed */}
        <ScrollReveal>
          <section id="sec-phso" className="mb-12">
            <LineChart
              title="PHSO cases received vs completed, 2014–2024"
              subtitle="Cases received (red) consistently outpace cases completed (green), creating a growing backlog. The gap widened sharply post-pandemic."
              series={phsoSeries}
              yLabel="Cases"
              source={{
                name: 'PHSO',
                dataset: 'Annual Report and Accounts',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <div id="sec-positive">
            <PositiveCallout
              title="What's improving"
              value="15%"
              unit="more incidents reported"
              description="PSIRF, introduced in 2023, represents a genuine cultural shift from individual blame to systems learning. Trusts implementing it early report 15% more safety incidents being reported, suggesting staff feel safer speaking up."
              source="NHS England · Patient Safety Incident Response Framework: Early Adopter Report 2024"
            />
          </div>
        </ScrollReveal>

        {/* Sources */}
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>NHS Digital &mdash; Data on Written Complaints in the NHS. Published annually. digital.nhs.uk/data-and-information/publications/statistical/data-on-written-complaints-in-the-nhs</p>
            <p>Parliamentary and Health Service Ombudsman &mdash; Annual Report and Accounts. Published annually. ombudsman.org.uk/publications</p>
            <p>Care Quality Commission &mdash; Complainant Survey and Annual State of Care Report. cqc.org.uk/publications/surveys</p>
            <p>NHS England &mdash; Patient Safety Incident Response Framework (PSIRF). england.nhs.uk/patient-safety/incident-response-framework/</p>
            <p>Written complaints data covers all NHS organisations in England including acute trusts, mental health trusts, community providers, GP practices, dental services, and ambulance trusts. Satisfaction figures are drawn from CQC complainant surveys conducted annually. PHSO figures cover cases formally received and completed (fully or partly upheld, or not upheld) in each financial year. The 2020 dip reflects reduced NHS activity and complaint submissions during COVID-19 lockdown restrictions, not a genuine improvement in service quality. Complaint categorisation methodology changed slightly in 2019, with minor impact on year-on-year category comparisons.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  )
}
