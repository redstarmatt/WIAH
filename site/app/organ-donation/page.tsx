'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series, Annotation } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface OrganDonationData {
  national: {
    waitingList: {
      timeSeries: Array<{ year: number; count: number }>
    }
    transplants: {
      timeSeries: Array<{ year: number; count: number }>
    }
    consentRate: {
      timeSeries: Array<{ year: number; pct: number }>
    }
    deathsOnList: {
      timeSeries: Array<{ year: number; count: number }>
    }
  }
}

function yearToDate(y: number): Date {
  return new Date(y, 5, 1)
}

// -- Page -------------------------------------------------------------------

export default function OrganDonationPage() {
  const [data, setData] = useState<OrganDonationData | null>(null)

  useEffect(() => {
    fetch('/data/organ-donation/organ_donation.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const waitingListSeries: Series[] = data
    ? [{
        id: 'waiting-list',
        label: 'Patients on waiting list',
        colour: '#E63946',
        data: data.national.waitingList.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.count,
        })),
      }]
    : []

  const transplantSeries: Series[] = data
    ? [{
        id: 'transplants',
        label: 'Transplants performed',
        colour: '#2A9D8F',
        data: data.national.transplants.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.count,
        })),
      }]
    : []

  const consentSeries: Series[] = data
    ? [{
        id: 'consent',
        label: 'Family consent rate (%)',
        colour: '#2A9D8F',
        data: data.national.consentRate.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.pct,
        })),
      }]
    : []

  const waitingAnnotations: Annotation[] = [
    { date: yearToDate(2020), label: '2020: COVID halts transplants' },
  ]

  const consentAnnotations: Annotation[] = [
    { date: yearToDate(2020), label: '2020: Opt-out law takes effect' },
  ]

  return (
    <>
      <TopicNav topic="Organ Donation" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Organ Donation"
          question="Is the Opt-Out System Saving Lives?"
          finding="Over 6,300 people are waiting for a transplant in the UK, and around 350 die each year before one becomes available. England&rsquo;s opt-out organ donation law, introduced in 2020, has helped lift family consent rates to 73% &mdash; but transplant numbers have not yet returned to pre-pandemic highs."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>In May 2020, England moved to an opt-out system for organ donation &mdash; Max and Keira&rsquo;s Law &mdash; under which adults are assumed willing donors unless they have specifically opted out. Wales adopted opt-out in 2015; Scotland in 2021. The family consent rate &mdash; the proportion of families agreeing to donation when approached &mdash; rose from 58&ndash;67% before opt-out to 73% by 2024; each percentage point increase translates to dozens of additional transplants per year. Despite this, transplant numbers have not recovered to their pre-COVID peak: 4,891 performed in 2024 versus 5,090 in 2018, following a 27% drop in 2020&ndash;2021 when intensive care capacity was diverted and immunosuppressed recipients were at extreme risk. Over 6,300 patients remain on the waiting list, down from a peak of over 7,000 in 2020, with around 350 dying each year before a transplant becomes available and a further 700 removed for becoming too unwell.</p>
            <p>Ethnicity is the starkest dimension of inequality. Black, Asian, and minority ethnic patients wait on average twice as long for a kidney transplant as white patients, because organ matching depends partly on tissue type and the donor pool does not reflect the ethnic composition of those in need. Consent rates among Black African and Black Caribbean families remain significantly below average; addressing this requires culturally specific engagement, not just legislative change. The potential donor pool is also constrained by factors the law cannot change: the number of deaths occurring in circumstances suitable for donation, the condition of those organs, and the logistical challenge of retrieval and matching.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-waiting', label: 'Waiting List' },
          { id: 'sec-transplants', label: 'Transplants' },
          { id: 'sec-consent', label: 'Consent Rate' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Patients on transplant waiting list"
              value="6,342"
              direction="down"
              polarity="up-is-bad"
              changeText="UK, 2024 &middot; Down from 7,048 in 2020 &middot; ~350 die waiting each year"
              sparklineData={[7026, 6943, 6744, 6434, 6174, 6147, 7048, 6866, 6728, 6527, 6342]}
              href="#sec-waiting"/>
            <MetricCard
              label="Transplants performed"
              value="4,891"
              direction="up"
              polarity="up-is-good"
              changeText="UK, 2024 &middot; Recovering from COVID low of 3,722 &middot; Pre-COVID peak: 5,090"
              sparklineData={[4655, 4605, 4753, 4943, 5090, 4867, 3722, 4408, 4619, 4753, 4891]}
              href="#sec-transplants"/>
            <MetricCard
              label="Family consent rate"
              value="72.8"
              unit="%"
              direction="up"
              polarity="up-is-good"
              changeText="2024 &middot; Up from 58% in 2014 &middot; Opt-out law since May 2020"
              sparklineData={[58.3, 60.1, 62.4, 63.8, 67.1, 67.4, 65.2, 68.1, 69.7, 71.2, 72.8]}
              href="#sec-consent"/>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-waiting" className="mb-12">
            <LineChart
              title="Organ transplant waiting list, UK, 2014&ndash;2024"
              subtitle="Number of patients on the active transplant waiting list at 31 March each year."
              series={waitingListSeries}
              annotations={waitingAnnotations}
              yLabel="Patients"
              source={{
                name: 'NHS Blood and Transplant',
                dataset: 'Organ Donation and Transplantation Activity Report',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-transplants" className="mb-12">
            <LineChart
              title="Organ transplants performed, UK, 2014&ndash;2024"
              subtitle="Total deceased and living donor transplants per year."
              series={transplantSeries}
              yLabel="Transplants"
              source={{
                name: 'NHS Blood and Transplant',
                dataset: 'Activity Report',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-consent" className="mb-12">
            <LineChart
              title="Family consent rate for organ donation, UK, 2014&ndash;2024"
              subtitle="Proportion of families who agreed to donation when approached by specialist nurses."
              series={consentSeries}
              annotations={consentAnnotations}
              yLabel="Consent rate (%)"
              source={{
                name: 'NHS Blood and Transplant',
                dataset: 'Potential Donor Audit',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>NHS Blood and Transplant &mdash; Organ Donation and Transplantation Activity Report 2024. UK-wide data on waiting list, transplants performed, and donor activity. Published annually.</p>
            <p>NHSBT &mdash; Potential Donor Audit. Family approach and consent rate data. Published annually.</p>
            <p>Waiting list figures are UK-wide snapshot at 31 March each year. Transplant counts include deceased donor (DBD and DCD) and living donor transplants. Consent rate is the proportion of families approached by specialist nurses who agreed to donation proceeding. Max and Keira&rsquo;s Law (opt-out) came into effect in England on 20 May 2020.</p>
          </div>
        </section>
      </main>
    </>
  )
}
