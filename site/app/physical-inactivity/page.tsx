'use client'

import { useEffect, useState } from 'react'
import TopicNav from '@/components/TopicNav'
import TopicHeader from '@/components/TopicHeader'
import MetricCard from '@/components/MetricCard'
import LineChart, { Series, Annotation } from '@/components/charts/LineChart'
import PositiveCallout from '@/components/PositiveCallout'
import ScrollReveal from '@/components/ScrollReveal'
import SectionNav from '@/components/SectionNav'
import RelatedTopics from '@/components/RelatedTopics';

// ── Types ────────────────────────────────────────────────────────────────────

interface ActivityYear {
  year: number
  pctMeetingGuidelines: number
}

interface ChildActivityYear {
  year: number
  pctActive: number
}

interface ActivityGroup {
  group: string
  pctActive: number
}

interface PhysicalInactivityData {
  activityLevels: ActivityYear[]
  childActivity: ChildActivityYear[]
  byGroup: ActivityGroup[]
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1)
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function PhysicalInactivityPage() {
  const [data, setData] = useState<PhysicalInactivityData | null>(null)

  useEffect(() => {
    fetch('/data/physical-inactivity/physical_inactivity.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error)
  }, [])

  // ── Derived series ──────────────────────────────────────────────────────

  const adultActivitySeries: Series[] = data
    ? [{
        id: 'adult-activity',
        label: 'Adults meeting activity guidelines',
        colour: '#2A9D8F',
        data: data.activityLevels.map(d => ({
          date: yearToDate(d.year),
          value: d.pctMeetingGuidelines,
        })),
      }]
    : []

  const adultActivityAnnotations: Annotation[] = [
    { date: yearToDate(2020), label: 'COVID-19 lockdowns' },
  ]

  const childActivitySeries: Series[] = data
    ? [{
        id: 'child-activity',
        label: 'Children meeting activity guidelines',
        colour: '#264653',
        data: data.childActivity.map(d => ({
          date: yearToDate(d.year),
          value: d.pctActive,
        })),
      }]
    : []

  const childActivityAnnotations: Annotation[] = [
    { date: yearToDate(2020), label: 'COVID-19 lockdowns' },
  ]

  // ── Metric values ────────────────────────────────────────────────────────

  const latestAdult = data?.activityLevels[data.activityLevels.length - 1]

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Physical Inactivity" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Physical Inactivity"
          question="Are We Getting Enough Exercise?"
          finding="Less than two thirds of adults in England meet the recommended 150 minutes of moderate physical activity per week, and physical inactivity costs the NHS £7.4 billion a year."
          colour="#2A9D8F"
          preposition="with"
        />

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-context', label: 'Context' },
          { id: 'sec-charts', label: 'Charts' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Adults meeting 150–min activity guidelines"
              value={latestAdult ? latestAdult.pctMeetingGuidelines.toString() : '—'}
              unit="%"
              direction="down"
              polarity="up-is-good"
              changeText="2022 · Was 66% pre-pandemic; recovered slowly"
              sparklineData={[66, 67, 67, 67, 59, 61, 62]}
              source="Sport England — Active Lives Survey"
              href="#sec-context"/>
            <MetricCard
              label="Physically inactive adults (under 30 min/week)"
              value="11.5"
              unit="M"
              direction="up"
              polarity="up-is-bad"
              changeText="24% of adults; highest in most deprived areas"
              sparklineData={[10.2, 10.5, 10.8, 11.2, 11.5]}
              source="Sport England — Active Lives Survey"
              href="#sec-sources"/>
            <MetricCard
              label="NHS cost of physical inactivity (annual)"
              value="7.4"
              unit="£bn"
              direction="up"
              polarity="up-is-bad"
              changeText="+£5.5bn in wider economy costs"
              sparklineData={[5.2, 5.8, 6.4, 6.9, 7.4]}
              source="Sport England — Sport England Insight"
              href="#sec-sources"/>
          </div>
        

        {/* Context section */}
        <section id="sec-context" className="py-12 border-t border-wiah-border">
          <h2 className="text-xl font-bold text-wiah-black mb-6">Context</h2>
          <div className="max-w-2xl text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Around 38% of adults in England — approximately 20 million people — do not meet the Chief Medical Officers' guideline of 150 minutes of moderate activity per week. Physical inactivity costs the NHS £7.4 billion annually and is attributed to roughly 1 in 6 UK deaths, a burden comparable to smoking. Unlike smoking, activity levels have remained stubbornly flat for most of the past decade, with a COVID-related dip in 2020 from which recovery has been only partial. Children's activity is a particular concern: only 47% of 5–16 year olds currently meet the 60-minutes-daily guideline, a decline that predates COVID, reflecting reduced PE time in schools, screen-based leisure, and contraction of free outdoor play.</p>
            <p>The social gradient in physical activity is pronounced and drives long-term health inequality. Adults in the least deprived quintile meet activity guidelines at 67%; in the most deprived, that falls to 56%. Black and South Asian adults are less likely to be sufficiently active (52% and 54% respectively, versus 63% for white adults), reflecting structural factors including built environment quality, cultural programming in sport provision, and income. Women are less likely to meet guidelines than men across all age groups. Inactive children are more likely to become inactive adults; the compounding NHS demand effect is significant. The most effective interventions — parkrun, This Girl Can, street design that enables walking — share the feature of removing structural barriers rather than exhorting individual behaviour change.</p>
          </div>
        </section>

        {/* Charts section */}
        <section id="sec-charts" className="py-12 border-t border-wiah-border space-y-12">
          {adultActivitySeries.length > 0 ? (
            <LineChart
              title="Adults meeting physical activity guidelines, England"
              subtitle="Percentage achieving 150 minutes of moderate activity per week. Sport England Active Lives Survey."
              series={adultActivitySeries}
              annotations={adultActivityAnnotations}
              yLabel="Percentage (%)"
              source={{
                name: 'Sport England',
                dataset: 'Active Lives Survey',
                frequency: 'annual',
              }}
            />
          ) : (
            <div className="h-64 bg-wiah-light rounded animate-pulse" />
          )}

          {childActivitySeries.length > 0 ? (
            <LineChart
              title="Children meeting physical activity guidelines, England"
              subtitle="Percentage of 5–16 year olds achieving 60 minutes of activity per day. Sport England."
              series={childActivitySeries}
              annotations={childActivityAnnotations}
              yLabel="Percentage (%)"
              source={{
                name: 'Sport England',
                dataset: 'Active Lives Survey',
                frequency: 'annual',
              }}
            />
          ) : (
            <div className="h-64 bg-wiah-light rounded animate-pulse" />
          )}

          {data && data.byGroup.length > 0 && (
            <div className="mb-12">
              <h3 className="text-lg font-bold text-wiah-black mb-1">Meeting activity guidelines by demographic group</h3>
              <p className="text-sm text-wiah-mid mb-4">
                Percentage meeting recommended activity levels. Sport England Active Lives Survey, 2022.
              </p>
              <div className="space-y-3 border-t border-b border-wiah-border py-4">
                {data.byGroup.map(group => {
                  const maxWidth = 80
                  const barWidth = (group.pctActive / maxWidth) * 100
                  return (
                    <div key={group.group} className="flex items-center gap-3">
                      <span className="text-sm text-wiah-black w-40 flex-shrink-0">{group.group}</span>
                      <div className="flex-grow bg-wiah-light rounded h-6 relative">
                        <div
                          className="bg-wiah-green h-6 rounded transition-all"
                          style={{ width: `${barWidth}%` }}
                        />
                      </div>
                      <span className="font-mono text-sm font-bold text-wiah-dark w-12 text-right flex-shrink-0">
                        {group.pctActive}%
                      </span>
                    </div>
                  )
                })}
              </div>
              <p className="font-mono text-[11px] text-wiah-mid mt-3">
                Source: Sport England — Active Lives Survey, 2022.
              </p>
            </div>
          )}
        </section>

        {/* Positive story */}
        <ScrollReveal>
          <PositiveCallout
            title="Parkrun: free, weekly, community exercise works"
            value="1,200+"
            unit="UK Parkrun events"
            description="Parkrun — free, weekly, timed 5km runs in parks — now has over 1,200 events in the UK attracting 100,000+ participants each Saturday. Research published in the British Journal of Sports Medicine found that Parkrun participants substantially increased their physical activity, with the largest gains among those who were previously inactive. Participants report improved mental health, sense of community, and social connection. The model is cost-effective, scalable, and accessible across socioeconomic groups, demonstrating that removing barriers (cost, intimidation, structure) enables participation."
            source="Source: Sport England — Active Lives Survey; Parkrun — Research Evidence."
          />
        </ScrollReveal>

        {/* Sources */}
        <section id="sec-sources" className="border-t border-wiah-border pt-8">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; methodology</h2>
          <ul className="space-y-2 font-mono text-xs text-wiah-mid">
            <li>
              <a
                href="https://www.sportengland.org/research-and-data/data/active-lives"
                className="underline hover:text-wiah-blue"
                target="_blank"
                rel="noreferrer"
              >
                Sport England — Active Lives Survey (annual)
              </a>
            </li>
            <li>
              <a
                href="https://www.nhs.uk"
                className="underline hover:text-wiah-blue"
                target="_blank"
                rel="noreferrer"
              >
                NHS — Physical Inactivity and Health Costs
              </a>
            </li>
            <li>
              <a
                href="https://www.parkrun.com"
                className="underline hover:text-wiah-blue"
                target="_blank"
                rel="noreferrer"
              >
                Parkrun — Weekly 5K Running Events
              </a>
            </li>
          </ul>
          <p className="font-mono text-xs text-wiah-mid mt-4">
            Data is sourced from Sport England's Active Lives Survey, an annual survey of physical activity participation among adults and children in England. The survey uses a representative sample of approximately 168,000 respondents aged 5+. NHS cost estimates derive from analysis of healthcare spending related to physical inactivity. All figures are for England; UK-wide data may differ.
          </p>
          <div className="mt-4">
            <p className="font-mono text-xs text-wiah-mid font-bold mb-1">Known issues:</p>
            <ul className="list-disc list-inside space-y-1 font-mono text-xs text-wiah-mid">
              <li>Survey self-reported activity; overestimation of activity levels common in surveys</li>
              <li>COVID-19 lockdowns disrupted 2020 data; recovery patterns influenced by local restrictions</li>
              <li>Deprivation categories based on Index of Multiple Deprivation quintiles; neighbourhood-level proxy for individual circumstance</li>
            </ul>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  )
}
