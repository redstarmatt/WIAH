'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

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
          finding="93 million antidepressant prescriptions in 2023 &mdash; more than one for every adult in England, with prescriptions more than doubling since 2010 and long-term use growing fastest."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England dispensed 92.6 million antidepressant prescriptions in 2023 &mdash; a figure that has more than doubled from 43.4 million in 2010. The growth is not simply explained by rising prevalence of depression; prescribing rates have outpaced any plausible increase in the underlying condition. Part of the explanation is expanded treatment access, a deliberate policy aim since the IAPT programme was launched in 2008. But a growing share reflects long-term, potentially indefinite prescribing: an estimated 1.8 million adults have been on antidepressants for five years or more.</p>
            <p>The clinical debate about long-term antidepressant use is unresolved and contested. For severe and recurrent depression, extended medication is clinically indicated and supported by evidence. But prescribing data suggest that many people remain on antidepressants for years after a single depressive episode, partly because of genuine risk of relapse if medication is stopped, and partly because of under-recognised discontinuation symptoms that patients and sometimes clinicians mistake for evidence that medication is still needed.</p>
            <p>There is a treatment gap running alongside the prescribing surge. An estimated 25% of adults experience a common mental health problem in any given year, but only around 17% access treatment. Antidepressants are being dispensed at scale, but psychological therapies &mdash; waiting list backlogs in IAPT remain significant &mdash; are not keeping pace. The result is a system that dispenses medication readily but struggles to offer the talking therapies that many patients would prefer and that have similar effectiveness for mild-to-moderate depression.</p>
            <p>The profile of antidepressant users has shifted. SSRIs prescribed for anxiety disorders now account for a large and growing share of prescriptions, reflecting broadening licensed and unlicensed indications. Young adults aged 18&ndash;25 have seen some of the fastest proportional increases, raising questions about whether the threshold for medication in this age group has fallen appropriately or whether structural factors &mdash; financial stress, housing insecurity, employment precarity &mdash; are being medicalised when they might better be addressed through other means.</p>
            <p>NHS England&rsquo;s medicines optimisation programme has flagged antidepressant deprescribing as a priority. Structured review of patients on long-term antidepressants, supported by digital tools and specialist pharmacist input, can safely reduce prescribing volumes. But this requires GP time and clinical bandwidth that is in short supply. The prescribing trajectory will not reverse without deliberate intervention; left to current incentives, the trend of decade-on-decade growth is likely to continue.</p>
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
              onExpand={() => {}}
              source="NHS Business Services Authority &middot; Prescription Cost Analysis"
            />
            <MetricCard
              label="Long-term users (5yr+)"
              value="1.8m"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="Chronic use growing &middot; withdrawal problems"
              sparklineData={[0.8, 1.0, 1.2, 1.4, 1.5, 1.6, 1.7, 1.7, 1.8]}
              onExpand={() => {}}
              source="NHS Business Services Authority &middot; 2023"
            />
            <MetricCard
              label="Adults receiving vs needing treatment"
              value="17% vs 25%"
              unit=""
              direction="flat"
              polarity="up-is-bad"
              changeText="Treatment gap remains despite high prescribing"
              sparklineData={[17, 17, 17, 17, 17, 17, 17]}
              onExpand={() => {}}
              source="NHS Digital &middot; IAPT / APMS 2023"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Antidepressant prescriptions dispensed in England, 2010&ndash;2023"
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
            <p>NHS Business Services Authority &mdash; Prescription Cost Analysis. Published annually. nhsbsa.nhs.uk/statistical-collections/prescription-cost-analysis</p>
            <p>NHS Digital &mdash; Improving Access to Psychological Therapies dataset. digital.nhs.uk/data-and-information/publications/statistical/psychological-therapies-annual-reports</p>
            <p>Prescription counts reflect items dispensed in primary care in England. Antidepressants are defined by BNF chapter 4.3. Long-term user estimates are derived from linked prescription records; individuals with 60+ months of continuous prescribing are classified as long-term users. Treatment gap figure is derived from the Adult Psychiatric Morbidity Survey and IAPT throughput data.</p>
          </div>
        </section>
      </main>
    </>
  )
}
