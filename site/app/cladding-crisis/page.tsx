'use client'

import { useEffect, useState } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

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
          finding="4,603 residential buildings over 11 metres have unsafe cladding &mdash; 5 years after Grenfell. Only 30% have been fully remediated by 2024. Around 1 million residents are affected, with buildings taking years to fix."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The Grenfell Tower fire on 14 June 2017 killed 72 people. The immediate cause was the rapid spread of fire across the tower&apos;s external cladding system, which included aluminium composite material (ACM) panels with a polyethylene core. The panels were effectively flammable plastic covered in aluminium foil. Within weeks of Grenfell, inspections began on residential buildings across England. The scale of what was found was initially shocking, then gradually normalised into a bureaucratic process: 4,603 buildings of over 11 metres with some form of unsafe cladding or fire safety defect had been identified by 2024.</p>
            <p>The pace of remediation has been slow. By 2021, only 8.6% of identified buildings had been fully remediated &mdash; 394 out of 4,603. Progress has since accelerated, reaching 30% by 2024, driven by the signing of the developer pledge (49 major developers committing to fund remediation of their buildings) and the government&apos;s Building Safety Fund covering costs where developers were insolvent or untraceable. But 70% of buildings with identified unsafe cladding remain unremediated. The trajectory, if maintained, would see completion around 2030 &mdash; thirteen years after Grenfell.</p>
            <p>The Building Safety Act 2022 was landmark legislation that fundamentally reformed the regulatory framework for high-rise buildings. It created new dutyholder responsibilities, a Building Safety Regulator, and critically, legal protections for leaseholders. Before the Act, the default position &mdash; confirmed by a 2012 government review &mdash; was that leaseholders in affected buildings were responsible for remediation costs through their service charges. This meant flat owners, many of whom had paid hundreds of thousands of pounds for their properties, were liable for tens of thousands of pounds in remediation costs they could not afford. Many found their buildings unmortgageable and unsellable.</p>
            <p>The leaseholder protections in the Building Safety Act limit what leaseholders can be charged, but they are not absolute. The protections apply most clearly to qualifying leaseholders in buildings with a developer or building owner identifiable and liable. In buildings where the developer is insolvent, the original builder untraceable, or the building below 11 metres (which was excluded from the developer pledge), leaseholders may still face costs. The EWS1 certificate problem &mdash; an additional fire safety assessment required by mortgage lenders before they will lend on a flat in a building needing cladding assessment &mdash; continued to affect the ability to sell properties even in buildings not on the DLUHC&apos;s formal remediation list.</p>
            <p>The total cost of remediation is estimated at £17.6 billion. Of this, approximately £5.1 billion has been committed by developers under the pledge, and £5.1 billion by the government Building Safety Fund. Around £7.4 billion remains in dispute, unallocated, or potentially falling on leaseholders. The phrase &ldquo;fully remediated&rdquo; in DLUHC statistics means the unsafe cladding has been removed and replaced &mdash; it does not mean all fire safety works have been completed, as some buildings have multiple interacting defects beyond cladding alone. The 2024 figure of 30% remediated should be read in that context: progress is real, but the headline understates the remaining challenge.</p>
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
            changeText="Identified since Grenfell 2017 &middot; likely more unidentified below 11m"
            sparklineData={[4603, 4603, 4603, 4603]}
            source="DLUHC Building Safety Remediation &middot; 2024"
            onExpand={() => {}}
          />
          <MetricCard
            label="Buildings fully remediated"
            value="30"
            unit="% (2024)"
            direction="up"
            polarity="up-is-good"
            changeText="Up from just 8.6% in 2021 &middot; progress accelerating but slow"
            sparklineData={[8.6, 16.1, 22.0, 30.0]}
            source="DLUHC &middot; 2024"
            onExpand={() => {}}
          />
          <MetricCard
            label="Estimated total remediation cost"
            value="£17.6bn"
            unit=""
            direction="flat"
            polarity="up-is-bad"
            changeText="£7.4bn still unresolved &middot; leaseholders potentially left liable"
            sparklineData={[10, 12, 15, 17.6]}
            source="DLUHC / RICS estimates &middot; 2023"
            onExpand={() => {}}
          />
        </div>
        </ScrollReveal>

        <ScrollReveal>
        <section id="sec-progress" className="mb-12">
          <LineChart
            title="Proportion of unsafe-cladding buildings fully remediated, 2021&ndash;2024"
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
            {' '}&middot;{' '}
            <a href="https://endourcladdingscandal.co.uk" className="underline" target="_blank" rel="noopener noreferrer">
              End Our Cladding Scandal
            </a>
          </p>
        </section>
        </ScrollReveal>
      </main>
    </>
  )
}
