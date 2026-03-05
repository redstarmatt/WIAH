'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface DisabilityHateCrimeData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    recordedCrimes: number
    estimatedIncidents: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function DisabilityHateCrimePage() {
  const [data, setData] = useState<DisabilityHateCrimeData | null>(null)

  useEffect(() => {
    fetch('/data/disability-hate-crime/disability_hate_crime.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const series: Series[] = data
    ? [
        {
          id: 'recordedCrimes',
          label: 'Recorded offences',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.recordedCrimes,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Disability Hate Crime" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Disability Hate Crime"
          question="How Common Is Disability Hate Crime?"
          finding="Disability hate crime reports have risen 80% since 2015 to 12,300 recorded offences — but fewer than 1 in 10 cases results in a charge."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Hate crime recorded by police on the basis of disability has increased substantially over the past decade. The Home Office&rsquo;s annual hate crime statistics show 12,300 disability hate crime offences recorded in 2022-23, an 80% increase since 2015. This growth reflects a combination of genuine increases in the underlying offending, improved police recording practices following renewed focus on hate crime under the College of Policing guidance, and — possibly — increased willingness among disabled people to report crimes that they perceive as motivated by hostility toward their disability. The data almost certainly undercounts the true scale: the Crime Survey for England and Wales estimates actual disability hate crime incidents at approximately 70,000 per year, suggesting only around 17% of incidents are reported.</p>
            <p>The nature of disability hate crime is varied. It includes verbal abuse (&lsquo;mate crime&rsquo; — exploitation by people who present as friends), physical assault, online harassment, theft and fraud targeting disabled people, and criminal damage to mobility aids. Mate crime — where perpetrators cynically befriend people with learning disabilities or autism to exploit them financially or physically — is particularly insidious because it is difficult to detect and because victims may be reluctant to recognise or report exploitation by people they regard as friends. The Independent Inquiry into Disability Hate Crime by the Equality and Human Rights Commission (2011) highlighted the under-recording of mate crime specifically, but subsequent improvements in recording have been slow.</p>
            <p>The justice outcomes for disability hate crime are strikingly poor. The charge rate — the proportion of recorded offences that result in a charge or summons — was approximately 9% in 2022-23, compared to 14% for race hate crime and 13% for sexual orientation hate crime. This disparity partly reflects the nature of disability hate crime (a higher proportion involving complex interpersonal relationships or situations where the disability motivation is difficult to prove) and partly reflects a perception among some in the criminal justice system that disability hate crimes are less serious than other forms of hate crime. The Sentencing Council&rsquo;s hate crime guidelines provide for enhanced sentences where disability aggravation is proven, but sentencing data shows that the disability aggravation uplift is applied far less frequently than race aggravation.</p>
            <p>Online disability hate crime has grown significantly in recent years, with social media platforms hosting communities and content that demeans, mocks, or threatens disabled people. &lsquo;Inspiration porn&rsquo; — content that presents disabled people as objects of inspiration for non-disabled audiences, often without the consent of the disabled person featured — is a form of online harm that disabled people&rsquo;s organisations have campaigned against. More explicitly hostile content, including coordinated targeting of disabled activists and content creators, falls more clearly within the scope of online hate crime. The Online Safety Act 2023, which came into force progressively from 2024, places new duties on platforms to remove illegal hate crime content, though its effect on disability hate crime specifically is yet to be empirically assessed.</p>
            <p>Government strategy on disability hate crime sits within the broader Hate Crime Action Plan and the SEND and Disability Action Plan. The 2023 Disability Action Plan made specific commitments to improve disability hate crime reporting and recording, including a consultation on creating a specific offence of disability aggravation that runs parallel to the existing specific offence for race aggravation (which tends to generate better recording than the more discretionary &lsquo;aggravated&rsquo; sentencing uplift). Disabled People&rsquo;s Organisations have long argued for a standalone disability hate crime offence — similar to the Disability Hate Crime legislation in other jurisdictions — that would send a clearer signal about the seriousness with which the justice system views hostility toward disabled people.</p>
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
              label="Disability hate crimes recorded"
              value="12,300"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="+80% since 2015 · online abuse surge"
              sparklineData={[6800, 7400, 8100, 8700, 9300, 9800, 10500, 11500, 12300]}
              onExpand={() => {}}
              source="Home Office · Hate Crime Statistics 2024"
            />
            <MetricCard
              label="Charge rate"
              value="9%"
              unit=""
              direction={'flat' as const}
              polarity={'up-is-bad' as const}
              changeText="9% charged · vs 14% race hate crime"
              sparklineData={[9, 9, 9, 9, 9, 9, 9, 9, 9]}
              onExpand={() => {}}
              source="Home Office · Hate Crime Outcomes 2024"
            />
            <MetricCard
              label="Estimated actual incidents"
              value="70,000"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="70k estimated · only 17% reported"
              sparklineData={[52000, 55000, 58000, 61000, 63000, 65000, 67000, 68000, 70000]}
              onExpand={() => {}}
              source="Crime Survey for England and Wales 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Disability hate crimes recorded by police, 2016–2024"
              subtitle="Disability-motivated hate crimes recorded by police forces in England and Wales."
              series={series}
              yLabel="Recorded offences"
              source={{
                name: 'Home Office',
                dataset: 'Hate Crime in England and Wales',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Home Office &mdash; Hate Crime in England and Wales. Published annually. gov.uk/government/statistics/hate-crime-england-and-wales</p>
            <p>ONS &mdash; Crime Survey for England and Wales. Estimated incidents are self-reported hate crime from CSEW interviews and represent a substantially higher figure than police-recorded data. Charge rate calculated from Home Office crime outcomes data as charges/summons as a proportion of all recorded disability hate crime offences.</p>
          </div>
        </section>
      </main>
    </>
  )
}
