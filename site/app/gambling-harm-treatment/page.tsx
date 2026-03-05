'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart from '@/components/charts/LineChart'
import type { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import PositiveCallout from '@/components/PositiveCallout'

// -- Types ------------------------------------------------------------------

interface TimeSeriesRow {
  year: number
  nhsClinics: number
  treatmentCapacity: number
  problemGamblers: number
}

interface GamblingHarmTreatmentData {
  timeSeries: TimeSeriesRow[]
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function GamblingHarmTreatmentPage() {
  const [data, setData] = useState<GamblingHarmTreatmentData | null>(null)

  useEffect(() => {
    fetch('/data/gambling-harm-treatment/gambling_harm_treatment.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const clinicSeries: Series[] = data
    ? [
        {
          id: 'nhsclinics',
          label: 'NHS gambling clinics',
          colour: '#F4A261',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.year), value: d.nhsClinics })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Gambling Harm Treatment" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Gambling Harm Treatment"
          question="Can People Get Help for Problem Gambling?"
          finding="Problem gambling affects around 300,000 people but NHS treatment capacity remains severely limited, with waits of up to 8 weeks."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Gambling disorder is classified by the WHO as a recognised mental health condition. In England, approximately 290,000 to 340,000 people meet criteria for problem gambling, with a further estimated 1.5 million at moderate risk. The harms extend beyond the individual gambler: debt, family breakdown, domestic abuse, mental ill-health, and suicide are all significantly elevated among problem gamblers. The Gambling Commission estimates that gambling-related harms cost the UK economy approximately £1.4 billion per year in health, social care, and criminal justice costs.</p>
            <p>Until 2019, NHS specialist treatment for gambling disorder was essentially non-existent. The National Problem Gambling Clinic in London was the sole NHS provider. Two years later, a network of specialist NHS gambling clinics began to emerge, funded initially from voluntary contributions by gambling operators and subsequently from a mandatory statutory levy. By 2024, 15 specialist clinics operate across England, with a combined treatment capacity of approximately 6,200 people per year &mdash; a 7.5-fold expansion in five years.</p>
            <p>The expansion is remarkable for its speed. In 2019, fewer than 1,000 people a year received NHS treatment for gambling disorder; by 2024, this had grown to 6,200. But the gap between capacity and need remains vast. At current capacity, the NHS can treat approximately 2.1% of those with problem gambling disorders &mdash; fewer than one in 48. Waiting times at many clinics extend to six to eight weeks, and in some areas access requires travel of significant distances.</p>
            <p>The Gambling Act 2005 was widely criticised for creating a deregulatory environment that allowed the online gambling industry to expand rapidly without commensurate investment in harm reduction. The 2023 Gambling Act review and subsequent white paper introduced a mandatory levy on gambling operators, providing a more sustainable funding basis for treatment services. However, the treatment sector remains small, with limited specialist workforce capacity, and workforce development takes time that cannot be compressed.</p>
            <p>The 15-clinic target set by NHS England has been achieved. The question for the next phase is not the number of clinics but the reach of treatment &mdash; whether the people who need help, including those in areas without clinics, those who cannot access face-to-face services, and those whose gambling disorder coexists with other addictions or mental health conditions, can access appropriate care. Online treatment delivery, pioneered during the pandemic, offers one route to extending reach without proportional increases in physical infrastructure.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Clinic Growth' },
          { id: 'sec-callout', label: 'Expansion' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="NHS gambling clinics"
              value="15"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="From 2 in 2019 &middot; target 15 achieved"
              sparklineData={[2, 3, 7, 11, 15, 15]}
              onExpand={() => {}}
              source="NHS England &middot; Gambling Clinics 2024"
            />
            <MetricCard
              label="Treatment capacity"
              value="6,200/yr"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="7.5x expansion since 2019"
              sparklineData={[800, 1200, 2800, 4400, 6000, 6200]}
              onExpand={() => {}}
              source="NHS England &middot; Gambling Clinics 2024"
            />
            <MetricCard
              label="% problem gamblers treated"
              value="2.1%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Still only 1 in 48 getting help"
              sparklineData={[0.2, 0.4, 0.9, 1.5, 2.0, 2.1]}
              onExpand={() => {}}
              source="NHS England / Gambling Commission 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="NHS gambling clinics in England, 2019&ndash;2024"
              subtitle="Number of specialist NHS clinics providing treatment for gambling disorder. England."
              series={clinicSeries}
              yLabel="Number of clinics"
              source={{
                name: 'NHS England',
                dataset: 'Gambling Disorder Treatment',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <div id="sec-callout">
            <PositiveCallout
              title="From 2 to 15 NHS Clinics"
              value="15"
              unit="NHS gambling clinics"
              description="The NHS has expanded from 2 specialist gambling clinics in 2019 to 15 by 2024, funded by a mandatory levy on gambling operators. Treatment capacity has grown 7.5-fold in five years."
              source="NHS England, 2024"
            />
          </div>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>NHS England &mdash; NHS Gambling Disorder Services. england.nhs.uk/mental-health/gambling/</p>
            <p>Gambling Commission &mdash; Gambling Participation and Problem Gambling. gamblingcommission.gov.uk/statistics-and-research</p>
            <p>NHS gambling clinic count includes all NHS-commissioned specialist gambling disorder treatment clinics in England. Treatment capacity reflects annual treatment slots. Problem gambling prevalence estimate drawn from the Health Survey for England and Gambling Commission surveys using the Problem Gambling Severity Index.</p>
          </div>
        </section>
      </main>
    </>
  )
}
