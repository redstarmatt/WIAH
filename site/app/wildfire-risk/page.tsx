'use client'

import { useEffect, useState } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

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
          finding="Wildfires burned over 26,000 hectares in England in 2022 &mdash; a 570% increase on the previous decade&apos;s average. The record temperatures of July 2022 saw fires within the M25. Climate change is extending the fire season and increasing severity."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Wildfire has historically been seen as a problem for Mediterranean Europe, California, or Australia &mdash; not Britain. That perception changed in the summer of 2022. Record temperatures of 40.3&deg;C on 19 July created conditions previously unmodelled in fire risk assessments. Fires broke out across the country simultaneously: in Lincolnshire, Essex, and Suffolk on the same day. Several dozen homes burned down in Wennington, within the M25. The London Fire Brigade declared a major incident. The scale &mdash; 26,000 hectares burned nationally &mdash; was 570% above the previous decade&apos;s average. Fire services across England were simultaneously overwhelmed in a way they had never been.</p>
            <p>The decade-long trend beneath the 2022 shock is itself significant. In 2010, wildfires burned around 1,800 hectares annually. By 2019 that figure had risen to 5,200 hectares &mdash; a near-trebling even before the extreme year. The trend reflects a real change in fire risk: more prolonged dry spells, higher summer temperatures, and drier vegetation creating ignition-prone conditions earlier in the year and later into autumn. The UK&apos;s fire season has extended from what was historically a few weeks in spring to a longer window spanning spring through late summer.</p>
            <p>Britain&apos;s landscape contains specific vulnerabilities that amplify wildfire risk. Drained peatlands &mdash; particularly in upland areas of northern England, Wales, and Scotland &mdash; dry out in summer and become highly flammable. Globally, peat stores more carbon per hectare than any other soil type. When it burns, it releases centuries of stored carbon, creating a climate feedback loop. Grouse moors, managed by burning heather in rotational strips to encourage new growth for driven shooting, exist across large areas of upland Britain. Burning management on dry, windy days can escape control, as happened in Saddleworth Moor in 2018 when a fire burned for two weeks and required military assistance to extinguish.</p>
            <p>UK fire services are not resourced on the assumption of Australian-scale wildfires. Equipment, training, and operational frameworks were designed primarily for structure fires. The 2022 events exposed gaps: insufficient specialist wildfire PPE, limited aerial suppression capacity, and fragmented coordination between fire services and land managers. The National Fire Chiefs Council published a wildfire strategy in 2023 recommending dedicated wildfire response capacity, better land management guidance, and improved cross-boundary co-ordination. Most English fire and rescue services have subsequently established specialist wildfire teams, though resourcing varies significantly.</p>
            <p>Rewetting drained peatlands is the highest-impact intervention available to reduce wildfire risk in upland Britain. Wet peat does not burn. Peatland restoration &mdash; blocking drainage channels, reintroducing Sphagnum moss &mdash; also delivers carbon sequestration benefits. Natural England&apos;s England Peat Action Plan and the expanded Countryside Stewardship payment rates for peatland restoration have increased investment in rewetting. But the scale needed is vast: approximately 80% of England&apos;s upland peat is in degraded condition. In lowland areas, fire breaks, reduced planting of highly flammable conifers, and better landscape connectivity between wet habitats can reduce risk. Climate change means that even with mitigation, the UK will experience more extreme fire years. Adapting land management and fire service capacity is the unavoidable response.</p>
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
            changeText="570% above decade average &middot; July 2022 heatwave drove fires near London"
            sparklineData={[1800, 2100, 3200, 4100, 5200, 3800, 26000]}
            source="Fire &amp; Rescue Services / FRS data &middot; 2022"
            onExpand={() => {}}
          />
          <MetricCard
            label="Fire incidents in 2022"
            value="530"
            unit=""
            direction="up"
            polarity="up-is-bad"
            changeText="Record year &middot; peak days saw 50+ simultaneous wildfires"
            sparklineData={[210, 280, 195, 240, 530]}
            source="National Fire Chiefs Council &middot; 2022"
            onExpand={() => {}}
          />
          <MetricCard
            label="Hectares burned 2023 (post-peak)"
            value="2,800"
            unit="ha"
            direction="down"
            polarity="up-is-bad"
            changeText="Returned to near-normal after extreme 2022 &middot; trend still rising"
            sparklineData={[1800, 2100, 3200, 4100, 5200, 3800, 26000, 2800]}
            source="FRS data &middot; 2023"
            onExpand={() => {}}
          />
        </div>
        </ScrollReveal>

        <ScrollReveal>
        <section id="sec-burned" className="mb-12">
          <LineChart
            title="Hectares burned in UK wildfires, 2010&ndash;2023"
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
            title="Wildfire incidents per year, 2018&ndash;2023"
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
            {' '}&middot; Forest Research &middot; Met Office
          </p>
        </section>
        </ScrollReveal>
      </main>
    </>
  )
}
