'use client'

import { useEffect, useState } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

// ── Types ────────────────────────────────────────────────────────────────────

interface CladdingCrisisData {
  remediationProgress: { year: number; identified: number; fullyRemediated: number; percent: number }[]
  buildingsByType: { type: string; count: number }[]
  wrapRoundCostEstimate: { category: string; value: number }[]
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 6, 1)
}

// ── References ───────────────────────────────────────────────────────────────

const editorialRefs: Reference[] = [
  { num: 1, name: 'DLUHC', dataset: 'Building Safety Remediation Data', url: 'https://www.gov.uk/government/collections/building-safety-programme', date: '2024' },
  { num: 2, name: 'RICS', dataset: 'Remediation Cost Estimates', date: '2023' },
  { num: 3, name: 'UK Parliament', dataset: 'Building Safety Act 2022', url: 'https://www.legislation.gov.uk/ukpga/2022/30/contents/enacted', date: '2022' },
  { num: 4, name: 'End Our Cladding Scandal', dataset: 'Campaign Data & Leaseholder Impact', url: 'https://endourcladdingscandal.co.uk', date: '2024' },
];

// ── Page ─────────────────────────────────────────────────────────────────────

export default function CladdingCrisisPage() {
  const [data, setData] = useState<CladdingCrisisData | null>(null)

  useEffect(() => {
    fetch('/data/cladding-crisis/cladding_crisis.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const remediationSeries: Series[] = data
    ? [{
        id: 'remediation',
        label: '% buildings fully remediated',
        colour: '#2A9D8F',
        data: data.remediationProgress.map(d => ({
          date: yearToDate(d.year),
          value: d.percent,
        })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Cladding Crisis" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Cladding Crisis"
          question="How many buildings still have dangerous cladding?"
          finding="4,603 residential buildings over 11 metres have unsafe cladding — 5 years after Grenfell. Only 30% have been fully remediated by 2024. Around 1 million residents are affected, with buildings taking years to fix."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Inspections triggered by the Grenfell Tower fire (72 deaths, June 2017) identified 4,603 residential buildings over 11 metres with unsafe cladding or fire safety defects in England.<Cite nums={1} /> By 2021, only 8.6% had been fully remediated; progress has since accelerated to 30% by 2024, driven by a pledge from 49 major developers to fund remediation of their buildings and the government's Building Safety Fund.<Cite nums={1} /> At the current pace, completion would not be reached until around 2030 — thirteen years after Grenfell. The estimated total remediation bill is £17.6 billion: £5.1 billion committed by developers, £5.1 billion from the Building Safety Fund, and £7.4 billion still in dispute or potentially falling on leaseholders.<Cite nums={[1, 2]} /> The Building Safety Act 2022 created legal protections limiting leaseholder liability, but protections are not absolute in buildings where developers are insolvent or the original builder untraceable.<Cite nums={3} /></p>
            <p>Before the 2022 Act, flat owners were liable through service charges for remediation costs they could not afford, leaving hundreds of thousands of properties unmortgageable and unsellable.<Cite nums={4} /> Those affected were predominantly young professionals who had bought under government-backed Help to Buy schemes, trapped in homes they could not sell, with buildings insurance costs soaring and waking fire watches adding thousands of pounds annually.<Cite nums={4} /> The burden falls unevenly: buildings below 11 metres were excluded from the developer pledge despite having the same fire risk, and EWS1 assessment requirements imposed by mortgage lenders continue to affect sales in buildings not yet on the formal remediation programme.<Cite nums={[1, 4]} /></p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-progress', label: 'Remediation Progress' },
          { id: 'sec-buildings', label: 'Buildings by Type' },
          { id: 'sec-costs', label: 'Cost Breakdown' },
        ]} />

        <ScrollReveal>
        <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Buildings with unsafe cladding identified"
            value="4,603"
            unit=""
            direction="flat"
            polarity="up-is-bad"
            changeText="Identified since Grenfell 2017 · likely more unidentified below 11m"
            sparklineData={[4603, 4603, 4603, 4603]}
            source="DLUHC Building Safety Remediation · 2024"
            href="#sec-progress"/>
          <MetricCard
            label="Buildings fully remediated"
            value="30"
            unit="% (2024)"
            direction="up"
            polarity="up-is-good"
            changeText="Up from just 8.6% in 2021 · progress accelerating but slow"
            sparklineData={[8.6, 16.1, 22.0, 30.0]}
            source="DLUHC · 2024"
            href="#sec-buildings"/>
          <MetricCard
            label="Estimated total remediation cost"
            value="£17.6bn"
            unit=""
            direction="flat"
            polarity="up-is-bad"
            changeText="£7.4bn still unresolved · leaseholders potentially left liable"
            sparklineData={[10, 12, 15, 17.6]}
            source="DLUHC / RICS estimates · 2023"
            href="#sec-costs"/>
        </div>
        </ScrollReveal>

        <ScrollReveal>
        <section id="sec-progress" className="mb-12">
          <LineChart
            title="Proportion of unsafe-cladding buildings fully remediated, 2021–2024"
            subtitle="Percentage of 4,603 identified buildings with unsafe cladding fully remediated. DLUHC."
            series={remediationSeries}
            annotations={[
              { date: new Date(2022, 3, 1), label: 'Building Safety Act 2022' },
            ]}
            yLabel="% fully remediated"
          />
        </section>
        </ScrollReveal>

        <ScrollReveal>
        <section id="sec-buildings" className="mb-12">
          <h3 className="text-xl font-bold text-wiah-black mb-2">Affected buildings by type</h3>
          <p className="text-sm text-wiah-mid mb-6">Number of buildings with identified unsafe cladding by tenure type. DLUHC.</p>
          <div className="space-y-3">
            {data?.buildingsByType
              .sort((a, b) => b.count - a.count)
              .map(item => (
              <div key={item.type} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-52 text-sm text-wiah-black">{item.type}</div>
                <div className="flex-grow flex items-center gap-2">
                  <div
                    className="h-6 bg-[#E63946] rounded"
                    style={{ width: `${(item.count / 1900) * 100}%` }}
                  />
                </div>
                <div className="flex-shrink-0 w-16 text-right font-mono text-sm text-wiah-black">
                  {item.count.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </section>
        </ScrollReveal>

        <ScrollReveal>
        <section id="sec-costs" className="mb-12">
          <h3 className="text-xl font-bold text-wiah-black mb-2">Estimated remediation cost breakdown</h3>
          <p className="text-sm text-wiah-mid mb-6">Who bears the £17.6bn remediation bill? DLUHC / RICS estimates.</p>
          <div className="space-y-3">
            {data?.wrapRoundCostEstimate.map(item => (
              <div key={item.category} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-56 text-sm text-wiah-black">{item.category}</div>
                <div className="flex-grow flex items-center gap-2">
                  <div
                    className="h-6 rounded"
                    style={{
                      width: `${(item.value / 18) * 100}%`,
                      backgroundColor: item.category.includes('Unresolved') ? '#E63946' : '#264653',
                    }}
                  />
                </div>
                <div className="flex-shrink-0 w-16 text-right font-mono text-sm text-wiah-black">
                  £{item.value}bn
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs font-mono text-wiah-mid mt-4">
            Source:{' '}
            <a href="https://www.gov.uk/government/collections/building-safety-programme" className="underline" target="_blank" rel="noopener noreferrer">
              DLUHC Building Safety Programme (gov.uk)
            </a>
            {' '}·{' '}
            <a href="https://endourcladdingscandal.co.uk" className="underline" target="_blank" rel="noopener noreferrer">
              End Our Cladding Scandal
            </a>
          </p>
        </section>
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

              <RelatedTopics />
      </main>
    </>
  )
}
