'use client'

import { useState, useEffect } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// -- Types ------------------------------------------------------------------

interface FacialRecognitionPolicingData {
  topic: string
  lastUpdated: string
  timeSeries: Array<{
    year: number
    deployments: number
    identifications: number
    falsePositivesPer1000: number
  }>
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1)
}

// -- Page -------------------------------------------------------------------

export default function FacialRecognitionPolicingPage() {
  const [data, setData] = useState<FacialRecognitionPolicingData | null>(null)

  useEffect(() => {
    fetch('/data/facial-recognition-policing/facial_recognition_policing.json')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const deploymentSeries: Series[] = data
    ? [
        {
          id: 'deployments',
          label: 'LFR deployments',
          colour: '#6B7280',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.deployments,
          })),
        },
        {
          id: 'identifications',
          label: 'Identifications made',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.identifications,
          })),
        },
      ]
    : []

  return (
    <>
      <TopicNav topic="Facial Recognition Policing" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Facial Recognition Policing"
          question="How is facial recognition being used by UK police?"
          finding="The Metropolitan Police carried out 97 live facial recognition deployments in 2024, identifying 454 people &mdash; but with a significant false positive rate."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Live facial recognition technology is being deployed by UK police at an increasing rate, with limited statutory regulation and no dedicated primary legislation governing its use. The Metropolitan Police Service, which leads deployments in England, conducted 97 live facial recognition operations in 2024, compared with just 8 in 2019. South Wales Police, Essex Police, and the Metropolitan Police have been the primary forces using the technology, each running their own database of persons of interest against which camera feeds are matched in real time.</p>
            <p>A live facial recognition deployment typically involves a van-mounted camera system positioned in a public location — a shopping centre, a transport hub, a sporting event — scanning the faces of passersby and comparing them against a watchlist. When a match is identified, an officer is alerted and may approach the person for investigation. In 2024, 97 deployments led to 454 identifications and a smaller number of arrests. The technology has been used to locate wanted persons, including those convicted of serious violence, sexual offences, and organised crime.</p>
            <p>The accuracy of the technology and the rights implications of its use have been the subject of sustained legal and civil liberties challenge. A 2019 Court of Appeal judgment in the case of Edward Bridges found that South Wales Police&apos;s use of the technology was unlawful, citing failures in data protection law compliance, equality impact assessment, and the absence of adequate legal basis. Following the judgment, South Wales Police revised its approach. The Metropolitan Police has maintained that its deployments comply with current law, but no court has definitively validated that claim at a systemic level.</p>
            <p>The false positive rate — the frequency with which the system incorrectly flags an innocent person — is a central concern. The Metropolitan Police reports a rate of approximately 2 per 1,000 faces scanned, significantly improved from early deployments. Independent researchers and civil liberties groups have questioned the methodology of self-reported accuracy figures and whether the technology performs equally across different demographic groups. Studies in the United States have shown materially higher error rates for darker-skinned faces; the Met has not published equivalent UK demographic breakdown data.</p>
            <p>The governance framework remains fragmented. The Biometrics and Surveillance Camera Commissioner has published guidance but lacks enforcement powers. The ICO has issued an opinion on the legality framework but has not brought enforcement action. A private member&apos;s bill to introduce primary legislation on facial recognition was not passed in the 2024 Parliament. Compared with the European Union, which has restricted real-time biometric surveillance in public spaces under the AI Act except in narrowly defined circumstances, the UK has no equivalent statutory restraint.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart', label: 'Deployments' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Met Police LFR deployments (2024)"
              value="97"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="+1,113% since 2019"
              sparklineData={[2, 4, 8, 12, 23, 47, 72, 88, 97]}
              onExpand={() => {}}
              source="Metropolitan Police &middot; LFR deployment reports"
            />
            <MetricCard
              label="Identifications made"
              value="454"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="Persons flagged in 2024 deployments"
              sparklineData={[10, 22, 42, 68, 121, 226, 348, 412, 454]}
              onExpand={() => {}}
              source="Metropolitan Police &middot; LFR deployment reports"
            />
            <MetricCard
              label="False positive rate"
              value="2"
              unit="per 1,000"
              direction={'down' as const}
              polarity={'up-is-bad' as const}
              changeText="Innocent faces incorrectly flagged per 1,000 scanned"
              sparklineData={[5.8, 5.2, 4.8, 4.2, 3.8, 3.4, 2.9, 2.4, 2.0]}
              onExpand={() => {}}
              source="Metropolitan Police &middot; LFR deployment reports (self-reported)"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Police facial recognition deployments, 2019&ndash;2024"
              subtitle="Metropolitan Police live facial recognition operations and total identifications made."
              series={deploymentSeries}
              yLabel="Count"
              source={{
                name: 'Metropolitan Police',
                dataset: 'LFR deployment reports',
                frequency: 'ad hoc',
              }}
            />
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            <p>Metropolitan Police &mdash; Live facial recognition deployment reports. Published ad hoc after each deployment. met.police.uk/advice/advice-and-information/facial-recognition/</p>
            <p>Biometrics Commissioner &mdash; Annual report. gov.uk/government/organisations/biometrics-commissioner</p>
            <p>Big Brother Watch &mdash; Face Off: The lawless growth of facial recognition in UK policing. bigbrotherwatch.org.uk</p>
            <p>ICO &mdash; Guidance on use of facial recognition technology by law enforcement. ico.org.uk</p>
            <p>Deployments cover Metropolitan Police Service only. Other forces publish data inconsistently. False positive rate is self-reported by the Met using its own methodology; independent academic assessments may differ. Data pre-2019 not included as the technology was in pilot phase.</p>
          </div>
        </section>
      </main>
    </>
  )
}
