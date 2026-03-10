'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import RelatedTopics from '@/components/RelatedTopics';

interface PrivateSchoolDataPoint {
  year: number
  taxReliefM: number
  perPupilGap: number
}

interface PrivateSchoolData {
  topic: string
  lastUpdated: string
  timeSeries: PrivateSchoolDataPoint[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

export default function PrivateSchoolCharityStatusPage() {
  const [data, setData] = useState<PrivateSchoolData | null>(null)

  useEffect(() => {
    fetch('/data/private-school-charity-status/private_school_charity_status.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [
        {
          id: 'tax-relief',
          label: 'Charitable tax relief (£m)',
          colour: '#6B7280',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.taxReliefM })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Education" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Education"
          question="What Have Private Schools' Tax Exemptions Cost the Public?"
          finding="Independent schools claimed £522 million in charitable tax relief annually while educating 7% of pupils — relief removed alongside VAT on fees in January 2025."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Independent schools in England have operated under charitable status, entitling them to significant tax advantages including 80% mandatory relief on business rates, Gift Aid on donations, and exemption from corporation tax on surpluses, with an estimated annual value of approximately £522 million per year. The VAT exemption on school fees — a long-standing anomaly in UK tax law — was removed from January 2025, with the government applying the standard 20% VAT rate. The measure was Labour's flagship education policy in the 2024 general election, projected to raise approximately £1.6 billion per year for reinvestment in state school provision including teacher recruitment and SEND support. Initial data from early 2025 showed smaller pupil number reductions than independent school associations had predicted.</p>
            <p>Despite educating 7% of pupils, independent school alumni disproportionately occupy positions of power: 65% of senior judges, 55% of senior civil servants, 52% of Foreign Office ambassadors, and 44% of newspaper columnists attended independent schools. State school funding stood at approximately £7,700 per pupil in 2024, compared to an average independent school fee of £18,000 per year for day schools. The spending difference is visible in class sizes, facilities, extracurricular provision, and teacher staffing — advantages that are not replicated in state schools and that compound the inequality of outcome that selective private education perpetuates.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Chart' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Annual charitable tax relief value"
              value="£522m"
              direction={'down' as const}
              polarity={'up-is-bad' as const}
              changeText="£522m/yr · removed with Jan 2025 VAT change"
              sparklineData={[450, 460, 470, 480, 490, 500, 510, 515, 522]}
              source="Independent Schools Council / Charity Commission 2024"
              href="#sec-chart"/>
            <MetricCard
              label="Independent school pupils"
              value="7%"
              direction={'flat' as const}
              polarity={'up-is-bad' as const}
              changeText="7% of all pupils · fee-paying"
              sparklineData={[6.9, 6.9, 7.0, 7.0, 7.0, 6.8, 6.9, 7.0, 7.0]}
              source="ISC Annual Census 2024"
              href="#sec-chart"/>
            <MetricCard
              label="State vs private per-pupil gap"
              value="£10,300"
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="£18k private avg vs £7.7k state per pupil"
              sparklineData={[7500, 7800, 8000, 8200, 8500, 8700, 9000, 9500, 10300]}
              source="DfE / ISC Funding Analysis 2024"
              href="#sec-chart"/>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Value of independent school charitable tax reliefs, 2016–2024"
              subtitle="Estimated annual value of charitable status tax advantages to independent schools in England (£ millions)."
              series={series}
              yLabel="Tax relief value (£ millions)"
              source={{ name: 'Charity Commission', dataset: 'Independent School Charitable Relief Analysis', frequency: 'annual' }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p><strong className="text-wiah-black">Charity Commission</strong> — Annual reports and charitable accounts for independent school charities. Business rates relief calculated from MHCLG data.</p>
            <p><strong className="text-wiah-black">Independent Schools Council</strong> — ISC Annual Census 2024. Pupil numbers, fee levels, and staffing data for ISC member schools.</p>
            <p><strong className="text-wiah-black">DfE</strong> — Schools, pupils and their characteristics. State school per-pupil funding from the national funding formula allocations.</p>
            <p>Note: VAT on independent school fees was introduced from January 2025 — data reflects the pre-VAT position for the 2024 financial year.</p>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  )
}
