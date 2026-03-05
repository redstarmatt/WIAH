'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

interface PublicSectorPayGapData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    publicPrivatePayGapPct: number
    strikesDaysM: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

export default function PublicSectorPayGapPage() {
  const [data, setData] = useState<PublicSectorPayGapData | null>(null)

  useEffect(() => {
    fetch('/data/public-sector-pay-gap/public_sector_pay_gap.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [
        {
          id: 'paygap',
          label: 'Public vs private pay differential (%)',
          colour: '#F4A261',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.publicPrivatePayGapPct })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Public Sector Pay Gap" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Public Sector Pay Gap"
          question="Are Public Servants Being Paid Fairly?"
          finding="Public sector pay fell 3.2% below private sector in 2022 in real terms — the widest gap since 2010 — though recent settlements have partially closed the shortfall."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>From 2010, a combination of pay freezes and caps limiting rises to 1% (2012&ndash;2017) then 2%, plus stronger private sector growth, eroded public sector wages relative to private equivalents. By 2022, ONS ASHE data showed public sector pay stood 3.2% below equivalent private sector pay in real terms &mdash; the largest gap since comparable data begins. Teachers&apos; starting salaries fell approximately 12% in real terms between 2010 and 2022; NHS clinical staff faced similar erosion. Strike days lost in 2022&ndash;23 reached approximately 4.2 million &mdash; the highest level since the 1980s &mdash; involving nurses, paramedics, teachers, junior doctors, and civil servants. The 2023 pay review body settlements, accepted in full for the first time in years at an estimated cost of &pound;6 billion, partially closed the gap; by 2024 the public&ndash;private differential had narrowed to around &minus;0.8%.</p>
            <p>The gap is widest at junior and mid-career levels &mdash; precisely where recruitment competition with the private sector is most intense. NHS workforce plans requiring significant expansion in staffing cannot be delivered if pay remains materially below private equivalents for the same qualifications. The public-private pay gap is not uniform across the nations: Scotland and Wales have partially diverged through devolved pay decisions, while London weighting means the gap is narrowest in the capital and widest in parts of the North and Midlands where private sector wages are lower.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Pay Differential' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Public vs private pay gap"
              value="-0.8%"
              unit=""
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="Narrowed from -3.2% in 2022 · still negative"
              sparklineData={[0.5, 0.2, -0.3, -0.8, -1.2, -2.0, -3.2, -1.8, -0.8]}
              href="#sec-chart"source="ONS · Annual Survey of Hours and Earnings 2024"
            />
            <MetricCard
              label="Teacher real pay change since 2010"
              value="-4.1%"
              unit=""
              direction={'up' as const}
              polarity={'up-is-good' as const}
              changeText="Improving from -12% low · still below 2010"
              sparklineData={[-2, -4, -6, -8, -10, -11, -12, -8, -4.1]}
              href="#sec-chart"source="IFS / DfE · School Workforce Census 2024"
            />
            <MetricCard
              label="Strike days lost 2022-23"
              value="4.2m"
              unit=""
              direction={'down' as const}
              polarity={'up-is-bad' as const}
              changeText="Down sharply after 2023 settlements"
              sparklineData={[0.1, 0.1, 0.1, 0.1, 0.2, 0.1, 0.3, 4.2, 0.4]}
              href="#sec-chart"source="ONS · Labour Disputes Statistics 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Public vs private sector pay differential, 2016–2024"
              subtitle="Public sector pay as percentage above/below equivalent private sector pay."
              series={series}
              yLabel="Pay differential (%)"
              source={{
                name: 'ONS',
                dataset: 'Annual Survey of Hours and Earnings',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>ONS — Annual Survey of Hours and Earnings (ASHE) 2024. Published annually. ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/bulletins/annualsurveyofhoursandearnings</p>
            <p>IFS / DfE — School Workforce Census 2024. Published annually. gov.uk/government/collections/statistics-school-workforce</p>
            <p>ONS — Labour Disputes Statistics 2024. ons.gov.uk/employmentandlabourmarket/peopleinwork/workplacedisputesandworkingconditions/datasets/labourdisputesbysectorandcause</p>
            <p>Public-private pay differential is estimated using regression analysis controlling for occupation, qualification level, experience, and region. Positive values indicate public sector premium; negative values indicate public sector discount. Teacher pay change uses ASHE median weekly earnings for primary and secondary teachers deflated by CPI. Strike days are working days lost to labour disputes, annual total.</p>
          </div>
        </section>
      </main>
    </>
  )
}
