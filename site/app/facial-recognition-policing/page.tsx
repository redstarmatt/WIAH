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
          finding="The Metropolitan Police carried out 97 live facial recognition deployments in 2024, identifying 454 people — but with a significant false positive rate."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The Metropolitan Police conducted 97 live facial recognition operations in 2024, up from just 8 in 2019 — an 1,100% increase — with no dedicated primary legislation governing the technology's use. Deployments involve van-mounted cameras scanning faces in public spaces against a watchlist; in 2024, 97 deployments led to 454 identifications. A 2019 Court of Appeal judgment found South Wales Police's use was unlawful, citing data protection failures and inadequate equality impact assessment. The Met maintains its deployments comply with current law, but no court has definitively validated this at a systemic level. The self-reported false positive rate of approximately 2 per 1,000 faces scanned has improved from early deployments, but independent researchers have questioned self-reported accuracy figures and whether performance is equivalent across demographic groups — studies in the US show materially higher error rates for darker-skinned faces, and the Met has not published equivalent UK demographic breakdown data.</p>
            <p>The governance framework is fragmented and weak by international standards. The Biometrics and Surveillance Camera Commissioner can publish guidance but lacks enforcement powers; the ICO has issued opinions but not brought enforcement action. A private member's bill on facial recognition was not passed in the 2024 Parliament. The European Union has restricted real-time biometric surveillance in public spaces under the AI Act except in narrowly defined circumstances; the UK has no equivalent statutory restraint, meaning expansion continues in a regulatory vacuum where the technology is deployed more widely and rapidly than the legal and accountability frameworks can track.</p>
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
              href="#sec-chart"source="Metropolitan Police · LFR deployment reports"
            />
            <MetricCard
              label="Identifications made"
              value="454"
              unit=""
              direction={'up' as const}
              polarity={'up-is-bad' as const}
              changeText="Persons flagged in 2024 deployments"
              sparklineData={[10, 22, 42, 68, 121, 226, 348, 412, 454]}
              href="#sec-chart"source="Metropolitan Police · LFR deployment reports"
            />
            <MetricCard
              label="False positive rate"
              value="2"
              unit="per 1,000"
              direction={'down' as const}
              polarity={'up-is-bad' as const}
              changeText="Innocent faces incorrectly flagged per 1,000 scanned"
              sparklineData={[5.8, 5.2, 4.8, 4.2, 3.8, 3.4, 2.9, 2.4, 2.0]}
              href="#sec-chart"source="Metropolitan Police · LFR deployment reports (self-reported)"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart" className="mb-12">
            <LineChart
              title="Police facial recognition deployments, 2019–2024"
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
            <p>Metropolitan Police — Live facial recognition deployment reports. Published ad hoc after each deployment. met.police.uk/advice/advice-and-information/facial-recognition/</p>
            <p>Biometrics Commissioner — Annual report. gov.uk/government/organisations/biometrics-commissioner</p>
            <p>Big Brother Watch — Face Off: The lawless growth of facial recognition in UK policing. bigbrotherwatch.org.uk</p>
            <p>ICO — Guidance on use of facial recognition technology by law enforcement. ico.org.uk</p>
            <p>Deployments cover Metropolitan Police Service only. Other forces publish data inconsistently. False positive rate is self-reported by the Met using its own methodology; independent academic assessments may differ. Data pre-2019 not included as the technology was in pilot phase.</p>
          </div>
        </section>
      </main>
    </>
  )
}
