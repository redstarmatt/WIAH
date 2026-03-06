'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series, Annotation } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface LearningDisabilitiesData {
  national: {
    inpatientNumbers: {
      timeSeries: Array<{ year: number; count: number }>
    }
    annualHealthChecks: {
      timeSeries: Array<{ year: number; pct: number }>
    }
    mortalityGap: {
      timeSeries: Array<{ year: number; gapYears: number }>
    }
    leederReviews: {
      timeSeries: Array<{ year: number; reviews: number }>
    }
  }
}

function yearToDate(y: number): Date {
  return new Date(y, 5, 1)
}

// -- Page -------------------------------------------------------------------

export default function LearningDisabilitiesPage() {
  const [data, setData] = useState<LearningDisabilitiesData | null>(null)

  useEffect(() => {
    fetch('/data/learning-disabilities/learning_disabilities.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const inpatientSeries: Series[] = data
    ? [{
        id: 'inpatients',
        label: 'People in inpatient settings',
        colour: '#264653',
        data: data.national.inpatientNumbers.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.count,
        })),
      }]
    : []

  const healthCheckSeries: Series[] = data
    ? [{
        id: 'health-checks',
        label: 'Annual health check uptake (%)',
        colour: '#2A9D8F',
        data: data.national.annualHealthChecks.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.pct,
        })),
      }]
    : []

  const mortalityGapSeries: Series[] = data
    ? [{
        id: 'mortality-gap',
        label: 'Life expectancy gap (years)',
        colour: '#E63946',
        data: data.national.mortalityGap.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.gapYears,
        })),
      }]
    : []

  const inpatientAnnotations: Annotation[] = [
    { date: yearToDate(2015), label: '2015: Transforming Care target set' },
  ]

  const mortalityAnnotations: Annotation[] = [
    { date: yearToDate(2020), label: '2020: COVID disproportionate deaths' },
  ]

  return (
    <>
      <TopicNav topic="Learning Disabilities" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Learning Disabilities"
          question="Are People With Learning Disabilities Getting the Care They Need?"
          finding="People with learning disabilities die on average 23 years younger than the general population. Nearly 2,000 remain in inpatient settings despite a decade-old promise to move them into the community. Only 69% receive their recommended annual health check."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Approximately 1.5 million people in England have a learning disability. The LeDeR programme &mdash; Learning from Lives and Deaths &mdash; found the median age at death is 23 years lower than the general population: 61 for men, 59 for women. During COVID, people with learning disabilities died at 3.7 times the rate of the general population, driven by congregate living and &mdash; as the CQC documented &mdash; the application of blanket DNACPR orders without individual assessment or family consultation. The Winterbourne View scandal in 2012 prompted the Transforming Care programme, which set a target of reducing inpatient numbers by 50% from the 2015 baseline of 3,000; ten years later, approximately 1,960 remain. Annual health check uptake has improved from 37% in 2015 to 69% in 2024, but nearly a third of people on LD registers still receive no check.</p>
            <p>The consequences of systemic failure fall on some of the most marginalised people in England. Those in inpatient settings are often placed hundreds of miles from their families, with average stays exceeding five years. LeDeR reviews consistently document diagnostic overshadowing &mdash; symptoms attributed to the learning disability rather than investigated as separate conditions &mdash; inadequate reasonable adjustments, and failure to apply the Mental Capacity Act correctly. These findings have been repeated in inquiry after inquiry for decades; the gap between what was promised and what has been delivered is wide, persistent, and consequential.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-inpatients', label: 'Inpatient Numbers' },
          { id: 'sec-health-checks', label: 'Health Checks' },
          { id: 'sec-mortality', label: 'Mortality Gap' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Life expectancy gap"
              value="23"
              unit="years"
              direction="flat"
              polarity="up-is-bad"
              changeText="2023 &middot; Median age at death: 60 vs 83 &middot; Widened during COVID"
              sparklineData={[23, 23, 22, 23, 27, 25, 24, 23]}
              href="#sec-inpatients"/>
            <MetricCard
              label="People in inpatient settings"
              value="1,960"
              direction="down"
              polarity="up-is-bad"
              changeText="2024 &middot; Target was &lt;1,500 by 2019 &middot; Down from 3,000 in 2015"
              sparklineData={[3000, 2765, 2505, 2400, 2260, 2085, 2040, 2005, 1985, 1960]}
              href="#sec-health-checks"/>
            <MetricCard
              label="Annual health check uptake"
              value="69.1"
              unit="%"
              direction="up"
              polarity="up-is-good"
              changeText="2024 &middot; Up from 37% in 2015 &middot; 31% still not checked"
              sparklineData={[37.2, 41.8, 49.7, 52.4, 56.1, 47.3, 58.6, 62.0, 66.4, 69.1]}
              href="#sec-mortality"/>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-inpatients" className="mb-12">
            <LineChart
              title="People with learning disabilities in inpatient settings, England, 2015&ndash;2024"
              subtitle="Monthly census of people with learning disabilities and/or autism in NHS-funded inpatient settings."
              series={inpatientSeries}
              annotations={inpatientAnnotations}
              yLabel="Inpatients"
              source={{
                name: 'NHS Digital',
                dataset: 'Assuring Transformation data',
                frequency: 'monthly',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-health-checks" className="mb-12">
            <LineChart
              title="Annual health check uptake, England, 2015&ndash;2024"
              subtitle="% of adults on GP learning disability registers receiving their annual health check."
              series={healthCheckSeries}
              yLabel="Uptake (%)"
              source={{
                name: 'NHS Digital',
                dataset: 'Health and Care of People with Learning Disabilities',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-mortality" className="mb-12">
            <LineChart
              title="Mortality gap: learning disabilities vs general population, England, 2016&ndash;2023"
              subtitle="Difference in median age at death (years) between people with learning disabilities and general population."
              series={mortalityGapSeries}
              annotations={mortalityAnnotations}
              yLabel="Gap (years)"
              source={{
                name: 'LeDeR Programme',
                dataset: 'Learning from Lives and Deaths annual reports',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>NHS Digital &mdash; Assuring Transformation (Learning Disability) data. Monthly census of people with learning disabilities and/or autism in inpatient mental health, learning disability, or autism settings. Published monthly.</p>
            <p>NHS Digital &mdash; Health and Care of People with Learning Disabilities. Annual report on health check uptake, screening, and health outcomes. Based on QOF LD register data.</p>
            <p>LeDeR Programme &mdash; Learning from Lives and Deaths reviews. Mortality data and thematic reviews of deaths of people with learning disabilities aged 4+. Published annually.</p>
            <p>Inpatient figures are a point-in-time census and include both learning disability and autism diagnoses. Health check uptake based on GP LD registers, which are known to undercount &mdash; particularly for people with mild or moderate learning disabilities. The mortality gap widened significantly during COVID (2020) due to disproportionate death rates in this population, including the use of inappropriate DNACPR decisions.</p>
          </div>
        </section>
      </main>
    </>
  )
}
