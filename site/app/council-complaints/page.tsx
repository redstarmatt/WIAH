'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import RelatedTopics from '@/components/RelatedTopics';

// -- Types ------------------------------------------------------------------

interface CouncilRow {
  year: number
  lgscoComplaints?: number
  upheldPct?: number
  fundingPerPersonReal?: number
  section114Events?: number
}

interface CouncilComplaintsData {
  topic: string
  lastUpdated: string
  timeSeries: CouncilRow[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function CouncilComplaintsPage() {
  const [data, setData] = useState<CouncilComplaintsData | null>(null)

  useEffect(() => {
    fetch('/data/council-complaints/council_complaints.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const complaintsSeries: Series[] = data
    ? [
        {
          id: 'lgscoComplaints',
          label: 'LGSCO complaints received',
          colour: '#F4A261',
          data: data.timeSeries
            .filter(d => d.lgscoComplaints !== undefined)
            .map(d => ({
              date: yearToDate(d.year),
              value: d.lgscoComplaints!,
            })),
        },
      ]
    : []

  const fundingSeries: Series[] = data
    ? [
        {
          id: 'fundingPerPerson',
          label: 'Funding per person (2024 prices, £)',
          colour: '#E63946',
          data: data.timeSeries
            .filter(d => d.fundingPerPersonReal !== undefined)
            .map(d => ({
              date: yearToDate(d.year),
              value: d.fundingPerPersonReal!,
            })),
        },
      ]
    : []

  const section114Series: Series[] = data
    ? [
        {
          id: 'section114',
          label: 'Cumulative Section 114 notices & near-misses',
          colour: '#E63946',
          data: data.timeSeries
            .filter(d => d.section114Events !== undefined)
            .map(d => ({
              date: yearToDate(d.year),
              value: d.section114Events!,
            })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Local Government Services" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Local Government Services"
          question="Does Your Council Actually Work?"
          finding="Ombudsman complaints have risen 30% since 2019. Two-thirds of investigated complaints are now upheld — and seven councils have effectively declared bankruptcy since 2020."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Complaints to the Local Government and Social Care Ombudsman have surged 30% since 2019, reaching nearly 28,000 in 2024 — and the proportion the Ombudsman upholds has climbed to 67%, a sustained rise from 52% a decade ago. The most common complaint categories are housing (especially repairs and disrepair, where councils and housing associations face maintenance backlogs running into billions), planning (average decision time now 16 weeks against an 8-week target), adult social care, and education and SEND provision. Average council complaint response times have stretched to 28 working days, well beyond the 10–20 day target most authorities set themselves. Behind the numbers sits a structural funding crisis: central government funding per person fell 40% in real terms between 2010 and 2024, while demand-led services — adult social care, children's services, homelessness support — have grown relentlessly. Council tax rose 5% in 2024/25, the tenth consecutive above-inflation increase, yet the additional revenue has not kept pace with spending pressures.</p>
            <p>The financial distress is no longer abstract. Seven councils have issued Section 114 notices — the effective declaration of bankruptcy — since 2020: Birmingham, Nottingham, Woking, Thurrock, Slough, and Croydon (three times), with near-misses at several others including Bradford, Somerset, and Havering. Frontline services have visibly deteriorated: missed bin complaints are up 20%, over two million potholes are reported annually, and more than 800 council leisure centres have closed or been transferred to the private sector since 2010. Parks maintenance budgets have been cut by a third in real terms. Yet there are pockets of progress: digital service transformation in early-adopter councils has reduced call centre volumes by 25% through online planning portals, automated bin collection alerts, and AI-assisted housing triage. The question is whether these innovations can scale fast enough to offset the structural gap between what councils are expected to deliver and what they are funded to provide.</p>
          </div>
        </section>

        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-12 max-w-2xl">
          <p className="text-sm font-semibold text-emerald-800 mb-1">Positive development</p>
          <p className="text-sm text-emerald-900">Digital service transformation has improved some council services. Online planning portals, automated bin collection alerts, and AI-assisted housing triage have reduced call centre volumes by 25% in early-adopter councils.</p>
        </div>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-complaints-chart', label: 'Complaints Trend' },
          { id: 'sec-funding-chart', label: 'Funding' },
          { id: 'sec-s114-chart', label: 'Section 114' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Ombudsman complaints 2024"
              value="27,950"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="+30% since 2019 · housing & planning lead"
              sparklineData={[18870, 19210, 19850, 20340, 20910, 21500, 17200, 22650, 25100, 27400, 27950]}
              href="#sec-complaints-chart"source="LGSCO · Annual Review 2023/24"
            />
            <MetricCard
              label="Complaint upheld rate"
              value="67%"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="was 52% in 2014 · rising steadily"
              sparklineData={[52, 53, 54, 56, 58, 59, 61, 62, 64, 66, 67]}
              href="#sec-complaints-chart"source="LGSCO · Annual Review 2023/24"
            />
            <MetricCard
              label="Councils in financial distress"
              value="7"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Section 114 notices since 2020 · several near-misses"
              sparklineData={[0, 0, 1, 2, 3, 5, 7]}
              href="#sec-s114-chart"source="DLUHC · CIPFA Financial Resilience Index"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-complaints-chart" className="mb-12">
            <LineChart
              title="LGSCO complaints received, 2014–2024"
              subtitle="Complaints and enquiries received by the Local Government and Social Care Ombudsman, England. 2020 dip reflects COVID service suspension."
              series={complaintsSeries}
              yLabel="Complaints"
              source={{
                name: 'Local Government and Social Care Ombudsman',
                dataset: 'Annual Review of Complaints',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-funding-chart" className="mb-12">
            <LineChart
              title="Council funding per person in real terms, 2014–2024"
              subtitle="Central government funding per person, England, adjusted to 2024 prices using GDP deflator. Core spending power basis."
              series={fundingSeries}
              yLabel="£ per person (2024 prices)"
              source={{
                name: 'DLUHC',
                dataset: 'Local Authority Revenue Expenditure and Financing',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-s114-chart" className="mb-12">
            <LineChart
              title="Section 114 notices and near-misses, 2018–2024"
              subtitle="Cumulative count of councils issuing Section 114 notices (effective bankruptcy) or formal warnings of financial distress. England."
              series={section114Series}
              yLabel="Cumulative notices"
              source={{
                name: 'DLUHC / CIPFA',
                dataset: 'Financial Resilience Index & council reports',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Local Government and Social Care Ombudsman — Annual Review of Complaints. Complaints received, investigated, and upheld by category. lgo.org.uk/information-centre/reports/annual-review-reports</p>
            <p>DLUHC — Local Authority Revenue Expenditure and Financing. Core spending power and settlement funding data by local authority. gov.uk/government/collections/local-authority-revenue-expenditure-and-financing</p>
            <p>CIPFA — Financial Resilience Index. Indicators of council financial stress including reserves, debt, and spending pressures. cipfa.org/services/financial-resilience-index</p>
            <p>Section 114 notices tracked from council published reports and DLUHC announcements. Near-misses are defined as councils issuing formal warnings of financial distress or requesting exceptional financial support — this classification involves editorial judgment.</p>
            <p>Funding per person figures are adjusted to 2024 prices using the HM Treasury GDP deflator. COVID-19 temporarily suppressed LGSCO complaints in 2020 due to the Ombudsman suspending casework from March to June 2020.</p>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  )
}
