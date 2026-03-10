'use client'

import { useEffect, useState } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import RelatedTopics from '@/components/RelatedTopics';

// ── Types ────────────────────────────────────────────────────────────────────

interface WildfireRiskData {
  areasBurned: { year: number; hectares: number }[]
  incidentsByYear: { year: number; incidents: number }[]
  byRegion2022: { region: string; hectares: number }[]
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 6, 1)
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function WildfireRiskPage() {
  const [data, setData] = useState<WildfireRiskData | null>(null)

  useEffect(() => {
    fetch('/data/wildfire-risk/wildfire_risk.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const burnedSeries: Series[] = data
    ? [{
        id: 'burned',
        label: 'Hectares burned',
        colour: '#E63946',
        data: data.areasBurned.map(d => ({
          date: yearToDate(d.year),
          value: d.hectares,
        })),
      }]
    : []

  const incidentSeries: Series[] = data
    ? [{
        id: 'incidents',
        label: 'Fire incidents',
        colour: '#F4A261',
        data: data.incidentsByYear.map(d => ({
          date: yearToDate(d.year),
          value: d.incidents,
        })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Wildfire Risk" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Wildfire Risk"
          question="Is wildfire becoming a UK problem?"
          finding="Wildfires burned over 26,000 hectares in England in 2022 — a 570% increase on the previous decade's average. The record temperatures of July 2022 saw fires within the M25. Climate change is extending the fire season and increasing severity."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Wildfire has historically been seen as a problem for southern Europe or Australia — not Britain. That perception changed in 2022. Record temperatures of 40.3&deg;C on 19 July created conditions previously unmodelled in risk assessments: fires broke out simultaneously in Lincolnshire, Essex, and Suffolk; homes burned in Wennington within the M25; the London Fire Brigade declared a major incident. The national total — 26,000 hectares burned — was 570% above the previous decade's average and overwhelmed fire services across England. The decade-long trend beneath this shock is itself significant: wildfires burned around 1,800 hectares annually in 2010, rising to 5,200 hectares by 2019 — a near-trebling before the extreme year. Drained peatlands in upland northern England, Wales, and Scotland are particularly flammable; when peat burns it releases centuries of stored carbon, creating a climate feedback loop. The National Fire Chiefs Council published a wildfire strategy in 2023 recommending dedicated response capacity and cross-boundary coordination, and most English services have since established specialist wildfire teams.</p>
            <p>UK fire services are not resourced on the assumption of wildfire at scale: equipment, training, and operational frameworks were designed primarily for structure fires. The 2022 events exposed gaps in specialist PPE, aerial suppression capacity, and land manager coordination that have only partially been closed. Rewetting drained peatlands is the highest-impact available intervention — wet peat does not burn — and Natural England's England Peat Action Plan has increased investment in restoration, but approximately 80% of England's upland peat remains in degraded condition. Climate change means the UK will experience more extreme fire years regardless of mitigation; adapting land management and fire service capacity is not optional.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-burned', label: 'Area Burned' },
          { id: 'sec-incidents', label: 'Incidents' },
          { id: 'sec-regional', label: 'Regional Breakdown' },
        ]} />

        <ScrollReveal>
        <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Area burned (2022 peak)"
            value="26,000"
            unit="ha"
            direction="up"
            polarity="up-is-bad"
            changeText="570% above decade average · July 2022 heatwave drove fires near London"
            sparklineData={[1800, 2100, 3200, 4100, 5200, 3800, 26000]}
            source="Fire &amp; Rescue Services / FRS data · 2022"
            href="#sec-burned"/>
          <MetricCard
            label="Fire incidents in 2022"
            value="530"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Record year · peak days saw 50+ simultaneous wildfires"
            sparklineData={[210, 280, 195, 240, 530]}
            source="National Fire Chiefs Council · 2022"
            href="#sec-incidents"/>
          <MetricCard
            label="Hectares burned 2023 (post-peak)"
            value="2,800"
            unit="ha"
            direction="down"
            polarity="up-is-bad"
            changeText="Returned to near-normal after extreme 2022 · trend still rising"
            sparklineData={[1800, 2100, 3200, 4100, 5200, 3800, 26000, 2800]}
            source="FRS data · 2023"
            href="#sec-regional"/>
        </div>
        </ScrollReveal>

        <ScrollReveal>
        <section id="sec-burned" className="mb-12">
          <LineChart
            title="Hectares burned in UK wildfires, 2010–2023"
            subtitle="Total area burned per year as reported by Fire &amp; Rescue Services. National Fire Chiefs Council."
            series={burnedSeries}
            annotations={[
              { date: new Date(2022, 6, 1), label: '40.3°C record: 26,000 ha burned' },
            ]}
            yLabel="Hectares burned"
          />
        </section>
        </ScrollReveal>

        <ScrollReveal>
        <section id="sec-incidents" className="mb-12">
          <LineChart
            title="Wildfire incidents per year, 2018–2023"
            subtitle="Number of wildfire incidents attended by fire and rescue services."
            series={incidentSeries}
            yLabel="Incidents"
          />
        </section>
        </ScrollReveal>

        <ScrollReveal>
        <section id="sec-regional" className="mb-12">
          <h3 className="text-xl font-bold text-wiah-black mb-2">Area burned by region, 2022</h3>
          <p className="text-sm text-wiah-mid mb-6">Hectares burned by region during the record 2022 season.</p>
          <div className="space-y-3">
            {data?.byRegion2022
              .sort((a, b) => b.hectares - a.hectares)
              .map(item => (
              <div key={item.region} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-40 text-sm text-wiah-black">{item.region}</div>
                <div className="flex-grow flex items-center gap-2">
                  <div
                    className="h-6 bg-[#E63946] rounded"
                    style={{ width: `${(item.hectares / 9000) * 100}%` }}
                  />
                </div>
                <div className="flex-shrink-0 w-20 text-right font-mono text-sm text-wiah-black">
                  {item.hectares.toLocaleString()} ha
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs font-mono text-wiah-mid mt-4">
            Source:{' '}
            <a href="https://nfcc.org.uk" className="underline" target="_blank" rel="noopener noreferrer">
              National Fire Chiefs Council (nfcc.org.uk)
            </a>
            {' '}· Forest Research · Met Office
          </p>
        </section>
        </ScrollReveal>
              <RelatedTopics />
      </main>
    </>
  )
}
