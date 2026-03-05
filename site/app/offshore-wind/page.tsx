'use client'

import { useEffect, useState } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series } from '@/components/charts/LineChart'
import PositiveCallout from '@/components/PositiveCallout'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'

// ── Types ────────────────────────────────────────────────────────────────────

interface OffshoreWindData {
  installedCapacity: { year: number; gw: number }[]
  cfdsAwarded: { round: string; gw: number }[]
  internationalComparison: { country: string; gw: number }[]
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 6, 1)
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function OffshoreWindPage() {
  const [data, setData] = useState<OffshoreWindData | null>(null)

  useEffect(() => {
    fetch('/data/offshore-wind/offshore_wind.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  const capacitySeries: Series[] = data
    ? [{
        id: 'capacity',
        label: 'Installed capacity (GW)',
        colour: '#2A9D8F',
        data: data.installedCapacity.map(d => ({
          date: yearToDate(d.year),
          value: d.gw,
        })),
      }]
    : []

  return (
    <>
      <TopicNav topic="Offshore Wind" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Offshore Wind"
          question="Is Britain on track to become a wind energy superpower?"
          finding="The UK has 14.7 GW of installed offshore wind &mdash; second in the world behind China. The government&apos;s 50 GW by 2030 target is ambitious: current trajectory suggests 35&ndash;40 GW is achievable, if grid upgrades and planning keep pace."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>In 2000 there was no commercial offshore wind in Britain. By 2024, 14.7 GW of installed capacity makes the UK the world&apos;s second largest offshore wind market behind China. This was achieved through the Contracts for Difference auction, which provided long-term revenue certainty to developers, driving costs from around &pound;150 per megawatt-hour in 2015 to below &pound;45 in 2022. The government&apos;s 50 GW by 2030 target, announced in the 2022 British Energy Security Strategy, would require roughly 6 GW commissioned annually against a historical average of 1.5 GW. The 2023 CfD Round 5 produced the most significant policy setback in the industry&apos;s history &mdash; zero offshore wind awarded because the strike price ceiling was set below viable project costs amid materials inflation. Round 6 in 2024 recovered with 5.5 GW, but the gap leaves the 2030 target requiring delivery at an unprecedented pace. Industry analysis puts an achievable 2030 outcome at 35&ndash;40 GW, with grid connection the primary constraint: transmission infrastructure takes 10&ndash;15 years to build.</p>
            <p>The distribution of economic benefit is contested. Most projects use turbines from Denmark (Vestas) or Germany (Siemens Gamesa); despite freeport investments at Humberside and Teesside, the UK domestic supply chain remains limited. GB Energy, the publicly owned clean investment company, is intended to ensure public returns from public risk. Floating offshore wind &mdash; to which the UK has committed 5 GW by 2030 &mdash; opens North Atlantic and Scottish west coast waters and is at early commercial stage; the Kincardine farm off Scotland is currently the world&apos;s largest at 50 MW. The technology&apos;s cost curve has further to fall, and its resource potential is enormous.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-capacity', label: 'Installed Capacity' },
          { id: 'sec-international', label: 'International' },
        ]} />

        <ScrollReveal>
        <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Installed offshore wind capacity"
            value="14.7"
            unit="GW"
            direction="up"
            polarity="up-is-good"
            changeText="Second largest in world &middot; up from 1.3 GW in 2010"
            sparklineData={[1.3, 2.9, 4.5, 5.7, 8.2, 10.4, 13.8, 14.7]}
            source="DESNZ / Wind Europe &middot; 2024"
            onExpand={() => {}}
          />
          <MetricCard
            label="Government target 2030"
            value="50"
            unit="GW"
            direction="up"
            polarity="up-is-good"
            changeText="Current trajectory: 35&ndash;40 GW by 2030 &middot; needs planning reform"
            sparklineData={[1.3, 2.9, 5.7, 8.2, 10.4, 13.8, 14.7, 50]}
            source="UK Government target"
            onExpand={() => {}}
          />
          <MetricCard
            label="Round 5 CfD awards (2023)"
            value="0"
            unit="GW"
            direction="down"
            polarity="up-is-good"
            changeText="No offshore wind awarded in AR5 &middot; developers said prices too low"
            sparklineData={[0.8, 3.2, 5.9, 7.0, 0.0]}
            source="DESNZ CfD Allocation Round 5 &middot; 2023"
            onExpand={() => {}}
          />
        </div>
        </ScrollReveal>

        <ScrollReveal>
        <PositiveCallout
          title="Second largest offshore wind fleet in the world"
          value="14.7 GW"
          unit=""
          description="The UK has built more offshore wind than any country except China &mdash; generating enough electricity to power 16 million homes. Costs have fallen 70% since 2015."
          source="Wind Europe / DESNZ, 2024"
        />
        </ScrollReveal>

        <ScrollReveal>
        <section id="sec-capacity" className="mb-12">
          <LineChart
            title="UK installed offshore wind capacity, 2010&ndash;2024"
            subtitle="Cumulative installed capacity in gigawatts. DESNZ / Wind Europe."
            series={capacitySeries}
            annotations={[
              { date: new Date(2022, 6, 1), label: '50 GW by 2030 target announced' },
            ]}
            yLabel="Gigawatts (GW)"
          />
        </section>
        </ScrollReveal>

        <ScrollReveal>
        <section id="sec-international" className="mb-12">
          <h3 className="text-xl font-bold text-wiah-black mb-2">Offshore wind capacity by country, 2024</h3>
          <p className="text-sm text-wiah-mid mb-6">Installed offshore wind capacity in GW. Wind Europe / GWEC.</p>
          <div className="space-y-3">
            {data?.internationalComparison.map(item => (
              <div key={item.country} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-28 text-sm text-wiah-black">{item.country}</div>
                <div className="flex-grow flex items-center gap-2">
                  <div
                    className="h-6 rounded"
                    style={{
                      width: `${(item.gw / 40) * 100}%`,
                      backgroundColor: item.country === 'UK' ? '#2A9D8F' : '#264653',
                    }}
                  />
                </div>
                <div className="flex-shrink-0 w-16 text-right font-mono text-sm text-wiah-black">
                  {item.gw} GW
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs font-mono text-wiah-mid mt-4">
            Source:{' '}
            <a href="https://www.gov.uk/government/organisations/department-for-energy-security-and-net-zero" className="underline" target="_blank" rel="noopener noreferrer">
              DESNZ Renewable Energy Planning Database
            </a>
            {' '}&middot; Wind Europe &middot; Crown Estate
          </p>
        </section>
        </ScrollReveal>
      </main>
    </>
  )
}
