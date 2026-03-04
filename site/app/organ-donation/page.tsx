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
            <p>In May 2020, England moved to an opt-out system for organ donation &mdash; also known as deemed consent or Max and Keira&rsquo;s Law. Under the new system, adults in England are assumed to be willing organ donors unless they have specifically opted out, are in an excluded group, or their family objects. Wales adopted opt-out in 2015; Scotland followed in 2021. The change was the most significant reform to organ donation policy in the UK since the modern transplant programme began.</p>
            <p>The headline metric that matters most is the family consent rate &mdash; the proportion of families who agree to donation when approached. Before opt-out, England&rsquo;s consent rate hovered around 58&ndash;67%. By 2024 it had reached 73%. That improvement is meaningful: each percentage point increase in consent translates to dozens of additional transplants per year. But isolating the effect of the law itself from other factors &mdash; improved specialist nurse training, public awareness campaigns, better hospital processes &mdash; is methodologically difficult. Wales, which adopted opt-out five years earlier, saw a similar gradual increase in consent rates that took time to materialise.</p>
            <p>Despite rising consent, transplant numbers have not recovered to their pre-COVID peak. The UK performed 4,891 transplants in 2024, compared to 5,090 in 2018. COVID was devastating for transplant programmes: immunosuppressed recipients were at extreme risk, intensive care capacity was diverted, and the 2020&ndash;2021 period saw a 27% drop in activity. Recovery has been steady but incomplete. One reason is that the potential donor pool is constrained by factors the law cannot change: the number of deaths in circumstances suitable for donation, the health of those organs, and the logistical challenge of retrieval and matching.</p>
            <p>The waiting list has fallen slowly from a peak of over 7,000 in 2020 to around 6,300 in 2024. But that figure understates need, because access to the waiting list is itself rationed: patients with complex conditions, older patients, or those in areas with longer assessment times may never reach the list. Around 350 people die each year while waiting, and a further 700 are removed because they become too unwell for surgery. The kidney waiting list accounts for the majority of those waiting, and average waits exceed two years for many patients.</p>
            <p>Ethnicity is the starkest dimension of inequality. Black, Asian, and minority ethnic patients wait on average twice as long for a kidney transplant as white patients, because organ matching depends partly on tissue type, and the donor pool does not reflect the ethnic composition of those who need transplants. Consent rates among Black African and Black Caribbean families remain significantly lower than average. Addressing this requires culturally specific engagement, not just legislative change. The evidence from other opt-out countries suggests the law creates a framework, but the outcomes depend on how it is implemented at the bedside.</p>
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
              onExpand={() => {}}
            />
            <MetricCard
              label="Transplants performed"
              value="4,891"
              direction="up"
              polarity="up-is-good"
              changeText="UK, 2024 &middot; Recovering from COVID low of 3,722 &middot; Pre-COVID peak: 5,090"
              sparklineData={[4655, 4605, 4753, 4943, 5090, 4867, 3722, 4408, 4619, 4753, 4891]}
              onExpand={() => {}}
            />
            <MetricCard
              label="Family consent rate"
              value="72.8"
              unit="%"
              direction="up"
              polarity="up-is-good"
              changeText="2024 &middot; Up from 58% in 2014 &middot; Opt-out law since May 2020"
              sparklineData={[58.3, 60.1, 62.4, 63.8, 67.1, 67.4, 65.2, 68.1, 69.7, 71.2, 72.8]}
              onExpand={() => {}}
            />
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
