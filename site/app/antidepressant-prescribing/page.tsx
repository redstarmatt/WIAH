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

interface AntidepressantPrescribingData {
  timeSeries: Array<{ year: number; prescriptionsM: number }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function AntidepressantPrescribingPage() {
  const [data, setData] = useState<AntidepressantPrescribingData | null>(null)

  useEffect(() => {
    fetch('/data/antidepressant-prescribing/antidepressant_prescribing.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const prescriptionSeries: Series[] = data
    ? [{
        id: 'prescriptionsM',
        label: 'Antidepressant prescriptions (millions)',
        colour: '#264653',
        data: data.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.prescriptionsM,
        })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Antidepressant Prescribing" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Antidepressant Prescribing"
          question="How Many People Are Taking Antidepressants?"
          finding="93 million antidepressant prescriptions in 2023 — more than one for every adult in England, with prescriptions more than doubling since 2010 and long-term use growing fastest."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England dispensed 92.6 million antidepressant prescriptions in 2023 — more than doubled from 43.4 million in 2010. The growth is not simply explained by rising prevalence of depression; prescribing rates have outpaced any plausible increase in underlying conditions. Part reflects expanded access through the IAPT programme launched in 2008. But a growing and concerning share reflects long-term, potentially indefinite prescribing: an estimated 1.8 million adults have been on antidepressants for five or more years, partly due to genuine relapse risk and partly because discontinuation symptoms are frequently mistaken for evidence that medication is still needed. SSRIs prescribed for anxiety disorders now account for a large and growing share, and young adults aged 18–25 have seen some of the fastest proportional increases, raising questions about whether structural factors — financial stress, housing insecurity, precarious employment — are being medicalised.</p>
            <p>A treatment gap runs alongside the prescribing surge. Around 25% of adults experience a common mental health problem in any given year, but only 17% access any treatment — a gap maintained despite high prescribing volumes. Antidepressants are dispensed readily, but psychological therapies with similar effectiveness for mild-to-moderate depression are rationed by IAPT waiting lists. NHS England's medicines optimisation programme has flagged antidepressant deprescribing as a priority, and structured review supported by pharmacist input can safely reduce volumes — but requires GP time that is in short supply. The prescribing trajectory will not reverse without deliberate intervention.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Prescribing Trend' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Prescriptions 2023"
              value="92.6m"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="More than doubled since 2010"
              sparklineData={[43.4, 50.2, 57.1, 64.7, 67.5, 70.9, 74.0, 78.6, 83.4, 89.7, 92.6]}
              href="#sec-chart"source="NHS Business Services Authority · Prescription Cost Analysis"
            />
            <MetricCard
              label="Long-term users (5yr+)"
              value="1.8m"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Chronic use growing · withdrawal problems"
              sparklineData={[0.8, 1.0, 1.2, 1.4, 1.5, 1.6, 1.7, 1.7, 1.8]}
              href="#sec-chart"source="NHS Business Services Authority · 2023"
            />
            <MetricCard
              label="Adults receiving vs needing treatment"
              value="17% vs 25%"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="Treatment gap remains despite high prescribing"
              sparklineData={[17, 17, 17, 17, 17, 17, 17]}
              href="#sec-chart"source="NHS Digital · IAPT / APMS 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Antidepressant prescriptions dispensed in England, 2010–2023"
              subtitle="Total items dispensed in the community. Does not include hospital prescriptions."
              series={prescriptionSeries}
              yLabel="Prescriptions (millions)"
              source={{
                name: 'NHS Business Services Authority',
                dataset: 'Prescription Cost Analysis',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>NHS Business Services Authority — Prescription Cost Analysis. Published annually. nhsbsa.nhs.uk/statistical-collections/prescription-cost-analysis</p>
            <p>NHS Digital — Improving Access to Psychological Therapies dataset. digital.nhs.uk/data-and-information/publications/statistical/psychological-therapies-annual-reports</p>
            <p>Prescription counts reflect items dispensed in primary care in England. Antidepressants are defined by BNF chapter 4.3. Long-term user estimates are derived from linked prescription records; individuals with 60+ months of continuous prescribing are classified as long-term users. Treatment gap figure is derived from the Adult Psychiatric Morbidity Survey and IAPT throughput data.</p>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  )
}
