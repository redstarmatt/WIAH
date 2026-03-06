'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import PositiveCallout from '@/components/PositiveCallout'

// -- Types ------------------------------------------------------------------

interface ScreeningDataPoint {
  year: number
  cervical: number
  breast: number
  bowel: number
}

interface CancerScreeningUptakeData {
  topic: string
  lastUpdated: string
  timeSeries: ScreeningDataPoint[]
  targets: { cervical: number; breast: number; bowel: number }
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function CancerScreeningUptakePage() {
  const [data, setData] = useState<CancerScreeningUptakeData | null>(null)

  useEffect(() => {
    fetch('/data/cancer-screening-uptake/cancer_screening_uptake.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const allSeries: Series[] = data
    ? [
        {
          id: 'cervical',
          label: 'Cervical screening (%)',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.cervical })),
        },
        {
          id: 'breast',
          label: 'Breast screening (%)',
          colour: '#0D1117',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.breast })),
        },
        {
          id: 'bowel',
          label: 'Bowel screening (%)',
          colour: '#2A9D8F',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.bowel })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Cancer Screening Uptake" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Cancer Screening Uptake"
          question="Are You Getting Screened for Cancer?"
          finding="Cervical, breast and bowel screening uptake has fallen below the levels needed for effective cancer prevention."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England runs three national cancer screening programmes — cervical, breast, and bowel — but none is meeting its uptake target. Cervical screening coverage fell from 74.2% in 2015 to 68.5% in 2023, with a sharp pandemic dip that has not fully recovered; the 80% population-level effectiveness threshold has not been met for over a decade. Breast screening stands at 74.4% against an 80% target; the 2018 disclosure that around 450,000 women were not invited for screening between 2009 and 2018 (with PHE estimating 135–270 may have died earlier as a result) damaged trust in the programme. Bowel screening, improved by home-testing kits, has risen from 58.4% to 66.4% since 2015 but remains below its 75% target. NHS England estimates improving bowel uptake to 75% would prevent approximately 2,500 cancer deaths per year; achieving 80% cervical coverage is associated with a further one-third reduction in cervical cancer incidence.</p>
            <p>Access gaps are systematic and persistent. Women from deprived areas are consistently less likely to attend all three programmes; Black and Asian women are significantly underrepresented relative to their population share, reflecting language barriers, cultural factors, practical obstacles, and historical distrust of health services. Young women aged 25–34 are the least likely group to attend cervical screening — the age at which early detection has the greatest potential impact. Targeted outreach and community partnerships have shown results in pilots but have not been deployed at national scale, meaning preventable deaths continue to accumulate along predictable socioeconomic and ethnic lines.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-positive', label: 'Positive' },
          { id: 'sec-chart', label: 'Uptake Trends' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Cervical screening uptake"
              value="68.5%"
              unit=""
              direction="down"
              polarity="up-is-good"
              changeText="target 80% · peak 74.2% in 2015"
              sparklineData={[74.2, 73.1, 72.0, 71.4, 70.1, 65.0, 68.3, 68.5]}
              href="#sec-positive"source="NHS England · Cervical Screening Programme 2023"
            />
            <MetricCard
              label="Breast screening uptake"
              value="74.4%"
              unit=""
              direction="flat"
              polarity="up-is-good"
              changeText="target 80% · missed since 2008"
              sparklineData={[76.8, 75.9, 75.4, 74.9, 74.2, 65.0, 70.1, 74.4]}
              href="#sec-chart"source="NHS England · Breast Screening Programme 2023"
            />
            <MetricCard
              label="Bowel screening uptake"
              value="66.4%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="target 75% · improved from 58.4% in 2015"
              sparklineData={[58.4, 58.9, 59.4, 60.4, 61.2, 55.0, 60.1, 66.4]}
              href="#sec-chart"source="NHS England · Bowel Cancer Screening Programme 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div id="sec-positive" className="mb-12">
            <PositiveCallout
              title="Bowel Screening Expanding"
              value="66.4%"
              unit="uptake"
              description="Bowel screening uptake has risen by 8 percentage points since 2015 thanks to home testing kits, and the age range has been extended to 50. This is the one screening programme moving in the right direction."
              source="NHS England, Bowel Cancer Screening Programme, 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Cancer screening uptake, England, 2015–2023"
              subtitle="Percentage of eligible population completing screening. Targets: cervical 80%, breast 80%, bowel 75%."
              series={allSeries}
              yLabel="Uptake (%)"
              source={{
                name: 'NHS England',
                dataset: 'Cancer Screening Programmes',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>NHS England — Cervical Screening Programme Statistics. Published annually. digital.nhs.uk/data-and-information/publications/statistical/cervical-screening-programme</p>
            <p>NHS England — Breast Screening Programme Statistics. Published annually. digital.nhs.uk/data-and-information/publications/statistical/breast-screening-programme</p>
            <p>NHS England — Bowel Cancer Screening Programme. Published annually. digital.nhs.uk/data-and-information/publications/statistical/bowel-cancer-screening-programme</p>
            <p>Uptake figures represent the percentage of eligible individuals who completed screening within the programme recall period. COVID-19 disruption in 2020 resulted in significantly reduced activity across all three programmes. Figures have been rounded to one decimal place.</p>
          </div>
        </section>
      </main>
    </>
  )
}
